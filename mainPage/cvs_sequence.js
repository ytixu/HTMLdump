function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 14 + 2)];
    }
    return color;
}

var CVS_colors = {};

var CVS_substitute = [
  ["personal&nbsp;activity-art-origami", 504],
  // ["personal&nbsp;activity-art-origami-modular&nbsp", 243],
  // ["personal&nbsp;activity-art-paint-arcrylic", 132],
  // ["personal&nbsp;activity-art-paint-oil", 346],
  // ["personal&nbsp;activity-art-digital-photoshop-drawing", 1494],
  // ["personal&nbsp;activity-art-digital-photoshop-photo&nbsp;maniulation", 1234],
  // ["personal&nbsp;activity-art-digital-photography", 19484],
  // ["personal&nbsp;activity-art-computer&nbsp;modeling", 532],
  // ["personal&nbsp;activity-art-digital-music&nbsp;writting", 90],
  ["personal&nbsp;activity-art-scupture", 30],
  // ["personal&nbsp;activity-art-drawing-manga", 234],
  ["personal&nbsp;activity-art-drawing-sketch", 1142]
];

for (var i in CVS_substitute){
	var s = CVS_substitute[i][0].split("-");
	for (var j in s){
		try{
			if (CVS_colors.keys().indexOf(s[j]) > -1) continue;
		}catch (e){}
		CVS_colors[s[j]] = getRandomColor();
	}
}