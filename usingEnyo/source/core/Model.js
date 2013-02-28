/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    name: 'rc.Model',
    kind: 'rc.Observable',

    attr: null,
    changed: null,
    defaults: null,
    initAttrs: null,
    handlers: null,

    constructor: function( attributes, options ){
        this.changed = {};
        this.handlers = {};
        this.defaults = enyo.mixin( options.defaults, this.defaults );
        this.attr = enyo.mixin( attributes || {}, this.defaults );
        this.initAttrs = enyo.mixin( {}, this.attr );
        this.inherited( arguments );
    },

    /**
     * @param {Object|string} key
     * @param {*} val
     * @param {Object} options
     * @param {boolean} options.silent
     */
    set: function( key, val, options ){
        if ( arguments.length == 1 && arguments[0] instanceof Object ){
            var values = arguments[0];
            Object.keys( values ).forEach( function( key ){
                this.setValue( key, values[key] );
            }, this );
        }
        else if ( arguments.length == 2 )
            this.setValue.apply( this, arguments );
        else
            throw new TypeError( 'Arguments does not match function signature' );
    },

    setValue: function( key, value ){
        if ( this.attr[key] !== value ){
            this.changed[key] = true;
            this.attr[key] = value;
            this.notify( key );
        }
    },

    /**
     * @param {String[]|String} key
     */
    get: function( key ){
        if ( typeof key == 'string' )
            return this.attr[key];

        var k,
            res = {};

        for ( k in key ) if ( key.hasOwnProperty(k) )
            res[k] = this.attr[k];
        return res;
    },

    reset: function(){
        this.attr = enyo.mixin( this.initAttrs );
        this.changed = {};
    },

    /**
     * @param {?string} key
     */
    isChanged: function( key ){
        if ( key )
            return this.changed[key] === true;
        else
            return Object.keys( this.changed ).every( this.isChanged, this );
    },

    onChange: function( key, callback ){}
});