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
	var title = parser.getElementsByTagName('h3')[0].innerHTML;
	var subtitle = parser.getElementsByTagName('h5')[0].innerHTML;
	var content = parser.getElementById('postContent').innerHTML.replace(/(<([^>]+)>)/ig,"").split(' ').slice(0,SIZE).join(' ');
	return {title:title, subtitle:subtitle, content:content};
}

var eg = '<h3>Tic-Tac-Toe</h3> <h5>Design an algorithm to figure out if someone has won.</h5> </div> <div id="postContent"> <p>In this implementation, we will assume that this algorithm is run many times during a tic-tac-toe game. In this case, we can just consider the changes made on the grid by the player when adding a $\\circ$ or a $\\times$. </p></div>';
// console.log(getPost(eg));

////// constants
var gr = 1/1.618;
var colors = ["rgba(255, 148, 77, 0.9)", "rgba(142, 139, 132, 0.9)"];
var N = 6;


///// get posts
var resPosts = [];
function getRecentPosts(){
	for (var i=0; i<N; i++){
		resPosts.push(getPost(httpGet('archive/'+posts[i].url.toString()+".html")));
	}
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
	var size = $("#postsDisplayer").width();
	var top = $(".titleBar").height();
	var center;
	if ($(window).width() < $(window).height()){
		start ++;
		end ++;
		section ++;
		size = size/gr;
		center = [0,size+top];
		$("#postsDisplayer").height(size);
	}else{
		center = [size,size*gr+top];
		$("#postsDisplayer").height(center[1]);
	}
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
		"top" : size.coord[1],
		"left" : size.coord[0],
		"width" : size.size,
		"height" : size.size
	});
}

function addDivs(){
	for (var i in sizes){
		var size = sizes[i];
		var div = document.createElement("div");
		div.className = "displayerContainer";
		div.id = i.toString();
		$("#postsDisplayer").append(div);
		$("#"+div.id).css("background-color", colors[i%2]);
		resizeDiv(size,div.id);
		$("#"+div.id).click(function(){triggerCycle(this.id);});
		divs.push({id:i, size:i, cycle:0,
			startCycle:function(){
				if (this.cycle <= 0){
					this.displayPost();
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
						"top" : sizes[this.size-1].coord[1],
						"left" : sizes[this.size-1].coord[0],
						"width" : sizes[this.size-1].size,
						"height" : sizes[this.size-1].size
					}, 340, function(){
						divs[parseInt(this.id)].size -= 1;
						divs[parseInt(this.id)].startCycle();
					});
				}
			},
			displayPost: function(){
				if (this.size < 4){
					$("#"+this.id.toString()).append("<div class='postTitle'>" 
						+ resPosts[this.id].title + "</div>");
					if(this.size < 2){
						$("#"+this.id.toString()).append("<div class='postSubtitle'>" 
							+ resPosts[this.id].subtitle + "</div>");
						if(this.size == 0){
							$("#"+this.id.toString()).append("<div class='postText'>" 
								+ resPosts[this.id].content + "</div>");
						}
					}
				}
			}
		});
		divs[i].displayPost();
	}
	////// resize
	$( window ).resize(function() {
		sizes = [];
		initializeSizes();
		console.log(sizes);
		for (var i = 0; i<N; i++){
			$("#"+i.toString()).html("");
			resizeDiv(sizes[divs[i].size],i.toString());
			divs[i].displayPost();
		}
	});

}

function triggerCycle(_id){
	console.log(divs);
	for (var i = 0; i<N; i++){
		$("#"+i.toString()).html("");
		divs[i].cycle = divs[parseInt(_id)].size;
		divs[i].startCycle();
	}
}

getRecentPosts();
initializeSizes();
addDivs();