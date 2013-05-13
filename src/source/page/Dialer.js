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
        ]},

        // TODO: move it to separate ui component
        {name: 'mediaContainer', classes: 'ui-dialer-media-container', components: [
            {name: 'remoteVideo', classes: 'ui-dialer-remote-video', tag: 'video'},
            {name: 'localVideo', classes: 'ui-dialer-local-video', tag: 'video'},
            {name: 'remoteAudio', classes: 'ui-dialer-remote-audio', tag: 'audio'},
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

            this.hangUp();
        }
        else {
            var number = this.getPhoneNumber();
            if ( !this.validateNumber(number) )
                alert( 'Incorrect phone number' );
            else {
                this.$.call.setContent( loc.Dialer.hangup );
                this.makeCall( number );
            }
        }
    },

    hangUp: function(){
        this.log( 'hang up' );
        this.setCalling( false );
    },

    makeCall: function( phoneIdentifier ){
        var page = this;

        page.log( 'make call' );
        page.connecting = true;
        SIPml.init( function( e ){
            console.log( 'init', e );
            var stack = new SIPml.Stack({
                realm: 'example.org',
                impi: 'bob',
                impu: 'sip:bob@example.org',
                password: 'mysecret',
                display_name: 'Great and Awful',
                events_listener: {
                    events: 'started',
                    listener: function( e ){
                        console.log( 'started', e );
                        var callSession = stack.newSession( 'call-audiovideo', {
                            video_local: page.$.localVideo.node,
                            video_remote: page.$.remoteVideo.node,
                            audio_remote: page.$.remoteAudio.node
                        });
                        try {
                            callSession.call( phoneIdentifier );
                            page.log( 'connection established' );
                            page.setCalling( false );
                            page.setConnecting( true );
                        }
                        catch ( e ){
                            console.log( 'call error', e );
                            page.setCalling( false );
                            page.setConnecting( false );
                        }
                    }
                }
            });
            stack.start();
        }, page.errorBack.bind(page) );
    },

    errorBack: function( e ){
        console.log( 'error', e );
    },

    getPhoneNumber: function(){
        return this.$.phoneNumber.getValue();
    },

    validateNumber: function( number ){
        return typeof number == 'string';
    },

    setCalling: function( calling ){
        this.calling = !!calling;
        this.$.phoneNumber.setDisabled( this.calling );
        this.setButtonCaption();
    },

    setConnecting: function( connecting ){
        this.connecting = !!connecting;
        this.$.call.setContent( loc.Dialer.hangup );
        this.setButtonCaption();
    },

    setButtonCaption: function(){
        if ( this.calling || this.connecting )
            this.$.call.setContent( loc.Dialer.hangup );
        else
            this.$.call.setContent( loc.Dialer.call );
    }
});