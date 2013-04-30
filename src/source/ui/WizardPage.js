/**
 * @author Marenin Alexander
 * April 2013
 */

enyo.kind({
    name: 'rc.WizardPage',
    kind: 'rc.Page',
    backButtonType: rc.NavToolbar.BACK,
    nextButtonType: rc.NavToolbar.NEXT,
    showNext: true,

    handlers: {
        onPageOpen: 'pageOpen'
    },

    published: {
        currentStep: false,
        startStep: false
    },

    steps: [
        {
            name: 'start',
            caption: 'Start',
            next: 'end',
            components: [],
            onEnter: function(){},
            onLeave: function(){}
        },
        {
            name: 'end',
            caption: 'End',
            next: false,
            components: [],
            onEnter: function(){},
            onLeave: function(){}
        }
    ],

    kindComponents: [
        {name: 'tabs', content: 'bdsh'},
        {name: 'client', kind: 'Panels', draggable: false}
    ],

    create: function(){
        this.inherited( arguments );
        console.warn( this.$ );
    },

//    initComponents: function(){
//        this.createChrome( this.kindComponents );
//        this.inherited( arguments );
//    },


    pageOpen: function(){
        var startStep = this.getStartStep() ? this.getStartStep() : this.getOrder()[0];
        this.setCurrentStep( startStep );
    },

    getNextStep: function(){
        return this._getStep( 'next' );
    },

    getPreviousStep: function(){
        return this._getStep( 'previous' );
    },

    getOrder: function(){
        return Object.keys( this.steps );
    },

    _getStep: function( type ){
        var current = this.getCurrentStep(),
            order = this.getOrder(),
            currentIndex = order.indexOf( current );

        if ( type === 'previous' )
            return currentIndex + 1 < order.length ? currentIndex + 1 : -1;
        else
            return currentIndex - 1 >= 0 ? currentIndex - 1 : -1;
    }
});