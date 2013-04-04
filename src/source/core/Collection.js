/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    name: 'rc.Collection',
    kind: 'rc.Model',

    models: null,
    model: null,
    idField: null,
    index: null,

    constructor: function( attributes, options ){
        this.inherited( arguments );
        this.models = [];
        this.model = options && options.model || this.model || rc.Model;
        this.idField = options && options.idField || this.idField;
        this.inherited( arguments );
        this.index = {};
        this.add( options && options.models || [], {silent: true} );
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
            this.addModel( models, options );
    },

    addModel: function( model, options ){
        var newModel,
            id;

        if ( model instanceof rc.Model )
            if ( model instanceof this.model )
                newModel = model;
            else
                throw new TypeError( 'Wrong model type' );
        else
            newModel = new this.model( model );

        id = newModel.get( this.idField );
        this.models.push( newModel );

        if ( id !== undefined )
            this.index[id] = newModel;

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
            this.removeModel( models );
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
        var idField = this.idField;

        this.models.some( function( model, i ){
            if ( model.get(idField) === id ){
                this.removeByIndex( i, options );
                return true;
            }
        }, this );
    },

    removeByIndex: function( i, options ){
        var id = this.models[i].get( this.idField );
        delete this.models[i];
        id && delete this.index[id];

        if ( !(options && options.silent === true) )
            this.trigger( 'remove', this );
    },

    getItems: function(){
        return this.models.filter( function( model ){
            return !!model;
        });
    },

    getById: function( id ){
        return this.index[id];
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
        return this.models.filter.apply( this.models, arguments );
    },

    map: function(){
        return this.models.map.apply( this.models, arguments );
    }
});
