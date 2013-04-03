/**
 * @author Marenin Alexander
 * April 2013
 */

enyo.kind({
    name: 'rc.PhoneGroup',
    classes: 'ui-phone-group',
    defaultKind: 'rc.PhoneItem',

    published: {
        collection: null
    },

    groupTools: [

    ],

    create: function(){
        this.inherited( arguments );
        this.collectionChanged();
    },

    collectionChanged: function(){
        // bla bla bla
    }
});