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
    },

    setConfig: function( config ){
        this.url = config.path;
    },

    /**
     * @param {Function?} callback
     */
    connect: function( callback ){
        if ( this.socket )
            this.socket.close();
        this.socket = io.connect( this.url );

        var socket = this.socket,
            server = this;

        socket.on( 'connect', function(){
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