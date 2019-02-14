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

	// propegate technologies chips
    $.getJSON( "/static/json/tech.json", function( data ) {
    	var items = []
			var items_mobile = []

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
				items_mobile.push( "<button type='button' style='margin-right:20px' class='btn mb-3 btn-disabled btn-outline-" + color + " tech-" + key + "' disabled>" + val[i] + "</button>" );
			}
		});

		items = shuffle(items)
		itmes_mobile = shuffle(items_mobile)

			btn_list_mobile = "<div class='row content-phone d-block d-sm-none form-group' style='margin-left:auto; margin-right:auto;text-align:center'>"

		while(items.length > 0) {
			btn_list_desktop = "<div class='row content-desktop d-none d-sm-none d-md-flex form-group'>"
			for(i = 0; i < 6; i++) {
				btn_list_desktop += items.pop()
				btn_list_mobile += items_mobile.pop()

				if(items.length <= 0) {
					break
				}
			}
			btn_list_desktop += "</div>"
			$(".technologies-values").append(btn_list_desktop)
		}

		btn_list_mobile += "</div>"
		$(".technologies-values").append(btn_list_mobile)
	})

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
