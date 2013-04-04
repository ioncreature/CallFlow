/**
 * @author Marenin Alexander
 * April 2013
 */

enyo.kind({
    name: 'rc.PhoneGroup',
    kind: 'FittableRows',
    classes: 'ui-phone-group',
    defaultKind: 'rc.PhoneItem',

    published: {
        collection: null
    },

    groupTools: [
        {name: 'nav', kind: 'rc.NavToolbar', onBack: 'doBack', onNext: 'doNext'},
        {name: 'client', fit: true, kind: 'rc.Scroller'}
    ],

    create: function(){
        this.inherited( arguments );
        this.collectionChanged();
    },

    initComponents: function(){
        this.createChrome( this.groupTools );
        this.inherited( arguments );
    },

    collectionChanged: function(){
        // bla bla bla
    }
});