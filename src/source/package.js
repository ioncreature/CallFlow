enyo.depends(
    'config.js',
    '$lib/g11n',
	'$lib/layout',
	'$lib/onyx/source/TabPanels.js',
	'$lib/onyx',
	'$lib/SIPml-api.js', // SIP + WebRTC library
	'Theme.less', // uncomment this line, and follow the steps described in Theme.less

	'loc/en_US.js',

    'core',
    'data',
    'network',

    'ui/Control.js',
    'ui/Button.js',
    'ui/NavToolbar.js',
    'ui/ColumnsLayout.js',
    'ui/VerticalGroup.js',
    'ui/RadioListItem.js',
    'ui/RadioList.js',
    'ui/NavButton.js',
    'ui/Scroller.js',
    'ui/MainMenuItem.js',
    'ui/Panels.js',
    'ui/EditableList.js',
    'ui/ToggleButton.js',
    'ui/Switch.js',
    'ui/Notifications.js',
    'ui/PhoneItem.js',
    'ui/PhoneGroup.js',
    'ui/PhoneGroups.js',
    'ui/UserInfoPanel.js',
    'ui/CallFlowItem.js',
    'ui/AudioPlayer.js',
    'ui/Tabs.js',
    'ui/Page.js',
    'ui/WizardPage.js',
    'ui/WizardPageStep.js',


    'page/Dev.js',
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
