var BASECOL = "#ffffff";
var TIMES = 5;
var SPEED = tileSize/TIMES;
var TIMEQUO = 20;
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
		// setTimeout(paintGrid(),600);
		// printTile(convert(0),convert(0),"#FFFFFF");
		setTimeout(function(){ 
			// checkValid();
			paintGrid();
			callAutomatch();
		},NEXTCALL);
	}else{
		running = false;
	}
	// paintGrid();
}

function setCanvas(x, y){
	var canvas = document.getElementById("demo");
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
	if (document.getElementById('two').checked){
		colorNumb = 2;
	}else if (document.getElementById('three').checked){
		colorNumb = 3;
	}else if (document.getElementById('four').checked){
		colorNumb = 4;
	}else if (document.getElementById('five').checked){
		colorNumb = 5;
	}else{
		colorNumb = 6;
	}
	var x = parseInt(document.getElementById('boardHeight').value);
	var y = parseInt(document.getElementById('boardWidth').value);
	if (x > 10 || y > 10){
		document.getElementById("errorMess").innerHTML = "max size is 10";
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
		initialize(x,y);
	}
}

restart();