/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    name: 'App',
    kind: 'FittableRows',
    classes: 'enyo-fit',
    draggable: false,

    components: [
        {name: 'panels', kind: 'Panels', fit: true, arrangerKind: 'LeftRightArranger', margin: 0, components: [
            {kind: 'rc.page.UserSettings'},
            {kind: 'rc.page.CallerId'},
            {kind: 'rc.page.GreetCaller'},
            {kind: 'rc.page.UnderConstruction'}
        ]}
    ],

    create: function(){
        this.inherited( arguments );
        App.on( 'onBack', this.onBack, this );
    },

    onBack: function(){
        this.log( 'I\'m going back' );
        var panels = this.$.panels,
            index = panels.getIndex();
        index && panels.setIndex( index - 1 );
    },

    statics: {
        /**
         * Event bus interface
         */
        listeners: {},
        on: function( eventName, callback, context ){
            var listeners = this.listeners;
            if ( this.listeners[eventName] )
                this.listeners[eventName].push( callback.bind(context) );
            else
                this.listeners[eventName] = [ callback.bind(context) ];
            var index = this.listeners[eventName].length - 1;

            return {
                remove: function(){
                    delete listeners[index];
                }
            }
        },

        notify: function( eventName, data ){
            this.listeners[eventName] && this.listeners[eventName].forEach( function( cb ){
                cb( data );
            });
        },

        /**
         * Helpers methods
         */
        back: function(){
            this.notify( 'onBack' );
        }
    }
});
