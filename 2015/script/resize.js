window.onresize = function(){
	getCanvas();
	$("#menuColor").width($(window).width());
	$("#menuColor").height($("#menu").height());
	checkScroll();
}
