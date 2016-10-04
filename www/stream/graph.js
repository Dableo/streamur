define(["./v_graph"],function(v_Graph){
	"use strict";
	function Graph() {
		var view;

		this.addView = function(node) {
			view = new v_Graph(node);
		}
	}
	return Graph;
});