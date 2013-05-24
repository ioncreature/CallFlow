/**
 * @author Marenin Alexander
 * May 2013
 */

/**
 * @param {string} route
 * @param {Object} data
 * @return string
 */
exports.format = function( route, data ){
    var placeholders = route.match( /:\w+/g ) || [],
        res = route,
        i;

    for ( i = 0; i < placeholders.length; i++ )
        res = res.replace( new RegExp(placeholders[i], 'g'), data[placeholders[i].substr(1)] );

    return res;
};

/**
 * @param {Object|null} destination
 * @param {Object} source
 * @return Object
 */
exports.mixin = function mixin( destination, source ){
    var res = destination ? destination : {};

    if ( source )
        for ( var k in source ) if ( source.hasOwnProperty(k) )
            res[k] = source[k];

    return res;
};

/**
 * @param {Object} original
 * @param {Object} newSample
 * @return Object
 */
exports.objectDiff = function( original, newSample ){
    var diff = {},
        count = 0;
    for ( var k in newSample ) if ( newSample.hasOwnProperty(k) )
        if ( original[k] !== newSample[k] ){
            diff[k] = newSample[k];
            count ++;
        }

    return count ? diff : false;
};

/**
 * @param {string} configName
 * @returns Object
 */
exports.getConfig = function( configName ){
    var conf = require( './config/' + configName + '.js' ),
        common = require('./config/common.js');
        res = {};
    this.mixin( res, common );
    this.mixin( res, conf );
    return res;
};
