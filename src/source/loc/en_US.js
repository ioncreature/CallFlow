/**
 * @author Marenin Alexander
 * February 2013
 */


var loc = {
    img: {
        avatar: 'assets/images/avatar.jpg'
    },

    back: 'Back',
    next: 'Next',
    save: 'Save',
    edit: 'Edit',
    done: 'Done',
    menu: 'Menu',
    cancel: 'Cancel',
    test: 'Test',
    on: 'On',
    off: 'Off',


    App: {
        dialer: 'Dialer',
        activityLog: 'Activity Log',
        contacts: 'Contacts',
        favorites: 'Favorites',
        messages: 'Messages',
        conference: 'Conference',
        accountSettings: 'Account Settings',
        userInfo: 'User Info',
        callFlow: 'Call Flow',
        fax: 'Fax',
        applicationSettings: 'Application Settings',
        general: 'General',
        audio: 'Audio',
        dev: 'Dev',
        logout: 'Logout'
    },

    CallFlow: {
        caption: 'Call Flow',
        blockCallers: 'Block Callers',
        answeringRules: 'Answering Rules',
        answeringRulesDesc: 'System behavior based on time of the day and day of the week.',
        greetTheCaller: 'Greet the Caller',
        greetTheCallerDesc: 'First thing that callers will hear after system picks up incoming call.',
        greetTheCallerHint: 'Thank you for calling Vlad Vendrow',
        screenTheCaller: 'Screen the Caller',
        screenTheCallerDesc: 'Ask callers to say their name before connecting.',
        screenTheCallerHint: 'Please say who is calling',
        connecting: 'Connecting',
        connectingDesc: 'Callers will hear a message that they are being connected to your extension.',
        connectingHint: 'Please hold while I try to connect you',
        playing: 'Playing',
        playingDesc: 'What users will hear while call comes through.',
        playingHint: 'Easy listening',
        ringSoftphones: 'Ring My Softphones:',
        ringSoftphonesDesc: 'As call comes through you will receive real time notification on your desktop client and mobile device.',
        delay: 'Delay:',
        delayDesc: 'Phone system will wait 5 rings before continue routing incoming call.',
        ringMyPhones: 'Ring My Phones',
        ringMyPhonesDesc: 'Define in what order and which of your phones will ring when call comes in.',
        voicemail: 'Voicemail',
        voicemailDesc: 'You can listen to your voicemail on service site or your mobile device at any time.',
        voicemailHint: 'Your call has been forwarded to the voicemail for Vlad Vendrow',
        notifications: 'Notifications',
        notificationsDesc: 'You will be notified about new events by selected method.',
        sendViaEmail: 'Send via email:',
        sendViaText: 'Send via Text:',
        addAfterHours: 'Add After Hours',
        addCustomRule: 'Add Custom Rule',
        showActive: 'Show',
        showAll: 'Edit'
    },

    Fax: {
        caption: 'Fax'
    },

    UserInfo: {
        caption: 'User Info'
    },

    UserInfoPanel: {
        numbers: 'Numbers',
        phonesAndPresence: 'Phones & Presence',
        callerId: 'Caller ID',
        musicOnHold: 'Music On Hold'
    },

    CallerId: {
        caption: 'Caller ID'
    },

    GreetCaller: {
        caption: 'Greet the Caller',
        description: 'First thing that callers will hear after system picks up incoming call.',
        custom: 'Custom',
        off: 'Off',
        default: 'Default',
        setDefault: 'Set Default',
        setCustom: 'Set Custom',
        listenGreeting: 'Listen Greeting',
        defaultHint: 'Thank you for calling Vlad Vendrow',
        overPhone: 'Record Over the Phone',
        overPhoneDescription: 'RingCentral will call you to record your custom greeting over the phone.',
        overMicrophone: 'Record Using Device Microphone',
        import: 'Import',
        callMe: 'Call me',
        inputPlaceholder: 'Enter a new number',
        callMeNow: 'Call Me Now'
    },

    UnderConstruction: {
        caption: 'Under Construction',
        placeholder: 'This page is under construction'
    },

    UserSettings: {
        caption: 'User Settings'
    },

    AddRule: {
        caption: 'Add Custom Rule',
        placeholder: 'This page is a placeholder for add custom rule wizard.',
        hint: 'To finish the wizard — tap “Save” at the top.'
    },

    RingPhones: {
        caption: 'Ring My Phones',
        split: 'Split Group',
        join: 'Ring as Group',
        ringExistingPhoneNumbers: 'Ring my existing phone numbers',
        forward: 'Forward to other user\'s phones'
    },

    Dev: {
        caption: 'Dev options'
    },

    PhoneGroup: {
        rings: 'rings',
        off: 'off'
    },

    PhoneGroupSettings: {
        caption: 'Phone Group',
        groupWillRing: 'Group will ring:',
        status: 'Status',
        ringsIncorrect: 'Rings count is incorrect',
        removeFromGroup: 'Remove from group'
    },

    AfterHoursWizard: {
        caption: 'After Hours Rule',
        stepWorkHours: 'Work Hours',
        stepAction: 'Action',
        stepSummary: 'Summary'
    },

    Dialer: {
        caption: 'Dialer',
        incomingCall: 'Incoming call...',
        outgoingCall: 'Outgoing call...',
        call: 'Call',
        phoneNumber: 'Phone Number',
        callTo: 'Call to',
        phoneNumberPlaceholder: 'Enter Phone Number',
        hangup: 'Hang up',
        pickup: 'Pick Up',
        refuse: 'Refuse',
        caller: 'Caller',
        register: 'Register',
        login: 'Login',
        logout: 'Logout',
        notLoggedIn: 'You are not logged in'
    },

    Login: {
        caption: 'Login',
        header: 'Enter your phone number and password',
        login: 'Phone number',
        loginPlaceholder: 'Enter phone number',
        password: 'Password',
        passwordPlaceholder: 'Enter password',
        submit: 'Login',
        environment: 'Select Environment'
    }
};