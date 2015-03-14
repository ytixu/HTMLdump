var posts = [{name:"Spinner", url:6, date:"Mar 7, 2015 "}, 
	  	{name:"Air Dancer", url:5, date:"Feb 27, 2015 "}, 
	  	{name:"Drawing Flowers", url:4, date:"Feb 8, 2015"},
	  	{name:"Match-Three Game", url:3, date:"Jan 21, 2015"},
	 	{name:"Match-Three Puzzle", url:2, date:"Jan 17, 2015"},
		{name:"Tic-Tac-Toe", url:1, date:"Jan 4, 2015"},
	  	{}
	 ];

var LENGTH = 0;

function getPost(){
	LENGTH = posts[0].url;
	return posts;
}