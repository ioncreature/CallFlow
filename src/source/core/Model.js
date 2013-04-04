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
        this.defaults = enyo.mixin( options && options.defaults || {}, this.defaults );
        this.attr = enyo.mixin( enyo.mixin({}, this.defaults), attributes || {} );
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
        if ( key instanceof Object ){
            var values = arguments[0],
                opts = arguments[1];
            Object.keys( values ).forEach( function( key ){
                this.setValue( key, values[key], opts );
            }, this );
        }
        else if ( typeof key == 'string' )
            this.setValue.apply( this, arguments );
        else
            throw new TypeError( 'Arguments does not match function signature' );
    },

    setValue: function( key, value, options ){
        if ( this.attr[key] !== value ){
            this.changed[key] = true;
            this.attr[key] = value;
            if ( !(options && options.silent) )
                this.trigger( key, value );
        }
    },

    /**
     * @param {string[]|string} keys
     */
    get: function( keys ){
        return typeof keys == 'string'
            ? this.getValue( keys )
            : this.getSubset( keys );
    },

    getValue: function( key ){
        return this.attr[key];
    },

    /**
     * @param {string[]} keys
     */
    getSubset: function( keys ){
        var res = {};

        keys.forEach( function( key ){
            res[key] = this.getValue( key );
        }, this );
        return res;
    },

    reset: function( options ){
        this.attr = enyo.mixin( {}, this.initAttrs );
        this.changed = {};
        if ( !(options && options.silent === true) )
            this.trigger( 'reset', this );
    },

    /**
     * @param {string?} key
     */
    isChanged: function( key ){
        if ( key )
            return this.changed[key] === true;
        else
            return Object.keys( this.changed ).some( this.isChanged, this );
    },

    /**
     * @override
     */
    save: function(){
        this.changed = {};
    }
});