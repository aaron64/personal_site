$(document).ready(function(){

	// propegate cards
	$.getJSON( "/static/json/projects.json", function( data ) {
		var projects = []
		$.each(data, function( i, obj ) {
			p = "<div class='card'>" + 
				"<div class='card-body'>" + 
				"<div class='row'>" +
				"<h5 class='mb-0'><a class='text-dark' href='" + obj["url"] + "'>" + obj["name"] + "</a></h5></div>" +
				"<div class='row'>" + obj["tag"] + "</div>" +
				"</div></div><hr class='m-0'>"
			projects.push({"obj":p})
		})
		projects.forEach(function(projects) {
			$(".project-list").append(projects["obj"])
		})
	})

	$(".expandable").click(function(){
		$('.modal-body').empty().append($(this).clone().width("300%"))
		$(".modal").modal('toggle')
	})
})