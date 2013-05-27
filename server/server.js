/**
 * @author Marenin Alexander
 * May 2013
 */


var http = require( 'http' ),
    socketIo = require( 'socket.io' ),
    express = require( 'express' );


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
        callback();
    })
};


Server.prototype.initSocketServer = function(){
    this.io.sockets.on( 'connection', function( socket ){
        socket.emit( 'ping', {hello: 'client'} );

        socket.on( 'pong', function( msg ){
            console.log( msg );
        });
    });
};