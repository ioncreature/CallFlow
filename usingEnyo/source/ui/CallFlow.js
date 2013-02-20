/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    name: 'rc.CallFlow',
    kind: enyo.Scroller,
    layoutKind: enyo.FittableRowsLayout,
    horizontal: 'hidden',
    fit: true,

    tools: [

    ],

    create: function(){
        this.inherited( arguments );
        this.log( this.$.tabs );
    },

    initComponents: function(){
        this.createChrome( this.itemTools );
        this.inherited( arguments );
    }
});