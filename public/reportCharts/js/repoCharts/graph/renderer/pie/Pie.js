RepoCharts.namespace('RepoCharts.Graph.Renderer.Pie');

RepoCharts.Graph.Renderer.Stack = RepoCharts.Class.create( RepoCharts.Graph.Renderer, {

	name: 'pie',

	defaults: function($super) {

		return RepoCharts.extend( $super(), {
			fill: true,
			stroke: false,
			unstack: false
		} );
	},
	initialize: function($super, args) {
		args = args || {};
		$super(args);
	},
	seriesPieFactory: function(args, data) {

		var graph = this.graph;
		var color = d3.scale.category20c();     
		 var arc = d3.svg.arc().outerRadius(args.radius);
 
    	var pie = d3.layout.pie()           
        .value(function(d) { return d.y; });    
 
    var arcs = args.vis.selectAll("g.slice")     
        .data(pie)                          
        .enter()                            
            .append("svg:g")                
                .attr("class", "slice");    
 
        arcs.append("svg:path")
                .attr("fill", function(d, i) { return color(i); } ) 
                .attr("d", arc);                                    
 
        arcs.append("svg:text")                                     
                .attr("transform", function(d) {                   
                d.innerRadius = 0;
                d.outerRadius = args.radius;
                return "translate(" + arc.centroid(d) + ")";        
            })
            .attr("text-anchor", "middle")                          
            .text(function(d, i) { return data[i].x; }); 

		
		return arcs;
	}
} );

