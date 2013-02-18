/**
 * @author Marenin Alexander
 * February 2013
 */


enyo.kind({
    name: 'rc.Fax',
    kind: enyo.Scroller,
    layoutKind: enyo.FittableRowsLayout,
    horizontal: 'hidden',

    components: [
        {classes: 'ui-header-big', content: 'Cover Page Info', style: 'margin-top: 20px;' },
        {classes: 'ui-message', content: 'This information will be printed on your fax cover page'},

        {classes: 'ui-label', content: 'Company'},
    ]
});