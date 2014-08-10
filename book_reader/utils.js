var KEY = 0;

var IMAGE = ['paw_b.gif', 'paw_bl.png', 'paw_pu.png', 'paw_pi.png', 'paw_g.png', 'paw_o.png'];
var COLOR = 0;

var pawn = {
        lst: [],
        ind: 0,
        add_pawn: function(p_text, k){
		p = [parseInt(p_text[0].replace('px', '')), parseInt(p_text[1].replace('px', ''))]
		for (var i=0; i<this.lst.length; i++){
			if (this.lst[i].key == k){
				if (p[1] > this.lst[i].coord[1]){
					this.lst[i].coord = p;
				}
				console.log('~~~~~~~~~~~~~~~~~~~~~', this.lst);
				return;
			}
		}
                this.lst.push({key:k, coord:p});
		console.log('~~~~~~~~~~~~~~~~~~~~~', this.lst);
        },
	remove: function(key){
		for (var i=0; i<this.lst.length; i++){
			if (this.lst[i].key == key){
				this.lst.splice(i, 1);
			}
		}
	},
        reset: function(){
                this.lst = [];
                this.ind = 0;
        },
        next: function(){
		key = this.lst.length - this.ind - 1
		try{
                	coord = this.lst[key].coord;
		}catch(err){
			return 0;
		}
                this.ind = (this.ind+1)%this.lst.length;
                return [key, coord];
        }
};

function load_book(title){
	var div = document.getElementById('book');
	// console.log(div);
	if (div.innerHTML != ''){
		var script = document.getElementById('book_title');
		// console.log(script.src);
		if (script.src.indexOf('books/dist/'+title+'.js') > -1) return;
		script.parentElement.removeChild(script);
	}
	load_script(title, function(){
		console.log('loaded');
	});
};

function load_script(title, callback){
	pawn.reset();
	var src = 'books/dist/'+title+'.js';
	var script = document.createElement('script');
	script.id = 'book_title';
	// console.log(script, src);
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
		cell.setAttribute('onclick', 'show('+key+')');
		ind += 1
		var row = shelf.insertRow(ind);
		var cell = row.insertCell(0);
		cell.setAttribute('class', key);
		cell.setAttribute('id', 'chapter');
		for (var chap in books.get_chapters(key)){
			link = document.createElement('a');
			link.innerHTML = books.get_chapter(key, chap);
			link.setAttribute('onclick', 'show_chapter(books.get_file('+key+', '+chap+'))');
			cell.appendChild(link);
			cell.innerHTML += '</br>';
		}
		ind += 1;
	}
};

document.onload = init();

function check_different(title){
	try{
		var script = document.getElementById('book_title');
		if (script.src.indexOf('books/dist/'+title+'.js') > -1) return false;
		return true
	}catch(err){}
	return true;
}

function show(key){
	var chapters = document.getElementsByClassName(key);
	for (var i=0; i<chapters.length; i++){
		// console.log(chapters[i].style.display);
		if (chapters[i].style.display == 'inline'){
			chapters[i].style.display = 'none';
		}else{
			chapters[i].style.display = 'inline';
		}
	}
}
function show_chapter(file){
	var different = check_different(file);
	if (different)
		save_n_remove();
	load_book(file);
	if (different)
		load_paws();
};

function scrollToNext(){
	paw = pawn.next();
	console.log(paw);
	if (paw == 0) return;
	key = paw[0]
	coords = paw[1]
	console.log('oooooooooooooooo', coords);
	window.scrollTo(coords[1], coords[0]);
	hover_paw(key, 0.2, 20);
	setInterval(function(){hover_paw(key, 0.4, 40)},1000);
};

function get_book_name(){
	var script = document.getElementById('book_title');
	if (script == null) return '';
	var names = script.src.split("/");
	return names.pop().replace(".js", "");
};

function hover_paw(key, op, op_s){
	// console.log('ho', key, op, op_s);
	var paws = document.getElementsByClassName("bookmark" + key.toString());
	for(var i=0; i<paws.length; i++) {
		paws[i].style.opacity = op;
		paws[i].style.filter = "alpha(opacity="+op_s+")"; /* For IE8 and earlier */
	}
};


function unstick_paw(key){
	console.log('re', key);
	pawn.remove(key);
	var paws = document.getElementsByClassName("bookmark" + key.toString());
	for(var i=paws.length-1; i>-1; i--) {
		document.body.removeChild(paws[i]);
	}
	save();
};

function stick_paw(y, x, angle, key, img){
	pawn.add_pawn([y,x], key);
	image = document.createElement('img');
	console.log('~~~~~~~~~~~~~~~~', img);
    image.src = img;
    image.style.webkitTransform = angle; /* Opera, Chrome, and Safari */
	image.style.position="absolute";
    image.style.top = y;
    image.style.left = x;
    image.style.opacity = .4;
    image.style.filter = "alpha(opacity=40)"; /* For IE8 and earlier */
    image.width = '25';
    image.height = '25';
    image.setAttribute('class', 'bookmark'+key.toString());
    image.onmouseover = function() { hover_paw(key, 0.2, "20"); };
    // image.setAttribute('onmouseover', 'hover_paw('+key+', 0.2, "20");' );
    image.onmouseout = function() { hover_paw(key, 0.4, '40'); };
    image.setAttribute('onDblClick', 'unstick_paw('+key+');' );
    document.body.appendChild(image);
    console.log('on', image.onmouseover);
};

function save(){
	name = get_book_name();
	if (name == '') return false;
	data = [];
	var book_num = KEY;
 	for (var i=0; i < KEY; i++){
		var paws = document.getElementsByClassName("bookmark" + i.toString());
		if (paws.length == 0){
			book_num --;
			continue;
		} 
		p = [];
		for(var j=0; j<paws.length; j++) {
			p.push([
				paws[j].style.top,
				paws[j].style.left,
				paws[j].style.webkitTransform, 
				paws[j].src
			].join('&'));
			console.log(p[j]);
		}
		data.push(p.join('&&'));
	}
	// save 
	console.log(data);
	localStorage.setItem(name,book_num + '<3'+ data.join('&&&'));
	return true;
};

function load_paws(){
	name = get_book_name();
	if (name == '') return;
	var data = localStorage.getItem(name);
	if (data == null || data == '') return;
	// console.log(data.split('&&&'));
	var data_lst = data.split('<3');
	KEY = parseInt(data_lst[0]);
	if (data_lst[1] == '') return;
	var paws_lst = data_lst[1].split('&&&');
	// console.log(paws_lst);
	for (var i=0; i<paws_lst.length; i++){
		var paws = paws_lst[i].split('&&');
		for (var j=0; j<paws.length; j++){
			var paw = paws[j].split('&');
			stick_paw(paw[0], paw[1], paw[2], i, paw[3]);		
		}
	}
};

function remove_paws(){
	for (var i=0; i < KEY; i++){
		var paws = document.getElementsByClassName("bookmark" + i.toString());
		// console.log('length', paws.length);
		for(var j=paws.length-1; j>-1; j--) {
			console.log(paws[j]);
			document.body.removeChild(paws[j]);
		}
	}
	KEY = 0;
};

function save_n_remove(){
	save();
	try{
		remove_paws();
	}catch(err){}
};


function show_info(){
	var info = document.getElementById('info_text');
	if (info.style.display == 'none'){
		info.style.display = 'block';
	}else{
		info.style.display = 'none';

	}
};

function switch_color(){
	COLOR = (COLOR + 1) % 6;
	var file = IMAGE[COLOR];
	if (COLOR == 0) file = 'paw_w.gif';
	var button = document.getElementById('bookmarks');
	button.src = file;
};
