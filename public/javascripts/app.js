
define(function(require){
    var Bootstrap = require('bootstrap');
    var Marionette = require('marionette');
    var MainLayout = require('app/views/mainLayout');
    var HeaderLayout = require('app/views/headerLayout');
    
    var CerridApp = new Marionette.Application();

    CerridApp.addRegions({
        mainRegion: "#main-region",
        navigationRegion: "#header-region"
    });
    
    CerridApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "": "home"
        },
        
        controller: {
            home: function(){
                var mainLayout = new MainLayout();
                var headerLayout = new HeaderLayout();
                CerridApp.mainRegion.show(mainLayout);
                CerridApp.navigationRegion.show(headerLayout);
                
            }
        }
    });
    
    CerridApp.addInitializer(function(){
        new CerridApp.Router();
    });
    
    CerridApp.on("initialize:after", function(){
        if(Backbone.history){
            Backbone.history.start();
        }
    });

    CerridApp.start();
});