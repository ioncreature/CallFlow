/**
 * @author Marenin Alexander
 * February 2013
 */


enyo.kind({
    kind: 'Control',
    name: 'rc.CallFlowItem',
    classes: 'ui-call-flow-item',

    published: {
        caption: ''
    },

    itemTools: [
        {classes: 'ui-call-flow-item-header', components: [
            {name: 'editButton', classes: 'ui-call-flow-item-edit-button'},
            {name: 'caption', classes: 'ui-call-flow-item-caption', content: 'Caption'}
        ]},
        {name: 'client'}
    ],

    create: function(){
        this.inherited( arguments );
        this.captionChanged();
    },

    initComponents: function(){
        this.createChrome( this.itemTools );
        this.inherited( arguments );
    },

    captionChanged: function(){
        this.$.caption.setContent( this.getCaption() );
    }
});