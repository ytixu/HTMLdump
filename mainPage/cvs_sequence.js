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
  ["art-origami-other", 22.08],
  ["art-origami-modular origami", 0.46],
  ["art-paint-arcrylic", 8.66],
  ["art-paint-oil", 13],
  ["art-paint-graffiti", 0.42],
  ["art-digital-photoshop-drawing", 3.33],
  ["art-digital-photoshop-photo maniulation", 1.66],
  ["art-digital-photography", 2.04],
  ["art-digital-computer modeling", 2],
  ["art-digital-music composition", 1],
  ["art-sculpture", 1],
  ["art-drawing-manga", 2.08],
  ["art-drawing-sketch", 21.66],
  ["art-music-piano", 30.33],
  ["art-music-flute", 0.72],
  ["art-music-trombone", 4.66],
  ["art-music-clarinet", 4.55],
  ["art-digital-video editing", 10],
  ["art-writing-fiction", 17],
  ["art-writing-fanfiction", 46],
  ["art-writing-blog/journal", 97],
  ["coding-personal project-webpage-javscript, jQuery, HTML, CSS", 7],
  ["coding-personal project-webpage-C, perl, HTML", 0.34],
  ["coding-personal project-app development-C#, XAML", 1.59],
  ["coding-personal project-app development-python", 10],
  ["coding-personal project-app development-javscript, HTML, CSS", 2],
  ["coding-research-python", 26.66],
  ["coding-research-SPARQL", 0.04],
  ["coding-assignment-java", 24.46],
  ["coding-assignment-python", 10.5],
  ["coding-assignment-SML", 4],
  ["coding-assignment-C", 7.35],
  ["coding-assignment-perl", 0.34],
  ["coding-assignment-MATLAB", 1.24],
  ["coding-assignment-R", 1.23],
  ["coding-assignment-LaTex", 1.14],
  ["coding-personal project-text formatting-LaTex", 27.53],
  ["coding-personal project-text formatting-HTML, CSS", 6.36],
  ["other-math-statistics", 20],
  ["other-astronomy", 8],
  ["other-philosophy", 3.33]
];

var CVS_colors = function(){
  var cat = {};

  for (var i in CVS_substitute){
  	var s = CVS_substitute[i][0].split("-");
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
  console.log(cat);
  var colMap = {};
  var startColor = getRandomColor();
  var ind = 0;
  for (var i in cat){
    var color = [startColor[ind%3], startColor[(ind+1)%3], startColor[(ind+2)%3]];
    ind++;
    colMap[i] = color;
    console.log(color);
    // console.log(numChild(cat[keys[i]], 1));
    var sstep = Math.floor((250.0-Math.min.apply(null, colMap[i]))/cat[i].len);
    for (var j in cat[i].sub){
      var arr = cat[i].sub[j];
      for (var k=0; k < arr.length; k++){
        if (Object.keys(colMap).indexOf(arr[k]) < 0){
          colMap[arr[k]] = color.map(function(x){
                var shift = Math.abs((k+1)*(230-x)/arr[k].length);
                console.log(shift);
                if (x == Math.min.apply(null, color)){
                    return Math.min(240, Math.floor(x+ shift));
                }
                var temp = Math.floor( Math.random() * shift + (k+1)*30);
                console.log("13, ",temp, (k+1));
                return Math.min(240, x+temp)  });
          console.log(color, colMap[arr[k]] );
        }
      }
    }
  }
  for (var i in colMap){
    colMap[i] = formatColor(colMap[i]);
  }
  console.log(colMap);
  return colMap;
}();