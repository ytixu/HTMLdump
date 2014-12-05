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

var currWord = 0
var currDict = 0

var wdlstList = [];

/////////For dict
var isActive = 'in_use'
var isNotActive = ''

is_inUse = function(w, d){
	if (dict[d][w].using[0].localeCompare(isNotActive) == 0) return false
	else return true
}

setInUse = function(w, d){
	dict[d][w].using[0] = isActive
}

setNotUse = function(w, d){
	dict[d][w].using[0] = isNotActive
}
/////////For dict

createButton = function(name, func){
	var b = document.createElement("input");
	b.setAttribute("onclick",func);
	b.type = "button";
	b.value = name;
	b.id = name;
	return b;
}

includeWord = function(w,d){
	setInUse(w,d);
	document.getElementById("exclLst").removeChild(document.getElementById(dict[d][w].word+"_ex"));
}

excludeWord = function(){
	if (questtaked==0 || !is_inUse(currWord, currDict)) return;
	setNotUse(currWord, currDict);
	var b = createButton(dict[currDict][currWord].word, "includeWord("+currWord+", "+currDict+")");
	b.setAttribute("class", "exWord");
	b.id += "_ex";
	document.getElementById("exclLst").appendChild(b);
}

clearList = function(){
	var div = document.getElementById("exclLst");
	var eleChild = div.childNodes;
	for (var i=eleChild.length-1; i>=0; i--){
		eleChild[i].click();
	}
	// div.innerHTML = "";
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
		if (is_inUse(i, lst)) disp.innerHTML += dict[lst][i].word[0].bold() + " " ;
		else disp.innerHTML += dict[lst][i].word[0] + " " ;
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
	div.innerHTML = "";
	result.innerHTML = "";
	button = [];
	if (wdlstList.length > 0) currDict = wdlstList[Math.floor(Math.random()*wdlstList.length)];
	currWord = Math.floor(Math.random()*dict[currDict].length);
	if (!is_inUse(currWord, currDict)){
		// console.log(currWord.toString() + " , " + currDict.toString());
		//get next one that is active
		var l = wdlstList.length;
		if (l==0) l=1;
		for (var j=0; j<l; j++){
			var d = wdlstList[(wdlstList.indexOf(currDict)+j)%l];
			if (d == undefined) d = 0;
			// console.log(((wdlstList.indexOf(currDict)+j)%l).toString() +" d = "+d.toString());
			var ll = dict[d].length;
			for (var i=0; i<ll; i++){
				// console.log(((i + currWord)%ll).toString() + ", " + d.toString());
				if (is_inUse((i + currWord)%ll, d)){
					currWord = (i + currWord)%ll;
					currDict = d;
					j += l;
					break;
				}
			}
		}
		if (!is_inUse(currWord, currDict)){
			quest.innerHTML = "All words in this list(s) are excluded.";
			return;
		}
	}
	//update score 
	if (firstClick) score.innerHTML = (points/questtaked).toFixed(2);
	firstClick = true;
	questtaked++;

	var indd; 
	var rand = [currWord];
	var temp;
	done.innerHTML = questtaked;
	if (Math.random() > 0.5){
		quest.innerHTML = "Choose the correct word for: ";
		quest.innerHTML += (dict[currDict][currWord].def).join("; ").bold();
		quest.innerHTML += ".";
		for (var i=0; i<5; i++){
			indd = Math.floor(Math.random()*dict[currDict].length);
			if (alreadyChosen(rand, indd)){
				i--; 
				continue;
			}
			rand.push(indd);
			temp = dict[currDict][indd].word[0];
			button.push(createButton(temp, "falseAns(\"" + temp + "\")"));
		}
		temp = dict[currDict][currWord].word[0];
		button.push(createButton(temp, "rightAns(\"" + temp + "\")"));
	}else{
		quest.innerHTML = "Choose the correct definition for: ";
		quest.innerHTML += dict[currDict][currWord].word[0].bold();
		quest.innerHTML += ".";
		for (var i=0; i<5; i++){
			indd = Math.floor(Math.random()*dict[currDict].length);
			if (alreadyChosen(rand, indd)){
				i--; 
				continue;
			}
			rand.push(indd);
			temp = dict[currDict][indd].def.join("; ");
			button.push(createButton(temp, "falseAns(\"" + temp + "\")"));
		}
		temp = dict[currDict][currWord].def.join("; ");
		button.push(createButton(temp, "rightAns(\"" + temp + "\")"));
	}
	var j = Math.floor(Math.random()*6);
	for (var i=0; i<button.length; i++){
			div.appendChild(button[(i+j)%6]);
			div.innerHTML += "<br>";
	} 
}

 -->