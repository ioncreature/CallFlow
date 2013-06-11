/**
 * @author Marenin Alexander
 * May 2013
 */

enyo.kind({
    name: 'rc.service.User',
    kind: 'rc.Observable',

    constructor: function(){
        this.inherited( arguments );
        App.service( 'auth' ).on( 'auth', this.setData, this );
        App.on( 'logout', this.release, this )
    },

    release: function(){
        delete this.data;
    },

    setData: function( data ){
        this.data = data;
    },

    getData: function(){
        return this.data;
    }
});