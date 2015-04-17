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

var menus = ["#projectMenu","#blogMenu","#aboutMenu","#contactMenu"];
var containers = ["#projectsContainer", "#blogContainer","#aboutContainer","#contactContainer"];
var track = 0;

function trackMenu(){
	if (track < 4 && $(window).scrollTop() > $(containers[track]).offset().top){
		$(menus[track]).addClass("menuTrack");
		if (track > 0)
			$(menus[track-1]).removeClass("menuTrack");
		track++;
	}else if (track > 0 && $(window).scrollTop() < $(containers[track-1]).offset().top){
		$(menus[track-1]).removeClass("menuTrack");
		track--;
	}
}

function checkScroll(){
	if ($(window).scrollTop() > $(window).height() 
		|| Math.abs($("#menu").offset().top - $(window).height())>1){
		moveMenu();
	}
}

window.onscroll = function() {
	checkScroll();
	trackMenu();
};

$(function(){
	$("#menuColor").hide();
	$("#menuColor").height($("#menu").height());
	$("#menuColor").width($(window).width());
	checkScroll();
	$("html, body").animate({ scrollTop: 0 }, "fast");
});