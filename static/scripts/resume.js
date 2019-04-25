$(document).ready(function(){

	function shuffle(array) {
	  	var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

	  	return array;
	}

	// propegate cards
	$.getJSON( "/static/json/cards.json", function( data ) {
		var cards = []
		$.each(data, function( i, obj ) {
			c = "<div class='card mt-3 mb-3'>" + 
				"<h5 class='card-header text-center text-danger mb-2'>" + obj["name"] + "</h5>" +
				"<div class='card-body'>" + 
				"<div class='row'>" +
				"<div class='col-md-6 text-center'>" +
				"<div><i class='far fa-calendar-alt mr-2'></i>" + obj["time"] + "</div>" +
				"</div><div class='col-md-6 text-center'>" +
				"<div><i class='far fa-user mr-2'></i>" + obj["position"] + "</div>" +
				"</div></div><ul>"
				$.each(obj["bullets"], function( i, b ){
					c += "<li>" + b + "</li>"
				})
				c += "</ul></div></div>"
			cards.push({"obj":c, "type":obj["type"]})
		})
		cards.forEach(function(card) {
			$(".card-" + card["type"]).append(card["obj"])
		})
	})

	// Skills
    $.getJSON( "/static/json/tech.json", function( data ) {
		$.each( data.dayToDay, function( key, val ) {
			$(".day-to-day-" + val[1] + "-list").append("<li>" + val[0] + "</li>")
		});

		$.each( data.experienceWith, function( key, val ) {
			$(".experience-" + val[1] + "-list").append("<li>" + val[0] + "</li>")
		});
	});
});
