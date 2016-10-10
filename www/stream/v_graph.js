//graph visual module, might use D3
define(["d3","./od"],function(d3,OD){
	"use strict";
	function v_Graph(node) {
		//mod for hitwindow, reflects osu settings
		this.od = new OD(9);
		var width = 1200;
		var height = 720;
		var margin = {top: 0, right:0, bottom: 0, left: 24}
		// var hitwindowPad = 50;
		// var y = d3.scale.linear()
		// 	.domain((od.miss + od.pad)*2)
		// 	.range(height);
		var svg = d3.select(node).append("svg")
			.attr("viewBox", -margin.left + " " + height/-2 + " " + width + " " + height)
			.append("g");
		this.update = function(beat) {
			//update graph with new beat
		}
	}
	return v_Graph;
});