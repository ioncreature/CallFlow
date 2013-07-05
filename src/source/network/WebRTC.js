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
        params.localVideoNode && this.setRemoteVideoNode( params.localVideoNode );
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
        console.log( 'self', self );
        this.localUserMedia = getUserMedia({
            video: self.localVideoNode,
            onsuccess: function( stream ){
                self.attachStream = stream;
                self.localVideoNode.play();
            },
            onerror: function(){
                alert( 'unable to get access to your webcam' );
            }
        });
    }
});


function getUserMedia( options ){
    var URL = window.webkitURL || window.URL;
    navigator.getUserMediaCross = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia;

    navigator.getUserMediaCross(
        { audio: false, video: true },
        function( stream ){
            if ( options.video ){
                if ( !navigator.mozGetUserMedia )
                    options.video.src = URL.createObjectURL( stream );
                else
                    options.video.mozSrcObject = stream;
                options.video.localVideoNode.play();
            }

            options.onsuccess && options.onsuccess( stream );
            return stream;
        },
        options.onerror
    );
}