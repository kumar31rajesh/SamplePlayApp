
define(function(require){
    var Bootstrap = require('bootstrap');
    var Marionette = require('marionette');
    var HomeView = require('app/views/home');
    var NavigationView = require('app/views/navigation');
    
    var CerridApp = new Marionette.Application();

    CerridApp.addRegions({
        mainRegion: "#main-region",
        navigationRegion: "#navigation"
    });
    
    CerridApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "": "home"
        },
        
        controller: {
            home: function(){
                var homeView = new HomeView();
                var navigationView = new NavigationView();
                CerridApp.mainRegion.show(homeView);
                CerridApp.navigationRegion.show(navigationView);
                
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