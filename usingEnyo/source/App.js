/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    name: 'App',
//    kind: 'FittableRows',
    classes: 'enyo-fit ui-app',
    kind: 'Panels',
    arrangerKind: 'CollapsingArranger',

    components: [
        {name: 'menuContainer', classes: 'ui-app-menu', layoutKind: 'FittableRowsLayout', components: [
            {name: 'menu', kind: 'List', touch: true, components: [
                {name: "item", style: "padding: 10px;", classes: "enyo-border-box", ontap: "itemTap"},
//                {content: "Dialer"},
//                {content: "Activity Log"},
//                {content: "Contacts"},
//                {content: "Favorites"},
//                {content: "Messages"},
//                {content: "Conference"},
//                {content: "Account Settings"},
//                {content: "User Info"},
//                {content: "Call Flow"},
//                {content: "Fax"},
//                {content: "Application Settings"},
//                {content: "General"},
//                {content: "Audio"},
            ]},
        ]},
        {name: 'pages', style: 'background-color: white;', kind: 'Panels', fit: true, draggable: false, components: [
            {kind: 'rc.page.UserSettings', name: 'UserSettings'},
            {kind: 'rc.page.CallerId', name: 'CallerId'},
            {kind: 'rc.page.GreetCaller', name: 'GreetCaller'},
            {kind: 'rc.page.UnderConstruction', name: 'UnderConstruction'},
            {kind: 'rc.page.AddRule', name: 'AddRule'},
            {kind: 'rc.page.RingPhones', name: 'RingPhones'}
        ]}
    ],

    create: function(){
        this.inherited( arguments );
        App.on( 'goBack', this.goBack, this );
        App.on( 'goToNowhere', this.goToNowhere, this );
        App.on( 'goTo', this.goTo, this );

        var i = 0;
        this.pageStack = [i];
        this.$.pages.children[i].doOpen();
    },

    goBack: function(){
        var pages = this.$.pages,
            i;
        if ( this.pageStack.length > 1 ){
            this.pageStack.pop();
            i = this.pageStack[this.pageStack.length - 1];
            pages.setIndex( i );
            pages.children[i].doOpen();
        }
    },

    goToNowhere: function(){
        this.goTo({ pageName: 'UnderConstruction' });
    },

    /**
     * @param {Object} options
     * @param {string} options.pageName
     * @param {?} options.data
     */
    goTo: function( options ){
        var pages = this.$.pages,
            pageName = options.pageName,
            data = options.data;

        pages.children.some( function( child, i ){
            if ( child.name === pageName ){
                pages.setIndex( i );
                child.setPageData && child.setPageData( data );
                pages.children[i].doOpen();
                this.pageStack.push( i );
                return true;
            }
        }, this );
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

        trigger: function( eventName, data ){
            this.listeners[eventName] && this.listeners[eventName].forEach( function( cb ){
                cb( data );
            });
        },

        /**
         * Helpers methods
         */
        back: function(){
            this.trigger( 'goBack' );
        },

        goToNowhere: function(){
            this.trigger( 'goToNowhere' );
        },

        goTo: function( pageName, data ){
            this.trigger( 'goTo', {pageName: pageName, data: data} );
        }
    }
});
