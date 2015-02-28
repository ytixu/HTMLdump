var title = ":3";
var pageTitle = "Project Archimedes";

var about = "&lt;code>, &Mu;&alpha;&theta;h, and other random.ness";

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
	// var content = document.createElement("div");
	// content.id = "content";
	document.title = title;
	var bar = document.createElement("div");
	bar.id = "leftBar";
	document.body.appendChild(bar);
	// document.body.appendChild(content);
	var titlediv = document.createElement("div");
	titlediv.id = "title";
	titlediv.appendChild(createChild(pageTitle, "h1"));
	var aboutdiv = document.createElement("div");
	aboutdiv.id = "about";
	aboutdiv.appendChild(titlediv);
	aboutdiv.appendChild(createChild(about, "p"));
	bar.appendChild(aboutdiv);
	var index = document.createElement("div");
	index.id = "index";
	setIndex(index);
	bar.appendChild(index);
	return content;
}

var content = setup();

