define([],function(){
	"use strict";
	function OD(od) {
		var goodInt = 6;
		var badInt = 8;
		var missInt = 10;
		this.good = 79.5 - (goodInt * od);
		this.bad = 139.5 - (badInt * od);
		this.miss = 199.5 - (missInt * od);
		this.pad = 80 -  (goodInt * od);
	}
	return OD;
});