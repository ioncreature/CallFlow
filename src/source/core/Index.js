/**
 * @author Marenin Alexander
 * April 2013
 */

enyo.kind({
    name: 'rc.Index',
    kind: 'enyo.Object',

    constructor: function(){
        this.reset();
    },

    get: function( key ){
        return this.index[key];
    },

    add: function( key, value ){
        if ( !this.index.hasOwnProperty( key ) )
            this.length ++;
        this.index[key] = value;
    },

    remove: function( key ){
        delete this.index[key];
        this.length --;
    },

    reset: function(){
        this.index = {};
        this.length = 0;
    },

    getLength: function(){
        return this.length;
    },

    destroy: function(){
        delete this.index;
        delete this.length;
    }
});