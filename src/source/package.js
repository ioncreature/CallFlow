enyo.depends(
    '$lib/g11n',
	'$lib/layout',
	'$lib/onyx/source/TabPanels.js',
	'$lib/onyx',
	'$lib/SIPml-api.js', // SIP + WebRTC library
	'$lib/socket.io.js', // WebSockets client library
	'Theme.less', // uncomment this line, and follow the steps described in Theme.less

    'config.js',
	'loc/en_US.js',
    'core',
    'data',
    'network',
    'service',
    'ui',

    'page/Dev.js',
    'page/Login.js',
    'page/UserInfo.js',
    'page/Dialer.js',
    'page/Fax.js',
    'page/CallFlow.js',
    'page/UnderConstruction.js',
    'page/GreetCaller.js',
    'page/CallerId.js',
    'page/AddRule.js',
    'page/RingPhones.js',
    'page/PhoneGroupSettings.js',
    'page/AfterHoursWizard.js',

	'App.js'
);
