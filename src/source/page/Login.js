/**
 * @author Marenin Alexander
 * May 2013
 */

enyo.kind({
    name: 'rc.page.Login',
    kind: 'rc.Page',
    caption: loc.Login.caption,
    showBack: false,
    showNext: false,

    components: [
        {classes: 'ui-login-header', content: loc.Login.header},
        {classes: 'ui-login-block', components: [
            {classes: 'ui-label', content: loc.Login.login},
            {kind: 'onyx.InputDecorator', fit: true, classes: 'ui-text-input', components: [
                {name: 'login', kind: 'onyx.Input', placeholder: loc.Login.loginPlaceholder}
            ]},
            {classes: 'ui-label', content: loc.Login.password}

        ]}
    ],

    handlers: {
        onOpen: 'loginPageOpen'
    },

    create: function(){
        this.inherited( arguments );
    },

    loginPageOpen: function(){
        var logged = this.checkLogin();
    },

    checkLogin: function(){
        return !!App.get( 'logged' );
    }
});