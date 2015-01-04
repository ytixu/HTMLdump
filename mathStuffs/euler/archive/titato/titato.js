var yourSymbol = "";
var mySymbol = "";
var turn = true;

var config = {
	grid: [],
	init: function(){
		for (var i=0; i < 3; i++){
			this.grid.push([]);
			for (var j=0; j < 3; j++){
				this.grid[i].push(0);
			}
		}
		console.log(this.grid);
	},
	get: function(k){
		return this.grid[parseInt(k/3)][k%3];
	},
	set: function(k, val){
		this.grid[parseInt(k/3)][k%3] = val;
	},
	match: function(k, val){ // check if it matches 
		// checking row
		if (this.grid[parseInt(k/3)][0] == val &&
			this.grid[parseInt(k/3)][1] == val &&
			this.grid[parseInt(k/3)][2] == val) return true;
		// checking column
		if (this.grid[0][k%3] == val &&
			this.grid[1][k%3] == val &&
			this.grid[2][k%3] == val) return true;
		// checking diag
		if (this.grid[0][0] == val &&
			this.grid[1][1] == val &&
			this.grid[2][2] == val) return true;
		if (this.grid[0][2] == val &&
			this.grid[1][1] == val &&
			this.grid[2][0] == val) return true;
		return false;
	}
}

config.init();

function resetGrid(){
	for (var i=0; i<9; i++){
		var btn = document.getElementById(i.toString());
		btn.disabled = false;
		btn.innerHTML = "";
	}
	yourSymbol = "";
	mySymbol = "";
	if (document.getElementById("start").checked){
		turn = true;
	}else{
		turn = false;
	}
}

function reset(){
	document.getElementById("cross").checked = true;
	document.getElementById("start").checked = true;
	resetGrid();
}

function setTurn(bool){
	if (yourSymbol == "") turn = bool;
}

var lastMove = -1;

function clickedCell(btnID){
	var intID =  parseInt(btnID);
	if (!turn) return;
	turn = false;
	if (yourSymbol == ""){
		if (document.getElementById("cross").checked){
			yourSymbol = "&times;";
		}else{
			yourSymbol = "&#9675;";
		}
	}
	var btn = document.getElementById(intID);
	btn.innerHTML = yourSymbol;
	btn.disabled = true;
	lastMove = intID;
	robotMove();
}

function robotMove(){
	var res = minimax(true, lastMove);
	if (res.hStart == 1){
		document.getElementById("result").innerHTML = "You lose!";
	}else if(res.hStart == -1){
		document.getElementById("result").innerHTML = "You win!";
	}else if(res.move == 9){
		document.getElementById("result").innerHTML = "Tie!";
	}else{
		if (mySymbol = ""){
			if (document.getElementById("cross").checked){
				mySymbol = "&#9675;";
			}else{
				mySymbol = "&times;";
			}
		}
		console.log(res.move.toString());
		var btn = document.getElementById(res.move.toString());
		btn.innerHTML = mySymbol;
		btn.disabled = true;
	}
	turn = true;
}

/**
return a dictionary with h and hStar and move
returns move = 9 if leaf node or if hStar = 1
*/
function minimax(maxPlayer, lastMove){ 
	var bestMove = -123;
	var bestMove = 123;
	var moveValue = -1;
	var childNotOpt = 0;
	var compare = null;
	if (maxPlayer){
		bestValue = -123;
		moveValue = 1;
		compare = function(a,b){ return a>b; }
	}else{
		compare = function(a,b){ return a<b; }
	}
	for (var i=0; i<9; i++){
		if (config.get(i) == 0){
			config.set(i, moveValue); 
			var temp = minimax(!maxPlayer, i);
			config.set(i, 0);
			if (temp.hStart == moveValue){
				bestMove = i;
				bestValue = temp.hStart;
			}else if(compare(temp.h, bestValue)){
				bestValue = temp.h;
				bestMove = i;
			}else{
				childNotOpt += 1
			}
		}
	}
	if (childNotOpt == 0){
		if (bestMove == 123){ // leaf
			if (config.match(lastMove, moveValue)){
				return {
					h: moveValue, hStar: moveValue, move: 9
				}
			}
			return {
				h: 0, hStar: 0, move: 9
			}
		}
		return {
			h: moveValue, hStar: moveValue, move: 9
		}
	}else{
		return {
			h: 0, hStar: moveValue, move: bestMove 
		}
	}
}