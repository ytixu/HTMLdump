window.onresize = function(){
	getCanvas();
	$("#menuColor").width($(window).width());
	checkScroll();
}
