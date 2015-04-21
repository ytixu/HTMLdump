window.onresize = function(){
	// flower
	if (nextPetal != null) clearTimeout(nextPetal);
	nextPetal = setTimeout(function(){
		getCanvas();
		start();
	}, 100);
	// menu
	$("#menuColor").width($(window).width());
	$("#menuColor").height($("#menu").height());
	checkScroll();
}
