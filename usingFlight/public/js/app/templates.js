/**
 * @author Marenin Alexander
 * February 2013
 */

define(
    [
        'components/mustache',
        'text!./templates.htm'
    ],

    function( mustache, templatesString ){
        var templates = {};

        if ( Object.keys(templates ).length === 0 )
            grabTemplates( templatesString );

        return {
            /**
             * @param {String} id - template identifier
             * @param {Object?} data
             * @returns String
             */
            render: function( id, data ){
                return mustache.render( templates[id], data, templates );
            }
        };

        function grabTemplates( templatesString ){
            var container = document.createElement( 'div' ),
                scripts;

            container.innerHTML = templatesString;
            scripts = Array.prototype.slice.call( container.querySelectorAll('script[type="text/template"]'), 0 );
            scripts.forEach( function( node ){
                templates[node.id] = node.innerHTML;
            });
        }
    }
);