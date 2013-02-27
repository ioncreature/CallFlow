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
        {
            kind: 'onyx.RadioGroup',
            layoutKind: 'rc.ColumnsLayout',
            onActivate: 'switchShowing',
            classes: 'ui-tabs-switcher',
            controlClasses: 'ui-tabs-button', components: [
                {name: 'showActive', content: 'Show Active'},
                {name: 'showAll', content: 'Show All', active: true}
            ]
        },
        {classes: 'ui-call-flow-decorator', components: [
            {content: 'Caller', classes: 'ui-call-flow-header', components: [
                {classes: 'ui-call-flow-header-decorator'},
                {tag: 'img', src: loc.img.caller}
            ]},
            {name: 'items', classes: 'ui-call-flow-items', components: [
                {name: 'blockCallers', kind: 'rc.CallFlowItem', caption: loc.CallFlow.blockUnwantedCallers, components: [
                    {tag: 'img', classes: 'ui-call-flow-item-img-full', src: loc.img.blockCallers}
                ]},
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
                {kind: 'rc.CallFlowItem', caption: loc.CallFlow.ringSoftphones, description: loc.CallFlow.ringSoftphonesDesc},
                {kind: 'rc.CallFlowItem', caption: loc.CallFlow.delay, description: loc.CallFlow.delayDesc},
                {kind: 'rc.CallFlowItem', caption: loc.CallFlow.ringMyPhones, description: loc.CallFlow.ringMyPhonesDesc},
                {kind: 'rc.CallFlowItem', caption: loc.CallFlow.voicemail, description: loc.CallFlow.voicemailDesc},
            ]},
        ]},
        {kind: 'rc.Notifications', name: 'notifications', email: 'vladv@ringcentral.com', phone: '+1 (345) 545-3567'}
    ],

    switchShowing: function( inSender, inEvent ){
        var button = inEvent.originator,
            callFlowItems = this.$.items.children;
        if ( button.getActive() )
            callFlowItems.forEach( function( item ){
                item.setIsFull( button.name === 'showAll' );
            });
    }
});