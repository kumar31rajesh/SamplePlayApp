window.LoginView = Backbone.View.extend({
	tagName:"div",
	className:"row",
	
    initialize: function () {
      this.render();
    	
    },

    render: function () {
    	
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
    	"change"        : "change",
        "submit #login-form"   : "login"
    },
    change: function (event) {
    	
        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);
   
        // Run validation rule (if any) on changed item
        var check = this.model.validateItem(target.id);

        if (check.isValid === false) {
            utils.addValidationError(target.id, check.message);
        } else {
        	
            utils.removeValidationError(target.id);
        }
    },
   
    login: function () { 

    this.model.set("email",this.$el.find("#email").val());
    this.model.set("password",this.$el.find("#password").val());
    this.model.set("domain",this.$el.find("#domain").val());
    
    var validate=this.model.validateAll() ;
  
    	if(validate.isValid){  
        this.model.save({},
        		{
            success: function(model, response) {
                console.log('success! ' + response.status);
                if(response.status== 'home'){
                	model.set("isLoggedIn",true);
                	
                	if(typeof(Storage)!=="undefined")
                	  {
                		sessionStorage.setItem("isLoggedIn", true);
                	  }
                	
                	app.navigate('#home', true);	  	
                
                }
                else
                utils.showAlert('Warning !', 'Please Enter valid UserName and Password', 'alert-warning');
                
            },
            error: function(model, response) {
            	utils.showAlert('Error !', 'Error in Connection', 'alert-error');     
            								 }
        		}
        );
    	}else{
    		
    		utils.displayValidationErrors(validate.messages);	
    	}
    	
    	
    	return false;

    }
   

});

window.AdminAuthenticationView = Backbone.View.extend({

	
    initialize: function () {
      this.render();
    	
    },
    events: {
        "submit #Signup-form"   : "validateAdminDetails"
    },
    validateAdminDetails: function () {
    	this.model.set("email",this.$el.find("#adminEmail").val());
        this.model.set("password",this.$el.find("#adminPassword").val());
        
        this.model.url="/api/validateAdmin";
       
        
        this.model.save({},
        		{
            success: function(model, response) {
            	
      
            	
            	if(response.isValid=="True"){
            	
            	$("#content").html((new SignUpView({model:new Authentication()})).el);
            	}
            	else
            	utils.showAlert('Warning !', response.message, 'alert-warning');
                
                							},
            error: function(model, response) {
            	   
            								 }
        		}
        );
        
        return false;
        
    }
    ,

    render: function () {
    	
        $(this.el).html(this.template());
        return this;
    }

});

window.SignUpView=Backbone.View.extend({

	
    initialize: function () {
      this.render();
    	
    },
    events: {
        "submit #register-form"   : "saveUserDetails"
    },
    saveUserDetails: function () {
 
    	this.model.set("email",this.$el.find("#email").val());
        this.model.set("password",this.$el.find("#password").val());
        this.model.set("domain",this.$el.find("#domain").val());
        
        this.model.url="/api/saveUser";
       
        
        this.model.save({},
        		{
            success: function(model, response) {
            	
            	if(response.isSaved=="true"){
            	utils.showAlert('Success !', 'User Saved Successfully', 'alert-info');
            	}
            	if(response.isSaved=="false"){
            	utils.showAlert('Warning !',response.message , 'alert-warning');	
            	}
                
                							},
            error: function(model, response) {
            	utils.showAlert('Error !','Error in Connection', 'alert-warning');  
            								 }
        		}
        );
        
        return false;
        
    }
    ,

    render: function () {
    	
        $(this.el).html(this.template());
        return this;
    }

});

var templateNode = _.template('\
		<%if(hasChildren){%>\
		<a href="javascript:void(0);" desc="parent" style="text-decoration: none;"  >\
		<%}else{%>\
		<a href="javascript:void(0);"  desc="child" style="text-decoration: none;"  >\
		<%}%>\
	    <%=(hasChildren ? "<span class=tree-view-chevron><i class=icon-plus-sign></i></span>" : "")%>\
	    <label for="<%=autoId%>" class="tree-view-label"  data-id="<%=id%>" data-label="<%=label%>" ><%=label%></label>\
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
	    this.el.id =  this.model.get('label');
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


window.DataViewer = Backbone.View.extend({
	tagName:"div",
	className:"row",
	
    initialize: function(){
    	_.bindAll(this, "render", "renderData");
        this.render();    
    },
    render: function(){
    	
    	
    $(this.el).html(this.template());
    
    var data=[
              {
                  "label": "CMBS",
                  "id": 1,
                  "children": [
                      {
                          "label": "LoanData",
                          "id": "52d786eb44ae1f357323d228",
                          "children": []
                      },
                      {
                          "label": "BondData",
                          "id": 12,
                          "children": []
                      },
                      {
                          "label": "CollatralData",
                          "id": 13,
                          "children": []
                      }
                  ]
              }
          ] ;
    
    this.$('#datasetTree').html(new TreeView({ collection: this.generateFolderTree(data)}).render().el);
    	
    return this;
              
    }  
    ,
    generateFolderTree:function(data){
    	
    	var folderObj=new Array();

    		
    	if(data.length>0){
    		
    		for(var i=0;i<data.length;i++){
    			
        		folderObj[i]=new Tree({label:data[i].label,id:data[i].id,children:this.generateFolderTree(data[i].children)});
        	 			
        	}	
    		
    		return new Trees(folderObj);
    		
    	}
    	
    
    },
    events: {
    	"click a[desc='child']" : "renderData",
    	"click #loadTable" : "renderTableData"
    },
    renderData:function(e){
    
    	var heirarchy=$(e.target).parents().map(function() { if(this.tagName=="LI")return this.id;}).get().join( "," ).split(",").reverse().join("/");
    	$("#hierarchylevel").empty();
    	$("#hierarchylevel").append(heirarchy);
    	
    	$("#loadTable").attr("data-id",$(e.target).attr("data-id"));
    	
    	
    	$.ajax({
            type: "POST", 
            url: "/api/details", 
            dataType:"json",
            data:{dataid:$(e.target).attr("data-id"),datacolumns:null},
            success: function (response) {

            var columnsfilters="<select  multiple=\"multiple\" id=\"column_Select\" class=\"form-control\" >";
          	   
           	  for(var i=0;i<response.aoColumns.length;i++){
           		  columnsfilters=columnsfilters+"<option vaule='"+response.aoColumns[i].mData+"'>"+response.aoColumns[i].sTitle+"</option>" ;
           	  }
           	  columnsfilters=columnsfilters+"</select>";
         	
          	 $('#columnfilters').empty();
             $('#columnfilters').html(columnsfilters);
             $('.awidget-body').empty();
             $('.awidget-body').html( '<table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-hover table-bordered " id="example"></table>' );
       
          	$('#example').dataTable({
          			 "bDestroy":true,
         	       	 "sScrollY": "380px",
         	       	 "sScrollX": "965px",
         	     	 "bPaginate": false,
         	     	 "bFilter": false,
         	     	 "bInfo": false,
         	     	 "aoColumns":response.aoColumns,
         	     	 "aaData":response.aaData
         	         });
        
     
          	
          	 
            },
            error: function(){
          	 
            }
        });
    	
   	  
      	$('body').on('mouseover', '.table thead tr th', function () {
    		
		    $(this).popover('show');
		    
		});
      	
      	$('body').on('mouseout', '.table thead tr th', function () {
    		
		    $(this).popover('hide');
		});
      	
      
    },renderTableData:function(e){
    
      var columns=($("#column_Select").val()).join();
      
      
    	$.ajax({
            type: "POST", 
            url: "/api/details", 
            dataType:"json",
            data:{dataid:$(e.target).attr("data-id"),datacolumns:columns},
            success: function (response) {

        /*    var columnsfilters="<select  multiple=\"multiple\" id=\"column_Select\" class=\"form-control\" >";
          	   
           	  for(var i=0;i<response.aoColumns.length;i++){
           		  columnsfilters=columnsfilters+"<option vaule='"+response.aoColumns[i].mData+"'>"+response.aoColumns[i].sTitle+"</option>" ;
           	  }
           	  columnsfilters=columnsfilters+"</select>";
           	  
           	
            $('#columnfilters').empty();
            $('#columnfilters').html(columnsfilters);*/
            $('.awidget-body').empty();
          	$('.awidget-body').html( '<table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-hover table-bordered " id="example"></table>' );
          	  
          	  $('#example').dataTable({  
          		  	 "bDestroy":true,
          	       	 "sScrollY": "380px",
          	       	 "sScrollX": "965px",
          	     	 "bPaginate": false,
          	     	 "bFilter": false,
          	     	 "bInfo": false,
          	     	 "aoColumns":response.aoColumns,
          	     	 "aaData":response.aaData
          	         });
         
          	 
            },
            error: function(xhr){
          	 alert(xhr);
            }
        });
    	
   	  
      	$('body').on('mouseover', '.table thead tr th', function () {
    		
		    $(this).popover('show');
		});
      	
      	$('body').on('mouseout', '.table thead tr th', function () {
    		
		    $(this).popover('hide');
		});
      	
      
    }

});



window.ProjectsView = Backbone.View.extend({
	tagName:"div",
	className:"row",
	
    initialize: function(){
    	
        this.render();    
    },
    render: function(){
    	
    	
    $(this.el).html(this.template());
    
    var data=[
              {
                  "label": "Cerrid",
                  "id": 1,
                  "children": [
                      {
                          "label": "loan",
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
                          "label": "Bond",
                          "id": 20,
                          "children": []
                      }
                  ]
              }, {
                  "label": "MyData",
                  "id": 2,
                  "children": [
                      {
                          "label": "MasterLoan",
                          "id": 22,
                          "children": [
                              {
                                  "label": "MasterLoanData",
                                  "id": 222,
                                  "children": []
                              }
                          ]
                      },
                      {
                          "label": "MasterBond",
                          "id": 25,
                          "children": []
                      }
                  ]
              }
          ] ;
    
    this.$('#projectsTree').html(new TreeView({ collection: this.generateFolderTree(data)}).render().el);
    	
    return this;
              
    }  
    ,
    generateFolderTree:function(data){
    	
    	var folderObj=new Array();

    		
    	if(data.length>0){
    		
    		for(var i=0;i<data.length;i++){
    			
        		folderObj[i]=new Tree({label:data[i].label,id:data[i].id,children:this.generateFolderTree(data[i].children)});
        	 			
        	}	
    		
    		return new Trees(folderObj);
    		
    	}
    	
    
    },
    events: {
    	"click a" : "renderData",
    	"click #createDataSet":"createDataSource"
    },
    renderData:function(e){
   
    	var heirarchy=$(e.target).parents().map(function() { if(this.tagName=="LI")return this.id;}).get().join( "," ).split(",").reverse().join("/");
    	
    	$(".mainy").html((new DataSourceListView()).el);
    	
    	$("#hierarchylevel").empty();
    	$("#hierarchylevel").append(heirarchy);
    	
    	$("#createDataSet").attr("data-label",$(e.target).attr("data-label"));
    	$("#createDataSet").attr("data-id",$(e.target).attr("data-id"));
    	$("#createDataSet").attr("data-parent",heirarchy);

    	
		 this.datasetCollection=new DataSetCollection();
		 this.datasetCollection.searchTerm=$(e.target).attr("data-label");
	     this.datasetCollection.fetch({
	            success: function (collection, response) {
	            	
	            	$('#datasourcelist tbody').empty();
	            	if(collection.size()>0){
	            		
	            		 collection.each(function(model){
	 	                	
	 	                	$('#datasourcelist tbody').append((new DataTableListingView({model:model})).el);
	 	                	
	 	                })
	            		
	            	}else{
	            		
	            		$('#datasourcelist tbody').append("<tr><td colspan=\"4\">No DataSets Found</td></tr>");
	            		
	            	}
	               
	            
	            },
	            error: function (collection, response) {
	            		console.log('asd');
	            }
	        });
    },
    createDataSource:function(e){
    	//alert($(e.target).attr("data-label"));
    	//dataSetContent
    	this.dataset=new DataSet();
		this.dataset.set("label",$(e.target).attr("data-label"));
		this.dataset.set("name",$(e.target).attr("data-label"));
		this.dataset.set("id",$(e.target).attr("data-id"));
		this.dataset.set("path",$(e.target).attr("data-parent"));
		
		$('.mainy').empty();
		$('.mainy').html((new DataSourceCreateView({model:this.dataset})).el);
		$("#hierarchylevel").empty();
    	$("#hierarchylevel").append($(e.target).attr("data-parent"));
    }

});


window.DataTableListingView=Backbone.View.extend({
	tagName:"tr",
	
    initialize: function() {
        this.render();
    },
    render: function() {
    	
    	$(this.el).append("<td>"+this.model.get("name")+"</td><td>"+this.model.get("type")+"</td><td><a href=\"\"><span class=\"label label-default\">Edit</span></a></td><td><a href=\"\"><span class=\"label label-danger\">Delete</span></a></td>");
    	
        return this;
    }
    
 });

window.DataSourceListView=Backbone.View.extend({
	   
    initialize: function() {
    	
        this.render();
    },
    render: function() {

       $(this.el).html(this.template());
            
        return this;
    }
    
 });

window.DataSourceCreateView=Backbone.View.extend({
	   
    initialize: function() {
    	this.dataset=new DataSet();
        this.render();
    },
    render: function() {
    		
        $(this.el).html(this.template(this.model.toJSON()));
            
        return this;
    },
    events: {
        "click #upload"   : "uploadFile"
    },
    uploadFile:function(e){
    	self=this;
		this.dataset.set("label",$(e.target).attr("data-label"));
		this.dataset.set("name",$(e.target).attr("data-label"));
		this.dataset.set("id",$(e.target).attr("data-id"));
		this.dataset.set("path",$(e.target).attr("data-parent"));
    	
    	var formData = new FormData($("#uplaoadForm")[0]);
    	
    	$("#myModal").modal('show');
   
        $.ajax({
            url: "/api/uplaodDataSourceCSVFile",
            type: "POST",
            data: formData,
            async: true,
            beforeSend: function(){
            	
            	$("#myModal").modal('show');
            	
           
            
            	},
            
            complete: function(xhr){
            	
            	$("#myModal").modal('hide');
          
            	self.displayDataSetListView();
            	
            	},
            error: function(xhr){
               
            	$("#myModal").modal('hide');
                	},
           
            cache: false,
            contentType: false,
            processData: false,
            
        });
        
        return false;
    },
    displayDataSetListView:function(){
    	
    	$(".mainy").html((new DataSourceListView({model:this.dataset})).el);
    	
    	$("#hierarchylevel").empty();
    	$("#hierarchylevel").append(this.dataset.get("path"));
    	
    	$("#createDataSet").attr("data-label",this.dataset.get("label"));
    	$("#createDataSet").attr("data-id",this.dataset.get("id"));
    	$("#createDataSet").attr("data-parent",this.dataset.get("path"));
    	
		 this.datasetCollection=new DataSetCollection();
		 this.datasetCollection.searchTerm=this.dataset.get("name");
	     this.datasetCollection.fetch({
	            success: function (collection, response) {
	            	
	            	$('#datasourcelist tbody').empty();
	            	if(collection.size()>0){
	            		
	            		 collection.each(function(model){
	 	                	
	 	                	$('#datasourcelist tbody').append((new DataTableListingView({model:model})).el);
	 	                	
	 	                })
	            		
	            	}else{
	            		
	            		$('#datasourcelist tbody').append("<tr><td colspan=\"4\">No DataSets Found</td></tr>");
	            		
	            	}
	               
	            
	            },
	            error: function (collection, response) {
	            		console.log('asd');
	            }
	        });
    }
    
 });


window.DataSetsBuilderView=Backbone.View.extend({
	   
    initialize: function() {
    	this.dropedfields=new Array();
    	this.dataSourceFields=new Array();
    	this.selectedDS=new Array();
        this.render();
    },
    render: function() {

       $(this.el).html(this.template());
       
       this.datasetCollection=new DataSetCollection();
       this.datasetCollection.searchTerm="LoanData";
	     this.datasetCollection.fetch({
	            success: function (collection, response) {
	            	
	            	$('#dataSets').empty();
	            	$('#dataSet1').empty();
	            	$('#dataSet2').empty();
	            	
	            	if(collection.size()>0){
	            		
	            		var options="<option value=\"\">Select DataSet</option>" ;
	            			
	            		
	            		 collection.each(function(model){
	 	                	
	            			 options=options+"<option data-label=\'"+model.get("label")+"\' value=\'"+model.get("filepath")+"\'>"+model.get("name")+"</option>";
	 	                	
	 	                });
	            		
	 	               $('#dataSets').append(options);
	 	               $('#dataSet1').append(options);
	 	               $('#dataSet2').append(options);
	 	              
	            		
	            	}else{
	            		
	            		$('#dataSets').append("<option>No DataSets Found</option>");
	            		$('#dataSet1').append("<option>No DataSets Found</option>");
	            		$('#dataSet2').append("<option>No DataSets Found</option>");
	            	
	            		
	            	}
	               
	            
	            },
	            error: function (collection, response) {
	            		
	            }
	        });

            
        return this;
    },
    events: {
        "change #dataSets"   : "renderColumns",
        "change #dataSet1"   : "renderColumns",
        "change #dataSet2"   : "renderColumns",
        
        "dragenter  .list-group-item": "dragEnterEvent",
        "dragleave  .list-group-item": "dragLeaveEvent",
        "drop 		#measuresCol": "dropMEvent",
        "dragover 	#measuresCol": function(ev) {
                ev.preventDefault();
            },
          "click #addFilter":"addFilters",
          "click #addMore":"addMoreFilters"
    },
    renderColumns:function(e){
    	self=this;
    	$.ajax({
            url: "/api/loadFileContents",
            type: "POST",
            data: {filepath:$(e.target).val()},
            beforeSend: function(){
            	
            	$("#myModal").modal('show');
            
            	},
            
            complete: function(response){
            	
            	$("#myModal").modal('hide');
          
            	var output=response.responseText.split(",");
            	
            	var id=$(e.target).attr("id");
            
            	if(id=="dataSets"){
            		
            		var columns="<div class=\"list-group\">";
                    
                	for(var i=0;i<output.length;i++){
                		self.dataSourceFields.push({datasource:$("#"+id).children("option").filter(":selected").text(),name:output[i],filepath:$(e.target).val()});
                		columns=columns+"<a href=\"javascript:void(0)\" class=\"list-group-item \" draggable=\"true\" data-id=\'"+output[i]+"'\>"+output[i]+"</a>";
                	}
                	
                	columns=columns+"</div>" ;
                	
                	$("#columnsGroup").empty();
                	$("#columnsGroup").append(columns);
            		
            		
            	}else if(id=="dataSet1"){
            		
            		var columns;
                    
                	for(var i=0;i<output.length;i++){
                		columns=columns+"<option value=\'"+output[i]+"'\>"+output[i]+"</option>";
                	}
                	
                	
                	$("#dataSet1Col").empty();
                	$("#dataSet1Col").append(columns);
            		
            	}else if(id=="dataSet2"){
            		
            		var columns;
                    
                	for(var i=0;i<output.length;i++){
                		columns=columns+"<option value=\'"+output[i]+"'\>"+output[i]+"</option>";
                	}
                	
                	
                	$("#dataSet2Col").empty();
                	$("#dataSet2Col").append(columns);
            		
            		}
            		
            	},
            error: function(xhr){
               
            	$("#myModal").modal('hide');
                	}
            
        });
    	
    	
    },
    dragEnterEvent:function(e){
    	e.preventDefault();
    },
    dragLeaveEvent:function(e){
    	
    	e.preventDefault();
    }
    ,dropMEvent:function(e){ 	
    	
    	e.preventDefault();
    	
    	e.dataTransfer = e.originalEvent.dataTransfer;
    	
    	var data=e.dataTransfer.getData('text/html');
    	
    	var field=data.replace(/(<([^>]+)>)/ig,"") ;
   
    	var a = this.dataSourceFields;
    	var index = 0;
    	var found;
    	var entry;
    	for (index = 0; index < a.length; ++index) {
    	    entry = a[index];
    	    if (entry.name==field) {
    	        found = entry;
    	        break;
    	    }
    	}
    	
    	this.dropedfields.push(found.datasource+"."+found.name);
    	  	
    	this.selectedDS.push({dsname:found.datasource,filepath:found.filepath});
    	
    	/*
    	var item=new Array();
    	$.each(this.selectedDS,function(index,value){
    		alert(index+">>>>>"+JSON.stringify(value));
    		
    		$.each(item,function(j,ds){
    			
    		})
    		if(value.datasource)
    		item.push(value);
    	});*/
 /*   	
    	var data =this.selectedDS;
    	var groups = [];
    	$.each(this.selectedDS, function(i, item) {
    	    $.each(item, function(j, group) {
    	        if ($.inArray(group, groups) == -1) {
    	            groups.push(group);
    	            $('#dataSet1').append("<option value=\'"+group.filepath+"'\>"+group.datasource+"</option>");
    	            $('#dataSet2').append("<option value=\'"+group.filepath+"'\>"+group.datasource+"</option>");
    	        }
    	    });    
    	});*/
    	
    	//alert(JSON.stringify(groups));
    	
 
       // $('#dataSet1').append("<option value=\'"+found.filepath+"'\>"+found.datasource+"</option>");
       // $('#dataSet2').append("<option value=\'"+found.filepath+"'\>"+found.datasource+"</option>");
        
       
    
    	$("#measuresCol .panel-body").append("<li class=\"list-group-item\">"+found.datasource+"."+found.name+"</li>");
    	
    	
    },
    addFilters:function(e){
  	
    	var sele="<div class=\"row\" style=\"padding-top:5px;\"><div class=\"col-md-4\"><select class=\"form-control\">" ;
    	
    	for(var i=0;i<this.dropedfields.length;i++){
    		sele=sele+"<option>"+(this.dropedfields)[i]+"</option>";
    	}
    	
    	sele=sele+"</select></div>";
    	
    	sele=sele+"<div class=\"col-md-4\"><select class=\"form-control\"><option value=\"\">>=</option><option value=\"\">=</option><option value=\"\"><=</option></select></div>"
    	
    	sele=sele+"<div class=\"col-md-4\"><input type=\"text\" class=\"form-control\"></div></div>";
    	
    	$("#filters").append(sele);
    	
    },
    addMoreFilters:function(e){
    	
    	var sele="<div class=\"row\" style=\"padding-top:5px;\">" +
    			 "<div class=\"col-md-3\"><select class=\"form-control\"></select></div>"+
    			 "<div class=\"col-md-2\"><select class=\"form-control\"></select></div>"+
    			 "<div class=\"col-md-2\"><select class=\"form-control\"></select></div>"+
    			 "<div class=\"col-md-3\"><select class=\"form-control\"></select></div>"+
    			 "<div class=\"col-md-2\"><select class=\"form-control\"></select></div>"+	
                 "</div>";
    	
    	$("#filter1").after(sele);
    	
    }
   
    
    
 });

window.HeaderView=Backbone.View.extend({
	   
    initialize: function() {
    	this.model.bind('change', this.render, this);
        this.render();
    },
    render: function() {

       $(this.el).html(this.template(this.model.toJSON()));
            
        return this;
    },
    events: {
        "click .dropdown-submenu li a"   : "renderGrid"

    },
    renderGrid:function(e){
    	
    	app.navigate("#newlayout",true);
    	
    }
    
 });

window.GridLayoutView=Backbone.View.extend({
	
	 initialize:function(){
		 
		 this.render();
		 
	 },
	 render:function(){
		 $(this.el).html(this.template());
		 return this;
	 },
	 
	 events:{
		"click button[desc='chartSettings']":"ChartSettingModel" 
		 
	 },
	 ChartSettingModel:function(e){
		 $("#chartSettings").modal("show") ;
	 }
});

