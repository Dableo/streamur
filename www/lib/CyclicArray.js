define([],function(){
	CyclicArray = function(history) {
		var index = 0;
		var maxLength = 16;
		var arr = [];
		maxLength = history;
		this.average = function() {
			if(arr.length == 0)
				return 0;
			var total = 0;
			for (var i = 0; i < arr.length; i++) {
				total += arr[i];
			}
			return total/arr.length;
		}
		this.isFull = function() {
			return (arr.length == maxLength);
		}
		this.index = function() {return index};
		var that = this;
		this.push = CyclicArray.prototype.push(that, item);
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