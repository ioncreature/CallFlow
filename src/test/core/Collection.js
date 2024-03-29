/**
 * @author Marenin Alexander
 * April 2013
 */

describe( 'rc.Collection', function(){
    var superColl,
        coll,
        model,
        TestCollection,
        TestModel,
        SuperCollection,
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
            model: TestModel,
            defaults: {
                piu: false
            }
        });
        SuperCollection = enyo.kind({
            kind: 'rc.Collection',
            idField: 'id',
            model: TestCollection
        });
        superColl = new SuperCollection();
        coll = new TestCollection();
        coll.add([
            {id: 1},
            {id: 2},
            {id: 3, test: false}
        ]);
        model = new TestModel({ id: 4 });

        obj.fn = function(){};
        obj.fn2 = function(){};
        spyOn( obj, 'fn' );
        spyOn( obj, 'fn2' );

        coll.on( 'add', obj.fn );
    });


    it( 'should add new model and fire callback', function(){
        coll.add( model );
        expect( obj.fn ).toHaveBeenCalled();
        expect( coll.getById(model.get('id')) ).toEqual( model );
    });


    it( 'should remove model and fire callback', function(){
        coll.on( 'remove', obj.fn );
        coll.add( model, {silent: true} );
        coll.remove( model );

        expect( obj.fn ).toHaveBeenCalled();
        expect( coll.getById(model.get('id')) ).toBeUndefined();
    });


    it( 'should remove model by id', function(){
        expect( coll.getById(1) ).toBeTruthy();

        coll.removeById( 1 );
        expect( coll.getById(1) ).toBeUndefined();
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


    it( 'should add collection into collection', function(){
        superColl.add( {id: 1} );

        expect( superColl.getById(1) instanceof TestCollection ).toBe( true );
    });


    it( 'should throw exception if added wrong type model', function(){
        function addWrongModel(){
            superColl.add( model );
        }
        expect( addWrongModel ).toThrow();
    });


    it( 'should return correct quantity of models', function(){
        expect( coll.getQuantity() ).toBe( 3 );

        coll.removeById( 1 );
        expect( coll.getQuantity() ).toBe( 2 );

        coll.removeById( 2 );
        expect( coll.getQuantity() ).toBe( 1 );

        coll.removeById( 3 );
        expect( coll.getQuantity() ).toBe( 0 );

        coll.add({ id: 4 });
        expect( coll.getQuantity() ).toBe( 1 );
    });


    it( 'should swap elements', function(){
        expect( coll.models[0].get('id') ).toBe( 1 );
        expect( coll.models[1].get('id') ).toBe( 2 );
        coll.swap( coll.getById(1), coll.getById(2) );
        expect( coll.models[0].get('id') ).toBe( 2 );
        expect( coll.models[1].get('id') ).toBe( 1 );
    });


    it( 'should not swap elements (edge cases)', function(){
        coll.swap( coll.getById(1), coll.getById(1) );
        expect( coll.models[0].get('id') ).toBe( 1 );

        coll.swap( coll.getById(3), coll.getById(3) );
        expect( coll.models[2].get('id') ).toBe( 3 );
    });


    it( 'should replace model with another model and fire callbacks', function(){
        var whatReplace = coll.getById( 2 );

        coll.on( 'remove', obj.fn2 );
        coll.replace( whatReplace, model );

        expect( coll.getById(2) ).toBeUndefined();
        expect( coll.getById(model.get('id')) ).toBe( model );
        expect( obj.fn ).toHaveBeenCalled();
        expect( obj.fn2 ).toHaveBeenCalled();
    });


    it( 'should replace model with many models', function(){
        var whatReplace = coll.getById( 2 ),
            models = [ {id: 10}, {id: 11}, {id: 12} ];

        coll.replace( whatReplace, models );

        expect( coll.getById(2) ).toBeUndefined();
        expect( coll.getById(10) instanceof TestModel ).toBeTruthy();
        expect( coll.getById(11) instanceof TestModel ).toBeTruthy();
        expect( coll.getById(12) instanceof TestModel ).toBeTruthy();
        expect( obj.fn.callCount ).toBe( 3 );
    });


    it( 'should split each model to separate collection', function(){
        var colls = coll.split();

        expect( colls[0].getItems().length ).toBe( 1 );
        expect( colls[1].getItems().length ).toBe( 1 );
        expect( colls[2].getItems().length ).toBe( 1 );
    });
});
