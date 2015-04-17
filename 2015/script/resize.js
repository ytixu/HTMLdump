window.onresize = function(){
	getCanvas();
	if ($("#menu").offset().top < $(window).height()){
		moveMenu();
	}
}
