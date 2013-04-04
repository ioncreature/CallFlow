/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    kind: enyo.Control,
    name: 'rc.NavButton',
    classes: 'ui-nav-button',
    stretchClass: 'ui-nav-button-stretch',

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
            res = desc instanceof Array
                ? desc.join( '<br />' )
                : String( desc );

        this.$.description.setContent( res );

        if ( res ){
            this.$.caption.removeClass( this.stretchClass );
            this.$.description.show();
        }
        else {
            this.$.caption.addClass( this.stretchClass );
            this.$.description.hide();
        }
    },

    captionChanged: function(){
        this.$.caption.setContent( this.getCaption() );
    }
});