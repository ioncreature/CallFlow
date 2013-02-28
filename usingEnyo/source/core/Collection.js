/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    name: 'rc.Collection',
    kind: 'rc.Observable',

    models: null,
    model: null,
    idField: null,

    constructor: function( options ){
        this.models = [];
        this.add( options.models || [] );
        this.model = options.model || rc.Model;
        this.idField = options.idField;
        this.inherited( arguments );
    },

    /**
     * @param {Array|rc.Model} models
     * @param {Object?} options
     * @param {boolean?} options.silent
     */
    add: function( models, options ){
        if ( models instanceof Array )
            models.forEach( function( model ){
                this.addModel( model, options );
            }, this );
        else
            this.addModel( this.models, options )
    },

    addModel: function( model, options ){
        var newModel = model instanceof this.model ? model : new this.model( model );
        this.models.push( newModel );
        if ( !(options && options.silent === true) )
            this.trigger( 'add', newModel );
    },

    /**
     * @param {Array|rc.Model} models
     * @param {Object?} options
     * @param {boolean?} options.silent
     */
    remove: function( models, options ){
        if ( models instanceof Array ){
            models.forEach( function( model ){
                this.removeModel( model, options );
            }, this );
        }
        else
            this.removeModel();
    },

    removeModel: function( model, options ){
        this.models.some( function( mod, i ){
            if ( model === mod ){
                this.removeByIndex( i, options );
                return true;
            }
        }, this );
    },

    removeById: function( id, options ){
        var idField = this.id;
        this.models.some( function( model, i ){
            if ( model.get(idField) === id ){
                this.removeByIndex( i, options );
                return true;
            }
        }, this );
    },

    removeByIndex: function( i, options ){
        delete this.models[i];
        if ( !(options && options.silent === true) )
            this.trigger( 'remove', this );
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
    },

    map: function(){
        return this.models.map.apply( this.models, arguments );
    }
});
