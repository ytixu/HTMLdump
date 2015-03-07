function setup(){
	$("body").append('<div id="upScroll"><span class="glyphicon glyphicon-chevron-up"></span></div>');

	$("#header").html('<div class="title"> GOLDENRATI&Phi; </div> <div class="menu"><div id="homeButton" class="menuButton"><span class="glyphicon glyphicon-home"></span></div></div>');
	$("#upScroll").click(function() {
	  $("html, body").animate({ scrollTop: 0 }, "fast");
	  return false;
	});
}

function getPage(){
	var url = document.URL.split("/");
	var currPage = url[url.length-1];
	currPage = parseInt(currPage.split(".")[0]);
	return currPage;
}

function setNavePost(pN, posts){
	var navPost = "";
	if (pN == 1){
		navPost = '<div class="col-xs-6 text-left"></div><div class="col-xs-6 text-right"> <a  href="'+(pN+1)+'.html"> '+posts[pN]+' <span class="glyphicon glyphicon-chevron-right"></span></a> </div>';
	}else if (posts[pN] == ""){
		navPost = '<div class="col-xs-6 text-left"> <a href="'+(pN-1)+'.html"><span class="glyphicon glyphicon-chevron-left"></span> '+posts[pN-2]+'</a> </div>';
	}else{
		navPost = '<div class="col-xs-6 text-left"> <a href="'+(pN-1)+'.html"><span class="glyphicon glyphicon-chevron-left"></span> '+posts[pN-2]+'</a> </div> <div class="col-xs-6 text-right"> <a href="'+(pN+1)+'.html"> '+posts[pN]+' <span class="glyphicon glyphicon-chevron-right"></span></a> </div>';
	}
	$("#navPost2").html(navPost);
	$("#navPost").html(navPost);
}

function getPost(){
	return ["Tic-Tac-Toe",
		 	"Match-Three Puzzle",
		  	"Match-Three Game",
		  	"Drawing Flowers",
		  	"Air Dancer", 
		  	""
		 ];
}
/* * * CONFIGURATION VARIABLES * * */
var disqus_shortname = '3archproj';
var disqus_identifier = "";
var disqus_title = "";
var disqus_url = "" ;

function start(){
	var posts = getPost();
	var pN = getPage();
	setup();
	setNavePost(pN, posts);
	disqus_identifier = pN.toString();
	disqus_title = posts[pN-1];
	disqus_url = document.URL;
}
start();

/* * * DON'T EDIT BELOW THIS LINE * * */
(function() {
    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
})();