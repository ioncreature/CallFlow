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

    events: {
        onFinish: ''
    },

    handlers: {
        onOpen: 'pageOpen',
        onBack: 'backHandler',
        onNext: 'nextHandler'
    },

    published: {
        currentStep: false,
        startStep: false
    },

    /** Shared state */
    state: null,

    /** @type Array */
    steps: null,

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
                animate: true
            }
        ]}
    ],

    create: function(){
        this.inherited( arguments );
        this.state = {};
        this.renderSteps();
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
                wizard: this
            }, step );
        }, this );
        this.steps = this.$.steps.children;
    },

    pageOpen: function(){
        this.enterToStep( this.getStartStep() );
    },

    currentStepChanged: function(){
        var step = this.getCurrentStep(),
            tab = this.getTabByName( step.name ),
            bt = rc.NavToolbar;

        if ( tab && tab !== this.$.tabs.getActive() )
            this.$.tabs.setActive( tab );
        this.$.steps.setIndex( this.steps.indexOf(step) );

        this.setBackButtonType( this.isWizardOnStart() ? bt.CANCEL : bt.BACK );
        this.setNextButtonType( this.isWizardOnEnd() ? bt.DONE : bt.NEXT );

        this.render();
    },

    backHandler: function( event, sender ){
        this.goBack();
        return true;
    },

    nextHandler: function(){
        this.goNext();
    },

    goBack: function(){
        var step = this.getPreviousStep();

        if ( this.isWizardOnStart() )
            App.back();
        else {
            this.setCurrentStep( step );
            this.callStepMethod( step, 'enter' );
        }
    },

    goNext: function(){
        this.goTo( this.getNextStep() );
    },

    goTo: function( step ){
        var current = this.getCurrentStep(),
            result = this.callStepMethod( current, 'leave' ),
            nextStep;

        if ( result === false )
            return;
        else if ( typeof result == 'string' && this.getByName(result) )
            nextStep = this.getByName( result );
        else
            nextStep = step;

        if ( this.isWizardOnEnd() ){
            this.doFinish();
            App.back();
        }
        else
            this.enterToStep( nextStep );
    },

    enterToStep: function( step ){
        this.setCurrentStep( step );
        this.callStepMethod( step, 'enter' );
    },

    tabActivated: function( sender, event ){
        var tab = event.originator;
        if ( tab.getActive() )
            this.setCurrentStep( this.getByName(tab.stepName) );
    },

    getState: function(){
        return this.state;
    },

    getNextStep: function(){
        return this._getStep( 'next' );
    },

    getPreviousStep: function(){
        return this._getStep( 'previous' );
    },

    _getStep: function( type ){
        var current = this.getCurrentStep(),
            currentIndex = this.steps.indexOf( current ),
            newIndex;

        if ( type === 'previous' )
            newIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : -1;
        else
            newIndex = currentIndex + 1 < this.steps.length ? currentIndex + 1 : -1;
        return this.steps[newIndex];
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

    getTabName: function( stepName ){
        return 'tab' + stepName;
    },

    getStartStep: function(){
        return this.getByName( 'start' );
    },

    getEndStep: function(){
        return this.getByName( 'end' );
    },

    setStepIcon: function( stepName, iconType ){
        this.getTabByName( stepName ).setIcon( iconType );
    },

    setStepCaption: function( stepName, caption ){
        this.getTabByName( stepName ).setCaption( caption );
    },

    isWizardOnStart: function(){
        return this.getCurrentStep() === this.getStartStep();
    },

    isWizardOnEnd: function(){
        return this.getCurrentStep() === this.getEndStep();
    },

    callStepMethod: function( step, methodName ){
        var params = Array.prototype.slice.call( arguments, 2 ),
            method;

        if ( step ){
            method = step[methodName];
            if ( typeof method == 'function' )
                return method.apply( step, params );

            if ( typeof method == 'string' && typeof this[method] == 'function' )
                return this[method].apply( step, params );
        }

        return undefined;
    }
});


enyo.kind({
    name: 'rc.WizardPageTab',
    kind: 'Button',
    classes: 'ui-wizard-page-tab',

    published: {
        caption: '',
        icon: rc.WizardPage.ICON_UNDONE
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
