/**7
 * @author Marenin Alexander
 * April 2013
 */

enyo.kind({
    name: 'rc.PhoneGroups',
    classes: 'ui-phone-groups',
    defaultKind: 'rc.PhoneGroup',

    published: {
        collection: null
    },

    events: {
        onItemTap: '',
        onItemRadioTap: ''
    },

    create: function(){
        this.inherited( arguments );
        this.collectionChanged();
    },

    collectionChanged: function(){
        var collection = this.getCollection();

        if ( collection ){
            this.destroyComponents();
            collection.forEach( function( group ){
                this.createComponent({
                    kind: this.defaultKind,
                    collection: group,
                    onRadioTap: 'doItemRadioTap',
                    ontap: 'doItemTap'
                });
            }, this );
            this.render();
        }
    },

    /**
     * @returns {Array}
     */
    getSelectedCollections: function(){
        return this.getSelectedItems().map( function( item ){
            return item.getCollection();
        });
    },

    isFirstSelected: function(){
        return this.isItemActive( this.children[0] );
    },

    isLastSelected: function(){
        return this.isItemActive( this.children[this.children.length - 1] );
    },

    /**
     * @returns {Array}
     */
    getSelectedItems: function(){
        return this.children.filter( function( item ){
            return this.isItemActive( item );
        }, this);
    },

    isItemActive: function( item ){
        return item.getActive() && !item.getDisabled();
    }
});