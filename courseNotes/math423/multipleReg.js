var multipleReg = {
	sub:[{
		id: "multianal",
		open: false,
		name: "Linear Regression",
		model: "Given $p$ predictors," + equation(utilModel.expectedOutcome) + "where $X_i$ is a $(1\\times p)$\
				row vector and $\\beta$ is a $(p\\times 1)$ column vector."+equation("X_i ="
				+array([["1", "X_{i1}", "\\dots", , "X_{ik}"]], "[]")) + "where $p=k+1$.",
		sub:[
			{
				id: "lestesti",
				open: false,
				name: "Least Squares Estimate",
				ctn: "One can estimate $\\beta$ using least squares, i.e.: minimize"
					+equation("S(\\boldsymbol\\beta) = \\sum_{i=1}^n(y_i-\\beta_0 - \\beta_1x_{i1} - \\dots\
					 - \\beta_px_{ik})^2")+"which is to solve"
					+equation("\\frac{\\delta S(\\boldsymbol\\beta)}{\\delta \\beta_j}\
					 = -2\\sum_{i=1}^nx_{ij}(y_i - x_{ij}\\beta_j)")+"for $j\\in\\{0,1,\\dots, k\\}$."+
					"This can be reduced to $"+utilModel.normalEqu+"$ whence"+equation(utilModel.betaEstimate)
					+"is deduced if $"+utilModel.xtx+"$ is not singular.",
				sub:[{
					id: "assption",
					open: false,
					name: "Assumption",
					ctn:"Assume a normal residual error $"+utilModel.assumeNormalOutCome+ "$, i.e.:" + align("", [utilModel.assumeModel, utilModel.varAssumed("Y")+"& (n\\times n)"])+
						"with $" + utilModel.assumeNormalError +"$, i.e.:" + align("", [utilModel.expectedError, utilModel.varAssumed("\\varepsilon")])
						+"where $"+enumerate("\\varepsilon", "n")+"$ are non-correlated."
				},{
					id: "estvar",
					open: false,
					name: "Estimate Variance",
					ctn: equation(utilModel.varEstimate("p"))+"and it is unbaised for $\\sigma^2$."
				},{
					id: "inferno",
					open: false,
					name: "Inference",
					ctn: "Let $V=("+utilModel.xtx+")^{-1}$"+align("",[utilModel.expectedBeta, utilModel.varBeta+"=\\sigma^2V"])
				}]
			},{
				id: "specialpred",
				open:false,
				name: "Special Types of Predictors",
				sub:[{
						id: "polyterm",
						open:false,
						name: "Polynomial Terms",
						cnt: "Suppose $X_{ij} = X_{i1}^j$ for $j=1,2,\\dots, k$, then" 
							+ equation("\\mathbb{E}_{Y_i|\\boldsymbol X_i}[Y_i|\\boldsymbol X_i]\
								= \\beta_0 + \\sum_{j=1}^k\\beta_jx_{i1}^j") + "allowing quadratic,\
								cubic, etc, dependence of $y$ on $X$.",
						cov: "By convention, if a higher degree term is included in the model, all its lower\
								degrees are included as well. As the demon always say, either you bring all your s***t\
								to school or stay at home."
					},{
						id: "factorpedo",
						open:false,
						name: "Factor Predictor",
						cnt: "A factor predictor is a label that takes $M$ possible values (or level), indentifying $M$\
							subgroups in the sample. If $X$\
							is a factor predictor, then it can be expanded to $M$ indicator predictors $X_{i1}, \\dots, X_{iM}$\
							where, for each $m = 1,\\dots, M$,"+equation("x_{im} = \\begin{cases}\
							1 &\\mbox{if } x = m\\\\\
							0 &\\mbox{otherwise}\\end{cases}"),
						model:"The linear regression model with one factor predictor is"+
							equation("\\mathbb{E}_{Y_i|\\boldsymbol X_i}[Y_i|\\boldsymbol X_i] = \\beta_0\
									+ \\sum_{l=1}^L\\beta_l^cx_{il}")+"where $\\beta_l^c$ are contrasts, parameters quanifying the\
							difference in expected response from the baseline ($l=0$) group.",
						cov: "By convention, either include all the levels in the model or exclude all of them."
					},{
						id:"interact",
						open: false,
						name:"Interaction",
						cnt: "Two different predictor may be united by the power of the love God in Statisitcs to produce\
							a joint effect acting in conjunction with each other. If $X_{i1}$ and $X_{i2}$ are our love birds\
							then their baby can be written as so in the model"
							+equation("\\mathbb{E}_{Y_i|\\boldsymbol X_i}[Y_i|\\boldsymbol X_i] = \\beta_0 +\
								\\beta_1X_{i1} + \\beta_2X_{i2} + \\beta_{12}x_{i1}x_{i2}"),
						cov: "By convention, interaction are only included in a model when its parent predictors\
							are also included. As my mother always say, leaving a bunch of kids alone will always end in a\
							disaster."
					}]
			}
		]
	},{
		id: "tests",
		open: false,
		name:"Testing",
		sub:[{
			id: "adequa",
			open:false,
			name:"Assessing Model Adequacy",
			sub:[{
				id: "rsquared",
				open:false,
				name: "Global Model Adequacy",
				cnt: "One can consider the adequacy of the model at a global square. The measurement"+
					equation("R^2 = \\frac{"+ss_("R")+"}{"+ss_("T")+"} = 1 - \\frac{"+ss_("RES")+"}{"+ss_("T")+"}"),
				cnte: "But this measurement is sensible to the number of predictors because $"
					+ss_("RES")+"$ descrease in expectation as $p$ increases. So one can use the adjusted $R^2$ instead."+
					equation(utilModel.ras +" = 1 - \\frac{"+ss_("RES")+"/(n-p)}{"+ss_("T")+"/(n-1)}")
			},{
				id: "multipleRegresidual",
				open:false,
				name: "Local Model Adequacy",
				test: "One can consider the adequacy of the model\
						at the local scale. The residual plots ($p$ of them),\
						i.e.:"+equation(utilModel.residual)+"v.s. $i$, $\\hat{y}_i$ or $\\boldsymbol x_{i}$\
						for each $j \\in \\{1,...,p\\}$, should be patternless, that is, the residual should have equal\
						mean-level and variability arround zero, forming a perfect chaotic band around zero, as"
						+ equation("\\boldsymbol e^\\top \\widetilde{\\boldsymbol x}_j = \\sum_{i=1}^ne_ix_{ij} = 0")
						+ "and same for $\\hat{y}_i$."
			}]
		},{
			id: "paramqw",
			open:false,
			name: "Tests on Parameters",
			sub:[{
				id: "multipleRegttest",
				open: false,
				name:"Single Hypothesis Testing",
				hypothesis: "One can consider individual the coefficients, from a single fit." 
							+ tests.tTest.hypo + tests.tTest.j,
				ttest:"Use t-statistic"+equation(tests.tTest.stat
						+"=\\frac{\\hat{\\beta}_j}{\\sqrt{\\sigma^2V_{jj}}}")
						+"where $V_{jj}$ is the $j$th diagonal element of $V="+utilModel.xtx+"$.",
				assymptotic: "If $"+utilModel.assumeNormalError+"$, then "+tests.tTest.ass+"."
			},{
				id: "multipleRegftest",
				open: false,
				name: "Simultaneous Hypothesis Testing",
				hypothesis: "One can consider all the coefficients as a whole, from a single fit." 
							+ tests.ftest.hypo,
				test: "Use the (ANOVA) sum of squares decomposition" + align("", [tests.ftest.sumDecomp, 
						"\\sum_{i=1}^n(y_i-\\bar{y})^2 = \\sum_{i=1}^n(y_i-\\hat{y}_i)^2\
							+ \\sum_{i=1}^n(\\hat{y}_i - \\bar{y})^2"])+
						"and define the statistic"+equation(tests.ftest.stat + "=\\frac{"
						+ms_("R")+"}{"+ms_("RES")+"}"),
				assymptotic: "If $"+utilModel.assumeNormalOutCome+"$, then "+tests.ftest.ass()+".",
				anova: "<center><table><caption>ANOVA table</caption>\
						<tr><td class=\"title\">Source</td><td class=\"title\">$SS$</td>\
								<td class=\"title\">df</td><td class=\"title\">$MS$</td><td class=\"title\">$F$</td></tr>\
						<tr><td class=\"title\">Regression</td><td>$"+ss_("R")+"$</td><td>$k$</td><td>$"+ss_("R")
								+"/k$</td><td>$"+ms_("R")+"/"+ms_("RES")+"$</td><tr>\
						<tr><td class=\"title\">Residual</td><td>$"+ss_("RES")+"$</td><td>$n-k-1$</td><td>$"+ss_("RES")
								+"/(n-k-1)$</td><td></td><tr>\
						<tr><td class=\"title\">Total</td><td>$"+ss_("T")+"$</td><td>$n-1$</td><td></td><td></td><tr>\
						</table></center>"
			},{
				id: "simulttest",
				open:false,
				name:"Collections of Parameters Testing",
				cnt: "One may split all the parameters into two groups (one with $p-r$ predictors and one with $r$ predictors) with"+
					align("", ["\\boldsymbol X ="+array([["\\boldsymbol X^{(1)}", "\\boldsymbol X^{(2)}"]], "[]"), 
						"\\boldsymbol\\beta ="+array([["\\boldsymbol\\beta^{(1)}", "\\boldsymbol\\beta^{(2)}"]], "[]")])
					+"and construct a reduced model\
					<center>Full model: $"+utilModel.assumeModel+"$<br>\
							Reduced model: $\\boldsymbol y = \\boldsymbol X^{(1)}\\boldsymbol\\beta^{(1)}\
							+ \\boldsymbol \\varepsilon$</center> That is, under the reduced model,\
							$\\boldsymbol\\beta^{(2)} = 0_r$",
				constr:"The normal equation is written as such"
					+equation("\\boldsymbol\\beta^{(1)} ="
						+array([["(\\boldsymbol X^{(1)})^\\top\\boldsymbol X^{(1)}", "(\\boldsymbol X^{(1)})^\\top\\boldsymbol X^{(2)}"],
							["(\\boldsymbol X^{(2)})^\\top\\boldsymbol X^{(1)}", "(\\boldsymbol X^{(2)})^\\top\\boldsymbol X^{(2)}"]], "[]")
						+ "=" + array([["(\\boldsymbol X^{(1)})^\\top \\boldsymbol y"],["(\\boldsymbol X^{(2)})^\\top \\boldsymbol y"]], "[]"))
					+"and so under the reduced model"+ 
					equation("\\boldsymbol\\beta^{(1)} = ((\\boldsymbol X^{(1)})^\\top\\boldsymbol X^{(1)})\
						^{-1}(\\boldsymbol X^{(1)})^\\top \\boldsymbol y") +
					"The sum of squares decomposition becomes"+align("", 
						["\\overline{SS}_{\\text{T}} = {SS}_{\\text{RES}} + \\overline{SS}_{\\text{R}}", 
						"\\sum_{i=1}^ny_i^2 = \\sum_{i=1}^n(y_i-\\hat{y}_i)^2\
							+ \\sum_{i=1}^n\\hat{y}_i^2"])+ "Let $\\overline{SS}_{\\text{R}}(\\boldsymbol \\beta)$ and\
					$\\overline{SS}_{\\text{R}}(\\boldsymbol \\beta^{(1)})$ be the regression sum of squares from the\
					Full and Reduced model respectively. The extra sum of squares is"+
					equation("\\overline{SS}_{\\text{R}}(\\boldsymbol \\beta^{(2)} | \\boldsymbol \\beta^{(1)})\
							= \\overline{SS}_{\\text{R}}(\\boldsymbol \\beta) -\
								\\overline{SS}_{\\text{R}}(\\boldsymbol \\beta^{(1)})"),
				test:"Now, the two models can be compared with an partial F-statistic, that tests for <center>\
					$H_0$: $\\boldsymbol \\beta^{(2)} = 0_r$</center>" 
					+ equation("F = \\frac{\\overline{SS}_{\\text{R}}(\\boldsymbol \\beta^{(2)} | \\boldsymbol \\beta^{(1)})/r}\
							{"+ms_("RES", "\\boldsymbol \\beta")+"} = \\frac{("+ss_("RES","\\boldsymbol \\beta^{(1)}")+"-"
							+ss_("RES","\\boldsymbol \\beta")+")/r}{"+ss_("RES", "\\boldsymbol \\beta")+"/(n-p)}"),
				assymptotic: "Finally, "+tests.ftest.ass("r")+".",
				note: "Note that if $\\boldsymbol X^{(1)}$ and $\\boldsymbol X^{(2)}$ are orthogonal\
					then" + equation("(\\boldsymbol X^{(1)})^\\top \\boldsymbol X^{(2)} = 0")+
					"and" + equation("\\overline{SS}_{\\text{R}}(\\boldsymbol \\beta^{(2)} | \\boldsymbol \\beta^{(1)})\
							= \\overline{SS}_{\\text{R}}(\\boldsymbol \\beta^{(1)})") 
			},{
				id:"seqtest",
				open:false,
				name:"Sequential Test of Nested Models",
				cnt:"Suppose there are continuous predictors $X_1$, $X_2$ and $X_3$."+
					align("", [tests.ftest.ssrBar([0,1,2,3],[])+"="
						+[tests.ftest.ssrBar([0],[]), tests.ftest.ssrBar([1],[0]), tests.ftest.ssrBar([2],[0,1]),
						tests.ftest.ssrBar([3],[0,1,2])].join("+"), 
						tests.ftest.ssrBar([1,2,3],[0])+"="
						+[tests.ftest.ssrBar([1],[0]), tests.ftest.ssrBar([2],[0,1]),
						tests.ftest.ssrBar([3],[0,1,2])].join("+"), "\\mbox{etc}"]),
				indent: "There's the identity $"+tests.ftest.ssrBar([1,2,3],[0])+"="+ss_("R")+"$.",
				table:"<center><table>\
					<caption>ANOVA table</caption><tr>\
					<td></td><td class=\"title\">$SS$</td>\
						<td class=\"title\">df</td><td class=\"title\">$MS$</td><td class=\"title\">$F$</td></tr>\
					<td>$X_1$</td><td>$"+tests.ftest.ssrBar([1],[0])+"$</td>\
						<td>1<td>$"+tests.ftest.msBar([1],[0])+"$</td>\
						<td>$"+tests.ftest.Ftest([1],[0], [0,1,2,3])+"$</td></tr>\
					<td>$X_2$</td><td>$"+tests.ftest.ssrBar([2],[0,1])+"$</td>\
						<td>1<td>$"+tests.ftest.msBar([2],[0,1])+"$</td>\
						<td>$"+tests.ftest.Ftest([2],[0,1], [0,1,2,3])+"$</td></tr>\
					<td>$X_3$</td><td>$"+tests.ftest.ssrBar([3],[0,1])+"$</td>\
						<td>1<td>$"+tests.ftest.msBar([3],[0,1,2])+"$</td>\
						<td>$"+tests.ftest.Ftest([3],[0,1,2], [0,1,2,3])+"$</td></tr>\
					<td>Residual</td><td>$"+tests.ftest.ssRes([0,1,2,3])+"$</td>\
						<td>n-4<td>$"+tests.ftest.msRes([0,1,2,3])+"$</td>\
						<td></td></tr>\
					</tr></table></center>",
				exp: "The first F-test checks whether $X_1$ is worth including in the model.\
						The second checks whether $X_2$ is worth including after including $X_1$. The last checks\
						if $X_3$ is worth including after including $X_1$ and $X_2$."
			},{
				id:"genlin",
				open:false,
				name:"General Linear Hypothesis",
				cnt:"Freestyle testing where you can define a $(m\\times p)$ matrix $A$ and test for\
					<center>$H_0$: $A\\beta = 0$</center>If $A$ has $r$ linearly\
					independent rows, then $A$ poses $r$ linear constraints on $\\beta$, leaving $(p-r)$\
					free parameters.",
				model: "A reduced model can be conceived"
					+equation("\\boldsymbol y = \\boldsymbol Z\\boldsymbol\\gamma + \\boldsymbol\\varepsilon") +
					"where $\\boldsymbol\\gamma = (\\boldsymbol Z^\\top \\boldsymbol Z)^{-1}\\boldsymbol Z^\\top \\boldsymbol y$.",
				test:"One can do the same old F-test with"+
					equation(ss_("H") + "=" + ss_("RES") + "(\\mbox{Reduced}) - " + ss_("RES") + "(\\mbox{Full}))") + 
					equation("F=\\frac{"+ss_("H") +"/r}{"+ss_("RES")+"(\\mbox{Full})/(n-p)}"),
				assymptotic: "Again, "+tests.ftest.ass("r")+".",
			}]
		},{
			id: "confint",
			open:false,
			name:"Confidence Interval",
			past: "In one dimension, one may consider the confidence interval for\
				each coefficient using the normality assumption and the unbiased estimator $\\hat{\\sigma}^2$\
				for $\\sigma^2$."+equation("\\frac{\\hat{\\beta}_j - \\beta_j}{e.s.e.(\\hat{\\beta}_j)} \\sim\
											\\mbox{Student}(n-p)") + "for $j = 0,1, \\dots, k$",
			now: "In $p$ dimension, one may consider the \"simultaneous\" confidence interval for all the\
				coefficient together as a whole! This interval will cease to be an interval and flips\
				into the $\\mathbb{R}^p$ space, plumped up to a confidence ellipsoid (as if enlightened by McDonalds)."
				+ equation("\\frac{(\\hat{\\beta} - b)^\\top("+utilModel.xtx+")(\\hat{\\beta} - b)}{p"+ms_("RES")+"}\
							\\leq F_{a,p,n-p}") 
		}]

	},{
		id:"transformer",
		open:false,
		name: "Transformations",
		sub: [{
			id: "standardizae",
			open: false,
			name: "Standardization",
			cnt: "Consider the model"
				+ equation("\\boldsymbol y^s = \\boldsymbol Z\\boldsymbol\\beta^s + \\boldsymbol\\varepsilon")
				+ "where" + align("", ["z_{ij} = (X_{ij} - \\bar{X}_j)/S_j &S_j =\\frac{1}{n+1}\\sum_{i=1}^n\
										(X_{ij}-\\bar{X}_j)^2", "y_i^s = (y_i - \\bar{y})/S_y &S_y = \\frac{1}{n+1}\\sum_{i=1}^n\
										(y_i - \\bar{y})^2"]) +
				"This model has no intercept."
		},{
			id:"scalling",
			open: false,
			name: "Unit Length Scaling",
			cnt:"Consider the model"
				+ equation("\\boldsymbol y^u = \\boldsymbol W\\boldsymbol\\beta^u + \\boldsymbol\\varepsilon")
				+ "where" + align("", ["w_{ij} = (X_{ij} - \\bar{X}_j)/\\sqrt{S_{jj}} &S_{jj} =\\sum_{i=1}^n\
										(X_{ij}-\\bar{X}_j)^2", "y_i^u = (y_i - \\bar{y})/+"+ss_("T")])
				+ "This model has no intercept and each $\\widetilde{w}_{j}$ has unit length for each $j$.",
			sub:[{
					id: "multicol",
					open: false,
					name:"Multicollinearity",
					cnt: "If there is a almost linear dependence between two different preditors, then they are evil!\
						They curse $" + utilModel.xtx +"$, making it almost singular.",
					casse: "If $" + utilModel.xtx +"$ is diagonal, then the predictors are orthogonal, the variance of \
							$\\hat{\\beta}_j$ depends on only one value of the $j$th predictor. But if $" 
							+ utilModel.xtx +"$ is not diagonal then h&eacute;las, the diagonal of $" + utilModel.xtx 
							+"$depends on everything!",
					method: "To detect the malice of multicollinearity, one can measure the variance inflation factor ($VIF$)\
							using the $R_j^2$ quantity obtained after regressing $\\widetilde{\\boldsymbol x}_j$ on the other\
							predictors."+equation("VIF_j = [(\\boldsymbol W^\\top \\boldsymbol W)^{-1}]_{jj}= (1-R_j^2)^{-1}")
				}]
		}]
	}]
}

/////// dispalyer

function createObj(str, type){
	var ele = document.createElement(type);
	ele.innerHTML = str;
	return ele;
}

function section(name, level){
	var num = level.split(".").length;
	console.log(level, num);
	var type = "h2";
	if (num > 2){
		type = "h4";
	}else if (num > 1){
		type = "h3";
	}
	return createObj("<span class=\"numSection\">"+level+"</span> "+name, type);
}

function resetOpen(dic){
	for (var key in dic){
		if (key == "open"){
			dic.open = false;
		}
		if (key == "sub"){
			for (var i=0; i<dic.sub.length; i++){
				resetOpen(dic[key][i]);
			}
		}
	}
}

function recDisplay(model, id_, contentID){
	var content = document.getElementById(contentID);
	for (var key in model){
		if (key == "id" || key == "open" || key == "name") continue;
		if (key == "sub"){
			for (var i=0; i<model.sub.length; i++){
				var div = document.createElement("div");
				div.id = model.sub[i].id;
				var title = section(model.sub[i].name, id_+(i+1).toString());
				title.id = id_+(i+1).toString()+".";
				title.onclick = function(){
					var ids = this.id.split(".");
					var mold = multipleReg;
					for (var j=0; j<ids.length-1; j++){
						console.log(j);
						mold = mold.sub[parseInt(ids[j])-1];
					}
					var domDiv = document.getElementById(mold.id);
					if (mold.open){
						// while (domDiv.firstChild){
						// 	domDiv.removeChild(domDiv.firstChild);
						// }
						domDiv.className="hidden";
						console.log(mold.open);
						mold.open=false;
					}else{
						if (domDiv.firstChild){
							domDiv.className = "visible";
						}else{
							recDisplay(mold, this.id, mold.id)
							MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
						}
						mold.open=true;
					}
				}
				content.appendChild(title);
	 			content.appendChild(div);
			}
		}else{
			content.appendChild(createObj(model[key], "p"));
		}
	}
}

function display(model){
	recDisplay(model, "", "CONTENT");
}

window.onload = function(){
	display(multipleReg);
	document.getElementById("main").onclick=function(){
		var content = document.getElementById("CONTENT");
		while (content.firstChild) {
			content.removeChild(content.firstChild);
		}
		display(multipleReg);
		resetOpen(multipleReg);
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	}
}