/**
 * @author Marenin Alexander
 * May 2013
 */

var _config = {
    indexPage: 'Dialer',
    websocket: {
        "path": "ws://amarenin.int.nordigy.ru:8081/presence"
    },
    sip: {
        realm: 'sip.dins.ru',
        publicIdentity: 'sip:12052160015@192.168.23.202:5060',
        privateIdentity: '17453008',
        password: '17453008',
        displayName: '',
        enableVideo: false,
        enableRtcWebBreaker: true,
        websocketServerUrl: 'ws://192.168.23.223:10060',
        sipOutboundProxyUrl: 'udp://192.168.23.202:5060',
        iceServers: null
    }
};