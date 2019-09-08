$(document).ready(function(){

	// propegate cards
	$.getJSON( "/static/json/projects.json", function( data ) {
		var projects = []
		

		$.each(data, function( i, obj ) {
			bg = ""
			if(obj["url"] === window.location.href.substr(window.location.href.lastIndexOf('/') + 1)) {
				bg = "bg-secondary"

				$(".project-title").text(obj["name"])
				$(".project-description").text(obj["tag"])
			}
			p = "<div class='card" + bg + "'>" + 
				"<div class='card-body pt-1 pb-1'>" + 
				"<div class='row'>" +
				"<h6 class='mb-0'><a class='text-dark' href='" + obj["url"] + "'>" + obj["name"] + "</a></h6></div>" +
				"<div class='row'>" + obj["tag"] + "</div>" +
				"</div></div><hr class='m-0'>"
			projects.push(p)
		})
		projects.forEach(function(projects) {
			$(".project-list").append(projects)
		})
	})
})