window.MeshUpView = Backbone.View.extend({

	initialize: function() {
	    this.render();
	},
	render: function() {
		
		$(this.el).html(this.template());
		
	    return this;
	},
	events: {
        "change  #filetype"   : "selectType"
    },
    selectType:function(){
    	
    	alert($('#filetype').val());
    	
    }
   
    
 });




