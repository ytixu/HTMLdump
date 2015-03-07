var timeStep = 0.01; // squared already
var thr = 0.01;
var size=13;
var deceleration = 0.99;

var cvsSizeX = 500;
var cvsSizeY = 500;
var maxDist = cvsSizeY/(size+1);
var ctx;

//input
var tempo = 1;
var ampX = 1;
var freX = 1;

function addV(vec1, vec2){
	return [vec1[0] + vec2[0], vec1[1] + vec2[1]];
}

function inv(vec){
	return [-vec[0], -vec[1]];
}

function multV(vec, scal){
	return [vec[0]*scal, vec[1]*scal];
}

function dist(vec1, vec2){
	return Math.sqrt(Math.pow(vec1[0]-vec2[0],2) + Math.pow(vec1[1]-vec2[1],2));
}

var points = {
	list: [],
	init: function(){
		for (var i=0; i<size; i++){
			this.list.push({curr: [cvsSizeX/2, cvsSizeY-i*maxDist],
							   old: inv([cvsSizeX/2, cvsSizeY-i*maxDist])});
		}
	},
	update: function(acc){
		da = multV(acc, timeStep*tempo);
		for (var i=1; i<size; i++){
			newP = addV(addV(multV(this.list[i].curr, 2), this.list[i].old), da);
			this.list[i].old = inv(this.list[i].curr);
			this.list[i].curr = newP;
			da = multV(da,deceleration);
		}
	},
	adjustDistance: function(){
		notGood = false;
		for (var i=0; i<size-1; i++){
			if (dist(this.list[i].curr, 
					this.list[i+1].curr) > maxDist+thr){
				var x = this.list[i].curr[0] - this.list[i+1].curr[0];
				var y = this.list[i].curr[1] - this.list[i+1].curr[1];
				if (i!=0){
					this.list[i].curr[0] -= x*0.5;
					this.list[i].curr[1] -= y*0.5;
				}
				this.list[i+1].curr[0] += x*0.5;
				this.list[i+1].curr[1] += y*0.5;
				notGood = true;
			}
		}
		return notGood;
	}
}

function acceleration(t){
	return [ampX*1000*Math.sin(t*freX), Math.cos(t/1000)-1000];
}

function drawFace(){
	lastP = points.list[size-1].curr;
	// eye
	ctx.beginPath();
	ctx.fillStyle = 'white';
	ctx.arc(lastP[0]+15, lastP[1]-10, 10, 0, Math.PI, false);
	ctx.fill();
	ctx.arc(lastP[0]-15, lastP[1]-10, 10, 0, Math.PI, false);
	ctx.fill();

	ctx.beginPath();
	ctx.arc(lastP[0], lastP[1]+10, 4, 0, 2*Math.PI, false);
	ctx.strokeStyle = "white";
	ctx.stroke();
}

function draw(){
	ctx.clearRect ( 0 , 0 , cvsSizeX, cvsSizeY );
	for (var i=0; i<size; i++){
		p = points.list[i];
		ctx.beginPath();
		ctx.arc(p.curr[0], p.curr[1], maxDist, 0, 2 * Math.PI, false);
		ctx.fillStyle = '#ffdd55';
		ctx.fill();
	}
	drawFace();
}

window.requestAnimFrame = (function(){
  return function( callback ){
            window.setTimeout(callback, 1000/10);
          };
})();

var t = 0.0;

function animloop(){
	points.update(acceleration(t));
	t += 1;
	if (t > 1000){
		t = 0.0;
	}
	while (points.adjustDistance()){}
	draw();
	requestAnimFrame(animloop);
}

function setup(){
	var canvas = document.getElementById("demo");
	canvas.width = cvsSizeX;
	canvas.height = cvsSizeY;
	ctx = canvas.getContext('2d');
	points.init();
	// draw();
	animloop();
}

setup();