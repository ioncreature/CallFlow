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
        {classes: 'ui-label', content: loc.Dialer.caller},
        {name: 'caller', kind: 'rc.RadioList'},
        {classes: 'ui-center', components: [
            {name: 'register', kind:'rc.Button', content: loc.Dialer.register, ontap: 'tapLoginButton'}
        ]},

        {classes: 'ui-label', content: loc.Dialer.callTo},
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
    ],

    create: function(){
        this.inherited( arguments );
        this.connecting = false;
        this.calling = false;
    },

    pageOpen: function(){
        this.fillIdentityList();
        this.sipInit();
    },

    fillIdentityList: function(){
        this.collection = new rc.Collection();
        var list = App.get( 'sip.identity' );
        list.forEach( function( item ){
            this.collection.add( item );
        }, this );
        this.$.caller.setAdapter( function( item ){
            var pu = item.get( 'publicIdentity' );
            return {
                caption: item.get( 'displayName' ),
                description: pu.slice( pu.indexOf(':') + 1, pu.indexOf('@') )
            }
        });
        this.$.caller.setCollection( this.collection );
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

    sipStackEventHandler: function( /*SIPml.Stack.Event*/ e ){
        console.warn( 'sipStackEventHandler', e );
        switch ( e.type ){
            case 'started':
                this.sipSession = this.sipStack.newSession('register', {
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
            case 'stopped':
            case 'failed_to_start':
            case 'failed_to_stop':
                this.sipSession = null;
                this.sipSessionCall = null;
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

    sipSessionEventHandler: function( /*SIPml.Session.Event*/ e ){
        console.warn( 'sipSessionEventHandler', e );
        switch ( e.type ){
            case 'connecting':
            case 'connected':
                console.log( 'Connected' );
                break;

            case 'terminating':
            case 'terminated':
                this.sipSessionCall = null;
                this.setCalling( false );
                this.setConnecting( false );
                break;
        }
    },

    hangUp: function(){
        if ( this.sipSessionCall )
            this.sipSessionCall.hangup({
                events_listener: { events: '*', listener: this.sipSessionEventHandler.bind(this) }
            });
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

    getSelecteIdentity: function(){
        return this.$.caller.getActiveModel().get([
            'displayName',
            'publicIdentity',
            'privateIdentity',
            'password'
        ]);
    },

    tapLoginButton: function(){
        if ( this.sipIsRegistered() ){
            this.sipLogout();
            this.$.register.setContent( loc.Dialer.register );
        }
        else {
            this.sipRegister( this.getSelecteIdentity() );
            this.$.register.setContent( loc.Dialer.logout );
        }
    },

    tapCallButton: function(){
        if ( this.connecting )
            this.log( 'Wait. Connection is establishing.' );
        else if ( this.calling )
            this.hangUp();
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