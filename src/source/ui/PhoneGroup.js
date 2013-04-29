/**
 * @author Marenin Alexander
 * April 2013
 */

enyo.kind({
    name: 'rc.PhoneGroup',
    kind: 'rc.Control',
    classes: 'ui-phone-group',
    itemKind: 'rc.PhoneItem',

    published: {
        collection: null,
        active: false,
        disabled: false,
        readOnly: false,
        rings: 0
    },

    events: {
        onRadioTap: ''
    },

    components: [
        {name: 'radioContainer', classes: 'ui-phone-group-radio-container', ontap: 'handleRadioTap', components: [
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
        this.disabledChanged();
        this.ringsChanged();
        this.readOnlyChanged();
    },

    collectionChanged: function(){
        var coll = this.getCollection(),
            list = this.$.items;

        list.destroyComponents();
        coll.forEach( function( model ){
            list.createComponent({
                kind: this.itemKind,
                model: model
            });
        }, this );

        this.addBinding( coll.on('rings', this.setRings, this) );
        this.addBinding( coll.on('disabled', this.setDisabled, this) );
    },

    activeChanged: function(){
        if ( this.getActive() )
            this.$.radio.addClass( 'active' );
        else
            this.$.radio.removeClass( 'active' );
    },

    disabledChanged: function(){
        this.setDisabled( this.getCollection().get('disabled') );
        if ( this.getDisabled() )
            this.addClass( 'disabled' );
        else
            this.removeClass( 'disabled' );
    },

    ringsChanged: function(){
        this.$.count.setContent( this.getCollection().get('rings') );
    },

    readOnlyChanged: function(){
        this.log( this.name + this.readOnly );
        if ( this.getReadOnly() )
            this.addClass( 'readOnly' );
        else
            this.removeClass( 'readOnly' );
    },

    handleRadioTap: function(){
        this.setActive( !this.getActive() );
        this.doRadioTap( this );
        return true;
    }
});