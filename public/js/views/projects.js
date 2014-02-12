var projecttemplateNode = _.template('\
		<%if(hasChildren){%>\
		<a href="#projects/datasourcelist/<%=label%>" style="text-decoration: none;">\
		<%}else{%>\
		<a href="#projects/datasourcelist/<%=label%>" style="text-decoration: none;">\
		<%}%>\
	    <%=(hasChildren ? "<span class=tree-view-chevron><i class=icon-plus-sign></i></span>" : "")%>\
	    <label for="<%=autoId%>" class="tree-view-label"><%=label%></label>\
		</a>\
		<ul class="tree-view-list">\
	    </ul>\
	  	');



var ProjectNodeView  = Marionette.CompositeView.extend({
	  tagName: "li",
	  className: "tree-view-node",
	  template: projecttemplateNode,
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
	    this.children.each(function(child) { console.log(JSON.stringify(child));child.expand(); });
	  },

	  collapse: function() {
	    this.$el.removeClass("open");
	    this.switchChevron();
	    this.children.each(function(child) { child.collapse(); });
	  }
	});




window.ProjectTreeView  = Marionette.CollectionView.extend({
	  itemView: ProjectNodeView,
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



var objHierarchArray=new Array();

window.ProjectView=Backbone.View.extend({
   
    initialize: function() {
       
        this.render();
    },
    render: function() {
        
        $(this.el).html(this.template());
        
        var data=[
                  {
                      "label": "Project1",
                      "id": 1,
                      "children": [
                          {
                              "label": "Folder1",
                              "id": 11,
                              "children": [
                                  {
                                      "label": "LoanData",
                                      "id": 111,
                                      "children": []
                                  }
                              ]
                          },
                          {
                              "label": "Folder2",
                              "id": 20,
                              "children": []
                          }
                      ]
                  }, {
                      "label": "Project2",
                      "id": 2,
                      "children": [
                          {
                              "label": "Folder1",
                              "id": 22,
                              "children": [
                                  {
                                      "label": "LoanData",
                                      "id": 222,
                                      "children": []
                                  }
                              ]
                          },
                          {
                              "label": "Folder2",
                              "id": 25,
                              "children": []
                          }
                      ]
                  }
              ] ;
     
        
        this.$('#sidebar-content').html(new ProjectTreeView({ collection: this.generateFolderTree(data)}).render().el);
  
        
        
       return this;
    },
    generateFolderTree:function(data){
    	
    	var folderObj=new Array();

    		
    	if(data.length>0){
    		
    		for(var i=0;i<data.length;i++){
    			
        		folderObj[i]=new Tree({label:data[i].label,id:data[i].id,children:this.generateFolderTree(data[i].children)});
        	 			
        	}	
    		
    		return new Trees(folderObj);
    		
    	}
    	
    
    }
    
 });

window.DataSourceView=Backbone.View.extend({
   
    initialize: function() {
    	
        this.render();
    },
    render: function() {

       $(this.el).html(this.template(this.model.toJSON()));
            
        return this;
    }
    
 });


window.DataSourceListingView=Backbone.View.extend({
	tagName:"tr",
	
    initialize: function() {
        this.render();
    },
    render: function() {
    	
    	$(this.el).append("<td>"+this.model.get("name")+"</td><td>"+this.model.get("type")+"</td><td><a =\"#dataSourceEdit\"><i class=\"icon-edit\"></i></a></td><td><a =\"#dataSourceEdit\"><i class=\"icon-remove\"></i></a></td>");
    	
        return this;
    }
    
 });

window.DataSourceCreateView=Backbone.View.extend({
   
    initialize: function() {
    	
        this.render();
    },
    render: function() {
    		
        $(this.el).html(this.template(this.model.toJSON()));
            
        return this;
    },
    events: {
        "click #upload"   : "uploadFile"
    },
    uploadFile:function(){
    	
    	var formData = new FormData($("#uplaoadForm")[0]);
   
        $.ajax({
            url: "/api/uplaodDataSourceCSVFile",
            type: "POST",
            data: formData,
            async: true,
            beforeSend: function(){
            	
            	$("#myModal").modal('show');
            	
            	$('#myModal .bar').css('width','30%');
            	
            	setTimeout(function() {
                  
            		$('#myModal .bar').css('width','80%'); 
            	
                }, 1000);
            
            	},
            
            complete: function(xhr){
            	
            	$("#myModal").modal('hide');
            	},
            error: function(xhr){
               
            	$("#myModal").modal('hide');
                	},
           
            cache: false,
            contentType: false,
            processData: false,
            
        });
        
        return false;
    }
    
 });



