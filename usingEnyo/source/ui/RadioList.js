/**
 * @author Marenin Alexander
 * February 2013
 */


enyo.kind({
    kind: 'rc.VerticalGroup',
    name: 'rc.RadioList',
    classes: 'ui-radio-list',

    published: {
        items: null
    },

    handlers: {
        onActivate: ''
    },

    itemKind: 'rc.RadioListItem',
    activeChild: null,

    create: function(){
        this.inherited( arguments );
        this.itemsChanged();
        this.render();
    },

    itemsChanged: function(){
        var items = this.getItems(),
            component = this;

        this.destroyComponents();
        if ( items && items.length ){
            items.forEach( function( item ){
                component.createComponent({
                    kind: component.itemKind,
                    caption: item.caption,
                    description: item.description,
                    ontap: 'onItemTap'
                });

                if ( item.active )
                    component.onItemTap( component.children[component.children.length - 1] );
            });
        }
    },

    onItemTap: function( inSender, inEvent ){
        if ( !inSender.getActive() ){
            inSender.setActive( true );
            this.activeChild && this.activeChild.setActive( false );
            this.activeChild = inSender;
        }
    }
});