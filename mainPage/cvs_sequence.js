var dRange = 50.0;
var lighten = 50;

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function getRandomColor(){
  var color = [];
  for (var i = 0; i < 3; i++ ) {
    color.push(Math.floor(Math.random() * dRange) + 30*(i+1));
  }
  return shuffle(color);
}

function formatColor(color){
  return "rgb("+color.join(",")+")";
}

var CVS_substitute = [
  // ["art-origami-other", 22.08],
  // ["art-origami-modular origami", 0.46],
  // ["art-paint-arcrylic", 8.66],
  // ["art-paint-oil", 13],
  // ["art-paint-graffiti", 0.42],
  // ["art-digital-photoshop-drawing", 3.33],
  // ["art-digital-photoshop-photo maniulation", 1.66],
  // ["art-digital-photography", 2.04],
  // ["art-digital-computer modeling", 2],
  // ["art-digital-music composition", 1],
  // ["art-sculpture", 1],
  // ["art-drawing-manga", 2.08],
  // ["art-drawing-sketch", 21.66],
  // ["art-music-piano", 30.33],
  // ["art-music-flute", 0.72],
  // ["art-music-trombone", 4.66],
  // ["art-music-clarinet", 4.55],
  // ["art-digital-video editing", 10],
  // ["art-writing-fiction", 17],
  // ["art-writing-fanfiction", 46],
  // ["art-writing-blog/journal", 97],
  // ["coding-personal project-webpage-javscript, jQuery, HTML, CSS", 7],
  // ["coding-personal project-webpage-C, perl, HTML", 0.34],
  // ["coding-personal project-app development-C#, XAML", 1.59],
  // ["coding-personal project-app development-python", 10],
  // ["coding-personal project-app development-javscript, HTML, CSS", 2],
  // ["coding-research-python", 26.66],
  // ["coding-research-SPARQL", 0.04],
  // ["coding-assignment-java", 24.46],
  // ["coding-assignment-python", 10.5],
  // ["coding-assignment-SML", 4],
  // ["coding-assignment-C", 7.35],
  // ["coding-assignment-perl", 0.34],
  // ["coding-assignment-MATLAB", 1.24],
  // ["coding-assignment-R", 1.23],
  // ["coding-assignment-LaTex", 1.14],
  // ["coding-personal project-text formatting-LaTex", 27.53],
  // ["coding-personal project-text formatting-HTML, CSS", 6.36],
  // ["other-math-statistics", 20],
  // ["other-astronomy", 8],
  // ["other-philosophy", 3.33]
  ["computer science-course assignment-operating system-C", 120],
  ["computer science-course assignment-webpage development-HTML, CSS, C, Perl", 15],
  ["computer science-course project-CPU design-LogiSim", 30],
  ["computer science-course assignment-programming-assembly-MIPS", 30],
  ["computer science-course assignment-programming-functional-SML", 60],
  ["computer science-course assignment-programming-functional-Scheme", 3],
  ["computer science-personal project-programming-functional-Haskell", 3],
  ["computer science-course assignment-programming-object oriented-Java", 180],
  ["computer science-course assignment-algorithm design-Java", 180],
  ["computer science-course assignment-numerical computing-MATLAB", 60],
  ["computer science-course project-artificial inteligence-board game player-Java", 60],
  ["computer science-course assignment-robotics-ROS", 60],
  ["computer science-course assignment-robotics-C++", 60],
  ["computer science-course assignment-sudoku solver-Java", 6],
  ["computer science-research-social network-Twitter-geolocation inference-Python", 670],
  ["computer science-personal project-tweet scraping-Python", 6],
  ["computer science-hackathon-semantic annotation-Python, SPARQL", 24],
  ["computer science-hackathon-shapefile database-Python, RDF", 16],
  ["computer science-personal project-app development-Windows 8-C#, XMAL", 5],
  ["computer science-personal project-app development-Windows 8-Javascript, HTML, CSS", 5],
  ["computer science-personal project-app development-Python",36],
  ["computer science-personal project-webpage design-Javascript, jQuery, HTML, CSS", 100],
  ["computer science-personal project-webpage design-HTML, CSS", 20],
  ["computer science-course project-software design-card game-Java", 120],
  ["computer science-personal project-transcribe course notes-LaTex", 20],

  ["mathematics-personal project-stochastic process simulation-Python", 35],
  ["mathematics-course assignment-nonparametric statistics-R", 20],
  ["mathematics-course assignment-nonparametric statistics-SAS", 10],
  ["mathematics-course assignment-regression-R", 30],
  ["mathematics-personal project-transcribe course notes-LaTex", 30],

  ["arts-personal project-photography-Photoshop", 60],
  ["arts-personal project-digital drawing-Photoshop", 60],
  ["arts-logo design-Photoshop", 10],
  ["arts-personal project-wallpaper design-Photoshop", 20],
  ["arts-personal project-3D modeling-Google Sketchup", 50],
  ["arts-personal project-video editing-Windows Movie Maker", 20],
  ["arts-course assignment-computer game making-Game Maker", 60],
  ["arts-course project-music composition-digital-LMMS", 10]
];

var drawList  = function(topTech, colMap){
  console.log(topTech);
  var main = document.getElementById("main");
  var block = document.createElement("p");
  block.innerHTML = "Top 7<br>";
  for (var t in topTech){
    block.innerHTML += t + " " + topTech[t].toString() + "%</br>"
    // try{
    //   block.style.background = colMap[t];
    // }catch(e){}
  }
  block.style.textAlign = "right";
  block.style.width = "100px";
  block.style.marginLeft = "200px";
  main.appendChild(block);
  main.appendChild(document.createElement("br"));
}

// find top 7
var topList = function(tech){
  console.log(tech);
  var sum = 0.0;
  var index = [];
  var reverseTech = {};
  for (var i in tech){
    sum += tech[i];
    index.push(tech[i]);
    if (Object.keys(reverseTech).indexOf(tech[i].toString()) < 0){
      reverseTech[tech[i]] = [i];
    }else{
      reverseTech[tech[i]].push(i);
    }
  }
  index = index.sort(function(a, b){
                        return b-a;
                    });
  var topTech = {}
  for (var i=0; i<7;){
    for (var t in reverseTech[index[i]]){
      console.log(reverseTech[index[i]][t], i);
      topTech[reverseTech[index[i]][t]] = (index[i]/sum*100).toFixed(2);
      i++;
    }
  }
  console.log(index, reverseTech);
  return topTech;
}

// determine color
var CVS_colors = function(){
  var tech = {};
  var cat = {};

  for (var i in CVS_substitute){
  	var s = CVS_substitute[i][0].split("-");
    // add to tech
    var ss = s[s.length-1].split(", ");
    for (var t in ss){
      if (Object.keys(tech).indexOf(ss[t]) < 0){
        tech[ss[t]] = CVS_substitute[i][1];
      }else{
        tech[ss[t]] += CVS_substitute[i][1];
      }
    }
    // add to cat
    if (Object.keys(cat).indexOf(s[0]) < 0){
      cat[s[0]] = {len: s.length, 
                   sub: []};
    }else{
      cat[s[0]].len = Math.max(cat[s[0]].len, s.length)
    }
    var ss = s.slice();
    ss.splice(0,1);
    cat[s[0]].sub.push(ss);
  }
  var topTech = topList(tech);
  // console.log(cat);
  var colMap = {};
  var startColor = getRandomColor();
  var ind = 0;
  for (var i in cat){
    var color = [startColor[ind%3], startColor[(ind+1)%3], startColor[(ind+2)%3]];
    ind++;
    colMap[i] = color;
    // console.log(color);
    // console.log(numChild(cat[keys[i]], 1));
    var sstep = Math.floor((250.0-Math.min.apply(null, colMap[i]))/cat[i].len);
    for (var j in cat[i].sub){
      var arr = cat[i].sub[j];
      for (var k=0; k < arr.length; k++){
        if (Object.keys(colMap).indexOf(arr[k]) < 0){
          colMap[arr[k]] = color.map(function(x){
                var shift = Math.abs((k+1)*(230-x)/arr[k].length);
                // console.log(shift);
                if (x == Math.min.apply(null, color)){
                    return Math.min(240, Math.floor(x+ shift));
                }
                var temp = Math.floor( Math.random() * shift + (k+1)*30);
                // console.log("13, ",temp, (k+1));
                return Math.min(240, x+temp)  });
          // console.log(color, colMap[arr[k]] );
        }
      }
    }
  }
  for (var i in colMap){
    colMap[i] = formatColor(colMap[i]);
  }
  colMap["personal project"] = "#AAAAAA";
  colMap["course assignment"] = "#888888";
  // console.log(colMap);
  drawList(topTech, colMap);
  return colMap;
}();