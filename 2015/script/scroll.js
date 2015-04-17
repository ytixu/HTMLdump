var scrollMenu = null;

window.onscroll = function() {
	if ($(window).scrollTop() > $(window).height()){
		if (scrollMenu != null){
			clearTimeout(scrollMenu);
		}
		scrollMenu = window.setTimeout(function(){
			scrollMenu = null;
			$("#menu").animate({
				top: Math.max(Math.floor($(window).scrollTop()), 
							  Math.floor($(window).height())).toString() + "px"
			}, 200)
		}, 100);
	}
};
