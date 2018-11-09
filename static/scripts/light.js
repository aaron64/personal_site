$(document).ready(function(){

	col_r = 255
	col_g = 255
	col_b = 255

	var slider = $('#brightness-slider').slider()
		.on('slide', function() {
			val = slider.getValue()

			col_r = Math.floor(col_r * (val / 100.0))
			col_g = Math.floor(col_g * (val / 100.0))
			col_b = Math.floor(col_b * (val / 100.0))

			$.getJSON('/light_color/'+col_r+'/'+col_g+'/'+col_b,
				function(data){})
		})
		.data('slider');

	$.getJSON( "/static/json/colors.json", function( data ) {
		var colors = []
		var items = []

		$.each(data, function( i, obj) {
			colors.push(obj)	
		})
		colors.forEach(function(color) {
			
			r = parseInt(color["R"])
			g = parseInt(color["G"])
			b = parseInt(color["B"])
			
			textCol = ""
			if(r * 0.229 + g * 0.587 + b * 0.114 < 186){
				textCol = "; color: white"
			}
			

			items.push("<div class='col-md-4'>" + 
				"<a href='#' class='btn-col'>" + 
				"<button type='button' style='background-color: rgb(" + 
				color["R"] + "," + color["G"] + "," + color["B"] + 
				")" + textCol + "' class='btn btn-light'>" + color["name"] + 
				"</button></a></div>")
		})

		while(items.length > 0) {
			app = "<div class='row form-group justify-content-center'>"
			for(i = 0; i < 3; i++) {
				app += items.pop()
				if(items.length <= 0)
					break
			}
			app += "</div>"
			$(".color-selector").append(app)
		}
	})

	$('.color-selector').on('click', '.btn-col', function() {
		color = $(this).find('.btn').css("background-color")
		color = color.substring(4, color.length-1).replace(/ /g, '').split(',')

		col_r = color[0]
		col_g = color[1]
		col_b = color[2]

		$.getJSON('/light_color/'+col_r+'/'+col_g+'/'+col_b,
			function(data){})
		return false
	})
	$('.btn-light-on').bind('click', function() {
		$.getJSON('/light_on',
			function(data){})
		return false
	})
	$('.btn-light-off').bind('click', function() {
		$.getJSON('/light_off',
			function(data){})
		return false
	})
});

