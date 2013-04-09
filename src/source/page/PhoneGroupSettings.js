/**
 * @author Marenin Alexander
 * April 2013
 */

enyo.kind({
    name: 'rc.page.PhoneGroupSettings',
    kind: 'rc.Page',
    caption: loc.PhoneGroupSettings.caption,
    classes: 'ui-phone-group-settings',
    showNext: true,
    nextButtonCaption: loc.done,

    handlers: {
        onOpen: 'pageOpen',
        onNext: 'save',
        onRemoveTap: 'removeTap'
    },

    components: [
        {classes: 'ui-header-left', content: loc.PhoneGroupSettings.groupWillRing},
        {kind: 'onyx.InputDecorator', classes: 'ui-text-input ui-block', components: [
            {name: 'rings', kind: 'onyx.Input'}
        ]},
        {name: 'list', classes: 'ui-phone-group-settings-list'}
    ],

    pageOpen: function(){
        var collection = this.getPageData(),
            list = this.$.list;

        this.$.rings.setValue( collection.get('rings') );

        list.destroyComponents();
        collection.forEach( function( model ){
            list.createComponent({
                kind: 'rc.page.PhoneGroupSettingsItem',
                model: model
            });
        });
        this.render();
    },

    save: function(){
        var collection = this.getPageData(),
            rings = Number( this.$.rings.getValue() );

        if ( rings > 0 && rings < 10 ){
            collection.set( 'rings', rings );
            collection.set( 'disabled', collection.every( function( model ){
                return !model.get( 'enabled' );
            }));
            App.back();
        }
        else
            alert( loc.PhoneGroupSettings.ringsIncorrect );
    },

    removeTap: function(){
        this.log( 'piu' );
    }
});


enyo.kind({
    name: 'rc.page.PhoneGroupSettingsItem',
    classes: 'ui-phone-group-settings-item',

    published: {
        model: null
    },

    events: {
        onRemoveTap: ''
    },

    components: [
        {name: 'name', classes: 'ui-phone-group-settings-item-name'},
        {name: 'number', classes: 'ui-phone-group-settings-item-number'},
        {classes: 'ui-phone-group-settings-item-line', components: [
            {name: 'status', ontap: 'switchStatus', kind: 'rc.Switch', caption: loc.PhoneGroupSettings.status, classes: 'ui-phone-group-settings-item-status'},
            {name: 'remove', ontap: 'removeTap', kind: 'rc.Button', content: loc.PhoneGroupSettings.removeFromGroup, classes: 'ui-phone-group-settings-item-remove'}
        ]}
    ],

    create: function(){
        this.inherited( arguments );
        this.modelChanged();
    },

    modelChanged: function(){
        var model = this.getModel();
        this.$.name.setContent( model.get('name') );
        this.$.number.setContent( model.get('number') );
        this.$.status.setValue( model.get('enabled') );
    },

    removeTap: function(){
        this.doRemoveTap({ model: this.getModel() });
    },

    switchStatus: function(){
        var model = this.getModel();
        model.set( 'enabled', !model.get('enabled') );
    }
});
