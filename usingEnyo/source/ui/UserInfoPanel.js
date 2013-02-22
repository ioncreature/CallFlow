/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    kind: enyo.Scroller,
    touch: true,
    name: 'rc.UserInfoPanel',
    classes: 'ui-user-info',

    components: [
        {kind: 'rc.NavButton', caption: 'Numbers', description: ['(650) 472-4080', '(800) 513-1320'] },
        {kind: 'rc.NavButton', caption: 'Phones & Numbers'},
        {kind: 'rc.NavButton', caption: 'Caller ID', description: 'Vlad Vendrow'},
        {kind: 'rc.NavButton', caption: 'Music On Hold'}
    ]
});