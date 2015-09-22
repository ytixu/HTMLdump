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
	    	size: 200
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