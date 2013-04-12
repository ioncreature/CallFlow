/**
 * @author Marenin Alexander
 * April 2013
 */

enyo.kind({
    name: 'rc.PhoneItem',
    kind: 'rc.Control',
    classes: 'ui-phone-item',

    published: {
        model: null,
        name: '',
        number: '',
        enabled: true
    },

    components: [
        {name: 'name', classes: 'ui-phone-item-name'},
        {name: 'number', classes: 'ui-phone-item-number'}
    ],

    create: function(){
        this.inherited( arguments );
        this.nameChanged();
        this.numberChanged();
        this.enabledChanged();
        this.modelChanged();
    },

    destroy: function(){
        this.removeBindings();
        this.inherited( arguments );
    },

    modelChanged: function(){
        var model = this.getModel();
        if ( model ){
            this.removeBindings();
            this.setName( model.get('name') );
            this.setNumber( model.get('number') );
            this.setEnabled( model.get('enabled') );
            this.addBinding( model.on('name', this.setName, this) );
            this.addBinding( model.on('number', this.setNumber, this) );
            this.addBinding( model.on('enabled', this.setEnabled, this) );
        }
    },

    nameChanged: function(){
        this.$.name.setContent( this.getName() );
    },

    numberChanged: function(){
        this.$.number.setContent( this.getNumber() );
    },

    enabledChanged: function(){
        if ( this.getEnabled() )
            this.removeClass( 'disabled' );
        else
            this.addClass( 'disabled' );
    }
});