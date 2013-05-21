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
        {name: 'error', classes: 'ui-dialer-error', showing: false, content: 'This is a big error message'},

        {name: 'unregisteredBlock', components: [
            {classes: 'ui-message', content: loc.Dialer.notLoggedIn},
            {classes: 'ui-label', content: loc.Dialer.caller},
            {name: 'caller', kind: 'rc.RadioList'},
            {classes: 'ui-center', components: [
                {name: 'login', kind:'rc.Button', content: loc.Dialer.login, ontap: 'tapLoginButton'}
            ]}
        ]},

        {name: 'registeredBlock', components: [
            {name: 'registeredCaller', classes: 'ui-dialer-registered-caller', components: [
                {name: 'callerName', classes: 'ui-dialer-registered-caller-name'},
                {name: 'callerPhone', classes: 'ui-dialer-registered-caller-phone'},
                {
                    name: 'logout',
                    kind:'rc.Button',
                    classes: 'ui-dialer-registered-caller-button',
                    ontap: 'tapLogoutButton',
                    content: loc.Dialer.logout
                }
            ]},

            {classes: 'ui-label', content: loc.Dialer.callTo},
            {name: 'callee', kind: 'rc.RadioList', onActivate: 'onCalleeActivate'},
            {classes: 'ui-label', content: loc.Dialer.phoneNumber},
            {kind: 'onyx.InputDecorator', classes: 'ui-text-input ui-block', components: [
                {name: 'phoneNumber', kind: 'onyx.Input', placeholder: loc.Dialer.phoneNumberPlaceholder, value: '12052160027'}
            ]},
            {classes: 'ui-center', components: [
                {name: 'call', kind:'rc.Button', content: loc.Dialer.call, ontap: 'tapCallButton'}
            ]},
            {classes: 'ui-center', components: [
                {name: 'pickup', kind:'rc.Button', content: loc.Dialer.pickup, ontap: 'tapPickup', showing: false}
            ]},
            {name: 'audioContainer', allowHtml: true, content:'<audio autoplay id="dialer_audio" />'}
        ]}
    ],

    create: function(){
        this.inherited( arguments );
        this.connecting = false;
        this.calling = false;
    },

    pageOpen: function(){
        this.fillLists();
        this.sipInit();
        if ( this.sipIsRegistered() )
            this.setUiRegistered();
        else
            this.setUiUnregistered();
    },

    fillLists: function(){
        var page = this;
        this.collection = new rc.Collection();
        App.get( 'sip.identity' ).forEach( function( item ){
            this.collection.add( item );
        }, this );

        this.$.caller.setAdapter( itemAdapter );
        this.$.caller.setCollection( this.collection );

        this.$.callee.setAdapter( itemAdapter );
        this.$.callee.setCollection( this.collection );

        function itemAdapter( item ){
            var pu = item.get('publicIdentity');
            return {
                caption: item.get( 'displayName' ),
                description: page.sipParseNumberFromPublicIdentity( item.get('publicIdentity') )
            };
        }
    },

    sipParseNumberFromPublicIdentity: function( pi ){
        return pi.slice( pi.indexOf(':') + 1, pi.indexOf('@') );
    },

    sipInit: function(){
        var page = this;
        SIPml.init( function(){
            page.sipInited = true;
        });
    },

    sipRegister: function( identity ){
        this.sipStack = new SIPml.Stack({
            realm: App.get( 'sip.realm' ),
            impi: identity.privateIdentity,
            impu: identity.publicIdentity,
            password: identity.password,
            display_name: identity.displayName,
            websocket_proxy_url: App.get( 'sip.websocketServerUrl' ),
            outbound_proxy_url: App.get( 'sip.sipOutboundProxyUrl' ),
            ice_servers: App.get( 'sip.iceServers' ),
            enable_rtcweb_breaker: App.get( 'sip.enableRtcWebBreaker' ),
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

    sipStackEventHandler: function( /*SIPml.Stack.Event*/ e ){
        console.warn( 'sipStack', e.type, e );
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

            case 'failed_to_start':
            case 'stopped':
                delete this.sipSessionCall;
                this.setUiUnregistered();
            case 'failed_to_stop':
                break;
            case 'stopping':
                break;

            case 'i_new_call':
                if ( this.sipSessionCall )
                    e.newSession.hangup();
                else {
                    this.sipSessionCall = e.newSession;
                    this.showPickUp();
                }
                break;
        }
    },

    sipCall: function(){
        var oConf = {
                audio_remote: this.getAudioNode(),
                events_listener: { events: '*', listener: this.sipSessionEventHandler.bind(this) },
                sip_caps: [
                    { name: '+g.oma.sip-im' },
                    { name: '+sip.ice' },
                    { name: 'language', value: '"en,ru"' }
                ]
            },
            phoneIdentifier = this.getPhoneNumber(),
            videoEnabled = App.get('sip.enableVideo' ),
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
        if ( this.sipSessionCall )
            this.sipSessionCall.hangup({
                events_listener: { events: '*', listener: this.sipSessionEventHandler.bind(this) }
            });
    },

    sipSessionEventHandler: function( /*SIPml.Session.Event*/ e ){
        console.warn( 'sipSession', e.type, e );
        switch ( e.type ){
            case 'connecting':
//                this.setCalling( false );
//                this.setConnecting( true );
                break;

            case 'connected':
//                this.setCalling( false );
//                this.setConnecting( false );
                this.setUiRegistered();
                break;

            case 'terminating':
            case 'terminated':
                this.sipSessionCall = null;
                this.setCalling( false );
                this.setConnecting( false );
                break;
        }
    },

    getPhoneNumber: function(){
        return this.$.phoneNumber.getValue();
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
        var identity = this.getSelectedIdentity();
        this.$.phoneNumber.setValue( this.sipParseNumberFromPublicIdentity(identity.publicIdentity) );
    },

    setUiRegistered: function(){
        this.$.unregisteredBlock.hide();
        this.$.registeredBlock.show();

        var identity = this.getSelectedIdentity(),
            number = this.sipParseNumberFromPublicIdentity( identity.publicIdentity );
        this.$.callerName.setContent( identity.displayName );
        this.$.callerPhone.setContent( number );
        this.$.logout.setDisabled( false );
    },

    setUiUnregistered: function(){
        this.$.unregisteredBlock.show();
        this.$.registeredBlock.hide();
        this.$.login.setDisabled( false );
    },

    showErrorMessage: function( message ){
        if ( message ){
            this.$.error.show();
            this.$.error.setContent( message );
        }
        this.$.login.setDisabled( false );
        this.$.logout.setDisabled( false );
    },

    hideErrorMessage: function(){
        this.$.error.hide();
    },

    tapLoginButton: function(){
        if ( !this.sipIsRegistered() ){
            this.hideErrorMessage();
            this.sipRegister( this.getSelectedIdentity() );
            this.$.login.setDisabled( true );
        }
    },

    tapLogoutButton: function(){
        this.hideErrorMessage();
        this.$.logout.setDisabled( true );
        this.sipLogout();
    },

    tapCallButton: function(){
        if ( this.connecting )
            this.log( 'Wait. Connection is establishing.' );
        else if ( this.sipSessionCall )
            this.sipHangUp();
        else {
            this.$.call.setContent( loc.Dialer.hangup );
            this.sipCall();
        }
    },

    tapPickup: function(){
        this.sipSessionCall.accept({ audio_remote: this.getAudioNode() });
        this.hidePickUp();
        this.setCalling( true );
    },

    showPickUp: function(){
        this.$.pickup.show();
    },

    hidePickUp: function(){
        this.$.pickup.hide();
    },

    getAudioNode: function(){
        return document.getElementById( 'dialer_audio' );
    }
});