/**
 * @author Marenin Alexander
 * May 2013
 */

enyo.kind({
    name: 'rc.service.Auth',
    kind: 'rc.Observable',

    constructor: function( config, app ){
        this.user = null;
        this.app = app;
        this.setConfig( config );
        this.inherited( arguments );
    },

    authBySessionId: function( sid, callback ){
        var server = App.service( 'server' ),
            app = this.app;

        server.query( 'authBySid', sid, function( answer ){
            if ( answer )
                app.login();
            callback( !!answer );
        });
    },

    authByLoginPassword: function( login, password, callback ){
        var server = App.service( 'server' ),
            query = {
                login: login,
                password: password
            },
            app = this.app;

        server.query( 'authByLoginPassword', query, function( answer ){
            if ( answer )
                app.login();
            callback( !!answer );
        });
    },

    getUser: function(){
        return this.user;
    }
});