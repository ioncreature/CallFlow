/**
 * @author Marenin Alexander
 * May 2013
 */

/**
 * @author Marenin Alex
 * November 2012
 */

var server = require( './server' ),
    configName = process.argv[2] || 'dev',
    util = require( './util.js' ),
    config = util.getConfig( configName );

var app = server.create( config );
server.start( app );
