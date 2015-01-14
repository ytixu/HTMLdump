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
	$("#name").append(createStuff("h2", ""));
	$("#pic").append("<img id='imagePic' src='images/pic.png'/>");
	$("#imagePic").animate({"width": "+=60%"}, "slow");
	$("#titleTable").animate({"margin-left": "-=22%"}, "slow");
}

function loadPage2(){

}