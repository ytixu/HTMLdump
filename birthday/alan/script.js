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

function populateBG(){
	$('.splash-div').each(function(i, e){
		var div = document.createElement('div');
		$(div).addClass('splash-bg');
		$(div).attr('id','bg-'+$(e).data('id'));
		$(div).css({
			'background-image':'url("'+$(e).data('image')+'")'
		});
		$('#splash-bg-container').append(div);
		if (i == 0){
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

function refreashMenuHighlight(){
	for(var i in cachePosition){
		var top = $('#side-menu').offset().top;
		console.log(cachePosition[i].top);
		if (top > cachePosition[i].top &&
			top < cachePosition[i].buttom){
				$('#'+i).addClass('active');
		}else{
			$('#'+i).removeClass('active');
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
	populateBG();
	populateCache();
}());