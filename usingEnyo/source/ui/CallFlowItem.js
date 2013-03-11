/**
 * @author Marenin Alexander
 * February 2013
 */


enyo.kind({
    kind: 'Control',
    name: 'rc.CallFlowItem',
    classes: 'ui-call-flow-item',
    events: {
        onButtonTap: ''
    },

    published: {
        caption: '',
        description: '',
        value: '',
        valueClasses: '',
        active: true,
        isFull: true
    },

    itemTools: [
        {name: 'editButton', classes: 'ui-call-flow-item-edit-button', ontap: 'doButtonTap'},
        {classes: 'ui-call-flow-item-header', components: [
            {classes: 'ui-call-flow-item-caption', components: [
                {name: 'caption'},
                {name: 'value'}
            ]},
            {name: 'description', classes: 'ui-call-flow-item-description', allowHtml: true}
        ]},
        {name: 'client'}
    ],

    create: function(){
        this.inherited( arguments );
        this.captionChanged();
        this.descriptionChanged();
        this.isFullChanged();
        this.activeChanged();
        this.valueChanged();
        this.valueClassesChanged();
    },

    activeChanged: function(){
        this.getActive()
            ? this.removeClass( 'inactive' )
            : this.addClass( 'inactive' );
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
    },

    isFullChanged: function(){
        var isFull = this.getIsFull();
        if ( isFull )
            this.$.description.show();
        else
            this.$.description.hide();
    },

    valueChanged: function(){
        this.$.value.setContent( this.getValue() );
    },

    valueClassesChanged: function(){
        this.$.value.setClasses( this.getValueClasses() );
    }
});