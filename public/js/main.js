var AppRouter = Backbone.Router.extend({

    routes: {
    	"":"login",
    	"login":"login",
    	"signup":"validateAdmin",
    	"home":"homepage",
    	"home/details/:id":"detailsView",
    	"products":"displayProducts",
    	"products/source/:id":"displayProductSource"
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
	displayProducts:function(){
		this.products=new Products([new Product({name:'Product1',id:'0',children:new Products([new Product({name:'Prod1-Child1',id:'01'}),new Product({name:'Prod1-Child2',id:'02'})]) }),new Product({name:'Product2',id:'1'})]);
		$(".content").html((new ProductView({collection:this.products})).el);
		this.headerView.selectMenuItem('products');
	},
	displayProductSource:function(id){
		$('prodName').val=id;
	}
  
});

utils.loadTemplate(['HeaderView','LoginView','FooterView','HomeView','ProductView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});


