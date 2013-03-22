/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    kind: 'Control',
    name: 'rc.RadioListItem',
    classes: 'ui-radio-list-item',
    activeClass: 'active',

    published: {
        active: false,
        caption: '',
        description: ''
    },

    components: [
        {name: 'caption'},
        {name: 'ruler', classes: 'ui-radio-list-item-ruler'},
        {name: 'description'}
    ],

    create: function(){
        this.inherited( arguments );
        this.captionChanged();
        this.descriptionChanged();
        this.activeChanged();
    },

    captionChanged: function(){
        this.$.caption.setContent( this.getCaption() );
    },

    descriptionChanged: function(){
        this.$.description.setContent( this.getDescription() );
    },

    activeChanged: function(){
        if ( this.getActive() )
            this.addClass( this.activeClass );
        else
            this.removeClass( this.activeClass );
    }
});