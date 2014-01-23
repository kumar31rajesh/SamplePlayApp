
var AppRouter = Backbone.Router.extend({
	
    routes: {
    	"login":"login",
    	"signup":"validateAdmin",
    	"home":"homepage",
    	"home/details/:id":"detailsView",
    	"projects/datasourcelist/:label":"displayDataSourceView",
    	"projects":"displayProjectsList",
    	"meshup":"displayMeshUp",
    	"products/source/:id":"displayProductSource",
    	"projects/createDataSource":"ProductDataSource"
    },

    initialize: function () {
    	this.headermodel=new HeaderModel() ;
    	this.headerView = new HeaderView({model:this.headermodel}); 
        this.footerView=new FooterView();
        $('#header').html(this.headerView.el);
        $('.page-footer').html(this.footerView.el);        
    },
    detailsView: function (id) {	

    
    	  $.ajax({
              type: "GET", 
              url: "/api/details/"+id, 
              dataType:"json",
              success: function (response) {
            	  $('#page-content-wrapper').html( '<div id="filters_wrappers"></div> <table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="example"></table>' );
                  var otable=$('#example').dataTable({
                	 "sScrollY": "380px",
                	 "sScrollX": "965px",
                	 "bProcessing": true,
             		 "bServerSide": true,
              		 "bPaginate": false,
              		 "aoColumns":response.aoColumns,
              		 "sAjaxSource": "/api/details/"+id,
                     "sDom": "frtiS",
                     "oScroller": {
                        "displayBuffer": 10
                      }
                  });  
              },
              error: function(){
            	  
              }
          });
    	  
    	  $('body').on('mouseover', '.table thead tr th', function () {
    		
    		    $(this).popover('show');
    		});
    	  
    	
    /*	$('#page-content-wrapper').html( '<div id="filters_wrappers"></div> <table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="example"></table>' );
        var otable=$('#example').dataTable( {
        	"sScrollY": "280px",
    		"bPaginate": false,
    		"bProcessing": true,
    		"bServerSide": true,
    		  "aoColumns": [
                         { "mDataProp": "id" ,"sTitle":"ID"},
                          { "mDataProp": "name" ,"sTitle":"NAME"},
                          { "mDataProp": "amount" ,"sTitle":"AMOUNT"},
                          { "mDataProp": "age" ,"sTitle":"AGE"},
                          { "mDataProp": "place","sTitle":"PLACE" },
                          { "mDataProp": "salary","sTitle":"SALARY" }
                      ],
             "sAjaxSource": "/api/details/"+id,
             "sDom": "frtiS",
             "oScroller": {
                 "displayBuffer": 10
               }
        } ); */
 
    	
    },
    validateAdmin:function(){
    	this.authmodel=new Authentication();
    	this.adminAuthenticate=new AdminAuthenticationView({model:this.authmodel});
    	$(".content").html(this.adminAuthenticate.el); 
    }
    ,
    login: function() {
    	this.authmodel=new Authentication();
    	this.loginview=new LoginView({model:this.authmodel});
    	$(".content").html(this.loginview.el);  
	},
    homepage: function() {
 
           $(".content").html((new HomeView).el);
           this.headerView.selectMenuItem('home');
          
	},
	displayProjectsList:function(){
		$(".content").html((new ProjectView).el);
		this.headerView.selectMenuItem('products');
	},
	displayProductSource:function(id){
		$('prodName').val=id;
	},
	displayMeshUp:function(){
		
		$(".content").html((new MeshUpView).el);
		this.headerView.selectMenuItem('meshup');
	},
	ProductDataSource:function(label){
		
		$('#page-content').html((new DataSourceCreateView()).el);
	},
	displayDataSourceView:function(label){
			
		 $('#page-content').html((new DataSourceView()).el);
	}
  
});

utils.loadTemplate(['HeaderView','LoginView','FooterView','HomeView','ProjectView','AdminAuthenticationView','SignUpView','MeshUpView','DataSourceView','DataSourceCreateView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});



