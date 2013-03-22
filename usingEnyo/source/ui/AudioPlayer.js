/**
 * @author Marenin Alexander
 * March 2013
 */

enyo.kind({
    name: 'rc.AudioPlayer',
    kind: 'FittableColumns',
    classes: 'ui-audio-player',

    events: {
        onPlay: '',
        onPause: ''
    },

    components: [
        {name: 'button', classes: 'ui-audio-player-button', ontap: 'tapButton'},
        {classes: 'ui-audio-player-slider', fit: true, components: [
            {name: 'slider', kind: 'onyx.Slider', min: 0, max: 100, value: 0}
        ]}
    ],

    create: function(){
        this.inherited( arguments );
        this.playing = false;
    },

    isPlaying: function(){
        return this.playing;
    },

    pause: function(){
        if ( this.isPlaying() ){
            this.playing = false;
            this.$.button.removeClass( 'pause' );
            this.doPause();
        }
    },

    play: function(){
        if ( !this.isPlaying() ){
            this.playing = true;
            this.$.button.addClass( 'pause' );
            this.doPlay();
        }
    },

    tapButton: function(){
        if ( this.isPlaying() )
            this.pause();
        else
            this.play();
    }
});