var posts = [{name:"Spinner", url:6, date:"03/07/15", subtitle:"", content:"", type:"e"}, 
	  	{name:"Air Dancer", url:5, date:"02/27/15", subtitle:"", content:"", type:"e"}, 
	  	{name:"Drawing Flowers", url:4, date:"02/08/15", subtitle:"", content:""},
	  	{name:"Match-Three Game", url:3, date:"01/21/15", subtitle:"", content:""},
	 	{name:"Match-Three Puzzle", url:2, date:"01/17/15", subtitle:"", content:"", type:"e"},
		{name:"Tic-Tac-Toe", url:1, date:"01/04/15", subtitle:"", content:"", type:"e"} //,
	  	// {}
	 ];

var LENGTH = 0;

function getPost(){
	LENGTH = posts[0].url;
	return posts;
}