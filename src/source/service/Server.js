/**
 * @author Marenin Alexander
 * May 2013
 */

enyo.kind({
    name: 'rc.service.Server',
    kind: 'rc.Observable',

    constructor: function( config, app ){
        this.callbacks = {};
        this.inherited( arguments );
        this.setConfig( config );
        this.connect();
        App.on( 'logout', this.reload, this );
    },

    reload: function(){
        var server = this;
        server.disconnect( function(){
            server.connect();
        });
    },

    setConfig: function( config ){
        this.url = config.path;
    },

    disconnect: function( callback ){
        this.socket.destroy();
        callback();
    },

    /**
     * @param {Function?} callback
     */
    connect: function( callback ){
        var server = this,
            socket;

        if ( server.socket )
            server.socket.close();
        server.socket = io.connect( server.url );

        socket = server.socket;

        socket.on( 'connect', function(){
            server.connected = true;
            callback && callback();
        });

        socket.on( 'ping', function( msg, fn ){
            console.log( msg );
            fn({ hello: 'server' });
        });
    },

    query: function( command, msg, callback ){
        this.socket.emit( command, msg, callback );
    }
});