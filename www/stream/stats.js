define(["./v_stats"],function(v_Stats){
	"use strict";
	function Stats(){
		var view;
		var beatHistory = [];
		var avgDelta = 'N/A';
		var avgBPM = 'N/A';
		var unstableRate = 'N/A';
		var combo = 0;
		this.avgDelta = function() {
			return 20;
		}
		this.addView = function(node) {
			view = new v_Stats(node);
		}
		this.getBeat = function(beat) {
			combo++;
			if(view !== null) {
				view.update({
					bpm: avgBPM,
					unstableRate: unstableRate,
					combo: combo
				});
			}
		}
	};
	return Stats;
});
