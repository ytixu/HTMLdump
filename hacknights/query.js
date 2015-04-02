//// get location of user
var location = "montreal";

//// set sunrise and sunset

var mapapi = function(place){
	return "http://api.openstreetmap.org/api/0.6/notes/search.json?q=" + place + "&limit=1";
}
var sunapi = function(lat, lng){
	return "http://api.sunrise-sunset.org/json?lat="+lat+"&lng="+lng+"&date=today";
}

var sunrise = 0;
var sunset = 0;

function toNums(arr){
	return arr.map(function(x){
		return parseInt(x);
	});
}

function getSunRiseSunset(str){
	$.getJSON(mapapi(str)).done(function(data){
		var coordinates = data.features[0].geometry.coordinates;	
		$.ajax({
			dataType: "jsonp",
			url: sunapi(coordinates[1], coordinates[0]),
			success: function(data){
				sunrise = parseTime(data.results.sunrise);
				sunset = parseTime(data.results.sunset);
				setTimeCount();
				save();
			}
		});
	});
}

function parseTime(time){
	temp = time.split(" ");
	console.log(temp[0].split(":"));
	time = toNums(temp[0].split(":"));
	if (temp[1].indexOf("P")>-1){
		time[0] += 12;
	}
	return time;
}

function save(){
	localStorage.setItem('sunset', sunset.join());
	localStorage.setItem('sunrise', sunrise.join());
}
function load(){
	sunrisetemp = localStorage.getItem('sunrise').split(",");
	if (sunrisetemp[0].indexOf("null") > -1){
		getSunRiseSunset(location);
	}else{
		sunset = toNums(localStorage.getItem('sunset').split(","));
		sunrise = toNums(sunrisetemp);
	}
}

function setTimeCount(){
	console.log(sunrise, sunset);
}

load();

