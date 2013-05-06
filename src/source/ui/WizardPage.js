/**
 * @author Marenin Alexander
 * April 2013
 */

enyo.kind({
    name: 'rc.WizardPage',
    kind: 'rc.Page',
    classes: 'ui-wizard-page',
    backButtonType: rc.NavToolbar.BACK,
    nextButtonType: rc.NavToolbar.NEXT,
    showNext: true,

    handlers: {
        onOpen: 'pageOpen'
    },

    published: {
        currentStep: false,
        startStep: false
    },

    /** @type rc.Model */
    state: null,

    components: [
        {
            name: 'tabs',
            kind: 'Group',
            layoutKind: 'rc.ColumnsLayout',
            defaultKind: 'rc.WizardPageTab',
            highlander: true,
            classes: 'ui-wizard-page-tabs',
            onActivate: 'tabActivated',
            fit: false
        },
        {
            name: 'steps',
            kind: 'Panels',
            style: 'min-height: 200px;',
            fit: true,
            draggable: false,
            animate: false
        }
    ],

    create: function(){
        this.inherited( arguments );
        this.state = new rc.Model();
        this.renderSteps();
        this.currentStepChanged();
    },

    renderSteps: function(){
        this.$.tabs.destroyComponents();
        this.$.steps.destroyComponents();
        this.steps.forEach( function( step ){
            this.$.tabs.createComponent({
                caption: step.caption,
                name: this.getTabName( step.name ),
                stepName: step.name
            });
            this.$.steps.createComponent({
                kind: 'rc.WizardPageStep',
                name: step.name,
                components: step.components,
                _wizardState: this.state
            });
        }, this );
    },

    pageOpen: function(){
        var startStep = this.getStartStep() ? this.getStartStep() : this.getOrder()[0];
        this.log( startStep );
        this.setCurrentStep( startStep );
    },

    currentStepChanged: function(){
        var step = this.getCurrentStep(),
            i = this.steps.indexOf( step ),
            tabName = this.getTabName( step.name );

        //if ( this.$.tabs.getActive() !== this.$[tabName] )
        //    this.$.tabs.setActive( this.$[tabName] );
        this.$.steps.setIndex( i );
        this.render();
    },

    tabActivated: function( sender, event ){
        var tab = event.originator;
        if ( tab.getActive() )
            this.setCurrentStep( this.getByName(tab.stepName) );
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
    },

    getByName: function( name ){
        for ( var i = 0; i < this.steps.length; i++ )
            if ( this.steps[i].name === name )
                return this.steps[i];
        return false;
    },

    getStartStep: function(){
        return this.getByName( 'start' );
    },

    getTabName: function( stepName ){
        return 'tab' + stepName;
    }
});


enyo.kind({
    name: 'rc.WizardPageTab',
    kind: 'Button',
    classes: 'ui-wizard-page-tab',

    published: {
        caption: '',
        icon: 1
    },

    statics: {
        ICON_NONE: 0,
        ICON_ACTIVE: 1,
        ICON_SKIPPED: 2
    },

    components: [
        {name: 'icon', classes: 'ui-wizard-page-tab-icon'},
        {name: 'caption', classes: 'ui-wizard-page-tab-caption'}
    ],

    create: function(){
        this.inherited( arguments );
        this.captionChanged();
        this.iconChanged();
    },

    captionChanged: function(){
        this.$.caption.setContent( this.getCaption() );
    },

    iconChanged: function(){
        var t = rc.WizardPageTab;
        switch ( this.getIcon() ){
            case t.ICON_NONE:
                this.$.icon.hide();
                break;
            case t.ICON_ACTIVE:
                this.$.icon.show();
                this.$.icon.removeClass( 'skipped' );
                break;
            case t.ICON_SKIPPED:
                this.$.icon.show();
                this.$.icon.addClass( 'skipped' );
                break;
        }
    }
});


enyo.kind({
    name: 'rc.WizardPageStep',
    kind: 'rc.Control',

    /**
     * @returns {rc.Model}
     */
    getState: function(){
        return this._wizardState;
    }
});