window.HeaderView = Backbone.View.extend({
	className:"navbar",
    initialize: function () {
        this.render();
    },

    render: function () {
       $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    selectMenuItem: function (menuItem) {
    	
        $('.nav li').removeClass('active-link');
        if (menuItem) {
       
            $('#'+menuItem).addClass('active-link');
        }
    }

});


