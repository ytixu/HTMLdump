var ctx;
var gr = 1.0/1.618;
var width;
var height;
var color = "#aaaaaa";
var density = 0.02;

function getCanvas(){
	var canvas = document.getElementById("grspinner");	
	width = canvas.width - 20;
	height = width*gr;
	canvas.height = height + 20;
	ctx = canvas.getContext("2d");
	ctx.fillStyle = color;
}

function pointFactory(){
	return {
		section: 3,
		center: [width+10, height+10],
		radius: width,
		theta:-Math.PI,
		size: width/20.0,
		active: false,
		draw: function(){
			var x = Math.cos(this.theta);
			var y = Math.sin(this.theta);
			if (Math.abs(x) < 0.01 || Math.abs(y) < 0.01){
				if (this.section == 0){
					this.center[1] -= this.radius*(1-gr);
				}else if (this.section == 1){
					this.center[0] += this.radius*(1-gr);
				}else if(this.section == 2){
					this.center[1] += this.radius*(1-gr);
				}else{
					this.center[0] -= this.radius*(1-gr);
				}
				this.radius *= gr;
				this.section = (this.section+1)%4;
			}
			x = x*this.radius + this.center[0];
			y = this.center[1] - y*this.radius;
			ctx.beginPath();
			ctx.arc(x, y, this.size, 0, 2*Math.PI);
			ctx.fill();
			this.theta -= Math.PI/12;
			if (this.radius < 5){
				this.active = false;
			}
			this.size*=0.95;
		},
		restart: function(){
			this.section = 3;
			this.center = [width+10, height+10];
			this.radius = width;
			this.theta =-Math.PI;
			this.size = width/20.0;
			this.active = true;
		}
	}
}

getCanvas();
var points = [pointFactory(),pointFactory(),pointFactory(), pointFactory(),pointFactory(),pointFactory(),pointFactory(), pointFactory()];


window.requestAnimFrame = (function(){
  return function( callback ){
        window.setTimeout(callback, 1000/30);
      };
})();

function animate(){
	ctx.clearRect(0,0,width+20, height+20);
	for (var i=0; i<points.length; i++){
		if (!points[i].active && Math.random() < density){
			points[i].restart();
		}
		if (points[i].active){
			points[i].draw();
		}
	}
	requestAnimFrame(animate);
}

animate();