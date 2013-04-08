/**
 * @author Marenin Alexander
 * April 2013
 */

describe( 'rc.Index', function(){
    var i;


    beforeEach( function(){
        i = new rc.Index();
    });


    it( 'should add and get value', function(){
        i.add( 'test', 1 );

        expect( i.get('test') ).toBe( 1 );
    });


    it( 'should remove value', function(){
        i.add( 'a', 1 );
        expect( i.get('a') ).toBe( 1 );
        i.remove( 'a' );
        expect( i.get('a') ).toBeUndefined();
    });


    it( 'should return correct index length', function(){
        expect( i.getLength() ).toBe( 0 );
        i.add( 'a', 1 );
        expect( i.getLength() ).toBe( 1 );
        i.add( 'b', 2 );
        expect( i.getLength() ).toBe( 2 );
        i.add( 'a', 3 );
        expect( i.getLength() ).toBe( 2 );
        i.remove( 'a' );
        expect( i.getLength() ).toBe( 1 );
        i.remove( 'b' );
        expect( i.getLength() ).toBe( 0 );
    });


    it( 'should reset index', function(){
        i.add( 'a', 1 );
        i.add( 'b', 2 );
        i.add( 'c', 3 );
        i.reset();
        expect( i.getLength() ).toBe( 0 );
    });
});