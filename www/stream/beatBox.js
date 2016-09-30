define(["./beat", "eventEmitter"],function(Beat, EventEmitter){
	"use strict";
	function BeatBox(Stats) {
		var ee = new EventEmitter(["beat"]);
		var beats = [];
		var that = this;
		this.addBeat = function(){
			//get the last beat, null if it doesn't exist
			//(beat() knows what to do with null)
			var prevBeat = (beats.length === 0) ? null : beats[beats.length() - 1];
			//get that new beat
			var beat = new Beat(prevBeat, Stats.avgDelta());
			ee.emit("beat", beat);
			console.log(beat.timestamp());
		};
	}
	return BeatBox;
});
