define(["./beat", "eventEmitter"],function(Beat, EventEmitter){
	"use strict";
	function BeatBox() {
		var ee = new EventEmitter(["beat"]);
		this.addEventListener = ee.addListener;
		var prevBeat = null;
		var that = this;
		this.addBeat = function(){
			//get that new beat, give it the old beat
			//(beat() knows what to do with null)
			var beat = new Beat(prevBeat);
			ee.emit("beat", beat);
			// console.log(beat.deltaTime());
			prevBeat = beat;
		};
	}
	return BeatBox;
});
