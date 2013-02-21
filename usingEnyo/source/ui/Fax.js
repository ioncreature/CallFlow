/**
 * @author Marenin Alexander
 * February 2013
 */


enyo.kind({
    name: 'rc.Fax',
    kind: enyo.Scroller,
    touch: true,
    thumb: true,
    layoutKind: enyo.FittableRowsLayout,
    horizontal: 'hidden',
    style: 'margin-bottom: 20px;',

    components: [
        {classes: 'ui-header-big', content: 'Cover Page Info', style: 'margin-top: 20px;' },
        {classes: 'ui-message', content: 'This information will be printed on your fax cover page'},

        {classes: 'ui-label', content: 'Company'},
        {kind: 'onyx.InputDecorator', classes: 'ui-text-input ui-block', components: [
            {kind: 'onyx.Input', value: 'RingCentral, Inc.', onchange: 'inputChange'}
        ]},

        {classes: 'ui-label', content: 'Phone'},
        {kind: 'onyx.InputDecorator', classes: 'ui-text-input ui-block', components: [
            {kind: 'onyx.Input', value: '(650) 472-4080', onchange: 'inputChange'}
        ]},

        {classes: 'ui-label', content: 'Adress'},
        {kind: 'onyx.InputDecorator', classes: 'ui-text-input ui-block', components: [
            {kind: 'onyx.TextArea', value: '144 Fashion Island Blvd,\n7th Floor', onchange: 'inputChange'}
        ]},

        {classes: 'ui-label', content: 'City'},
        {kind: 'onyx.InputDecorator', classes: 'ui-text-input ui-block', components: [
            {kind: 'onyx.Input', value: 'San Mateo', onchange: 'inputChange'}
        ]},

        {classes: 'ui-label', content: 'State/Province'},
        {kind: 'rc.NavButton', caption: 'California' },

        {classes: 'ui-label', content: 'Zip/Postal Code'},
        {kind: 'onyx.InputDecorator', classes: 'ui-text-input ui-block', components: [
            {kind: 'onyx.Input', value: '94404', onchange: 'inputChange'}
        ]},

        {classes: 'ui-label', content: 'Country'},
        {kind: 'rc.NavButton', caption: 'USA' },

        {classes: 'ui-header-big', content: 'Faxes Sent via Email', style: 'margin-top: 20px;' },
        {classes: 'ui-message', content:
            'To enable sending faxes via email from ' +
            'additional email addresses, enter them here. ' +
            'To send a fax via email, send the fax ' +
            'via faxnumber@rcfax.com.'
        },
        {kind: 'rc.VerticalGroup', name: 'internalCalls', components: [
            {kind: 'rc.ToggleButton', name: 'internalCallsToggle', caption: 'Omit cover page when email subject is blank'},
            {classes: 'ui-message', content:
                'If this option is selected, when you send a fax ' +
                'via email with a subject line the cover page ' +
                'will be used. If you send it without a subject ' +
                'line a cover page will not be used.'
            }
        ]},

        {classes: 'ui-label', content: 'Email addresses permitted to send faxes'},
        {kind: 'rc.EditableList', onAdd: 'inputChange', onSelect: 'inputChange', placeholder: 'user@email.com',
            data: [
                {caption: 'alaxeyp@ringcentral.com'},
                {caption: 'vic@ringcentral.com'},
                {caption: 'john.smith@ringcentral.com'}
            ]
        }
    ],

    inputChange: function( inEvent, inSender ){
        this.log( inSender.originator.name );
    }
});