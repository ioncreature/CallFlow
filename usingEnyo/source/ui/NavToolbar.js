/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    classes: 'onyx onyx-toolbar onyx-toolbar-inline ui-nav-toolbar',
    kind: enyo.FittableColumns,
    name: 'NavToolbar',
    events: {
        onBack: '',
        onNext: ''
    },
    components: [
        { kind: onyx.Button, name: 'backButton', content: 'Back', ontap: 'backTapped', classes: 'ui-nav-toolbar-button' },
        { name: 'caption', content: 'Default Caption', fit: true, classes: 'ui-nav-toolbar-caption' },
        { kind: onyx.Button, name: 'nextButton', content: 'Next', ontap: 'nextTapped', classes: 'ui-nav-toolbar-button' }
    ],

    backTapped: function(){
        this.log( 'Back tapped' );
        this.doBack();
    },

    nextTapped: function(){
        this.log( 'Next tapped' );
        this.doNext();
    },

    create: function(){
        this.inherited( arguments );
        if ( !this.showNext )
            this.$.nextButton.hide();
        if ( !this.showBack )
            this.$.backButton.hide();
        if ( this.caption )
            this.$.caption.setContent( this.caption );
    }
});