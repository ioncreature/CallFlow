/**
 * @author Marenin Alexander
 * February 2013
 */

define(
    [
        './ui/Flow',
        'domReady!'
    ],

    function( Flow ){
        return initUi;

        function initUi(){
            debugger;
            Flow.attachTo( '#flowUi' );
        }
    }
);