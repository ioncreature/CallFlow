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
        onAdd: ''
    },

    published: {
        placeholder: '',
        date: '',
        itemsAdapter: 'defaultAdapter'
    },

    components: [
        {kind: 'FittableColumns', components: [
            {kind: 'onyx.InputDecorator', classes: 'ui-text-input', fit: true, components: [
                {kind: 'onyx.Input', name: 'input', onchange: 'inputChange'}
            ]},
            {kind:'onyx.Button', name: 'addButton', classes: 'ui-button', content: 'Add', ontap: 'doClick'}
        ]},
        {kind: 'rc.VerticalGroup', name: 'list', components: [

        ]}
    ],

    create: function(){
        this.inherited( arguments );
        this.$.input.setPlaceholder( this.getPlaceholder() );
    },

    defaultAdapter: function( item ){
        return this.item;
    },

    setItems: function(){

    }
});