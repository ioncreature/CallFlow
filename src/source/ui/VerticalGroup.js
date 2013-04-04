/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    kind: enyo.Control,
    name: 'rc.VerticalGroup',
    classes: 'ui-vertical-group',

    firstClass: 'ui-group-first-child',
    middleClass: 'ui-group-middle-child',
    lastClass: 'ui-group-last-child',

    create: function(){
        this.inherited( arguments );
        this.render();
    },

    render: function(){
        this.inherited( arguments );

        var children = this.children,
            quantity = children.length,
            lastChild = children[quantity - 1];

        if ( quantity === 0 )
            return;
        if ( quantity === 1 )
            this.clearClasses( children[0] );
        else {
            this.setComponentClass( children[0], this.firstClass );
            this.setComponentClass( lastChild, this.lastClass );

            for ( var i = 1; i < quantity - 1; i++ )
                this.setComponentClass( children[i], this.middleClass );
        }
    },

    clearClasses: function( component ){
        component.removeClass( this.firstClass );
        component.removeClass( this.middleClass );
        component.removeClass( this.lastClass );
    },

    setComponentClass: function( component, className ){
        this.clearClasses( component );
        component.addClass( className );
    }
});
