function padListItems(){
	$childs = $('#side-menu li');
	$('#side-menu li').each(function(i, e){
		if(i%2 == 1)
			$(e).css({'text-align': 'right'});
	});
}

$(function(){
	// padListItems();
}());