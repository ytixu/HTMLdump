var maxSize = 300;
var canvas;
var ctx;
var cvsSize = 600;
var halfSize = cvsSize/2;
var gr = 1.61803398875;
var flcol = [100,35,0];
var overlaycol = [200,200,200];
var recN = 0;
var numP = 5; // 89;

function drawPetal(n, size){
    ctx.beginPath();
	ctx.rotate(Math.PI*2/gr);
    ctx.moveTo(0,0);
    ctx.bezierCurveTo(size*0.4,size*0.5,size*0.4,size*0.8,0,size);
    ctx.bezierCurveTo(-size*0.4,size*0.8,-size*0.4,size*0.5,0,0);
    ctx.fill();
}

function drawFlower(c){
	if (recN>numP) return;
	ctx.globalAlpha = 0.1
	ctx.fillStyle = "rgb("+Math.min(c[0]+recN*2,225).toString()+
					","+Math.min(c[1]+recN*2,225).toString()+
					","+Math.min(c[2]+recN*2,225).toString()+")";
	s = Math.max(maxSize-recN*3,0);
	if (s==0) return;
	drawPetal(recN,s);
	recN+=1;
	if (recN == numP) showThree();
	// setTimeout(function(){ drawFlower(c); }, 110);
}

function getCanvas(){
	canvas = document.getElementById('flower');
	canvas.width = cvsSize;
	canvas.height = cvsSize;
    ctx = canvas.getContext('2d');
    ctx.translate(halfSize,halfSize);
}

var scrollVal = false;

window.addEventListener ("mousewheel", function (event) {
	// console.log(scrollVal);
	if (event.wheelDelta > 0 || scrollVal > 0) return;
	if (scrollVal == 0){
		scrollVal = true;
		$( "#page1" ).animate({
	   		height: "-=100%"
	 	}, 500);
	  	$( "#title" ).animate({
	   		left: "34%"
	 	}, 500);
	 	$( "#title" ).animate({
	   		left: "-=3%"
		}, 500);//4000);
	}else if (scrollVal < -200){
		drawFlower(flcol);
	}
	scrollVal += event.wheelDelta;
}, false);

window.onload = function(){
	getCanvas();
}


//////////////////////////////


var divs = {};
var spacing = 10;
// left, top
var pos = [];

function initializeDivs(vertical){
	var left;
	var top;
	var h;
	if (vertical){
		h = Math.min(parseInt($(window).height()*0.8),
					 parseInt($(window).width()*0.8));
		left = parseInt($(window).width()*0.13) + h;
		top = 60+parseInt($(window).height()*0.08);
		var temp = createDivs(h*gr, left, top, 0, 5);
		console.log(temp);
		h = temp[0];
		left = temp[1];
		top = temp[2]+h+spacing/2;
		h = Math.round(h/gr);
		// top -= h;
		$("body").append("<div id=\'c5\'></div>");
		divs["#c5"] = 5;
		$("#c5").css({"width":h.toString(), 
					"height":h.toString(),
					"position":"absolute",
					"left":left+"px",
					"top":top+"px"});
		$("#c5").hide().fadeIn("slow");
		pos.push([left, top, h]);
	}else{
		pos = [[parseInt($(window).width()/gr), 
				60+parseInt($(window).height()*0.05)]];
		h = Math.min(parseInt($(window).height()*0.8),
						 parseInt($(window).width()*0.45));
		$("body").append("<div id=\'c0\'></div>");
		divs["#c0"] = 0;
		h -= spacing/2;
		pos[0][0] -= Math.round(h/2);
		$("#c0").css({"width":h.toString(), 
					"height":h.toString(),
					"position":"absolute",
					"left":pos[0][0]+"px",
					"top":pos[0][1]+"px"});
		$("#c0").hide().fadeIn("slow");
		left = parseInt($("#c0").css("left"));
		top = parseInt($("#c0").css("top"));
		pos[0] = [left, top, h];
		createDivs(h, left, top, 1, 6);
	}
	window.addEventListener ("mousewheel", function (event) {
		for (var d in divs){
			$(d).finish();
		}
		turn(event.wheelDelta);
	}, false);
}

function createDivs(h, left, top, s, e){
	var f = 0;
	if (s == 0) f = 1;
	for (var i=s; i<e; i++){
		console.log(left, top);
		if (i+f == 2) top += h+spacing+spacing/2;
		if (i+f == 3){
			 left += h+spacing+Math.round(spacing/3);
			 top += h+Math.round(spacing/3);
		}
		if (i+f == 4) left += h+spacing/2;
		h = Math.round(h/gr);
		if (i+f == 1) left -= h+spacing;
		if (i+f == 5) left -= h+spacing/2;
		if (i+f == 4){
			top -= h+spacing/2;
			left -= h;
		}
		if (i+f == 3) top -= h;
		h -= spacing/2;
		$("body").append("<div id=\'c"+i+"\'></div>");
		divs["#c"+i] = i;
		$("#c"+i).css({"width":h.toString(), 
				"height":h.toString(),
				"position":"absolute",
				"left":left+"px",
				"top":top+"px"});
		$("#c"+i).hide().fadeIn("slow");
		pos.push([left, top, h]);
	}
	// $(window).resize(function(){
 //    	createDivs();
	// });
	console.log(pos);

	return [h, left, top];
}

// function resizeDivs(){
// 	for (var d in divs){

// 	}
// }

function turn(dist){
	var endInds;
	if (dist < 0){
		endInds = [0,5,-1];
	}else{
		endInds = [5,0,1];
	}
	for (var d in divs){
		if (divs[d] == endInds[0]){
			divs[d] = endInds[1];
			$(d).fadeOut("fast", function(){
				$(this).css({
					"left":pos[endInds[1]][0]+"px",
					"top":pos[endInds[1]][1]+"px",
					"width":pos[endInds[1]][2]+"px",
					"height":pos[endInds[1]][2]+"px"
				});
				$(this).fadeIn("slow");
			});
			continue;
		}
		divs[d] += endInds[2];
		$(d).animate({
			"left":pos[divs[d]][0]+"px",
			"top":pos[divs[d]][1]+"px",
			"width":pos[divs[d]][2]+"px",
			"height":pos[divs[d]][2]+"px"
		},500);
	}
}


function showThree(){
	var vertical = parseInt($(window).width()) < parseInt($(window).height());
  	$( "#title" ).fadeOut( "fast", function(){
		document.getElementById("flower").remove();
		if (vertical){
			$( "#title" ).css({ "top": "5%", "right":"1%", "left":"auto"});
		}else{
			$( "#title" ).css({ "top": "2%", "right":"1%", "left":"auto"});
		}
		$( "#page2" ).animate({
		   	height: "60px",
		   	padding: "0",

		}, 500, function(){
			$("#page1").css("z-index", "0");
			$( "#page1" ).hide().css("height", "100%");	
			$( "#page1" ).fadeIn( "slow");
			$( "#title" ).fadeIn( "slow");
			initializeDivs(vertical);
		});
  	});
}
