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
'	<li><a href="notes4.html">Relevant Models</a>'+
'		<ol>'+
'			<li><a href="notes4.html#logm">Logistic Model</a></li>'+
'			<li><a href="notes4.html#prom">Probit Model</a></li>'+
'			<li><a href="notes4.html#poim">Poission Model</a></li>'+
'		</ol></li>'+
'	<li><a href="notes2.html">Model Assessment and Goodness-of-Fit</a>'+
'		<ol>'+
'			<li><a href="notes2.html#LRT">Likelihood-Ratio Test (LRT)</a></li>'+
'			<li><a href="notes2.html#wald">Wald\'s Test</a></li>'+
'			<li><a href="notes2.html#rao">Rao\'s Score Test</a></li>'+
'			<li><a href="notes2.html#gofi">Goodness-of-Fit</a></li>'+
'			<li><a href="notes2.html#resi">Residual</a></li>'+
'		</ol></li>'+
'	<li><a href="notes3.html">Inference</a>'+
'		<ol>'+
'			<li><a href="notes3.html#cfit">Confidence Interval</a></li>'+
'			<li><a href="notes3.html#plrt">Profile Log-Likelihood Ratio Test (PLRT)</a></li>'+
'		</ol></li>'+
'	<li><a href="notes5.html">Estimate</a>'+
'		<ol>'+
'			<li><a href="notes5.html#algo">Algorithms for Maximizing the Likelihood</a></li>'+
'			<li><a href="notes5.html#disp">Dispersion Parameter</a></li>'+
'			<li><a href="notes5.html#qasi">Quasi-Likelihood</a></li>'+
'			<li><a href="notes5.html#nbin">Negative-Binomial</a></li>'+
'			<li><a href="notes5.html#ivbd">Dispersion in Bernoulli Data</a></li>'+
'			<li><a href="notes5.html#beta">Beta-Binomial</a></li>'+
'		</ol></li>'+
'	<li><a href="notes6.html">Log-Linear Model</a>'+
'		<ol>'+
'			<li><a href="notes6.html#2way">2-Way Table</a></li>'+
'			<li><a href="notes6.html#mass">Measure of Association</a></li>'+
'			<li><a href="notes6.html#cdmg">Conditional and Marginal Odds Ratio</a></li>'+
'			<li><a href="notes6.html#ifor">Inference for Odds Ratio</a></li>'+
'			<li><a href="notes6.html#test">Testing of Odds Ratios</a></li>'+
'			<li><a href="notes6.html#lloi">Log-Linear Model of Independence</a></li>'+
'			<li><a href="notes6.html#3way">3-Way Table</a></li>'+
'		</ol></li>'+
'   <li><a href="notes7.html">Moltinomial Response Models</a>'+
'		<ol>'+
'			<li><a href="notes7.html#nmrs">Nominal Response</a></li>'+
'			<li><a href="notes7.html#orrs">Ordinal Response</a></li>'+
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