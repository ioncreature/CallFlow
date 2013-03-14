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
        var model = this.getPageData().model,
            type = model.get( 'greetCallerType' ),
            radio = this.$.switch;
        if ( model.get('greetCallerActive') ){
            if ( type === rc.data.RuleModel.GREET_CALLER_TYPE_DEFAULT )
                radio.setActiveItem( this.$.default );
            else if ( type === rc.data.RuleModel.GREET_CALLER_TYPE_CUSTOM )
                radio.setActiveItem( this.$.custom );
        }
        else
            radio.setActiveItem( this.$.off );
    },

    components: [
        {classes: 'ui-greet-caller-top', components: [
            {classes: 'ui-greet-caller-header', content: loc.GreetCaller.caption},
            {classes: 'ui-description', content: loc.GreetCaller.description}
        ]},
        {name: 'switch', kind: 'rc.RadioList', onActivate: 'switchActivate', components: [
            {caption: 'Off', name: 'off'},
            {caption: 'Default', name: 'default'},
            {caption: 'Custom', name: 'custom'}
        ]},
        {name: 'defaultControls', classes: 'ui-audio-player-default', components: [
            {name: 'player', kind: 'rc.AudioPlayer', onPlay: 'playGreeting'},
            {classes: 'ui-hint-arrow-top', content: loc.GreetCaller.defaultHint}
        ]},
        {name: 'customControls', classes: 'ui-audio-player-custom', components: [
            {
                kind: 'onyx.RadioGroup',
                layoutKind: 'rc.ColumnsLayout',
                classes: 'ui-tabs-switcher',
                controlClasses: 'ui-tabs-button ui-greet-caller-tabs', components: [
                    {name: 'overPhone', content: loc.GreetCaller.overPhone, active: true},
                    {name: 'overMicrophone', content: loc.GreetCaller.overMicrophone},
                    {name: 'import', content: loc.GreetCaller.import}
                ]
            },
            {name: 'overPhoneContainer', components: [
                {classes: 'ui-message', content: loc.GreetCaller.overPhoneDescription}
            ]}
        ]}
    ],

    playGreeting: function(){
        alert( 'la-la-la-la-la' );
    },

    goToNowhere: function(){
        App.goToNowhere();
    },

    save: function(){
        var model = this.getPageData().model,
            isActive = !this.$.off.getActive();

        model.set( 'greetCallerActive', isActive );
        if ( isActive )
            model.set( 'greetCallerType', this.$.custom.getActive()
                ? rc.data.RuleModel.GREET_CALLER_TYPE_CUSTOM
                : rc.data.RuleModel.GREET_CALLER_TYPE_DEFAULT
            );

        App.back();
    },

    switchActivate: function(){
        this.setActiveItem( this.$.switch.getActiveItem() );
    },

    setActiveItem: function( item ){
        if ( item === this.$.off ){
            this.$.defaultControls.hide();
            this.$.customControls.hide();
        }
        else if ( item === this.$.default ){
            this.$.defaultControls.show();
            this.$.customControls.hide();
        }
        else if ( item === this.$.custom ){
            this.$.defaultControls.hide();
            this.$.customControls.show();
        }
    }
});