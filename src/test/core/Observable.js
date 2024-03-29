/**
 * @author Marenin Alexander
 * April 2013
 */

describe( 'rc.Observable', function(){
    var obs,
        obj = {},
        handler;


    describe( 'work with one callback', function(){
        beforeEach( function(){
            obs = new rc.Observable();
            obj.fn = function( val ){
                this.val = val;
            };

            spyOn( obj, 'fn' );
            handler = obs.on( 'test', obj.fn );
            obs.trigger( 'test', 1 );
        });


        it( 'should fire callback once', function(){
            expect( obj.fn ).toHaveBeenCalled();
            expect( obj.fn.callCount ).toBe( 1 );
        });


        it( 'should not fire callback after deletion', function(){
            handler.remove();
            obs.trigger( 'test' );

            expect( obj.fn ).toHaveBeenCalled();
            expect( obj.fn.callCount ).toBe( 1 );
        });


        it( 'should fire callback with specified parameter', function(){
            expect( obj.fn.calls[0].args[0] ).toBe( 1 );
        });


        it( 'should run callback second time', function(){
            obs.trigger( 'test' );
            expect( obj.fn.callCount ).toBe( 2 );
        });


        it( 'should not fire on different event', function(){
            obs.trigger( 'wrongEventName', 2 );
            expect( obj.fn.callCount ).toBe( 1 );
        });


        it( 'should not fire after reset', function(){
            obs.resetHandlers();
            obs.trigger( 'test' );
            expect( obj.fn.callCount ).toBe( 1 );
        });
    });


    describe( 'work with multiple callbacks', function(){
        beforeEach( function(){
            obs = new rc.Observable();
            obj.fn = function(){};
            obj.fn2 = function(){};

            spyOn( obj, 'fn' );
            spyOn( obj, 'fn2' );
        });


        it( 'should run each callback once', function(){
            obs.on( 'test', obj.fn );
            obs.on( 'test', obj.fn2 );
            obs.trigger( 'test' );

            expect( obj.fn.callCount ).toBe( 1 );
            expect( obj.fn2.callCount ).toBe( 1 );
        });


        it( 'should fire only second callback', function(){
            handler = obs.on( 'test', obj.fn );
            obs.on( 'test', obj.fn2 );
            handler.remove();
            obs.trigger( 'test' );

            expect( obj.fn.callCount ).toBe( 0 );
            expect( obj.fn2.callCount ).toBe( 1 );
        });


        it( 'should not fire any callbacks after reset', function(){
            obs.on( 'test', obj.fn );
            obs.on( 'test', obj.fn2 );
            obs.resetHandlers();
            obs.trigger( 'test' );

            expect( obj.fn.callCount ).toBe( 0 );
            expect( obj.fn2.callCount ).toBe( 0 );
        });
    });
});
