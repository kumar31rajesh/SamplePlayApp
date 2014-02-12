window.Authentication = Backbone.Model.extend({	
url:"/api/authenticate",
initialize: function () {
    this.validators = {};

    this.validators.email = function (value) {
        return value.length > 0 ? {isValid: true} : {isValid: false, message: "Please Enter Email"};
    };
    this.validators.password = function (value) {
        return value.length > 0 ? {isValid: true} : {isValid: false, message: "Please Enter Password"};
    };

},


defaults: {
	message:"Sign In to Analytics",
	email:"",
    password: "",
    domain:"",
    isLoggedIn:false
},
validateItem: function (key) {
    return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
},

validateAll: function () {
	var messages = {};
	for (var key in this.validators) {
        if(this.validators.hasOwnProperty(key)) {
            var check = this.validators[key](this.get(key));
            if (check.isValid === false) {
                messages[key] = check.message;
            }
        }
    }
	
	return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};

}

});



window.HeaderModel= Backbone.Model.extend({	

	defaults: {
		logo:"assets/img/cerrid_logo_retina12.png",
	    username: "",
	    domain:"",
	    isLogedIn:false
	}

	});


window.LoanModel=Backbone.Model.extend({	

	defaults: {
		id:0,
	    name: "",
	    amount: 0,
	    age:0,
	    salary:0
	}

	});

window.LoanDetails = Backbone.Collection.extend({
	model:LoanModel,
	url: function(){
	return "/api/details/"+this.searchTerm;
	}
	});




window.Tree = Backbone.Model.extend({

  defaults: {
    id: 0,
    label: "item",
    children:[]
  },

  initialize: function() {
	  
    if (!this.get("children")){

    	this.set("children", new Trees());
    	
    }else{
    	//this.set("children", new Trees(this.get("children")));
    	
    	if (this.get("children").isArray){
    		
    		this.set("children", new Trees(this.get("children")));
        	
        	console.log(JSON.stringify(this.get("children")));
    	}
    	
    }
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
    return this.get("children").length > 0;
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

window.Trees  = Backbone.Collection.extend({

  model: Tree,
  getChildrenIds: function() {
    var modelsId = this.map(function(model) {
      return model.getChildrenIds();
    }, this);
    return _.flatten(modelsId);
  }
});



window.Project= Backbone.Model.extend({

	defaults: {
	    id: 0,
	    name: "Root",
	    children:[]
	  }

	  });

window.Projects=Backbone.Collection.extend({
	
	model: Project	
	
});

window.DataSet=Backbone.Model.extend({
	
	defaults:{
		label:"",
		name:"",
		path:"",
		type:"",
		id:""
	}
	
});

window.DataSetCollection=Backbone.Collection.extend({
	
	model: DataSet,
	url: function(){
		return "/api/dataSource/"+this.searchTerm;
		}
	
});







