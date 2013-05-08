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
        caption: '',
        backType: 1, //rc.NavToolbar.CANCEL
        nextType: 2  //rc.NavToolbar.DONE
    },

    statics: {
        CANCEL: 1,
        DONE: 2,
        BACK: 3,
        NEXT: 4,
        MENU: 5
    },

    events: {
        onBackTap: '',
        onNextTap: ''
    },

    components: [
        {name: 'back', kind: onyx.Button, ontap: 'backTapped', classes: 'ui-nav-toolbar-button', allowHtml: true},
        {name: 'caption', fit: true, classes: 'ui-nav-toolbar-caption'},
        {name: 'next', kind: onyx.Button, ontap: 'nextTapped', classes: 'ui-nav-toolbar-button'}
    ],

    backTapped: function(){
        this.doBackTap();
    },

    nextTapped: function(){
        this.doNextTap();
    },

    create: function(){
        this.inherited( arguments );
        this.showBackChanged();
        this.showNextChanged();
        this.captionChanged();
        this.backTypeChanged();
        this.nextTypeChanged();
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

    backTypeChanged: function( oldType ){
        var oldClass = this._getButtonClassName( oldType ),
            newClass = this._getButtonClassName( this.getBackType() );

        this.$.back.removeClass( oldClass );
        this.$.back.addClass( newClass );
    },

    nextTypeChanged: function( oldType ){
        var oldClass = this._getButtonClassName( oldType ),
            newClass = this._getButtonClassName( this.getNextType() );

        this.$.next.removeClass( oldClass );
        this.$.next.addClass( newClass );
    },

    _getButtonClassName: function( buttonType ){
        var s = rc.NavToolbar;
        switch ( buttonType ){
            case s.CANCEL:
                return 'ui-nav-toolbar-cancel';
            case s.DONE:
                return 'ui-nav-toolbar-done';
            case s.BACK:
                return 'ui-nav-toolbar-back';
            case s.NEXT:
                return 'ui-nav-toolbar-next';
            case s.MENU:
            default:
                return 'ui-nav-toolbar-menu';
        }
    }
});