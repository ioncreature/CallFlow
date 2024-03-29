/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    kind: 'rc.Collection',
    name: 'rc.data.RuleCollection',

    model: rc.data.RuleModel,
    idField: 'id',

    hasAfterHoursRule: function(){
        return this.some( function( model ){
            return model.isAfterHours();
        });
    }
});