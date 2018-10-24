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
				"<h5 class='card-header'>" + obj["name"] + "</h5>" +
				"<div class='card-body'>" + 
				"<div><i class='far fa-calendar-alt mr-2'></i>" + obj["time"] + "</div>" +
				"<div><i class='far fa-user mr-2'></i>" + obj["position"] + "</div>" +
				"</div></div>"
			cards.push({"obj":c, "type":obj["type"]})
		})
		cards.forEach(function(card) {
			$(".card-" + card["type"]).append(card["obj"])
		})
	})

	// propegate technologies chips
    $.getJSON( "/static/json/tech.json", function( data ) {
    	var items = []
		$.each( data, function( key, val ) {
			for(i = 0; i < val.length; i++) {
				color = ""
				switch(key) {
					case "CPP":
						color = "success"
						break;
					case "Java":
						color = "primary"
						break;
					case "Python":
						color = "danger"
						break;
					case "Web":
						color = "warning"
						break;
					case "OS":
						color = "secondary"
						break;
					case "Misc":
						color = "dark"
						break;
				}
				items.push( "<button type='button' style='margin-right:20px' class='btn btn-disabled btn-outline-" + color + " tech-" + key + "' disabled>" + val[i] + "</button>" );
			}
		});

		items = shuffle(items)

		while(items.length > 0) {
			app = "<div class='row form-group'>"
			for(i = 0; i < 6; i++) {
				app += items.pop()
				if(items.length <= 0) {
					break
				}
			}
			app += "</div>"
			$(".technologies-values").append(app)
		}
	});

	$(".technology-key").hover(
		function() {
    		tech_class = "tech-" + $(this).attr("data-tech")
    		tech_color = "" + $(this).attr("data-techCol")
    		$("."+tech_class).removeClass("btn-outline-" + tech_color)
    		$("."+tech_class).addClass("btn-" + tech_color)
  		}, function() {
    		tech_class = "tech-" + $(this).attr("data-tech")
    		tech_color = "" + $(this).attr("data-techCol")
    		$("."+tech_class).removeClass("btn-" + tech_color)
    		$("."+tech_class).addClass("btn-outline-" + tech_color)
  	})
});
