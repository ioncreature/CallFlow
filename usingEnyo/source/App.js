/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    name: 'App',
    kind: 'FittableRows',
    fit: true,
    components: [
        {kind: 'NavToolbar', ontap: 'anyTap', showBack: true, caption: 'User Settings' },
        {kind: 'enyo.Scroller', fit: true, components: [
            {name: 'main', classes: 'nice-padding', allowHtml: true},
            {kind: 'UserInfo'}
        ]}
    ],

    anyTap: function( inSender, inEvent ){
        this.log( 'tap-tap' );
    }
});
