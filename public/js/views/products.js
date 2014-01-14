
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
     
        this.collection.each(function(model) {
        	
        	console.log("123123"+JSON.stringify(model));
            $(that.el).append(new ProductItemView({model: model.toJSON()}).el);
        });
        return this;
    }
    
 });

