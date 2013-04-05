/**
 * @author Marenin Alexander
 * February 2013
 */


enyo.kind({
    kind: 'FittableColumns',
    name: 'rc.ToggleButton',
    classes: 'ui-toggle-button',

    published: {
        caption: '',
        value: false
    },


    components: [
        {name: 'caption', fit: true},
        {kind: 'onyx.ToggleButton', name: 'toggle', onChange: 'toggleChanged', classes: 'ui-toggle-button-value' }
    ],

    create: function(){
        this.inherited( arguments );
        this.valueChanged();
        this.captionChanged();
    },

    toggleChanged: function(){
        this.setValue( this.$.toggle.getValue() );
    },

    captionChanged: function(){
        this.$.caption.setContent( this.getCaption() );
    },

    valueChanged: function(){
        this.$.toggle.setValue( this.getValue() );
    }
});