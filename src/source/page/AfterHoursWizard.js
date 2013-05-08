/**
 * @author Marenin Alexander
 * April 2013
 */

enyo.kind({
    name: 'rc.page.AfterHoursWizard',
    kind: 'rc.WizardPage',
    caption: loc.AfterHoursWizard.caption,

    handlers: {
        onFinish: 'saveRule'
    },

    steps: [
        {
            name: 'start',
            caption: loc.AfterHoursWizard.stepWorkHours,
            next: 'action',
            components: [
                {classes: 'ui-header', content: 'Hello World!'}
            ],
            enter: 'startEnter',
            leave: 'startLeave'
        },

        {
            name: 'action',
            caption: loc.AfterHoursWizard.stepAction,
            next: 'end',
            components: [
                {classes: 'ui-header', content: 'Hello Earth!'}
            ],
            enter: 'startEnter',
            leave: 'startLeave'
        },

        {
            name: 'end',
            caption: loc.AfterHoursWizard.stepSummary,
            next: false,
            components: [
                {classes: 'ui-header', content: 'Hello Sky!'}
            ],
            enter: 'endEnter',
            leave: 'endLeave'
        }
    ],

    startEnter: function(){
        var state = this.getState();
        state.rule = new rc.data.RuleModel({
            name: 'After Hours',
            ruleType: rc.data.RuleModel.TYPE_AFTER_HOURS,
            description: '6pm - 8am',
            greetCaller: true,
            greetCallerActive: false,
            screenCaller: true,
            screenCallerActive: false,
            connecting: true,
            playing: false,
            ringSoftphones: false,
            delay: false,
            ringPhones: false,
            voicemail: true
        });
    },

    startLeave: function(){
        this.log( 'leave' );
    },

    saveRule: function(){
        var data = this.getPageData();
        data && data.collection && data.collection.add( this.getState().rule );
    }
});
