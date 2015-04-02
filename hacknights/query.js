//// get location of user
var loc = "montreal";

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
	console.log(str);
	var res = $.getJSON(mapapi(str)).done(function(data){
		var coordinates = data.features[0].geometry.coordinates;	
		console.log(data);
		$.ajax({
			dataType: "jsonp",
			url: sunapi(coordinates[1], coordinates[0]),
			success: function(data){
				sunrise = parseTime(data.results.sunrise);
				sunset = parseTime(data.results.sunset);
				save();
				setTimeCount();
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
		getSunRiseSunset(loc);
	}else{
		sunset = toNums(localStorage.getItem('sunset').split(","));
		sunrise = toNums(sunrisetemp);
		setTimeCount();
	}
}

///// update time

window.requestAnimFrame = (function(){
  return function( callback ){
    window.setTimeout(callback, 1000);
  };
})();

var sunriseDate;
var sunsetDate;

function setTimeCount(){
	var today = new Date();
	sunriseDate = new Date(today.getFullYear(), 
						   today.getMonth(),
						   today.getDate(),
						   sunrise[0],
						   sunrise[1],
						   sunrise[2]);
	sunsetDate = new Date(today.getFullYear(), 
						   today.getMonth(),
						   today.getDate(),
						   sunset[0],
						   sunset[1],
						   sunset[2]);
	console.log(today.toDateString(), sunsetDate.toDateString(), sunriseDate.toDateString());
	count();
}

function count(){
	var today = new Date();
	if (sunsetDate.getTime() < today.getTime()){
		sunriseDate.setDate(sunriseDate.getDate()+1);
	}
	if (today.getTime() >= sunriseDate.getTime() && today.getTime() < sunsetDate.getTime()){
		$('#timeTitle').html('Starts in');
		next = sunset;
	}else{
		$('#timeTitle').html('Ends in');
		next = sunrise;
	}
	var carry = 0;
	var seconds = next[2] - today.getSeconds();
	if (seconds < 0){
		seconds = 60 + seconds;
		carry = -1;
	}
	var s = seconds.toString();
	if (s.length < 2){
		s = "0"+s;
	}
	var minutes = next[1] - today.getMinutes() + carry;
	if (minutes < 0){
		minutes = 60 + minutes;
		carry = -1;
	}else{
		carry = 0;
	}
	var m = minutes.toString();
	if (m.length < 2){
		m = "0"+m;
	}
	var hours = next[0] - today.getHours() + carry;
	var h = hours.toString();
	if (h.length < 2){
		h = "0"+h;
	}
	$('#timeCountDown').html(h+":"+m+":"+s);
	requestAnimFrame(count)
}

function displayName(){
	$("#cityName").html(" " + loc.split(" ").map(function(x){
		return x.charAt(0).toUpperCase() + x.slice(1);
	}));
}

function setLocationName(){
	$("#locationSubmit").click(updateLocationName);
	$("#inputCityBlock").hide();
	displayName();
	$("#cityName").click(function(){
		$("#cityName").html('');
		$("#inputCityBlock").fadeIn("fast");
	});
}

function updateLocationName(){
	var val = $("#inputCity").val();
	if (val.length > 0){
		getSunRiseSunset(val);
	}
	$("#inputCity").val("");
	$("#inputCityBlock").fadeOut("fast",displayName);
}

load();
setLocationName();
