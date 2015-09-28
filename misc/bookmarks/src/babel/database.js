var database = {
	url: "http://sheetsu.com/apis/2d34085f",
	data: [],

	getData: function(callback){
		// var jqxhr = $.ajax(this.url)
		//   .done(function(res) {
		// 	database.data = res['result'];
		// 	console.log(database.data);
		// 	callback();
		//   })
		//   .fail(function() {
		// 	alert( "Can't load database :(" );
		//   });
		this.data = [{"id":"1","name":"Sheetsu","url":"http://sheetsu.com/","description":"Turn your Google sheet into an API, yo~","created_at":"9/27/2015"}];
		callback();

	},

	takeFrom: function(from, limit){
		return this.data.slice(from, limit);
	}
}

var BookmarkBox = React.createClass({
  render: function() {
	return (
		<div className="bookmarkBox">
			<a href={this.props.data.url} target="_blank">
				<div className="bookmark-title">{this.props.data.name}</div>
			</a>
			<div>{this.props.data.created_at}</div>
	     	<p>{this.props.data.description}</p>
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
			<BookmarkBox data={data[0]} />,
			document.getElementById('bookmark-display')
		);
		this.page ++;
		if (!data[0]){
			return false;
		}
		return true;
	}
}

$(function(){
	database.getData(function(){
		controller.renderNext();
	});
}());