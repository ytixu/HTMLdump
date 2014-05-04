<!-- 
var quest = document.getElementById("question");
var div = document.getElementById("ans");
var result = document.getElementById("result");
var score = document.getElementById("score");
var done = document.getElementById("quest");
var button;
var points = 0;
var questtaked = 0;
var firstClick = true;

falseAns = function(name) {
	result.innerHTML = "Try again!";
	if (firstClick) score.innerHTML = (points/questtaked).toFixed(2);
	firstClick = false;
	document.getElementById(name).setAttribute("class","wrong");
}

rightAns = function(name) {
	result.innerHTML = "Right!";
	if (firstClick) score.innerHTML = ((++points)/questtaked).toFixed(2);
	firstClick = false;
	document.getElementById(name).setAttribute("class","right");
}

start = function() {
	var bt = document.getElementById("bt");
	bt.value = "NEXT";
	bt.onclick = next;
	next();
};

createButton = function(name, func){
	var b = document.createElement("input");
	b.setAttribute("onclick",func);
	b.type = "button";
	b.value = name;
	b.id = name;
	return b;
}

alreadyChosen = function(a, n){
	for (var i=0; i<a.length; i++){
		if (a[i] == n) return true;
	}
	return false;
}

next = function(){
	div.innerHTML = "";
	result.innerHTML = "";
	button = [];
	firstClick = true;
	questtaked++;
	var ind = Math.floor(Math.random()*dict.length);
	var indd;
	var rand = [ind];
	var temp;
	done.innerHTML = questtaked;
	if (Math.random() > 0.5){
		quest.innerHTML = "Choose the correct word for: ";
		quest.innerHTML += dict[ind].def[Math.floor(Math.random()*dict[ind].def.length)].bold();
		quest.innerHTML += ".";
		for (var i=0; i<5; i++){
			indd = Math.floor(Math.random()*dict.length);
			if (alreadyChosen(rand, indd)){
				i--; 
				continue;
			}
			rand.push(indd);
			temp = dict[indd].word[0];
			button.push(createButton(temp, "falseAns(\"" + temp + "\")"));
		}
		temp = dict[ind].word[0];
		button.push(createButton(temp, "rightAns(\"" + temp + "\")"));
	}else{
		quest.innerHTML = "Choose the correct definition for: ";
		quest.innerHTML += dict[ind].word[0].bold();
		quest.innerHTML += ".";
		for (var i=0; i<5; i++){
			indd = Math.floor(Math.random()*dict.length);
			if (alreadyChosen(rand, indd)){
				i--; 
				continue;
			}
			rand.push(indd);
			temp = dict[indd].def[Math.floor(Math.random()*dict[indd].def.length)];
			button.push(createButton(temp, "falseAns(\"" + temp + "\")"));
		}
		temp = dict[ind].def[Math.floor(Math.random()*dict[ind].def.length)];
		button.push(createButton(temp, "rightAns(\"" + temp + "\")"));
	}
	var j = Math.floor(Math.random()*6);
	for (var i=0; i<button.length; i++){
			div.appendChild(button[(i+j)%6]);
			div.innerHTML += "<br>";
	} 
}

var dict = [
	{
		word : ["Abhor"],
		def : ["hate"]
	},{
		word : ["Bigot"],
		def : ["narrow-minded", "prejudiced person"]
	},{
		word : ["Counterfeit"], 
		def : ["fake", "false"]
	},{
		word : ["Enfranchise"],
		def : ["give voting rights"]
	},{
		word : ["Hamper"],
		def : ["hinder", "obstruct"]
	},{
		word : ["Kindle"],
		def : ["to start a fire"]
	},{
		word : ["Noxious"],
		def : ["harmful", "poisonous", "lethal"]
	},{
		word : ["Placid"],
		def : ["calm", "peaceful"]
	},{
		word : ["Remuneration"],
		def : ["payment for work done"]
	},{
		word : ["Talisman"],
		def : ["lucky charm"]
	},{
		word : ["Abrasive"],
		def : ["rough", "coarse", "harsh"]
	},{
		word : ["Bilk"],
		def : ["cheat", "defraud"]
	},{
		word : ["Covert"],
		def : ["hidden", "undercover"]
	},{
		word : ["Engender"],
		def : ["cause"]
	},{
		word : ["Hangar"],
		def : ["storage area (like garage) for a plane"]
	},{
		word : ["Knotty"],
		def : ["complex", "difficult to solve"]
	},{
		word : ["Nuance"],
		def : ["something subtle", "a fine shade of meaning"]
	},{
		word : ["Plagiarism"],
		def : ["taking credit for someone else's writing or ideas"]
	},{
		word : ["Renown"],
		def : ["fame"]
	},{
		word : ["Tangent"],
		def : ["going off the main subject"]
	}
];

 -->