/**
 * @author Marenin Alexander
 * March 2013
 */

enyo.kind({
    name: 'rc.page.AddRule',
    kind: 'rc.Page',
    classes: 'ui-add-rule',
    nextButtonCaption: loc.save,
    showNext: true,
    caption: loc.AddRule.caption,

    handlers: {
        onNext: 'addRule'
    },

    components: [
        {classes: 'ui-add-rule-top'},
        {classes: 'ui-add-rule-img'},
        {classes: 'ui-add-rule-placeholder', content: loc.AddRule.placeholder},
        {classes: 'ui-message', content: loc.AddRule.hint}
    ],

    addRule: function(){
        var collection = this.getPageData().collection;
        this.customRules = this.customRules ? this.customRules + 1 : 1;
        collection.add({
            name: 'My Rule ' + this.customRules,
            description: '6pm - 8am',
            greetCallerActive: false,
            screenCallerActive: false,
            connectingActive: false,
            playingActive: false,
            ringSoftphonesActive: false,
            delayActive: false,
            ringPhonesActive: false,
            voicemailActive: true
        });
        App.back();
    }
});