window.LoginView = Backbone.View.extend({

	
    initialize: function () {
      this.render();
    	
    },

    render: function () {
    	
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
    	"change"        : "change",
        "click #login"   : "login"
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

                	var headermodel=new HeaderModel();
                	headermodel.set("username",model.get("email"));
                	headermodel.set("isLogedIn",true);
                	var headerview=new HeaderView({model:headermodel}) ;
                	
                	$('#header').html(headerview.el);
                
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

    }

});