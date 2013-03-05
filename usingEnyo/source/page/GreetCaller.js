/**
 * @author Marenin Alexander
 * March 2013
 */

enyo.kind({
    name: 'rc.page.GreetCaller',
    kind: 'rc.Page',
    style: 'background-color: rgb(40, 180, 50);',
    caption: loc.GreetCaller.caption,

    handlers: {
        onBack: 'goBack'
    },

    goBack: function(){
        this.log( 'piu' );
    },

    components: [
        {content: 'Piu-Piu-Piu-Piu-Piu-Piu-Piu'}
    ]
});