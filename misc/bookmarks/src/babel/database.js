var database = {
	url: "https://sheetsu.com/apis/2d34085f",
	data: [],

	getData: function(callback){
		var jqxhr = $.ajax(this.url)
		  .done(function(res) {
			database.data = res['result'];
			console.log(database.data);
			callback();
		  })
		  .fail(function() {
			alert( "Can't load database :(" );
		  });
		// this.data = [{"id":"1","name":"Sheetsu","url":"http://sheetsu.com/","description":"Turn your Google sheet into an API, yo~","created_at":"9/27/2015","type":"API"},{"id":"2","name":"Webpack","url":"http://bensmithett.com/smarter-css-builds-with-webpack/","description":"Smarter CSS builds with Webpack","created_at":"9/27/2015","type":"tool"},{"id":"3","name":"Flexbox","url":"https://css-tricks.com/snippets/css/a-guide-to-flexbox/","description":"A more efficient way to lay out, align and distribute space among items in a container","created_at":"9/28/2015","type":"CSS"}];
		// callback();

	},

	postData: function(data, callback){
		$.ajax({
           type: "POST",
           url: this.url,
           data: data })
        .done(function(res) {
			callback();
		})
		.fail(function(res) {
			alert( "Can't update database :(" );
		});
	},

	takeFrom: function(from, limit){
		return this.data.slice(from, limit);
	}
}

var BookmarkBox = React.createClass({
  render: function() {
  	var boxes = [];
	for (var i in this.props.data) {
	  boxes.push(
		<a href={this.props.data[i].url} target="_blank" className="bookmarkBox">
			<div className="bookmark-title">{this.props.data[i].name}</div>
			<div>{this.props.data[i].created_at}</div>
	     	<p>{this.props.data[i].description}</p>
	     	<div className="type">{this.props.data[i].type}</div>
		</a>
     	);
	}
	return (
		<div className="bookmark-display">
			{boxes}
		</div>
    );
  }
});

var controller = {
	page: 0,
	limit: 10,

	renderNext: function(){
		var data = database.takeFrom(this.page, this.limit);
		React.render(
			<BookmarkBox data={data}/>,
			document.getElementById('page-'+this.page)
		);
		this.page ++;
		if (!data[0]){
			return false;
		}
		return true;
	}
}

var formComplete = false;

function resetForm(){
    formComplete = false;
	$('#add-bookmark').trigger('reset');
	$('#success-message').fadeOut('fast',function(){
		$('#add-bookmark').fadeIn('fast');
	});
}

$(function(){
	$('.add-form').hide();
	$('#success-message').hide();

	database.getData(function(){
		controller.renderNext();
	});

	$('#addToggle').click(function(event) {
        event.preventDefault();
        $('.add-form').slideToggle('fast', function(){
        	if (formComplete){
        		resetForm();
        	}
        });
    });

	$('#subimitAdd').click(function(event) {
		$(this).attr('disabled','disabled');
		event.preventDefault();
		var data =  $('#add-bookmark').serialize();
		database.postData(data, function(){
			formComplete = true;
			$('#add-bookmark').fadeOut('fast', function(){
				$('#success-message').fadeIn('fast');
			});
		});
	});

	$('#submitAgain').click(function(event){
		$(this).attr('disabled','disabled');
		event.preventDefault();
		resetForm();
	});
}());