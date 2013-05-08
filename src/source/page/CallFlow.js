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
                        {name: 'phones', kind: 'rc.PhoneGroups', onItemTap: 'goToRingPhones', readOnly: true}
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
        this.loadPhones( this.renderPhones )
    },

    loadRules: function( callback ){
        this.rules = new rc.data.RuleCollection( {}, { models: this._createRuleModels() });
        callback.call( this, this.rules );
    },

    loadPhones: function( callback ){
        this.phones = this._getMockPhonesCollection();
        callback.call( this );
    },

    renderPhones: function(){
        this.$.phones.setCollection( this.phones );
    },

    pageOpen: function(){
        var data = this.getPageData();

        this.redrawItems();
        if ( data && data.newRuleAdded ){
            this.selectLastRule();
            delete data.newRuleAdded;
        }
        this.$.phones.render();
this.log( this.rules.hasAfterHoursRule() );
        this.$.addAfterHours.setShowing( !this.rules.hasAfterHoursRule() );
    },

    _getMockPhonesCollection: function(){
        var Class = rc.data.PhoneCollection;
        return new Class({}, {
            model: Class,
            models: [
                new Class( {id: 1, rings: 5}, {models: [
                    {id: 1, name: 'Office desk phone', number: '(452) 345-6343'}
                ]}),
                new Class( {id: 2, rings: 3}, {models: [
                    {id: 2, name: 'John\'s room', number: '(452) 345-6345'}
                ]}),
                new Class( {id: 3, rings: 4}, {models: [
                    {id: 4, name: 'Mobile', number: '(674) 345-4572'},
                    {id: 5, name: 'Home', number: '(452) 433-3435'}
                ]}),
                new Class( {id: 4, rings: 3}, {models: [
                    {id: 6, name: 'Unassigned Cisco SPA-5', number: '(674) 345-4572'}
                ]}),
                new Class( {id: 5, rings: 4}, {models: [
                    {id: 6, name: 'Marta\'s room', number: '(452) 345-4077', enabled: false}
                ]})
            ]
        });
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

    addAfterHours: function(){
        App.goTo( 'AfterHoursWizard', {
            collection: this.rules
        });
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
            collection: this.phones
        });
    }
});