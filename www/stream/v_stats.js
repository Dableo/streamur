define(["d3"],function(d3){
	"use strict";
	function v_Stats(node) {
		var node = node;

		//update
		var stat = d3.select(node).selectAll("label")
			.data([
				{label: "BPM", value: 0},
				{label: "Unstable Rate", value: 0},
				{label: "Combo", value: 0}
			]);
		//enter
		stat.enter().append("label")
			.text(function(d) { return d.label })
			.attr("for", function(d) {return d.label})
				.append("input")
				.attr("readonly", '')
				.attr("name", function(d) {return d.label})
				.attr("value", function(d) {return d.value});
		//exit
		stat.exit().remove();

		this.update = function(data) {
			//update hud with current data (every new beat)
			d3.select(node).selectAll("label").data(data)
				.select("input")
				.attr("value", function(d) {return Math.round(d.value)});
		}
		this.updateBest = function(data) {

		}
	}
	return v_Stats;
});