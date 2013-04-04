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
        description: '',
        data: ''
    },

    components: [
        {name: 'caption', classes: 'ui-nav-button-caption'},
        {name: 'description', classes: 'ui-nav-button-value', allowHtml: true},
        {classes: 'ui-icon-next'}
    ],

    create: function(){
        this.inherited( arguments );
        this.captionChanged();
        this.descriptionChanged();
    },

    descriptionChanged: function(){
        var desc = this.getDescription(),
            res;
        if ( desc instanceof Array )
            res = desc.join( '<br />' );
        else
            res = '' + desc;

        this.$.description.setContent( res );
    },

    captionChanged: function(){
        this.$.caption.setContent( this.getCaption() );
    }
});