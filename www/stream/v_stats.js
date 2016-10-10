define([],function(){
	function v_Stats(node) {
		//create and place stat text fields
		var bpmText = document.createElement("p");
		bpmText.textContent = "BPM: ";
		var unstableRateText = document.createElement("p");
		unstableRateText.textContent = "UR: ";
		var comboText = document.createElement("p");
		comboText.textContent = "Combo: ";

		var nodeArr = [bpmText, unstableRateText, comboText];
		for (var i = 0; i < nodeArr.length; i++) {
		 	nodeArr[i].classList.add('stream-stats');
			node.appendChild(nodeArr[i]);	
		}
		
		this.update = function(stats) {
			//update hud with current stats (every new beat)

			bpmText.textContent = "BPM: "+Math.round(stats.bpm * 10)/10;
			unstableRateText.textContent = "UR: "+Math.round(stats.unstableRate * 100)/100;
			comboText.textContent = "Combo: "+stats.combo;
		}
		this.updateBest = function(stats) {
			
		}
	}
	return v_Stats;
});