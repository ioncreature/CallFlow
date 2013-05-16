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

    handlers: {
        onOpen: 'pageOpen'
    },

    components: [
        {classes: 'ui-label', content: loc.Dialer.phoneNumber},
        {kind: 'onyx.InputDecorator', classes: 'ui-text-input ui-block', components: [
            {name: 'phoneNumber', kind: 'onyx.Input', placeholder: loc.Dialer.phoneNumberPlaceholder, value: '12052160027'}
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

    pageOpen: function(){
        this.sipInit();
    },

    sipInit: function(){
        var page = this;
        SIPml.init( function(){
            page.sipInited = true;
        });
    },

    sipRegister: function(){
        this.sipStack = new SIPml.Stack({
            realm: App.get( 'sip.realm' ),
            impi: App.get( 'sip.privateIdentity' ),
            impu: App.get( 'sip.publicIdentity' ),
            password: App.get( 'sip.password' ),
            display_name: App.get( 'sip.displayName' ),
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
    },

    sipStackEventHandler: function( /*SIPml.Stack.Event*/ e ){
        console.error( e );
        switch ( e.type ){
            case 'started':
                this.sipSession = this.newSession('register', {
                    expires: 300,
                    events_listener: { events: '*', listener: this.onSipEventSession },
                    sip_caps: [
                        { name: '+g.oma.sip-im', value: null },
                        { name: '+audio', value: null },
                        { name: 'language', value: '\"en,ru,fr\"' }
                    ]
                });
                oSipSessionRegister.register();
                break;
        }
    },

    sipSessionEventHandler: function(){

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
                realm: 'sip.dins.ru',
                impi: '17453008',
                impu: 'sip:12052160015@192.168.23.202:5060',
                password: '17453008',
                enable_rtcweb_breaker: true,
                websocket_server_url: 'ws://192.168.23.223:10060',
                websocket_proxy_url: 'ws://192.168.23.223:10060',
                outbound_proxy_url: 'udp://192.168.23.202:5060',
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
                            page.log( 'connection established', phoneIdentifier );
                            page.setCalling( true );
                            page.setConnecting( false );
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
    }
});