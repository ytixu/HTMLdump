// startup ides


var urlMap = {
	thisIsForThat: {
		callback: function(data){
			$("div#thisIsForThat").html("<br>Make a<h1>" + data["this"] + "</h1>for<h1>" + data["that"]+"</h1>");
			if ($("div#thisIsForThat").is( ":hidden" )){
				$("div#thisIsForThat").slideDown("fast");
			}
		},
		url: "http://itsthisforthat.com/api.php?call=urlMap.thisIsForThat.callback"
	}
};

function query(e){
	$.ajax({
		type: 'GET',
		jsonpCallback: 'callback',
		dataType: "jsonp",
		url: urlMap[e.id].url,
		success: function(data){
			console.log(data);
		}
	});
}