$(document).ready(function(){
	var result = 0;
	route_id_12 = "4001170"
	route_id_37 = "4008432"

	timespan = 40;

	buses = []

	var now = new Date()/1000;
	$.ajax({
        url: 'https://feeds.transloc.com/3/arrivals?agencies=116&stop_id=4195938',
        dataType: 'json',
        success: function(json) {    
	        for(var i = 0; i < json.arrivals.length; i++)
			{
				delta = Math.floor((json.arrivals[i].timestamp-now)/(60))

				col = ''
				n = ''

				route = json.arrivals[i].route_id
				if(route == route_id_12){
					n = "12"
					col = "#E83E8C"
				} else if(route == route_id_37) {
					n = "37"
					col = "#FD7E14"
				} else {
					col = "#4582EC"
				}

				buses.push({name: n, time: delta, route: route, color: col})
			}
			buses = buses.sort(compare_times).slice(0,Math.min(json.arrivals.length,3));

			for(var i = 0; i < buses.length; i++) {
				//alert(buses[i].time)
			}
			runCanvas();
			showInfo();
        }
    });

    function runCanvas() {
    	canvas = document.getElementById("canvas")
    	w = canvas.width
    	canvas.height = 75
    	h = canvas.height
    	ctx = canvas.getContext("2d")

    	ctx.font = "18px Arial";
		ctx.fillText(timespan + " Min",5,60);

    	ctx.strokeStyle="#888"
    	ctx.lineCap = "round"

    	ctx.moveTo(5,30)
    	ctx.lineTo(w - 5, 30)
    	ctx.stroke()

    	ctx.moveTo(w * 0.8,5)
   		ctx.lineTo(w * 0.8,55)
   		ctx.stroke()
   
   		for(var i = 0; i < buses.length; i++) {
   			var pos = (w * 0.8) - (buses[i].time / timespan) * (w * 0.8)
			circle(buses[i].color, pos)
   		}
 
    
	    function circle(col, x) {
	    	ctx.fillStyle=col
	    	ctx.beginPath();
			ctx.arc(x,30,10,0,2*Math.PI);
			ctx.fill();
	    }
    }

    function showInfo() {
    	for(var i = 0; i < buses.length; i++) {
    		var b = "<div class='row mb-3'><div class='mr-3'>" + 
    			"<i class='fas fa-bus' style='color:" + buses[i].color + "'></i></div>" +
    			"<div class='col-9' style='border-left: 1px solid #000'>" + buses[i].name + " Arrival: " + buses[i].time + " minutes" + "</div>"
    			"</div>"
    		$(".bus-info").append(b)
    	}
    }

	function compare_times(a,b) {
		if (a.time < b.time)
			return -1;
		if (a.time > b.time)
			return 1;
		return 0;
	}


})