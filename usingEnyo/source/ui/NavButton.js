/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    kind: enyo.Control,
    name: 'rc.NavButton',
    classes: 'ui-nav-button',

    published: {
        caption: '',
        description: ''
    },

    components: [
        {name: 'caption', classes: 'ui-nav-button-caption'},
        {name: 'description', classes: 'ui-nav-button-value'},
        {name: 'nextIcon', content: '>', classes: 'ui-nav-button-icon'}
    ],

    create: function(){
        this.inherited( arguments );
        this.$.caption.setContent( this.getCaption() );
        this.$.description.setContent( this.getDescription() );
    }
});