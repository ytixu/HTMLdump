function load_book(title){
	var src = 'books/'+title
	var iframe = document.getElementById('book')
	// console.log(iframe.src.indexOf(src));
	if (iframe.src.indexOf(src) ==-1) iframe.src = src;
};

function init(){
	shelf = document.getElementById('shelf');
	// console.log(books);
	var ind = 0;
	for(var key in books.get_books()){
		var row = shelf.insertRow(ind);
		var cell = row.insertCell(0);
		cell.innerHTML = books.get_title(key);
		cell.setAttribute('class', 'title');
		cell.setAttribute('onclick', 'show('+key+',\"'+books.get_text(key)+'\")');
		ind += 1
		var row = shelf.insertRow(ind);
		var cell = row.insertCell(0);
		cell.setAttribute('class', key);
		cell.setAttribute('id', 'chapter');
		for (var chap in books.get_chapters(key)){
			link = document.createElement('a');
			link.innerHTML = books.get_chapter(key, chap);
			link.setAttribute('href', 'javascript:parent.gotoAnchor("#chap'+chap+'","'+books.get_text(key)+'")');
			cell.appendChild(link);
			cell.innerHTML += '</br>';
		}
		ind += 1;
	}
};

document.onload = init();

function show(key, file){
	var chapters = document.getElementsByClassName(key);
	for (var i=0; i<chapters.length; i++){
		// console.log(chapters[i].style.display);
		if (chapters[i].style.display == 'inline'){
			chapters[i].style.display = 'none';
		}else{
			chapters[i].style.display = 'inline';
		}
	}
	load_book(file);
}

function gotoAnchor(aname, fName){
	var yScroll = document.body.scrollTop;
	var xScroll = document.body.scrollLeft;
	document.getElementById('book').src="books/" +fName+ aname;
	self.scrollTo(xScroll, yScroll);
}

