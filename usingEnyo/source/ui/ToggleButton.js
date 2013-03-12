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
        this.$.toggle.setValue( this.getValue() );
        this.$.caption.setContent( this.getCaption() );
    },

    captionChanged: function(){},

    valueChanged: function(){}
});