/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    name: 'rc.page.CallFlow',
    kind: 'rc.Page',
    classes: 'ui-call-flow',
    caption: loc.CallFlow.caption,

    handlers: {
        onOpen: 'pageOpen'
    },

    components: [
        {classes: 'ui-call-flow-decorator', components: [
            {content: 'Caller', classes: 'ui-call-flow-header', components: [
                {classes: 'ui-call-flow-header-decorator'}
            ]},
            {name: 'items', classes: 'ui-call-flow-items', components: [
                {
                    name: 'blockCallers',
                    kind: 'rc.CallFlowItem',
                    caption: loc.CallFlow.blockCallers,
                    valueClasses: 'ui-call-flow-block-callers',
                    onButtonTap: 'goToNowhere'
                },
                {
                    kind: 'rc.CallFlowItem',
                    name: 'answeringRules',
                    classes: 'ui-call-flow-answering-rules',
                    caption: loc.CallFlow.answeringRules,
                    description: loc.CallFlow.answeringRulesDesc,
                    onActivate: 'redrawItems',
                    onButtonTap: 'goToNowhere',
                    components: [
                        {name: 'rules', kind: 'rc.RadioList', classes: 'compact show-ruler'},
                        {classes: 'ui-call-flow-rule-buttons', controlClasses: 'ui-button', components: [
                            {name: 'addCustomRule', kind: 'rc.Button', ontap: 'addCustomRule', content: loc.CallFlow.addCustomRule },
                            {name: 'addAfterHours', kind: 'rc.Button', ontap: 'addAfterHours', content: loc.CallFlow.addAfterHours }
                        ]}
                    ]
                },
                {
                    name: 'greetCaller',
                    kind: 'rc.CallFlowItem',
                    caption: loc.CallFlow.greetTheCaller,
                    description: loc.CallFlow.greetTheCallerDesc,
                    onButtonTap: 'goToGreetCaller',
                    components: [{classes: 'ui-call-flow-greet-the-caller'}]
                },
                {
                    name: 'screenCaller',
                    kind: 'rc.CallFlowItem',
                    caption: loc.CallFlow.screenTheCaller,
                    description: loc.CallFlow.screenTheCallerDesc,
                    onButtonTap: 'goToNowhere',
                    components: [
                        {classes: 'ui-call-flow-screen-the-caller'}
                    ]
                },
                {
                    name: 'connecting',
                    kind: 'rc.CallFlowItem',
                    caption: loc.CallFlow.connecting,
                    description: loc.CallFlow.connectingDesc,
                    onButtonTap: 'goToNowhere',
                    components: [
                        {classes: 'ui-call-flow-connecting'}
                    ]
                },
                {
                    name: 'playing',
                    kind: 'rc.CallFlowItem',
                    caption: loc.CallFlow.playing,
                    description: loc.CallFlow.playingDesc,
                    onButtonTap: 'goToNowhere',
                    components: [
                        {classes: 'ui-call-flow-playing'}
                    ]
                },
                {
                    name: 'ringSoftphones',
                    kind: 'rc.CallFlowItem',
                    caption: loc.CallFlow.ringSoftphones,
                    description: loc.CallFlow.ringSoftphonesDesc,
                    value: 'Off',
                    onButtonTap: 'goToNowhere'
                },
                {
                    name: 'delay',
                    kind: 'rc.CallFlowItem',
                    onButtonTap: 'goToNowhere',
                    caption: loc.CallFlow.delay,
                    description: loc.CallFlow.delayDesc,
                    value: '5 rings'
                },
                {
                    name: 'ringPhones',
                    kind: 'rc.CallFlowItem',
                    onButtonTap: 'goToRingPhones',
                    caption: loc.CallFlow.ringMyPhones,
                    description: loc.CallFlow.ringMyPhonesDesc,
                    classes: 'ui-call-flow-ring-phones',
                    components: [
                        {kind: 'rc.PhonesContainer'}
                    ]
                },
                {
                    name: 'voicemail',
                    kind: 'rc.CallFlowItem',
                    caption: loc.CallFlow.voicemail,
                    description: loc.CallFlow.voicemailDesc,
                    onButtonTap: 'goToNowhere',
                    components: [
                        {classes: 'ui-call-flow-voicemail'}
                    ]
                }
            ]}
        ]},
        {
            kind: 'rc.Notifications',
            name: 'notifications',
            email: 'vladv@ringcentral.com',
            phone: '+1 (345) 545-3567',
            ontap: 'goToNowhere'
        }
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
            { name: 'Work Hours:', description: '8am - 6pm', screenCallerActive: false }
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
        this._redrawItems();
    },

    _redrawItems: function(){
        var model = this.$.rules.getActiveItem().model,
            items = this.$.items.children;

        this.lastVisible && this.lastVisible.removeClass( 'last' );
        items.forEach( function( item ){
            item.setActive( model.get(item.name + 'Active') !== false );

            if ( item.getShowing() )
                this.lastVisible = item;
        }, this );
        this.lastVisible && this.lastVisible.addClass( 'last' );
    },

    addCustomRule: function(){
        App.goTo( 'AddRule', {collection: this.rules} );
    },

    addAfterHours: function( inSender, inEvent ){
        this.rules.add({
            name: 'After Hours',
            description: '6pm - 8am',
            greetCaller: true,
            greetCallerActive: false,
            screenCaller: true,
            screenCallerActive: false,
            connecting: true,
            playing: false,
            ringSoftphones: false,
            delay: false,
            ringPhones: false,
            voicemail: true
        });
        inEvent.originator.hide();
        this.selectLastRule();
    },

    selectLastRule: function(){
        var rules = this.$.rules,
            lastChild = rules.children[rules.children.length - 1];
        this.$.rules.onItemTap( lastChild );
    },

    goToNowhere: function(){
        App.goToNowhere();
    },

    goToGreetCaller: function(){
        App.goTo( 'GreetCaller', {
            model: this.$.rules.getActiveItem().model
        });
    },

    goToRingPhones: function(){
        App.goTo( 'RingPhones', {
            model: this.$.rules.getActiveItem().model
        });
    },

    pageOpen: function(){
        this.redrawItems();
        this.selectLastRule();
    }
});