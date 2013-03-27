/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    name: 'App',
    classes: 'enyo-fit ui-app',
    kind: 'Panels',
    arrangerKind: 'CollapsingArranger',

    components: [
        {name: 'menuContainer', kind: 'Scroller', thumb: false, classes: 'ui-main-menu', components: [
            {classes: 'ui-main-menu-header ui-main-menu-logo'},
            {kind: 'rc.MainMenuItem', icon: 'ui-main-menu-dialer', caption: loc.App.dialer},
            {kind: 'rc.MainMenuItem', icon: 'ui-main-menu-activity-log', caption: loc.App.activityLog, value: 24},
            {kind: 'rc.MainMenuItem', icon: 'ui-main-menu-contacts', caption: loc.App.contacts},
            {kind: 'rc.MainMenuItem', icon: 'ui-main-menu-favorites', caption: loc.App.favorites},
            {kind: 'rc.MainMenuItem', icon: 'ui-main-menu-messages', caption: loc.App.messages, value: 2},
            {kind: 'rc.MainMenuItem', icon: 'ui-main-menu-conference', caption: loc.App.conference},
            {classes: 'ui-main-menu-header', content: loc.App.accountSettings},
            {kind: 'rc.MainMenuItem', icon: 'ui-main-menu-user-info', caption: loc.App.userInfo},
            {kind: 'rc.MainMenuItem', icon: 'ui-main-menu-call-flow active', caption: loc.App.callFlow},
            {kind: 'rc.MainMenuItem', icon: 'ui-main-menu-fax', caption: loc.App.fax},
            {classes: 'ui-main-menu-header', content: loc.App.applicationSettings},
            {kind: 'rc.MainMenuItem', icon: 'ui-main-menu-general', caption: loc.App.general},
            {kind: 'rc.MainMenuItem', icon: 'ui-main-menu-audio', caption: loc.App.audio}
        ]},
        {name: 'pages', classes: 'ui-app-pages', kind: 'Panels', fit: false, draggable: false, components: [
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
