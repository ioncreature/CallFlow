/**
 * @author Marenin Alexander
 * March 2013
 */

enyo.kind({
    name: 'rc.page.RingPhones',
    kind: 'rc.Page',
    classes: 'ui-ring-phones',
    caption: loc.RingPhones.caption,
    showNext: true,

    handlers: {
        onOpen: 'pageOpen',
        onNext: 'goBack'
    },

    published: {
        phonesCollection: null
    },

    components: [
        {kind: 'FittableColumns', classes: 'ui-ring-phones-toolbar', components: [
            {name: 'up', disabled: true, kind: 'rc.Button', ontap: 'moveUp', classes: 'ui-ring-phones-up'},
            {name: 'down', disabled: true, kind: 'rc.Button', ontap: 'moveDown', classes: 'ui-ring-phones-down'},
            {name: 'split', disabled: true,  kind: 'rc.Button', ontap: 'splitGroups', content: loc.RingPhones.split},
            {name: 'join', disabled: true, kind: 'rc.Button', ontap: 'join', content: loc.RingPhones.join}
        ]},
        {
            name: 'phones',
            kind: 'rc.PhoneGroups',
            classes: 'ui-ring-phones-list',
            onItemTap: 'goToGroupSettings',
            onItemRadioTap: 'handleToolbar'
        },
        {kind: 'rc.NavButton', ontap: 'goToNowhere', caption: loc.RingPhones.ringExistingPhoneNumbers},
        {kind: 'rc.NavButton', ontap: 'goToNowhere', caption: loc.RingPhones.forward}
    ],

    phonesCollectionChanged: function(){
        var collection = this.getPhonesCollection();
        collection && this.$.phones.setCollection( collection );
    },

    pageOpen: function(){
        var data = this.getPageData();
        if ( !data.collection )
            throw new Error( 'Collection is undefined' );

        this.setPhonesCollection( data.collection );
    },

    goBack: function(){
        App.back();
    },

    handleToolbar: function(){
        var phones = this.$.phones,
            colls = phones.getSelectedCollections(),
            count = colls.length,
            haveLongGroup = colls.some( function( coll ){
                return coll.getQuantity() > 1
            });

        this.$.up.setDisabled( !count );
        this.$.down.setDisabled( !count );
        this.$.join.setDisabled( count <= 1 );
        this.$.split.setDisabled( !haveLongGroup );
    },

    moveUp: function(){
        this.$.phones.moveUpSelected();
    },

    moveDown: function(){
        this.$.phones.moveDownSelected();
    },

    splitGroups: function(){
        this.$.phones.splitSelected();
    },

    join: function(){
        this.$.phones.joinSelected();
    },

    goToGroupSettings: function( sender, event ){
        App.goTo( 'PhoneGroupSettings', {
            collection: event.collection,
            all: this.getPhonesCollection()
        });
    },

    goToNowhere: function(){
        App.goToNowhere();
    }
});