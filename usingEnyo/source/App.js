/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    name: 'App',
    kind: 'FittableRows',
    fit: true,
    components: [
        {kind: 'NavToolbar', onBack: 'goBack', showBack: true, caption: 'User Settings' },
        {kind: 'onyx.RadioGroup', layoutKind: 'enyo.ColumnsLayout', onActivate: 'onTabActivate', controlClasses: 'onyx-tabbutton', components: [
            {name: 'callFlowButton', content: 'Call Flow', active: true, bindTo: 'callFlowPanel' },
            {name: 'callerIdButton', content: 'Caller ID', bindTo: 'callerIdPanel' },
            {name: 'faxButton', content: 'Fax', bindTo: 'faxPanel' }
        ]},
        {kind: 'Panels', fit: true, realtimeFit: true, onTransitionFinish: 'onPanelActivate', controlClasses: 'nice-padding', components: [
            {name: 'callFlowPanel', content: 'callFlowPanel', active: true, bindTo: 'callFlowButton' },
            {name: 'callerIdPanel', content: 'callerIdPanel', bindTo: 'callerIdButton' },
            {name: 'faxPanel', content: 'faxPanel', bindTo: 'faxButton' }
        ]}
    ],

    goBack: function(){
        this.log( 'Okay... I going back' );
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
        }
    },

    onPanelActivate: function(){
        var buttonName = this.$.panels.getActive().bindTo,
            button = this.$[buttonName];
        if ( !button.getActive() )
            button.setActive( true );
    }
});
