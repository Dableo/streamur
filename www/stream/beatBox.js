define(["./beat", "eventEmitter"],function(Beat, EventEmitter){
	"use strict";
	function BeatBox() {
		var ee = new EventEmitter(["beat"]);
		var prevBeat = null;
		var that = this;
		this.addBeat = function(){
			//(beat() knows what to do with null)
			//get that new beat
			var beat = new Beat(prevBeat);
			ee.emit("beat", beat);
			console.log(beat.deltaTime());
			prevBeat = beat;
		};
	}
	return BeatBox;
});
