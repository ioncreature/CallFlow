/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    kind: enyo.Control,
    name: 'rc.EditableList',
    classes: 'ui-editable-list',

    events: {
        onSelect: '',
        onAdd: 'onAdd',
        onInputChange: ''
    },

    published: {
        placeholder: '',
        data: [],
        itemAdapter: null
    },

    defaultListItemKind: 'rc.NavButton',

    components: [
        {kind: 'FittableColumns', components: [
            {kind: 'onyx.InputDecorator', classes: 'ui-text-input', fit: true, components: [
                {kind: 'onyx.Input', name: 'input', onchange: 'doInputChange'}
            ]},
            {kind:'onyx.Button', name: 'addButton', classes: 'ui-button', content: 'Add', ontap: 'doAdd'}
        ]},
        {kind: 'rc.VerticalGroup', name: 'list'}
    ],

    create: function(){
        this.inherited( arguments );
        this.$.input.setPlaceholder( this.getPlaceholder() );
        this.dataChanged( this.getData() );
    },

    defaultAdapter: function( item ){
        return item;
    },

    dataChanged: function( newData ){
        var list = this.$.list,
            itemAdapter = this.getItemAdapter() || this.defaultAdapter,
            component = this;

        list.destroyComponents();
        newData.forEach( function( item ){
            var adaptedItem = itemAdapter.call( component, item );
            list.createComponent({
                kind: component.defaultListItemKind,
                data: item,
                caption: adaptedItem.caption,
                description: adaptedItem.description
            });
        });
        list.render();
    },

    doAdd: function(){
        this.inherited( arguments );
        var data = this.getData();
        data.push({
            caption: this.$.input.getValue(),
            description: ''
        });
        this.setData( data );
        this.dataChanged( data );
        this.$.input.setValue( '' );
    }
});