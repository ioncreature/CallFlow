/**
 * @author Marenin Alexander
 * June 2013
 */

(function(){
    var rc = {};


    /**
     * @param {string} number
     * @return string
     */
    rc.preparePhoneNumber = function( number ){
        var res = String( number ).replace( /[^0-9]/g, '' );
        if ( res.length === 10 )
            res = '1' + res;
        return res;
    };


    /**
   	 * Create new array with unique values
   	 * @param {Array} array
     * @param {Function?} compareFn
   	 * @return Array
   	 */
    rc.arrayUnique = function( array, compareFn ){
   		return array.filter( function( val, i ){
   			for ( var j = i + 1; j < array.length; j++ ){
                   if ( compareFn )
                       return compareFn( array[i], array[j] );
   				else if ( array[i] === array[j] )
   					return false;
               }

   			return true;
   		});
   	};


    /**
     * Finds needle string recursively in keys and values
     * It's useful to find some key or value in big objects when debugging in console
     * @param {Object} object
     * @param {string|Function|RegExp} needle
     * @param {number?} _stackDepth - depth of search in tree
     * @return Array
     */
    rc.find = function find( object, needle, _stackDepth ){
        if ( _stackDepth <= 0 )
            return [];
        else if ( typeof _stackDepth == 'undefined' )
            _stackDepth = 5;

        if ( !(object instanceof Object) )
            return [];

        var keys = Object.keys( object ),
            searchResults = [],
            key,
            value,
            i;

        var test;
        if ( typeof needle === 'function' )
            test = testFunc;
        else if ( needle instanceof RegExp )
            test = testRegExp;
        else
            test = testString;

        for ( i = 0; i < keys.length; i++ ){
            key = keys[i];
            value = object[key];

            // search in key
            if ( test(key, needle) )
                searchResults.push( key );

            // search in value: string or number
            if ( typeof value == 'string' || typeof value == 'number' )
                test( String(value), needle ) && searchResults.push( key );

            // search in value: array or object
            else if ( typeof value == 'object' )
                find( value, needle, _stackDepth - 1 ).forEach( function( val ){
                    searchResults.push( key + '.' + val );
                });
        }

        return rc.arrayUnique( searchResults );
    };

    function testString( value, str ){
        return value.indexOf( str ) > -1;
    }

    function testFunc( value, fn ){
        return fn( value );
    }

    function testRegExp( value, re ){
        return re.test( value );
    }


    enyo.setObject( 'rc', enyo.mixin(enyo.getObject('rc'), rc) );
})();