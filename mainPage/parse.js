//Rules:
/***
	1) some strings are blue
	2) if preceeded by "function" or followed by ":", it's red
	3) if between quotes, it's green
	4) if comment, then it's grey 
	5) "this" is turquoise.
***/

var dict = {
	blue:["var", "return"],

	isComment: function(w){
		if (w.indexOf("/**") > -1 || w.indexOf("**/") > -1) return true;
		return false;
	},

	wrapComment: function(w){
		return "<span class=\"comment\" id=\"code\">"+w+"</span>";
	},

	wrapColor: function(w, color){
		return "<span class=\"" + color + "\">"+w+"</span>";
	},

	wrapTitle: function(w){
		return "<span class=\"title\">"+w+"</span>";
	},

	wrapColors: function(w){
		if (w[w.length-1] == ":") return this.wrapColor(w.split(":")[0], "red") + ":";
		var fn = w.split("(");
		if ("function" == fn[0]) return this.wrapColor("function", "blue") + "(" + fn[1];
		fn = w.split("this.");
		if (fn.length>1) return this.wrapColor("this", "turquoise") + "." + fn[1];
		for (var s in this.blue){
			if (this.blue[s]==w || "&nbsp;" + this.blue[s]==w) return this.wrapColor(w, "blue");
		}
		return w;
	}

}

// function loadFile()
// {
// 	var xmlhttp;
// 	if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
// 		xmlhttp=new XMLHttpRequest();
// 	}
// 	else{// code for IE6, IE5
// 		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
// 	}
// 	xmlhttp.onreadystatechange=function(){
// 		if (xmlhttp.readyState==4 && xmlhttp.status==200)
// 		{
// 			document.getElementById("datatext").innerHTML=xmlhttp.responseText;
// 		}
// 	}
// 	xmlhttp.open("GET","data.txt",true);
// 	xmlhttp.send();
// }

// loadFile();

var strings = 
	["utimateGoal: \"Spread like binary fission and conquere the world!\",",
	"amoebaSaysHelloWorld: function() = {",
	"&nbsp;/**",
	"&nbsp;",
	"&nbsp;**/",
	"&nbsp;return this.createConsole.console.shout(\"Hello World!\");",
	"},",
	"amoebaEatsSticks: function() = {",
	"&nbsp;/**",
	"&nbsp; ",
	"&nbsp;**/",
	"},",
	"amoebaDiscoversRoastedPythonAndJavaCoffee: function() = {",
	"&nbsp;/**",

	"&nbsp;**/",
	"},",
	"amoebaEatsCatopus: function() = {",
	"&nbsp;/**",

	"&nbsp;**/",
	"},",
	"amoebaSingsInForTheFoodSheLovedInC-ShapMajor: function() = {",
	"&nbsp;/**",

	"&nbsp;**/",
	"}"]

function parse(){
	var cmt = false;
	for (var i=0; i<strings.length; i++){
		var s = strings[i]
		if (cmt){
			strings[i] = "&nbsp;" + s;
		}
		if (dict.isComment(s)){
			strings[i] = dict.wrapComment("&nbsp;" + s);
			if (!cmt) cmt = true;
			else cmt = false;
		}else{
			var ss = s.split('\"');
			for (var j=0; j<ss.length; j++){
				if (j%2 == 0){
					var sss = ss[j].split(' ');
					for (var k = 0; k<sss.length; k++){
						sss[k] = dict.wrapColors(sss[k]);
					}
					ss[j] = sss.join(" ");
				} 
				else ss[j] = dict.wrapColor("\"" + ss[j] + "\"", "green");
			}
			strings[i] = dict.wrapTitle("&nbsp;" + ss.join(""));
		}
	}
	return strings.join("<br>");
}

var state = {
	logo: false,
	logo_parsed: false,
	logo_rest: ["/** This class is going to rock all the other classes in the universe~ **/", 
				"/** Need more amoebae for your project? Count me in! **/", 
				"/** My species are called the phagobincodivae - binary code consumming divas! **/"],
	menu:{
		cv: false,
		pj: false,
		lk: false,

		toggle: function(domObjName, pred, texta, textb){
			var domObj = document.getElementById(domObjName);
			if (pred){
				domObj.innerHTML = texta;
			}else{
				domObj.innerHTML = textb;
			}
		}
	},
	toggleCV: function(pred){
		this.menu.toggle("menuCV", pred, "Run", "CV");
		this.menu.cv = pred;
		//console.log(this.menu.cv);
	},
	togglePj: function(pred){
		this.menu.toggle("menuPj", pred, "Log", "Projects");
		this.menu.pj = pred;
	},
	toggleLk: function(pred){
		this.menu.toggle("menuLk", pred, "Fork", "Links");
		this.menu.lk = pred;

	},
	scroll_pre:0,
	offset: document.getElementById("mainContent").getBoundingClientRect().top - document.body.getBoundingClientRect().top + 80
}

function changeMenu(scroll){
	if (state.scroll_pre - scroll > 0){
		if (scroll < state.offset-100) state.toggleCV(false);
		if (scroll < state.offset-135) state.togglePj(false);
		if (scroll < state.offset-170) state.toggleLk(false);
	}
	if (!state.scroll_pre  - scroll < 0){
		if (scroll > state.offset-180) state.toggleLk(true);
		if (scroll > state.offset-145) state.togglePj(true);
		if (scroll > state.offset-110) state.toggleCV(true);
	}
	state.scroll_pre = scroll;
	console.log(state.scroll_pre);
}

document.getElementById("logo").onclick = function(){
		if (state.logo){
			document.getElementById("datatext").innerHTML=
				dict.wrapComment("&nbsp;" +state.logo_rest[Math.floor(Math.random()*state.logo_rest.length)]);
			state.logo = false;
		}else{
			if (state.logo_parsed){
				document.getElementById("datatext").innerHTML=strings.join("<br>");
			}else{
				document.getElementById("datatext").innerHTML=parse();
				state.logo_parsed = true;
			}
			state.logo = true;
		}
		var rect = document.getElementById("divisor").getBoundingClientRect();
		state.offset = rect.top;
		//console.log(rect.top);
	};
//console.log(state.offset, document.body.getBoundingClientRect().top);