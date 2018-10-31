$(document).ready(function(){


	$.getJSON( "/static/json/projects.json", function( data ) {
		proj_data = 0
		$.each(data, function( i, obj) {
			if(obj["path_name"]) {
				proj_data = obj;
			}
		})

		$('.project-header').text(proj_data['name'])
		$('.project-type').text(proj_data['type'])
	})


	CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
		if (w < 2 * r) r = w / 2;
		if (h < 2 * r) r = h / 2;
		this.beginPath();
		this.moveTo(x+r, y);
		this.arcTo(x+w, y,   x+w, y+h, r);
		this.arcTo(x+w, y+h, x,   y+h, r);
		this.arcTo(x,   y+h, x,   y,   r);
		this.arcTo(x,   y,   x+w, y,   r);
		this.closePath();
		return this;
	}

	var c = document.getElementById("gol-canvas");
	w = Math.max(screen.width, $(document).width())
	h = Math.max(screen.height, $(document).height())
	c.width = w
	c.height = h

	cell_s = 50
	cell_col = "#FFE69B"

	cells_x = Math.ceil(w/cell_s)
	cells_y = Math.ceil(h/cell_s)

	grid = [] = new Array(cells_x).fill(false)
	for(i = 0; i < cells_x; i++) {
		grid[i] = new Array(cells_y).fill(false)
	}

	for( i = 0; i < cells_x; i++) {
			for(j = 0; j < cells_y; j++) {
				if(Math.random() < 0.2)
					grid[i][j] = true
			}
		}

	var ctx = c.getContext("2d");

	function update() {
		for( i = 0; i < cells_x; i++) {
			for(j = 0; j < cells_y; j++) {
				count = 0
				for(k = -1; k < 2; k++) {
					for(l = -1; l < 2; l++) {
						cx = i + k
						cy = j + l

						if(cx < 0 || cy < 0 || cx >= cells_x || cy >= cells_y || (k == 0 && l == 0)) {
							continue
						}
						if(grid[cx][cy] == true) {
							count++
						}
					}
				}
				if(count < 2) {
					grid[i][j] = false
				}
				else if(count == 3) {
					grid[i][j] = true
				}
				else if(count > 3) {
					grid[i][j] = false
				}
			}
		}
	}

	function draw() {
		ctx.fillStyle=cell_col
		for(i = 0; i < cells_x; i++) {
			for(j = 0; j  < cells_y; j++) {
				if(grid[i][j])
					ctx.roundRect(i * cell_s + i, j * cell_s + j, cell_s, cell_s,10).fill()
			}
		}
	}

	function run() {
		ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
		ctx.fillRect(0,0,w,h)
		if(t%250 == 0) {
			update()
		}
		draw()
		t+=2
		setTimeout(run, 1)
	}
	t = 0
	run()
})