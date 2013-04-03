/**
 * @author Marenin Alexander
 * April 2013
 */


describe( 'rc.Model', function(){
    var model,
        TestModel,
        obj = {},
        toSet = {
            a: 'a',
            b: 'b'
        };


    beforeEach( function(){
        TestModel = enyo.kind({
            kind: 'rc.Model',
            defaults: {
                test: true
            }
        });
        model = new TestModel();

        obj.fn = function(){};
        spyOn( obj, 'fn' );
        model.on( 'test', obj.fn );
    });


    it( 'should return default value', function(){
        expect( model.get('test') ).toBe( true );
    });


    it( 'should set and get value', function(){
        model.set( 'test', 'yeah!' );
        expect( model.get('test') ).toBe( 'yeah!' );
    });


    it( 'should fire callback', function(){
        model.set( 'test', 'yeah!' );
        expect( obj.fn ).toHaveBeenCalledWith( 'yeah!' );
    });


    it( 'should not fire callback in silent mode', function(){
        model.set( 'test', 'yeah!', {silent: true} );
        expect( obj.fn ).not.toHaveBeenCalled();
    });


    it( 'should set multiple values', function(){
        model.set( toSet );

        expect( model.get('a') ).toBe( 'a' );
        expect( model.get('b') ).toBe( 'b' );
    });


    it( 'should get model subset', function(){
        model.set( toSet );
        expect( model.get(['a', 'b']) ).toEqual( toSet );
    });


    it( 'should tells changed property or not', function(){
        expect( model.isChanged('test') ).toBe( false );
        model.set( 'test', 'piu' );
        expect( model.isChanged('test') ).toBe( true );
    });


    it( 'should tells changed model or not', function(){
        expect( model.isChanged() ).toBe( false );
        model.set( 'test', 'piu' );
        expect( model.isChanged() ).toBe( true );
    });


    it( 'should reset model to default state', function(){
        model.set( toSet );
        model.set( 'test', false );
        model.reset();

        expect( model.get('test') ).toBe( true );
        expect( model.get('a') ).toBeUndefined();
        expect( model.get('b') ).toBeUndefined();
    });
});