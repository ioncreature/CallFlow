/**7
 * @author Marenin Alexander
 * April 2013
 */

enyo.kind({
    name: 'rc.PhoneGroups',
    kind: 'rc.Control',
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
        this.render();
    },

    render: function(){
        var collection = this.getCollection();

        if ( collection ){
            this.destroyComponents();
            collection.forEach( function( group ){
                this.createComponent({
                    kind: this.defaultKind,
                    collection: group,
                    onRadioTap: 'itemRadioTap',
                    ontap: 'itemTap'
                });
            }, this );
        }
        this.inherited( arguments );
    },

    itemRadioTap: function( sender ){
        this.doItemRadioTap({ collection: sender.collection });
    },

    itemTap: function( sender ){
        this.doItemTap({ collection: sender.collection });
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
    },

    moveUpSelected: function(){
        this._move( -1 );
    },

    moveDownSelected: function(){
        this._move( 1 );
    },

    _move: function( n ){
        var items = this.getSelectedItems(),
            i,
            itemIndices = this._getItemsIndices( items ),
            newIndices = [],
            newIndex,
            prevIndex,
            nextIndex,
            children = this.children,
            lastIndex = children.length - 1;

        if ( items.length == 0 || n === 0 )
            return false;

        if ( n < 0 ){
            for ( i = 0; i < items.length; i++ ){
                newIndex = itemIndices[i] + n;
                prevIndex = i > 0 && newIndices[i-1];

                if ( i > 0 && prevIndex >= newIndex )
                    newIndices[i] = prevIndex + 1;
                else
                    newIndices[i] = newIndex > 0 ? newIndex : 0;
            }

            for ( i = items.length - 1; i >= 0; i-- )
                this.getCollection().swap( children[itemIndices[i]].getCollection(), children[newIndices[i]].getCollection() );
        }
        else {
            var last = items.length - 1;
            for ( i = last; i >= 0; i-- ){
                newIndex = itemIndices[i] + n;
                nextIndex = i < last && newIndices[i+1];

                if ( i < last && newIndex >= nextIndex )
                    newIndices[i] = nextIndex - 1;
                else
                    newIndices[i] = newIndex > lastIndex ? lastIndex : newIndex;
            }

            for ( i = 0; i < items.length; i++ )
                this.getCollection().swap( children[itemIndices[i]].getCollection(), children[newIndices[i]].getCollection() );
        }

        this.render();

        for ( i = 0; i < newIndices.length; i++ )
            children[newIndices[i]].setActive( true );
    },

    _getItemsIndices: function( items ){
        var itemIndices = [],
            curr = 0;
        this.children.forEach( function( item, index ){
            if ( item === items[curr] ){
                itemIndices[curr] = index;
                curr ++;
            }
        });
        return itemIndices;
    }
});