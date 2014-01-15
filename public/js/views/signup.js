window.AdminAuthenticationView = Backbone.View.extend({

	
    initialize: function () {
      this.render();
    	
    },
    events: {
        "click #signup"   : "validateAdminDetails"
    },
    validateAdminDetails: function () {
    	this.model.set("username",this.$el.find("#adminusername").val());
        this.model.set("password",this.$el.find("#adminpassword").val());
        
        this.model.url="/api/validateAdmin";
       
        
        this.model.save({},
        		{
            success: function(model, response) {
            	
            	if(response.isValid=="True"){
            	
            	$(".content").html((new SignUpView({model:new Authentication()})).el);
            	}
            	else
            	utils.showAlert('Warning !', response.message, 'alert-warning');
                
                							},
            error: function(model, response) {
            	   
            								 }
        		}
        );
        
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
        "click #save"   : "saveUserDetails"
    },
    saveUserDetails: function () {
    	this.model.set("username",this.$el.find("#username").val());
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
        
    }
    ,

    render: function () {
    	
        $(this.el).html(this.template());
        return this;
    }

});