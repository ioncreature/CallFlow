/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    kind: 'enyo.Control',
    name: 'rc.Notifications',
    classes: 'ui-notifications',

    published: {
        email: '',
        phone: ''
    },

    components: [
        {classes: 'ui-notification-caption', content: loc.CallFlow.notifications},
        {classes: 'ui-notification-description', content: loc.CallFlow.notificationsDesc},
        {classes: 'ui-notification-image'},
        {name: 'emailContainer', classes: 'ui-notification-send-via', components: [
            {content: loc.CallFlow.sendViaEmail},
            {name: 'email'}
        ]},
        {name: 'phoneContainer', classes: 'ui-notification-send-via', components: [
            {content: loc.CallFlow.sendViaText},
            {name: 'phone'}
        ]},
        {classes: 'ui-notifications-arrow', content: '>'}
    ],

    create: function(){
        this.inherited( arguments );
        this.emailChanged();
        this.phoneChanged();
    },

    emailChanged: function(){
        this.$.email.setContent( this.getEmail() );
    },

    phoneChanged: function(){
        this.$.phone.setContent( this.getPhone() );
    }
});