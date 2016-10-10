define(["cyclicArray", "./v_stats", "./od"],function(CyclicArray, v_Stats, OD){
	"use strict";
	function deltaToBPM(delta, bpmTime = 1) {
		var avgBeatMinute = delta / 60000;
		return 1 / (bpmTime * avgBeatMinute);
	}
	function Stats(){
		var that = this;
		//number of notes per tick of bpm (eg: 1/4 time)
		this.bpmTime = 4;
		//delta leniency before resetting
		this.leniency = new OD(11).good;
		//view module
		var view;
		//recent beats recorded to determine changes in bpm
		var historyLength = 8;
		var recentBeats = new CyclicArray(historyLength);
		var avgDelta = 0;
		var unstableRate = 0;
		var combo = 0;
		//getter in case we need it later
		this.get = function() {
			return {
				avgBPM: deltaToBPM(recentBeats.average(),that.bpmTime),
				unstableRate: unstableRate,
				combo: combo
			}
		}
		//the record combo
		this.best = {
			avgBPM: 0,
			unstableRate: 0,
			combo: 0
		}
		this.addView = function(node) {
			view = new v_Stats(node);
		}
		//called when beat is created
		this.readBeat = function(beat) {
			
			if(beat.deltaTime() != 0) {
				//update avgDelta
				var totalDelta = avgDelta * combo;
				avgDelta = (totalDelta + beat.deltaTime())/(combo + 1)
				
				//update UR only if not first note
				if(combo != 0) {
					//ur = avg time off from ideal delta (* 10 for some reason)
					var totalUR = unstableRate * combo;
					unstableRate = (totalUR + 10 * Math.abs(beat.deltaTime() - avgDelta))/(combo + 1);
				}
				//record the beat (the first one is ignored)
				recentBeats.push(beat.deltaTime());
				//increase combo
				combo++;		
			}

			//don't do this if we've just started
			if(recentBeats.isFull()) {
				//check if recent beatDelta average differs from avgDelta
				if((avgDelta > recentBeats.average() + that.leniency) || (avgDelta < recentBeats.average() - that.leniency)) {
					//we've changed bpm; start over
					that.breakCombo();		
				} 
			}

			//display our stuff
			that.updateView();
		}
		//update view
		this.updateView = function() {
			if(view !== null) {
				// var avgBPM = 0;
				// if(avgDelta !== 0) {
				// 	avgBPM = deltaToBPM(recentBeats.average(), that.bpmTime);
				// }
				view.update([
					{label: "BPM", value: that.get().avgBPM},
					{label: "Unstable Rate", value: unstableRate},
					{label: "Combo", value: combo}
				]);
			} else {
				console.error("Error: stats doesn't have a functional view")
			}
		}
		//RESET STATS
		this.breakCombo = function() {
			//check if it's the best run
			if(combo > that.best.combo) {
			 	//record the record
				that.best.combo = combo;
				that.best.unstableRate = unstableRate;
				that.best.avgBPM = that.avgBPM;
			 	view.updateBest(this.best);
			}
			//set avg to recent average
			// avgDelta = recentBeats.average();
			avgDelta = 0;
			recentBeats = new CyclicArray(historyLength);
			console.log(recentBeats.average());
			console.log(recentBeats.index());
			//reset combo
			combo = 0;
			//unstable rate?
			unstableRate = 0;
		}
	};
	return Stats;
});
