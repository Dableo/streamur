//determines and tracks avg bpm
//calculates node offset from avg
define(function(){
	function Averager(maxVariance, avgBPMWindow, avgResetFactor) {
		var vars = {
			avgIndex: 0,       // next index for insertion into vars.avgNodes
			avgNodes: [],      // cyclical array to store the latest this.avgBPMWindow (8) nodes
			avgDeltaTap: 0,    // calculated average of time deltas of last this.avgBPMWindow taps
			avgBPM: 0          // calculated average BPM of last this.avgBPMWindow taps
		};
		avgBPMWindow = avgBPMWindow || 8;    // how many nodes to use in average calculations
		avgResetFactor = avgResetFactor || 2;  // average delta tap factor which causes running average to be reset
		this.getBPM = function() {
			return vars.avgBPM;
		};
		this.processNode = function(node) {
			if (
				node.deltaTap < vars.avgDeltaTap/avgResetFactor ||
				node.deltaTap > vars.avgDeltaTap*avgResetFactor
			) {
				// flush the averaging window
				vars.avgNodes = [];
				vars.avgIndex = 0;
			}
			vars.avgNodes[vars.avgIndex] = node;
			
			var totalBPM = 0, totalDeltaTap = 0;
			var avgNodeCount = Math.min(avgBPMWindow, vars.avgNodes.length);
			for (var i = 0; i < vars.avgNodes.length; i++) {
				totalDeltaTap += vars.avgNodes[i].deltaTap;
				totalBPM += vars.avgNodes[i].bpm;			
			}
			vars.avgBPM = totalBPM/avgNodeCount;
			vars.avgDeltaTap = totalDeltaTap/avgNodeCount;
			
			node.avgBPM = vars.avgBPM;
			node.avgDeltaTap = vars.avgDeltaTap;

			if (++vars.avgIndex >= avgBPMWindow) {
				vars.avgIndex = 0;
			}
		};
	}
	return Averager;
});