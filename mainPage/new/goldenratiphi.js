var maxSize = 300;
var canvas;
var ctx;
var cvsSize = 600;
var halfSize = cvsSize/2;
var gr = 1.61803398875;
var flcol = [100,35,0];
var overlaycol = [200,200,200];
var recN = 0;

function drawPetal(n, size){
    ctx.beginPath();
	ctx.rotate(Math.PI*2/gr);
    ctx.moveTo(0,0);
    ctx.bezierCurveTo(size*0.4,size*0.5,size*0.4,size*0.8,0,size);
    ctx.bezierCurveTo(-size*0.4,size*0.8,-size*0.4,size*0.5,0,0);
    ctx.fill();
}

function drawFlower(c){
	if (recN>78) return;
	ctx.globalAlpha = 0.1
	ctx.fillStyle = "rgb("+Math.min(c[0]+recN*2,225).toString()+
					","+Math.min(c[1]+recN*2,225).toString()+
					","+Math.min(c[2]+recN*2,225).toString()+")";
	s = Math.max(maxSize-recN*3,0);
	if (s==0) return;
	drawPetal(recN,s);
	recN+=1;
	if (recN == 78) showThree();
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

function showThree(){
  	$( "#title" ).fadeOut( "fast", function(){
		document.getElementById("flower").remove();
		$( "#title" ).css({ "top": "1%", "right":"1%", "left":"auto"});
		$( "#page2" ).animate({
		   	height: "60px",
		   	padding: "0",

		}, 500, function(){
			$("#page1").css("z-index", "0");
			$( "#page1" ).animate({
			   	height: "100%",
			}, 500);	
			$( "#title" ).fadeIn( "slow");
		});
  	});
}

window.addEventListener ("mousewheel", function (event) {
	console.log(scrollVal);
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
		}, 4000);
	}else if (scrollVal < -200){
		drawFlower(flcol);
	}
	scrollVal += event.wheelDelta;
}, false);

window.onload = function(){
	getCanvas();
}
