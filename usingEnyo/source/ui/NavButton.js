/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    kind: enyo.Control,
    name: 'rc.NavButton',
    classes: 'ui-nav-button',

    published: {
        caption: 'Caption',
        value: 'Value'
    },

    components: [
        {name: 'caption', classes: 'ui-nav-button-content'},
        {name: 'value', classes: 'ui-nav-button-value'},
        {name: 'nextIcon', content: '>', classes: 'ui-nav-button-icon'}
    ],

    create: function(){
        this.inherited( arguments );
        this.$.caption.setContent( this.getCaption() );
        this.$.value.setContent( this.getValue() );
    }
});