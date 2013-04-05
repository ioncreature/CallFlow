/**
 * @author Marenin Alexander
 * April 2013
 */

describe( 'rc.Control', function(){
    var control,
        obs,
        fn;

    beforeEach( function(){
        control = new rc.Control();
        obs = new rc.Observable();
        fn = function(){};
    });

    it( 'should add and remove bindings', function(){
        control.addBinding( obs.on('add', fn) );
        control.addBinding( obs.on('edit', fn) );
        control.addBinding( obs.on('remove', fn) );
        expect( control.bindings.length ).toBe( 3 );

        control.removeBindings();
        expect( control.bindings.length ).toBe( 0 );
    });
});