define(["./v_stats"],function(v_Stats){
	"use strict";
	function Stats(){
		var view;
		this.avgDelta = function() {
			return 20;
		}
		this.addView = function(node) {
			view = new v_Stats(node);
		}
	};
	return Stats;
});
