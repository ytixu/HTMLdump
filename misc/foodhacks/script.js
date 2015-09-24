var recipes = [
	{
		name:"Egg Crater",
		desc:"Fried egg mixed with anything you link in an onion ring.",
		img:"egg-crater.jpg",
		ing:["egg", "onion", "stuffs you like", "salt", "soya sauce", "oil"],
		algo: ["Select the stuffs you like that you want to have in your egg crater. Or use the default options: green onion, galic, shrimp skin.",
				"Mix all the selected stuffs you like and eggs in a bowl.",
				"Cut the onions into rings that are 1.618 cm height. Make sure that at least one side is cut evenly.",
				"Repete until no more ingredient"+
				"<ol><li>Pur some oil into pan.</li>"+
				"<li>Put an onion ring into pan (the even side down).</li>"+
				"<li>Fill onion ring with mix until it is 61.8% full.</li>"+
				"<li>Fry until cooked.</li></ol>"]
	},
	{
		name:"Midnight Eyes",
		desc:"Stuffed rice ball topped with tomato sauce, red like coders' eyes in a marathon against bed time.",
		img:"midtnight-eyes.jpg",
		ing:["1 tomato", "green onion", "rice", "stuff to stuff", "salt"],
		algo: ["Import whatever you want to stuff (e.g.: eggs and green peas.",
			   "Cook the rice.",
			   "Cook the tomato and green onion to make the sauce.",
			   "Define sub routine to shape the rice ball <ol><li>Take a plastic rapper. </li>"
			    +"<li>Start with a thin layer of rice. </li>"
			    +"<li>Add a layer of stuff. </li>"
			    +"<li>Add another layer of rice. </li>"
			    +"<li>Squeeze everything like when you make a snowball but with a plastic rapper.</li></ol>",
			   "Add tomato sauce."]
	},
	{
		name: "Trottier++",
		desc: "Tomato and green pepper sauce sprinkled with cheese, a lot better than the pasta at Trottier's cafeteria.",
		img: "trottier-p-p-pasta.jpg",
		ing: ["4 plum tomatoes", "1/2 green pepper", "salt", "oil", "pasta",
			  "romaine lettuce (or any other is fine)", "shredded cheese"],
		algo: ["Create two threads, one boils the pasta and the other one cooks the sauce.",
			   "On the thread cooking the sauce, input oil in cooking pot, wait until oil becomes hot, slice pepper and tomato into pot like a ninja.",
			   "Create a third thread that cut the lettuce and put them aesthetically on the output plate.",
			   "On no move lettuce to cut, close lettuce cutting thread.",
			   "On tomato becomes mushy, close cooking thread.",
			   "On pasta becomes mushy, you probably overboild the pasta. :o",
			   "On pasta becomes soft, close boiling thread and move pasta and tomato sauce onto output place.",
			   "Add a sprinkle of cheese.",
			   "Insert output plate into microwave and set for the time it takes for the cheese to melt.",
			   "Now you remember you forgot to add salt..."],
		slug: "trottier-p-p"
	},
	{
		name: "Meat Da Salad",
		desc: "Fried meat, peas and corn on salad and rice.",
		img: "meat-the-salad.jpg",
		ing: ["green peas","corn","ground meat","rice","lettuce","oil","salt"],
		algo: ["Install package cooked-rice.",
			   "Input meat into cooking pan. Cook until cooked.",
			   "Add peas, corn and salt to cooking pan. Cook until all cooked.",
			   "Cut the lettuce and put them aesthetically on the output plate.",
			   "Import cooked rice in the output plate.",
			   "Move peas, corn and meat to the output plate."],
		slug: "meat-da-salad"
	},
	{
		name: "Coin For Your Stomach",
		desc: "Cookies - round and smooth like coins - with cereal, yogurt and chocolate sauce.",
		img: "coin-for-your-stomach.jpg",
		ing: ["chocolate sauce", "cookies", "cereal", "yogurt"],
		algo: ["Insert the ingredients to a stack in the listed order.", "Pop the stack into a bowl until it's empty."],
		slug: "coin-for-your-stomach"
	},
	{
		name: "Hello World",
		desc: "Cheese and blackberry on bagel with jelly and chocolate sauce. First food hack :3",
		img: "helloworld.jpg",
		ing: ["bagel", "La vache qui Rit cheese", "blackberry", "jam", "chocolate sause"],
		algo: ["Try split the bagel in half; catch fail to split by hand exception; cut the bagel in half.",
			   "Spread jam.",
			   "Cut the cheese in half. Top each bagel halves with cheese with blackberry",
			   "Add chocolate sauce."],
		slug: "hello-world"
	}

];

var aboutPage = {
	desc: "<b>foodXhack</b> is the cross product of food and hacking. We inspire and encourage creative food lovers to design cooking algorithms and to push culinary art beyond its boundaries.",
};

var sharePage = {
	desc: "Have awesome food hacks that you want to share with the world? Get ready because soon we'll add the POST method that enable you to add your own recipe, eventually...",
};