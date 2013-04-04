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
        {classes: 'ui-call-flow-item-header', ontap: 'headerTap', components: [
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
        if ( this.getActive() ){
            this.removeClass( 'inactive' );
            this.$.client.show();
            this.$.description.show();
            this.$.value.show();
            this.$.editButton.show();
        }
        else {
            this.addClass( 'inactive' );
            this.$.client.hide();
            this.$.description.hide();
            this.$.value.hide();
            this.$.editButton.hide();
        }
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
    },

    headerTap: function(){
        if ( !this.getActive() )
            this.doButtonTap.apply( this, arguments );
    }
});