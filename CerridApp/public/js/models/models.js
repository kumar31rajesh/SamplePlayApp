window.Item = Backbone.Model.extend({

    urlRoot: "api/wines",

    initialize: function () {
        this.validators = {};

        this.validators.name = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };

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
    },

    defaults: {
        id: null,
        name: "",
        year:0 ,
        price:0,
        description: "",
        imageurl:"",
        country:"",
        region:""
    }
});

window.ItemCollection = Backbone.PageableCollection.extend({

    model: Item,

    url: "api/wines",
    
    state: {
        pageSize: 10
      },
    
     mode: "client" // page entirely on the client side

});




