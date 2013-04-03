/**
 * @author Marenin Alexander
 * April 2013
 */

describe( 'rc.Collection', function(){
    var coll,
        model,
        TestCollection,
        TestModel,
        obj = {};


    beforeEach( function(){
        TestModel = enyo.kind({
            kind: 'rc.Model',
            defaults: {
                test: true
            }
        });
        TestCollection = enyo.kind({
            kind: 'rc.Collection',
            idField: 'id',
            model: TestModel
        });
        coll = new TestCollection({ models: [
            {id: 1},
            {id: 2},
            {id: 3, test: false}
        ]});
        model = new TestModel({ id: 4 });

        obj.fn = function(){};
        spyOn( obj, 'fn' );

        coll.on( 'add', obj.fn );
    });


    it( 'should add new model and fire callback', function(){
        coll.add( model );
        expect( obj.fn ).toHaveBeenCalled();
        expect( coll.getById(model.get('id')) ).toEqual( model );
    });


    it( 'should remove model and fire callback', function(){
        coll.on( 'remove', obj.fn );
        coll.add( model );
        coll.remove( model );

        expect( obj.fn ).toHaveBeenCalled();
        expect( coll.getById(model.get('id')) ).toBeUndefined();
    });


    it( 'should add multiple models', function(){
        coll.add([
            {id: 5},
            {id: 6}
        ]);

        expect( coll.getById(5) ).toBeTruthy();
        expect( coll.getById(6) ).toBeTruthy();
    });


    it( 'should filter and remove models', function(){
        var list = coll.filter( function( model ){
            return model.get( 'test' ) === true
        }, this );

        expect( list.length ).toBe( 2 );
        coll.remove( list );
        expect( coll.getItems().length ).toBe( 1 );
    });
});
