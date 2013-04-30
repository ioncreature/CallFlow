/**
 * @author Marenin Alexander
 * April 2013
 */

enyo.kind({
    name: 'rc.WizardStep',
    kind: 'rc.Control',

    events: {
        onEnter: '',
        onLeave: ''
    },

    published: {
        caption: '',
        next: false
    }

});