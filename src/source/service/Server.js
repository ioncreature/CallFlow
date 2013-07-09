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
        this.socket.disconnect();
        delete this.socket;
        setTimeout( callback, 100 );
    },

    /**
     * @param {Function?} callback
     */
    connect: function( callback ){
        var server = this,
            socket;

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

        socket.on( 'incomingCall', function( msg ){
            App.trigger( 'incomingCall', msg );
        });

        socket.on( 'hangup', function( msg ){
            App.trigger( 'hangup', msg );
        });

        socket.on( 'accept', function( msg ){
            App.trigger( 'accept', msg );
        });

    },

    registerNumbers: function( phoneNumbers ){
        this.socket.emit( 'registerNumbers', {numbers: phoneNumbers} );
    },

    sendHangup: function( msg ){
        this.socket.emit( 'hangup', {incoming: msg && !!msg.incoming} );
    },

    sendAccept: function(){
        this.socket.emit( 'accept', {accept: true} );
    },

    sendReject: function(){
        this.socket.emit( 'reject', {reject: true} );
    },

    /**
     * @param {{number: string, video: boolean}} params
     * @param {Function} callback
     */
    outboundCall: function( params, callback ){
        var msg = enyo.mixin( {number: '', video: false}, params );
        this.socket.emit( 'outboundCall', msg, callback );
    },

    query: function( command, msg, callback ){
        this.socket.emit( command, msg, callback );
    }
});