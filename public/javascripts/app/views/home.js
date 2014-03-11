
define(function(require){
    var Marionette = require('marionette');
    var HomeTemplate = require('tpl!tmpl/home.html');
    
    var HomeView = Marionette.ItemView.extend({
        template: HomeTemplate,
        
        render: function(){
            this.el = this.template({id:Math.random()});            
        }
    });
    return HomeView;
});