
define(function(require){
    var Marionette = require('marionette');
    var MainLayoutTemplate = require('tpl!tmpl/mainLayout.html');
    
    var MainLayout = Marionette.Layout.extend({
        template: MainLayoutTemplate,
        
        render: function(){
            this.el = this.template({id:Math.random()});            
        }
    });
    return MainLayout;
});