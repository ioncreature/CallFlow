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
        {kind: 'Scroller', fit: true, style: 'text-align: center;', horizontal: 'hidden', vertical: 'scroll', components: [
            {
                content: 'Please leave this area',
                style: 'font-size: 2em; text-align: center; margin-top: 30px;'
            },
            {classes: 'ui-restricted-area'}
        ]}
    ]
});