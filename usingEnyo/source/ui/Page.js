/**
 * @author Marenin Alexander
 * March 2013
 */

enyo.kind({
    name: 'rc.Page',
    kind: 'FittableRows',

    published: {
        showBack: true,
        showNext: false,
        caption: 'Page Caption'
    },

    handlers: {
        onBack: '',
        onNext: ''
    },

    pageTools: [
        {name: 'nav', kind: 'rc.NavToolbar', onBack: 'doBack', onNext: 'doNext'},
        {name: 'client', fit: true}
    ],

    doBack: function(){
        this.log( 'Back, Niggas!!!' );
    },

    doNext: function(){
        this.log( 'Go ahead, Niggas!!!' );
    },

    create: function(){
        this.inherited( arguments );
        this.showBackChanged();
        this.showNextChanged();
        this.captionChanged();
    },

    initComponents: function(){
        this.createChrome( this.pageTools );
        this.inherited( arguments );
    },

    showBackChanged: function(){
        this.$.nav.setShowBack( this.getShowBack() );
    },

    showNextChanged: function(){
        this.$.nav.setShowNext( this.getShowNext() );
    },

    captionChanged: function(){
        this.$.nav.setCaption( this.getCaption() );
    }
});