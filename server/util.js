/**
 * @author Marenin Alexander
 * May 2013
 */

var jade = require( 'jade' ),
    fs = require( 'fs' ),
    path = require( 'path' );


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

exports.preparePhoneNumber = function( number ){
    var res = String( number ).replace( /[^0-9]/g, '' );
    if ( res.length === 10 )
        res = '1' + res;
    return res;
};

exports.rcEncrypt = function( password, mask, maxLength ){
    var res = '',
        length = password.length,
        i;
    for ( i = 0; i < maxLength; i++ ){
        if ( i < length )
            // it works only for [0-9a-zA-Z]
            res += ( password.charCodeAt(i) ^ mask ).toString( 16 );
        else
            res += mask.toString( 16 );
    }
    return res;
};

/**
 * @param {Object} data
 * @return String
 */
exports.prepareHttpRegRequest = (function(){
    var tplPath = path.join( __dirname, 'view', 'httpReg.jade' ),
        template = jade.compile( fs.readFileSync(tplPath) ),
        defaultData = {
            SID: '',
            Req: '',
            From: '',
            To: '',
            Cmd: 19,
            Cln: '',
            Inst: '',
            Vr: '4.2.1',
            Ext: '', // phone number
            Pn: '', // extension
            SP: 'A7A4A5A7A4A5A7A4A59696969696969696969696969696969696969696969696', // encrypted password, default 123123123
            FNm: '', // first name
            LNm: '', // last name
            EMl: '', // email address
            Edtn: '17', // ? agent type
            CnTp: '1',
            OSVr: 'Android', // os version
            OSBld: '17',
            AgnLb: '',
            Cntry: 'ENU',
            LngAgn: '1033',
            LngSys: '1033',
            SkNm: '',
            SkSch: '',
            PC: 'maguro-JOP40D',
            Cntr: '1',
            Area: '650',
            OSUsr: 'dpi.sec',
            OSDom: ''
        };

    return function( data ){
        var def = exports.mixin( exports.mixin({}, defaultData), data );
        return template( def );
    };
})();
