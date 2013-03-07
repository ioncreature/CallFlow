/**
 * @author Marenin Alex
 * February 2013
 */

enyo.kind({
    name: 'rc.page.CallerId',
    kind: 'rc.Page',
    caption: loc.CallerId.caption,

    components: [
        {kind: 'Scroller', fit: true, horizontal: 'hidden', vertical: 'scroll', components:[
            {classes: 'ui-message', style: 'margin-top: 20px;', content: 'Please select caller ID that will be used when calls are made from the following devices or features'},

            {classes: 'ui-header-big', content: 'By Phone'},
            {classes: 'ui-label', content: 'Polycom IP 335 HD IP phone'},
            {kind: 'rc.NavButton', caption: 'Main Number', description: '(650) 472-4080', ontap: 'goToNowhere'},
            {classes: 'ui-label', content: 'RingMe (Outgoing to Caller)'},
            {kind: 'rc.NavButton', caption: 'Main Number', description: '(650) 472-4080', ontap: 'goToNowhere'},

            {classes: 'ui-header-big', content: 'By Feature'},
            {classes: 'ui-label', content: 'RingOut from Web'},
            {kind: 'rc.NavButton', caption: 'Main Number', description: '(650) 472-4080', ontap: 'goToNowhere'},
            {classes: 'ui-label', content: 'RingMe (Outgoing to Caller)'},
            {kind: 'rc.NavButton', caption: 'Main Number', description: '(650) 472-4080', ontap: 'goToNowhere'},
            {classes: 'ui-label', content: 'Call Flip'},
            {kind: 'rc.NavButton', caption: 'Fax Number', description: '(650) 472-4080', ontap: 'goToNowhere'},
            {classes: 'ui-label', content: 'Call Flip'},
            {kind: 'rc.NavButton', caption: 'Main Number', description: '(650) 472-4080', ontap: 'goToNowhere'},

            {classes: 'ui-header-big', content: 'Internal Calls'},
            {kind: 'rc.VerticalGroup', name: 'internalCalls', components: [
                {kind: 'rc.ToggleButton', name: 'internalCallsToggle', caption: 'Use extension number for internal calls when possible'},
                {classes: 'ui-message', content:
                    'If selected, when dialing an internal ' +
                    'extension (rather than an external phone ' +
                    'number) the extension number will be used ' +
                    'as the callerid instead of the phone number. ' +
                    'This will only apply to calls received on ' +
                    'RingCentral phones and other IP devices. ' +
                    'Calls forwarded to external numbers such as ' +
                    'a mobile phone will still show the full phone number.'
                }
            ]}
        ]}
    ],

    goToNowhere: function(){
        App.goToNowhere();
    }
});

