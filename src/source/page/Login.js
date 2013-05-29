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
        {classes: 'ui-login-block', components: [
            {classes: 'ui-label', content: loc.Login.login},
            {kind: 'onyx.InputDecorator', fit: true, classes: 'ui-text-input', components: [
                {name: 'login', kind: 'onyx.Input', value: '18664100005', placeholder: loc.Login.loginPlaceholder}
            ]},
            {classes: 'ui-label', content: loc.Login.password},
            {kind: 'onyx.InputDecorator', fit: true, classes: 'ui-text-input', components: [
                {name: 'password', kind: 'onyx.Input', type: 'password', value: '123123123', placeholder: loc.Login.passwordPlaceholder}
            ]},
            {classes: 'ui-center', components: [
                {name: 'submit', classes: 'ui-login-submit', kind:'rc.Button', content: loc.Login.submit, ontap: 'submitTap'}
            ]}
        ]}
    ],

    handlers: {
        onOpen: 'loginPageOpen'
    },

    create: function(){
        this.inherited( arguments );
    },

    loginPageOpen: function(){},

    submitTap: function(){
        var login = this.$.login.getValue(),
            password = this.$.password.getValue(),
            auth = App.service( 'auth' ),
            button = this.$.submit;

        button.setDisabled( true );
        auth.authByLoginPassword( login, password, function( result ){
            if ( result.success ){
                console.log( result );
                auth.login();
            }
            else
                alert( result.errorMessage );
            button.setDisabled( false );
        });
    }
});