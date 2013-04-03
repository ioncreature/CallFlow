/**
 * @author Marenin Alexander
 * April 2013
 */

enyo.kind({
    name: 'rc.Button',
    kind: enyo.Button,
    classes: 'enyo-unselectable ui-button',

    published: {
        disabled: false
    },

    create: function(){
        this.inherited( arguments );
        this.disabledChanged();
    },

    disabledChanged: function(){
        this.inherited( arguments );
        if ( this.getDisabled() )
            this.addClass( 'disabled' );
        else
            this.removeClass( 'disabled' );
    }
});

