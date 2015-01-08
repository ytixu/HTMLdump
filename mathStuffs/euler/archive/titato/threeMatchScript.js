var COLOR = ["#FF5050", "#3399FF", "#99CC00", "#FF9933", "#CC66FF", "#00CC99"];
var score = 0;
var tileSize = 45;

var board = {
	grid: [],
	width: 0,
	height:0,
	init: function(sizeX, sizeY){
		for (var i=0; i<sizeY; i++){
			this.grid.push([]);
			for (var j=0; j<sizeX; j++){
				this.grid[i].push(COLOR.length);
			}
			this.height = sizeX;
			this.width = sizeY;
		}
	},
	get: function(i,j){
		// console.log(i,j);
		return this.grid[i][j];
	},
	set: function(i,j,v){
		this.grid[i][j] = v
	},
	scanMatch: function(size, func){ // helper function
		for (var i=0; i<size-3; i++){
			for (var j=i+1; j<size; j++){
				console.log(i, j);
				if (func(i) != func(j)) break;
				if (i+2 == j) return true;
			}
		}
		return false;
	},
	getMatch: function(size,a,func){ // helper function
		for (var i=a+1; i<a+3 && i<size; i++){
			if (!func(i)) break;
		}
		for (var i=a-1; i>a-3 && i>-1; i--){
			if (!func(i)) break;
		}
	},
	signleMatch: function(i,j){
		var color = this.get(i,j);
		var colTiles = [];
		this.getMatch(this.height,i, function(x){ 
				if (board.get(x,j)==color){
					colTiles.push([x,j]);
					return true;
				} return false;
			});
		if (colTiles.length < 2) colTiles = [];
		var rowTiles = [];
		this.getMatch(this.width,j, function(x){ 
				if (board.get(i,x)==color){
					rowTiles.push([i,x]);
					return true;
				} return false;
			});
		if (rowTiles.length < 2) rowTiles = [];
		rowTiles = rowTiles.concat(colTiles);
		if (rowTiles.length > 0) rowTiles.push([i,j])
		return rowTiles;
	},
	hasMatch: function(row){
		for (var i=0; i<this.height; i++){
			if (this.scanMatch(this.height, 
				function(x){ return board.get(x,col); })) return true;
		}
		for (var j=0; j<this.width; j++){
			if (this.scanMatch(this.width, 
				function(x){ return board.get(row,x); })) return true;
		}
		return false;
	},
	doForall: function(func){
		for (var i=0; i<this.height; i++){
			for (var j=0; j<this.width; j++){
				func(i,j);
			}
		}
	}
};

function swap(icol, irow, jcol, jrow){
	board.set(icol, irow, board.get(icol, irow)^board.get(jcol, jrow));
	board.set(jcol, jrow, board.get(icol, irow)^board.get(jcol, jrow));
	board.set(icol, irow, board.get(icol, irow)^board.get(jcol, jrow));
}

function shuffle(){
	var size = grid.height*grid.width;
	for (var i=0; i<size; i++){
		var j = Math.round(Math.random()*size);
		swap(Math.floor(i/grid.height), i%grid.width,
			 Math.floor(j/grid.height), j%grid.width);
	}
}

function distributeColor(colorNumb){
	board.doForall(function(i,j){
		board.set(i,j,Math.floor(Math.random()*colorNumb));
	});
}

function reset(){
	score = 0;
	board.grid = [];
}

function setCanvas(x, y){
	var canvas = document.getElementById("demo");
	canvas.height = x*tileSize;
	canvas.width = y*tileSize;
	var ctx = canvas.getContext("2d");
	board.doForall(function(i,j){
		ctx.beginPath();
		ctx.fillStyle=COLOR[board.get(i,j)];
		ctx.rect(j*tileSize,i*tileSize,(j+1)*tileSize,(i+1)*tileSize);
		ctx.fill();
		var m = board.signleMatch(i,j);
		for (var i in m) console.log(m[i], board.get(m[i][0], m[i][1]));
	});
}

function initialize(colorNumb, x, y){
	board.init(x,y);
	distributeColor(colorNumb)
	setCanvas(x,y);
}

initialize(3, 5, 5)