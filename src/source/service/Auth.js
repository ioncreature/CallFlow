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
        var auth = this,
            sid = auth.getSid();

        if ( logged )
            callback( true );
        else if ( !sid )
            callback( false );
        else
            callback( false );
            // TODO: uncomment it when it will be ready
            // auth.authBySessionId( sid, callback );
    },

    authBySessionId: function( sid, callback ){
        var server = App.service( 'server' );

        server.query( 'authBySid', sid, function( answer ){
            if ( answer )
                logged = true;
            callback( !!logged );
        });
    },

    authByLoginPassword: function( login, password, callback ){
        var server = App.service( 'server' ),
            auth = this,
            query = {
                login: login,
                password: password
            };

        server.query( 'authByLoginPassword', query, function( res ){
            var success = res.success !== false,
                sid = res.sid;

            if ( success ){
                logged = true;
                auth.setSid( sid );
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

    setSid: function( sid ){
        App.set( 'auth.sid', sid );
    },

    getSid: function(){
        return App.get( 'auth.sid' );
    },

    login: function(){
        if ( logged && this.getSid() )
            this.app.login();
    },

    logout: function(){
        logged = false;
        this.setSid( '' );
    }
});

})();