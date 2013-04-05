/**
 * @author Marenin Alexander
 * February 2013
 */


enyo.kind({
    kind: 'rc.VerticalGroup',
    name: 'rc.RadioList',
    classes: 'ui-radio-list',
    defaultKind: 'rc.RadioListItem',
    activeChild: null,

    published: {
        collection: null,
        adapter: null,
        watchedNames: {
            caption: 'caption',
            description: 'description'
        }
    },

    events: {
        onActivate: ''
    },

    handlers: {
        ontap: 'onItemTap'
    },

    create: function(){
        this.bindings = [];
        this.inherited( arguments );
        this.checkActiveItems();
    },

    defaultAdapter: function( model ){
        return {
            caption: model.get( 'name' ),
            description: model.get( 'description' )
        };
    },

    collectionChanged: function(){
        this.removeBindings();
        this.destroyComponents();
        this.collection.forEach( this.createComponentByModel, this );
        this.addBinding( this.collection.on('add', this.createComponentByModel, this) );
        this.children.length && this.onItemTap( this.children[0] );
    },

    createComponentByModel: function( model ){
        var adapter = this.getAdapter() || this.defaultAdapter,
            defaults = {
                kind: this.defaultKind,
                ontap: 'onItemTap'
            },
            names = this.getWatchedNames();

        var component = this.createComponent( defaults, adapter.call(this, model) );
        component.model = model;
        this.addBinding( model.on(names.caption, component.setCaption, component) );
        this.addBinding( model.on(names.description, component.setDescription, component) );
        this.render();
    },

    getActiveItem: function(){
        return this.activeChild;
    },

    getValue: function(){
        return this.getActiveItem().getValue();
    },

    setActiveItem: function( item ){
        this.activeChild && this.activeChild.setActive( false );
        item.setActive( true );
        this.activeChild = item;
        this.doActivate( item );
    },

    onItemTap: function( inSender ){
        if ( !inSender.getActive() )
            this.setActiveItem( inSender );
    },

    checkActiveItems: function(){
        this.children.forEach( function( item ){
            if ( item.getActive() )
                this.setActiveItem(item);
        }, this );
    }
});