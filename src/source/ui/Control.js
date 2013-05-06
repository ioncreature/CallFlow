/**
 * @author Marenin Alexander
 * April 2013
 */

enyo.kind({
    name: 'rc.Control',
    kind: 'Control',

    addBinding: function( handler ){
        if ( this.bindings )
            this.bindings.push.apply( this.bindings, handler instanceof Array ? handler : [handler] );
        else
            this.bindings = [].concat( handler );
    },

    removeBindings: function(){
        if ( this.bindings )
            while ( this.bindings.length )
                this.bindings.pop().remove();
    },

    destroy: function(){
        this.removeBindings();
        this.inherited( arguments );
    }
});