/**
 * @author Marenin Alexander
 * April 2013
 */

enyo.kind({
    name: 'rc.PhoneItem',
    classes: 'ui-phone-item',

    published: {
        model: null,
        name: '',
        number: ''
    },

    components: [
        {name: 'name', classes: 'ui-phone-item-name'},
        {name: 'number', classes: 'ui-phone-item-number'}
    ],

    create: function(){
        this.inherited( arguments );
        this.nameChanged();
        this.numberChanged();
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
            this.addBinding( model.on('name', this.setName, this) );
            this.addBinding( model.on('number', this.setNumber, this) );
        }
    },

    nameChanged: function(){
        this.$.name.setContent( this.getName() );
    },

    numberChanged: function(){
        this.$.number.setContent( this.getNumber() );
    },

    addBinding: function( handler ){
        if ( this.bindings )
            this.bindings.push( handler );
        else
            this.bindings = [handler];
    },

    removeBindings: function(){
        if ( this.bindings )
            while ( this.bindings.length )
                this.bindings.pop().remove();
    }
});