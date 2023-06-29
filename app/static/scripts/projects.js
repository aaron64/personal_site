$(document).ready(function(){

	// propegate cards
	$.getJSON( "/static/json/projects.json", function( data ) {
		var projects = []
		

		$.each(data, function( i, obj ) {
			console.log(obj["url"])
			//p = "{% filter markdown %} {%include ('projects/" + "py-lights" + ".md') %} {% endfilter %}"
			//p += "{% filter markdown %}{%include ('projects/" + obj["url"] + ".md') %}{% endfilter %}"
			//projects.push(p)
		})
		$(".project-lists").append(projects)
	})
})