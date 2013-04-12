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
        {classes: 'ui-phone-group-settings-select', kind: 'onyx.PickerDecorator', components: [
            {},
            {name: 'rings', classes: 'ui-phone-group-settings-picker', kind: 'onyx.Picker', onSelect: 'itemSelected', components: [
                {name: 'r1', content: '1 ring', value: 1, active: true},
                {name: 'r2', content: '2 rings', value: 2},
                {name: 'r3', content: '3 rings', value: 3},
                {name: 'r4', content: '4 rings', value: 4},
                {name: 'r5', content: '5 rings', value: 5},
                {name: 'r6', content: '6 rings', value: 6},
                {name: 'r7', content: '7 rings', value: 7},
                {name: 'r8', content: '8 rings', value: 8},
                {name: 'r9', content: '9 rings', value: 9}
            ]}
        ]},
        {name: 'list', classes: 'ui-phone-group-settings-list'}
    ],

    pageOpen: function(){
        var collection = this.getPageData().collection;

        this.$.rings.setSelected( this.$['r' + collection.get('rings')] );
        this.redrawList();
    },

    redrawList: function(){
        var collection = this.getPageData().collection,
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
        var collection = this.getPageData().collection,
            rings = Number( this.$.rings.getSelected().value );

        if ( rings > 0 && rings < 10 ){
            collection.set( 'rings', rings );
            collection.updateDisabled();
            App.back();
        }
        else
            alert( loc.PhoneGroupSettings.ringsIncorrect );
    },

    removeTap: function( sender, event ){
        var all = this.getPageData().all,
            collection = this.getPageData().collection,
            model = event.model,
            newColl = collection.split( model );

        collection.remove( model );
        all.add( newColl );
        this.redrawList();
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
