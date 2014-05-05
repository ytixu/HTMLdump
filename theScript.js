<!-- 
var quest = document.getElementById("question");
var div = document.getElementById("ans");
var result = document.getElementById("result");
var score = document.getElementById("score");
var done = document.getElementById("quest");
var button;
var points = 0;
var questtaked = 0;
var firstClick = false;

var wdlstList = [];

createButton = function(name, func){
	var b = document.createElement("input");
	b.setAttribute("onclick",func);
	b.type = "button";
	b.value = name;
	b.id = name;
	return b;
}

//delete an element in the list 
deleteEle = function(ele){
	for (var i=0; i<wdlstList.length; i++){
		if (wdlstList[i] == ele){
			for (var j=i; j<wdlstList.length-1; j++){
				wdlstList[j] = wdlstList[j+1];
			}
			wdlstList.splice(wdlstList.length-1, 1);
			break;
		}
	}
}

changeList = function(lst){
	wdlstList.push(lst);
	var b = document.getElementById((parseInt(lst)+1).toString());
	b.setAttribute("class","wdlstAct");
	b.setAttribute("onclick","changeback("+lst+")");
}
changeback = function(lst){
	deleteEle(lst);
	var b = document.getElementById((parseInt(lst)+1).toString());
	b.setAttribute("class","wdlst");
	b.setAttribute("onclick","changeList("+lst+")");
}

displayWords = function(lst){
	var disp = document.getElementById("displayWd");
	disp.innerHTML = "";
	for (var i=0; i<dict[lst].length; i++){
		disp.innerHTML += dict[lst][i].word[0] + " " ;
	}
}
endDisplayWords = function(){
	document.getElementById("displayWd").innerHTML = "";
}

var l = document.getElementById("wdlist");
for (var i=0; i<5*15; i++){
	var b = createButton((i+1).toString(), "changeList("+ (i).toString() +")");
	b.setAttribute("class", "wdlst");
	b.setAttribute("onmouseover", "displayWords("+ (i).toString() +")");
	b.setAttribute("onmouseout", "endDisplayWords()");
	l.appendChild(b);
}

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
	var b;
	for (var i=0; i<button.length; i++){
		b = document.getElementById(button[i].id);
		b.id = "disabled";
		b.setAttribute("onclick", "function() { return false; }");
	}
}

start = function() {
	var bt = document.getElementById("bt");
	bt.value = "NEXT";
	bt.onclick = next;
	next();
}

alreadyChosen = function(a, n){
	for (var i=0; i<a.length; i++){
		if (a[i] == n) return true;
	}
	return false;
}

next = function(){
	if (firstClick) score.innerHTML = (points/questtaked).toFixed(2);
	div.innerHTML = "";
	result.innerHTML = "";
	button = [];
	firstClick = true;
	questtaked++;
	var wdlst = 0;
	if (wdlstList.length > 0) wdlst = wdlstList[Math.floor(Math.random()*wdlstList.length)];
	var ind = Math.floor(Math.random()*dict[wdlst].length);
	var indd;
	var rand = [ind];
	var temp;
	done.innerHTML = questtaked;
	if (Math.random() > 0.5){
		quest.innerHTML = "Choose the correct word for: ";
		quest.innerHTML += dict[wdlst][ind].def[Math.floor(Math.random()*dict[wdlst][ind].def.length)].bold();
		quest.innerHTML += ".";
		for (var i=0; i<5; i++){
			indd = Math.floor(Math.random()*dict[wdlst].length);
			if (alreadyChosen(rand, indd)){
				i--; 
				continue;
			}
			rand.push(indd);
			temp = dict[wdlst][indd].word[0];
			button.push(createButton(temp, "falseAns(\"" + temp + "\")"));
		}
		temp = dict[wdlst][ind].word[0];
		button.push(createButton(temp, "rightAns(\"" + temp + "\")"));
	}else{
		quest.innerHTML = "Choose the correct definition for: ";
		quest.innerHTML += dict[wdlst][ind].word[0].bold();
		quest.innerHTML += ".";
		for (var i=0; i<5; i++){
			indd = Math.floor(Math.random()*dict[wdlst].length);
			if (alreadyChosen(rand, indd)){
				i--; 
				continue;
			}
			rand.push(indd);
			temp = dict[wdlst][indd].def[Math.floor(Math.random()*dict[wdlst][indd].def.length)];
			button.push(createButton(temp, "falseAns(\"" + temp + "\")"));
		}
		temp = dict[wdlst][ind].def[Math.floor(Math.random()*dict[wdlst][ind].def.length)];
		button.push(createButton(temp, "rightAns(\"" + temp + "\")"));
	}
	var j = Math.floor(Math.random()*6);
	for (var i=0; i<button.length; i++){
			div.appendChild(button[(i+j)%6]);
			div.innerHTML += "<br>";
	} 
}

 -->