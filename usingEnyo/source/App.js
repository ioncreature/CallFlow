/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    name: 'App',
    kind: 'FittableRows',
    classes: 'enyo-fit',

    components: [
        {name: 'panels', kind: 'Panels', fit: true, draggable: false, arrangerKind: 'LeftRightArranger', margin: 0, components: [
            {kind: 'rc.page.UserSettings', name: 'UserSettings'},
            {kind: 'rc.page.CallerId', name: 'CallerId'},
            {kind: 'rc.page.GreetCaller', name: 'GreetCaller'},
            {kind: 'rc.page.UnderConstruction', name: 'UnderConstruction'}
        ]}
    ],

    create: function(){
        this.inherited( arguments );
        App.on( 'onBack', this.onBack, this );
        App.on( 'goToNowhere', this.goToNowhere, this );
        App.on( 'goTo', this.goToNowhere, this );
    },

    onBack: function(){
        this.log( 'I\'m going back' );
        var panels = this.$.panels,
            index = panels.getIndex();
        index && panels.setIndex( index - 1 );
    },

    goToNowhere: function(){
        var panel = this.$.panels;
//        panels.setAc
    },

    goTo: function(){

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
            var index = listeners[eventName].length - 1;

            return {
                remove: function(){
                    delete listeners[eventName][index];
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
        },

        toNowhere: function(){
            this.notify( 'goToNowhere' );
        },

        goTo: function( pageName ){
            this.notify( 'goTo', pageName );
        }
    }
});
