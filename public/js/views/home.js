var Tree = Backbone.Tree,
  Trees = Backbone.Trees,
TreeView=Marionette.TreeView ;

var cmbschild = new Trees([
                               new Tree({ label: "Loan", id: "1"}),
                               new Tree({ label: "Bond", id: "2"}),
                               new Tree({ label: "Deal", id: "3"}),
                               new Tree({ label: "Note", id: "4"}),
                               new Tree({ label: "Prop", id: "5"})
                            ]);
var kmbschild = new Trees([
                           new Tree({ label: "Loan", id: "11"}),
                           new Tree({ label: "Bond", id: "12"}),
                           new Tree({ label: "Deal", id: "13"}),
                           new Tree({ label: "Note", id: "14"}),
                           new Tree({ label: "Prop", id: "15"})
                        ]);


var trees = new Trees([
                       new Tree({ label: "CMBS", id: "0",children: cmbschild}),
                       new Tree({ label: "KMBS", id: "10",children: kmbschild})
                    ]);


window.HomeView = Backbone.View.extend({
	
	id: 'bodycontainer',
	
    initialize: function(){
        this.render();    
    },
    render: function(){
    	
    $(this.el).html(this.template());
    console.log(trees);
    this.$('#treeviewnode').html(new TreeView({ collection: trees }).render().el);
 
    return this;
              
    }     

});




//Example data object
/*var dataObject = [
    {
        id: 1,
        name: "Root Folder 1",
        leafs_array: [{id: 1, name: "Leaf 1"}, {id: 2,name: "Leaf 2"}]
    },
    {
        id: 1,
        name: "Root Folder 2",
        leafs_array: [{id: 3, name: "Leaf 3"}, {id: 4,name: "Leaf 4"}],
        folders_array: [
             {
                 id: 3,
                 name: "Child Folder 1",
                 leafs_array: [{id: 5, name: "Leaf 5"},{id: 6,name: "Leaf 6"}]
             }
         ]
     
    }
];*/

//var test = new BBTreeExample();