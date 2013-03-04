/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    kind: enyo.Scroller,
    touch: true,
    horizontal: 'hidden',
    name: 'rc.UserInfoPanel',
    classes: 'ui-user-info-panel',
    layoutKind: 'FittableRowsLayout',

    components: [
        {kind: 'rc.UserInfo', avatarUrl: loc.img.avatar, data: {
            name: 'Vlad Vendrow,',
            extension: 'ext. 101',
            company: 'RingCentral, Inc.',
            post: 'CTO',
            email: 'vladv@ringcentral.com'
        }},
        {kind: 'rc.NavButton', caption: loc.UserInfoPanel.numbers, description: ['(650) 472-4080', '(800) 513-1320'] },
        {kind: 'rc.NavButton', caption: loc.UserInfoPanel.phonesAndPresence},
        {kind: 'rc.NavButton', caption: loc.UserInfoPanel.callerId, description: 'Vlad Vendrow'},
        {kind: 'rc.NavButton', caption: loc.UserInfoPanel.musicOnHold}
    ]
});