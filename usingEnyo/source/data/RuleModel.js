/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({

    name: 'rc.data.RuleModel',
    kind: 'rc.Model',

    defaults: {
        greetCaller: true,
        screenCaller: true,
        connecting: true,
        playing: true,
        ringSoftphones: true,
        delay: true,
        ringPhones: true,
        voicemail: true,
        description: '',
        name: ''
    }
});