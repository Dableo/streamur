define(function(require){
	"use strict";
	var Stats = require('./stats'),
		BeatBox = require('./beatBox'),
		// Graph = require('./graph'),
		Ready = require('documentReady');

	// var graph = new Graph();
	var stats = new Stats();
	var beatBox = new BeatBox();

	//DOM interaction
	//graph container
	var gameGraph = document.createElement("div");
	gameGraph.setAttribute('id','gameWindow');
	//hud container
	var gameHud = document.createElement("div");
	gameHud.setAttribute('id','gameHud');
	//game focus
	var focus = document.createElement("input");
	focus.setAttribute('style', 'position:fixed;left:-100%;');

	Ready(function(){
		var gameContainer = document.querySelector("#stream")
		console.log("ready!");
		document.body.appendChild(focus);
		gameContainer.appendChild(gameGraph);
		gameContainer.appendChild(gameHud);
		//focus
		focus.focus();
		gameGraph.addEventListener('click',function(e){
			focus.focus();
		});
		//beat input
		focus.addEventListener('keydown', beatBox.addBeat);
	});
});
