/**
 * @author Marenin Alexander
 * April 2013
 */

enyo.kind({
    name: 'rc.page.AfterHoursWizard',
    kind: 'rc.WizardPage',
    caption: loc.AfterHoursWizard.caption,

    steps: [
        {
            name: 'start',
            caption: loc.AfterHoursWizard.stepWorkHours,
            next: 'action',
            components: [
                {classes: 'ui-header', content: 'Hello Earth!'}
            ],
            onEnter: 'startEnter',
            onLeave: 'startLeave'
        },

        {
            name: 'action',
            caption: loc.AfterHoursWizard.stepAction,
            next: 'summary',
            components: [
                {classes: 'ui-header', content: 'Hello Earth!'}
            ],
            onEnter: 'startEnter',
            onLeave: 'startLeave'
        },

        {
            name: 'summary',
            caption: loc.AfterHoursWizard.stepSummary,
            next: false,
            components: [
                {classes: 'ui-header', content: 'Hello Sky!'}
            ],
            onEnter: 'endEnter',
            onLeave: 'endLeave'
        }
    ],

    startEnter: function(){
        this.log( 'enter' );
    },

    startLeave: function(){
        this.log( 'leave' );
    }
});
