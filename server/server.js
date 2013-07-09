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
    this.users = [];
}


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


Server.prototype.addUser = function( user ){
    this.users.push( user );
};


Server.prototype.removeUser = function( user ){
    var index = this.users.indexOf( user );
    if ( index > -1 )
        delete this.users[index];
};


Server.prototype.getUserByNumber = function( phoneNumber ){
    var length = this.users.length,
        user;

    for ( var i = 0; i < length; i++ ){
        user = this.users[i];
        if ( user && user.numbers instanceof Array && user.numbers.indexOf(phoneNumber) > -1 )
            return user;
    }
};


Server.prototype.initSocketServer = function(){
    var server = this;

    server.io.sockets.on( 'connection', function( socket ){
        var jar = request.jar(),
            data = {},
            mid,
            pin,
            accountNumber,
            environment,
            sid;

        var user = new User();
        user.id = socket.id;
        user.socket = socket;
        server.addUser( user );

        socket.emit( 'ping', {hello: 'client'}, function( response ){
            console.log( response );
        });

        socket.on( 'registerNumbers', function( query ){
            if ( query.numbers )
                user.numbers = query.numbers;
        });

        socket.on( 'outboundCall', function( msg, fn ){
            var remoteUser = server.getUserByNumber( msg.number ),
                video = msg.video;
            if ( remoteUser ){
                remoteUser.socket.emit( 'incomingCall', {address: user.socket.handshake.address.address, video: video} );

                // TODO: This potentially a place for memory leaks
                user.callTo = remoteUser;
                remoteUser.callFrom = user;

                typeof fn == 'function' && fn({ address: remoteUser.socket.handshake.address.address });
            }
            else
                typeof fn == 'function' && fn({ address: false });
        });

        socket.on( 'hangup', function( msg ){
            if ( msg.incoming )
                hangUpIncoming( user );
            else
                hangUpOutgoing( user );
        });

        socket.on( 'accept', function( msg ){
            var remoteUser = user.callFrom;
            remoteUser.socket.emit( 'accept', msg );
        });

        function hangUpOutgoing( user ){
            var remoteUser = user.callTo;
            delete user.callTo;
            if ( remoteUser ){
                remoteUser.socket.emit( 'hangup', {incoming: true} );
                delete remoteUser.callFrom;
            }
        }

        function hangUpIncoming( user ){
            var remoteUser = user.callFrom;
            delete user.callFrom;
            if ( remoteUser ){
                remoteUser.socket.emit( 'hangup', {incoming: false} );
                delete remoteUser.callTo;
            }
        }

        socket.on( 'disconnect', function(){
            hangUpIncoming( user );
            hangUpOutgoing( user );
            server.removeUser( user );
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

            if ( isLoginPassValid(login, pass) ){
                jediLogin( function( error, res ){
                    if ( error )
                        errorResponse( error, fn );
                    else {
                        async.series({
                            mailbox: loadMailbox,
                            phones: loadPhones,
                            extensions: loadExtensions,
                            phoneNumbers: loadPhoneNumbers,
                            sip: sipRegister
                        }, function( error, res ){
                            if ( error )
                                errorResponse( error, fn );
                            else {
                                util.mixin( data, res );
                                user.data = data;
                                fn({
                                    success: true,
                                    sid: sid,
                                    user: data,
                                    cookie: jar.toString()
                                });
                            }
                        });
                    }
                });
            }
            else
                errorResponse( e, fn );


            function jediLogin( callback ){
                var params = {
                    cmd: 'authenticator.findSubscriberComplete',
                    autoLogin: true,
                    login: login,
                    password: pass,
                    pin: ext || ''
                };

                jediRequest( params, function( error, res ){
                    if ( error )
                        callback( error );
                    else if ( res.status.success ){
                        if ( res.countersResponse )
                            delete res.countersResponse.status;
                        data.counters = res.countersResponse;
                        if ( res.subscriberResponse )
                            delete res.subscriberResponse.status;
                        data.subscriber = res.subscriberResponse;

                        accountNumber = util.preparePhoneNumber( res.countersResponse.accountNumber );
                        mid = data.subscriber.mailboxId;
                        sid = res.JSESSIONID;
                        callback( null, data );
                    }
                    else
                        callback( res.status.message );
                })
            }

            function loadMailbox( callback ){
                jediRequest( {cmd: 'extensions.getExtension', mid: mid}, function( error, res ){
                    if ( error || !res.status.success )
                        callback( error || new Error(res.status.message) );
                    else {
                        pin = res.mailboxInfo.pin;
                        callback( null, res.mailboxInfo );
                    }
                });
            }

            function loadPhones( callback ){
                jediRequest( {cmd: 'digitalline.listPhones'}, function( error, res ){
                    if ( error || !res.status.success )
                        callback( error || new Error(res.status.message) );
                    else
                        callback( error, res && res.phones );
                });
            }

            function loadExtensions( callback ){
                jediRequest( {cmd: 'extensions.listExtensions'}, function( error, res ){
                    if ( error || !res.status.success )
                        callback( error || new Error(res.status.message) );
                    else
                        callback( error, res && res.extensions );
                });
            }

            function loadPhoneNumbers( callback ){
                jediRequest( {cmd: 'extensions.listPhoneNumbers'}, function( error, res ){
                    if ( error || !res.status.success )
                        callback( error || new Error(res.status.message) );
                    else
                        callback( error, res && res.phones );
                });
            }

            function sipRegister( callback ){
                var rgs = environment.rgs;
                var params = {
                    Ext: login,
                    Pn: pin,
                    SP: util.rcEncrypt( pass, rgs.passMask, rgs.passMaxLength )
                };
                rgsRequest( params, function( error, result ){
                    if ( error )
                        callback( error );
                    else {
                        var res = {},
                            bodyAttr = result.Msg.Bdy[0].$;

                        res.realm = bodyAttr.Prx;
                        res.websocketServer = environment.sip.websocketServer;
                        res.iceServers = environment.sip.iceServers;
                        res.enableRtcWebBreaker = environment.sip.enableRtcWebBreaker;
                        res.enableVideo = environment.sip.enableVideo;
                        res.outboundProxy = 'udp://' + bodyAttr.ObndPrx;
                        res.phoneNumber = util.preparePhoneNumber( bodyAttr.Ext );
                        res.identity = {
                            displayName: bodyAttr.FullNm,
                            publicIdentity: 'sip:' + util.preparePhoneNumber(res.phoneNumber) + '*' + pin + '@' + res.realm,
                            privateIdentity: bodyAttr.Inst,
                            password: pass
                        };
                        res.extension = bodyAttr.Pn;
                        res.instanceId = bodyAttr.Inst;
                        res.clientId = bodyAttr.Cln;
                        res.mailboxId = mid;

                        callback( null, res );
                    }
                });
            }
        });

        function jediRequest( params, callback ){
            var httpParams = {
                url: environment.jedi.path,
                jar: jar,
                form: params
            };
            request.post( httpParams, function( error, res, body ){
                try {
                    if ( error )
                        throw error;
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
                body: 'XMLREQ=' + util.prepareHttpRegRequest( params )
            };
            request.post( httpParams, function( error, res, body ){
                if ( error )
                    callback( error );
                else if ( res.statusCode != 200 )
                    callback( new Error('RGS server has sent error: ' + res.statusCode) );
                else
                    parseXml( body, callback );
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


function User(){}


function isLoginPassValid( login, pass ){
    return pass && pass.length > 0 && login && login.length > 0;
}