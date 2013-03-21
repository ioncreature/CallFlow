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
        hidePreviewDelay: 300
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

    showPreview: function(){
        if ( !this.getPreview() )
            return;

        this.hidePreviewTimer && clearTimeout( this.hidePreviewTimer );

        this.makePreviewContent();
        this.$.preview.setBounds({
            width: this.clientBounds.width * this.previewRatio,
            height: this.clientBounds.height * this.previewRatio
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

        page.hidePreviewTimer && clearTimeout( page.hidePreviewTimer );
        page.clientBounds = page.$.client.getScrollBounds();
        page.hidePreviewTimer = setTimeout( function(){
            page.hidePreview();
        }, page.getHidePreviewDelay() );
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
    }
});