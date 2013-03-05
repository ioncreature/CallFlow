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
        caption: 'Page Caption'
    },

    handlers: {
        onBack: '',
        onNext: ''
    },

    pageTools: [
        {name: 'nav', kind: 'rc.NavToolbar', onBack: 'doBack', onNext: 'doNext'},
        {name: 'client', kind: 'FittableRows', fit: true }
    ],

    doBack: function(){
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