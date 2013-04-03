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

    modelChanged: function(){
        var model = this.getModel();
        if ( model ){
            this.removeHandlers();
            this.addHandler( model.on('name', this.setName, this) );
            this.addHandler( model.on('number', this.setNumber, this) );
        }
    },

    nameChanged: function(){
        !this.getModel() && this.$.name.setContent( this.getName() );
    },

    numberChanged: function(){
        !this.getModel() && this.$.number.setContent( this.getNumber() );
    },

    addHandler: function( handler ){
        if ( this.handlers )
            this.handlers.push( handler );
        else
            this.handlers = [handler];
    },

    removeHandlers: function(){
        if ( this.handlers )
            while ( this.handlers.length )
                this.handlers.pop().remove();
    }
});