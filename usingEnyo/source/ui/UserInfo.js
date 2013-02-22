/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    kind: enyo.Scroller,
    touch: true,
    name: 'rc.UserInfo',
    classes: 'ui-user-info',

    components: [
        {kind: 'rc.NavButton', caption: 'Numbers', description: '(650) 472-4080\n(800) 513-1320' },
    ]
});