/**
 * @author Marenin Alexander
 * February 2013
 */

define(
    [
        'domReady!',
        './ui/Flow'
    ],

    function( Flow ){
        return initUi;

        function initUi(){
            Flow.attachTo( '#flowUi' );
        }
    }
);