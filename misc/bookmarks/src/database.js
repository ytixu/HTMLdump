"use strict";

var database = {
	url: "http://sheetsu.com/apis/2d34085f",
	data: [],

	getData: function getData(callback) {
		var jqxhr = $.ajax(this.url).done(function (res) {
			database.data = res['result'];
			console.log(database.data);
			callback();
		}).fail(function () {
			alert("Can't load database :(");
		});
		// this.data = [{"id":"1","name":"Sheetsu","url":"http://sheetsu.com/","description":"Turn your Google sheet into an API, yo~","created_at":"9/27/2015","type":"API"},{"id":"2","name":"Webpack","url":"http://bensmithett.com/smarter-css-builds-with-webpack/","description":"Smarter CSS builds with Webpack","created_at":"9/27/2015","type":"tool"},{"id":"3","name":"Flexbox","url":"https://css-tricks.com/snippets/css/a-guide-to-flexbox/","description":"A more efficient way to lay out, align and distribute space among items in a container","created_at":"9/28/2015","type":"CSS"}];
		// callback();
	},

	takeFrom: function takeFrom(from, limit) {
		return this.data.slice(from, limit);
	}
};

var BookmarkBox = React.createClass({
	displayName: "BookmarkBox",

	render: function render() {
		var boxes = [];
		for (var i in this.props.data) {
			boxes.push(React.createElement(
				"a",
				{ href: this.props.data[i].url, target: "_blank", className: "bookmarkBox" },
				React.createElement(
					"div",
					{ className: "bookmark-title" },
					this.props.data[i].name
				),
				React.createElement(
					"div",
					null,
					this.props.data[i].created_at
				),
				React.createElement(
					"p",
					null,
					this.props.data[i].description
				)
			));
		}
		return React.createElement(
			"div",
			{ className: "bookmark-display" },
			boxes
		);
	}
});

var controller = {
	page: 0,
	limit: 10,

	renderNext: function renderNext() {
		var data = database.takeFrom(this.page, this.limit);
		React.render(React.createElement(BookmarkBox, { data: data }), document.getElementById('page-' + this.page));
		this.page++;
		if (!data[0]) {
			return false;
		}
		return true;
	}
};

$((function () {
	database.getData(function () {
		controller.renderNext();
	});
})());