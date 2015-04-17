var scrollMenu = null;
var colorChanged = false;

function moveMenu(){
	if (scrollMenu != null){
		clearTimeout(scrollMenu);
	}
	scrollMenu = window.setTimeout(function(){
		scrollMenu = null;
		var value = Math.max(Math.floor($(window).scrollTop()), 
						  $(window).height()).toString() + "px";
		$("#menuColor").animate({
			top: value
		}, 200);
		$("#menu").animate({
			top: value
		}, 200, function(){
			if (!colorChanged && Math.abs($("#menu").offset().top - $(window).height()) > 5){
				colorChanged = true;
				$("#menuColor").slideDown("fast");
			}else if (Math.abs($("#menu").offset().top - $(window).height())<5){
				colorChanged = false;
				$("#menuColor").slideUp("fast");
			}
		});
	}, 100);
}

function checkScroll(){
	if ($(window).scrollTop() > $(window).height() 
		|| $("#menu").offset().top > $(window).height()){
		moveMenu();
	}
}

window.onscroll = function() {
	checkScroll();
};

$(function(){
	$("#menuColor").hide();
	$("#menuColor").height($("#menu").height());
	$("#menuColor").width($(window).width());
	checkScroll();
	$("html, body").animate({ scrollTop: 0 }, "fast");
});