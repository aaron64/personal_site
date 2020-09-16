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
    	$.each( data.languages, function( key, val ) {
			langStr = "<div><h5>" + val[0] + "</h5></div>"
			langStr += "<div class='progress' style='background-color: #ffffff55;'>" +
          	"<div class='progress-bar progress-bar-striped bg-light progress-bar-animated' role='progressbar' style='width: " + (val[1]/4)*100 + "%'></div>" +
        	"</div>"
			$(".languages").append(langStr)
		});
		$.each( data.tech, function( key, val ) {
			techStr = ""

			if(val[2] == "day-to-day") {
				techStr += "<b>"
			}
			techStr += "<button type='button' class='btn btn-warning m-1'>" + val[0] + "</button>"
			if(val[2] == "day-to-day") {
				techStr += "</b>"
			}

			$("." + val[1] + "-row").append(techStr)
		});
	});
    
});
