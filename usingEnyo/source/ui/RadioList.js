/**
 * @author Marenin Alexander
 * February 2013
 */


enyo.kind({
    kind: 'rc.VerticalGroup',
    name: 'rc.RadioList',
    classes: 'ui-radio-list',

    published: {
        items: null,
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

    itemKind: 'rc.RadioListItem',
    activeChild: null,

    create: function(){
        this.bindings = [];
        this.inherited( arguments );
        this.itemsChanged();
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
        this.bindings.push( this.collection.on('add', this.createComponentByModel, this) );
        this.children.length && this.onItemTap( this.children[0] );
    },

    createComponentByModel: function( model ){
        var adapter = this.getAdapter() || this.defaultAdapter,
            defaults = {
                kind: this.itemKind,
                ontap: 'onItemTap'
            },
            names = this.getWatchedNames();

        var component = this.createComponent( defaults, adapter.call(this, model) );
        this.bindings.push( model.on(names.caption, component.setCaption, component) );
        this.bindings.push( model.on(names.description, component.setDescription, component) );
        this.render();
    },

    removeBindings: function(){
        while ( this.bindings.length )
            this.bindings.pop().remove();
    },

    itemsChanged: function(){
        var items = this.getItems();
        this.removeBindings();
        this.destroyComponents();
        if ( items && items.length ){
            items.forEach( function( item ){
                this.createComponent({
                    kind: this.itemKind,
                    caption: item.caption,
                    description: item.description,
                    ontap: 'onItemTap'
                });

                if ( item.active )
                    this.onItemTap( this.children[this.children.length - 1] );
            }, this );
        }
        this.render();
    },

    onItemTap: function( inSender, inEvent ){
        if ( !inSender.getActive() ){
            inSender.setActive( true );
            this.activeChild && this.activeChild.setActive( false );
            this.activeChild = inSender;
            this.doActivate( inSender );
        }
    }
});