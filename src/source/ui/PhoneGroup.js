/**
 * @author Marenin Alexander
 * April 2013
 */

enyo.kind({
    name: 'rc.PhoneGroup',
    classes: 'ui-phone-group',
    itemKind: 'rc.PhoneItem',

    published: {
        collection: null,
        active: false
    },

    events: {
        onRadioTap: ''
    },

    components: [
        {classes: 'ui-phone-group-radio-container', ontap: 'handleRadioTap', components: [
            {name: 'radio', classes: 'ui-phone-group-radio'}
        ]},
        {name: 'items', classes: 'ui-phone-group-items', fit: true},
        {classes: 'ui-phone-group-next-icon'},
        {name: 'rings', classes: 'ui-phone-group-rings', components: [
            {name: 'count', classes: 'ui-phone-group-rings-count', content: 5},
            {classes: 'ui-phone-group-rings-caption', content: loc.PhoneGroup.rings}
        ]}
    ],

    create: function(){
        this.inherited( arguments );
        this.collectionChanged();
        this.activeChanged();
    },

    collectionChanged: function(){
        var collection = this.getCollection(),
            list = this.$.items;

        list.destroyComponents();
        collection.forEach( function( model ){
            list.createComponent({
                kind: this.itemKind,
                model: model
            });
        }, this );

        this.$.count.setContent( collection.get('rings') );
    },

    activeChanged: function(){
        if ( this.getActive() )
            this.$.radio.addClass( 'active' );
        else
            this.$.radio.removeClass( 'active' );
    },

    handleRadioTap: function(){
        this.setActive( !this.getActive() );
        this.log( 'event' );
        this.doRadioTap( this );
    }
});