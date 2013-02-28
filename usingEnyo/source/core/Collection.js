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
        return this.models.forEach.apply( this.models, arguments );
    },

    every: function(){
        return this.models.every.apply( this.models, arguments );
    },

    some: function(){
        return this.models.some.apply( this.models, arguments );
    },

    filter: function(){
        return this.models.every.apply( this.models, arguments );
    }
});
