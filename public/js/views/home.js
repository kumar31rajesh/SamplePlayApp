
var	TreeView=Marionette.TreeView ;
window.HomeView = Backbone.View.extend({
	
	id: 'bodycontainer',
	
    initialize: function(){
        this.render();    
    },
    render: function(){
    	
    	
    $(this.el).html(this.template());
    
    var trees=new Trees();
    trees.url="/api/hierarchy";
  
    trees.fetch({success: function (response) { 
    	 
    	    this.$('#treeviewnode').html(new TreeView({ collection: new Trees([new Tree({ label: "CMBS", id: "0",children: response })]) }).render().el);
  
    } });
    	
    return this;
              
    }  

});

