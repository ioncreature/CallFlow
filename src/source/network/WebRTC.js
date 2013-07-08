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

    constructor: function( params ){
        params.remoteVideoNode && this.setRemoteVideoNode( params.remoteVideoNode );
        params.localVideoNode && this.setLocalVideoNode( params.localVideoNode );
        params.remoteHost && this.setRemoteHost( params.remoteHost );
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
        node.setAttribute( 'muted', true );
        node.setAttribute( 'autoplay', true );
        node.setAttribute( 'controls', true );
    },

    startCapturingLocalVideo: function(){
        var self = this;
        getUserMedia( {video: true, audio: false}, function( error, stream  ){
            if ( error || !stream )
                alert( error || 'Unable to catch local video stream' );
            else {
                self.localStream = stream;
                attachStreamToVideoNode( stream, self.localVideoNode );
            }
        });
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