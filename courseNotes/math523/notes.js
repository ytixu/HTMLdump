var menu = '<h1>Generalized Linear Models</h1>'+
'<hr>'+
'<div id="hoverMenu"><span class="index">Content</span>'+
'<ol>'+
'	<li><a href="notes1.html">Exponential Familiy (EF)</a>'+
'		<ol>'+
'			<li><a href="notes1.html#edfa">Exponential Disperson Family (EDF)</a></li>'+
'			<li><a href="notes1.html#jorg">J&#248;rgensen\'s Exponential Disperson Family Model</a></li>'+
'			<li><a href="notes1.html#mlee">Maximum Likelihood Estimates for EDF</a></li>'+
'			<li><a href="notes1.html#fish">Fisher Information</a></li>'+
'			<li><a href="notes1.html#delt">Delta Method</a></li>'+
'			<li><a href="notes1.html#robo">Robustness</a></li>'+
'		</ol></li>'+
'	<li><a href="notes2.html">Model Assessment and Goodness-of-Fit</a>'+
'		<ol>'+
'			<li><a href="notes2.html#LRT">Likelihood-Ratio Test (LRT)</a></li>'+
'			<li><a href="notes2.html#wald">Wald\'s Test</a></li>'+
'			<li><a href="notes2.html#rao">Rao\'s Score Test</a></li>'+
'			<li><a href="notes2.html#gofi">Goodness-of-Fit</a></li>'+
'			<li><a href="notes2.html#resi">Residual</a></li>'+
'		</ol></li>'+
'	<li><a href="notes5.html">Estimate</a>'+
'		<ol>'+
'			<li><a href="notes5.html#algo">Algorithms for Maximizing the Likelihood</a></li>'+
'			<li><a href="notes5.html#disp">Dispersion Parameter</a></li>'+
'			<li><a href="notes5.html#qasi">Quasi-Likelihood</a></li>'+
'		</ol></li>'+
'	<li><a href="notes3.html">Inference</a>'+
'		<ol>'+
'			<li><a href="notes3.html#cfit">Confidence Interval</a></li>'+
'			<li><a href="notes3.html#plrt">Profile Log-Likelihood Ratio Test (PLRT)</a></li>'+
'		</ol></li>'+
'	<li><a href="notes4.html">Relevant Models</a>'+
'		<ol>'+
'			<li><a href="notes3.html#logm">Logistic Model</a></li>'+
'			<li><a href="notes3.html#prom">Probit Model</a></li>'+
'			<li><a href="notes3.html#poim">Poission Model</a></li>'+
'		</ol></li>'+
'</ol></div>'+
'<hr>';

var footer='<hr>'+
'MATH 523 Generalized Linear Models, by Russell Steele<br>'+
'McGill University, Winter 2015<br>'+
'<div id="scrollTop">^<br>TOP</div>';

window.onload=function(){
	$("#menu").html(menu);
	$("#hoverMenu").hide();
	$("#footer").html(footer);
	$("#scrollTop").click(function() {
	  $("html, body").animate({ scrollTop: 0 }, "fast");
	  return false;
	});
	$("#menu").mouseover(function(){
		$("#hoverMenu").show();
	}).mouseout(function(){
		$("#hoverMenu").hide();
	});
};