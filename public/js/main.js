var AppRouter = Backbone.Router.extend({

    routes: {
    	"":"login",
    	"login":"login",
    	"home":"homepage",
    	"home/details/:id":"detailsView"
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
    	    url: "/api/details/"+id,
    	    type: "GET",
    	    dataType: "json",
    	    success: function(response) {
    	    	
    	    	$('#result').html( '<table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="example"></table>' );
    	        $('#example').dataTable( {
    	            "aaData": response.data,
    	            "aoColumns": response.columns
    	        } );   
    	        
    	    },
    	    error: function(xhr) {
    	    	alert(xhr);
    	    }
    	});
   /*
    	var loanmodel=new LoanDetails();
    	loanmodel.searchTerm=id ;
    	
    	loanmodel.fetch({
            success: function (response) {
                console.log("sucess"+JSON.stringify(response.columns));
               
                //$("#result").html("<H1>Selected Item id:"+id+"</H1>"); 
                $("#result").html((new GridView()).render({collection:response}).el); 
                
                var columns = [{
            		  name: "id", // The key of the model attribute
            		  label: "ID", // The name to display in the header
            		  editable: false,
            		  cell: "string"
            		}, {
            		  name: "name",
            		  label: "Name",
            		  editable: false,
            		  cell: "string"
            		}, {
              		  name: "amount",
                		  label: "Amount",
                		editable: false,
                		cell: "string"
                		}, {
              		  name: "age",
                		  label: "Age",
                		  editable: false,
                		  cell: "string"
                		}, {
              		  name: "salary",
                		  label: "Salary",
                		  editable: false,
                		  cell: "string"
                		}];
                
              //Initialize a new Grid instance
              	var grid = new Backgrid.Grid({
              	  columns: columns,
              	  collection: response
              	});
                
                var grid = new Backgrid.Grid({
                	  columns: columns,
                	  collection: response.data
                	});
              	
              	
              	
              	$("#result").html(grid.render().$el);
                
                
            },
            error:function(response){
            	console.log("error"+response);
            }
        });*/
    	
    }
    ,
    login: function() {
  
    	this.authmodel=new Authentication();
    	this.loginview=new LoginView({model:this.authmodel});
    	$(".content").html(this.loginview.el);  
	},
    homepage: function() {
    	
           $(".content").html((new HomeView).el);
          
	}
  
});

utils.loadTemplate(['HeaderView','LoginView','FooterView','HomeView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});