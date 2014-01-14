
window.ProductItemView = Backbone.View.extend({
	
	tagName: 'li',
	initialize: function() {
	    this.render();
	},
	render: function() {
		$(this.el).html("<a>prod1</a>");
	    return this;
	}
   
    
 });



window.ProductView= Backbone.View.extend({
    tagName: 'ul',
    className: 'nav nav-list',
    initialize: function() {
       
        this.render();
    },
    render: function() {
        that = this;
        
        $(this.el).html(this.template());
     
        this.collection.each(function(model) {
        	
            $(that.el).append(new ProductItemView({model: model.toJSON()}).el);
        });
        this.$('#sidebar-content').html(that.el);
        return this;
    }
    
 });

