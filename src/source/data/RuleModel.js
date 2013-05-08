/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    name: 'rc.data.RuleModel',
    kind: 'rc.Model',

    statics: {
        TYPE_WORK_HOURS: 1,
        TYPE_AFTER_HOURS: 2,
        TYPE_CUSTOM: 3,
        GREET_CALLER_TYPE_DEFAULT: 'default',
        GREET_CALLER_TYPE_CUSTOM: 'custom'
    },

    defaults: {
        ruleType: 3, // TYPE_CUSTOM
        greetCaller: true,
        greetCallerActive: true,
        greetCallerType: 'default',
        screenCaller: true,
        screenCallerActive: true,
        connecting: true,
        connectingActive: true,
        playing: true,
        playingActive: true,
        ringSoftphones: true,
        ringSoftphonesActive: true,
        delay: true,
        delayActive: true,
        ringPhones: true,
        ringPhonesActive: true,
        voicemail: true,
        voicemailActive: true,

        description: '',
        name: ''
    },

    isAfterHours: function(){
        return this.get( 'ruleType' ) === rc.data.RuleModel.TYPE_AFTER_HOURS;
    }
});