/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({

    name: 'rc.Observable',
    kind: enyo.Object,
    handlers: null,

    constructor: function(){
        this.reset();
    },

    on: function( name, callback, context ){
        var handlers = this.handlers,
            cb = callback.bind( context || null );
        if ( handlers[name] )
            handlers[name].push( cb );
        else
            handlers[name] = [cb];

        return {
            remove: function(){
                var i = handlers[name].indexOf( cb );
                delete handlers[name][i];
            }
        };
    },

    trigger: function( event ){
        var queue = this.handlers[event],
            args = Array.prototype.slice.call( arguments, 1 );

        if ( queue )
            queue.forEach( function( callback ){
                callback.apply( this, args );
            }, this );
    },

    reset: function(){
        this.handlers = {};
    }
});