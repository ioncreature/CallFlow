/**
 * @author Marenin Alexander
 * March 2013
 */


enyo.kind({
    name: 'rc.page.UnderConstruction',
    kind: 'rc.Page',
    caption: loc.UnderConstruction.caption,

    handlers: {
        onBack: 'onBack'
    },

    showBack: true,
    onBack: function(){
        this.log( 'Please leave this area' );
    },

    components: [
        {}
    ]
});