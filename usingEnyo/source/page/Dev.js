/**
 * @author Marenin Alexander
 * March 2013
 */

enyo.kind({
    name: 'rc.page.Dev',
    kind: 'rc.Page',
    caption: loc.Dev.caption,

    components: [
        {classes: 'ui-header-left', style: 'margin-top: 10px;', content: 'Preview'},
        {name: 'scrollType', kind: 'rc.RadioList', components: [
            {caption: 'No', value: ''},
            {caption: 'Left fixed'},
            {caption: 'Right fixed', active: true},
            {caption: 'Fixed viewport (right)'},
            {caption: 'Finger X position'},
            {caption: 'Finger X & Y position'}
        ]},
        {classes: 'ui-header-left', content: 'Preview Size'},
        {name: 'scrollType', kind: 'rc.RadioList', components: [
            {caption: '20% x 20% (default)', active: true, value: ''},
            {caption: '5% x 20%', value: ''},
            {caption: '15% x 15%', value: ''},
        ]}
    ]
});