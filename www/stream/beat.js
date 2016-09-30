define(function(){
	"use strict";
	function Beat(prevBeat, idealDelta) {
		//the first node has values of zero

		//calculate time since the last beat was made
		var timestamp = Date.now();
		var deltaTime = (prevBeat == null) ? 0 : timestamp - prevBeat.timestamp();
		//determine how far off this was from the ideal timing 
		//(to calc the unstable rate)
		var hitError = (prevBeat == null) ? 0 : idealDelta - deltaTime;
		

		//gets
		this.timestamp = function() {
			return timestamp;
		}
		this.deltaTime = function() {
			return deltaTime;
		}
		this.hitError = function() {
			return hitError;
		}
	}
	return Beat;
});
