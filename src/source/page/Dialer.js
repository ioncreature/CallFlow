/**
 * @author Marenin Alexander
 * May 2013
 */

enyo.kind({
    name: 'rc.page.Dialer',
    kind: 'rc.Page',
    classes: 'ui-dialer',
    caption: loc.Dialer.caption,

    sipInited: false,
    sipRegistered: false,
    sipStack: null,
    sipSessionCall: null,

    calling: false,
    connecting: false,

    handlers: {
        onOpen: 'pageOpen'
    },

    components: [
        {name: 'registeredCaller', classes: 'ui-dialer-registered-caller', components: [
            {name: 'callerName', classes: 'ui-dialer-registered-caller-name'},
            {name: 'callerPhone', classes: 'ui-dialer-registered-caller-phone'}
        ]},

        {classes: 'ui-label', content: loc.Dialer.callTo},
        {name: 'callee', kind: 'rc.RadioList', onActivate: 'onCalleeActivate'},
        {classes: 'ui-label', content: loc.Dialer.phoneNumber},
        {name: 'colls', kind: 'FittableColumns', components: [
            {kind: 'onyx.InputDecorator', fit: true, classes: 'ui-text-input', components: [
                {name: 'phoneNumber', kind: 'onyx.Input', placeholder: loc.Dialer.phoneNumberPlaceholder, value: '12052160027'}
            ]},
            {
                name: 'call',
                kind:'rc.Button',
                classes: 'ui-dialer-call',
                style: 'width: 100px; margin-top: 3px !important;',
                content: loc.Dialer.call,
                ontap: 'tapCallButton'
            }
        ]},

        {
            name: 'popup',
            kind: 'onyx.Popup',
            floating: true,
            scrim: true,
            centered: true,
            autoDismiss: false,
            classes: 'ui-center ui-dialer-popup',
            scrimClassName: 'ui-dialer-popup-scrim',
            components: [
                {name: 'popupCaption', classes: 'ui-dialer-popup-caption', content: loc.Dialer.incomingCall},
                {name: 'popupName', classes: 'ui-dialer-popup-name'},
                {name: 'popupNumber', classes: 'ui-dialer-popup-number'},
                {name: 'popupTimer', classes: 'ui-dialer-popup-timer', kind: 'rc.Timer'},
                {classes: 'ui-center', components: [
                    {name: 'answerCall', classes: 'ui-dialer-popup-answer', ontap: 'tapAnswerCall'},
                    {name: 'refuseCall', classes: 'ui-dialer-popup-refuse', ontap: 'tapRefuseCall'}
                ]}
            ]
        },

        {name: 'audioContainer', allowHtml: true, content:'<audio autoplay id="dialer_audio" />'}
    ],

    create: function(){
        this.inherited( arguments );
        this.connecting = false;
        this.calling = false;

        App.on( 'login', this.initPage, this );
    },

    initPage: function(){
        var user = App.service('user').getData(),
            mailbox = user.mailbox,
            sip = user.sip,
            phoneNumbers = user.phoneNumbers.filter( function( number ){
                if ( number.extensionPin == mailbox.pin && number.extensionName == mailbox.fullName  )
                    return false;

                if ( !number.extensionPin && !number.extensionName )
                    return false;

                return true;
            });

        this.$.callerName.setContent( sip.identity.displayName );
        this.$.callerPhone.setContent( sip.phoneNumber );
        this.$.colls.render();
        this.fillList( phoneNumbers );

        var s = this;
        this.sipInit( function(){
            s.sipRegister( sip );
        });
    },


    /**
     * @param {Array} phoneNumbers
     */
    fillList: function( phoneNumbers ){
        this.collection = new rc.Collection();
        phoneNumbers.forEach( function( ext ){
            this.collection.add( ext );
        }, this );

        this.$.callee.setAdapter( itemAdapter );
        this.$.callee.setCollection( this.collection );

        function itemAdapter( item ){
            return {
                caption: item.get( 'extensionName' ),
                description: item.get( 'numRow' )
            };
        }
    },

    sipInit: function( callback ){
        var page = this;
        SIPml.init( function(){
            page.sipInited = true;
            callback();
        });
    },

    sipRegister: function( sip ){
        this.sipStack = new SIPml.Stack({
            realm: sip.realm,
            impi: sip.identity.privateIdentity,
            impu: sip.identity.publicIdentity,
            password: sip.identity.password,
            display_name: sip.identity.displayName,
            websocket_proxy_url: sip.websocketServer,
            outbound_proxy_url: sip.outboundProxy,
            ice_servers: sip.iceServers,
            enable_rtcweb_breaker: sip.enableRtcWebBreaker,
            events_listener: { events: '*', listener: this.sipStackEventHandler.bind(this) },
            sip_headers: [
                { name: 'User-Agent', value: 'IM-client/OMA1.0 sipML5-v1.2013.04.26' },
                { name: 'Organization', value: 'RingCentral' }
            ]
        });
        this.sipStack.start();
    },

    sipLogout: function(){
        if ( this.sipStack ){
            this.sipStack.stop();
            delete this.sipStack;
        }
    },

    sipIsRegistered: function(){
        return !!this.sipStack;
    },

    sipCallTypeIsIncoming: function(){
        return this.sipSessionCall && !!this.sipSessionCall.isIncoming;
    },

    sipCall: function(){
        var oConf = {
                audio_remote: this.getAudioNode(),
                events_listener: { events: '*', listener: this.sipSessionEventHandler.bind(this) },
                expires: 600,
                sip_caps: [
                    { name: '+g.oma.sip-im' },
                    { name: '+sip.ice' },
                    { name: 'language', value: '"en,ru"' }
                ]
            },
            phoneIdentifier = this.getPhoneNumber(),
            videoEnabled = App.get( 'sip.enableVideo' ),
            error;

        if ( this.sipStack && !this.sipSessionCall && phoneIdentifier ){
            this.sipSessionCall = this.sipStack.newSession( videoEnabled ? 'call-audiovideo' : 'call-audio', oConf );
            error = this.sipSessionCall.call( phoneIdentifier );
            if ( error != 0 ){
                this.sipSessionCall = null;
                console.error( '.sipCall()', error );
            }
        }
        else if ( this.sipSessionCall )
            this.sipSessionCall.accept( oConf );
    },

    sipHangUp: function(){
        if ( this.sipSessionCall ){
            this.sipSessionCall.hangup({
                events_listener: { events: '*', listener: this.sipSessionEventHandler.bind(this) }
            });
            delete this.sipSessionCall;
        }
    },

    sipReject: function(){
        if ( this.sipSessionCall )
            this.sipSessionCall.reject();
    },

    sipStackEventHandler: function( /*SIPml.Stack.Event*/ e ){
        console.warn( 'stack\ntype', e.type, '\ndesc', e.description );
        switch ( e.type ){
            case 'started':
                this.sipSession = this.sipStack.newSession( 'register', {
                    expires: 300,
                    events_listener: { events: '*', listener: this.sipSessionEventHandler.bind(this) },
                    sip_caps: [
                        { name: '+g.oma.sip-im', value: null },
                        { name: '+audio', value: null },
                        { name: 'language', value: '"en,ru"' }
                    ]
                });
                this.sipSession.register();
                break;

            case 'stopping':
            case 'failed_to_stop':
                break;
            case 'failed_to_start':
            case 'stopped':
                this.hidePopup();
                if ( this.sipSessionCall ){
                    this.sipSessionCall.hangup();
                    delete this.sipSessionCall;
                }
                var s = this;
                setTimeout( function(){
                    s.sipRegister( App.service('user' ).getData().sip );
                }, 2000 );
                break;

            case 'i_new_call':
                if ( this.sipSessionCall )
                    e.newSession.hangup();
                else {
                    this.sipSessionCall = e.newSession;
                    this.sipSessionCall.isIncoming = true;
                    this.showIncomingCall();
                }
                break;

            case 'm_permission_accepted':
                this.$.popupTimer.start();
                break;
        }
    },

    sipSessionEventHandler: function( /*SIPml.Session.Event*/ e ){
        console.warn( 'session\ntype', e.type, '\ndesc', e.description );
        switch ( e.type ){
            case 'connecting':
                break;

            case 'connected':
                this.$.call.setDisabled( false );
                break;

            case 'webrtc_error':
            case 'transport_error':
            case 'global_error':
            case 'message_error':
            case 'cancelled_request':
                // TODO: переделать определение ошибки
                if ( e.description === 'Forbidden (authorization error)' )
                    alert( e.description );
                this.hidePopup();
                this.sipSessionCall && this.sipSessionCall.hangup();
                delete this.sipSessionCall;
                break;

            case 'terminating':
                break;

            case 'terminated':
                delete this.sipSessionCall;
                this.hidePopup();
                break;

            case 'media_added':
                console.warn( e );
                break;

            case 'm_early_media':
            case 'm_stream_audio_local_added':
            case 'm_stream_audio_remote_added':
                console.warn( e );
                break;
        }
    },

    getPhoneNumber: function(){
        return this.$.phoneNumber.getValue();
    },

    getSelectedIdentity: function(){
        return this.$.caller.getActiveModel().get([
            'displayName',
            'publicIdentity',
            'privateIdentity',
            'password'
        ]);
    },

    onCalleeActivate: function(){
        this.$.phoneNumber.setValue( this.$.callee.getActiveModel().get('numRow') );
    },

    tapCallButton: function(){
        if ( !this.sipSessionCall ){
            this.sipCall();
            this.showOutgoingCall();
        }
    },

    tapAnswerCall: function(){
        this.$.answerCall.hide();
        this.sipSessionCall.accept({ audio_remote: this.getAudioNode() });
        this.$.popupTimer.start();
        if ( this.sipCallTypeIsIncoming() )
            delete this.sipSessionCall.isIncoming;
    },

    tapRefuseCall: function(){
        this.$.popupTimer.stop();
        this.hidePopup();
        if ( this.sipCallTypeIsIncoming() )
            this.sipReject();
        else
            this.sipHangUp();
    },

    showIncomingCall: function(){
        this.$.answerCall.show();
        this.$.popup.show();
        this.$.popupTimer.start();
        this.$.popupCaption.setContent( loc.Dialer.incomingCall );
    },

    showOutgoingCall: function(){
        this.$.answerCall.hide();
        this.$.popup.show();
        this.$.popupTimer.start();
        this.$.popupCaption.setContent( loc.Dialer.outgoingCall );
    },

    hidePopup: function(){
        this.$.popup.hide();
        this.$.popupTimer.stop();
    },

    getAudioNode: function(){
        return document.getElementById( 'dialer_audio' );
    }
});