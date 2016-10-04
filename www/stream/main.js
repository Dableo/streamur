define(function(require){
	"use strict";
	var Stats = require('./stats'),
		BeatBox = require('./beatBox'),
		Display = require('./display'),
		Ready = require('documentReady');

	var display = new Display();
	var stats = new Stats();
	var beatBox = new BeatBox();
	//DOM interaction
	var gameWindow = document.querySelector("#stream");
	//game focus
	var focus = document.createElement("input");
	focus.setAttribute('style', 'position:fixed;left:-100%;');
	Ready(function(){
		console.log("ready!");
		document.body.appendChild(focus);
		focus.focus();

		//beat input
		focus.addEventListener('keydown', beatBox.addBeat);
	});
});
