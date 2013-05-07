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

    statics: {
        ICON_NONE: 0,
        ICON_UNDONE: 1,
        ICON_DONE: 2,
        ICON_SKIPPED: 3,
        ICON_FAILED: 4
    },

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
        {kind: 'FittableRows', classes: 'enyo-fit', components: [
            {
                name: 'tabs',
                kind: 'Group',
                layoutKind: 'rc.ColumnsLayout',
                defaultKind: 'rc.WizardPageTab',
                highlander: true,
                classes: 'ui-wizard-page-tabs',
                onActivate: 'tabActivated'
            },
            {
                name: 'steps',
                kind: 'Panels',
                fit: true,
                draggable: false,
                animate: false
            }
        ]}
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
        this.setCurrentStep( this.getStartStep() );
    },

    currentStepChanged: function(){
        var step = this.getCurrentStep(),
            i = this.steps.indexOf( step ),
            tab = this.getTabByName( step.name );

        if ( tab && tab !== this.$.tabs.getActive() )
            this.$.tabs.setActive( tab );
        this.$.steps.setIndex( i );


        this.setBackButtonType( this.getCurrentStep() === this.getStartStep()
            ? rc.NavToolbar.CANCEL
            : rc.NavToolbar.BACK
        );

        this.setNextButtonType( this.getCurrentStep() === this.getEndStep()
            ? rc.NavToolbar.DONE
            : rc.NavToolbar.NEXT
        );

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

    getTabByName: function( stepName ){
        return this.$.tabs.$[ this.getTabName(stepName) ];
    },

    getStartStep: function(){
        return this.getByName( 'start' );
    },

    getEndStep: function(){
        return this.getByName( 'end' );
    },

    getTabName: function( stepName ){
        return 'tab' + stepName;
    },

    setStepIcon: function( stepName, iconType ){
        this.getTabByName( stepName ).setIcon( iconType );
    }
});


enyo.kind({
    name: 'rc.WizardPageTab',
    kind: 'Button',
    classes: 'ui-wizard-page-tab',

    published: {
        caption: '',
        icon: rc.WizardPage.ICON_NONE
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

    iconChanged: function( old ){
        var icon = this.$.icon;

        icon.removeClass( this.getIconClassNameByType(old) );
        icon.addClass( this.getIconClassNameByType(this.getIcon()) );
        icon.setShowing( this.getIcon() !== rc.WizardPage.ICON_NONE );
    },

    getIconClassNameByType: function( type ){
        var t = rc.WizardPage;
        switch ( type ){
            case t.ICON_DONE:
                return 'done';
            case t.ICON_FAILED:
                return 'failed';
            case t.ICON_SKIPPED:
                return 'skipped';
            case t.ICON_UNDONE:
            case t.ICON_NONE:
            default:
                return '';
        }
    }
});


enyo.kind({
    name: 'rc.WizardPageStep',
    kind: 'rc.Control',

    events: {
        onEnter: '',
        onLeave: ''
    },

    /**
     * @returns {rc.Model}
     */
    getState: function(){
        return this._wizardState;
    },

    setIcon: function( iconType ){
        this.parent.setStepIcon( this.stepName, iconType )
    }
});