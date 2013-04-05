/**
 * @author Marenin Alexander
 * April 2013
 */

enyo.kind({
    name: 'rc.Control',
    kind: 'Control',

    addBinding: function( handler ){
        if ( this.bindings )
            this.bindings.push( handler );
        else
            this.bindings = [handler];
    },

    removeBindings: function(){
        if ( this.bindings )
            while ( this.bindings.length )
                this.bindings.pop().remove();
    }
});