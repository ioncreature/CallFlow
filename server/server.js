/**
 * @author Marenin Alexander
 * May 2013
 */


var http = require( 'http' ),
    socketIo = require( 'socket.io' ),
    express = require( 'express' ),
    async = require( 'async' ),
    request = require( 'request' ),
    util = require( './util.js' ),
    parseXml = require('xml2js').parseString;


module.exports = Server;


function Server( config ){
    var app = express(),
        server = this;
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

    app.get( '/exit', function( req, res ){
        res.render( 'dev', {
            title: 'Stop server',
            caption: 'Stopping'
        });
        server.stop();
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
        callback && callback();
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
            environment,
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
                ext = query.ext,
                envName = query.envName;

            if ( !server.config.environments[envName] ){
                errorResponse( new Error('Environment with name ' + envName + ' not found'), fn );
                return;
            }
            else
                environment = server.config.environments[envName];

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

                        async.parallel({
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
                                    else
                                        callback( error, res && res.phones );
                                });
                            },
                            sip: function( callback ){
                                var rgs = environment.rgs;
                                var params = {
                                    Ext: login,
                                    Pn: pin || '101',
                                    SP: util.rcEncrypt( pass, rgs.passMask, rgs.passMaxLength )
                                };
                                rgsRequest( params, function( error, result ){
                                    if ( error )
                                        callback( error );
                                    else {
                                        var res = {},
                                            bodyAttr = result.Msg.Bdy[0].$;

                                        res.realm = bodyAttr.Prx;
                                        res.websocketServerUrl = environment.websocketServerUrl;
                                        res.outboundProxy = 'udp://' + bodyAttr.ObndPrx;
                                        res.phoneNumber = bodyAttr.Ext;
                                        res.identity = {
                                            displayName: bodyAttr.FullNm,
                                            publicIdentity: 'sip:' + res.phoneNumber + '@' + res.realm,
                                            privateIdentity: bodyAttr.Inst,
                                            password: bodyAttr.Inst
                                        };
                                        res.extension = bodyAttr.Pn;
                                        res.instanceId = bodyAttr.Inst;
                                        res.clientId = bodyAttr.Cln;
                                        res.mailboxId = bodyAttr.MboxId;

                                        callback( null, res );
                                    }
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
                url: environment.jedi.path,
                jar: jar,
                form: params
            };
            request.post( httpParams, function( error, res, body ){
                try {
                    callback( null, JSON.parse(body) );
                }
                catch ( e ){
                    callback( e );
                }
            });
        }

        function rgsRequest( params, callback ){
            var httpParams = {
                url: environment.rgs.path,
                form: {
                    XMLREQ: util.prepareHttpRegRequest( params )
                }
            };
            request.post( httpParams, function( error, res, body ){
                console.log( '\n\n' );
                console.log( body );
                console.log( '\n\n' );
                if ( error )
                    callback( error );
                else if ( res.statusCode != 200 )
                    callback( new Error('RGS server has sent error: ' + res.statusCode) );
                else
                    parseXml( res.body, callback );
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
