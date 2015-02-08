var canvas;
var ctx;

var cvsSize = 500;
var halfSize = cvsSize/2;
var gr = 1.61803398875;

var nextPetal = null;

function drawPetal(n, size){
    ctx.beginPath();
	ctx.rotate(Math.PI*2/gr);
    ctx.moveTo(0,0);
    ctx.bezierCurveTo(size*0.4,size*0.5,size*0.4,size*0.8,0,size);
    ctx.bezierCurveTo(-size*0.4,size*0.8,-size*0.4,size*0.5,0,0);
    ctx.fill();
}

function drawFlower(n,c,ms,pn,r){
	if (n==pn) return;
	ctx.globalAlpha = 0.9
	ctx.fillStyle = "rgb("+Math.min(c[0]+Math.round(n*(225-c[0])/pn),225).toString()+
					","+Math.min(c[1]+Math.round(n*(225-c[1])/pn),225).toString()+
					","+Math.min(c[2]+Math.round(n*(225-c[2])/pn),225).toString()+")";
	s = Math.max(ms-n*r,0);
	if (s==0) return;
	drawPetal(n,s);
	nextPetal = setTimeout(function(){ drawFlower(n+1,c,ms,pn,r); }, 110);
}

function clearCanvas(){
	for (var i=0; i<4; i++){
		ctx.clearRect (0,0,cvsSize*2,cvsSize*2);
		ctx.rotate(Math.PI/2);
	}
}

function start(){
	if (nextPetal != null){
		clearTimeout(nextPetal);
	}
	clearCanvas();
	maxSize = parseInt(document.getElementById("sliderSize").innerHTML);
	color = hexToRgb(document.getElementById("flcol").value);
	freq = parseInt(document.getElementById("freq").value);
	rate = parseInt(document.getElementById("rate").value);
	drawFlower(0, color, maxSize, freq, rate);
}

function showValue(newValue, id_)
{
	document.getElementById(id_).innerHTML=newValue;
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
}

function getCanvas(){
	canvas = document.getElementById('demo');
	canvas.width = cvsSize;
	canvas.height = cvsSize;
    ctx = canvas.getContext('2d');
    ctx.translate(halfSize,halfSize);
}

window.onload = function(){
	getCanvas();
	start();
}