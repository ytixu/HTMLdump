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
				id: "tests",
				open: false,
				name:"Testing",
				sub:[{
					id: "multipleRegttest",
					open: false,
					name:"Single Hypothesis Testing",
					hypothesis: "We are insterested in testing the importance of each coefficient." 
								+ tests.tTest.hypo + tests.tTest.j,
					ttest:"Use t-statistic"+equation(tests.tTest.stat
							+"=\\frac{\\hat{\\beta}_j}{\\sqrt{\\sigma^2V_{jj}}}")
							+"where $V_{jj}$ is the $j$th diagonal element of $V="+utilModel.xtx+"$.",
					assymptotic: "If $"+utilModel.assumeNormalError+"$, then "+tests.tTest.ass+"."
				},{
					id: "multipleRegresidual",
					open:false,
					name: "Reidual plots",
					test: "The residual plots ($p$ of them), i.e.:"+equation(utilModel.residual)+"v.s. $\\hat{y}_i$ or $\\boldsymbol x_{i}$\
							for each $j \\in \\{1,...,p\\}$, should be patternless as"
							+ equation("\\boldsymbol e^\\top \\widetilde{\\boldsymbol x}_j = \\sum_{i=1}^ne_ix_{ij} = 0")
				},{
					id: "multipleRegftest",
					open: false,
					name: "Simultaneous Hypothesis Testing",
					hypothesis: "We are insterested in testing the importance of each coefficient." 
								+ tests.ftest.hypo,
					test: "Use the (ANOVA) sum of squares decomposition" + equation(tests.ftest.sumDecomp)+
							"and define the statistic"+equation(tests.ftest.stat + "=\\frac{"
							+ms_("R")+"}{"+ms_("RES")+"}"),
					assymptotic: "If $"+utilModel.assumeNormalOutCome+"$, then "+tests.ftest.ass+".",
					anova: "<center><table><caption>ANOVA table</caption>\
							<tr><td class=\"title\">Source</td><td class=\"title\">$SS$</td>\
									<td class=\"title\">df</td><td class=\"title\">$MS$</td><td class=\"title\">$F$</td></tr>\
							<tr><td class=\"title\">Regression</td><td>$"+ss_("R")+"$</td><td>$k$</td><td>$"+ss_("R")
									+"/k$</td><td>$"+ms_("R")+"/"+ms_("RES")+"$</td><tr>\
							<tr><td class=\"title\">Residual</td><td>$"+ss_("RES")+"$</td><td>$n-k-1$</td><td>$"+ss_("RES")
									+"/(n-k-1)$</td><td></td><tr>\
							<tr><td class=\"title\">Total</td><td>$"+ss_("T")+"$</td><td>$n-1$</td><td></td><td></td><tr>\
							</table></center>"
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
		id: "genlinmod",
		open:false,
		name: "General Linear Hypothesis",

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