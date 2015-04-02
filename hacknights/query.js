var mapapi = function(place){
	return "http://api.openstreetmap.org/api/0.6/notes/search.json?q=" + place + "&limit=1";
}
var sunapi = function(lat, lng){
	return "http://api.sunrise-sunset.org/json?lat="+lat+"&lng="+lng+"&date=today";
}

var sunrise = 0;
var sunset = 0;

function getSunRiseSunset(str){
	$.getJSON(mapapi(str)).done(function(data){
		var coordinates = data.features[0].geometry.coordinates;	
		$.getJSON(sunapi(coordinates[1], coordinates[0])).done(function(data){
			console.log(data)
		});
	});
}
function save(){
	localStorage.setItem('sunset',this.sunset);
	localStorage.setItem('sunrise', this.sunrise);
}
function load(){
	this.sunrise = localStorage.getItem('sunrise');
	this.sunset = localStorage.getItem('sunset');
}

function setTimeCount(){
	console.log(coordinates);
}


getSunRiseSunset("montreal");
