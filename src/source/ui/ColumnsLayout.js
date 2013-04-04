/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    name: 'rc.ColumnsLayout',
    kind: 'Layout',

    reflow: function(){
        var width = this.container.getBounds().width,
            lastWidth = width,
            children = this.container.children,
            quantity = children.length,
            avgWidth = Math.round( width / quantity );

        children.forEach( function( child, i ){
            var childWidth = (i + 1 == quantity) ? lastWidth : avgWidth;
            lastWidth -= childWidth;
            child.applyStyle( 'width', childWidth + 'px' );
        });
    }
});