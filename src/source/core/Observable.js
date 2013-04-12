/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({

    name: 'rc.Observable',
    kind: enyo.Object,
    handlers: null,

    on: function( name, callback, context ){
        if ( !this.handlers )
            this.resetHandlers();

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

    /**
     * @param {string} event
     * @param {...[*]} arg
     */
    trigger: function( event, arg ){
        var queue = this.handlers[event],
            args = Array.prototype.slice.call( arguments, 1 );

        if ( queue )
            queue.forEach( function( callback ){
                callback.apply( this, args );
            }, this );
    },

    resetHandlers: function(){
        this.handlers = {};
    }
});