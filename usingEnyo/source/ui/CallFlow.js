/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    name: 'rc.CallFlow',
    kind: enyo.Scroller,
//    touch: true,
    horizontal: 'hidden',
    classes: 'ui-call-flow',

    tools: [
        {classes: 'ui-call-flow-decorator', components: [
            {content: 'Caller', classes: 'ui-call-flow-header'},
            {name: 'client', classes: 'ui-call-flow-items'}
        ]}
    ],

    components: [
        {kind: 'rc.CallFlowItem', caption: 'Block Unwanted Callers'},
        {kind: 'rc.CallFlowItem', caption: 'Answering Rules'},
        {kind: 'rc.CallFlowItem', caption: 'Greet the Caller'},
        {kind: 'rc.CallFlowItem', caption: 'Screen the Caller'},
        {kind: 'rc.CallFlowItem', caption: 'Connecting'},
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