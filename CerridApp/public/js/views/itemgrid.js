window.GridView = Backbone.View.extend({
	tagName: "div",
	className:"backgrid-container",
	id:"example-1-result",

    initialize:function () {
        this.render();
    },

    render:function () {
        //$(this.el).html(this.template());
        //$("#example-1-result").html(this.template());
       // this.displayGrid();
    	var columns = [{
  		  name: "id", // The key of the model attribute
  		  label: "ID", // The name to display in the header
  		  editable: false, // By default every cell in a column is editable, but *ID* shouldn't be
  		  // Defines a cell type, and ID is displayed as an integer without the ',' separating 1000s.
  		  cell: Backgrid.IntegerCell.extend({
  		  //  orderSeparator: ''
  		  })
  		}, {
  		  name: "name",
  		  label: "Name",
  		  editable: false,
  		  // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
  		  cell: "string" // This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
  		}, {
    		  name: "grapes",
      		  label: "Grapes",
      		editable: false,
      		  // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
      		  cell: "string" // This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
      		}, {
    		  name: "country",
      		  label: "Country",
      		  editable: false,
      		  // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
      		  cell: "string" // This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
      		}, {
    		  name: "region",
      		  label: "Region",
      		  editable: false,
      		  // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
      		  cell: "string" // This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
      		},{
        		  name: "price", // The key of the model attribute
          		  label: "Price", // The name to display in the header
          		  editable: false,
          		  // Defines a cell type, and ID is displayed as an integer without the ',' separating 1000s.
          		  cell: Backgrid.IntegerCell.extend({
          		    //orderSeparator: ''
          		  })
          		}];

  	var itemsgrid=new ItemCollection();

  	//Initialize a new Grid instance
  	var grid = new Backgrid.Grid({
  	  columns: columns,
  	  collection: itemsgrid
  	});
  	
  	//$("#example-1-result").append(grid.render().$el);
  	
    $(this.el).append(grid.render().$el);
  	
 // Initialize the paginator
  	var paginator = new Backgrid.Extension.Paginator({
  	  collection: itemsgrid
  	});

  	// Render the paginator
  	$(this.el).append(paginator.render().$el);
  	
 // Initialize a client-side filter to filter on the client
 // mode pageable collection's cache.
 var filter = new Backgrid.Extension.ClientSideFilter({
   collection: itemsgrid.fullCollection,
   fields: ['name']
 });

 // Render the filter
 $(this.el).prepend(filter.render().$el);

 // Add some space to the filter and move it to the right
 filter.$el.css({float: "right", margin: "1px"});

  	// Fetch some countries from the url
  itemsgrid.fetch({reset: true});

  
    
     return this;
     
    }
   

});