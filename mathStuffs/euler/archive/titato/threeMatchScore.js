var COLOR = ["#3399ff", "#ff9933", "#99cc00", "#ff4d4d", "#cc66ff", "#00cc99"];
var defColor = COLOR.length;
var score = 0;
var tileSize = 45;
var colorNumb = 5;
var canvas = null;
var ctx = null;
var doubleMatchLine = 2;
var trippleMatchLine = 3;
var lMatch = 2;


function randColor(){
	return Math.floor(Math.random()*colorNumb);
}

var board = {
	grid: [],
	width: 0,
	height:0,
	init: function(sizeX, sizeY){
		for (var i=0; i<sizeY; i++){
			this.grid.push([]);
			for (var j=0; j<sizeX; j++){
				this.grid[i].push({
					color: defColor,
					colMatch: 0,
					rowMatch: 0
				});
			}
			this.height = sizeY;
			this.width = sizeX;
		}
	},
	getColor: function(i,j){ return this.grid[i][j].color; },
	setColor: function(i,j,v){ this.grid[i][j].color = v; },
	getColMat: function(i,j){ return this.grid[i][j].colMatch; },
	incColMat: function(i,j){ this.grid[i][j].colMatch += 1; },
	resetColMat: function(i,j){ this.grid[i][j].colMatch = 0; },
	getRowMat: function(i,j){ return this.grid[i][j].rowMatch; },
	incRowMat: function(i,j){ this.grid[i][j].rowMatch += 1; },
	resetRowMat: function(i,j){ this.grid[i][j].rowMatch = 0; },

	doForall: function(func){
		for (var i=0; i<this.height; i++){
			for (var j=0; j<this.width; j++){
				func(i,j);
			}
		}
	},
	swap: function (icol, irow, jcol, jrow){
		this.setColor(icol, irow, this.getColor(icol, irow)^this.getColor(jcol, jrow));
		this.setColor(jcol, jrow, this.getColor(icol, irow)^this.getColor(jcol, jrow));
		this.setColor(icol, irow, this.getColor(icol, irow)^this.getColor(jcol, jrow));
	},
	shuffle: function(){
		var size = this.height*this.width;
		for (var i=0; i<size; i++){
			var j = Math.round(Math.random()*size);
			this.swap(Math.floor(i/this.height), i%this.width,
				 Math.floor(j/this.height), j%this.width);
		}
	},
	distributeColor: function(){
		this.doForall(function(i,j){
			board.setColor(i,j,randColor());
		});
	},
	markAllMatches: function(){
		var preScore = score;
		for (var i=0; i<this.height-2; i++){
			for (var j=0; j<this.width; j++){
				var col = this.getColor(i,j);
				if (this.getColor(i+1,j) == col && this.getColor(i+2,j) == col){
					this.incColMat(i,j);
					this.incColMat(i+1,j);
					this.incColMat(i+2,j);
					score++;
				}
			}
		}
		for (var j=0; j<this.width-2; j++){
			for (var i=0; i<this.height; i++){
				var col = this.getColor(i,j);
				if (this.getColor(i,j+1) == col && this.getColor(i,j+2) == col){
					this.incRowMat(i,j);
					this.incRowMat(i,j+1);
					this.incRowMat(i,j+2);
					score++;
				}
			}
		}
		this.doForall(function(i,j){
			if (board.getRowMat(i,j) > 0){
				board.setColor(i,j, defColor);
			}
			if (board.getColMat(i,j) > 0){
				board.setColor(i,j, defColor);
			}
			// score
			if (board.getRowMat(i,j) == 2 || board.getColMat(i,j) == 2){
				score += doubleMatchLine;
			}else if (board.getRowMat(i,j) == 3 || board.getColMat(i,j) == 3){
				score += trippleMatchLine;
			}
			if (board.getRowMat(i,j) > 2 && board.getColMat(i,j) > 2){
				score += lMatch;
			}
		})
		console.log(score);
		// check if there are matches 
		if (preScore < score) return true;
		return false;
	},
	shiftDownOneCol: function(i, j){ // helper function
		if (i==0){
			this.setColor(i,j,randColor());
			return;
		}
		this.setColor(i, j, this.getColor(i-1,j));
		this.shiftDownOneCol(i-1,j);
	},
	shiftDown: function(){
		this.doForall(function(i,j){
			if (board.getColor(i,j) == defColor){
				board.shiftDownOneCol(i,j);
			}
			// reset state
			board.resetRowMat(i,j);
			board.resetColMat(i,j);
		});
	},
	printGrid: function(){
		var str = "color\n";
		this.doForall(function(i,j){
			str += board.getColor(i,j).toString() + " ";
			if (j==board.width-1) str += "\n";
		});
		str += "match\n";
		this.doForall(function(i,j){
			if (board.getColMat(i,j)) str += "1 ";
			else if (board.getRowMat(i,j)) str += "1 ";
			else str += "0 ";
			if (j==board.width-1) str += "\n";
		});
		console.log(str);
	},
	copyColor: function(){
		var copy = [];
		for (var i = 0; i < this.height; i++){
		    copy.push([]);
		    for (var j=0; j< this.width; j++){
		    	copy[i].push(this.getColor(i,j));
		    }
		}
		return copy;
	}
};


function resetStates(){
	score = 0;
	board.grid = [];
}

function convert(x){
	return x*tileSize;
}

function printTile(x,y,color){
	// console.log(x,y,tileSize,tileSize,color);
	ctx.beginPath();
	ctx.fillStyle=color;
	ctx.rect(x,y,tileSize,tileSize);
	ctx.fill();
}

function fadeInPrint(alpha){
	if (alpha > 1) return;
	ctx.globalAlpha = alpha;
	board.doForall(function(i,j){
		// console.log(convert(j),convert(i), board.getColor(i,j));
		printTile(convert(j),convert(i),COLOR[board.getColor(i,j)]);
	});
	setTimeout(function(){ fadeInPrint(alpha+0.1); }, 100);
}

function paintGrid(){
	fadeInPrint(0.2);
}

///////////////////////////////

var BASECOL = "#ffffff";
var TIMES = 5;
var SPEED = tileSize/TIMES;
var TIMEQUO = 15;
var NEXTCALL = 0;
var reset = false;
var running = false;

function paintSlice(x, y, xf, yf, color){
	ctx.beginPath();
	ctx.fillStyle=color;
	ctx.rect(x, y, xf, yf);
	ctx.fill();
}

function animateSlideDown(mat, i, j, n, coords, t){
	if (t == 0 || coords[3] == 0){
		slideDownOneCol(mat, i-1, j, n+1);
		return;
	}
	// console.log(coords);
	var slice = ctx.getImageData(coords[0], coords[1], coords[2], coords[3]);
	paintSlice(coords[0], coords[1], coords[2], coords[3], BASECOL);
	coords[1]+=SPEED;
	ctx.putImageData(slice, coords[0], coords[1]);
	setTimeout(function(){  
		animateSlideDown(mat, i, j, n, coords, t-1);
	},TIMEQUO);
}

function slideDownOneCol(mat, i, j, n){
	while (i>-1){
		if (mat[i][j] == defColor){
			var coords = [convert(j), convert(0+n), tileSize, convert(i)]
			// console.log(i, j, n, coords);
			animateSlideDown(mat, i, j, n, coords, TIMES);
			break;
		}
		i--;
	}
}

function slideDown(mat){
	for (var i in mat){
		for (var j in mat[i]){
			if (mat[i][j] == defColor){
				printTile(convert(j),convert(i),BASECOL);
			}
		}
	}
	// console.log("copy", mat);
	for (var j=0; j<board.width; j++){
		slideDownOneCol(mat, board.height-1, j, 0);
	}
}

var callAutomatch = function(){
	setTimeout(function(){autoMatch();},1000); 
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function checkValid(){
	board.doForall(function(i,j){
		var imgd = ctx.getImageData(convert(j), convert(i), 1, 1);
		var pix = imgd.data;
		var r = pix[0];
		var g = pix[1];
		var b = pix[2];
		var color = rgbToHex(r, g, b);
		if (color != BASECOL && color != COLOR[board.getColor(i,j)]){ 
			printTile(convert(j), convert(i), COLOR[board.getColor(i,j)]);
			console.log(COLOR[board.getColor(i,j)],color, i,j);
			// board.printGrid();
			board.getColor(100,100); 
		}
	})
}

function autoMatch(){
	if (reset){
		reset = false;
		running = false;
		restart();
		return;
	}
	if (board.markAllMatches()){
		running = true;
		// board.printGrid();
		slideDown(board.copyColor());
		board.shiftDown();
		document.getElementById("scoreNumb").innerHTML=score;
		setTimeout(function(){ 
			// checkValid();
			paintGrid();
			callAutomatch();
		},NEXTCALL);
	}else{
		running = false;
		bindCanvasToMouse();
	}
	// paintGrid();
}

function setCanvas(x, y){
	canvas = document.getElementById("demo");
	if (ctx == null){
		ctx = canvas.getContext("2d");
	}else{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	canvas.height = y*tileSize;
	canvas.width = x*tileSize;
	paintGrid();
	// board.printGrid();
	callAutomatch()
}

function eraseError(){
	setTimeout(function(){
		document.getElementById("errorMess").innerHTML = "";
	}, 2000);
}

function initialize(x,y){
	NEXTCALL = (TIMES+1)*TIMEQUO*y;
	board.init(x,y);
	board.distributeColor()
	setCanvas(x,y);
}

function restart(){
	if (document.getElementById('three').checked){
		colorNumb = 3;
	}else if (document.getElementById('four').checked){
		colorNumb = 4;
	}else if (document.getElementById('five').checked){
		colorNumb = 5;
	}else{
		colorNumb = 6;
	}
	var x = parseInt(document.getElementById('boardWidth').value);
	var y = parseInt(document.getElementById('boardHeight').value);
	if (x > 15 || y > 15 || x < 1 || y < 1){
		document.getElementById("errorMess").innerHTML = "size is between 1 and 15";
		eraseError();
		return;
	}
	if (isNaN(x) || isNaN(y)){
		document.getElementById("errorMess").innerHTML = "invalid input";
		eraseError();
		return;
	}
	if (running){
		reset = true;
	}else{
		document.getElementById("scoreNumb").innerHTML="0";
		resetStates();
		initialize(x,y);
	}
}

restart();

///////////////////////////////
// click 

var tilesSelected = null;

function bindCanvasToMouse(){
	canvas.addEventListener('mousedown', selectTile, false);
	canvas.addEventListener('mouseup',	 selectTile, false)
}

function unbindCanvasToMouse(){
	canvas.removeEventListener('mousedown', selectTile);
	canvas.removeEventListener('mouseup', selectTile);
}

function reconvert(x){
	return Math.floor(x/tileSize);
}

function animateSwap(s1, s2, d1, d2, t){
	if (t == TIMES) return;
	if (s1[0] < s2[0] || s1[1] < s2[1]){
		d1 -= SPEED;
		d2 += SPEED;
	}else{
		d1 += SPEED;
		d2 -= SPEED;
	}
	console.log(d1, d2);
	if (s1[0] != s2[0]){
		printTile(convert(s1[1]), d1, COLOR[board.getColor(s1[0], s1[1])]);
		printTile(convert(s2[1]), d2, COLOR[board.getColor(s2[0], s2[1])]);
	}else{
		printTile(d1, convert(s1[0]), COLOR[board.getColor(s1[0], s1[1])]);
		printTile(d2, convert(s2[0]), COLOR[board.getColor(s2[0], s2[1])]);
	}
	setTimeout(function(){ 
		animateSwap(s1, s2, d1, d2, t+1)
	},TIMEQUO);
}

function performSwap(s1, s2){
	board.swap(s1[0], s1[1], s2[0], s2[1]);
	if (s1[0] != s2[0])
		animateSwap(s1, s2, convert(s2[0]), convert(s1[0]), 0);
	else
		animateSwap(s1, s2, convert(s2[1]), convert(s1[1]), 0);
}

function play(s1, s2){
	unbindCanvasToMouse();
	console.log(s1,s2);
	if (s1[0] == s2[0] && s1[1] == s2[1] ||
		Math.abs(s1[0] - s2[0]) > 1 || 
		Math.abs(s1[1] - s2[1]) > 1){
			bindCanvasToMouse();
			return;
	}
	performSwap(s1,s2);
	setTimeout(function(){ 
		autoMatch();
		if (!running){
			performSwap(s2, s1);
			bindCanvasToMouse();
		}
	},500);
}

function selectTile(evt){
	// get coordinates
	var rect = canvas.getBoundingClientRect();
	var x = evt.clientX - rect.left;
	var y = evt.clientY - rect.top;

	if (tilesSelected != null){
		play(tilesSelected, [reconvert(y),reconvert(x)]);
		tilesSelected = null;
	}else{
		tilesSelected = [reconvert(y),reconvert(x)];
	}
}