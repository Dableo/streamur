//graph visual module, might use D3
define(["d3","./od"],function(d3,OD){
	"use strict";
	function v_Graph(node) {
		//mod for hitwindow, reflects osu settings
		this.od = new OD(9);
		var width = 1280;
		var height = 720;
		var y = d3.scale.linear()
			.domain()
		var svg = d3.select(node).append("svg")
			.attr("viewBox", width/-2+" "+height/-2+" "+width+" "+height);
		this.update = function(beat) {
			//update graph with new beat
		}
	}
	return v_Graph;
});