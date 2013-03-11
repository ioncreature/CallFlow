/**
 * @author Marenin Alexander
 * March 2013
 */

enyo.kind({
    name: 'rc.PhonesContainer',
    kind: 'Control',
    classes: 'ui-phone-container',

    components: [
        {classes: 'ui-phone-container-block', components: [
            {classes: 'ui-phone-container-block-left', components: [
                {classes: 'ui-phone-container-block-left-item', components: [
                    {classes: 'ui-phone-container-block-left-item-img mobile'},
                    {classes: 'ui-phone-container-block-left-item-caption', content: 'Office phone (Ext. 101)'},
                    {classes: 'ui-phone-container-block-left-item-number', content: '(452) 345-6345'}
                ]}
            ]},
            {classes: 'ui-phone-container-block-right', components: [
                {content: '4'},
                {content: 'rings'}
            ]}
        ]},
        {classes: 'ui-phone-container-block', components: [
            {classes: 'ui-phone-container-block-left', components: [
                {classes: 'ui-phone-container-block-left-item', components: [
                    {classes: 'ui-phone-container-block-left-item-img mobile'},
                    {classes: 'ui-phone-container-block-left-item-caption', content: 'Mobile'},
                    {classes: 'ui-phone-container-block-left-item-number', content: '(674) 345-4572'}
                ]},
                {classes: 'ui-phone-container-block-left-item inactive', components: [
                    {classes: 'ui-phone-container-block-left-item-img home'},
                    {classes: 'ui-phone-container-block-left-item-caption', content: 'Home'},
                    {classes: 'ui-phone-container-block-left-item-number', content: '(345) 433-3435'}
                ]}
            ]},
            {classes: 'ui-phone-container-block-right', components: [
                {content: '5'},
                {content: 'rings'}
            ]}
        ]},
        {classes: 'ui-phone-container-block', components: [
            {classes: 'ui-phone-container-block-left', components: [
                {classes: 'ui-phone-container-block-left-item inactive', components: [
                    {classes: 'ui-phone-container-block-left-item-img mobile'},
                    {classes: 'ui-phone-container-block-left-item-caption', content: 'Cisco SPA-5'},
                    {classes: 'ui-phone-container-block-left-item-number', content: '(674) 345-4572'}
                ]}
            ]},
            {classes: 'ui-phone-container-block-right', components: [
                {content: '4'},
                {content: 'rings'}
            ]}
        ]}
    ]
});