
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
        
        this.$('#sidebar-content').html((new ProductContent({collection:this.collection})).el);
  
        return this;
    }
    
 });

