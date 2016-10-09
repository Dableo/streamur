define([],function(){
	var index = -1;
	var maxLength = 16;
	var arr = [];
	CyclicArray = function(history) {
		maxLength = history;
		this.average = function() {
			var total = 0;
			for (var i = 0; i < arr.length; i++) {
				total += arr[i];
			}
			return total/arr.length;
		}
		this.isFull = function() {
			return (arr.length = maxLength);
		}
	}
	CyclicArray.prototype.push = function(item) {
		//ignore first beat
		if(index !== -1) {
			arr[index] = item;
			console.log(index+": "+item);
		}
		if(++index >= maxLength) {
			index = 0;
		}
	}
	return CyclicArray;
});