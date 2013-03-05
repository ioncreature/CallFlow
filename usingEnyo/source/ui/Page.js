/**
 * @author Marenin Alexander
 * March 2013
 */

enyo.kind({
    name: 'rc.Page',
    kind: 'FittableRows',
    classes: 'ui-page',

    published: {
        showBack: true,
        showNext: false,
        caption: 'Page Caption',
        scrollable: true
    },

    handlers: {
        onBack: '',
        onNext: ''
    },

    pageTools: [
        {name: 'nav', kind: 'rc.NavToolbar', onBack: 'doBack', onNext: 'doNext'},
        {
            name: 'client',
//            kind: 'Scroller',
            kind: 'FittableRows',
//            layoutKind: 'FittableRowsLayout',
//            touch: true,
//            horizontal: 'hidden',
//            vertical: 'hidden',
            fit: true
        }
//        {name: 'client'}
    ],

    doBack: function(){
        this.log( 'Back, Niggas!!!' );
        App.back();
    },

    doNext: function(){
        this.log( 'Go ahead, Niggas!!!' );
    },

    create: function(){
        this.inherited( arguments );
        this.showBackChanged();
        this.showNextChanged();
        this.captionChanged();
        this.scrollableChanged();
        this.flow();
    },

    initComponents: function(){
        this.createChrome( this.pageTools );
        this.inherited( arguments );
    },

    flow: function(){
        this.inherited( arguments );
        this.$.client.flow();
    },

    reflow: function(){
        this.inherited( arguments );
        this.$.client.reflow();
        this.log( this.getBounds(), this.$.client.getBounds() );
   	},

    showBackChanged: function(){
        this.$.nav.setShowBack( this.getShowBack() );
    },

    showNextChanged: function(){
        this.$.nav.setShowNext( this.getShowNext() );
    },

    captionChanged: function(){
        this.$.nav.setCaption( this.getCaption() );
    },

    scrollableChanged: function(){
//        this.$.client.setVertical( this.getScrollable() ? 'default' : 'hidden' );
    }
});