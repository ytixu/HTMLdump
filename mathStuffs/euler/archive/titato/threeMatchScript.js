var COLOR = ["#FF5050", "#3399FF", "#99CC00", "#FF9933", "#CC66FF", "#00CC99"];
var defColor = COLOR.length;
var score = 0;
var tileSize = 45;
var colorNumb = 5;
var ctx = null;

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
					colMatch: false,
					rowMatch: false
				});
			}
			this.height = sizeX;
			this.width = sizeY;
		}
	},
	getColor: function(i,j){ return this.grid[i][j].color; },
	setColor: function(i,j,v){ this.grid[i][j].color = v; },
	getColMat: function(i,j){ return this.grid[i][j].colMatch; },
	setColMat: function(i,j,v){ this.grid[i][j].colMatch = v; },
	getRowMat: function(i,j){ return this.grid[i][j].rowMatch; },
	setRowMat: function(i,j,v){ this.grid[i][j].rowMatch = v; },

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
					this.setColMat(i+1,j, true);
					this.setColor(i,j, defColor);
					this.setColor(i+1,j, defColor);
					this.setColor(i+2,j, defColor);
					score++;
				}
			}
		}
		for (var j=0; j<this.width-2; j++){
			for (var i=0; i<this.height; i++){
				var col = this.getColor(i,j);
				if (this.getColor(i,j+1) == col && this.getColor(i,j+2) == col){
					this.setRowMat(i,j+1, true);
					this.setColor(i,j, defColor);
					this.setColor(i,j+1, defColor);
					this.setColor(i,j+2, defColor);
					score++;
				}
			}
		}
		// check if there are matches 
		if (preScore < score) return true;
		return false;
	},
	shiftDownOneCol: function(i, j, func){ // helper function
		if (i==0){
			this.setColor(i,j,randColor());
			func(i,j);
			return;
		}
		if (this.getColor(i-1,j) == defColor) this.shiftDownOneCol(i-1,j,func);
		this.setColor(i, j, this.getColor(i-1,j));
		func(i,j);
		this.shiftDownOneCol(i-1,j,func);
	},
	shiftDown: function(func){ // func for animate the tile
		this.doForall(function(i,j){
			if (board.getColMat(i,j)){
				board.shiftDownOneCol(i+1,j,func);
			}else if (board.getRowMat(i,j)){
				board.shiftDownOneCol(i,j-1,func);
				if (!board.getRowMat(i,j+1)){
					board.shiftDownOneCol(i,j,func);
					board.shiftDownOneCol(i,j+1,func);
				}
			}
			// reset state
			board.setColMat(i,j,false);
			board.setRowMat(i,j,false);
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
	}
};


function reset(){
	score = 0;
	board.grid = [];
}

function convert(x){
	return x*tileSize;
}

function printTile(x,y,color){
	ctx.beginPath();
	ctx.fillStyle=color;
	ctx.rect(x,y,x+tileSize,y+tileSize);
	ctx.fill();
}

function paintGrid(){
	board.doForall(function(i,j){
		printTile(convert(j),convert(i),COLOR[board.getColor(i,j)]);
	});
}

var SPEED = tileSize/6;

function shiftTile(sx,sy,fx,fy,tilei,tilej){
	console.log(board.getColor(tilei,tilej));
	if (sx == fx && sy == fy) return;
	printTile(sx,sy,"#FFFFFF");
	if (sx < fx) xs += SPEED;
	else if (sy < fy) sy+= SPEED;
	printTile(sx,sy,COLOR[board.getColor(tilei,tilej)]);
	window.setTimeout(function(){
			shiftTile(sx,sy,fx,fy,tilei,tilej); }
		, 100);
}

function autoMatch(){
	if (board.markAllMatches()){
		board.shiftDown(function(i,j){
			shiftTile(convert(j), convert(i-1), convert(j), convert(i), i,j);
		});
		paintGrid();
		board.printGrid();
		// setTimeout(function(){ autoMatch() },500);
	}
}

function setCanvas(x, y){
	var canvas = document.getElementById("demo");
	canvas.height = x*tileSize;
	canvas.width = y*tileSize;
	ctx = canvas.getContext("2d");
	paintGrid();
	// board.printGrid();
	setTimeout(function(){ autoMatch() },500);
}

function initialize(x, y){
	board.init(x,y);
	board.distributeColor()
	setCanvas(x,y);
}

initialize(5,5);