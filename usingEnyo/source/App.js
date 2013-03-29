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
        {name: 'menu', kind: 'Scroller', thumb: false, classes: 'ui-main-menu', ontap: 'menuTapped', components: [
            {classes: 'ui-main-menu-header ui-main-menu-logo'},
            {page: 'Dialer', ontap: 'menuItemTap', kind: 'rc.MainMenuItem', icon: 'ui-main-menu-dialer', caption: loc.App.dialer},
            {page: 'ActivityLog', ontap: 'menuItemTap', kind: 'rc.MainMenuItem', icon: 'ui-main-menu-activity-log', caption: loc.App.activityLog, value: 24},
            {page: 'Contacts', ontap: 'menuItemTap', kind: 'rc.MainMenuItem', icon: 'ui-main-menu-contacts', caption: loc.App.contacts},
            {page: 'Favorites', ontap: 'menuItemTap', kind: 'rc.MainMenuItem', icon: 'ui-main-menu-favorites', caption: loc.App.favorites},
            {page: 'Messages', ontap: 'menuItemTap', kind: 'rc.MainMenuItem', icon: 'ui-main-menu-messages', caption: loc.App.messages, value: 2},
            {page: 'Conference', ontap: 'menuItemTap', kind: 'rc.MainMenuItem', icon: 'ui-main-menu-conference', caption: loc.App.conference},
            {classes: 'ui-main-menu-header', content: loc.App.accountSettings},
            {page: 'UserInfo', ontap: 'menuItemTap', kind: 'rc.MainMenuItem', icon: 'ui-main-menu-user-info', caption: loc.App.userInfo},
            {page: 'CallFlow', ontap: 'menuItemTap', kind: 'rc.MainMenuItem', icon: 'ui-main-menu-call-flow', caption: loc.App.callFlow},
            {page: 'Fax', ontap: 'menuItemTap', kind: 'rc.MainMenuItem', icon: 'ui-main-menu-fax', caption: loc.App.fax},
            {classes: 'ui-main-menu-header', content: loc.App.applicationSettings},
            {page: 'General', ontap: 'menuItemTap', kind: 'rc.MainMenuItem', icon: 'ui-main-menu-general', caption: loc.App.general},
            {page: 'Audio', ontap: 'menuItemTap', kind: 'rc.MainMenuItem', icon: 'ui-main-menu-audio', caption: loc.App.audio},
            {page: 'Dev', ontap: 'menuItemTap', kind: 'rc.MainMenuItem', icon: 'ui-main-menu-dev', caption: loc.App.dev}
        ]},
        {name: 'pages', classes: 'ui-app-pages', kind: 'Panels', fit: false, draggable: false, components: [
            {kind: 'rc.page.CallFlow', name: 'CallFlow'},
            {kind: 'rc.page.UserInfo', name: 'UserInfo'},
            {kind: 'rc.page.Fax', name: 'Fax'},
            {kind: 'rc.page.CallerId', name: 'CallerId'},
            {kind: 'rc.page.GreetCaller', name: 'GreetCaller'},
            {kind: 'rc.page.UnderConstruction', name: 'UnderConstruction'},
            {kind: 'rc.page.AddRule', name: 'AddRule'},
            {kind: 'rc.page.RingPhones', name: 'RingPhones'},
            {kind: 'rc.page.Dev', name: 'Dev'}
        ]}
    ],

    create: function(){
        this.pageStack = [];
        this.inherited( arguments );

        App.on( 'goBack', this.goBack, this );
        App.on( 'goTo', this.goTo, this );
        App.on( 'goTo', this.activateMenuItem, this );
        App.on( 'goToMenu', this.showMenu, this );

        App.goTo( 'CallFlow' );
    },

    menuItemTap: function( inSender ){
        inSender.page && App.goTo( inSender.page );
    },

    hideMenu: function(){
        this.setIndex( 1 );
    },

    showMenu: function(){
        this.setIndex( 0 );
    },

    activateMenuItem: function( options ){
        var pageName = options.pageName;
        this.$.menu.getControls().forEach( function( item ){
            if ( item.page === pageName ){
                this.currentMenuItem && this.currentMenuItem.removeClass( 'active' );
                this.currentMenuItem = item;
                item.addClass( 'active' );
            }
        }, this );
    },

    goBack: function(){
        var pages = this.$.pages,
            i;
        if ( this.pageStack.length > 1 ){
            this.pageStack.pop();
            i = this.pageStack[this.pageStack.length - 1];
            pages.setIndex( i );
            pages.children[i].doOpen();
            this.hideMenu();
        }
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

        pages.children.some( function( page, i ){
            if ( page.name === pageName ){
                var isRootPage = this._isRootPage( pageName );

                if ( isRootPage )
                    this.pageStack = [];
                this.pageStack.push( i );

                pages.setIndex( i );
                page.setIsRoot( isRootPage );
                page.setPreview( App.get('scrollType') );
                page.setPreviewSize( App.get('scrollSize') );
                page.setPageData && page.setPageData( data );
                page.doOpen();
                this.hideMenu();
                return true;
            }
        }, this );
    },

    _isRootPage: function( pageName ){
        return this.$.menu.getControls().some( function( child ){
            return child.page === pageName;
        });
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
         * Config storage
         */

        config: {},

        set: function( key, value ){
            this.config[key] = value;
        },

        get: function( key ){
            return this.config[key];
        },

        /**
         * Navigation methods
         */

        goTo: function( pageName, data ){
            this.trigger( 'goTo', {pageName: pageName, data: data} );
        },

        back: function(){
            this.trigger( 'goBack' );
        },

        goToNowhere: function(){
            App.goTo( 'UnderConstruction' );
        },

        goToMenu: function(){
            this.trigger( 'goToMenu' );
        }
    }
});
