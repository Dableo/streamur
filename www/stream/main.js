define(function(require){
	"use strict";
	var Settings = require('./settings'),
		Stats = require('./stats'),
		BeatBox = require('./beatBox'),
		Display = require('./display'),
		Ready = require('documentReady');

	var display = new Display();
	var settings = new Settings();
	var stats = new Stats(settings);
	var beatBox = new BeatBox(stats);
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
