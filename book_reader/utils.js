function load_book(title){
	var div = document.getElementById('book');
	console.log(div);
	if (div.innerHTML != ''){
		var script = document.getElementById('book_title');
		console.log(script.src);
		if (script.src.indexOf('books/'+title+'.js') > -1) return;
		script.parentElement.removeChild(script);
	}
	load_script(title, function(){
		console.log('loaded');
	});
}

function load_script(title, callback){
	var src = 'books/'+title+'.js';
	var script = document.createElement('script');
	script.id = 'book_title';
	console.log(script, src);
	script.src = src;
	document.body.appendChild(script);
    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            callback();
        };
    }
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
			link.setAttribute('href', '#'+books.get_text(key)+'chap'+chap);
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

// save to file

// function save(iframe){
// 	var paws;
// 	if ( iframe.contentWindow.document.getElementsByTagName('body').innerHTML ) {
// 		console.log(iframe.contentDocument.getElementsByTagName('body').innerHTML);
// 		paws = iframe.contentWindow.document.getElementsByTagName('img');

// 	}

    // var fs = require('fs');
    // var stream = fs.createWriteStream("my_file.txt");
    // stream.once('open', function(fd) {
    //     stream.write("My first row\n");
    //     stream.write("My second row\n");
    //     stream.end();
    // });
// }