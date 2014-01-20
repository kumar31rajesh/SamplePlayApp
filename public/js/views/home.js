var treeJs =
        [
            { id: "cmbs", label: 'CMBS',
                children: [
                    { id: "loan", label: 'loan', 
                    	children: [
                            { id: "loan1", label: 'loan1'},
                            { id: "loan2", label: 'loan2'}]},
                    { id: "bond", label: 'Bond'},
                    { id: "ids", label: 'IDs',  
                    	children: [
                            { id: "ids1", label: 'SubItem31'},
                            { id: "ids2", label: 'SubItem32'},
                            { id: "ids3", label: 'SubItem33'}
                            		]}]
        }];


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
    	
    	var data="[{\"label\":\"project1\",\"id\":0,\"children\":[{\"label\":\"prod1-child1\",\"id\":11,\"children\":[]},{\"label\":\"prod1-child2\",\"id\":12,\"children\":[]}]},{\"label\":\"project2\",\"id\":1,\"children\":[]}]" ;
    	//var data ="[{\"label\":\"Loan\",\"id\":\"52d786eb44ae1f357323d228\",\"children\":[]}]";
    	//alert(JSON.stringify(response));
    	 
    	 this.$('#treeviewnode').html(new TreeView({ collection: new Trees([new Tree({ label: "CMBS", id: "0",children:response})]) }).render().el);
    	 //this.$('#treeviewnode').html(new TreeView({ collection:new Trees(treeJs) }).render().el);
    } });
    	
    return this;
              
    }  

});

