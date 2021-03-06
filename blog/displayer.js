function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

// httpGet("archive/1.html");

var SIZE = 55;

function getPost(post){
	var parser = new DOMParser().parseFromString(post, "text/html");
	var subtitle = parser.getElementsByTagName('h5')[0].innerHTML;
	var content = parser.getElementById('postContent').innerHTML.replace(/(<([^>]+)>)/ig,"").split(' ').slice(0,SIZE).join(' ');
	return {subtitle:subtitle, content:content};
}

var eg = '<h3>Tic-Tac-Toe</h3> <h5>Design an algorithm to figure out if someone has won.</h5> </div> <div id="postContent"> <p>In this implementation, we will assume that this algorithm is run many times during a tic-tac-toe game. In this case, we can just consider the changes made on the grid by the player when adding a $\\circ$ or a $\\times$. In this case, we can just consider the changes made on the grid by the player when adding a $\\circ$ or a $\\times$. </p></div>';
// console.log(getPost(eg));

////// constants
var gr = 1/1.618
var colors = ["#fa774d", "#476b6b"];
var N = 6;


///// get posts
var resPosts = posts;
function getRecentPosts(){
	var temp;
	for (var i=0; i<N; i++){
		try{
			temp = getPost(httpGet('archive/'+posts[i].url.toString()+".html"));
		}catch(e){
			temp = getPost(eg);
		}
		resPosts[i].content = temp.content;
		resPosts[i].subtitle = temp.subtitle;
	}
	console.log(resPosts);
}


////// SIZE
var sizes = []
var ops = [
	function(size, center){return [center[0] - size, center[1] - size];},
	function(size, center){return [center[0], center[1] - size];},
	function(size, center){return center.slice();},
	function(size, center){return [center[0] - size, center[1]];}
	];

function initializeSizes(){
	var start = 0;
	var end = N;
	var section = 0;
	var size = 0;
	var top = $("#header").height();
	var left = 0;
	var center;
	if ($(window).width() < $(window).height()/gr){
		start ++;
		end ++;
		section ++;
		size = $("#postsDisplayer").width()/gr;
		if (size > 1300){
			size = 1300;
		}
		left = ($(window).width()-size*gr)/2
		center = [left,size+top];
		$("#postsDisplayer").height(size+top);
	}else{
		size = $(window).height()/gr;
		if (size > 1300){
			size = 1300;
		}
		left = ($(window).width()-size)/2
		center = [size+left,size*gr+top];
		$("#postsDisplayer").height(center[1]);
	}
	console.log(gr);
	for (var i=start; i<end; i++){
		var coord;
		if (section == 0){
			center[0] -= size*(1-gr);
		}else if(section == 2){
			center[0] += size*(1-gr);
		}else if (section == 1){
			center[1] -= size*(1-gr);
		}else{
			center[1] += size*(1-gr);
		}
		size *= gr;
		sizes.push({
			coord:ops[section](size,center),
			size:size
		});
		section = (section + 1)%4;
	}
}

////// DIVS

var divs = [];

function resizeDiv(size, div){
	$("#"+div).css({
		"top" : size.coord[1] + 10,
		"left" : size.coord[0] + 10,
		"width" : size.size - 20,
		"height" : size.size - 20
	});
}

function addDivs(){
	for (var i in sizes){
		var size = sizes[i];
		var div = document.createElement("div");
		div.className = "displayerContainer";
		div.id = i.toString();
		$("#postsDisplayer").append(div);
		// $("#"+div.id).css({
		// 	backgroundImage: "url('image/"+resPosts[i].url+".png')"
		// });
		//$("#"+div.id).css({
   			// backgroundImage: "-webkit-linear-gradient(top, "+colors[0]+" , "+colors[1]+"), url('image/"+resPosts[i].url+".png')"}).css({
   			// backgroundImage: "-o-linear-gradient(bottom, "+colors[0]+", "+colors[1]+"),url('image/"+resPosts[i].url+".png')"}).css({
   			// backgroundImage: "-moz-linear-gradient(bottom, "+colors[0]+", "+colors[1]+"),url('image/"+resPosts[i].url+".png')"}).css({
   			// backgroundImage: "linear-gradient(to bottom, "+colors[0]+" , "+colors[1]+"),url('image/"+resPosts[i].url+".png')"
   			//backgroundImage:"url('image/"+resPosts[i].url+".png')"
   		//});
		// var bg = 'http://www.backgroundzs.com/static/images/images_6.jpg';
		$("#"+div.id).css({'background-image': "url('image/"+resPosts[i].url+".png')",
			"background-color": colors[i%2]
		});
		console.log($("#"+div.id));
		resizeDiv(size,div.id);
		$("#"+div.id).click(function(){triggerCycle(this.id);});
		divs.push({id:i, size:i, cycle:0,
			startCycle:function(){
				if (this.cycle <= 0){
					this.displayPost(true);
					done --;
					return;	
				} 
				this.cycle -= 1;
				if (this.size == 0){
					$("#"+this.id.toString()).fadeOut("fast", 
						function(){
							resizeDiv(sizes[N-1],this.id);
							divs[parseInt(this.id)].size = N-1;
							$("#"+this.id).fadeIn("fast", divs[parseInt(this.id)].startCycle());
						});
				}else{
					$("#"+this.id.toString()).animate({
						"top" : sizes[this.size-1].coord[1] + 10,
						"left" : sizes[this.size-1].coord[0] + 10,
						"width" : sizes[this.size-1].size - 20,
						"height" : sizes[this.size-1].size - 20
					}, 340, function(){
						divs[parseInt(this.id)].size -= 1;
						divs[parseInt(this.id)].startCycle();
					});
				}
			},
			assignPost: function(){
				$("#"+this.id.toString()).append("<div class='postContext'><div class='postTitle'><a href='archive/"
					+ resPosts[this.id].url.toString() + ".html'>" 
					+ resPosts[this.id].name + "</a></div><div class='postSubtitle'>" 
					+ resPosts[this.id].subtitle + " ~ " 
					+ resPosts[this.id].date + "</div><div class='postText'>" 
					+ resPosts[this.id].content + "... </div><div class='smallTitle'><a href='archive/"
					+ resPosts[this.id].url.toString() + ".html'>" 
					+ resPosts[this.id].name + "</a></div></div>");
				// MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			},
			displayPost: function(fade){
				_id = this.id.toString();
				// console.log($("#"+_id).children()[0]);
				if (this.size < 3 && sizes[this.size].size > 200){
					$("#"+_id +" .postContext .postTitle").show();
					$("#"+_id +" .postContext .smallTitle").hide();
					// if(this.size < 2){
						$("#"+_id +" .postContext .postSubtitle").show();
						if(this.size == 0){
							$("#"+_id +" .postContext .postText").show();
						}else{
							$("#"+_id +" .postContext .postText").hide();
						}
					// }else{
					// 	$("#"+_id +" .postContext .postSubtitle").hide();
					// 	$("#"+_id +" .postContext .postText").hide();
					// }
				}else{
					$("#"+_id +" .postContext .postTitle").hide();
					$("#"+_id +" .postContext .postSubtitle").hide();
					$("#"+_id +" .postContext .postText").hide();
					if (sizes[this.size].size > 100){
						$("#"+_id +" .postContext .smallTitle").show();
					}else{
						$("#"+_id +" .postContext .smallTitle").hide();
					}
				}
				if (fade){
					$("#"+_id +" .postContext").fadeIn("fast");
				}else{
					$("#"+_id +" .postContext").show();
				}
			}
		});
		divs[i].assignPost();
		divs[i].displayPost();
	}
	////// resize
	$( window ).resize(function() {
		sizes = [];
		initializeSizes();
		for (var i = 0; i<N; i++){
			$("#"+i.toString() +" .postContext").hide();
			resizeDiv(sizes[divs[i].size],i.toString());
			divs[i].displayPost(false);
		}
	});

}

var done = 0;
// todo : automatic trigger

function triggerCycle(_id){
	if (done > 0) return;
	__id = parseInt(_id);
	if (divs[__id].size == 0) return;
	done = N;
	for (var i = 0; i<N; i++){
		$("#"+i.toString() +" .postContext").fadeOut("fast");
		divs[i].cycle = divs[__id].size;
		divs[i].startCycle();
	}
}

getRecentPosts();
initializeSizes();
addDivs();