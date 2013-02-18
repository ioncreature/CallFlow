/**
 * @author Marenin Alex
 * February 2013
 */

enyo.kind({
    kind: enyo.Scroller,
    name: 'rc.CallerId',
    layoutKind: enyo.FittableRowsLayout,
    horizontal: 'hidden',

    components: [
        {classes: 'ui-message', content: 'Please select caller ID that will be used when calls are made from the following devices or features'},

        {classes: 'ui-header-big', content: 'By Phone'},
        {classes: 'ui-label', content: 'Polycom IP 335 HD IP phone'},
        {kind: 'rc.NavButton', caption: 'Main Number', value: '(650) 472-4080'},
        {classes: 'ui-label', content: 'RingMe (Outgoing to Caller)'},
        {kind: 'rc.NavButton', caption: 'Main Number', value: '(650) 472-4080'},

        {classes: 'ui-header-big', content: 'By Feature'},
        {classes: 'ui-label', content: 'RingOut from Web'},
        {kind: 'rc.NavButton', caption: 'Main Number', value: '(650) 472-4080'},
        {classes: 'ui-label', content: 'RingMe (Outgoing to Caller)'},
        {kind: 'rc.NavButton', caption: 'Main Number', value: '(650) 472-4080'},
        {classes: 'ui-label', content: 'Call Flip'},
        {kind: 'rc.NavButton', caption: 'Main Number', value: '(650) 472-4080'},
        {classes: 'ui-label', content: 'Call Flip'},
        {kind: 'rc.NavButton', caption: 'Main Number', value: '(650) 472-4080'},


        {classes: 'ui-header-big', content: 'By Internal Calls'}
    ]
});

