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
        caption: '',
        nextButtonCaption: loc.next,
        pageData: null,
        preview: false,
        isRoot: false
    },

    events: {
        onOpen: '',
        onBack: '',
        onNext: ''
    },

    pageTools: [
        {name: 'nav', kind: 'rc.NavToolbar', onBack: 'doBack', onNext: 'doNext'},
        {name: 'client', fit: true, kind: 'rc.Scroller'}
    ],

    doBack: function(){
        this.getIsRoot()
            ? App.goToMenu()
            : App.back();
    },

    doNext: function(){},

    create: function(){
        this.inherited( arguments );
        this.showBackChanged();
        this.showNextChanged();
        this.captionChanged();
        this.nextButtonCaptionChanged();
        this.previewChanged();
        this.isRootChanged();
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
        this.$.nav.reflow();
    },

    showNextChanged: function(){
        this.$.nav.setShowNext( this.getShowNext() );
        this.$.nav.reflow();
    },

    captionChanged: function(){
        this.$.nav.setCaption( this.getCaption() );
    },

    nextButtonCaptionChanged: function(){
        this.$.nav.setNextButtonCaption( this.getNextButtonCaption() );
    },

    previewChanged: function(){
        var preview = this.getPreview();
        preview && this.$.client.setPreview( preview );
    },

    isRootChanged: function(){
        this.$.nav.setBackType( this.getIsRoot()
            ? rc.NavToolbar.MENU
            : rc.NavToolbar.BACK
        );
    }
});