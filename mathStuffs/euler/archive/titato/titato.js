var symbol = "";
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
	},
	get: function(k){
		return this.grid[int(k/3)][k$3];
	},
	set: function(k, val){
		this.grid[int(k/3)][k$3]; = val;
	},
	match: function(k, val){ // check if it matches 
		
	}
}

config.init();

function resetGrid(){
	for (var i=1; i<10; i++){
		var btn = document.getElementById(i.toString());
		btn.disabled = false;
		btn.innerHTML = "";
	}
	symbol = "";
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
	if (symbol == "") turn = bool;
}

function clickedCell(btnID){
	if (!turn) return;
	turn = false;
	if (symbol == ""){
		if (document.getElementById("cross").checked){
			symbol = "&times;";
		}else{
			symbol = "&#9675;";
		}
	}
	var btn = document.getElementById(int(btnID));
	btn.innerHTML = symbol;
	btn.disabled = true;
}

/**
check if a move ends a game
*/
function checkWin(move, val){

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
		if (moveValue == -1){ // leaf
			if (checkWin(moveValue, lastMove)){
				return {
					h: win, hStar: win, move: 9
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