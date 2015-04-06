function query(url, type, callback){
	$.ajax({
		type: 'GET',
		dataType: type,
		url: url,
		success: function(data){
			callback(data);
		}
	});
}

var cat = {
	imageTypes: ["gif", "jpg"],
	imageTypeIndex: 0,
	imageCount:0,
	getPicture: function(){
		console.log(this.imageTypes[this.imageTypeIndex]);
		$("#cat_picture").html("<img class='bordered' src='http://thecatapi.com/api/images/get?format=src&type="
			+this.imageTypes[this.imageTypeIndex]+"&"+this.imageCount+"'>");
		this.imageTypeIndex = 1-this.imageTypeIndex;
		this.imageCount ++;
	},
	getBg: function(){
		query("http://noapi.dorparasti.ir/api/scraps/e3b76773-e265-4bf6-ae91-0fb5b93af10d", "json",
			function(e){
				console.log(e);
				$("body").css({
					background: "url(http://i.imgur.com/C3sLgvn.png)," + 
					"url('" + e.Paths[0] + "')",
					backgroundSize: "cover",
					backgroundAttachment: "fixed",
					backgroundPosition:"center",
					backgroundBlendMode: "overlay"
				});
			});
	},
	getFact: function(){
		query("https://jsonp.afeld.me/?url=http://catfacts-api.appspot.com/api/facts?number=1", "json",
			function(e){
				$("#cat_fact_text").html(e.facts[0]);
			});
	},
	getAll: function(){
		this.getBg();
		this.getBoth();
	},
	getBoth:function(){
		console.log(this);
		this.getFact();
		this.getPicture();
	}
}

cat.getAll();

function setupBtn(){
	$(".pawBtn").hover(function(){
			$(this).removeClass("ion-ios-paw");
			$(this).addClass("ion-ios-paw-outline");
		},function(){
			$(this).removeClass("ion-ios-paw-outline");
			$(this).addClass("ion-ios-paw");
		});
	$(".nextPic").click(function(){
		cat.getPicture();
	});
	$(".nextFact").click(cat.getFact);
	$(".nextBoth").click(function(){
		cat.getBoth();
	});
}

setupBtn();