var AppRouter = Backbone.Router.extend({

    routes: {
    	
       /* ""                  : "list",
        "items/page/:page"  : "list",
        "items/add"         : "addItem",
        "wines/:id"         : "itemDetails",
        "about"             : "about",
        "itemgrid"          : "showgrid"*/
    },

    initialize: function () {
        this.headerView = new HeaderView();
        this.loginView=new LoginView();
        this.footerView=new FooterView();
        $('.header').html(this.headerView.el);
        $("#content").html(this.loginView.el);
        $('.footer').html(this.footerView.el);
    },

	list: function(page) {
		console.log("#########page#####"+page);
        var p = page ? parseInt(page, 10) : 1;
        var itemList = new ItemCollection();
        itemList.fetch({success: function(){
            $("#content").html(new ItemListView({model: itemList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    itemDetails: function (id) {
        var item = new Item({id: id});
        item.fetch({success: function(){
            $("#content").html(new ItemView({model: item}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addItem: function() {
        var item = new Item();
        $('#content').html(new ItemView({model: item}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    },
    showgrid: function () {
        if (!this.gridView) {
            this.gridView = new GridView();
        }
        $('#content').html(this.gridView.el);
        this.headerView.selectMenuItem('grid-menu');
    }
    

});

utils.loadTemplate(['HeaderView','LoginView','FooterView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});