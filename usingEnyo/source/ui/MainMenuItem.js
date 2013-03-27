/**
 * @author Marenin Alexander
 * March 2013
 */

enyo.kind({
    name: 'rc.MainMenuItem',
    kind: 'Control',
    classes: 'ui-main-menu-item',

    published: {
        caption: '',
        value: '',
        icon: ''
    },

    components: [
        {name: 'icon', classes: 'ui-main-menu-item-icon'},
        {name: 'caption', classes: 'ui-main-menu-item-caption'},
        {name: 'value', classes: 'ui-main-menu-item-value'}
    ],

    create: function(){
        this.inherited( arguments );
        this.captionChanged();
        this.valueChanged();
        this.previousIcon = this.getIcon();
        this.iconChanged();
    },

    captionChanged: function(){
        this.$.caption.setContent( this.getCaption() );
    },

    valueChanged: function(){
        var value = this.getValue();
        if ( !value )
            this.$.value.hide();
        else
            this.$.value.setContent( value );
    },

    iconChanged: function(){
        var icon = this.$.icon;
        icon.removeClass( this.previousIcon );
        icon.addClass( this.getIcon() );
        this.previousIcon = this.getIcon();
    }
});