function equation(str){
	return "\\begin{equation*}"+str+"\\end{equation*}"
}

function align(head, strs){
	return"\\begin{align*}" + head + "&"+strs.join("\\\\&")+"\\end{align*}"
}

function array(ele, dem){
	var rows = []
	var col = 0;
	for (var i=0; i<ele.length; i++){
		rows.push(ele[i].join("&"));
		if (col == 0){
			col = ele[i].length;
		}else if (col != ele[i].length){
			return null // bad input
		}
	}
	return "\\left"+dem.charAt(0)+"\\begin{array}{"+Array(col+1).join("c")+"}"+
			rows.join("\\\\")+"\\end{array} \\right"+dem.charAt(1);
}

function enumerate(variable, max){
	return variable+"_1, \\dots," + variable+"_"+max;
}

var utilModel ={
	// contruct model
	model: function(xs, factors, beta_0){
		var predictors = []
		if (beta_0){
			predictors.push("\\beta_0");
		}
		for (var i=0; i<xs.length; i++){
			//TODO: factors
			predictors.push("\\beta_" + xs[i].toString() + "X_{i" + xs[i].toString() + "}");
		}
		predictors.push("\\varepsilon_i");
		return "Y_i=" + predictors.join("+");
	},
	expectedOutcome: "\\mathbb{E}_{Y_i|\\boldsymbol X_i}[Y_i|\\boldsymbol X_i]\
				 = \\boldsymbol X_i\\boldsymbol\\beta",
	varAssumed: function(variable){
		return "\\mathbb{V}_{\\boldsymbol "+variable+"|\\boldsymbol X}[\\boldsymbol "
				+variable+"|\\boldsymbol X]=\\sigma^2\\mathbb{I}_n";
	},
	expectedError: "\\mathbb{E}_{\\boldsymbol\\varepsilon|\\boldsymbol X}\
				[\\boldsymbol\\varepsilon|\\boldsymbol X] = 0_n",
	assumeModel: "\\boldsymbol y = \\boldsymbol X\\boldsymbol\\beta + \\boldsymbol\\varepsilon",
	assumeNormalError: "\\boldsymbol\\varepsilon|\\boldsymbol X \\sim \\mathcal{N}(0_n,\\sigma^2\\mathbb{I}_n)",
	assumeNormalOutCome: "\\boldsymbol Y|\\boldsymbol X \\sim \\mathcal{N}(\\boldsymbol X\\boldsymbol\\beta,\\sigma^2\\mathbb{I}_n)",
	xtx: "\\boldsymbol X^\\top \\boldsymbol X",
	normalEqu: "(\\boldsymbol X^\\top \\boldsymbol X)\\hat{\\boldsymbol\\beta} = \\boldsymbol X^\\top \\boldsymbol Y",
	betaEstimate: "\\hat{\\boldsymbol\\beta} = (\\boldsymbol X^\\top \\boldsymbol X)^{-1}\\boldsymbol X^\\top \\boldsymbol Y",
	varEstimate: function(p){
		return "\\sigma^2 = \\frac{1}{n-"+p+"}\\sum_{i=1}^n(y_i-\\hat{y}_i)^2"
	},
	expectedBeta: "\\mathbb{E}_{\\boldsymbol Y|\\boldsymbol X}[\\hat{\\boldsymbol\\beta}|\\boldsymbol X] = \\beta",
	varBeta: "\\mathbb{V}_{\\boldsymbol Y|\\boldsymbol X}[\\hat{\\boldsymbol\\beta}|\\boldsymbol X]\
			 = \\sigma^2(\\boldsymbol X^\\top \\boldsymbol X)^{-1}",
	residual: "e_i = y_i - \\hat{y}_i = y_i-\\boldsymbol x_i\\hat{\\boldsymbol\\beta}",
	ras: "R_{\\text{adj}}^2"
}
var ss_ = function(str, para){
			if (para != null){
				return "SS_{\\text{"+str+"}}("+para+")";
			}
			return "SS_{\\text{"+str+"}}";
}
var ms_ = function(str, para){
	if (para != null){
		return "MS_{\\text{"+str+"}}("+para+")";
	}
	return "MS_{\\text{"+str+"}}";
}

var ssmBar = function(num, betas, c, r, bar){
	var numerator = [];
	for (var i = 0; i<num.length; i++){
		numerator.push("\\beta_"+num[i].toString());
	}
	var denom = [];
	for (var i = 0; i<betas.length; i++){
		denom.push("\\beta_"+betas[i].toString());
	}
	if (denom.length > 0){
		return bar+"{"+c+"S}_{\\text{"+r+"}}("+numerator.join(",")+"|"+denom.join(",")+")";
	}else{
		return bar+"{"+c+"S}_{\\text{"+r+"}}("+numerator.join(",")+")";
	}
}

var tests = {
	tTest:{
		j: "for any $j\\in \\{0,1,\\dots,k\\}$",
		hypo: "<center>$H_0$: $\\beta_j = 0$<br>\
				$H_1$: $\\beta_j \\neq 0$</center>",
		stat:"t_j = \\frac{\\hat{\\beta}_j}{e.s.e.(\\hat{\\beta}_j)}",
		ass:"under $H_0$, $T_j \\sim \\mbox{Student}(n-p)$"
	},
	ftest:{
		sumDecomp: [ss_("T"), [ss_("RES"), ss_("R")].join("+")].join("="),

		// get SS_R bar
		ssrBar : function(num, betas){
			return ssmBar(num, betas, "S", "R", "\\overline");
		},

		// get MS_RES
		msBar : function(num, betas){
			return ssmBar(num, betas, "M", "R", "\\overline");
		},

		msRes : function(betas){
			return ssmBar(betas, [], "M", "RES", "");
		},
		ssRes : function(betas){
			return ssmBar(betas, [], "S", "RES", "");
		},
		hypo: "<center>$H_0$: $\\beta_1 = \\beta_2 = \\dots = \\beta_k = 0$<br>\
				$H_1$: $\\beta_j \\neq 0$ for at least one $j$</center>",
		stat: "F = \\frac{"+ss_("R")+"/(p-1)}{"+ss_("RES")+"/(n-p)}",
		// get F value
		Ftest : function(num, betas, all){
			return "\\frac{"+this.ssrBar(num, betas)+"}{"+this.msRes(all)+"}";
		},
		ass: function(para){
			if (para == null){
				para = "k";
			}
			return "under $H_0$, $F \\sim \\mbox{Fisher}("+para+",n-p)$";
		}
	}

}

