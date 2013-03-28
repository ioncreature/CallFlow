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
        caption: 'This Is Caption',
        nextButtonCaption: loc.next,
        backType: 1
    },

    statics: {
        BACK: 1,
        MENU: 2
    },

    events: {
        onBack: '',
        onNext: ''
    },

    components: [
        { name: 'back', kind: onyx.Button, ontap: 'backTapped', classes: 'ui-nav-toolbar-button' },
        { name: 'caption', fit: true, classes: 'ui-nav-toolbar-caption' },
        { name: 'next', kind: onyx.Button, ontap: 'nextTapped', classes: 'ui-nav-toolbar-button' }
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
        this.nextButtonCaptionChanged();
        this.backTypeChanged();
    },

    showBackChanged: function(){
        this.$.back.setShowing( this.getShowBack() );
    },

    showNextChanged: function(){
        this.$.next.setShowing( this.getShowNext() );
    },

    captionChanged: function(){
        this.$.caption.setContent( this.getCaption() );
    },

    nextButtonCaptionChanged: function(){
        this.$.next.setContent( this.getNextButtonCaption() );
    },

    backTypeChanged: function(){
        var type = this.getBackType();
        if ( type === rc.NavToolbar.BACK )
            this.$.back.setContent( loc.back );
        else
            this.$.back.setContent( loc.menu );
    }
});