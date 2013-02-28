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
                    {name: 'rules', kind: 'rc.RadioList'}
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

    create: function(){
        this.inherited( arguments );
        this.loadRules( this.renderRules );
    },

    loadRules: function( callback ){
        this.rules = new rc.data.RuleCollection([
            new rc.data.RuleModel({ id: 1, name: 'Work Hours:', description: '8am - 6pm' }),
            new rc.data.RuleModel({ id: 2, name: 'After Hours:', description: '6pm - 8am' }),
            new rc.data.RuleModel({ id: 3, name: 'My Rule 1' })
        ]);
        callback.call( this );
    },

    renderRules: function(){
        this.$.rules.removeAll();
        this.rules.forEach( function( model ){
            // TODO: !!!
        }, this );
    },

    switchShowing: function( inSender, inEvent ){
        var button = inEvent.originator,
            callFlowItems = this.$.items.children;
        if ( button.getActive() )
            callFlowItems.forEach( function( item ){
                item.setIsFull( button.name === 'showAll' );
            });
    }
});