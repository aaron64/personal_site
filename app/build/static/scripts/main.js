$(document).ready(function(){
	$('body').css('display', 'none');
	$('body').fadeIn(200);

	// Populate Projects dropdown (mobile)
	$.getJSON( "/static/json/projects.json", function( data ) {
		$.each(data, function( i, obj ) {
			$(".projects-dropdown").append("<a class='dropdown-item px-2' href='/projects/" + obj["url"] + "'>" + obj["name"] + "</a>")
		})
	})
})