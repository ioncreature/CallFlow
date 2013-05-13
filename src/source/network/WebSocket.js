/**
 * @author Marenin Alexander
 * May 2013
 */

enyo.kind({
    name: 'rc.network.WebSocket',
    kind: '',
    websocket: null,
    connection: null,
    path: false,

    constructor: function( path ){
        this.path = path;
        if ( typeof WebSocket == 'function' )
            this.websocket = WebSocket;
        else if ( typeof MozWebSocket == 'function' )
            this.websocket = MozWebSocket;

    },

    connect: function(){
        this.ws = new this.WebSocket( App );
    },

    close: function(){

    },

    getWSConstructor: function(){
        if ( typeof WebSocket == 'function' )
            return WebSocket;
        else if ( typeof MozWebSocket == 'function' )
            return MozWebSocket;
        else
            ;
    }
});