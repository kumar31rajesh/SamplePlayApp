(function(Backbone, Marionette, _, $) {

/*

Copyright (C) 2013 Acquisio Inc. V0.1.1

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

var Tree = Backbone.Tree = Backbone.Model.extend({
  defaults: {
    id: 0,
    label: "Default"
  },

  initialize: function() {
    if (!this.get("children")) this.set("children", new Backbone.Trees());
  },

  getChildrenIds: function() {
    if (!this.hasChildren()) return [this.id];

    var modelsId = this.get("children").map(function(child) {
      if (child.hasChildren())
        return child.getChildrenIds();
      else
        return child.id;
    }, this);

    return _.flatten(modelsId);
  },

  // Helpers
  countLeaves: function() {
    return this._countLeavesFor($.proxy(this._inc, this));
  },

  hasChildren: function() {
    return this.get("children").size() > 0;
  },

  // Internals methods
  _countLeavesFor: function(callback) {
    if (!this.hasChildren()) return callback(this, 0);
    return this.get("children").reduce(function(total, child) {
      if (child.hasChildren())
        return total + child._countLeavesFor(callback);
      else
        return total + callback(child, total);
    }, 0, this);
  },

  // Callbacks
  _inc: function() { return 1; }

});

var Trees = Backbone.Trees = Backbone.Collection.extend({
  model: Tree,
  getChildrenIds: function() {
    var modelsId = this.map(function(model) {
      return model.getChildrenIds();
    }, this);
    return _.flatten(modelsId);
  }
});
/*

Copyright (C) 2013 Acquisio Inc. V0.1.1

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

8594 -> ,8595 down arrow
<a href="#home/details/<%=id%>" style="text-decoration: none;">\
*/
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

var NodeView = Marionette.NodeView = Marionette.CompositeView.extend({
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

/*

Copyright (C) 2013 Acquisio Inc. V0.1.1

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

var TreeView = Marionette.TreeView = Marionette.CollectionView.extend({
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
})(this.Backbone, this.Marionette, this._, this.jQuery);