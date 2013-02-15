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
        {kind: 'enyo.Scroller', fit: true, components: [
            {name: 'main', classes: 'nice-padding', allowHtml: true},
            {kind: 'UserInfo'}
        ]}
    ],

    goBack: function( inSender, inEvent ){
        this.log( 'Okay... I going back' );
        window.history.back();
    }
});
