
var AppRouter = Backbone.Router.extend({
    routes: {
    	"signup":"validateAdmin",
    	"":"login",
    	"login":"login",
    	"logout":"logout",
    	"home":"datasetViewer",
    	"projects":"proejctsView",
    	"datasets":"dataSetsView",
    	"reportbuilder/newreport/:id":"buildReport",
    	"newlayout":"buildnewLayout"

    }
  ,initialize:function(){
	  this.authmodel=new Authentication();
	  
	  if(sessionStorage.getItem("isLoggedIn")){
		  this.authmodel.set("isLoggedIn",true);
	  }else{
		  window.location.href='#login' ;
	  }
		  
	  this.headerview=new HeaderView({model:this.authmodel});
	  $(".header").html(this.headerview.el);   
	  
  },
  validateAdmin:function(){
  	this.adminAuthenticate=new AdminAuthenticationView({model:this.authmodel});
  	$("#content").html(this.adminAuthenticate.el); 
  },
  login:function(){
	  
	  if(sessionStorage.getItem("isLoggedIn")){
		  window.location.href='#home' ;
	  }
	  
	  this.loginview=new LoginView({model:this.authmodel});
	  $("#content").html(this.loginview.el); 
	    
  },
  logout:function(){
	  
	  	sessionStorage.removeItem("isLoggedIn");
	  	this.authmodel.set("isLoggedIn",false);
	  	this.loginview=new LoginView({model:this.authmodel});
	  	$("#content").html(this.loginview.el);  
		  
	  },
  datasetViewer:function(){
	  $("#content").html((new DataViewer()).el);
  },
  proejctsView:function(){
	  $("#content").html((new ProjectsView()).el);
  },
  dataSetsView:function(){
	  $("#content").html((new DataSetsBuilderView()).el);
  },
  buildReport:function(id){

	  $("#content").html((new ReportBuilderView()).el);
  },
  buildnewLayout:function(){
	  $("#content").html((new GridLayoutView()).el);
  }

 
});

utils.loadTemplate(['LoginView','DataViewer','ProjectsView','HeaderView','AdminAuthenticationView','SignUpView','DataSourceListView','DataSourceCreateView','DataSetsBuilderView','GridLayoutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});



