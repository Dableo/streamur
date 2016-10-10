define([],function(){
	var index = 0;
	var maxLength = 16;
	var arr = [];
	CyclicArray = function(history) {
		maxLength = history;
		this.average = function() {
			var total = 0;
			for (var i = 0; i < arr.length; i++) {
				total += arr[i];
			}
			if(arr.length > 0)
				return total/arr.length;
			else
				return 0;
		}
		this.isFull = function() {
			return (arr.length == maxLength);
		}
		this.index = function() {return index};
	}
	CyclicArray.prototype.push = function(item) {
		arr[index] = item;
		// console.log(index+": "+item);
		if(++index >= maxLength) {
			index = 0;
		}
	}
	return CyclicArray;
});