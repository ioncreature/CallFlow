/**
 * @author Marenin Alexander
 * April 2013
 */

enyo.kind({
    name: 'rc.WizardPageStep',
    kind: 'rc.Control',

    published: {
        icon: rc.WizardPage.ICON_UNDONE,
        caption: ''
    },

    create: function(){
        this.inherited( arguments );
        this.iconChanged();
        this.captionChanged();
    },

    iconChanged: function(){
        this.wizard && this.wizard.setStepIcon( this.name, this.getIcon() );
    },

    captionChanged: function(){
        this.wizard && this.wizard.setStepCaption( this.name, this.getCaption() );
    },

    /**
     * @returns {rc.Model}
     */
    getState: function(){
        return this.wizard && this.wizard.getState();
    },

    /** @override */
    leave: function(){},

    /** @override */
    enter: function(){}
});