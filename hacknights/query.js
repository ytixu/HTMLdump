var hasUpdated = false;

function get_date(){
	lastUpdate = localStorage.getItem('last');
	today = new Date();
	time = today.getUTCHours();
	date = today.getUTCDate();
	if (lastUpdate == null){
		localStorage.setItem('last', "12,"+date);
		return;
	}else{
		lastUpdate = lastUpdate.split(",");
		if (date == parseInt(lastUpdate[1]) || time - parseInt(lastUpdate[0]) < 0){
			hasUpdated = true;
		}else{
			localStorage.setItem('last', lastUpdate[0]+","+date);
		}
	}
}

//// set sunrise and sunset

var mapapi = function(place){
	return "http://api.openstreetmap.org/api/0.6/notes/search.json?q=" + place + "&place=city&limit=10";
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

function getSunRiseSunset(str, func){
	console.log("UPDATE");
	var res = $.getJSON(mapapi(str)).done(function(data){
		try{
			var coordinates = data.features[0].geometry.coordinates;
			loc = data.features[0].properties.comments[0].text;
			i = 1;
			while (i<data.features.length){
				if (loc.toLowerCase().indexOf(str.toLowerCase()) > -1){
					loc = str;
					break;
				}
				if (loc.length < str.length + 10){
					break;
				}
				coordinates = data.features[i].geometry.coordinates;
				loc = data.features[i].properties.comments[0].text;
				i++;
			}
			if (loc.length > str.length + 10){
				loc = str;
			}
			$.ajax({
				dataType: "jsonp",
				url: sunapi(coordinates[1], coordinates[0]),
				success: function(data){
					sunrise = parseTime(data.results.sunrise);
					sunset = parseTime(data.results.sunset);
					save();
					setTimeCount();
					if (func) func();
				}
			});
		}catch(err){
			if (func) func();
		}
	});
}

function parseTime(time){
	temp = time.split(" ");
	time = toNums(temp[0].split(":"));
	if (temp[1].indexOf("P")>-1){
		time[0] += 12;
	}
	return time;
}

function save(){
	localStorage.setItem('sunset', sunset.join());
	localStorage.setItem('sunrise', sunrise.join());
	localStorage.setItem('location', loc);
}
function load(){
	if (!hasUpdated){
		getSunRiseSunset(loc);
		return;
	}
	sunrisetemp = localStorage.getItem('sunrise');
	if (sunrisetemp == null){
		getSunRiseSunset(loc);
	}else{
		loc = localStorage.getItem('location');
		sunset = toNums(localStorage.getItem('sunset').split(","));
		sunrise = toNums(sunrisetemp.split(","));
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
	count();
}

function count(){
	var now = new Date;
	var today = new Date(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() ,
      now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
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
	if (hours < 0){
		hours = next[0] + 24 - today.getHours() + carry;
	}
	var h = hours.toString();
	if (h.length < 2){
		h = "0"+h;
	}
	$('#timeCountDown').html(h+":"+m+":"+s);
	document.title = h+":"+m+":"+s;
	requestAnimFrame(count)
}

//// get location of user
var loc = "Montreal";
var isVisible = false;

function displayName(){
	$("#cityName").html(" " + loc.split(" ").map(function(x){
		return x.charAt(0).toUpperCase() + x.slice(1);
	}).join(" "));
}

function setLocationName(){
	$("#locationSubmit").click(updateLocationName);
	$("#inputCityBlock").hide();
	$('body').click(function(evt){
		if (!isVisible) return;
		if(evt.target.id == "inputCityBlock")
			return;
		if($(evt.target).closest('#inputCityBlock').length)
			return;
		isVisible = false;
		$("#inputCity").val("");
		$("#inputCityBlock").fadeOut("fast",displayName);
	});
	$("#inputCity").keypress(function(e) {
        if(e.which == 13) {
            if (!isVisible) return;
        	e.preventDefault();
        	updateLocationName();
        }
    });
	displayName();
	$("#cityName").click(function(){
		$("#cityName").html('');
		$("#locationSubmit").show();
		$("#inputCityBlock").fadeIn("fast", function(){
			isVisible = true;
		});
		$("#inputCity").focus();

	});
}

function updateLocationName(){
	isVisible = false;
	var val = $("#inputCity").val();
	$("#locationSubmit").hide();
	if (val.length > 0){
		startSpinning();
		getSunRiseSunset(val, function(){
			$("#inputCity").val("");
			$("#inputCityBlock").fadeOut("fast",displayName);
			stopSpinning();
		});
	}else{
		$("#inputCity").val("");
		$("#inputCityBlock").fadeOut("fast",displayName);
	}
	$('body').click(function(){});
}

///// spinner
var opts = {
  lines: 8, // The number of lines to draw
  length: 0, // The length of each line
  width: 5, // The line thickness
  radius: 8, // The radius of the inner circle
  corners: 0.2, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#fff', // #rgb or #rrggbb or array of colors
  speed: 0.9, // Rounds per second
  trail: 54, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: '50%', // Top position relative to parent
  left: '50%' // Left position relative to parent
};

var spinner = null;

function startSpinning(){
	if (spinner == null){
		var target = document.getElementById('spinner');
		spinner = new Spinner(opts).spin(target);
	}else{
		spinner.spin();
	}
}

function stopSpinning(){
	spinner.stop();
}


/////////////// background image

function setBackground(url){
	$("body").css({
      "background": "url(" + url + ")", //http://bing.com
      "background-size": "cover",
      "background-position": "center",
      "background-repeat": "no-repeat",
      "background-attachment": "fixed",
      // "background-blend-mode": "color"
    });
    if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1){
	    $(".siteTitle").css({
			"background": "url(sparkles.jpg)",
			"color": "rgba(225,225,225,0.3)",
			"background-image": "rgba(0,0,0,0)",
			"background-image": "linear-gradient(transparent, transparent)",
			"background-image": "-o-linear-gradient(transparent, transparent)",
			"background-image": "-moz-linear-gradient(transparent, transparent)",
			"background-image":"-ms-linear-gradient(transparent, transparent)",
			"background": "-webkit-linear-gradient(transparent, transparent), url(sparkles.jpg) transparent",
			"background-size": "cover",
			"background-position": "center",
			"background-repeat": "no-repeat",
			"background-attachment": "fixed",
			"-webkit-text-fill-color": "transparent",
			"-webkit-background-clip": "text"
	    });
	}
}

function getImage(){
	// if (hasUpdated){
	// 	url = localStorage.getItem('bgUrl');
	// 	if (url != null){
	// 		setBackground(url);
	// 		return;
	// 	}
	// }
 //  	$.ajax({
 //        url: 'http://noapi.dorparasti.ir/api/scraps/e9baeceb-f353-4703-a84d-c9e3107bd90f',
 //        cache: false,
 //        dataType: 'json',
 //        success: function (data) {
 //        	setBackground(data.Paths[0]);
 //        	localStorage.setItem('bgUrl', data.Paths[0]);
 //        }
 //    });
	setBackground("http://thecatapi.com/api/images/get?format=src&type=jpg");
	localStorage.setItem('bgUrl', "http://thecatapi.com/api/images/get?format=src&type=jpg");
}

get_date();
getImage();
load();
setLocationName();
