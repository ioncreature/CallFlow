/**
 * @author Marenin Alexander
 * March 2013
 */

enyo.kind({
    name: 'rc.page.Dev',
    kind: 'rc.Page',
    caption: loc.Dev.caption,

    components: [
        {classes: 'ui-header-left', content: 'Preview'},
        {name: 'scrollType', kind: 'rc.RadioList', onActivate: 'setScrollType', components: [
            {caption: 'No', active: true, value: rc.Scroller.THUMB},
            {caption: 'Right fixed (default)', value: rc.Scroller.VIEWPORT_RIGHT},
            {caption: 'Left fixed', value: rc.Scroller.VIEWPORT_LEFT},
            {caption: 'Stretch to height', value: rc.Scroller.VIEWPORT_STRETCHED},
            {caption: 'Fixed viewport (right)', value: rc.Scroller.VIEWPORT_MOVING},
            {caption: 'Finger X position', value: rc.Scroller.VIEWPORT_NEAR_FINGER},
            {caption: 'Finger X & Y position', value: rc.Scroller.VIEWPORT_UNDER_FINGER}
        ]},
        {classes: 'ui-header-left', content: 'Preview Size'},
        {name: 'scrollSize', kind: 'rc.RadioList', onActivate: 'setScrollSize', components: [
            {caption: '20% x 20%', value: rc.Scroller.SIZE_DEFAULT},
            {caption: '15% x 20%', value: rc.Scroller.SIZE_15_20},
            {caption: '12% x 20% (default)', value: rc.Scroller.SIZE_12_20, active: true },
            {caption: '10% x 20%', value: rc.Scroller.SIZE_10_20},
            {caption: '5% x 20%', value: rc.Scroller.SIZE_5_20},
            {caption: '15% x 15%', value: rc.Scroller.SIZE_15_15}
        ]}
    ],

    create: function(){
        this.inherited( arguments );
        this.setScrollType();
        this.setScrollSize();
    },

    setScrollType: function(){
        App.set( 'scrollType', this.$.scrollType.getValue() );
        this.setPreview( this.$.scrollType.getValue() );
    },

    setScrollSize: function(){
        App.set( 'scrollSize', this.$.scrollSize.getValue() );
        this.setPreviewSize( this.$.scrollSize.getValue() );
    }
});