/**
 * @author Marenin Alexander
 * April 2013
 */

enyo.kind({
    kind: 'rc.Collection',
    name: 'rc.data.PhoneCollection',

    model: rc.data.PhoneModel,
    idField: 'id',

    defaults: {
        disabled: false,
        rings: 5
    },

    create: function(){
        this.inherited( arguments );
        this.updateDisabled();
        this.on( 'add', this.updateDisabled, this );
        this.on( 'remove', this.updateDisabled, this );
    },

    updateDisabled: function(){
        this.set( 'disabled', this.every( function( model ){
            return !model.get( 'enabled' );
        }));
    }
});