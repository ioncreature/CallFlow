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
        pageData: null,
        preview: false,
        previewSize: false,
        backButtonType: rc.NavToolbar.CANCEL,
        nextButtonType: rc.NavToolbar.DONE,
        isRoot: false
    },

    events: {
        onOpen: '',
        onBack: '',
        onNext: ''
    },

    pageTools: [
        {name: 'nav', kind: 'rc.NavToolbar', onBackTap: 'handleBackTap', onNextTap: 'doNext'},
        {name: 'client', fit: true, kind: 'rc.Scroller'}
    ],

    handleBackTap: function(){
        if ( !this.doBack() )
            this.getIsRoot()
                ? App.goToMenu()
                : App.back();
    },

    create: function(){
        this.inherited( arguments );
        this.showBackChanged();
        this.showNextChanged();
        this.captionChanged();
        this.previewChanged();
        this.isRootChanged();
        this.backButtonTypeChanged();
        this.nextButtonTypeChanged();
    },

    getService: function( serviceName ){
        return this._app instanceof App ? this._app.getService( serviceName ) : false;
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

    previewChanged: function(){
        var preview = this.getPreview();
        preview && this.$.client.setPreview( preview );
    },

    previewSizeChanged: function(){
        var preview = this.getPreview(),
            previewSize = this.getPreviewSize();
        if ( preview && previewSize ){
            this.$.client.setPreview( preview );
            this.$.client.setPreviewSize( previewSize );
        }
    },

    isRootChanged: function(){
        this.$.nav.setBackType( this.getIsRoot()
            ? rc.NavToolbar.MENU
            : rc.NavToolbar.CANCEL
        );
    },

    backButtonTypeChanged: function(){
        this.$.nav.setBackType( this.getBackButtonType() );
    },

    nextButtonTypeChanged: function(){
        this.$.nav.setNextType( this.getNextButtonType() );
    }
});