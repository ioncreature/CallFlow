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
        {kind: 'FittableRows', name: 'headerLine', components: [
            {name: 'editButton', classes: 'ui-call-flow-edit-button', content: 'edit'},
            {name: 'caption', content: 'Caption'}
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