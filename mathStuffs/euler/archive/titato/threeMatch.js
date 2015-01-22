var COLOR = ["#3399ff", "#ff9933", "#99cc00", "#ff4d4d", "#cc66ff", "#00cc99"];
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
			this.height = sizeY;
			this.width = sizeX;
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
					score++;
				}
			}
		}
		for (var j=0; j<this.width-2; j++){
			for (var i=0; i<this.height; i++){
				var col = this.getColor(i,j);
				if (this.getColor(i,j+1) == col && this.getColor(i,j+2) == col){
					this.setRowMat(i,j+1, true);
					score++;
				}
			}
		}
		this.doForall(function(i,j){
			if (board.getRowMat(i,j)){
				board.setColor(i,j, defColor);
				board.setColor(i,j+1, defColor);
				board.setColor(i,j-1, defColor);
			}
			if (board.getColMat(i,j)){
				board.setColor(i,j, defColor);
				board.setColor(i+1,j, defColor);
				board.setColor(i-1,j, defColor);
			}
		})
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

