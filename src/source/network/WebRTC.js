/**
 * @author Marenin Alexander
 * May 2013
 */

enyo.kind({
    name: 'rc.network.WebRTC',
    kind: null,

    servers: {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]},

    localVideoNode: null,
    remoteVideoNode: null,
    remoteAddress: null,

    isCaller: false,

    PeerConnection: window.webkitRTCPeerConnection || window.mozRTCPeerConnection || window.RTCPeerConnection,
    RTCIceCandidate: window.RTCIceCandidate,

    constructor: function( params ){
        params.remoteVideoNode && this.setRemoteVideoNode( params.remoteVideoNode );
        params.localVideoNode && this.setLocalVideoNode( params.localVideoNode );
        params.remoteHost && this.setRemoteHost( params.remoteHost );

        var self = this;

        this.pc = new this.PeerConnection( this.servers );
        this.pc.onicecandidate = this.sendIceCandidate.bind( this );
        this.pc.onaddstream = this.onAddRemoteStream.bind( this );

        this.pc.onconnecting = function(){ console.error( 'localPeer.onconnecting()', arguments ); };
        this.pc.onopen = function(){ console.error( 'localPeer.onopen()', arguments ); };

        this.offerListener = App.on( 'sdpOffer', function( description ){
            if ( self.pc ){
                self.pc.setRemoteDescription( new RTCSessionDescription(description) );
                self.pc.createAnswer( self.pc.remoteDescription, self.onLocalDescription.bind(self) );
            }
        });

        this.answerListener = App.on( 'sdpAnswer', function( description ){
            if ( self.pc ){
                self.pc.setRemoteDescription( new RTCSessionDescription(description) );
                // Here peers should connect
            }
        });

        this.iceCandidateListener = App.on( 'iceCandidate', function( candidate ){
            if ( self.pc )
                self.pc.addIceCandidate( new RTCIceCandidate(candidate) );
        });
    },

    sendIceCandidate: function( event ){
        App.service( 'server' ).sendIceCandidate( event.candidate );
    },

    destroy: function(){
        this.offerListener && this.offerListener.remove();
        this.answerListener && this.answerListener.remove();
        this.iceCandidateListener && this.iceCandidateListener.remove();
        delete this.offerListener;
        delete this.answerListener;
        delete this.iceCandidateListener;

        this.hangup();
        if ( this.localVideoNode )
            this.releaseVideoNode( this.localVideoNode );
        if ( this.remoteVideoNode )
            this.releaseVideoNode( this.remoteVideoNode );
    },

    hangup: function(){
        if ( this.pc ){
            this.pc.close();
            delete this.isCaller;
            delete this.pc;
        }
    },

    setLocalVideoNode: function( node ){
        this.localVideoNode = node;
        this.prepareVideoNode( this.localVideoNode );
    },

    getLocalVideoNode: function(){
        return this.localVideoNode;
    },

    setRemoteVideoNode: function( node ){
        this.remoteVideoNode = node;
        this.prepareVideoNode( this.remoteVideoNode );
    },

    getRemoteVideoNode: function(){
        return this.remoteVideoNode;
    },

    setRemoteHost: function( host ){
        this.remoteAddress = host;
    },

    getLocalVideoStream: function(){
        return this.localStream;
    },

    prepareVideoNode: function( node ){
        node.setAttribute( 'autoplay', 'autoplay' );
        node.setAttribute( 'muted', 'muted' );
    },

    releaseVideoNode: function( node ){
        node.pause && node.pause();
        delete node.src;
        delete node.mozSrcObject;
    },

    startCapturingLocalVideo: function(){
        var self = this;
        getUserMedia( {video: true, audio: false}, function( error, stream ){
            if ( error || !stream )
                alert( error || 'Unable to catch local video stream' );
            else {
                self.localStream = stream;
                self.pc.addStream( stream );
            }
        });
    },

    attachStream: function( stream, videoNode ){
        attachStreamToVideoNode( stream, videoNode );
        videoNode.play && videoNode.play();
    },

    call: function(){
        this.isCaller = true;
        this.pc.createOffer( this.onLocalDescription.bind(this) );
    },

    onAddRemoteStream: function( event ){
        if ( event.stream )
            this.attachStream( event.stream, this.getRemoteVideoNode() );
    },

    onLocalDescription: function( sdp ){
        this.pc.setLocalDescription( sdp );
        if ( this.isCaller )
            App.service( 'server' ).sendOffer( sdp );
        else
            App.service( 'server' ).sendAnswer( sdp );
    }
});


function getUserMedia( options, callback ){
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    navigator.getUserMedia(
        { audio: !!options.audio, video: !!options.video },

        function( stream ){
            callback( undefined, stream );
        },

        function( error ){
            callback( error );
        }
    );
}


function attachStreamToVideoNode( stream, node ){
    if ( !node )
        throw new Error( 'Hey man, where is my video node? Fuck off!' );

    if ( isFirefox() )
        node.mozSrcObject = stream;
    else
        node.src = URL.createObjectURL( stream );

    function isFirefox(){
        return !!navigator.mozGetUserMedia;
    }
}
