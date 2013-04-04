/**
 * @author Marenin Alexander
 * March 2013
 */

enyo.kind({
    name: 'rc.page.RingPhones',
    kind: 'rc.Page',
    classes: 'ui-ring-phones',
    caption: loc.RingPhones.caption,

    components: [
        {kind: 'FittableColumns', classes: 'ui-ring-phones-toolbar', components: [
            {name: 'up', content: 'Up', disabled: true, kind: 'rc.Button', classes: 'ui-ring-phones-up'},
            {name: 'down', content: 'Down', disabled: true, kind: 'rc.Button', classes: 'ui-ring-phones-down'},
            {name: 'split', content: loc.RingPhones.split, kind: 'rc.Button'},
            {name: 'join', content: loc.RingPhones.join, kind: 'rc.Button'}
        ]},
        {kind: 'rc.PhonesContainer'},
        {kind: 'rc.NavButton', caption: loc.RingPhones.ringExistingPhoneNumbers},
        {kind: 'rc.NavButton', caption: loc.RingPhones.forward}
    ]
});