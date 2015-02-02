// size of the items
var SIZE = 10;
var RADIUS = SIZE/2;
var MAX_NUMBER = 50;

// colors
var WHITE = "#FFFFFF";
var COMPARE = "#CC9999";
var PICKED = "#AAAAAA";
var BLACK = "#333333";

// item list 
var heightList = [];
var itemList = {};

// function maps click to coordinates
function listAdd(x, y){
	var x = Math.floor(x/SIZE) *SIZE
	var y = Math.floor(y/SIZE) *SIZE;
	if (heightList.indexOf(y) >= 0){
		console.log("Is there already!");
		return;
	}
	heightList.push(y);
	itemList[y] = x;
	draw(x, y, BLACK);
	console.log(itemList);
}

// sorting algorithm by heigth
function mergeSort(start, end){
	// console.log(start, end);
	if (end - start < 2) return;
	if (end - start > 1){
		var mid = Math.floor((end-start)/2);
		mergeSort(start, start+mid);
		mergeSort(start + mid, end);
	}
	var i = start;
	var j = start + mid;
	// console.log(start ,end, mid);
	var newArray = []
	while(i<start+mid || j<end){
		// console.log("~~~", i, j, end, j >= end, i >= mid);
		if (i >= start+mid){
			newArray.push(heightList[j]);
			draw(itemList[heightList[j]], heightList[j], PICKED)
			j ++;
		}else if (j >= end){
			newArray.push(heightList[i]);
			draw(itemList[heightList[i]], heightList[i], PICKED)
			i ++;
		}else if (heightList[j] < heightList[i]){
			newArray.push(heightList[j]);
			draw(itemList[heightList[j]], heightList[j], PICKED)
			j ++;
		}else{
			newArray.push(heightList[i]);
			draw(itemList[heightList[i]], heightList[i], PICKED)
			i ++;
		}
	}
	// console.log(heightList);
	// console.log("asd", newArray);
	if (newArray.length == 0) return;
	for (i=start; i<end; i++){
		heightList[i] = newArray[i-start];
	}
	console.log(heightList, heightList.length);
}


// add buttons
function addBTN(){
	var inputField = document.getElementById("selectToy")
	var button = document.createElement("input");
	button.type = "button";
	button.value = "Merge Sort";
	button.onclick = function(){ 
		if (itemList.length == 0){
			console.log("nothing");
			return;
		} 
		mergeSort(0, heightList.length)};
	inputField.appendChild(button);
}

// main
addBTN();

// add canvas
var canvas = document.createElement("canvas");
canvas.width = SIZE*MAX_NUMBER;
canvas.height = SIZE*MAX_NUMBER;
canvas.addEventListener('click',function(evt) {
		var rect = canvas.getBoundingClientRect();
        listAdd(evt.clientX - rect.left, evt.clientY - rect.top);
      }, false);
document.getElementById("whereFunStuffsRest").appendChild(canvas);

var ctx = canvas.getContext('2d');

// draw functions by step
function draw(x, y, color){
	ctx.beginPath();
	ctx.arc(x+RADIUS, y+RADIUS, RADIUS, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
}

function move(x0, y0, x1, y1, color){
	draw(x0, y0, WHITE);
	draw(x1, y1, color);
}

function back(x, y){
	draw(x, y, BLACK);
}