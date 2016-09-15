define(["BPM"], function(timings){
	var gutterWidth = 3;

	function TextDisplay(beatBox, properties) {
		properties.width = Math.round(properties.width) || 100;
		properties.height = Math.round(properties.height) || 80;
		properties.parent = properties.parent || document.body;
		canvas = document.createElement('pre');
		canvas.style.width = properties.width + 'ch';
		// canvas.addEventListener('click', input.focus);
		if(properties.parent instanceof Element) {
			properties.parent.appendChild(canvas);
		} else {
			document.querySelector(properties.parent).appendChild(canvas);
		}
		beatBox.width = properties.width - 4;
		beatBox.addEventListener('newNode', function(node){
			var grid;
			if (node.bpm === 0) {
				grid = makeGrid();
				grid[0][grid.avgLineY] = node;
			} else {
				grid = fillGrid();
			}
			draw(grid);
		});
		function makeGrid() {
			var grid = [];
			grid.length = properties.width - 4;
			for (var i=0; i<grid.length; i++) {
				grid[i] = [];
				grid[i].length = properties.height;
			}
			grid.minBPM = 0;
			grid.maxBPM = 0;
			grid.avgBPM = 0;
			grid.avgLineY = Math.floor(properties.height/2);
			grid.targetLineY = grid.avgLineY;
			return grid;
		}
		//creates 2d array of objects
		function fillGrid() {
			var sorted = beatBox.getNodes();
			var bounds = beatBox.getRange();
			var target = timings.getTarget();
			var min = Math.min(target, bounds.min);
			var max = Math.max(target, bounds.max);
			var range = max - min;
			min -= range*0.1;
			max += range*0.1;
			range += range*0.2;
			var bpm = sorted[sorted.length-1].avgBPM;
			var scale = properties.height / range;
			var grid = makeGrid();
			var t, node, y;
			for (t=0; t<sorted.length; t++) {
				node = sorted[t];
				y = properties.height - Math.round((node.bpm - min) * scale);
				grid[t][y] = node;
			}
			grid.avgBPM = Math.round(bpm);
			grid.avgLineY = properties.height - Math.round((bpm - min) * scale);
			grid.minBPM = Math.floor(min);
			grid.maxBPM = Math.ceil(max);
			grid.targetLineY = properties.height - Math.round((target - min)*scale);
			return grid;
		}
		function pad(str, width) {
			var out = "";
			for (var padi=(width - (str+"").length); padi>0; padi--) {
				out += ' ';
			}
			out += str;
			return out;
		}
		function draw(objectsGrid) {
			var output = '';
			for(var y=0; y<properties.height; y++) {
				if (y === 0) {
					output += pad(objectsGrid.maxBPM, gutterWidth);
					output += "│";
				} else if (y === properties.height-1) {
					output += pad(objectsGrid.minBPM, gutterWidth);
					output += "│";
				} else if (objectsGrid.avgLineY === y) {
					output += pad(objectsGrid.avgBPM, gutterWidth);
					output += ">";
				} else if (objectsGrid.targetLineY === y) {
					output += pad("├", gutterWidth+1);
				} else {
					output += pad("│", gutterWidth+1);
				}
				for(var x = 0; x<objectsGrid.length; x++) {
					if (objectsGrid[x][y] instanceof Object) {
						output += "+";
					} else if (objectsGrid.avgLineY === y) {
						if (objectsGrid.targetLineY === y) {
							output += "═";
						} else {
							output += "-";
						}
					} else if (objectsGrid.targetLineY === y) {
						output += "─";
					} else if (objectsGrid[x][y] === undefined) {
						output += " ";
					} else {
						output += "?"; // shouldn't get here...
					}
				}
				output += '\n';
			}
			canvas.textContent = output;
		}
		draw(makeGrid());
		this.canvas = canvas;
	}
	return TextDisplay;
});