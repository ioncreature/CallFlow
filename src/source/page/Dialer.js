/**
 * @author Marenin Alexander
 * May 2013
 */

enyo.kind({
    name: 'rc.page.Dialer',
    kind: 'rc.Page',
    classes: 'ui-dialer',
    caption: loc.Dialer.caption,

    components: [
        {classes: 'ui-label', content: loc.Dialer.phoneNumber},
        {kind: 'onyx.InputDecorator', classes: 'ui-text-input ui-block', components: [
            {name: 'phoneNumber', kind: 'onyx.Input', placeholder: loc.Dialer.phoneNumberPlaceholder}
        ]},
        {classes: 'ui-center', components: [
            {name: 'call', kind:'rc.Button', content: loc.Dialer.call, ontap: 'tapCallButton'}
        ]}
    ],

    create: function(){
        this.inherited( arguments );
        this.connecting = false;
        this.calling = false;
    },

    tapCallButton: function(){
        if ( this.connecting )
            this.log( 'Wait. Connection is establishing.' );
        else if ( this.calling ){
            this.$.phoneNumber.setDisabled( false );
            this.$.call.setContent( loc.Dialer.call );
            this.hangUp();
        }
        else {
            this.$.phoneNumber.setDisabled( true );
            this.$.call.setContent( loc.Dialer.hangup );
            this.makeCall();
        }
    },

    hangUp: function(){
        this.log( 'hang up' );
        this.calling = false;
    },

    makeCall: function(){
        var page = this;
        page.log( 'make call' );
        page.connecting = true;
        setTimeout( function(){
            page.log( 'connection established' );
            page.connecting = false;
            page.calling = true;
        }, 500 );
    }
});