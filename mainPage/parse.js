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
	["utimateGoal: \"Spread like binary fission and embrace the world!\",",
	"amoebaSaysHelloWorld: function() = {",
	"/**",
	"My name is Yi Tian Xu. If you have difficulty to remember, you may use the trick that my elementary school teacher used. She told my father during a parent-teacher meeting that \"Yi Tian\" sounds like \"E.T.\".",
	"**/",
	"&nbsp;return this.createConsole.console.shout(\"Hello World!\");",
	"},",
	"amoebaEatsSticks: function() = {",
	"/**",
	"Before I was introduced to programming, my passion revolves around arts. With scissor and glue, I spent my childhood happily in a world of paper crafts, until a high school project taught me to design lamps. As I assembled my own curcuit system, it enlightened me that I can easily extend my creativity into state-of-art technologies, such as a keyboard and a screen.",
	"**/",
	"},",
	"amoebaDiscoversRoastedPythonAndJavaCoffee: function() = {",
	"/**",
	"Entering university, althought my childhood background may give the impression that I would fit better in an engineering program, I reckoned that a science program would allow me to reseach for new ideas and thus build unique products.",
	"**/",
	"},",
	"amoebaEatsCatopus: function() = {",
	"/**",
	"Just like art don't exists without an audience, I cannot prove my skills without showing my work. I have listed my recent projects below. The <Log> button brings you to records on some of my project's developing processes.",
	"**/",
	// "},",
	// "amoebaSingsInForTheFoodSheLovedInC-ShapMajor: function() = {",
	// "/**",
		
	// "**/",
	"}"]

function parse(){
	var cmt = false;
	for (var i=0; i<strings.length; i++){
		var s = strings[i]
		if (cmt){
			strings[i] = dict.wrapComment("&nbsp;" + s);
		}
		if (dict.isComment(s)){
			strings[i] = dict.wrapComment(s);
			if (!cmt) cmt = true;
			else cmt = false;
		}else if(!cmt){
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
	console.log(strings)
	return strings.join("<br>");
}

var state = {
	logo: false,
	logo_parsed: false,
	logo_clicks: 0,
	logo_rest: ["/** This class implements an objects that shall generate more classes. **/", 
				"/** Need more amoebae for your project? Count me in! **/", 
				"/** My species are called the phagobincodivae - binary code consumming divas! **/"],
	logo_special: ["/** Congradulation! You have clicked me 10 times! **/", 
					"/** Congradulation! You have clicked me 50 times! **/",
					"/** *sigh* Why do you choose to do this to yourself? You may go check out my math articles in you have free time. **/",
					"/** You can stop clicking me, I will implicitly congradulate you every time henceforth. **/"],
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
		this.menu.toggle("menuCV", pred, "CV", "Run");
		this.menu.cv = pred;
		//console.log(this.menu.cv);
	},
	togglePj: function(pred){
		this.menu.toggle("menuPj", pred, "Projects", "Log");
		this.menu.pj = pred;
	},
	toggleLk: function(pred){
		this.menu.toggle("menuLk", pred, "Links", "Fork");
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
	// console.log(state.scroll_pre);
}

document.getElementById("logo").onclick = function(){
		if (state.logo){
			if (state.logo_clicks == 10){
				document.getElementById("datatext").innerHTML=dict.wrapComment(state.logo_special[0]);
			}else if (state.logo_clicks == 50){
				document.getElementById("datatext").innerHTML=dict.wrapComment(state.logo_special[1]);
			}else if (state.logo_clicks == 100){
				document.getElementById("datatext").innerHTML=dict.wrapComment(state.logo_special[2]);
			}else if (state.logo_clicks == 1000){
				document.getElementById("datatext").innerHTML=dict.wrapComment(state.logo_special[3]);
			}else{
				document.getElementById("datatext").innerHTML=
					dict.wrapComment("&nbsp;" +state.logo_rest[Math.floor(Math.random()*state.logo_rest.length)]);
			}
			state.logo = false;
		}else{
			if (state.logo_parsed){
				document.getElementById("datatext").innerHTML=strings.join("<br>");
			}else{
				document.getElementById("datatext").innerHTML=parse();
				state.logo_parsed = true;
			}
			state.logo = true;
			if (state.logo_clicks < 1000) state.logo_clicks += 1;
		}
		var rect = document.getElementById("divisor").getBoundingClientRect();
		state.offset = rect.top;
		//console.log(rect.top);
	};
//console.log(state.offset, document.body.getBoundingClientRect().top);