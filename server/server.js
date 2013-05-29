/**
 * @author Marenin Alexander
 * May 2013
 */


var http = require( 'http' ),
    socketIo = require( 'socket.io' ),
    express = require( 'express' ),
    async = require( 'async' ),
    request = require( 'request' ),
    util = require( './util.js' );


module.exports = Server;


function Server( config ){
    var app = express();
    app.configure( function(){
        app.disable( 'x-powered-by' );
        app.set( 'views', __dirname + '/view' );
        app.use( app.router );
        app.use( express.logger('dev') );
        app.use( express.bodyParser() );
        app.use( express.errorHandler() );
        app.set( 'view engine', 'jade' );
    });

    app.get( '/dev', function( req, res ){
        res.render( 'dev', {
            title: 'Hi, guys',
            caption: 'Hello'
        });
    });

    this.config = config;
    this.app = app;
    this.httpServer = http.createServer( app );
    this.users = {};
}


Server.prototype.cacheTtl = 60 * 5;

Server.prototype.start = function(){
    this.httpServer.listen( this.config.port || 80 );
    this.io = socketIo.listen( this.httpServer );
    this.initSocketServer();
};


Server.prototype.stop = function( callback ){
    var server = this;
    server.httpServer.close( function(){
        server.socket.close();
        callback();
    })
};


Server.prototype.initSocketServer = function(){
    var server = this,
        users = server.users;


    server.io.sockets.on( 'connection', function( socket ){
        var jar = request.jar(),
            data = {},
            mid,
            pin,
            instanceId,
            sid;

        socket.emit( 'ping', {hello: 'client'}, function( response ){
            console.log( response );
        });

        socket.on( 'authBySid', function( sid, fn ){
            var isValid = sid && sid.toString().length > 3;
            fn( !!isValid );
        });

        socket.on( 'authByLoginPassword', function( query, fn ){
            var login = query.login,
                pass = query.password,
                ext = query.ext;

            if ( pass && pass.length > 0 && login && login.length > 0 ){
                var params = {
                    cmd: 'authenticator.findSubscriberComplete',
                    autoLogin: true,
                    login: login,
                    password: pass,
                    pin: ext || ''
                };

                jediRequest( params, function( error, res ){
                    if ( error )
                        errorResponse( error, fn );
                    else if ( res.status.success ){
                        if ( res.countersResponse )
                            delete res.countersResponse.status;
                        data.counters = res.countersResponse;
                        if ( res.subscriberResponse )
                            delete res.subscriberResponse.status;
                        data.subscriber = res.subscriberResponse;

                        mid = data.subscriber.mailboxId;
                        sid = res.JSESSIONID;

                        async.series({
                            mailbox: function( callback ){
                                jediRequest({ cmd: 'extensions.getExtension', mid: mid }, function( error, res ){
                                    if ( error || !res.status.success )
                                        callback( error || new Error(res.status.message) );
                                    else {
                                        pin = res.mailboxInfo.pin;
                                        callback( null, res.mailboxInfo );
                                    }
                                });
                            },
                            phones: function( callback ){
                                jediRequest({ cmd: 'digitalline.listPhones' }, function( error, res ){
                                    if ( error || !res.status.success )
                                        callback( error || new Error(res.status.message) );
                                    else {
                                        res.phones.some( function( item ){
                                            if ( item.userExtension === pin ){
                                                instanceId = item.device.instanceId;
                                                return true;
                                            }
                                        });
                                        callback( error, res && res.phones );
                                    }
                                });
                            },
                            provisioningInfo: function( callback ){
                                jediRequest({
                                    cmd: 'digitalline.getProvisioningInfo',
                                    instanceId: instanceId
                                }, function( error, res ){
                                    callback( error, res && res.provisioningInfo );
                                });
                            }
                        }, finishRequest );

                        function finishRequest( error, res ){
                            if ( error )
                                errorResponse( error, fn );
                            else {
                                util.mixin( data, res );
                                fn({
                                    success: true,
                                    sid: sid,
                                    user: data,
                                    cookie: jar.toString()
                                });
                            }
                        }
                    }
                    else
                        errorResponse( res.status.message, fn );
                });
            }
            else
                errorResponse( e, fn );
        });

        function jediRequest( params, callback ){
            var httpParams = {
                url: server.config.jedi.path,
                jar: jar,
                form: params
            };
            request.post( httpParams, function( req, res ){
                try {
                    var body = JSON.parse( res.body );
                    callback( null, body );
                }
                catch ( e ){
                    callback( e );
                }
            });
        }

        function errorResponse( error, fn ){
            fn({
                success: false,
                errorMessage: error.message || error
            });
        }
    });
};
