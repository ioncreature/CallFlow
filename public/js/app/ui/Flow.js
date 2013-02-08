/**
 * @author Marenin Alexander
 * February 2013
 */

define(
    [
        'components/flight/lib/component',
        '../templates'
    ],

    function(
        defineComponent,
        templates
    ){
        return defineComponent( Flow );

        function Flow(){
            this.defaultAttrs({
                pi: '3.1415'
            });

            this.doSomething = function(){
                console.log( 'doSomething :', this );
            };

            this.after( 'initialize', function(){
                this.doSomething();
            });
        }
    }
);