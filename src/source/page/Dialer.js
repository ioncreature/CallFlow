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

    published: {
        videoCalling: false
    },

    components: [
        {name: 'registeredCaller', classes: 'ui-dialer-registered-caller', components: [
            {name: 'callerName', classes: 'ui-dialer-registered-caller-name'},
            {name: 'callerPhone', classes: 'ui-dialer-registered-caller-phone'},
            {name: 'callerExtCaption', classes: 'ui-dialer-registered-caller-ext-caption', content: loc.Dialer.extCaption},
            {name: 'callerExt', classes: 'ui-dialer-registered-caller-ext'},
            {name: 'callerOriginalPhone', classes: 'ui-dialer-registered-caller-original', allowHtml: true}
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
                {
                    name: 'popupVideo',
                    classes: 'ui-dialer-popup-video',
                    showing: false,
                    allowHtml: true,
                    content:'<video autoplay id="dialer_video" />'
                },
                {name: 'popupTimer', classes: 'ui-dialer-popup-timer', kind: 'rc.Timer'},
                {classes: 'ui-center', components: [
                    {name: 'answerCall', classes: 'ui-dialer-popup-answer', ontap: 'tapAnswerCall'},
                    {name: 'refuseCall', classes: 'ui-dialer-popup-refuse', ontap: 'tapRefuseCall'}
                ]}
            ]
        },

        {name: 'errorContainer', classes: 'ui-dialer-error', allowHtml: true, showing: false},
        {name: 'statusContainer', classes: 'ui-dialer-status', allowHtml: true, showing: false},

        {name: 'audioContainer', allowHtml: true, content:'<audio autoplay id="dialer_audio" />'}
    ],

    create: function(){
        this.inherited( arguments );
        this.connecting = false;
        this.calling = false;

        App.on( 'login', this.initPage, this );
        App.on( 'logout', this.releaseResources, this );
        App.on( 'incomingCall', this.onIncomingCall, this );
        App.on( 'hangup', this.onHangUp, this );
    },

    initPage: function(){
        var user = App.service( 'user' ).getData(),
            mailbox = user.mailbox,
            sip = user.sip,
            ownNumbers = [],
            accountNumber = rc.preparePhoneNumber( sip.phoneNumber ),
            phoneNumbers = user.phoneNumbers.filter( function( number ){
                if ( number.extensionPin == mailbox.pin && number.extensionName == mailbox.fullName ){
                    ownNumbers.push( number.numRow );
                    return false;
                }

                if ( !number.extensionPin && !number.extensionName )
                    return false;

                return true;
            });

        this.$.callerOriginalPhone.setContent( ownNumbers.join('<br />') );
        this.$.callerOriginalPhone.getContent() && this.$.callerOriginalPhone.show();

        this.$.callerName.setContent( mailbox.fullName );
        this.$.callerPhone.setContent( accountNumber );
        this.$.callerExt.setContent( mailbox.pin );
        this.$.colls.render();

        this.fillList( phoneNumbers );

        var userNumbers = ownNumbers.concat( accountNumber + '*' + mailbox.pin );
        if ( mailbox.accessLevel === 'Admin' )
            userNumbers.push( accountNumber );

        App.service( 'server' ).registerNumbers( userNumbers );

        var s = this;
        this.sipInit( function(){
            s.sipRegister( sip );
        });
    },

    releaseResources: function(){
        this.sipStop();
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

    sipStop: function(){
        this.sipStack && this.sipStack.stop();
        delete this.sipSessionCall;
        delete this.sipSession;
        delete this.sipStack;
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


    sipIsCalling: function(){
        return !!this.sipSessionCall;
    },

    sipCallTypeIsIncoming: function(){
        return this.sipSessionCall && !!this.sipSessionCall.isIncoming;
    },

    sipCall: function(){
        var oConf = {
                video_remote: this.getVideoNode(),
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
            this.sipSessionCall = this.sipStack.newSession( 'call-audio', oConf );
            // this.sipSessionCall = this.sipStack.newSession( videoEnabled ? 'call-audiovideo' : 'call-audio', oConf );
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
        if ( this.sipIsCalling() ){
            try {
                this.sipSessionCall.hangup({
                    events_listener: { events: '*', listener: this.sipSessionEventHandler.bind(this) }
                });
                delete this.sipSessionCall;
            }
            catch ( e ){
                console.error( 'sipHangUp', e );
            }
        }
    },

    sipReject: function(){
        if ( this.sipSessionCall )
            this.sipSessionCall.reject();
    },

    sipStackEventHandler: function( /*SIPml.Stack.Event*/ e ){
        console.warn( 'stack\ntype', e.type, '\ndesc', e.description );
        this.showStatus( e.type + ' : ' + e.description );
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
                this.hidePopup();
                break;
            case 'failed_to_stop':
            case 'failed_to_start':
                this.showError( e.type + ' : ' + e.description );
            case 'stopped':
                this.hidePopup();
                if ( this.sipSessionCall ){
                    this.sipSessionCall.hangup();
                    delete this.sipSessionCall;
                }
                var s = this;
                setTimeout( function(){
                    s.sipStack && s.sipRegister( App.service('user').getData().sip );
                }, 2000 );
                break;

            case 'i_new_call':
                if ( this.sipSessionCall && this.sipSessionCall !== e.newSession ){
                    // e.newSession.hangup();
                }
                else {
                    this.sipSessionCall = e.newSession;
                    this.sipSessionCall.isIncoming = true;
                    this.showIncomingCall( this.sipSessionCall.getRemoteFriendlyName() || 'Unknown' );
                }
                break;

            case 'm_permission_accepted':
                this.$.popupTimer.start();
                break;
            case 'm_permission_refused':
                this.showError( e.type + ' : ' + e.description );
                this.hidePopup();
                this.sipSessionCall && this.sipSessionCall.hangup();
                break;

            case 'i_new_message':
                console.warn( e );
                var par = e.o_event;
                if ( par && par.e_type === 1 && par.i_code === 800 ){
                    this.showError( 'It was probably hangup from remote side' );
                    if ( this.sipIsCalling() )
                        this.hangUpCall();
                }
                break;
        }
    },

    sipSessionEventHandler: function( /*SIPml.Session.Event*/ e ){
        console.warn( 'session\ntype', e.type, '\ndesc', e.description );
        this.showStatus( e.type + ' : ' + e.description );
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
                this.showError( e.type + ' ' + e.description );
            case 'cancelled_request':
                // TODO: переделать определение ошибки
                if ( e.description === 'Forbidden (authorization error)' )
                    this.showError( e.type + ' ' + e.description );
                this.hidePopup();
                this.sipSessionCall && this.sipSessionCall.hangup();
                delete this.sipSessionCall;
                break;

            case 'i_ao_request':
                if ( e.description === 'Service Unavailable' )
                    this.showError( e.type + ' ' + e.description );

            case 'terminating':
                break;

            case 'terminated':
                delete this.sipSessionCall;
                this.hidePopup();
                break;

            case 'media_added':
            case 'm_early_media':
            case 'm_stream_audio_local_added':
            case 'm_stream_audio_remote_added':
                break;
        }
    },

    hangUpCall: function(){
        App.service( 'server' ).sendHangup({
            incoming: this.sipCallTypeIsIncoming()
        });
        this.sipHangUp();
        this.hidePopup();
    },

    rejectIncomingCall: function(){
        this.sipReject();
        this.hidePopup();
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
        if ( !this.sipIsCalling() ){
            this.sipCall();
            App.service( 'server' ).outboundCall( {number: this.getPhoneNumber(), video: true}, function( resp ){
                console.error( resp );

            });
            this.showOutgoingCall( this.getPhoneNumber() );
        }
        else {
            alert( 'Cannot make call during another call session' );
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
        if ( this.sipCallTypeIsIncoming() )
            this.rejectIncomingCall();
        else
            this.hangUpCall();
    },

    showIncomingCall: function( caller ){
        this.$.answerCall.show();
        this.$.popup.show();
        this.$.popupCaption.setContent( rc.format(loc.Dialer.incomingCall, {caller: caller}) );
    },

    showOutgoingCall: function( callee ){
        this.$.answerCall.hide();
        this.$.popup.show();
        this.$.popupTimer.start();
        this.$.popupCaption.setContent( rc.format(loc.Dialer.outgoingCall, {callee: callee}) );
    },

    hidePopup: function(){
        this.$.popup.hide();
        this.$.popupTimer.stop();
    },

    getAudioNode: function(){
        return document.getElementById( 'dialer_audio' );
    },

    getVideoNode: function(){
        return document.getElementById( 'dialer_video' );
    },

    showError: function( message ){
        this.$.errorContainer.show();
        this._appendMessage( this.$.errorContainer, message );
    },

    showStatus: function( status ){
        this.$.statusContainer.show();
        this._appendMessage( this.$.statusContainer, status );
    },

    _appendMessage: function( elem, message ){
        var count = 5,
            list = elem._messageList || [],
            result;
        list.push( message );
        elem._messageList = list;
        result = list.slice( list.length - (count + 1) ).join( '<br />' );
        elem.setContent( result );
    },

    onIncomingCall: function( msg ){
        console.error( 'incoming call', msg );
    },

    onHangUp: function( msg ){
        console.error( 'hangup', msg );
    }
});