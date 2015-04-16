var canvas;
var ctx;

var gr = 1.61803398875;

var nextPetal = null;
var cvsSize;

function drawPetal(n, size){
    ctx.beginPath();
	ctx.rotate(Math.PI*2/gr);
    ctx.moveTo(0,0);
    ctx.bezierCurveTo(size*0.4,size*0.5,size*0.4,size*0.8,0,size);
    ctx.bezierCurveTo(-size*0.4,size*0.8,-size*0.4,size*0.5,0,0);
    ctx.fill();
}

function drawFlower(n,c,ms,pn,r){
	if (n==pn){
		nextPetal = null;
		return;
	} 
	ctx.globalAlpha = 0.8;
	ctx.fillStyle = "rgb("+Math.min(Math.round(c[0]+n*(225-c[0])/pn),225).toString()+
					","+Math.min(Math.round(c[1]+n*(225-c[1])/pn),225).toString()+
					","+Math.min(Math.round(c[2]+n*(225-c[2])/pn),225).toString()+")";
	s = Math.max(ms-n*r,0);
	if (s==0){
		nextPetal = null;
		return;
	} 
	drawPetal(n,s);
	nextPetal = setTimeout(function(){ drawFlower(n+1,c,ms,pn,r); }, 110);
}

function clearCanvas(){
	for (var i=0; i<5; i++){
		ctx.clearRect (0,0,cvsSize,cvsSize);
		ctx.rotate(Math.PI/2.5);
	}
}

function start(){
	if (nextPetal != null){
		return;
		// clearTimeout(nextPetal);
	}
	clearCanvas();
	color = [Math.random()*225, Math.random()*225, Math.random()*225];
	freq = Math.round(canvas.width/40);
	rate = Math.round(canvas.width/100);
	console.log(freq, rate);
	drawFlower(0, color, halfSize, freq, rate);
}

function getCanvas(){
	canvas = document.getElementById('logoAnimate');
	cvsSize = Math.min($(window).width(), $(window).height())/1.2;
	canvas.height = cvsSize;
	canvas.width = cvsSize;
	halfSize = cvsSize/2;
    ctx = canvas.getContext('2d');
    ctx.translate(halfSize,halfSize);
}

window.onload = function(){
	getCanvas();
	start();
	$(".title").hover(function(){
		start();
	},function(){return;});
}

window.onresize = function(){
	getCanvas();
}
