
define(function(require){
    var Marionette = require('marionette');
    var HeaderLayoutTemplate = require('tpl!tmpl/headerLayout.html');
    
    var HeaderLayout = Marionette.ItemView.extend({
        template: HeaderLayoutTemplate,
        
        render: function(){
            this.el = this.template();            
        }
    });
    return HeaderLayout;
});