/**
 * @author Marenin Alexander
 * May 2013
 */

exports.port = 31337;

exports.cookieAge = 7*24*3600*1000; // 7 days

exports.i18n = {
    defaultLocale: 'ru_RU'
};

exports.static = {
    path: './static/'
};

exports.jedi = {
    path: 'http://service-rnd.lab.nordigy.ru/mobile/api/proxy.html'
};

exports.rgs = {
    path: 'http://agentconnect-rnd.lab.nordigy.ru/httpreg/rchttpreg.dll?Register',
    pass: {
        mask: 0x96,
        maxLength: 32
    }
};

