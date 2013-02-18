/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    name: 'App',
    kind: 'FittableRows',
    fit: true,
    components: [
        {kind: 'rc.NavToolbar', onBack: 'goBack', showBack: true, caption: 'User Settings' },
        {kind: 'onyx.RadioGroup', layoutKind: 'rc.ColumnsLayout', onActivate: 'onTabActivate', classes: 'ui-tabs', controlClasses: 'onyx-tabbutton ui-tabs-button', components: [
            {name: 'callFlowButton', content: 'Call Flow', active: true, bindTo: 'callFlowPanel' },
            {name: 'callerIdButton', content: 'Caller ID', bindTo: 'callerIdPanel' },
            {name: 'faxButton', content: 'Fax', bindTo: 'faxPanel' }
        ]},
        {kind: 'Panels', fit: true, realtimeFit: true, onTransitionFinish: 'onPanelActivate', animate: true, components: [
            {name: 'callFlowPanel', content: 'callFlowPanel', active: true, bindTo: 'callFlowButton' },
            {kind: 'rc.CallerId', name: 'callerIdPanel', bindTo: 'callerIdButton' },
            {kind: 'rc.Fax', name: 'faxPanel', bindTo: 'faxButton' }
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
