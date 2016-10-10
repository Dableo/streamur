//graph visual module, might use D3
define(["d3"],function(d3){
	"use strict";
	function v_Graph(node) {
		//mod for hitwindow, reflects osu settings
		this.od = 9;
		var width = 1280;
		var height = 720;
		var margin = {top:24,right:24,bottom:24,left:48}
		var svg = d3.select(node).append("svg")
			.attr("viewBox", width/-2+" "+height/-2+" "+width+" "+height);
		this.update = function(beat) {
			//update graph with new beat
		}
	}
	return v_Graph;
});