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
        onBack: '',
        onNext: 'save',
        onOpen: 'pageOpen'
    },

    pageOpen: function(){
        this.getPageData() && this.$.toggle.setValue( this.getPageData().model.get('greetCallerActive') );
    },

    components: [
        {style: 'text-align: center;', components: [
            {name: 'toggle', style: 'margin: 25px 10px;', kind: 'onyx.ToggleButton', classes: 'ui-label'},
        ]},
        {classes: 'ui-greet-caller'}
//        {classes: 'ui-label', content: loc.GreetCaller.listenGreeting},
//        {kind: 'onyx.Button', name:'play', classes: 'ui-button', ontap: 'playGreeting', content: loc.GreetCaller.play},
//        {tag: "br"},
//        {kind: 'onyx.Button', name:'setDefault', classes: 'ui-button', ontap: 'goToNowhere', content: loc.GreetCaller.setDefault},
//        {tag: "br"},
//        {kind: 'onyx.Button', name:'setCustom', classes: 'ui-button', ontap: 'goToNowhere', content: loc.GreetCaller.setCustom}
    ],

    playGreeting: function(){
        alert( 'la-la-la-la-la' );
    },

    goToNowhere: function(){
        App.goToNowhere();
    },

    save: function(){
        this.getPageData().model.set( 'greetCallerActive', this.$.toggle.getValue() );
        App.back();
    }
});