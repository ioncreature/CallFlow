/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    name: 'rc.CallFlow',
    kind: enyo.Control,
    classes: 'ui-call-flow',

    published: {
        showAll: false
    },

    events: {
        onShowChange: '',
        onBelowTop: '',
        onTop: ''
    },

    handlers: {
        onScrollStart: 'scrollStart',
        onScrollStop: 'checkScroll'
    },

    components: [
/*
        {
            kind: 'onyx.RadioGroup',
            layoutKind: 'rc.ColumnsLayout',
            onActivate: 'onShowTabActivate',
            classes: 'ui-tabs-switcher',
            controlClasses: 'ui-tabs-button', components: [
                {name: 'showActive', content: loc.CallFlow.showActive, active: true},
                {name: 'showAll', content: loc.CallFlow.showAll}
            ]
        },
*/
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
                    caption: loc.CallFlow.answeringRules,
                    description: loc.CallFlow.answeringRulesDesc,
                    onActivate: 'redrawItems',
                    onButtonTap: 'goToNowhere',
                    components: [
                        {name: 'rules', kind: 'rc.RadioList'},
                        {classes: 'ui-call-flow-rule-buttons', controlClasses: 'ui-button', components: [
                            {name: 'addCustomRule', kind: 'onyx.Button', ontap: 'addCustomRule', content: loc.CallFlow.addCustomRule },
                            {name: 'addAfterHours', kind: 'onyx.Button', ontap: 'addAfterHours', content: loc.CallFlow.addAfterHours }
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
                    onButtonTap: 'goToNowhere',
                    caption: loc.CallFlow.ringMyPhones,
                    description: loc.CallFlow.ringMyPhonesDesc,
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
        this.showAllChanged();
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
        this.showAllChanged();
    },

    onShowTabActivate: function(){
        this.setShowAll( this.$.showAll.getActive() );
    },

    showAllChanged: function(){
        this._redrawItems( this.getShowAll() );
        this.doShowChange();
    },

    _redrawItems: function( isShowAll ){
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
            description: '',
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
            lastChild = rules.children[rules.children.length -1 ];
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

    scrollStart: function(){
        this.doBelowTop();
    },

    scrollStop: function(){
        this.doTop();
    },

    pageOpen: function(){
        this.selectLastRule();
    },

    checkScroll: function(){
        if ( this.getScrollTop() == 0 )
            this.doTop();
    }
});