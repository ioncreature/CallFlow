/**
 * @author Marenin Alexander
 * May 2013
 */

enyo.kind({
    name: 'rc.service.Server',
    kind: 'rc.Observable',

    constructor: function( config ){
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
        var socket = this.socket;

        socket.on( 'connect', function(){
            callback && callback();
        });

        socket.on( 'ping', function( msg ){
            console.log( msg );
            socket.emit( 'pong', {hello: 'server'} );
        });
    },


    get: function( query, callback ){

    }
});