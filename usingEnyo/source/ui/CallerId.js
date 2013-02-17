/**
 * @author Marenin Alex
 * February 2013
 */

enyo.kind({
    kind: enyo.Control,
    name: 'rc.CallerId',
    layoutKind: enyo.FittableRowsLayout,

    components: [
        {classes: 'ui-message', content: 'Please select caller ID that will be used when calls are made from the following devices or features'},
        {classes: 'ui-header-big', content: 'By Phone'},
        {classes: 'ui-header-big', content: 'By Feature'},
        {classes: 'ui-header-big', content: 'By Internal Calls'}
    ]
});