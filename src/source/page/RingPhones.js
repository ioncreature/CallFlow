/**
 * @author Marenin Alexander
 * March 2013
 */

enyo.kind({
    name: 'rc.page.RingPhones',
    kind: 'rc.Page',
    classes: 'ui-ring-phones',
    caption: loc.RingPhones.caption,

    handlers: {
        onOpen: 'pageOpen'
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
        if ( !this.getPhonesCollection() )
            this.setPhonesCollection( this.loadCollection() );
    },

    loadCollection: function(){
        return this._getMockCollection();
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
        App.goTo( 'PhoneGroupSettings', event.collection );
    },

    goToNowhere: function(){
        App.goToNowhere();
    },

    _getMockCollection: function(){
        var Class = rc.data.PhoneCollection;
        return new Class({}, {
            model: Class,
            models: [
                new Class( {id: 1, rings: 5}, {models: [
                    {id: 1, name: 'Office desk phone', number: '(452) 345-6343'}
                ]}),
                new Class( {id: 2, rings: 3}, {models: [
                    {id: 2, name: 'John\'s room', number: '(452) 345-6345'}
                ]}),
                new Class( {id: 3, rings: 4}, {models: [
                    {id: 4, name: 'Mobile', number: '(674) 345-4572'},
                    {id: 5, name: 'Home', number: '(452) 433-3435'}
                ]}),
                new Class( {id: 4, rings: 3}, {models: [
                    {id: 6, name: 'Unassigned Cisco SPA-5', number: '(674) 345-4572'}
                ]}),
                new Class( {id: 5, rings: 4}, {models: [
                    {id: 6, name: 'Marta\'s room', number: '(452) 345-4077', enabled: false}
                ]})
            ]
        });
    }
});