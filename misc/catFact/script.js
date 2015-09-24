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
		$("#cat_picture").fadeOut("fast", function(){
			$("#cat_picture").html("<img class='bordered' src='http://thecatapi.com/api/images/get?format=src&type="
				+cat.imageTypes[cat.imageTypeIndex]+"&"+cat.imageCount+"'>");
			cat.imageTypeIndex = 1-cat.imageTypeIndex;
			cat.imageCount ++;
			$("#cat_picture").fadeIn("fast");
		});
	},
	getBg: function(){
		// query("http://noapi.dorparasti.ir/api/scraps/e3b76773-e265-4bf6-ae91-0fb5b93af10d", "json",
		// 	function(e){
				$("body").css({
					'background': "url('sparkles.jpg'), url('http://thecatapi.com/api/images/get?format=src&type=jpg')",
					'background-color':'#555555',
					'background-size': "cover",
					'background-attachment': "fixed",
					'background-position':"center",
					'background-blend-mode': "overlay"
				});
			// });
	},
	getFact: function(){
		$("#cat_fact_text").fadeOut("fast", function(){
			query("https://jsonp.afeld.me/?url=http://catfacts-api.appspot.com/api/facts?number=1", "json",
				function(e){
					$("#cat_fact_text").html(e.facts[0]);
					$("#cat_fact_text").fadeIn("fast");
				});
		});
	},
	getAll: function(){
		this.getBg();
		this.getBoth();
	},
	getBoth:function(){
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
	$("#catFooterToggle").slideUp("fast");
	$("#upArrow").click(function(){
		$("#catFooterToggle").slideDown("fast");
		$(this).fadeOut("fast");
	});
	$(".catContent").mouseover(function(){
		if ($("#upArrow").is( ":hidden" )){
			$("#catFooterToggle").slideUp("fast");
			$("#upArrow").fadeIn("fast");
		}
	});
}
console.log("Nyaaaaaaaan~~~~");
setupBtn();