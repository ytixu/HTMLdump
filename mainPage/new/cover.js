function createStuff(type, text){
	var stuff = document.createElement(type);
	stuff.innerHTML = text;
	return stuff;
}

function loadPage1(){
	var name = createStuff("h1", "Yi Tian ");
	var lastname = createStuff("span", "Xu");
	name.appendChild(lastname);
	$("#name").append(name);
	$("#name").append(createStuff("h2", "Joint Bachelor of Statistics<br>and Computer Science"));
	$("#pic").append("<img id='imagePic' src='images/pic.png'/>");
	$("#imagePic").animate({"width": "+=65%"}, "slow");
	$("#titleTable").animate({"margin-left": "-=25%"}, "slow");
}