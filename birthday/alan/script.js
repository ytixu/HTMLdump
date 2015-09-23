var skillCharts = [
	{
		name: "Java",
		percent: 73,
		color:'#00CC99'
	},{
		name: "Matlab",
		percent: 42,
		color:'#FF6699'
	}
]

function pieChartInit(){
	$('.chart').each(function(i, e){
		console.log($(e));
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

	$scope.refresh = function() {
		window.setTimeout(function(){
			//scrollReveal
			// window.sr = new scrollReveal();
			// MatJax
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
		var top = $(e).position().top-$(window).height()/5;
		cachePosition[$(e).data('id')] =
		{
			top: top,
			buttom: $(e).height() + top,
		}

	});
}

function showMenu(top){
	var thr = $(window).height()*0.618;
	console.log(top, thr);
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
			console.log(i);
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