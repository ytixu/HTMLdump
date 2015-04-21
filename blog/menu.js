if (document.URL.indexOf("archive") > -1){
	$("#header").html('<a class="homeLink" href="../../2015/index.html"><div class="title"> GOLDENRATI&Phi; </div></a><div id="menu"> </div>');
}else{
	$("#header").html('<a class="homeLink" href="../2015/index.html"><div class="title"> GOLDENRATI&Phi; </div></a><div id="menu"> </div>');
}
// $("#homeButton").click(
// 	function(){
// 		if (document.URL.indexOf("archive") > -1){
// 			window.location = "../index.html";
// 		}else{
// 			window.location = "index.html";
// 		}
// 	});
//<div class="menu"><div id="homeButton" class="menuButton"><span class="glyphicon glyphicon-home"></span></div>
// $("#homeButton").click(
// 	function(){
// 		if (document.URL.indexOf("archive") > -1){
// 			window.location = "../../2015/index.html";
// 		}else{
// 			window.location = "../2015/index.html";
// 		}
// 	});

$("body").append('<div id="upScroll"><span class="glyphicon glyphicon-chevron-up"></span></div>');
$("#upScroll").click(function() {
  $("html, body").animate({ scrollTop: 0 }, "fast");
  return false;
});
$("#menu").height(34);
document.title = ":3";