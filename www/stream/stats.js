define(["cyclicArray", "./v_stats"],function(CyclicArray, v_Stats){
	"use strict";
	function deltaToBPM(delta, bpmTime = 1) {
		var avgBeatMinute = delta / 60000;
		return 1 / (bpmTime * avgBeatMinute);
	}
	function Stats(){
		//number of notes per tick of bpm (eg: 1/4 time)
		var bpmTime = 4;
		//delta leniency before resetting
		var leniency = 7;
		var view;
		var historyLength = 8;
		var recentBeats = new CyclicArray(historyLength);
		var avgDelta = 0;
		var unstableRate = 0;
		var combo = 0;
		this.avgDelta = function() {
			avgDelta;
		}
		this.addView = function(node) {
			view = new v_Stats(node);
		}
		this.getBeat = function(beat) {
			//update avgDelta
			var totalDelta = avgDelta * combo;
			avgDelta = (totalDelta + beat.deltaTime())/(combo + 1)
			
			//increase combo
			combo++;

			//check if recent beatDelta matches total avgDelta
			//if bad
			if(recentBeats.isFull()) {
				if((avgDelta > recentBeats.average() + leniency) || (avgDelta < recentBeats.average() - leniency)) {
				 	console.log("reset");
					//reset history, avgDelta, and combo
					avgDelta = recentBeats.average();
					// recentBeats = new CyclicArray(historyLength);
					combo = 0;
				} 
			}
			recentBeats.push(beat.deltaTime());

			if(view !== null) {
				//avgDelta = number of ms per beat
				var avgBPM = 0;
				if(avgDelta !== 0) {
					avgBPM = deltaToBPM(avgDelta, bpmTime);
				}
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
