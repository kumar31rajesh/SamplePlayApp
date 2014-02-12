var templateNode = _.template('\
	<%if(hasChildren){%>\
	<a href="javascript:void(0);" style="text-decoration: none;">\
	<%}else{%>\
	<a href="#home/details/<%=id%>" style="text-decoration: none;">\
	<%}%>\
    <%=(hasChildren ? "<span class=tree-view-chevron><i class=icon-plus-sign></i></span>" : "")%>\
    <label for="<%=autoId%>" class="tree-view-label"><%=label%></label>\
	</a>\
	<ul class="tree-view-list">\
    </ul>\
  	');



var NodeView  = Marionette.CompositeView.extend({
  tagName: "li",
  className: "tree-view-node",
  template: templateNode,
  chevronRight: "<i class=icon-plus-sign></i>",
  chevronDown: "<i class=icon-minus-sign></i>",

  ui: {
    chevron: ".tree-view-chevron",
    label: ".tree-view-label",
    list: ".tree-view-list"
  },

  initialize: function(options) {
    this.template = options.template || this.template;

    if (this.model.hasChildren())
      this.$el.addClass("tree-view-branch");
    else
      this.$el.addClass("tree-view-leaf");
  },

  bindCollection: function() {
    this.collection = this.model.get("children");
  },

  onRender: function() {
   this.bindCollection();
    if (this.model.get("class")) this.ui.icon.addClass(this.model.get("class"));
  },

  appendHtml: function(collectionView, itemView){
    collectionView.ui.list.append(itemView.el);
  },

  serializeData: function() {
    return {
      autoId: _.uniqueId(),
      hasChildren: this.model.hasChildren(),
      label: this.model.get("label"),
      id: this.model.id
    };
  },

  events: {
    "click .tree-view-chevron": "toggleView"
  },

  toggleView: function() {
    this._renderChildren();
    this.$el.toggleClass("open");
    this.switchChevron();
    return false;
  },

  switchChevron: function() {
    if (!this.model.hasChildren()) return;

    if (this.$el.hasClass("open")) {
      this.ui.chevron.html(this.chevronDown);
    } else {
      this.ui.chevron.html(this.chevronRight);
    }
  },

  expand: function() {
    this._renderChildren();
    this.$el.addClass("open");
    this.switchChevron();
    this.children.each(function(child) { child.expand(); });
  },

  collapse: function() {
    this.$el.removeClass("open");
    this.switchChevron();
    this.children.each(function(child) { child.collapse(); });
  }
});


window.TreeView = Marionette.CollectionView.extend({
  itemView: NodeView,
  tagName: "ul",
  className: "tree-view-root",

  itemViewOptions: function() {
    return {
      template: this.options.template
    };
  },

  expand: function() {
    this.children.invoke('expand');
  },

  collapse: function() {
    this.children.invoke('collapse');
  },

  toggleView: function() {
    this.children.invoke('toggleView');
  }
});

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
    	 
    	 this.$('#treeviewnode').html(new TreeView({ collection: new Trees([new Tree({ label: "CMBS", id: "0",children:response})]) }).render().el);
    	 
    } });
    	
    return this;
              
    }  

});

