var symbol = "";
var turn = true;

function resetGrid(){
	for (var i=1; i<10; i++){
		var btn = document.getElementById(i.toString());
		btn.disabled = false;
		btn.innerHTML = "";
	}
	symbol = "";
	if (document.getElementById("start").checked){
		turn = true;
	}
}

function reset(){
	document.getElementById("cross").checked = true;
	document.getElementById("start").checked = true;
	resetGrid();
}

function setTurn(bool){
	turn = bool;
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
	var btn = document.getElementById(btnID);
	btn.innerHTML = symbol;
	btn.disabled = true;
}