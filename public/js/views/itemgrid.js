window.GridView = Backbone.View.extend({
	tagName: "div",
	className:"backgrid-container",

    initialize:function () {
        this.render();
    },

    render:function () {
      
    	

  	//Initialize a new Grid instance
  	var grid = new Backgrid.Grid({
  	  columns: columns,
  	  collection: message.collection;
  	})
  	
  	$(this.el).html(grid.render().$el);
  	    
     return this;
     
    }
   

});