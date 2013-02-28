/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({

    name: 'rc.Observable',
    kind: null,
    handlers: null,

    constructor: function(){
        this.reset();
    },

    on: function( name, callback ){
        var handlers = this.handlers;
        if ( handlers[name] )
            handlers[name].push( callback );
        else
            handlers[name] = [callback];

        return function(){
            var i = handlers[name].indexOf( callback );
            delete handlers[name][i];
        }
    },

    notify: function( event ){
        var queue = this.handlers[name],
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