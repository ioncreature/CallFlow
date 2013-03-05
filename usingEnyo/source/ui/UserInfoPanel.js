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
        {kind: 'rc.UserInfo', ontap: 'goToNowhere', avatarUrl: loc.img.avatar, data: {
            name: 'Vlad Vendrow,',
            extension: 'ext. 101',
            company: 'RingCentral, Inc.',
            post: 'CTO',
            email: 'vladv@ringcentral.com'
        }},
        {kind: 'rc.NavButton', ontap: 'goToNowhere', caption: loc.UserInfoPanel.numbers, description: ['(650) 472-4080', '(800) 513-1320'] },
        {kind: 'rc.NavButton', ontap: 'goToNowhere', caption: loc.UserInfoPanel.phonesAndPresence},
        {kind: 'rc.NavButton', ontap: 'goToCallerId', caption: loc.UserInfoPanel.callerId, description: 'Vlad Vendrow'},
        {kind: 'rc.NavButton', ontap: 'goToNowhere', caption: loc.UserInfoPanel.musicOnHold}
    ],

    goToNowhere: function(){
        App.goToNowhere();
    },

    goToCallerId: function(){
        App.goTo( 'CallerId' );
    }
});