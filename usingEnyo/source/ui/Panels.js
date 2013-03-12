/**
 * @author Marenin Alexander
 * March 2013
 */

enyo.kind({
    name: 'rc.Panels',
    kind: 'Control',
    classes: 'ui-panels',

    published: {
        index: 0
    },

    create: function(){
        this.inherited( arguments );
        this.indexChanged();
    },

    indexChanged: function(){
        var index = this.getIndex();
        this.children.forEach( function( child, i ){
            child.setShowing( i === index );
            child.reflow();
        }, this );
    },

    getActive: function(){
        return this.children[ this.getIndex() ];
    }
});