/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    name: 'App',
    kind: 'FittableRows',
    classes: 'enyo-fit',
    draggable: false,

    components: [
        {name: 'panels', kind: 'Panels', fit: true, components: [
            {kind: 'rc.page.UserSettings'},
            {kind: 'rc.page.CallerId'},
            {kind: 'rc.page.GreetCaller'},
            {kind: 'rc.page.UnderConstruction'}
        ]}
    ],

    create: function(){
        this.inherited( arguments );
    }
});
