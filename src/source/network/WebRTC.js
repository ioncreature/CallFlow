/**
 * @author Marenin Alexander
 * May 2013
 */

enyo.kind({
    name: 'rc.network.WebRTC',
    kind: null,

    localVideoNode: null,
    remoteVideoNode: null,
    remoteAddress: null,

    PeerConnection: window.webkitRTCPeerConnection || window.mozRTCPeerConnection || window.RTCPeerConnection,

    constructor: function( params ){
        params.remoteVideoNode && this.setRemoteVideoNode( params.remoteVideoNode );
        params.localVideoNode && this.setLocalVideoNode( params.localVideoNode );
        params.remoteHost && this.setRemoteHost( params.remoteHost );
    },

    destroy: function(){
        if ( this.localVideoNode )
            this.releaseVideoNode( this.localVideoNode );
        if ( this.remoteVideoNode )
            this.releaseVideoNode( this.remoteVideoNode );
    },

    setLocalVideoNode: function( node ){
        this.localVideoNode = node;
        this.prepareVideoNode( this.localVideoNode );
    },

    setRemoteVideoNode: function( node ){
        this.remoteVideoNode = node;
        this.prepareVideoNode( this.remoteVideoNode );
    },

    setRemoteHost: function( host ){
        this.remoteAddress = host;
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
                attachStreamToVideoNode( stream, self.localVideoNode );
                self.localVideoNode.play && self.localVideoNode.play();
            }
        });
    },

    connectToPeer: function(){
        var conn = new this.PeerConnection();
    },

    waitForConnection: function(){
        var conn = new this.PeerConnection();
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