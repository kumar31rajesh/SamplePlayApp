window.Authentication = Backbone.Model.extend({	
url:"/api/authenticate",
initialize: function () {
    this.validators = {};

    this.validators.username = function (value) {
        return value.length > 0 ? {isValid: true} : {isValid: false, message: "Please Enter UserName"};
    };
    this.validators.password = function (value) {
        return value.length > 0 ? {isValid: true} : {isValid: false, message: "Please Enter Password"};
    };

},


defaults: {
	message:"Sign In to Analytics",
    username: "",
    password: "",
    domain:""
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
    label: "item"
  },

  initialize: function() {
    if (!this.get("children")) this.set("children", new Trees());
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

window.Trees  = Backbone.Collection.extend({

  model: Tree,
  getChildrenIds: function() {
    var modelsId = this.map(function(model) {
      return model.getChildrenIds();
    }, this);
    return _.flatten(modelsId);
  }
});

window.Product= Backbone.Model.extend({

	defaults: {
	    id: 0,
	    name: "Product1"
	  }

	  });

window.Products=Backbone.Collection.extend({
	
	model: Product	
	
});







