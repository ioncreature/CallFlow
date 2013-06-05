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

    envCredits: {
        spbDev: {
            login: '18664100005',
            pass: '123123123'
        },
        sv7: {
            login: '18664100008',
            pass: '123123123'
        },
        production: {
            login: '18668775477',
            pass: '123123123'
        }
    },

    components: [
        {classes: 'ui-login-block', components: [
            {classes: 'ui-label', content: loc.Login.login},
            {kind: 'onyx.InputDecorator', fit: true, classes: 'ui-text-input', components: [
                {name: 'login', kind: 'onyx.Input', placeholder: loc.Login.loginPlaceholder}
            ]},

            {classes: 'ui-label', content: loc.Login.password},
            {kind: 'onyx.InputDecorator', fit: true, classes: 'ui-text-input', components: [
                {name: 'password', kind: 'onyx.Input', type: 'password', placeholder: loc.Login.passwordPlaceholder}
            ]},

            {classes: 'ui-label', content: loc.Login.environment},
            {classes: 'ui-login-picker', kind: 'onyx.PickerDecorator', components: [
                {},
                {name: 'env', classes: 'ui-login-picker-picker', kind: 'onyx.Picker', onSelect: 'envSelected', components: [
                    {content: 'spbDev', value: 'spbDev', active: true},
                    {content: 'sv7', value: 'sv7'},
                    {content: 'production', value: 'production'}
                ]}
            ]},

            {classes: 'ui-center', components: [
                {name: 'submit', classes: 'ui-login-submit', kind:'rc.Button', content: loc.Login.submit, ontap: 'submitTap'}
            ]}
        ]}
    ],

    published: {
        environment: 'spbDev'
    },

    handlers: {
        onOpen: 'loginPageOpen'
    },

    create: function(){
        this.inherited( arguments );
        this.environmentChanged();
    },

    loginPageOpen: function(){},

    submitTap: function(){
        var login = String( this.$.login.getValue() ).replace( /[^0-9]/g, '' ),
            password = this.$.password.getValue(),
            auth = App.service( 'auth' ),
            button = this.$.submit,
            envName = this.$.env.getSelected().getContent();

        button.setDisabled( true );
        auth.authByLoginPassword( login, password, envName, function( result ){
            if ( result.success ){
                console.log( result );
                auth.login();
            }
            else
                alert( result.errorMessage );
            button.setDisabled( false );
        });
    },

    environmentChanged: function(){
        var envName = this.getEnvironment();
        this.$.login.setValue( this.envCredits[envName].login );
        this.$.password.setValue( this.envCredits[envName].pass );
    },

    envSelected: function( sender, event ){
        this.setEnvironment( event.selected.getContent() );
    }
});