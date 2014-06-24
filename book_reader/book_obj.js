var books = {
	_books: null,
	book_num: null,

	init: function(){
		this._books = new Array();
		this.book_num = 0;
	},

	add: function(title, chapters, text){

		this._books.push({ title : title,
						   text : text,
						   chapters : new Array() });
		for (var i in chapters){
			this._books[this.book_num].chapters.push(chapters[i]);
		}
		this.book_num ++;
	}, 

	get_books: function(){
		return this._books;
	},

	get_book: function(ind){
		return this._books[ind];
	},

	get_title: function(ind){
		return this._books[ind].title;
	},

	get_chapters: function(ind){
		return this._books[ind].chapters;
	},

	get_chapter: function(ind, indd){
		return this._books[ind].chapters[indd];
	},

	get_text: function(ind){
		return this._books[ind].text
	}
};

books.init();