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
    },

    setData: function( data ){
        this.data = data;
    },

    getData: function(){
        return this.data;
    }
});