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
        {kind: 'onyx.RadioGroup', layoutKind: 'enyo.ColumnsLayout', onActivate: 'switchTabs', controlClasses: 'onyx-tabbutton', components: [
            {content: 'Call Flow', name: 'callFlow', active: true },
            {content: 'Caller ID', name: 'callerId'},
            {content: 'Fax', name: 'fax'}
        ]},
        {kind: 'enyo.Scroller', fit: true, components: [
            {name: 'main', classes: 'nice-padding', allowHtml: true},
            {kind: 'UserInfo'}
        ]}
    ],

    goBack: function( inSender, inEvent ){
        this.log( 'Okay... I going back' );
        window.history.back();
    },

    switchTabs: function( inSender, inEvent ){
        // this.log( inSender, inEvent );
    }
});
