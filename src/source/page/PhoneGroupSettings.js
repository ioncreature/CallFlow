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
        onNext: 'save'
    },

    components: [
        {classes: 'ui-header-left', content: loc.PhoneGroupSettings.groupWillRing},
        {kind: 'onyx.InputDecorator', classes: 'ui-text-input ui-block', components: [
            {name: 'rings', kind: 'onyx.Input'}
        ]},
        {name: 'status', kind: 'rc.ToggleButton', caption: loc.PhoneGroupSettings.status},
        {name: 'list', classes: 'ui-phone-group-settings-list'}
    ],

    pageOpen: function(){
        var collection = this.getPageData(),
            list = this.$.list;

        this.$.rings.setValue( collection.get('rings') );
        this.$.status.setValue( !collection.get('disabled') );

        list.destroyComponents();
        collection.forEach( function( model ){
            list.createComponent({
                kind: 'rc.PhoneItem',
                model: model
            });
        });
        this.render();
    },

    save: function(){
        var collection = this.getPageData(),
            rings = Number( this.$.rings.getValue() ),
            disabled = !this.$.status.getValue();

        if ( rings > 0 && rings < 10 ){
            collection.set( 'rings', rings );
            collection.set( 'disabled', disabled );
            App.back();
        }
        else
            alert( loc.PhoneGroupSettings.ringsIncorrect );
    }
});