var maxSize = 300;
var canvas;
var ctx;
var cvsSize = 1000;
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
    ctx.moveTo(0,0);
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
	// setTimeout(function(){ drawFlower(c); }, 110);
}

function getCanvas(){
	canvas = document.getElementById('flower');
	canvas.width = cvsSize;
	canvas.height = cvsSize;
    ctx = canvas.getContext('2d');
    ctx.translate(halfSize,halfSize);
}

var maxOffset = 0;

window.onscroll = function () {
	drawFlower(flcol);
	console.log($("#page1").height());
	if (window.pageYOffset < 250 && maxOffset < window.pageYOffset){
		$("#page1").css("top", "-=85px");
		$("#page1").height($("#page1").height() - 155);
		maxOffset = window.pageYOffset;
	}
}

window.onload = function(){
	getCanvas();
}