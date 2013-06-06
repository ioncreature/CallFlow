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

exports.environments = {
    spbDev: {
        jedi: {
            path: 'http://service-rnd.lab.nordigy.ru/mobile/api/proxy.html'
        },
        rgs: {
            path: 'http://agentconnect-rnd.lab.nordigy.ru/httpreg/rchttpreg.dll?Register',
            passMask: 0x96,
            passMaxLength: 32
        },
        sip: {
            websocketServer: 'ws://192.168.23.223:10060',
            enableVideo: false,
            iceServers: null,
            enableRtcWebBreaker: true
        }
    },

    sv7: {
        jedi: {
            path: 'http://199.68.214.199/mobile/api/proxy.html'
        },
        rgs: {
            path: 'http://199.68.214.208/httpreg/rchttpreg.dll?Register',
            passMask: 0x96,
            passMaxLength: 32
        },
        sip: {
            websocketServer: 'ws://199.68.214.209:10060',
            enableVideo: false,
            iceServers: null,
            enableRtcWebBreaker: true
        }
    },

    production: {
        jedi: {
            path: 'https://service.ringcentral.com/mobile/api/proxy.html'
        },
        rgs: {
            path: 'http://agentconnect.ringcentral.com/httpreg/rchttpreg.dll?Register',
            passMask: 0x96,
            passMaxLength: 32
        },
        sip: {
            websocketServer: 'ws://199.68.214.209:10060',
            enableVideo: false,
            iceServers: null,
            enableRtcWebBreaker: true
        }
    }
};