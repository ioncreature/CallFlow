/**
 * @author Marenin Alexander
 * March 2013
 */

enyo.kind({
    name: 'rc.page.GreetCaller',
    kind: 'rc.Page',
    caption: loc.GreetCaller.caption,
    nextButtonCaption: loc.save,
    showNext: true,

    handlers: {
        onBack: 'goBack',
        onNext: 'save'
    },

    goBack: function(){
        this.log( 'piu' );
    },

    components: [
        {content: 'Piu-Piu-Piu-Piu-Piu-Piu-Piu'},
        {classes: 'ui-label', content: loc.GreetCaller.listenGreeting},
        {kind:"onyx.ToggleButton", onChange:"toggleChanged", value: true},
        {kind: 'onyx.Button', name:'setDefault', classes: 'ui-button', ontap: 'goToNowhere', content: loc.GreetCaller.setDefault},
        {kind: 'onyx.Button', name:'setCustom', classes: 'ui-button', ontap: 'goToNowhere', content: loc.GreetCaller.setCustom}
    ],

    goToNowhere: function(){
        App.goToNowhere();
    },

    save: function(){
        App.back();
    }
});