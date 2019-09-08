$(document).ready(function(){

	// propegate cards
	$.getJSON( "/static/json/blogs.json", function( data ) {
		var blogs = []
		

		$.each(data, function( i, obj ) {
			if(obj["url"] === window.location.href.substr(window.location.href.lastIndexOf('/') + 1)) {

				$(".blog-title").text(obj["name"])
				$(".blog-description").text(obj["tag"])
			}

			b = "<div class='mb-2 mt-4'>" +
				"<div class='row justify-content-center'>" + 
				"<div class='col-12'>" +
				"<div class='row'><i>" + obj["date"] + "</i></div>" +
				"<div class='row'><h2 class='mb-0'><a class='text-dark' href='" + obj["url"] + "'>" + obj["name"] + "</a></h2></div>" +
				"<div class='row'>" + obj["tag"] + "</div>" +
				"</div></div></div><hr class='m-0'>"
			blogs.push(b)
		})
		blogs.forEach(function(blogs) {
			$(".blog-list").append(blogs)
		})
	})
})