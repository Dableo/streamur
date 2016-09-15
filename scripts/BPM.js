// Tracks target bpm, timing, dynamic
// Handle ui for it
define([], function(){
	var state = {
		"timing": 1/4,
		"target": 120
	};

	var targetWidget = document.querySelector(".sjs-bpm-target");
	var timingWidget = document.querySelector(".sjs-bpm-timing");

	targetWidget.value = state.target;
	timingWidget.value = 1/state.timing;
	// dynamicWidget.checked = state.dynamic;

	targetWidget.addEventListener('input', function(evt) {
		state.target = evt.target.value;
	});
	timingWidget.addEventListener('input', function(evt) {
		state.timing = 1 / evt.target.value;
	});

	return {
		getTiming: function() { return state.timing; },
		setTiming: function(v) {
			state.timing = v;
			timingWidget.value = v;
		},

		getTarget: function() { return state.target; },
		setTarget: function(v) {
			state.target = v;
			targetWidget.value = v;
		}
	};
});