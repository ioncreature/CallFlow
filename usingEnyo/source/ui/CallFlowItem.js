/**
 * @author Marenin Alexander
 * February 2013
 */


enyo.kind({
    kind: 'Control',
    name: 'rc.CallFlowItem',
    classes: 'ui-call-flow-item',

    published: {
        caption: '',
        description: ''
    },

    itemTools: [
        {name: 'editButton', classes: 'ui-call-flow-item-edit-button'},
        {classes: 'ui-call-flow-item-header', components: [
            {name: 'caption', classes: 'ui-call-flow-item-caption'},
            {name: 'description', classes: 'ui-call-flow-item-description', allowHtml: true},
        ]},
        {name: 'client'}
    ],

    create: function(){
        this.inherited( arguments );
        this.captionChanged();
        this.descriptionChanged();
    },

    initComponents: function(){
        this.createChrome( this.itemTools );
        this.inherited( arguments );
    },

    captionChanged: function(){
        this.$.caption.setContent( this.getCaption() );
    },

    descriptionChanged: function(){
        this.$.description.setContent( this.getDescription() );
    }
});