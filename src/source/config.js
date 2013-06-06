/**
 * @author Marenin Alexander
 * May 2013
 */

var _configDev = {
    indexPage: 'Dialer',
    websocket: {
        path: 'http://amarenin.int.nordigy.ru:31337'
    },
    sip: {
        realm: 'sip.dins.ru',
        identity: [
            {
                displayName: 'Alexander Marenin',
                publicIdentity: 'sip:12052160015@192.168.23.202:5060',
                privateIdentity: '17453008',
                password: '17453008'
            },
            {
                displayName: 'Dmitry Pevzner',
                publicIdentity: 'sip:12052160005@192.168.23.202:5060',
                privateIdentity: '17455008',
                password: '17455008'
            },
            {
                displayName: 'Alexey Shpagin',
                publicIdentity: 'sip:12052160010@192.168.23.202:5060',
                privateIdentity: '17456008',
                password: '17456008'
            },
            {
                displayName: 'Alexey Petrov',
                publicIdentity: 'sip:12052160013@192.168.23.202:5060',
                privateIdentity: '17457008',
                password: '17457008'
            },
            {
                displayName: 'Vlad Vendrow',
                publicIdentity: 'sip:12052160021@192.168.23.202:5060',
                privateIdentity: '17458008',
                password: '17458008'
            },
            {
                displayName: 'Tester',
                publicIdentity: 'sip:12052160026@192.168.23.202:5060',
                privateIdentity: '17459008',
                password: '17459008'
            },
            {
                displayName: 'Alexander Marenin Hardphone',
                publicIdentity: 'sip:12052160027@192.168.23.202:5060',
                privateIdentity: '17454008',
                password: '17454008'
            }
        ],
        displayName: '',
        enableVideo: false,
        enableRtcWebBreaker: true,
        websocketServerUrl: 'ws://192.168.23.223:10060',
        sipOutboundProxyUrl: 'udp://192.168.23.202:5060',
        iceServers: null
    }
};


var _configProduction = {
    indexPage: 'CallFlow',
    websocket: {
        path: 'http://callflow.firecrush.com:8080'
    },
    sip: {
        realm: 'sip.ringcentral.com:5060',
        identity: [
            {
                displayName: 'Alexander Marenin',
                publicIdentity: 'sip:18664100003@sip-devrnd.lab.nordigy.ru:5060',
                privateIdentity: '11051976',
                password: '11051976'
            },
            {
                displayName: 'Dmitry Pevzner',
                publicIdentity: 'sip:12052160036@sip-devrnd.lab.nordigy.ru:5060',
                privateIdentity: '17414008',
                password: '17414008'
            },
            {
                displayName: 'Alexey Shpagin',
                publicIdentity: 'sip:12052160028@sip-devrnd.lab.nordigy.ru:5060',
                privateIdentity: '17413008',
                password: '17413008'
            },
            {
                displayName: 'Alexey Petrov',
                publicIdentity: 'sip:12052160045@sip-devrnd.lab.nordigy.ru:5060',
                privateIdentity: '17415008',
                password: '17415008'
            },
            {
                displayName: 'Vlad Vendrow',
                publicIdentity: 'sip:12052160016@sip-devrnd.lab.nordigy.ru:5060',
                privateIdentity: '17416008',
                password: '17416008'
            },
            {
                displayName: 'Test Account',
                publicIdentity: 'sip:18664100005@sip-devrnd.lab.nordigy.ru:5060',
                privateIdentity: '11051976',
                password: '11051976'
            },
            {
                displayName: 'Test Account 2',
                publicIdentity: 'sip:18664100006@sip-devrnd.lab.nordigy.ru:5060',
                privateIdentity: '11051976',
                password: '11051976'
            }
        ],
        displayName: '',
        enableVideo: false,
        enableRtcWebBreaker: true,
        websocketServerUrl: 'ws://199.68.214.209:10060',
        sipOutboundProxyUrl: 'udp://199.255.120.176:5090',
        iceServers: null
    }
};