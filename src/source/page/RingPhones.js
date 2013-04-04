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
        onOpen: 'pageOpen',
        onRadioTap: 'handleToolbar'
    },

    published: {
        phonesCollection: null
    },

    components: [
        {kind: 'FittableColumns', classes: 'ui-ring-phones-toolbar', components: [
            {name: 'up', kind: 'rc.Button', classes: 'ui-ring-phones-up'},
            {name: 'down', disabled: true, kind: 'rc.Button', classes: 'ui-ring-phones-down'},
            {name: 'split', content: loc.RingPhones.split, kind: 'rc.Button'},
            {name: 'join', content: loc.RingPhones.join, kind: 'rc.Button'}
        ]},
        {name: 'phones', classes: 'ui-ring-phones-list'},
        {kind: 'rc.NavButton', ontap: 'goToNowhere', caption: loc.RingPhones.ringExistingPhoneNumbers},
        {kind: 'rc.NavButton', ontap: 'goToNowhere', caption: loc.RingPhones.forward}
    ],

    create: function(){
        this.inherited( arguments );
        this.phonesCollectionChanged();
    },

    phonesCollectionChanged: function(){
        var container = this.$.phones,
            collection = this.getPhonesCollection();

        if ( collection ){
            container.destroyComponents();
            collection.forEach( function( group ){
                container.createComponent({
                    kind: rc.PhoneGroup,
                    collection: group
                });
            }, this );
        }
    },

    pageOpen: function(){
        var pageData = this.getPageData();
        this.setPhonesCollection( pageData && pageData.phones
            ? pageData.phones
            : this.loadCollection()
        );
    },

    loadCollection: function(){
        return this._getMockCollection();
    },

    handleToolbar: function(){
        this.log( 'fired' );
        return true;
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
                new Class( {id: 5, rings: false}, {models: [
                    {id: 6, name: 'Marta\'s room', number: '(452) 345-4077'}
                ]})
            ]
        });
    }
});