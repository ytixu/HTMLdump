
var normalLimiting = function(vars, stat){
	var temp = vars.slice(0,-1).join(', ');
	if (vars.length > 1){
		temp += " and " + vars[vars.length-1] + " are ";
	}else{
		temp = vars[0] + " is ";
	}
	return "When " + temp + "sufficiently large, $\\frac{"+ stat
			+"-E["+ stat+"]}{\\sqrt{V["+ stat+"]}} \\approx \\mathcal{N}(0,1)$.";
}

var hypothesis = {
	shiftTwoIndep: "Given two treatments, we are interested in testing:\
				<center>\
				$H_0$: two treatments are equivalent (in location)<br>\
				$H_1$: two treatments differ (in location)\
				</center> It can be one or two-sided.",
	disperTwoIndep: "Given two treatments, we are interested in testing:\
				<center>\
				$H_0$: two treatments are equivalent (in dispersion)<br>\
				$H_1$: two treatments differ (in dispersion)\
				</center>",
	generalTwoIndep:"Given two treatments, we are interested in testing:\
				<center>\
				$H_0$: two treatments are equivalent<br>\
				$H_1$: two treatments differ\
				</center> It can be one or two-sided.",
	shiftTwoPaired: "Given paired data $(X_i, Y_i)$, we are interested in testing:\
				<center>\
				$H_0$: two treatments are equivalent ($E(X) = E(Y)$)<br>\
				$H_1$: two treatments differ ($E(X) \\neq E(Y))$ \
				</center> It can be one or two-sided.",
	shiftBlocks: "Given blocked data, we are interested in testing:\
				<center>\
				$H_0$: no treatment effect<br>\
				$H_1$: treatment effect does in the same direction for all block$ \
				</center> It can be one or two-sided.",
	multiTreat: "Given many treatments, we are interested in testing:\
				<center>\
				$H_0$: the treatments are equivalent<br>\
				$H_1$: at leat one treatment differ \
				</center> This is only two-sided.",
	multiTreatOrder: "Given many treatments, we are interested in testing:\
				<center>\
				$H_0$: the treatments are equivalent<br>\
				$H_1$: the treatments are ordered \
				</center>",
	balancedBlock: "Given balanced block design with many treatments, we are interested in testing:\
				<center>\
				$H_0$: no difference between the treatments<br>\
				$H_1$: there is a difference between the level of the response variable\
				</center>Note that the alternative is not assumed to be specific, but the difference between\
				the treatments should not be in terms of dispersion, say. This is only two-sided.",
	indepTime: "Given data collected at different points in time, we are interested in testing:\
				<center>\
				$H_0$: no difference between variables at different time<br>\
				$H_1$: there is a trend\
				</center>This is only one-sided.",
	parallelSeries: "Given data collected at different points in time in blocks, we are interested in testing:\
				<center>\
				$H_0$: no trend<br>\
				$H_1$: there is an overall trend\
				</center>This is only one-sided.",
	stochasticIndep: "Given two series of data collected at differnt points in time, we are interested in testing:\
				<center>\
				$H_0$: the two variables are stochastically independent<br>\
				$H_1$: the two variables are stochastically ependent\
				</center>This is only one-sided."
}

var tests = {
	wilcox:{
		open: false,
		name: "Wilcoxon Rank Sum Test",
		hypo: hypothesis.shiftTwoIndep,
		procedure: "Given samples $X_1, ..., X_m$ and $Y_1, ..., Y_n$. Let $N=n+m$.\
					Find the ranks $S_i$ for each $Y_i, \\ i \\in \\{1, .., n\\}$.",
		statistic: "W_s = S_1 + ... + S_n",
		mean: "E[W_s] = \\frac{1}{2}n(N+1)",
		variance: "V[W_s] = \\frac{1}{12}mn(N+1)",
		rejection: "$W_s$ is either too big or too small (depending on $H_1$).",
		distribution: "",
		limiting: normalLimiting(["$m$", "$n$"], 'W_s'),
		ties: "set the mid-ranks to where there are ties. The statistic $W_s^*$ will have the same\
				mean and limiting distribution, but different variance, i.e.:\
				\\begin{equation*}\
					V[W_s^*] = \\frac{mn(N+1)}{12} - \\frac{mn}{12N(N-1)}\\sum_{i=1}^l(d_i^3-d_i)\
				\\end{equation*} and $f$ is the desity of $F$.",
		power: "Wilcoxon Rank Sum statistic tests for shilf. Given a distribution $F$ such that\
				$X_i\\sim F$ and $Y_i+\\Delta\\sim F$, we can find the minimum sample size $m=n$ that achive a power\
				of at least $\\beta$ to reject $H_0$ at level $\\alpha$.\
				\\begin{equation*}m=n\\geq n_W(\\alpha, \\beta) = \\frac{(z_{\\alpha} +\
				 z_{\\beta})^2}{6\\Delta^2\\{f^*(0)\\}^2}\\end{equation*}where\
				\\begin{equation*}f^*(0) = \\int_{-\\infty}^\\infty \\{f(t)\\}^2 dt\\end{equation*}",
		are: "This test can be compared with Student's t-test\\begin{equation*}\
					e_{W_s,T}(F) = 12\\sigma^2 \\{f^*(0)\\}^2\
				\\end{equation*}where $\\sigma^2$ is the variance for associated with $F$.",
		links: ["mannWhitney"]
	},
	mannWhitney:{
		open: false,
		name: "Mann-Whitney-Wilcoxon Test",
		hypo: hypothesis.shiftTwoIndep,
		procedure:"Given samples $X_1, ..., X_m$ and $Y_1, ..., Y_n$. Let $N=n+m$.",
		statistic: "W_{XY} = W_s - \\frac{1}{2}n(n+1) = \\sum_{i=1}^m\\sum_{j=1}^n\\boldsymbol 1(X_i < Y_i)",
		mean: "E[W_s] = \\frac{1}{2}mn",
		variance: "V[W_s] = \\frac{1}{12}mn(N+1)",
		rejection: "$W_s$ is either too big or too small (depending on $H_1$).",
		distribution: "A table for this statistic is available for small $n$ and $m$.",
		limiting: normalLimiting(["$m$", "$n$"], 'W_{XY}'),
		notes: "This is design to make it easier to tabulate the distribution for Wilcoxon rank sum statistic.",
		links: ["wilcox"]
	},
	siegelTukey:{
		open: false,
		name: "Siegel-Tukey Test",
		hypo: hypothesis.disperTwoIndep,
		procedure:"Given samples $X_1, ..., X_m$ and $Y_1, ... Y_n$. Rank the samples as follows\
					<center> smallest, largest, second smallest, second largest, etc. OR<br>\
					largest, smallest, second largest, second smallest, etc.</center>",
		notes: "This test is not used because different the two ranking systems may lead to different conclusions.",
		links: ["ansariBrad", "smirnov"]
	},
	ansariBrad:{
		open: false,
		name: "Ansari-Bradley Test",
		hypo: hypothesis.disperTwoIndep,
		procedure:"Given samples $X_1, ..., X_m$ and $Y_1, ..., Y_n$. Give identical scores for data points that are\
					 \"equaly distant\" from the center of the data.",
		notes: "This is a improvement to Siegel-Tukey test.",
		links: ["siegelTukey", "smirnov"]
	},
	smirnov:{
		open: false,
		name: "Kolmogorov-Smirnov Test",
		hypo: hypothesis.generalTwoIndep,
		procedure: "Given samples $X_1, ..., X_m$ and $Y_1, ..., Y_n$. Compare their empirical CDF.\
					\\begin{align*}\
						&F_m(x) = \\frac{1}{m}\\sum_{i=1}^m(X_i \\leq x)\
						&G_n(y) = \\frac{1}{n}\\sum_{i=1}^n(Y_i \\leq y)\
					\\end{align*}",
		statistic: "D_{m,n}=\\max_{t\\in \\mathbb{R}}(|F_m(t)-G_n(t)|)",
		rejection: "$D_{m,n}$ is either too big.",
		distribution: "The cumulative distribution $P(D_{m,n} \\geq \\frac{a}{n})$ when\
						 $m=n=1,..,20$ and $a = 0, ..., n$ is tabulated. Also, if $m=n$\
						 and $d=\\frac{a}{n}$, then\\begin{equation*}\
						 P(D_{m,n} \\geq d) = \\frac{2}{{2n \\choose n}}\\left\
						 \\{{2n \\choose n-a}-{2n \\choose n-2a}+{2n \\choose n-3a}\\pm ...\\right\\}\
						 \\end{equation*}",
		limiting: "When $min(m,n)\\rightarrow \\infty$, $P\\left(\\sqrt{\\frac{mn}{m+n}}D_{m,n} \\geq t\\right) = K(t)$,\
				   where \\begin{equation*}K(t) = 2\\sum_{k=1}^\\infty (-1)^{k+1}e^{-2k^2t^2}\\end{equation*}",
		links: ["siegelTukey", "ansariBrad"]
	},
	sign:{
		open: false,
		name: "Sign Test",
		hypo: hypothesis.shiftTwoPaired,
		procedure: "Given paired data $X_1, ..., X_N$ and $Y_1, ..., Y_N$. Let $D_i = Y_i - X_i$ for $i=1,...,N$.\
					Observe that under $H_0$, $P(D_i > 0) = P(D_i < 0) = 1/2$.\
					Find the ranks $S_i$ for each $Y_i, \\ i \\in \\{1, .., n\\}$.",
		statistic: "S_N = \\#\\{i|D_i > 0\\}",
		mean: "E[S_N] = \\frac{N}{2}",
		variance: "V[S_N] = \\frac{N}{4}",
		rejection: "$S_N$ is too big or too small (depending on $H_1$).",
		distribution: "As $S_N$ can be expressed as a sum of Bernoulli random variables, $S_N\\sim \\mbox{Bin}(N,1/2)$.",
		limiting: normalLimiting(["$N$"], 'S_N'),
		ties: "we ignore the pairs of data which a difference of zero, i.e.:if there are exactly $N_0$ zeros,\
				\\begin{equation*}S_{N+} \\sim \\mbox{Bin}(N-N_0,1/2)\\end{equation*}.",
		power:"This statistic tests for shilf. Given a distribution $F$ such that\
				$X_i\\sim F$, $Y_i+\\Delta\\sim F$ and $L(z-\\Delta) = P(Y_i -\\Delta- X_i < z-\\Delta)$, we can find the minimum sample size $N$ that achive a power\
				of at least $\\beta$ to reject $H_0$ at level $\\alpha$.\
				\\begin{equation*}\\sqrt{N}\\geq \\frac{\\frac{z_{\\alpha}}{2}\
				+\\sqrt{p(1-p)}z_{\\beta}}{p-\\frac{1}{2}}\\end{equation*}where $p = L(\\Delta)$.",
		are: "This test can be compared with Student's t-test\\begin{equation*}\
					e_{S_N,T} = 4\\tau^2 \\{l(0)\\}^2\
				\\end{equation*}where $l$ is the density of $L$ and $\\tau^2$ is the variance associated with $L$;\
				and with Wilcoxon signed-rank test\\begin{equation*}\
					e_{S_N,V_s} = \\frac{\\{l(0)\\}^2}{3\\{l^*(0)\\}^2}\
				\\end{equation*}where\\begin{equation*}\
					l^*(0) = \\int_{-\\infty}^\\infty \\{l(z)\\}^2 dz\
				\\end{equation*}",
		links: ["wilcoxSign"]
	},
	wilcoxSign:{
		open: false,
		name: "Wilcoxon Signed-Rank Test",
		hypo: hypothesis.shiftTwoPaired,
		procedure: "Given paired data $X_1, ..., X_N$ and $Y_1, ..., Y_N$. Let $D_i = Y_i - X_i$\
					and $Z_i = |D_i|$ for $i=1,...,N$. Rank the $Z_i$'s. With $|D_{(1)}| < ... < |D_{(N)}|$\
					compute\
					\\begin{equation*}\
						I_i = \\begin{cases}\
							1 & \\mbox{if } D_{(i)} > 0\\\\\
							0 & \\mbox{if } D_{(i)} < 0\
						\\end{cases}\\end{equation*}",
		statistic: "V_s = \\sum_{i=1}^NiI_i",
		mean: "E[V_s] = \\frac{N(N+1)}{4}",
		variance: "V[V_s] = \\frac{N(N+1)(2N+1)}{24}",
		dual: ["V_r = \\sum_{i=1}^Ni(1-I_i)", "V_s+V_r = \\frac{1}{2}N(N+1)"],
		rejection: "$V_s$ is too big or too small (depending on $H_1$).",
		distribution: "The cumulative distribution of $V_s$ is tabulated for small $N$.",
		limiting: normalLimiting(["$N$"], 'V_s'),
		ties: "we score the $Z_i$'s with the mid-ranks and discard the ranks for the $Z_i$'s that are equal to zero.\
				 The mean and the variance are both affected.\
			\\begin{align*}\
				&E[V_s^*] = \\frac{N(N+1)}{4} - \\frac{d_0(d_0+1)}{4}\\\\\
				&V[V_s^*] = \\frac{N(N+1)(2N+1)}{24} - \\frac{d_0(d_0+1)(2d_0+1)}{24}\
						 - \\frac{\\sum_{i=1}^ld_i(d_i+1)(d_i-1)}{48}\
			\\end{align*}Furtheremore,\\begin{equation*}\
				V_s+V_r = \\frac{1}{2}N(N+1) - \\frac{1}{2}d_0(d_0+1)\\end{equation*}",
		power:"This statistic tests for shilf. Given a distribution $F$ such that\
				$X_i\\sim F$, $Y_i+\\Delta\\sim F$ and $L(z-\\Delta) = P(Y_i -\\Delta- X_i < z-\\Delta)$, we can find the minimum sample size $N$ that achive a power\
				of at least $\\beta$ to reject $H_0$ at level $\\alpha$.\
				\\begin{equation*}N_{\\text{min}} \\approx \\left(\\frac{z_{\\alpha}\
				+ z_{\\beta}}{\\sqrt{12}\\Delta l^*(0)}\\right)^2\\end{equation*}where\\begin{equation*}\
					l^*(0) = \\int_{-\\infty}^\\infty \\{l(z)\\}^2 dz\
				\\end{equation*} and $l$ is the density of $L$.",
		are: "This test can be compared with Student's t-test\\begin{equation*}\
					e_{S_N,T} = 12\\tau^2 \\{l^*(0)\\}^2\
				\\end{equation*}$\\tau^2$ is the variance associated with $L$;\
				and with Sign test\\begin{equation*}\
					e_{S_N,V_s} = \\frac{\\{l(0)\\}^2}{3\\{l^*(0)\\}^2}\\end{equation*}",
		links: ["sign"]
	},
	wilcoxCombo:{
		open: false,
		name: "\"Wilcoxon Combo\"",
		hypo: hypothesis.shiftBlocks,
		procedure: "Given $b$ blocks with $m_k$ controls and $n_k$ treatments such that\
					$m_k+n_k = N_k$ for $k=1,...,b$, compute the Wilcoxon rank sum statistic for each block.\
					\\begin{equation*}\
						W_{s_k} = \\sum_{i=1}^{n_k}S_{ki}\
					\\end{equation*} where $S_{ki}$ is the rank of the $i$th data in block $k$.\
					Let $c_k = \\frac{1}{N_k+1}$ for $k=1,...,b$.",
		statistic: "W_s^{\\text{combo}} = \\sum_{k=1}^bc_kW_{s_k}",
		mean: "E[W_s^{\\text{combo}}] = \\frac{1}{2}\\sum_{k=1}^bn_k",
		variance: "V[W_s^{\\text{combo}}] = \\sum_{k=1}^b\\frac{n_km_k}{12(N_k+1)}",
		rejection: "$W_s^{\\text{combo}}$ is too big or too small (depending on $H_1$).",
		limiting: "If $b \\rightarrow \\infty$ and $\\max(N_k)$ is bounded, or if $b$ is fixed and\
		 			$\\min(m_k, m_k) \\rightarrow \\infty$, then\
		 			 $\\frac{W_s^{\\text{combo}}-E[W_s^{\\text{combo}}]}{\\sqrt{V[W_s^{\\text{combo}}]}} \\approx \\mathcal{N}(0,1)$.",
		ties: "assign with mid-ranks and we must find the mean and variance by ourselves.\
			\\begin{align*}\
				&E[W_s^{\\text{combo}}]  = \\sum_{k=1}^b\\frac{1}{N_k+1}E[W_{s_k}]\\\\\
				&V[W_s^{\\text{combo}}] = \\sum_{k=1}^b\\left(\\frac{1}{N_k+1}\\right)^2V[W_{s_k}]\
			\\end{align*}",
		links: ["sign", "jonckheere", "chacko"]
	},
	kruskalW:{
		open: false,
		name:"Kruskal-Wallis Test",
		hypo: hypothesis.multiTreat,
		procedure: "Given $s$ treatments and $N=\\sum_{i=1}^sn_i$ data points in total, rank all the data\
					and sum all the rank for each treatment. Let $R_{ij}$ denote the rank of treatment i for the $j$th data point.\
					\\begin{align*}\
						&\\bar{R}_{i\\cdot} = \\frac{1}{n_i}\\sum_{k=1}^{n_i}R_{ik}\\\\\
						&\\bar{R}_{\\cdot\\cdot} = \\frac{1}{N}\\sum_{i=1}^{s}\\sum_{k=1}^{n_i}R_{ik} = \\frac{N+1}{2}\\\\\
						&W_i = n_i\\bar{R}_{i\\cdot}\
					\\end{align*}",
		statistic: "K&=\\frac{12}{N(N+1)}\\sum_{i=1}^{s}n_i\\left(\\bar{R}_{i\\cdot} -\\frac{N+1}{2}\\right)^2\\\\\
				 		&= \\frac{12}{N(N+1)}\\left(\\sum_{i=1}^{s}\\frac{W_i^2}{n_i}\\right)-3(N+1)",
		rejection: "$K$ is too small.",
		distribution: "The cumulative distribution of $K$ is tabulated for 3 groups of sample size at most 5.",
		limiting: "As in the case of $s=2$, it can be shown that $K$ is a quadratic function of Wilcoxon's statistic, $W_2$\
					has normal limiting distribution. It follows by Central Limit Theorem that \
					$K \\approx \\chi^2(s-1)$ when the size $n_1, ..., n_s$ are large." , 
		ties:"we score the data with the mid-ranks.\
			\\begin{equation*}\
				K^* = \\frac{\\frac{12}{N(N+1)}\\sum_{i=1}^s\\frac{W_i^2}{n_i} - 3(N+1)}\
					{1- \\sum_{j=l}^l\\frac{d_j^3-d_j}{N^3-N}}\
			\\end{equation*}\
			</p><p>\
			If $s=2$ and there are a lot of ties, we have\
			\\begin{equation*}\
				\\bar{K}^* = \\frac{n_{\\cdot\\cdot}-1}{n_{\\cdot\\cdot}}\\sum_{k=1}^2\\sum_{i=1}^t\
					\\frac{(n_{ki}-n_{k\\cdot}n_{\\cdot i}/n_{\\cdot\\cdot})^2}{n_{k\\cdot}n_{\\cdot i}/n_{\\cdot\\cdot}}\
			\\end{equation*}</p><p>Furthermore, letting $A_i$ and $B_i$ denote the\
			number of subjects giving a higher score for the first and second treatment respectively,\
			\\begin{align*}\
				&\\bar{R}_{i}^* = A_i\\left(\\frac{m+1}{2}\\right) + B_i\\left(m+\\frac{n+1}{2}\\right)\\\\\
				&\\bar{K}^* = \\frac{N(N-1)}{mn}\\left(\\sum_{i=1}^{s}\\frac{A_i^2}{n_i} - \\frac{m^2}{N}\\right)\
			\\end{align*}</p><p>$K^*$ and $\\bar{K}^*$ all have limiting chi-squared distribution.",
		links: ["jonckheere", "chacko", "friedman"]
	},
	jonckheere:{
		open: false,
		name:"Jonckheere Test",
		hypo: hypothesis.multiTreatOrder,
		notes: "Not on the exam. :p",
		links: ["kruskalW", "chacko", "friedman"]
	},
	chacko:{
		open: false,
		name:"Chacko-Shorack Test",
		hypo: hypothesis.multiTreatOrder,
		notes: "Not on the exam. :p",
		links: ["kruskalW", "jonckheere", "friedman"]
	},
	friedman:{
		open: false,
		name: "Friedman's Test",
		hypo: hypothesis.balancedBlock,
		procedure: "Given balanced design with $n$ blocks and $s$ treatments, rank the data in each block individually.\
					For $R_ij$ denoting the rank of treatment $i$ in block $j$,\
					\\begin{align*}\
						&\\bar{R}_{i\\cdot} = \\frac{1}{n}\\sum_{k=1}^{n_i}R_{ik}\\\\\
						&\\bar{R}_{\\cdot\\cdot} = \\frac{1}{ns}\\sum_{i=1}^{s}\\sum_{k=1}^{n_i}R_{ik} = \\frac{s+1}{2}\
					\\end{align*}",
		statistic: "Q &= \\frac{12n}{s(s+1)}\\sum_{i=1}^s\\left(\\bar{R}_{i\\cdot} - \\frac{s+1}{2}\\right)^2\\\\\
						&= \\frac{12}{ns(s+1)}\\sum_{i=1}^s\\bar{R}_{i\\cdot}^2 - 3n(s+1)",
		rejection: "$Q$ is too small.",
		distribution: "The cumulative distribution of $Q$ is tabulated for $s\\leq 4$ and $n\\leq 8$.",
		limiting: "Assymptotically, $Q\\sim \\chi_{(s-1)}^2$.",
		ties: "we score the data with the mid-ranks.\
			\\begin{align*}\
				Q = \\frac{\\frac{12n}{s(s+1)}\\sum_{i=1}^s\\left(\\bar{R}^*_{i\\cdot} - \\frac{s+1}{2}\\right)^2}\
				{1-\\frac{1}{ns(s^2-1)}\\sum_{j=1}^n\\sum_{i=1}^{l_j}(d_{ij}^3-d_{ij})}\
			\\end{align*} with limiting distribution $\\chi_{(s-1)}^2$.</p><p>In the case when $s=2$,\
			\\begin{align*}\
				Q = \\frac{4}{N}\\left(A-\\frac{N}{2}\\right)\
			\\end{align*}, where $A$ is the number of block where treatment 1 rank first. In this case, the limiting\
			distribution is $\\chi_{(1)}^2$, as $A$ follows binomial distribution.",
		links: ["kruskalW", "jonckheere", "chacko", "cochran", "alignT"]
	},
	cochran:{
		open: false,
		name: "Cochran's Test",
		hypo: hypothesis.balancedBlock,
		procedure: "This is a special case of Friedman's test where there are $s$ treatments and the response\
					variable is dichotomous (response 0 and 1).\
					Observe that there are a lot of tries. Let $L_j$ denote the number of response 1's in block \
					$j$, and $B_i$, the total number of response 1 for treatment $i$.",
		statistic: "Q = \\frac{(s-1)\\{s\\sum_{i=1}^sB_i^2-(\\sum_{i=1}^sB_i)^2\\}}\
							{s\\sum_{j=1}^sL_j-\\sum_{j=1}^sL_j^2}",
		rejection: "$Q$ is too small.",
		limiting: "Assymptotically, $Q\\sim \\chi_{(s-1)}^2$.",
		links: ["friedman", "alignT"]
	},
	mcnemar:{
		open: false,
		name: "McNemar's Test",
		hypo: hypothesis.balancedBlock,
		procedure: "This is a special case of Friedman's and Cochran's tests where there are $2$ treatments and the response\
					variable is dichotomous (response pass and fail).\
					Observe that there are a lot of tries. Let $L_j$ denote the number of response 1's in block \
					$j$, and $B_i$, the total number of response 1 for treatment $i$. The data can be illustrated in a little table.\
					<center><img src=\"http://mvpprograms.com/help/images/McNemarsTable.jpg\"></center>",
		statistic: "Q^* = \\frac{(B_1-B_2)^2}{\\sum_{j=1}^NL_j(2-L_j)}=\\frac{(C-B)^2}{B+C}",
		rejection: "$Q^*$ is too small.",
		limiting: "Assymptotically, $Q\\sim \\chi_{(s-1)}^2$.",
		notes: "As $B\\sim \\mbox{Bin}(k, 1/2)$ where $k=B+C$, the equivalent test would be \
				$P\\left(\\left|B-\\frac{k}{2}\\right| \\geq \\left|b-\\frac{k}{2}\\right|\\right)$. The one-sided test would thus be\
				$P(B\\geq b)$, which is simply the plain old sign test.",
		links: ["sign", "friedman", "alignT"]
	},
	alignT:{
		open: false,
		name: "Aligned Rank Test",
		hypo: hypothesis.balancedBlock,
		procedure: "This test is designed to compare withing blocks. Given balanced design with $s$ treatments\
					and $n$ blocks, substract each response with the mean\
					of the responses in its corresponding block. Rank all the data. Let $\\hat{R}_{ij}$ be the rank of the\
					treatments $i$ at block $j$.\
					\\begin{align*}\
						\\hat{R}_{i\\cdot} = \\frac{1}{n}\\sum_{k=1}^{n}\\hat{R}_{ik}\
					\\end{align*}Let\
					\\begin{align*}\
						\\Lambda = \\frac{s-1}{\\sum_{i=1}^{s}\\sum_{j=1}^{n}\\hat{R}_{ij}^2 - \
							\\frac{1}{s}\\sum_{j=1}^{n}(s\\hat{R}_{\\cdot j})^2}\
					\\end{align*}",
		statistic: "\\hat{Q} = \\Lambda\\left(\\frac{(sn)^3(sn+1)(2sn+1)}{6} - \\frac{1}{4}sn^2(sn+1)^2\\right)",
		rejection: "$Q$ is too small.",
		limiting: "Assymptotically, $Q\\sim \\chi_{(s-1)}^2$.",
		links: ["friedman"]
	},
	spearmanTrend:{
		open: false,
		name: "Spearman' Test (trends)",
		hypo: hypothesis.indepTime,
		procedure:"Given samples $X_1, ..., X_N$ collected at time $t_1, ..., t_N$ respectively. Rank the $X_i$\
					and place them in order of time. Let $R_i$ be the rank of the data point collected at time $t_i$.",
		statistic: "D = \\sum_{i=1}^N(R_i-i)^2 = \\frac{N(N+1)(2N+1)}{3} - 2\\sum_{i=1}^NiR_i",
		mean: "E[D] = \\frac{N^3-N}{6}",
		variance: "V[D] = \\frac{N^2(N+1)^2(N-1)}{36}",
		dual: ["D' = \\sum_{i=1}^NiR_i - \\frac{1}{6}N(N+1)(N+2)"],
		rejection: "$D$ is too small or if $D'$ is too large.",
		distribution: "A table for this statistic is available for small $N\\leq 11$.",
		limiting: normalLimiting(["$N$"], 'D'),
		ties: "assign the data with mid-ranks. Both mean and variance are affected.\
		\\begin{align*}\
			&E[D^*] = \\frac{N^3-N}{6} - \\frac{1}{12}\\sum_{i=1}^l(d_i^3-d_i)\\\\\
			&V[D^*] = \\frac{N^2(N+1)^2(N-1)}{36}\\left(1-\\sum_{i=1}^l\\frac{d_i^3-d_i}{N^3-N}\\right)\
		\\end{align*}",
		links: ["mann", "dPlus","spearmanIndep"]
	},
	mann:{
		open: false,
		name: "Mann' Test",
		hypo: hypothesis.indepTime,
		procedure:"Given samples $X_1, ..., X_N$ collected at time $t_1, ..., t_N$ respectively. Rank the $X_i$\
					and place them in order of time. Let $R_i$ be the rank of the data point collected at time $t_i$, and\
					let \\begin{equation*}\
						U_{ij} = \\begin{cases}\
							1 & \\mbox{if } R_i < R_j\\\\\
							0 & \\mbox{if } R_i > R_j\
						\\end{cases}\\end{equation*}",
		statistic: "B = \\sum_{i\\lt j} U_{ij}",
		mean: "E[B] = \\frac{1}{4}N(N+1)",
		variance: "V[B] = \\frac{1}{72}(2N^3+3N^2-5N)",
		rejection: "$B$ is too large.",
		limiting: normalLimiting(["$N$"], 'B'),
		links: ["spearmanTrend", "bPlus"]
	},
	dPlus:{
		open: false,
		name: "D+ Test",
		hypo: hypothesis.parallelSeries,
		procedure:"Given $s$ blocks of data collected at different time. Do Spearman's test for each block, i.e.:\
					get $D_i$ for $i=1,..., s$.",
		statistic: "D^+ = \\sum_{i=1}^s D_i",
		mean: "E[D^+] = \\sum_{i=1}^s E[D_i] = \\frac{s(N^3-N)}{6}",
		variance: "V[D^+] = \\sum_{i=1}^s V[D_i] = \\frac{sN^2(N+1)^2(N-1)}{36}",
		rejection: "$D^+$ is too small.",
		limiting: normalLimiting(["$N$"], 'D^+'),
		links: ["spearmanTrend", "bPlus"]
	},
	bPlus:{
		open: false,
		name: "B+ Test",
		hypo: hypothesis.parallelSeries,
		procedure:"Given $s$ blocks of data collected at different time. Do Mann's test for each block, i.e.:\
					get $B_i$ for $i=1,..., s$.",
		statistic: "B^+ = \\sum_{i=1}^s B_i",
		mean: "E[B^+] = \\sum_{i=1}^s E[B_i] = \\frac{1}{4}sN(N+1)",
		variance: "V[B^+] = \\sum_{i=1}^s V[B_i] = \\frac{1}{72}s(2N^3+3N^2-5N)",
		rejection: "$B^+$ is too large.",
		limiting: normalLimiting(["$N$"], 'B^+'),
		links: ["mann", "dPlus"]
	},
	spearmanIndep:{
		open: false,
		name: "Spearman's Test (independence)",
		hypo: hypothesis.stochasticIndep,
		procedure:"Given two series of data $X_1,...,X_N$ and $Y_1,...,Y_N$ collected at different time.\
					Get ranks $R_i$ and $S_i$ for each each series, $i=1,...,N$.",
		statistic: "D = \\sum_{i=1}^N (R_i-S_i)^2",
		mean: "E[D] = \\frac{N^3-N}{6}",
		variance: "V[D] = \\frac{N^2(N+1)^2(N-1)}{36}",
		rejection: "$D$ is too small.",
		distribution: "A table for this statistic is available for small $N\\leq 11$.",
		limiting: normalLimiting(["$N$"], 'D'),
		ties: "assign the data with mid-ranks. Both mean and variance are affected.\
		\\begin{align*}\
			&E[D^*] = \\frac{N^3-N}{6} - \\frac{1}{12}\\sum_{i=1}^l(d_i^3-d_i)\\\\\
			&V[D^*] = \\frac{N^2(N+1)^2(N-1)}{36}\\left(1-\\sum_{i=1}^l\\frac{d_i^3-d_i}{N^3-N}\\right)\
		\\end{align*}",
		links: ["mann", "dPlus", "spearmanTrend"]
	},
	kendall:{
		open: false,
		name: "Kendall's Test",
		hypo: hypothesis.stochasticIndep,
		procedure:"Given two series of data $X_1,...,X_N$ and $Y_1,...,Y_N$ collected at different time.\
					Get ranks $R_i$ and $S_i$ for each each series, $i=1,...,N$. Order the $R_i$'s' according to\
					the order of the $S_i$'s. Let \\begin{equation*}\
						U_{ij} = \\begin{cases}\
							1 & \\mbox{if } R_i < R_j\\\\\
							0 & \\mbox{if } R_i > R_j\
						\\end{cases}\\end{equation*}",
		statistic: "B = \\sum_{i\\lt j} U_{ij}",
		mean: "E[B] = \\frac{1}{4}N(N+1)",
		variance: "V[B] = \\frac{1}{72}(2N^3+3N^2-5N)",
		rejection: "$B$ is too large.",
		limiting: normalLimiting(["$N$"], 'B'),
		notes: "$B$ can be interpreted as the number of concordant pairs.",
		links: ["mann", "dPlus", "spearmanTrend"]
	},
	rho:{
		open: false,
		name: "Spearman's Rho",
		hypo: hypothesis.stochasticIndep,
		procedure:"Given two series of data $X_1,...,X_N$ and $Y_1,...,Y_N$ collected at different time.\
					Get Spearman's statistic $D$. ",
		statistic: "&\\rho_N = 1 - \\frac{6D}{N^3-N} &\
					0\\leq \\rho_N \\leq 1",
		mean: "E[\\rho_N] = 1- \\frac{6}{N^3-N}E[D] = 0",
		variance: "V[\\rho_N] = \\frac{1}{N-1}",
		rejection: "$\\rho_N$ is far from 0.",
		limiting: normalLimiting(["$N$"], '\\rho_N'),
		ties: "Get Spearman's statistic $D^*$.",
		links: ["spearmanIndep"]
	},
	tau:{
		open: false,
		name: "Kendall's Tau",
		hypo: hypothesis.stochasticIndep,
		procedure:"Given two series of data $X_1,...,X_N$ and $Y_1,...,Y_N$ collected at different time.\
					Get Kendall's statistic $B$. Let $C$ be the number of discordant pairs.",
		statistic: "&\\tau_N = 2\\frac{B}{{N\\choose 2}}-1 = \\frac{B-C}{{N\\choose 2}} &\
					0\\leq \\tau_N \\leq 1",
		mean: "E[\\tau_N] = \\frac{4}{N(N-1)}E[B] - 1 = 0",
		variance: "V[\\tau_N] = \\frac{2(2N+5)}{9N(N-1)}",
		rejection: "$\\tau_N$ is far from 0.",
		limiting: normalLimiting(["$N$"], '\\tau_N'),
		links: ["kendall"]
	},
	waerden:{
		open: false,
		name: "Waerden's Test",
		hypo: hypothesis.stochasticIndep,
		procedure:"Given two series of data $X_1,...,X_N$ and $Y_1,...,Y_N$ collected at different time.\
					Get ranks $R_i$ and $S_i$ for each each series, $i=1,...,N$. Let $\\Phi$ be the standard normal CDF.",
		statistic: "V_N = \\sum_{i=1}^N\\Phi^{-1}\\left(\\frac{R_i}{N+1}\\right)\\Phi^{-1}\\left(\\frac{S_i}{N+1}\\right)",
		mean: "E[V_N] = 0",
		variance: "V[V_N] = \\frac{1}{N-1}\\left\\{\\sum_{i=1}^N\\Phi^{-1}\\left(\\frac{i}{N+1}\\right)\\right)\\}^2",
		rejection: "$V_N$ is far from 0.",
		limiting: normalLimiting(["$N$"], 'V_N'),
		links: []
	}
}

function toDOM(str, type){
	var obj = document.createElement(type);
	obj.innerHTML = str;
	return obj;
}

function getSectionNumber(ns){
	return '<span class=\'numSection\'>'+ns.join('.')+'</span> ';
}

function anchor(testname){
	var content = document.getElementById("CONTENT");
	while (content.firstChild) {
	    content.removeChild(content.firstChild);
	}
	content.appendChild(getName(tests[testname], null, null));
	content.appendChild(presentTest(tests[testname]));
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}


function createLink(testname){
	var link = toDOM("["+tests[testname].name+"] ", 'a');
	link.onclick = function(){
		anchor(testname);
	}
	return link;
}

function getName(test, ns, type){
	// console.log(test, ns, type);
	if (type == null){
		type == "h3";
	}
	if (ns != null){
		return toDOM(getSectionNumber(ns) + test.name, type);
	}else{
		return toDOM(test.name, 'h3');
	}
}

var presentTest = function(test){
	var div = document.createElement("div");
	div.className ="test";
	div.appendChild(toDOM(test.hypo, 'p'));
	if (test.procedure!=null){
		div.appendChild(toDOM(test.procedure, 'p'));
	}
	if (test.statistic!=null){
		if (test.mean != null){
			div.appendChild(toDOM("The statistic\\begin{align*}"+
								test.statistic+"\\end{align*}has mean and variance\\begin{align*}&"+
								test.mean+"\\\\&"+test.variance+"\\end{align*}under $H_0$.", 
							  'p'));
		}else{
			div.appendChild(toDOM("The test statistic is defined as\\begin{align*}"+
								test.statistic+"\\end{align*}", 'p'))
		}
		if (test.dual != null){
			div.appendChild(toDOM("Dual Statisitc", 'h4'));
			var dualDetail = "";
			if (test.dual.length > 1){
				dualDetail = "such that \\equation{equation*}" + test.dual[1] + "\\end{equation*}";
			}
			div.appendChild(toDOM("The dual statistic is \\begin{equation*}"+ test.dual[0] 
							+ "\\end{equation*}" + dualDetail, 'p'));
		}
		div.appendChild(toDOM("The null hypothesis is rejected if "+test.rejection, 'p'));
		if (test.distribution != null){
			div.appendChild(toDOM("Distribution", 'h4'));
			div.appendChild(toDOM(test.distribution, 'p'));
		}
		div.appendChild(toDOM("Limiting Distribution", 'h4'));
		div.appendChild(toDOM(test.limiting, 'p'));
		if (test.ties != null){
			div.appendChild(toDOM("Encountering Tries", 'h4'));
			div.appendChild(toDOM("When there are ties, "+test.ties, 'p'));
		}
		if (test.power != null){
			div.appendChild(toDOM("Power", 'h4'));
			div.appendChild(toDOM(test.power, 'p'));
		}
		if (test.are != null){
			div.appendChild(toDOM("Pitman's asymptotic relative efficiency", 'h4'));
			div.appendChild(toDOM(test.are, 'p'));
		}
	}
	if (test.notes != null){
		div.appendChild(toDOM("Notes", 'h4'));
		div.appendChild(toDOM(test.notes, 'p'));
	}
	for (var i=0; i<test.links.length; i++){
		div.appendChild(createLink(test.links[i]));
	}

	return div;
		
}

var index = [
	{
		name: "Compare Two Independent Samples",
		sub: ["wilcox", "mannWhitney", "smirnov"]
	},{
		name: "Deal with Paired Data",
		sub: ["sign", "wilcoxSign", "wilcoxCombo"]
	},{
		name: "Compare Several Treatments",
		sub: ["kruskalW", "friedman", "cochran", "mcnemar", "alignT"]
	},
	{
		name: "Test Independence and Trend",
		sub: ["spearmanTrend", "mann", "spearmanIndep", "kendall", "rho", "tau"]
	}
]

function resetOpen(){
	for (var test in tests){
		tests[test].open = false;
	}
}

function getTestBlock(testname, ns){
	var block = document.createElement("div");
	block.appendChild(getName(tests[testname], ns, "a"));
	block.firstChild.className = "title";
	var content = document.createElement("div");
	content.id = testname;
	block.firstChild.onclick = function(){
		var div = document.getElementById(testname);
		if (tests[testname].open){
			while (div.firstChild) {
				div.removeChild(div.firstChild);
			}
			tests[testname].open = false;
		}else{
			div.appendChild(presentTest(tests[testname]));
			tests[testname].open = true;
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
		}
	}
	block.appendChild(content);
	return block;
}

function cheatSheet(){
	var content = document.getElementById("CONTENT");
	for (var i=0; i<index.length; i++){
		content.appendChild(toDOM(getSectionNumber([i+1]) + index[i].name, 'h2'));
		for (var j=0; j<index[i].sub.length; j++){
			content.appendChild(getTestBlock(index[i].sub[j], [i+1,j+1]));
			// content.appendChild(getName(tests[index[i].sub[j]], [i+1,j+1]));
			// content.appendChild(presentTest(tests[index[i].sub[j]]));
		}
	}
}

window.onload = function(){
	cheatSheet();
	document.getElementById("main").onclick=function(){
		var content = document.getElementById("CONTENT");
		while (content.firstChild) {
			content.removeChild(content.firstChild);
		}
		resetOpen();
		cheatSheet();
	}
};
