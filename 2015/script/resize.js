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


/////// date for web dev

function getbirthday(){
	var time = new Date(new Date() - new Date(2014,05,4));
	var years = time.getFullYear() - new Date(0).getFullYear()-1;
	console.log(years, years == 0);
	if (years != 0){
		$("#bdYear").html(years.toString() + " years");
	}else{
		$("#bdYear").html("<br>");
	}
	$("#bdMonth").html((time.getMonth()+1).toString() 
		+ " months");
	$("#bdDay").html((time.getDate()).toString() 
		+ " days");
}

$(function(){
	getbirthday();
})