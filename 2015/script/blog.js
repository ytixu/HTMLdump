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

var eg = '<h3>Creating G&Phi;LDEN HackNights</h3>				<h5>Towards hosting a "fictional" hackathon and designing a webpage.</h5>			</div>			<div id="postContent">			<p>Presenting to you <a href="../../hacknights/index.html">G&Phi;LDEN HackNights</a>. This hackathon happens every night of every day, in every corner of the globe. Everyone can attend and every idea is accepted (at the creator\'s own risk). </p>			<h4>Creation of G&Phi;LDEN HackNights</h4>			<p>Learning Node.js was my initial goal for creating this website. I was determined to know how to keep a database, make logins and understand why "Node.js is the only real Dev language". After watching a short tutorial, I followed the steps to download node and express, and started using jade. It was a lot simpler than I thought. Just type the command to build the project with express, install it, and run it with nodemon. Simple. But that feeling of AWYEAAAA-finally-gonna-unlock-skills-for-backend did not last very long as I learned that GitHub doesn\'t host dynamic web page. After spending hours trying to figure out how to us OpenShift, generating SSH key, I decided to fall back to ground zero. </p>';

////// constants
var gr = 1/1.618
var colors = ["#fa774d", "#476b6b"];
var N = 6;


///// get posts
var resPosts = posts;
function getRecentPosts(){
	for (var i=0; i<N; i++){
		var temp;
		try{
			temp = getPost(httpGet('../blog/archive/'+posts[i].url.toString()+".html"));
		}catch(e){
			temp = getPost(eg);
		}
		resPosts[i].content = temp.content;
		resPosts[i].subtitle = temp.subtitle;
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
	var size = 0;
	var top = $("#postsDisplayer").offset().top;
	console.log(top);
	var left = 0;
	var center;
	if ($(window).width() < $(window).height()/gr){
		start ++;
		end ++;
		section ++;
		size = $("#postsDisplayer").width()/gr;
		if (size > 890){
			size = 890;
		}
		left = ($(window).width()-size*gr)/2
		center = [left,size+top];
		console.log(size/gr);
		$("#postsDisplayer").height(size);
	}else{
		size = $(window).height()/gr;
		if (size > 890){
			size = 890;
		}
		left = ($(window).width()-size)/2
		center = [size+left,size*gr+top];
		$("#postsDisplayer").height(center[1]-top);
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
		$("#"+div.id).css({
		// 	'background-image': "url('../blog/image/"+resPosts[i].url+".png')",
			'background-color': "rgba(0,0,0,0.05)"
		});
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
				$("#"+this.id.toString()).append("<div class='postContext'><div class='postTitle'><a href='../blog/archive/"
					+ resPosts[this.id].url.toString() + ".html'>" 
					+ resPosts[this.id].name + "</a></div>"
					+ "<div class='smallTitle'><a href='../blog/archive/"
					+ resPosts[this.id].url.toString() + ".html'>" 
					+ resPosts[this.id].name + "</a></div>"
					+ "<div class='postSubtitle'>" 
					+ resPosts[this.id].subtitle + " ~ " 
					+ resPosts[this.id].date + "</div><div class='postText'>" 
					+ resPosts[this.id].content + "... </div></div>");
				// MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			},
			displayPost: function(fade){
				_id = this.id.toString();
				if (this.size < 2 && sizes[this.size].size > 200){
					$("#"+_id +" .postContext .postSubtitle").show();
					if(this.size == 0 && sizes[this.size].size > 450){
						$("#"+_id +" .postContext .postTitle").show();
						$("#"+_id +" .postContext .smallTitle").hide();
						$("#"+_id +" .postContext .postText").show();
					}else{
						$("#"+_id +" .postContext .postTitle").hide();
						$("#"+_id +" .postContext .smallTitle").show();
						$("#"+_id +" .postContext .postText").hide();
					}
				}else{
					$("#"+_id +" .postContext .postTitle").hide();
					$("#"+_id +" .postContext .postSubtitle").hide();
					$("#"+_id +" .postContext .postText").hide();
					if (sizes[this.size].size > 150){
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
