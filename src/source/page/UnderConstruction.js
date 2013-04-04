/**
 * @author Marenin Alexander
 * March 2013
 */


enyo.kind({
    name: 'rc.page.UnderConstruction',
    kind: 'rc.Page',
    caption: loc.UnderConstruction.caption,
    showBack: true,
    classes: 'ui-under-construction',

    handlers: {
        onBack: 'onBack'
    },

    onBack: function(){
        this.log( 'Please leave this area' );
    },

    components: [
        {classes: 'ui-under-construction-top'},
        {classes: 'ui-under-construction-img'},
        {classes: 'ui-under-construction-placeholder', content: loc.UnderConstruction.placeholder}
    ]
});