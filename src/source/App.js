/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    name: 'App',
    classes: 'enyo-fit ui-app',
    kind: 'Panels',
    arrangerKind: 'CollapsingArranger',
    defaultPage: 'Login',
    canRedirect: false,

    components: [
        {name: 'menu', kind: 'Scroller', thumb: false, touch: true, classes: 'ui-main-menu', ontap: 'menuTapped', components: [
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
            {page: 'Dev', ontap: 'menuItemTap', kind: 'rc.MainMenuItem', icon: 'ui-main-menu-dev', caption: loc.App.dev},
            {ontap: 'logout', kind: 'rc.MainMenuItem', icon: 'ui-main-menu-dev', caption: loc.App.logout}
        ]},
        {name: 'pages', classes: 'ui-app-pages', kind: 'Panels', draggable: false, components: [
            {kind: 'rc.page.Login', name: 'Login'},
            {kind: 'rc.page.Dialer', name: 'Dialer'},
            {kind: 'rc.page.CallFlow', name: 'CallFlow'},
            {kind: 'rc.page.UserInfo', name: 'UserInfo'},
            {kind: 'rc.page.Fax', name: 'Fax'},
            {kind: 'rc.page.CallerId', name: 'CallerId'},
            {kind: 'rc.page.GreetCaller', name: 'GreetCaller'},
            {kind: 'rc.page.UnderConstruction', name: 'UnderConstruction'},
            {kind: 'rc.page.AddRule', name: 'AddRule'},
            {kind: 'rc.page.AfterHoursWizard', name: 'AfterHoursWizard'},
            {kind: 'rc.page.RingPhones', name: 'RingPhones'},
            {kind: 'rc.page.PhoneGroupSettings', name: 'PhoneGroupSettings'},
            {kind: 'rc.page.Dev', name: 'Dev'}
        ]}
    ],

    services: {
        server: { kind: 'rc.service.Server', configName: 'websocket' },
        auth: { kind: 'rc.service.Auth', configName: 'auth' },
        user: { kind: 'rc.service.User' }
    },

    constructor: function( config ){
        this.initConfig( config );
        this.inherited( arguments );
    },

    create: function(){
        this.pageStack = [];
        this.inherited( arguments );
        this.initServices();
        this.initAuth();

        App.on( 'goBack', this.goBack, this );
        App.on( 'goTo', this.goTo, this );
        App.on( 'goTo', this.activateMenuItem, this );
        App.on( 'goToMenu', this.showMenu, this );
        App.on( 'toggleMenu', this.toggleMenu, this );

        App.trigger( 'appReady' );
    },

    initConfig: function( config ){
        try {
            var appConfig = JSON.parse( localStorage.getItem('_appConfig') );
            if ( typeof appConfig == 'object' )
                enyo.mixin( App.config, appConfig )
        }
        catch ( e ){
            console.warn( 'Failed to load config from localStorage' );
        }

        enyo.mixin( App.config, config );
    },

    initServices: function(){
        Object.keys( this.services ).forEach( function( name ){
            var serviceInfo = this.services[name],
                config = serviceInfo.configName && App.get( serviceInfo.configName ),
                ctor = enyo.getObject( serviceInfo.kind );
            App.service( name, new ctor(config, this) );
        }, this );
    },

    initAuth: function(){
        var auth = App.service( 'auth' ),
            app = this;

        auth.isLoggedIn( function( res ){
            if ( res )
                app.login();
            else
                app.showLoginPage();
        });
    },

    login: function(){
        this.canRedirect = true;
        App.goTo( App.get('indexPage') || this.defaultPage );
        this.showMenu();
        this.setDraggable( true );
    },

    logout: function(){
        App.service( 'auth' ).logout();
        this.showLoginPage();
    },

    showLoginPage: function(){
        App.goTo( 'Login' );
        this.canRedirect = true;
        this.setDraggable( false );
        this.hideMenu();
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

    toggleMenu: function(){
        if ( this.getIndex() )
            this.showMenu();
        else
            this.hideMenu();
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

    goBack: function( data ){
        var pages = this.$.pages,
            page,
            pageData,
            i;

        if ( this.canRedirect && this.pageStack.length > 1 ){
            this.pageStack.pop();
            i = this.pageStack[this.pageStack.length - 1];
            pages.setIndex( i );

            page = pages.children[i];
            pageData = page.getPageData();
            page.setPageData( enyo.mixin(typeof pageData == 'object' ? pageData : {}, data) );
            page.doOpen();
            this.hideMenu();
        }
    },

    /**
     * @param {Object} options
     * @param {string} options.pageName
     * @param {?} options.data
     */
    goTo: function( options ){
        if ( !this.canRedirect )
            return;

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
                page.setPageData( data );
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
            enyo.setObject( key, value, this.config );
            localStorage && localStorage.setItem( '_appConfig', JSON.stringify(this.config) );
        },

        get: function( key ){
            var parts = key.split( '.' ),
                obj = this.config,
                i;
            for ( i = 0; i < parts.length - 1; i++ )
                obj = obj[parts[i]];
            return obj[parts[parts.length - 1]];
        },

        /**
         * Navigation methods
         */

        goTo: function( pageName, data ){
            this.trigger( 'goTo', {pageName: pageName, data: data} );
        },

        back: function( data ){
            this.trigger( 'goBack', data );
        },

        goToNowhere: function(){
            App.goTo( 'UnderConstruction' );
        },

        goToMenu: function(){
            this.trigger( 'goToMenu' );
        },

        toggleMenu: function(){
            this.trigger( 'toggleMenu' );
        },

        /**
         * Services control interface
         */

        services: {},

        /**
         * @param {string} name
         * @param {*?} service - setter interface
         */
        service: function( name, service ){
            if ( arguments.length == 2 )
                this.services[name] = service;
            return this.services[name];
        }
    }
});
