
window.ProductItemView = Backbone.View.extend({
	
	tagName: 'li',
	initialize: function() {
	    this.render();
	},
	render: function() {
		
		console.log(this.model.children.length);
		
		$(this.el).html("<a href='#products/datasource/"+this.model.id+"'>"+this.model.name+"</a>");
		
		if(this.model.children.length>0)
		$(this.el).append((new ProductContent({collection:this.model.children})).el);
	
	    return this;
	}
   
    
 });



window.ProductContent= Backbone.View.extend({
    tagName: 'ul',
    className: 'nav nav-list',
    initialize: function() {
       
        this.render();
    },
    render: function() {
        that = this;
     
        this.collection.each(function(model) {
        
            $(that.el).append(new ProductItemView({model: model.toJSON()}).el);
        	
        });
 
        return this;
    }
    
 });

window.ProductView=Backbone.View.extend({
   
    initialize: function() {
       
        this.render();
    },
    render: function() {
        
        
        $(this.el).html(this.template());
      
        var data="[{\"name\":\"project1\",\"id\":0,\"children\":[{\"name\":\"prod1-child1\",\"id\":11,\"children\":[{\"name\":\"prod1-child1-channel1\",\"id\":111,\"children\":[]}]},{\"name\":\"prod1-child2\",\"id\":12,\"children\":[]}]},{\"name\":\"project2\",\"id\":1,\"children\":[]}]" ;
    
        this.$('#sidebar-content').html(this.getProdutsHierarchy(eval(data),false));
          
        return this;
    },
    getProdutsHierarchy:function(data,flag){
    	
    
    if(flag==false){
    	
    	  var content="<ul id=\"browser\" class=\"nav nav-list\" >";
    	    
    	    for(var i=0;i<data.length;i++){
    	    	
    	    	content=content+"<li><a href='#products/datasource/"+data[i].id+"'>"+data[i].name+"</a></li>" ;
    	    	
    	    	if(data[i].children.length>0){
    	    		
    	    		content=content+this.getProdutsHierarchy(data[i].children);
    	    								}
    	    		
    	    	
    	    }
    	    content=content+"</ul>";
    	    
    	    flag=true ;
    	
    }else{
    	
    	var content="<ul class=\"nav nav-list\" >";
	    
	    for(var i=0;i<data.length;i++){
	    	
	    	content=content+"<li><a href='#products/datasource/"+data[i].id+"'>"+data[i].name+"</a></li>" ;
	    	
	    	if(data[i].children.length>0){
	    		
	    		content=content+this.getProdutsHierarchy(data[i].children);
	    								}
	    		
	    	
	    }
	    content=content+"</ul>";
	  	
    }
     
    return content ;
    	
    }
    
 });

