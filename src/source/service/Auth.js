/**
 * @author Marenin Alexander
 * May 2013
 */

(function(){

var logged = false;

enyo.kind({
    name: 'rc.service.Auth',
    kind: 'rc.Observable',

    constructor: function( config, app ){
        this.user = null;
        this.app = app;
        this.config = config;
        this.inherited( arguments );
    },

    isLoggedIn: function( callback ){
        if ( logged )
            callback( true );
        else
            callback( false );
    },

    authBySessionId: function( sid, callback ){
        var server = App.service( 'server' );

        server.query( 'authBySid', sid, function( answer ){
            if ( answer )
                logged = true;
            callback( !!logged );
        });
    },

    authByLoginPassword: function( login, password, envName, callback ){
        var server = App.service( 'server' ),
            auth = this,
            query = {
                login: login,
                password: password,
                envName: envName
            };

        server.query( 'authByLoginPassword', query, function( res ){
            var success = res.success !== false;

            if ( success ){
                logged = true;
                auth.trigger( 'auth', res.user );
                callback({
                    success: true,
                    user: res.user
                });
            }
            else
                callback({
                    status: false,
                    errorMessage: res.errorMessage
                });
        });
    },

    login: function(){
        if ( logged  )
            this.app.login();
    },

    logout: function(){
        logged = false;
    }
});

})();