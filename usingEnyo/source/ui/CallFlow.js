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
            onActivate: 'redrawItems',
            classes: 'ui-tabs-switcher',
            controlClasses: 'ui-tabs-button', components: [
                {name: 'showActive', content: loc.CallFlow.showActive, active: true},
                {name: 'showAll', content: loc.CallFlow.showAll}
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
                {
                    kind: 'rc.CallFlowItem',
                    name: 'answeringRules',
                    caption: loc.CallFlow.answeringRules,
                    description: loc.CallFlow.answeringRulesDesc,
                    onActivate: 'redrawItems',
                    components: [
                        {name: 'rules', kind: 'rc.RadioList'},
                        {classes: 'ui-call-flow-rule-buttons', controlClasses: 'ui-button', components: [
                            {name: 'addCustomRule', kind: 'onyx.Button', ontap: 'addCustomRule', content: loc.CallFlow.addCustomRule },
                            {name: 'addAfterHours', kind: 'onyx.Button', ontap: 'addAfterHours', content: loc.CallFlow.addAfterHours }
                        ]}
                    ]
                },
                {name: 'greetCaller', kind: 'rc.CallFlowItem', caption: loc.CallFlow.greetTheCaller, description: loc.CallFlow.greetTheCallerDesc, components: [
                    {classes: 'ui-call-flow-greet-the-caller', content: loc.CallFlow.greetTheCallerHint}
                ]},
                {name: 'screenCaller', kind: 'rc.CallFlowItem', caption: loc.CallFlow.screenTheCaller, description: loc.CallFlow.screenTheCallerDesc, components: [
                    {classes: 'ui-call-flow-screen-the-caller', components: [
                        {content: loc.CallFlow.screenTheCallerHint},
                        {tag: 'span', content: 'Sarah O\'Connor'}
                    ]}
                ]},
                {name: 'connecting', kind: 'rc.CallFlowItem', caption: loc.CallFlow.connecting, description: loc.CallFlow.connectingDesc, components: [
                    {classes: 'ui-call-flow-connecting', content: loc.CallFlow.connectingHint}
                ]},
                {name: 'playing', kind: 'rc.CallFlowItem', caption: loc.CallFlow.playing, description: loc.CallFlow.playingDesc, components: [
                    {classes: 'ui-call-flow-playing', content: loc.CallFlow.playingHint}
                ]},
                {name: 'ringSoftphones', kind: 'rc.CallFlowItem', caption: loc.CallFlow.ringSoftphones, description: loc.CallFlow.ringSoftphonesDesc},
                {name: 'delay', kind: 'rc.CallFlowItem', caption: loc.CallFlow.delay, description: loc.CallFlow.delayDesc},
                {name: 'ringPhones', kind: 'rc.CallFlowItem', caption: loc.CallFlow.ringMyPhones, description: loc.CallFlow.ringMyPhonesDesc},
                {name: 'voicemail', kind: 'rc.CallFlowItem', caption: loc.CallFlow.voicemail, description: loc.CallFlow.voicemailDesc, components: [
                    {classes: 'ui-call-flow-voicemail', content: loc.CallFlow.voicemailHint}
                ]},
            ]}
        ]},
        {kind: 'rc.Notifications', name: 'notifications', email: 'vladv@ringcentral.com', phone: '+1 (345) 545-3567'}
    ],

    create: function(){
        this.inherited( arguments );
        this.loadRules( this.renderRules );
    },

    loadRules: function( callback ){
        this.rules = new rc.data.RuleCollection({ models: this._createRuleModels() });
        callback.call( this, this.rules );
    },

    _createRuleModels: function(){
        return [
            { name: 'Work Hours:', description: '8am - 6pm' }
        ];
    },

    renderRules: function( collection ){
        var rulesList = this.$.rules;
        rulesList.setWatchedNames({ caption: 'name', description: 'description' });
        rulesList.setAdapter( function( model ){
            return {
                caption: model.get( 'name' ),
                description: model.get( 'description' )
            }
        });
        rulesList.setCollection( collection );
    },

    redrawItems: function(){
        var isShowAll = this.$.showAll.getActive(),
            model = this.$.rules.getActiveItem().model,
            items = this.$.items.children;

        this.lastVisible && this.lastVisible.removeClass( 'last' );
        items.forEach( function( item ){
            item.setActive( model.get(item.name + 'Active') !== false );
            if ( isShowAll )
                model.get(item.name) === false
                    ? item.hide()
                    : item.show();
            else
                item.getActive() && model.get(item.name) !== false
                    ? item.show()
                    : item.hide();
            item.setIsFull( isShowAll );


            if ( item.getShowing() )
                this.lastVisible = item;
        }, this );
        this.lastVisible && this.lastVisible.addClass( 'last' );
    },

    addCustomRule: function( inSender, inEvent ){
        this.customRules = this.customRules ? this.customRules + 1 : 1;
        this.rules.add({
            name: 'My Rule ' + this.customRules,
            description: '',
            greetCaller: true,
            screenCaller: false,
            connecting: false,
            playing: false,
            ringSoftphones: false,
            delay: false,
            ringPhones: false,
            voicemail: false
        });
    },

    addAfterHours: function( inSender, inEvent ){
        this.rules.add({
            name: 'After Hours',
            description: '6pm - 8am',
            greetCallerActive: false,
            screenCallerActive: false,
            connectingActive: false,
            playingActive: false,
            ringSoftphonesActive: false,
            delayActive: false,
            ringPhonesActive: false,
            voicemailActive: true
        });
        inEvent.originator.hide();
    }
});