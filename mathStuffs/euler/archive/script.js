var title = "solvelikeaeuler";
var pageTitle = "Project ProjectEuler";
var originalLink = "https://projecteuler.net/";

var about = "<a target=\"blanck\" href=\"" + originalLink + "\">Project Euler</a>";

function createChild(cont, type){
	var stuff = document.createElement(type);
	stuff.innerHTML = cont;
	return stuff;
}

function createLink(name, src, dir){
	var link = createChild("Multiples of 3 and 5", "a");
	link.href = dir+src+".html";
	return link;
}

function setIndex(domele, dir){
	domele.appendChild(createLink("Multiples of 3 and 5", "1", dir))
}

function setup(dir){
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
	setIndex(index, dir);
	return content;
}

var content = setup(DIRECTORY);

