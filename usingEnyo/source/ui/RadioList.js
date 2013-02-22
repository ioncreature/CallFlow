/**
 * @author Marenin Alexander
 * February 2013
 */


enyo.kind({
    kind: 'FittableRows',
    name: 'rc.RadioList',

    published: {
        rules: null
    },

    events: {
        onActivate: ''
    },

    itemKind: 'rc.RadioListItem',

    create: function(){
        this.inherited( arguments );
        this.rulesChanged();
    },

    rulesChanged: function(){
        var rules = this.getRules(),
            component = this;

        this.destroyComponents();
        if ( rules && rules.length ){
            rules.forEach( function( rule ){
                component.createComponent({
                    kind: component.itemKind,
                    caption: rule.caption,
                    description: rule.description,
                    onTap: function( inSender, inEvent ){
                        component.doActivate();
                    }
                });
            });
//            this.children[0].activate;
        }
    }

});