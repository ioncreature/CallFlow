/**
 * @author Marenin Alexander
 * May 2013
 */


describe( 'App static methods', function(){

    describe( 'Event bus interface', function(){
    });


    describe( 'Config store interface', function(){
        it( 'should set value', function(){
            expect( App.get('test') ).toBeUndefined();
            App.set( 'test', 1 );
            expect( App.get('test') ).toBe( 1 );
            App.set( 'test', null );
            expect( App.get('test') ).toBe( null );
            App.set( 'test', 2 );
            expect( App.get('test') ).toBe( 2 );
        });

        it( 'should set and get dot separated values and create object if needed', function(){
            App.set( 't.t.t', 1 );
            expect( App.get('t').t.t ).toBe( 1 );
            expect( App.get('t.t.t') ).toBe( 1 );
            App.set( 't.t.b', 2 );
            expect( App.get('t.t.b') ).toBe( 2 );
        });
    });
});