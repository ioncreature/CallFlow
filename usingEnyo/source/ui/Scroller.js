/**
 * @author Marenin Alexander
 * March 2013
 */

enyo.kind({
    name: 'rc.Scroller',
    kind: 'FittableRows',
    classes: 'ui-scroller',

    statics: {
        THUMB: -1,
        VIEWPORT_NEAR_FINGER: 1,
        VIEWPORT_UNDER_FINGER: 2,
        VIEWPORT_LEFT: 3,
        VIEWPORT_RIGHT: 4,
        VIEWPORT_MOVING: 5,
        VIEWPORT_STRETCHED: 6,
        SIZE_DEFAULT: -1,
        SIZE_5_20: 11,
        SIZE_10_20: 12,
        SIZE_15_15: 13,
        SIZE_15_20: 14,
        SIZE_12_20: 15
    },

    published: {
        preview: false,
        previewSize: false,
        ratioX: 0.20,
        ratioY: 0.20,
        contentTtl: 4 * 1000,
        hideDelay: 200,
        offset: 4,
        bordersWidth: 4
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
        this.previewSizeChanged();
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
        this.getPreview() === rc.Scroller.THUMB
            ? this.disablePreview()
            : this.enablePreview();
        this.previewSizeChanged();
    },

    previewSizeChanged: function(){
        switch ( this.getPreviewSize() ){
            case rc.Scroller.SIZE_DEFAULT:
                this.setRatioX( 0.2 );
                this.setRatioY( 0.2 );
                break;
            case rc.Scroller.SIZE_5_20:
                this.setRatioX( 0.05 );
                this.setRatioY( 0.2 );
                break;
            case rc.Scroller.SIZE_10_20:
                this.setRatioX( 0.1 );
                this.setRatioY( 0.2 );
                break;
            case rc.Scroller.SIZE_15_15:
                this.setRatioX( 0.15 );
                this.setRatioY( 0.15 );
                break;
            case rc.Scroller.SIZE_15_20:
                this.setRatioX( 0.15 );
                this.setRatioY( 0.20 );
                break;
            case rc.Scroller.SIZE_12_20:
                this.setRatioX( 0.12 );
                this.setRatioY( 0.20 );
                break;
        }
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

        this._recalculateYRatio();

        var content = this.$.client.node.innerHTML,
            transform = 'scale(' + this.getRatioX() + ',' + this.getRatioY() + ')',
            style = this.$.previewContent.node.style;

        style.OTransform = transform;
        style.WebkitTransform = transform;
        style.transform = transform;
        this.$.previewContent.node.innerHTML = content.replace( /id="[\w_-]+"/g, '' );
    },

    calculateStartPosition: function( event ){
        if ( this.isPreviewContentShort() ){
            this.$.preview.hide();
            return;
        }
        else
            this.$.preview.show();

        var x = event.originator.mx,
            y = event.originator.my,
            preview = this.getPreview(),
            statics = rc.Scroller,
            offset = this.getOffset(),
            bordersWidth = this.getBordersWidth(),
            width = this.clientBounds.width * this.getRatioX(),
            previewBounds = {
                top: offset,
                width: width,
                height: this.clientBounds.height * this.getRatioY()
            },
            viewportBounds = {
                top: this.$.client.getScrollTop() * this.getRatioY(),
                height: this.clientBounds.clientHeight * this.getRatioY()
            };

        switch ( preview ){
            case statics.VIEWPORT_LEFT:
                previewBounds.left = offset;
                break;
            case statics.VIEWPORT_STRETCHED:
                this._recalculateYRatio();
                previewBounds.left = this.clientBounds.width - width - offset - bordersWidth;
                break;
            case statics.VIEWPORT_RIGHT:
                previewBounds.left = this.clientBounds.width - width - offset - bordersWidth;
                break;
            case statics.VIEWPORT_MOVING:
                previewBounds.left = this.clientBounds.width - width - offset;
                var centerPosition = (this.clientBounds.clientHeight - viewportBounds.height) / 2;
                previewBounds.top = centerPosition - viewportBounds.top;
                break;
            case statics.VIEWPORT_UNDER_FINGER:
                if ( !this.isScrolling() ){
                    previewBounds.left = offset + width + x > this.clientBounds.width
                        ? x - offset - width - bordersWidth
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
        if ( this.isPreviewContentShort() )
            return;

        var viewportBounds = {
                top: this.$.client.getScrollTop() * this.getRatioY()
            },
            previewBounds,
            preview = this.getPreview(),
            statics = rc.Scroller;

        switch ( preview ){
            case statics.VIEWPORT_MOVING:
                var viewportHeight = this.clientBounds.clientHeight * this.getRatioY(),
                    centerPosition = Math.round( (this.clientBounds.clientHeight - viewportHeight) / 2 );
                previewBounds = {
                    top: centerPosition - viewportBounds.top
                };
                break;
        }

        this.$.previewViewport.setBounds( viewportBounds );
        previewBounds && this.$.preview.setBounds( previewBounds );
    },

    isPreviewContentShort: function(){
        return this.clientBounds.height <= this.clientBounds.clientHeight;
    },

    _recalculateYRatio: function(){
        if ( this.getPreview() === rc.Scroller.VIEWPORT_STRETCHED ){
            var viewport = this.clientBounds.clientHeight - this.getBordersWidth() - 2 * this.getOffset(),
                ratio = viewport / this.clientBounds.height;
            this.setRatioY( ratio > 0.35 ? 0.35 : ratio );
        }
    },

    hidePreview: function(){
        this.$.preview.hide();
        this.clientBounds = this.$.client.getScrollBounds();
    },

    isScrolling: function(){
        return !!this.$.preview.getShowing();
    }
});
