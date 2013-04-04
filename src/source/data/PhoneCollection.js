/**
 * @author Marenin Alexander
 * April 2013
 */

enyo.kind({
    kind: 'rc.Collection',
    name: 'rc.data.PhoneCollection',

    model: rc.data.PhoneModel,
    idField: 'id',

    defaults: {
        disabled: false,
        rings: 5
    }
});