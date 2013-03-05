/**
 * @author Marenin Alexander
 * March 2013
 */


enyo.kind({
    name: 'rc.page.UnderConstruction',
    kind: 'rc.Page',
    caption: loc.UnderConstruction.caption,
    showBack: true,

    handlers: {
        onBack: 'onBack'
    },

    onBack: function(){
        this.log( 'Please leave this area' );
    },

    components: [
        {content: 'Please leave this area'}
    ]
});