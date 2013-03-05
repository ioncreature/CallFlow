/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    name: 'rc.NavToolbar',
    classes: 'onyx onyx-toolbar onyx-toolbar-inline ui-nav-toolbar',
    kind: 'FittableColumns',

    published: {
        showBack: true,
        showNext: false,
        caption: 'This Is Caption'
    },

    events: {
        onBack: '',
        onNext: ''
    },

    components: [
        { name: 'back', kind: onyx.Button, content: 'Back', ontap: 'backTapped', classes: 'ui-nav-toolbar-button' },
        { name: 'caption', fit: true, classes: 'ui-nav-toolbar-caption' },
        { name: 'next', kind: onyx.Button, content: 'Next', ontap: 'nextTapped', classes: 'ui-nav-toolbar-button' }
    ],

    backTapped: function(){
        this.doBack();
    },

    nextTapped: function(){
        this.doNext();
    },

    create: function(){
        this.inherited( arguments );
        this.showBackChanged();
        this.showNextChanged();
        this.captionChanged();
    },

    showBackChanged: function(){
        this.$.back.setShowing( this.getShowBack() );
    },

    showNextChanged: function(){
        this.$.next.setShowing( this.getShowNext() );
    },

    captionChanged: function(){
        this.$.caption.setContent( this.getCaption() );
    }
});