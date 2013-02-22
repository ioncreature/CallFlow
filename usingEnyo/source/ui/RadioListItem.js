/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    kind: 'Control',
    name: 'rc.RadioListItem',

    events: {
        onTap: function(){}
    },

    published: {
        caption: '',
        description: ''
    },

    components: [
        {name: 'caption'},
        {name: 'description'}
    ],

    create: function(){
        this.inherited( arguments );
        this.captionChanged();
        this.descriptionChanged();
    },

    captionChanged: function(){
        this.$.caption.setContent( this.getCaption() );
    },

    descriptionChanged: function(){
        this.$.description.setContent( this.getDescription() );
    }
});