
define(function(require){
    var Marionette = require('marionette');
    var NavigationTemplate = require('tpl!tmpl/navigation.html');
    
    var NavigationView = Marionette.ItemView.extend({
        template: NavigationTemplate,
        
        render: function(){
            this.el = this.template();            
        }
    });
    return NavigationView;
});