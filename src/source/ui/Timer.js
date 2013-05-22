/**
 * @author Marenin Alexander
 * May 2013
 */

enyo.kind({
    name: 'rc.Timer',
    kind: 'Control',
    classes: 'ui-timer',

    statics: {
        HOUR: 3600 * 1000,
        MINUTE: 60 * 1000,
        SECOND: 1000
    },

    startTime: 0,
    interval: 0,

    create: function(){
        this.inherited( arguments );
        this.reset();
    },

    start: function(){
        this.startTime = Date.now();
        this.resume();
    },

    resume: function(){
        this.interval = setInterval( this.updateTimer.bind(this), 500 );
    },

    stop: function(){
        this.pause();
        this.reset();
    },

    pause: function(){
        clearInterval( this.interval );
    },

    reset: function(){
        this.startTime = Date.now();
        this.updateTimer();
    },

    updateTimer: function(){
        var time = Date.now() - this.startTime,
            hours,
            minutes,
            seconds,
            result = '';

        hours = Math.floor( time / rc.Timer.HOUR );
        time -=  hours * rc.Timer.HOUR;
        minutes = Math.floor( time / rc.Timer.MINUTE );
        time -=  minutes * rc.Timer.MINUTE;
        seconds = Math.floor( time / rc.Timer.SECOND );

        if ( hours > 0 )
            result += this.format( hours ) +  ':';
        result += this.format( minutes ) + ':' + this.format( seconds );
        this.setContent( result );
    },

    format: function( number ){
        return number.toString().length === 1 ? '0' + number : number;
    }
});