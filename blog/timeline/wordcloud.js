var words = [
	{value: "Template", weight: 1, partition:0},
	{value: "O_O", weight: 2, partition:0},
	{value: "Example", weight: 3, partition:0},
	{value: "Template", weight: 2, partition:0},
	{value: "Hahaha", weight: 1, partition:0},
	{value: "Hahaha", weight: 1, partition:0},
	{value: "Template", weight: 1, partition:0},
	{value: "O_O", weight: 2, partition:0},
	{value: "Example", weight: 3, partition:0},
	{value: "Template", weight: 2, partition:0},
	{value: "Hahaha", weight: 1, partition:0},
	{value: "Hahaha", weight: 1, partition:0},
	{value: "Template", weight: 1, partition:0},
	{value: "O_O", weight: 2, partition:0},
	{value: "Example", weight: 3, partition:0},
	{value: "Template", weight: 2, partition:0},
	{value: "Hahaha", weight: 1, partition:0},
	{value: "Hahaha", weight: 1, partition:0},
	{value: "Template", weight: 1, partition:0},
	{value: "O_O", weight: 2, partition:0},
	{value: "Example", weight: 3, partition:0},
	{value: "Template", weight: 2, partition:0},
	{value: "Hahaha", weight: 1, partition:0},
	{value: "Hahaha", weight: 1, partition:0},
	{value: "Template", weight: 1, partition:0},
	{value: "O_O", weight: 2, partition:0},
	{value: "Example", weight: 3, partition:0},
	{value: "Template", weight: 2, partition:0},
	{value: "Hahaha", weight: 1, partition:0},
	{value: "Hahaha", weight: 1, partition:0}
];

var dataLength = words.length;

// function shuffle(){
// 	for (var i = 0; i<dataLength; i++){
// 		var j = Math.floor(Math.random()*(dataLength-i-1))+i;
// 		var temp = words[i];
// 		words[i] = words[j];
// 		words[j] = words[i];
// 	}
// }

function setPartition(i, x, y){
	words[i].partition = Math.floor(x/100)*1000 + Math.floor(y/100);
	console.log(i,x,y,words[i].partition);
}

function draw(){
	for (var i=0; i<dataLength; i++){
		$("#wordsCloud").append("<div id='name"+i+"' class='weight" + words[i].weight.toString() + "'>"
			+ words[i].value + "</div>");
		var x = Math.random()*($(window).width()-$("#name"+i).width());
		var y = Math.random()*($(window).height()-$("#name"+i).height());
		// console.log(x,y);
		setPartition(i,x,y);
		$("#name"+i).css({
			top:y.toString(),
			left:x.toString()
		});
	}
}

function withinBound(i, x, y){
	if ($("#name"+i).height() + y <= $(window).height() &&
		$("#name"+i).width() + x <= $(window).width() &&
		x >= 0 && y >= 0) return true;
	return false;
}

function iterate(){
	for (var i=0; i<dataLength; i++){
		var ind = Math.floor(Math.random()*(dataLength-1));
		for (var j=0; j<dataLength; j++){
			ind = (ind+1)%dataLength;
			if (ind == i) continue;
			var diff = Math.abs(words[i].partition - words[ind].partition);
			if (diff == 0 || diff == 1000 || diff == 1 || diff == 999 || diff == 1001){
				// console.log(i, ind, words[i].partition, words[ind].partition, 
				// 	$("#name"+i).css("left"), $("#name"+i).css("top"),
				// 	$("#name"+ind).css("left"), $("#name"+ind).css("top"));
				var hit = $("#name"+i).collision($("#name"+ind), { mode: "collision"});
				if (hit[0]){
					// console.log($("#name"+ind).position());
					var posA = $("#name"+ind).position();
					var posB = $("#name"+i).position();
					$("#name"+i).css({
						top: (posB.left + (posB.left-posA.left)).toString(),
						left: (posB.right + (posB.right-posA.right)).toString()
					});
					break;
				}
			}
		} 
	}
}
// console.log(words[0]);
// shuffle();
// console.log(words[0]);

draw();
iterate();