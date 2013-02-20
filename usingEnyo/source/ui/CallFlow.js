/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    name: 'rc.CallFlow',
//    kind: enyo.Control,
    kind: enyo.Scroller,
    layoutKind: enyo.FittableColumnsLayout,
    horizontal: 'hidden',
    fit: true,

    components: [
        {
            kind: 'enyo.TabPanels',
            name: 'tabs',
            fit: true,
            draggable: true,
//            style: 'min-height: 200px;',
            components: [
                {caption: 'First', components: [
                    {kind:'onyx.Button', classes: 'ui-button', content: 'Button'}
                ]},
                {content: 'MyMiddlePanel'},
                {content: 'MyMiddlePanel'},
                {content: 'MyMiddlePanel'},
                {content: 'MyMiddlePanel'},
                {content: 'MyMiddlePanel'},
                {content: 'MyMiddlePanel'},
                {content: 'MyMiddlePanel'},
                {content: 'MyMiddlePanel'},
                {content: 'MyLastPanel'}
            ]
        },

//        {kind:'onyx.Button', name: 'addButton', classes: 'ui-button', content: 'Add'}
    ],

    create: function(){
        this.inherited( arguments );
        this.log( this.$.tabs );
    }
});