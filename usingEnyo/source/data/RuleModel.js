/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({

    name: 'rc.data.RuleModel',
    kind: 'rc.Model',

    defaults: {
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

    statics: {
        GREET_CALLER_TYPE_DEFAULT: 'default',
        GREET_CALLER_TYPE_CUSTOM: 'custom'
    }
});