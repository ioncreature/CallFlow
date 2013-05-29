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
                var user = server.getUser( login, pass ),
                    jar = request.jar(),
                    httpParams = {
                        url: server.config.jedi.path,
                        jar: jar,
                        form: {
                            cmd: 'authenticator.findSubscriberComplete',
                            autoLogin: true,
                            login: login,
                            password: pass,
                            pin: ext || ''
                        }
                    };
                console.log( '\n\nBlaBla\n', user );

                request.post( httpParams, function( req, res ){
                    try {
                        var body = JSON.parse( res.body ),
                            status = body.status;

                        if ( status.success ){
                            user.info = user.info || {};
                            if ( body.counterResponse )
                                delete body.counterResponse.status;
                            user.info.counters = body.counterResponse;
                            if ( body.subscriberResponse )
                                delete body.subscriberResponse.status;
                            user.info.subscriber = body.subscriberResponse;
                            user.jar = jar;
                            user.socket = socket;
                            socket.set( 'user', user );

                            var mid = user.info.subscriber.mailboxId;

                            async.parallel({
                                mailboxInfo: function( callback ){
                                    var params = util.mixin( httpParams, { mid: mid });
                                    request.post( params, function( req, res ){
                                        try {
                                            var body = JSON.parse( res.body );
                                            callback( null, body.mailboxInfo );
                                        }
                                        catch ( e ){
                                            callback( new Error('Unable to load mailboxInfo') );
                                        }
                                    });
                                }
                            }, function( error, res ){
                                if ( error )
                                    fn({
                                        success: false,
                                        errorMessage: error.message
                                    });
                                else {
                                    util.mixin( user.info, res );
                                    fn({
                                        success: true,
                                        user: user.info,
                                        cookie: jar.toString()
                                    });
                                }
                            })
                        }
                        else
                            throw new Error( status.message );
                    }
                    catch ( e ){
                        fn({
                            success: false,
                            errorMessage: e.message
                        });
                    }
                });
            }
            else
                fn({
                    success: false,
                    errorMessage: e.message
                });
        });
    });
};


Server.prototype.getUser = function( login, pass, ext ){
    var hash = login + '_' + pass + '_' + (ext || '');

    if ( !this.users[hash] )
        this.users[hash] = {};
    return this.users[hash];
};


Server.prototype.loadMailbox = function( options ){

};


Server.prototype.logout = function(){

};
