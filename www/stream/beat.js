define(function(){
	"use strict";
	function Beat(prevBeat) {
		//the first node has values of zero

		//calculate time since the last beat was made
		var timestamp = Date.now();
		var deltaTime = (prevBeat == null) ? 0 : timestamp - prevBeat.timestamp();
		//determine how far off this was from the ideal timing 

		//gets
		this.timestamp = function() {
			return timestamp;
		}
		this.deltaTime = function() {
			return deltaTime;
		}
	}
	return Beat;
});
