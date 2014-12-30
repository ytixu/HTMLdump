var title = ":3";
var pageTitle = "Project Archimedes";

var about = "Questions taken from<br><a target=\"blanck\" "+
			"href=\"https://projecteuler.net/\">Project Euler</a><br><a target=\"blank\"" + 
			"href=\"http://www.mktechnicalclasses.com/Notes/" +
			"Cracking%20the%20Coding%20Interview,%204%20Edition%20-%20150%20"+
			"Programming%20Interview%20Questions%20and%20Solutions.pdf\">"+
			"Cracking the Coding Interview</a>" ;

function createChild(cont, type){
	var stuff = document.createElement(type);
	stuff.innerHTML = cont;
	return stuff;
}

function createLink(name, src, dir){
	var link = createChild(name, "a");
	link.href = dir+src+".html";
	return link;
}

function setIndex(domele, dir){
	domele.appendChild(createChild("Index", "h2"));
	domele.appendChild(createLink("Multiples of 3 and 5", "1", dir));
	domele.appendChild(document.createElement("br"));
	domele.appendChild(createLink("Even Fibonacci Number", "2", dir));
	domele.appendChild(document.createElement("br"));
	domele.appendChild(createLink("Largest prime factor", "3", dir));
	domele.appendChild(document.createElement("br"));
	domele.appendChild(createLink("Swapping Numbers", "4", dir));
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

