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
        previewRatio: 0.21,
        previewHideDelay: 300,
        previewMode: null // 'scrollViewport' || 'scrollPreview'
    },

    statics: {
        MODE_VIEWPORT: 'scrollViewport',
        MODE_PREVIEW: 'scrollPreview'
    },

    events: {
        onOpen: ''
    },

    handlers: {
        onBack: '',
        onNext: ''
    },

    pageTools: [
        {name: 'nav', kind: 'rc.NavToolbar', onBack: 'doBack', onNext: 'doNext'},
        {name: 'preview', classes: 'ui-page-preview', showing: false, components: [
            {name: 'previewContent', classes: 'ui-page-preview-content'},
            {name: 'previewViewport', classes: 'ui-page-preview-viewport'}
        ]},
        {
            name: 'client',
            kind: 'Scroller',
            fit: true,
            touch: true,
            horizontal: 'hidden',
            onScrollStart: 'showPreview',
            onScrollStop: 'delayedHidePreview',
            onScroll: 'scrollPreview'
        }
    ],

    doBack: function(){
        App.back();
    },

    create: function(){
        this.inherited( arguments );
        this.showBackChanged();
        this.showNextChanged();
        this.captionChanged();
        this.nextButtonCaptionChanged();
        this.previewChanged();
        if ( !this.getPreviewMode() )
            this.setPreviewMode( rc.Page.MODE_VIEWPORT );
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
        this.getPreview()
            ? this.enablePreview()
            : this.disablePreview();
    },

    enablePreview: function(){
        var page = this;
        setTimeout( function(){
            page.clientBounds = page.$.client.getScrollBounds();
        }, 100 );
    },

    disablePreview: function(){
        this.$.preview.hide();
    },

    showPreview: function( element, event ){
        if ( !this.getPreview() )
            return;

        var x = event.originator.mx,
            offset = 20,
            width = this.clientBounds.width * this.previewRatio,
            left = offset + width + x > this.clientBounds.width
                ? x - offset - width
                : x + offset;

        this.cancelHide();
        this.makePreviewContent();

        this.$.preview.setBounds({
            width: width,
            height: this.clientBounds.height * this.previewRatio,
            left: left
        });
        this.$.previewViewport.setBounds({
            top: this.$.client.getScrollTop() * this.previewRatio,
            height: this.clientBounds.clientHeight * this.previewRatio
        });
        this.$.preview.show();
    },

    makePreviewContent: function(){
        this.$.previewContent.setContent( ' ' );
        this.$.previewContent.setBounds({
            width: this.clientBounds.width
        });

        var content = this.$.client.node.innerHTML,
            transform = 'scale(' + this.previewRatio + ')',
            style = this.$.previewContent.node.style;

        style.OTransform = transform;
        style.WebkitTransform = transform;
        style.transform = transform;
        this.$.previewContent.node.innerHTML = content.replace( /id="[\w_-]+"/g, '' );
    },

    delayedHidePreview: function(){
        var page = this;

        page.cancelHide();
        page.clientBounds = page.$.client.getScrollBounds();
        page.previewHideTimer = setTimeout( function(){
            page.hidePreview();
        }, page.getPreviewHideDelay() );
    },

    hidePreview: function(){
        this.$.preview.hide();
        this.clientBounds = this.$.client.getScrollBounds();
    },

    scrollPreview: function(){
        if ( !this.getPreview() )
            return;
        this.$.previewViewport.setBounds({
           top: this.$.client.getScrollTop() * this.previewRatio
       });
    },

    cancelHide: function(){
        this.previewHideTimer && clearTimeout( this.previewHideTimer );
    }
});