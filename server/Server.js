/**
 * @author Marenin Alexander
 * May 2013
 */


var http = require( 'http' );
var WebSocketServer = require( 'websocket' ).server;

module.exports = Server;

function Server( port ){
    this.port = port || 80;
}

Server.prototype.start = function(){
    var server = this;
    this.httpServer = http.createServer( function( req, res ){
        // implement web server logic here
        console.log( new Date() + ' Received request for ' + req.url);
        res.writeHead(404);
        res.end();
    });

    this.httpServer.listen( this.port );

    this.presenceServer = new WebSocketServer({
        httpServer: this.httpServer,
        autoAcceptConnection: false
    });

    this.presenceServer.on( 'request', function( request ){
        if ( !originIsAllowed( request.origin ) ){
            // Make sure we only accept requests from an allowed origin
            request.reject();
            console.log( (new Date()) + ' Connection from origin ' + request.origin + ' rejected.' );
            return;
        }

        var connection = request.accept( 'echo-protocol', request.origin );
        console.log( (new Date()) + ' Connection accepted.' );

        connection.on( 'message', function( message ){
            if ( message.type === 'utf8' ){
                console.log( 'Received Message: ' + message.utf8Data );
                connection.sendUTF( message.utf8Data );
            }
            else if ( message.type === 'binary' ){
                console.log( 'Received Binary Message of ' + message.binaryData.length + ' bytes' );
                connection.sendBytes( message.binaryData );
            }
        });

        connection.on( 'close', function( reasonCode, description ){
            console.log( (new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.' );
            console.log( 'reasonCode: ', reasonCode );
            console.log( 'description: ', description );
        });
    });

    function originIsAllowed( origin ){
        return true;
    }
};
