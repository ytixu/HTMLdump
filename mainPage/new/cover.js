function createStuff(type, text){
	var stuff = document.createElement(type);
	stuff.innerHTML = text;
	return stuff;
}

function loadPage1(){
	$("#imagePic").animate({"width": "+=60%"}, "slow");
	$("#titleTable").animate({"margin-left": "-=22%"}, "slow");
}

function loadPage2(){
	$("#text2").slideDown( "slow" );
}


function loadPage3(){

}


function loadPage4(){

}


function loadPage5(){
	setTimeout(function(){
		$("#text5").slideDown( "slow" );
		setTimeout(function(){
			$("#text55").slideDown( "slow" );
		}, 500);
	}, 1000);
}


function loadPage6(){
	$("#text6").slideDown( "slow" );
	pos = true;
	setTimeout(function(){
		$('#sliderV').trigger('click');
	}, 1000);
}


function loadPage7(){
    $( "#text7" ).slideDown( "slow" );
}