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
        {classes: 'ui-label', content: loc.PhoneGroupSettings.groupWillRing},
        {kind: 'onyx.InputDecorator', classes: 'ui-text-input ui-block', components: [
            {name: 'rings', kind: 'onyx.Input'}
        ]},
        {name: 'list', classes: 'ui-phone-group-settings-list'}
    ],

    pageOpen: function(){
        var collection = this.getPageData();

        this.$.rings.setValue( collection.get('rings') );
        this.redrawList();
    },

    redrawList: function(){
        var collection = this.getPageData(),
            list = this.$.list,
            length;

        list.destroyComponents();
        length = collection.getQuantity();
        collection.forEach( function( model ){
            list.createComponent({
                kind: 'rc.page.PhoneGroupSettingsItem',
                model: model,
                showRemoveButton: length > 1
            });
        });
        this.render();
    },

    save: function(){
        var collection = this.getPageData(),
            rings = Number( this.$.rings.getValue() );

        if ( rings > 0 && rings < 10 ){
            collection.set( 'rings', rings );
            collection.updateDisabled();
            App.back();
        }
        else
            alert( loc.PhoneGroupSettings.ringsIncorrect );
    },

    removeTap: function(){
        this.log( 'piu' );
    }
});


/**
 * Page specific ui element
 */
enyo.kind({
    name: 'rc.page.PhoneGroupSettingsItem',
    classes: 'ui-phone-group-settings-item',

    published: {
        model: null,
        showRemoveButton: true
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
        this.showRemoveButtonChanged();
    },

    modelChanged: function(){
        var model = this.getModel();
        this.$.name.setContent( model.get('name') );
        this.$.number.setContent( model.get('number') );
        this.$.status.setValue( model.get('enabled') );
    },

    showRemoveButtonChanged: function(){
        this.$.remove.setShowing( this.getShowRemoveButton() );
    },

    removeTap: function(){
        this.doRemoveTap({ model: this.getModel() });
    },

    switchStatus: function(){
        var model = this.getModel();
        model.set( 'enabled', !model.get('enabled') );
    }
});
