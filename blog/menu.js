$("#header").html('<div class="title"> GOLDENRATI&Phi; </div> <div class="menu"><div id="homeButton" class="menuButton"><span class="glyphicon glyphicon-home"></span></div><div id="infoButton" class="menuButton"><span class="glyphicon glyphicon-question-sign"></span></div></div>');

$("#homeButton").click(
	function(){
		if (document.URL.indexOf("archive") > -1){
			window.location = "../index.html";
		}else{
			window.location = "index.html";
		}
	});

$("#infoButton").click(
	function(){
		if (document.URL.indexOf("archive") > -1){
			window.location = "../(OvO).html";
		}else{
			window.location = "(OvO).html";
		}
	});

$("body").append('<div id="upScroll"><span class="glyphicon glyphicon-chevron-up"></span></div>');
$("#upScroll").click(function() {
  $("html, body").animate({ scrollTop: 0 }, "fast");
  return false;
});
document.title = ":3";