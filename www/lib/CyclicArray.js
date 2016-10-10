define([],function(){
	CyclicArray = function(history) {
		var index = 0;
		var arr = [];
		var maxLength = history;
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
		this.add = function(item) {
			arr[index] = item;
			// console.log(index+": "+item);
			if(++index >= maxLength) {
				index = 0;
			}
		}
	}
	return CyclicArray;
});