var title = ":3";
var pageTitle = "Project Archimedes";

var about = "Questions taken from<br><a target=\"blanck\" "+
			"href=\"https://projecteuler.net/\">Project Euler</a><br><a target=\"blank\"" + 
			"href=\"http://www.mktechnicalclasses.com/Notes/" +
			"Cracking%20the%20Coding%20Interview,%204%20Edition%20-%20150%20"+
			"Programming%20Interview%20Questions%20and%20Solutions.pdf\">"+
			"Cracking the Coding Interview</a><br>" +
			// "<a href=\"http://www.algorithmsforinterviews.com/\">"+
			// "Algorithms For Interviews\</a><br>"+
			"Quora<br>" + 
			"and from myself<br><br>" +
			"Display engine for Latex: " +
			"<a target=\"blank\" href=\"http://www.mathjax.org/\">mathjax</a><br><br>"+
			"Syntax highlight engine for<br>code: " +
			"<a target=\"blank\" href=\"https://code.google.com/p/google-code-prettify/\">"+
			"google-code-prettify</a>";

function createChild(cont, type){
	var stuff = document.createElement(type);
	stuff.innerHTML = cont;
	return stuff;
}

function createLink(name, src){
	var link = createChild(name, "a");
	link.href = src+".html";
	return link;
}

function setIndex(domele, dir){
	domele.appendChild(createChild("Index", "h2"));
	var titles = ["Multiples of 3 and 5", 
				  "Even Fibonacci Number",
				  "Largest prime factor",
				  "Swapping Numbers",
				  "Tic-Tac-Toe",
				  "Maximum Subarray Problem",
				  "Integer Pairs in Array",
				  "Bitwise Arithmetics",
				  "Match-Three Puzzle",
				  "Match-Three Game",
				  "Find Duplicate in Array",
				  "Drawing Flowers",
				  "Air Dancer"
				 ]
	var url = document.URL.split("/");
	var currPage = url[url.length-1];
	currPage = parseInt(currPage.split(".")[0]) - 1;
	for (var i=titles.length-1; i>-1; i--){	
		if (currPage == i){
			domele.appendChild(createLink(titles[i]+" <span class=\"sym\">&#8715;</span>", (i+1).toString()));
		}else{
			domele.appendChild(createLink(titles[i], (i+1).toString()));
		}
		domele.appendChild(document.createElement("br"));
	}
}

function setup(){
	document.title = title;
	var content = document.createElement("div");
	content.id = "content";
	var titlediv = document.createElement("div");
	titlediv.id = "title";
	titlediv.appendChild(createChild(pageTitle, "h1"));
	titlediv.appendChild(createChild(about, "p"))
	content.appendChild(titlediv);
	var index = document.createElement("div");
	index.id = "index";
	document.body.appendChild(index);
	document.body.appendChild(content);
	setIndex(index);
	return content;
}

var content = setup();

