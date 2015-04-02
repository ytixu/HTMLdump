var mapapi = function(place){
	return "http://api.openstreetmap.org/api/0.6/notes/search.json?q=" + place;
}
var sunapi = function(lat, lng){
	return "http://api.sunrise-sunset.org/json?lat="+lat+"&lng="+lng+"&date=today";
}