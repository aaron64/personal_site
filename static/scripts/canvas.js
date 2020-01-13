
var canvas = document.getElementById("text-canvas")
var ctx = canvas.getContext("2d")
var dx = 0


function run() {
	ctx.clearRect(0,0,canvas.width, canvas.height)
	ctx.save();
	fillCanvas()

	ctx.restore();
	ctx.globalCompositeOperation = "source-in";
	ctx.fillStyle = "#fff"
	ctx.font = "bold 2.6575rem Arial";
	ctx.beginPath();
	ctx.fillText("computers", 0, 28);
	ctx.fill();

	setInterval(run, 200)
}

function fillCanvas() {
	cw = canvas.width/10
	ch = canvas.height/10
	for(var i = 0; i < 10; i++) {
		for(var j = 0; j < 10; j++) {
			ctx.fillStyle="#F00"
			ctx.beginPath();
			ctx.arc(i * cw, j * ch, 10, 0, 2 * Math.PI);
			ctx.closePath()
			ctx.fill(); 
		}
	}
	dx++
}

function rand() {
	return Math.floor(Math.random() * 255)
}

run()
