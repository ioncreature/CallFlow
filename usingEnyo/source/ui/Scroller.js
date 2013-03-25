/**
 * @author Marenin Alexander
 * March 2013
 */

enyo.kind({
    name: 'rc.Scroller',
    kind: 'FittableRows',
    classes: 'ui-scroller',

    statics: {
        THUMB: false,
        VIEWPORT_NEAR_FINGER: 1,
        VIEWPORT_UNDER_FINGER: 2,
        VIEWPORT_LEFT: 3,
        VIEWPORT_RIGHT: 4,
        VIEWPORT_MOVING: 5
    },

    published: {
        preview: false,
        ratio: 0.20,
        contentTtl: 4 * 1000,
        hideDelay: 200
    },

    handlers: {
        onScrollStart: 'handleScrollStart',
        onScrollStop: 'handleScrollStop',
        onScroll: 'handleScroll'
    },

    previewTools: [
        {name: 'preview', classes: 'ui-scroller-preview', showing: false, components: [
            {name: 'previewContent', classes: 'ui-scroller-content'},
            {name: 'previewViewport', classes: 'ui-scroller-viewport'}
        ]},
        {name: 'client', kind: 'Scroller', fit: true, touch: true, horizontal: 'hidden'}
    ],

    create: function(){
        this.inherited( arguments );
        this.previewChanged();
    },

    initComponents: function(){
        this.createChrome( this.previewTools );
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

    previewChanged: function(){
        this.getPreview() === rc.Scroller.THUMB || !this.getPreview()
            ? this.disablePreview()
            : this.enablePreview();
    },

    enablePreview: function(){
        var page = this;
        this.$.client.setThumb( false );
        setTimeout( function(){
            page.clientBounds = page.$.client.getScrollBounds();
        }, 100 );
    },

    disablePreview: function(){
        this.$.client.setThumb( true );
        this.$.preview.hide();
    },

    hasPreview: function(){
        return this.getPreview() !== rc.Scroller.THUMB;
    },

    handleScrollStart: function( element, event ){
        if ( !this.hasPreview() )
            return;

        this.cancelHide();
        this.makePreviewContent();
        this.calculateStartPosition( event );
        this.$.preview.show();
    },

    handleScroll: function(){
        if ( !this.hasPreview() )
            return;

        this.calculateScrollPosition();
    },

    handleScrollStop: function(){
        if ( !this.hasPreview() )
            return;

        var scroller = this;
        scroller.cancelHide();
        scroller.clientBounds = scroller.$.client.getScrollBounds();
        scroller.hideTimer = setTimeout( function(){
            scroller.hidePreview();
        }, scroller.getHideDelay() );
    },

    cancelHide: function(){
        this.hideTimer && clearTimeout( this.hideTimer );
        delete this.hideTimer;
    },

    makePreviewContent: function(){
        if ( Date.now() - this.contentLastUpdate < this.contentTtl )
            return;

        this.contentLastUpdate = Date.now();
        this.$.previewContent.setContent( ' ' );
        this.$.previewContent.setBounds({
            width: this.clientBounds.width
        });

        var content = this.$.client.node.innerHTML,
            transform = 'scale(' + this.getRatio() + ')',
            style = this.$.previewContent.node.style;

        style.OTransform = transform;
        style.WebkitTransform = transform;
        style.transform = transform;
        this.$.previewContent.node.innerHTML = content.replace( /id="[\w_-]+"/g, '' );
    },

    calculateStartPosition: function( event ){
        var x = event.originator.mx,
            y = event.originator.my,
            preview = this.getPreview(),
            statics = rc.Scroller,
            offset = 15,
            width = this.clientBounds.width * this.getRatio(),
            previewBounds = {
                top: offset,
                width: width,
                height: this.clientBounds.height * this.getRatio()
            },
            viewportBounds = {
                top: this.$.client.getScrollTop() * this.getRatio(),
                height: this.clientBounds.clientHeight * this.getRatio()
            };

        switch ( preview ){
            case statics.VIEWPORT_LEFT:
                previewBounds.left = offset;
                break;
            case statics.VIEWPORT_RIGHT:
                previewBounds.left = this.clientBounds.width - width - offset;
                break;
            case statics.VIEWPORT_MOVING:
                previewBounds.left = this.clientBounds.width - width - offset;
                var centerPosition = (this.clientBounds.clientHeight - viewportBounds.height) / 2;
                previewBounds.top = centerPosition - viewportBounds.top;
                break;
            case statics.VIEWPORT_UNDER_FINGER:
                if ( !this.isScrolling() ){
                    previewBounds.left = offset + width + x > this.clientBounds.width
                        ? x - offset - width
                        : x + offset;
                }
                previewBounds.top = y + offset;
                break;
            case statics.VIEWPORT_NEAR_FINGER:
            default:
                if ( !this.isScrolling() )
                    previewBounds.left = offset + width + x > this.clientBounds.width
                        ? x - offset - width
                        : x + offset;
                break;
        }

        this.$.preview.setBounds( previewBounds );
        this.$.previewViewport.setBounds( viewportBounds );
    },

    calculateScrollPosition: function(){
        var viewportBounds = {
                top: this.$.client.getScrollTop() * this.getRatio()
            },
            previewBounds,
            preview = this.getPreview(),
            statics = rc.Scroller;

        switch ( preview ){
            case statics.VIEWPORT_MOVING:
                var viewportHeight = this.clientBounds.clientHeight * this.getRatio(),
                    centerPosition = Math.round( (this.clientBounds.clientHeight - viewportHeight) / 2 );
                previewBounds = {
                    top: centerPosition - viewportBounds.top
                };
                break;
        }

        this.$.previewViewport.setBounds( viewportBounds );
        previewBounds && this.$.preview.setBounds( previewBounds );
    },

    hidePreview: function(){
        this.$.preview.hide();
        this.clientBounds = this.$.client.getScrollBounds();
    },

    isScrolling: function(){
        return !!this.$.preview.getShowing();
    }
});




// TODO: хорошенько обдумать эту гомосятину, а пока заговнокодить в класса rc.Scroller
enyo.kind({
    name: 'rc.ScrollerAnimator',
    kind: 'Object',
    published: {
        ratio: 0.2,
        scroller: null
    },

    constructor: function( scroller ){
        this.inherited( arguments );
        this.setScroller( scroller );
    },

    getScrollTop: function(){
        return this.scroller.$.client.getScrollTop();
    },

    calculateStartPosition: function(){
        var clientBounds = this.scroller.clientBounds;
        return {
            previewBounds: {
                width:  clientBounds.width * this.getRatio(),
                height: clientBounds.height * this.getRatio()
            },
            viewportBounds: {
                top: this.getScrollTop() * this.getRatio(),
                height: clientBounds.clientHeight * this.getRatio()
            }
        }
    }
});