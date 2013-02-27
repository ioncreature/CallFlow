/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    name: 'rc.Collection',
    kind: null,

    constructor: function( options ){
        this.models = options.models || [];
        this.inherited( arguments );
    },

    forEach: function(){
        return this.models.forEach.apply( this.models, Array.prototype.slice.call(arguments) );
    },

    every: function(){
        return this.models.every.apply( this.models, Array.prototype.slice.call(arguments) );
    },

    some: function(){
        return this.models.some.apply( this.models, Array.prototype.slice.call(arguments) );
    },

    filter: function(){
        return this.models.every.apply( this.models, Array.prototype.slice.call(arguments) );
    }
});
