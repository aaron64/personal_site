$(document).ready(function(){
	$.getJSON( "/static/json/colors.json", function( data ) {
		var colors = []
		$.each(data, function( i, obj) {
			colors.push(obj)	
		})
		colors.forEach(function(color) {
			col_btn = "<button style='background-color: rgb(" + color["R"] + "," + color["G"] + "," + color["B"] + ")' class='col-btn'></button>"
			$(".color-selector").append(col_btn);
		})
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

