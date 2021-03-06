/**
 * BeatBox
 *
 * Tracks "tap" events from an InputManager and calculates beat statistics.
 * Fires "newNode" events every time a new record is added to this.nodes
 */
define(["BPM", "EventEmitter"], function(beat, EventEmitter){
	"use strict";
	function BeatBox() {
		var hiddenVars = { // private variables
			nodeIndex: -1, // next index for insertion into this.nodes
			ee: new EventEmitter(["newNode"]),
			plugins: []
		};
		this.beatboxHistory = 64; // how many nodes to store in history
		
		this.nodes = [];          // cyclical array of nodes, limited to this.beatboxHistory entries
		this.addEventListener = hiddenVars.ee.addListener;
		var that = this;
		this.addBeat = function(){addBeat.call(that, hiddenVars);};
		this.getRange = function(){
			var sortedNodes = this.nodes.slice().sort(function(a1,a2){
				return a1.bpm - a2.bpm;
			});
			if (sortedNodes.length !== 0) {
				return {min: sortedNodes[0].bpm, max: sortedNodes[sortedNodes.length-1].bpm};
			} else {
				return {min:0, max:0};
			}
		};
		this.getNodes = function() {
			var startNodes = this.nodes.slice(hiddenVars.nodeIndex);
			return startNodes.concat(this.nodes.slice(0,hiddenVars.nodeIndex));
		};
		this.addPlugin = function(plug) {
			hiddenVars.plugins.push(plug);
		};
	}
	function addBeat(vars) {
		var timeStamp = Date.now();
		var deltaTap, bpm;
		//zeroth node is stored at index -1 (not included in array)
		if(vars.nodeIndex === -1) {
			deltaTap = 0;
			bpm = 0;
		} else {
			//the second node needs to know the first is at index -1
			var previousNodeIndex = -1;
			if(this.nodes.length !== 0) {
				//all other nodes use the cyclical formula to find previous
				previousNodeIndex = (this.nodes.length + vars.nodeIndex-1)%this.nodes.length;
			}
			deltaTap = timeStamp - this.nodes[previousNodeIndex].timeStamp;
			bpm = beat.getTiming()/(deltaTap/(60 * 1000));
		}
		var newNode = {timeStamp:timeStamp, deltaTap:deltaTap, bpm:bpm};

		for (var i=0; i<vars.plugins.length; i++) {
			vars.plugins[i].processNode(newNode);
		}

		this.nodes[vars.nodeIndex] = newNode;
		vars.ee.emit('newNode',newNode);
		if (++vars.nodeIndex >= this.beatboxHistory) {
			vars.nodeIndex = 0;
		}
	}
	return BeatBox;
});