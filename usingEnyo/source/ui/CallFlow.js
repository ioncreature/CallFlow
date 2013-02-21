/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    name: 'rc.CallFlow',
    kind: 'FittableRows',
//    kind: enyo.Scroller,
//    layoutKind: enyo.FittableRowsLayout,
//    horizontal: 'hidden',
//    fit: true,

    tools: [

    ],

    components: [
        {kind: 'rc.CallFlowItem', caption: 'ololosh'},
        {kind: 'rc.CallFlowItem', caption: 'trololosh'},
        {kind: 'rc.CallFlowItem', caption: 'piu-piu'},
        {kind: 'rc.CallFlowItem', caption: 'пшь-пшь', components: [
            {content: 'trololo-ololo'},
            {content: 'trololo-ololo'}
        ]}
    ],

    create: function(){
        this.inherited( arguments );
        this.log( this.children );
    },

    initComponents: function(){
        this.createChrome( this.tools );
        this.inherited( arguments );
    }
});