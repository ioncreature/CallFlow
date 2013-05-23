/**
 * @author Marenin Alexander
 * May 2013
 */

exports.routes = {
    AUTH: '/auth',
    GET_CAMPAIGN: '/campaign',
    VOTE: '/vote',
    GET_RESOURCE: '/resource/:id',
    API_VERSION: '/api/version',
    SESSION: '/system/session'
};

exports.statusCodes = {
    OK: 200,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500
};