var skillCharts = [
	{
		name: "Java",
		percent: 73,
		color:'#00CC99'
	},{
		name: "Matlab",
		percent: 42,
		color:'#FF6699'
	},{
		name: "Proofs",
		percent: 93,
		color:'#FF9900'
	}
];

// get icons from here https://fortawesome.github.io/Font-Awesome/icons/
var experience = [
	{
		name: "Farmer",
		time: "2041-pre",
		location: "Planet Kepler-z3023",
		description: "Feeding horses and cows with self-grown grass on a airless environment.",
		faIcon: "fa-space-shuttle",
		url:"#"
	},{
		name: "Master of Computer Science",
		time: "2015-2017",
		location: "McGill University, Montreal",
		description: "",
		faIcon: "fa-star",
		url:"#"
	},{
		name: "Bachelor of Mathematics and Computer Science",
		time: "2012-2015",
		location: "McGill University, Montreal",
		description: "",
		faIcon: "fa-graduation-cap",
		url:"#"
	},{
		name: "Undergraduate Research",
		time: "2014",
		location: "McGill University, Montreal",
		description: "",
		faIcon: "fa-search",
		url:"#"
	}
];

var projects = [
	{
		name:"600 hours of game!",
		time:"2015",
		location:"Montreal",
		description:"I played 600 hours of Mocano. Good times.",
		image:"images/proj1.jpg",
		url:"http://www.google.com"
	},{
		name:"Bar dancing club",
		time:"2014-2015",
		location:"Montreal",
		description:"I founded a startup of a club of dedicated students who do bar dancing for their teacher to show their love and adiration.",
		image:"images/proj2.jpg",
		url:"http://www.google.com"
	},{
		name:"Robotics project",
		time:"2014",
		location:"Montreal",
		description:"I implemented a paper in robotics class. Everything was done in C++.",
		image:"images/proj3.jpg",
		url:"http://www.google.com"
	}
]

function pieChartInit(){
	$('.chart').each(function(i, e){
		$(e).easyPieChart({
	        barColor: $(this).data('color'),
		    trackColor: 'rgba(0,0,0,0.6)',
	    	size: 100
	    });
    });
}

// angular

function viewCtrl($scope) {
	$scope.skillCharts = skillCharts;
	$scope.experience = experience;
	$scope.projects = projects;

	$scope.refresh = function() {
		window.setTimeout(function(){
			// MatJax (if latex code in js data arrays, uncomment this)
			// MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			pieChartInit();
		}, 500);
	};
}


// menu highligher
var cachePosition = {};
var currentSplash = ''

function populateBG(){
	$('.splash-div').each(function(i, e){
		var div = document.createElement('div');
		$(div).addClass('splash-bg');
		$(div).attr('id','bg-'+$(e).data('id'));
		console.log($(e).data('image'));
		$(div).css({
			'background-image':'url("'+$(e).data('image')+'")'
		});
		$(div).hide();
		$('#splash-bg-container').append(div);
		if (i == 0){
			currentSplash = $(div).attr('id');
			if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1){
				$('#splash-title').css({
					'background': 'url("'+$(e).data('image')+'")',
					'background-position':'center',
					'background-size':'cover',
					'background-color':'rgba(255,132,183, 0.4)',
					'background-blend-mode': 'overlay',
					'-webkit-background-clip': 'text'
				});
			}
			$(div).fadeIn('slow');
		}
	});
}

function populateCache(){
	$('.splash-div').each(function(i, e){
		var top = $(e).position().top-$(window).height()*0.392;
		cachePosition[$(e).data('id')] =
		{
			top: top,
			buttom: $(e).height() + top,
		}

	});
}

function showMenu(top){
	var thr = $(window).height()*0.618;
	if(top > thr){
		$('#side-menu').slideDown('slow');
	}else if(top < thr){
		$('#side-menu').slideUp('slow');
	}
}

function refreashMenuHighlight(){
	for(var i in cachePosition){
		var top = $('#side-menu').offset().top;
		showMenu(top);
		if (top > cachePosition[i].top &&
			top < cachePosition[i].buttom){
				$('#'+i).addClass('active');
				if($('#bg-'+i).attr('id') != currentSplash){
					currentSplash = $('#bg-'+i).attr('id');
					$('#bg-'+i).fadeIn('slow');
				}
		}else{
			$('#'+i).removeClass('active');
			$('#bg-'+i).fadeOut('slow');
		}
	}
}

window.onscroll = function(){
	refreashMenuHighlight();
}

window.onresize = function(){
	populateCache();
	refreashMenuHighlight();
}


$(function(){
	$('#side-menu').hide();
	populateBG();
	populateCache();
}());