window.onresize = function(){
	getCanvas();
	console.log($("#menu").offset().top, $(window).height());
	if ($("#menu").offset().top < $(window).height()){
		scrollMenu = window.setTimeout(function(){
			scrollMenu = null;
			$("#menu").animate({
				top: Math.floor($(window).height()).toString() + "px"
			}, 200)
		}, 100);
	}
}
