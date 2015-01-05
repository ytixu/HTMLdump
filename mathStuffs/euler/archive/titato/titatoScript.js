var yourSymbol = "";
var mySymbol = "";
var turn = true;
var lastMove = -1;
var minimaxPlayer = false;

var config = {
	grid: [],
	init: function(){
		for (var i=0; i < 3; i++){
			this.grid.push([]);
			for (var j=0; j < 3; j++){
				this.grid[i].push(0);
			}
		}
		// console.log("init" + this.grid);
	},
	get: function(k){
		return this.grid[parseInt(k/3)][k%3];
	},
	set: function(k, val){
		this.grid[parseInt(k/3)][k%3] = val;
	},
	reset: function(){
		for (var i=0; i < 9; i++){
			this.set(i, 0);
		}
	},
	match: function(k, val){ // check if it matches 
		if (k < 0) return null;
		var row = parseInt(k/3);
		var col = k%3;
		// checking row
		if (this.grid[row][0] == val &&
			this.grid[row][1] == val &&
			this.grid[row][2] == val) return [row*3, row*3+1, row*3+2];
		// checking column
		if (this.grid[0][col] == val &&
			this.grid[1][col] == val &&
			this.grid[2][col] == val) return [col, col+3, col+6];
		// checking diag
		if (this.grid[1][1] != val) return null;
		if (this.grid[0][0] == val &&
			this.grid[2][2] == val) return [0,4,8];
		if (this.grid[0][2] == val &&
			this.grid[2][0] == val) return [2,4,6];
		return null;
	},
	printGrid: function(){
		console.log(this.grid[0][0] + "\t" + 
					this.grid[0][1] + "\t" + 
					this.grid[0][2] + "\n" + 
					this.grid[1][0] + "\t" + 
					this.grid[1][1] + "\t" + 
					this.grid[1][2] + "\n" + 
					this.grid[2][0] + "\t" + 
					this.grid[2][1] + "\t" + 
					this.grid[2][2] + "\n" );
	}
};

config.init();

// helper function
function setGridCell(cellID, disable){
	var btn = document.getElementById(cellID);
	btn.disabled = disable;
	if (disable){
		if (yourSymbol == ""){
			chooseRobotPlayer(document.getElementById("minimaxPlayer").checked);
			if (document.getElementById("cross").checked){
				yourSymbol = "&times;";
				mySymbol = "&#9675;";
			}else{
				yourSymbol = "&#9675;";
				mySymbol = "&times;";
			}
		}
		if (turn){
			btn.innerHTML = yourSymbol;
		}else{
			btn.innerHTML = mySymbol;
		}
	}else{
		btn.innerHTML = "";
	}
}

function resetGridCell(cellID){
	setGridCell(cellID, false);
}

function writeGridCell(cellID){
	setGridCell(cellID, true);
}

// button reset
function resetGrid(){
	document.getElementById("result").innerHTML = "";
	for (var i=0; i<9; i++){
		resetGridCell(i.toString());
	}
	yourSymbol = "";
	mySymbol = "";
	config.reset();
	setTurn(document.getElementById("start").checked);
	// config.printGrid();
}

// only called when page done loading
function reset(){
	document.getElementById("cross").checked = true;
	document.getElementById("start").checked = true;
	resetGrid();
}

// radio button for turn
function setTurn(bool){
	if (yourSymbol == ""){
		turn = bool;
		if (!turn){
			minimaxPlayer = false;
			robotMove();
		}
	}
}

function chooseRobotPlayer(bool){
	if (yourSymbol == ""){
		minimaxPlayer = bool;
	}
}

function endGame(tiles){
	for (var i in tiles){
		var btn = document.getElementById(tiles[i].toString());
		var div = document.createElement("div");
		div.style.color = "red";
		div.innerHTML = btn.innerHTML
		btn.innerHTML = "";
		btn.appendChild(div);
	}
	for (var i=0; i<9; i++){
		document.getElementById(i.toString()).disabled = true;
	}
}

// player click a cell 
function clickedCell(btnID){
	if (!turn) return;
	var index =  parseInt(btnID);
	config.set(index, -1);
	writeGridCell(btnID);
	turn = false;
	lastMove = index;
	robotMove();
}

// constants for determine win/loss/tie
var END = 10;
var TIE = 9;

var MAXPLAYER = true;

function robotMove(){
	var res = null;
	if (minimaxPlayer){
		res = minimax(MAXPLAYER, lastMove);
	}else{
		res = randomPlay(MAXPLAYER, lastMove);
	}
	if (res.move == END){
		endGame(res.tiles);
		document.getElementById("result").innerHTML = "You win!";
	}else if(res.move == TIE){
		document.getElementById("result").innerHTML = "Tie!";
	}else{
		writeGridCell(res.move.toString());
		config.set(res.move, 1);
		var tile = config.match(res.move, 1);
		console.log(tile);
		if (tile != null){
			endGame(tile);
			document.getElementById("result").innerHTML = "You lose!";
		}
	}
	// config.printGrid();
	turn = true;
}


var MAXCONST = 123;
/**
return a dictionary with heuristic score and optimal move
*/
function minimax(maxPlayer, lastMove){ 
	var bestMove = MAXCONST;
	var bestValue = MAXCONST;
	var moveValue = 1;
	var compare = null;
	if (maxPlayer){
		bestValue = -MAXCONST;
		moveValue = -1;
		compare = function(a,b){ return a>b; }
	}else{
		compare = function(a,b){ return a<b; }
	}
	// base case
	var tile = config.match(lastMove, moveValue);
	if (tile != null){
		return { h: moveValue, move: END, tiles: tile };
	}
	moveValue = -moveValue;
	for (var i=0; i<9; i++){
		if (config.get(i) == 0){
			config.set(i, moveValue); 
			var temp = minimax(!maxPlayer, i);
			config.set(i, 0);
			if(compare(temp.h, bestValue)){
				bestValue = temp.h;
				bestMove = i;
			}
		}
	}
	if (bestMove == 123){ // tie
		return { h: 0, move: 9 };
	}else{
		return { h: bestValue, move: bestMove };
	}
}

function randomPlay(){
	var tile = config.match(lastMove, -1);
	if (tile != null){
		return { move: END, tiles: tile};
	}
	var ind = parseInt(Math.random()*9);
	while (config.get(ind) != 0){
		ind = (ind+1)%9;
	}
	return { move: ind };
}