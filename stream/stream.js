
//input manager
	//capture keystrokes or ui, fire input event
	//events: tap, setBPM, setDynamicBPM, setMetronome, setTiming
//settingsPanel ?
	//gui buttons
//state
	//set with input events
	//current timing, metronome, dynamic bpm
	//getters
//beatbox
	//on input, 
		//calculate deltaTap (time now - last node timestamp)
		//calculate instantBPM
		//get avgDeltaTap, subtract deltaTap = offset
		//push node to stack node(timestamp, deltaTap, bpm, offset)
		//update avgBPM and avgDeltaTap
	//calculate: know last node, current time, getTiming
	//new node event
	//bpm
//hitwindow
	//private vars: blue, orange, red zone hit windows
		//targetHitWindowSize
		//currentHitWindowSize
		//hitWindowStep
		//sumOffset()
	//new graph node listener
		//create event for node accuracy
	//listen for node accuracy event
		//set targetHitWindowSize accordingly
		//add deltaBPM to sumOffset() 
	//request frame, tween actual size to target size
	//sumOffset() calls break event if total offset > || < currentHitWindowSize


//display maybe split
	//make canvas thing
	//make static line things
	//create initial things
	//get beatbox nodes
	//plot nodes
	//draw bpm line
	//get avg bpm
	//draw it
	//update hitwindow size

//audio
define(["BeatBox", "TextDisplay", "documentReady", "HitWindow", "Averager"],function(BeatBox, TextDisplay, ready, HitWindow, Averager){
	"use strict";
	//the heart
	var bb = new BeatBox();
	bb.addPlugin(new HitWindow());
	bb.addPlugin(new Averager());
	
	//game focus
	var focus = document.createElement("input");
	focus.setAttribute('style', 'position:fixed;left:-100%;');
	ready(function(){
		document.body.appendChild(focus);
		
		focus.focus();
		//beat input
		focus.addEventListener('keydown', bb.addBeat);
		focus.addEventListener('blur', function() {
			console.log("paused!");
		});
		focus.addEventListener('focus', function() {
			console.log("unpaused!");
		})
	});
	var display = new TextDisplay(bb, {height: 30, width: 80, parent:".streamjs"});
	display.canvas.addEventListener("click", function() { focus.focus(); });
	return {};
});