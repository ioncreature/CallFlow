/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    name: 'rc.CallFlow',
    kind: enyo.Scroller,
    touch: true,
    horizontal: 'hidden',
    classes: 'ui-call-flow',

    components: [
        {classes: 'ui-call-flow-decorator', components: [
            {content: 'Caller', classes: 'ui-call-flow-header'},
            {name: 'client', classes: 'ui-call-flow-items', components: [
                {kind: 'rc.CallFlowItem', caption: loc.CallFlow.blockUnwantedCallers, description: loc.CallFlow.answeringRulesDesc},
                {kind: 'rc.CallFlowItem', caption: loc.CallFlow.answeringRules,
                    description: loc.CallFlow.answeringRulesDesc, components: [
                    {kind: 'rc.RadioList', items: [
                        {caption: 'Work Hours:', description: '8am - 6pm', active: true},
                        {caption: 'After Hours:', description: '8am - 6pm'},
                        {caption: 'My Rule 1', description: ''}
                    ]}
                ]},
                {kind: 'rc.CallFlowItem', caption: loc.CallFlow.greetTheCaller, description: loc.CallFlow.greetTheCallerDesc},
                {kind: 'rc.CallFlowItem', caption: loc.CallFlow.screenTheCaller, description: loc.CallFlow.screenTheCallerDesc},
                {kind: 'rc.CallFlowItem', caption: loc.CallFlow.connecting, description: loc.CallFlow.connectingDesc},
                {kind: 'rc.CallFlowItem', caption: loc.CallFlow.playing, description: loc.CallFlow.playingDesc},
                {kind: 'rc.CallFlowItem', caption: 'пшь-пшь', components: [
                    {content: 'trololo-ololo'},
                    {content: 'trololo-ololo'}
                ]}
            ]}
        ]},
    ],

    create: function(){
        this.inherited( arguments );
        this.log( this.children );
    },

    initComponents: function(){
//        this.createChrome( this.tools );
        this.inherited( arguments );
    }
});