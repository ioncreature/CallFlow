/**
 * @author Marenin Alexander
 * March 2013
 */

enyo.kind({
    name: 'rc.page.UserSettings',
    kind: 'rc.Page',
    caption: loc.UserSettings.caption,
    scrollable: false,
    nextButtonCaption: loc.edit,

    handlers: {
        onBack: 'goBack',
        onNext: 'switchCallFlowShowing',
        onOpen: 'pageOpen'
    },

    components: [
        {name: 'tabs', kind: 'onyx.RadioGroup', layoutKind: 'rc.ColumnsLayout', onActivate: 'onTabActivate', classes: 'ui-tabs', controlClasses: 'onyx-tabbutton ui-tabs-button', components: [
            {name: 'userInfoButton', content: 'User Info', bindTo: 'userInfoPanel'},
            {name: 'callFlowButton', content: 'Call Flow', active: true, bindTo: 'callFlowPanel'},
            {name: 'faxButton', content: 'Fax', bindTo: 'faxPanel'}
        ]},
        {name: 'panels', kind: 'rc.Panels', fit: true, draggable: false, onTransitionFinish: 'onPanelActivate', animate: true, components: [
            {kind: 'rc.UserInfoPanel', name: 'userInfoPanel', bindTo: 'userInfoButton'},
            {kind: 'rc.CallFlow', name: 'callFlowPanel', bindTo: 'callFlowButton', onShowChange: 'onShowChange'},
            {kind: 'rc.Fax', name: 'faxPanel', bindTo: 'faxButton'}
        ]}
    ],

    goBack: function(){
        window.history.back();
    },

    onTabActivate: function( inSender, inEvent ){
        if ( inEvent.originator.getActive() ){
            var panelName = inEvent.originator.bindTo,
                panel = this.$[panelName],
                parent = panel.parent,
                isActive = panel.parent.getActive() === panel;

            if ( !isActive )
                parent.setIndex( parent.children.indexOf(panel) );
            this.activateCallFLowButton( inEvent.originator.name );
        }
    },

    onPanelActivate: function(){
        var buttonName = this.$.panels.getActive().bindTo,
            button = this.$[buttonName];
        if ( !button.getActive() )
            button.setActive( true );
        this.activateCallFLowButton( buttonName );
    },

    activateCallFLowButton: function( buttonName ){
        this.setShowNext( buttonName === 'callFlowButton' );
    },

    pageOpen: function(){
        this.$.callFlowPanel.redrawItems();
        this.$.callFlowPanel.selectLastRule();
        this.switchNextButtonCaption();
    },

    switchNextButtonCaption: function(){
        var callFlow = this.$.callFlowPanel,
            showAll = callFlow.getShowAll();

        this.setNextButtonCaption( showAll ? loc.done : loc.edit );
    },

    onShowChange: function(){
        this.switchNextButtonCaption();
    },

    switchCallFlowShowing: function(){
        var panel = this.$.callFlowPanel;
        panel.setShowAll( !panel.getShowAll() );
    }
});