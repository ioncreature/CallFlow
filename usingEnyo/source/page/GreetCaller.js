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
        this.switchState();
    },

    components: [
        {style: 'text-align: center;', components: [
            {name: 'toggle', style: 'margin: 20px 10px 5px;', kind: 'onyx.ToggleButton', onChange: 'switchState'},
        ]},
        {name: 'pic', classes: 'ui-greet-caller', ontap: 'goToNowhere'}
    ],

    switchState: function(){
        if ( this.$.toggle.getValue() )
            this.$.pic.removeClass( 'inactive' );
        else
            this.$.pic.addClass( 'inactive' );
    },

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