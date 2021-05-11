class LoveSimulation {
	// Some number of grids
	constructor(mode, dimensions, tileSize, factor) {
		this.idNumber = simCount++
		// Mode can control various factors about the simulation
		this.dimensions = dimensions
		this.mode = mode
		this.tileSize = tileSize

		this.selectedCell = [3, 4]
		this.factor = factor
		
		// Your simulation can have multiple layers		
		this.values = createGrid(...this.dimensions)

		// Set up the grid with its initial values
		this.initialize()
	}


	// What are my initial values?
	initialize() {
		setGrid(this.values, (x, y) => {
			// Given x, y, set this cell to something
			if (Math.random() < .6)
				return {emoji:"😐"};
            else if (Math.random() < .01)
                return {emoji:"❤️"};		
		})
	}

	// Create a glider in the middle of the board


	// A useful function for Game of Life
	getLiveNeighborCount(x, y) {
		// How many of my neighbors have a non-zero value?
		let neighbors = this.getEightNeighborPositions(x, y, true)
		let liveCount = 0

		neighbors.forEach((pos) => {
			let nx = pos[0]
			let ny = pos[1]
			if (this.values[nx][ny]){
				if (this.values[nx][ny].emoji == "❤️"){
					liveCount++
				}
			}
		})
		return liveCount
	}


	// When we update the simulation, 
	// we want write our next moves into a temporary "next-step" grid
	// And then once all the updates are done, 
	// copy that back into the original grid 

	step() {
		

		// Create a temporary grid to store the next positions
		let tempGrid = createGrid(...this.dimensions)
		
		setGrid(tempGrid, (x, y) => {
			// my current value
			let val = this.values[x][y]

			let NeighborCount = this.getLiveNeighborCount(x, y)

			if(val){
				if (val.emoji === "😐") {
					// console.log("factor", this.factor)
					if (NeighborCount >= 1){
						if (Math.random() <= this.factor) {
							return {emoji:"❤️"};
						}
					}
				}
			}
		
			return val
		})

		// Swap all the buffers: copy the nextGrid into the current grid
		copyGrid(this.values, tempGrid)
	}

	//=====================================================
	// Drawing

	draw(p) {
		p.background(196, 100, 80)
		// Draw each cell
		let w = this.dimensions[0]
		let h = this.dimensions[1]

		for (var i = 0; i < w; i++) {
			for (var j = 0; j < h; j++) {
				this.drawCell(p, i, j)
			}
		}

		// Draw debug information about the currently selected cell
		// A useful place to put debug information!
		if (this.debugMode) {

			p.stroke(100, 100, 50, 1)
			p.strokeWeight(4)
			p.noFill()
			this.drawSquare(p, ...this.selectedCell)
			let neighbors = this.getNearestNeighborPositions(...this.selectedCell, true)
			neighbors.forEach((cell,index) => {
				p.noStroke()
				p.fill(index*20, 100, 50, .4)
				this.drawSquare(p, ...cell)
			})
			neighbors = this.getCornerNeighborPositions(...this.selectedCell, true)
			neighbors.forEach((cell,index) => {
				p.noStroke()
				p.fill(index*20 + 100, 100, 50, .4)
				this.drawSquare(p, ...cell)
			})

			let count = this.getLiveNeighborCount(...this.selectedCell)
			p.stroke(100)
			p.fill(0)
			p.text(count, this.selectedCell[0]*this.tileSize,this.selectedCell[1]*this.tileSize)
		}
	}

	// Draw a cell.  Add emoji or color it
	drawCell(p, x, y) {

		// Alive or dead?
		let value = this.values[x][y]
		
		// Draw the black or white square
		p.strokeWeight(0.5)
		p.stroke(0, 0, 0, .2)
		p.fill(color(240, 240, 240))
		
		if (value){
			let rand = Math.random()
			if(value.emoji === '❤️'){
				p.fill(color(255, 120+30*rand, 120+30*rand))
			}
			else if (value.emoji === "😐"){
				p.fill(color(255, 240, 100))
			}
		}
	
		this.drawSquare(p, x, y)
		let w = this.tileSize
		let px = (x + .5)*w
		let py = (y + .5)*w

		if(value){
			if(value.emoji === '❤️'){
				let size = w*(.5+.3*Math.random())
				p.textSize(size)
				p.text(value.emoji, px - .6*size, py + w*.25)
			}
			else if (value.emoji === "😐"){
				p.textSize(w*.8)
				p.text(value.emoji, px - w*.5, py + w*.25)
			}
		}

		// Debug the game
		if (this.debugMode) {
			let neighbors = this.getLiveNeighborCount(x, y)
			p.stroke(100, 100, 50)
			p.fill(0)
			p.textSize(w*.5)
			this.drawText(p, x, y,neighbors)
		}
	}

	//=====================================================
	// Mouse interactions

	select(x, y) {
		// console.log("Select", x, y)
		this.selectedCell = [x, y]
	}

	click(x, y) {
		console.log("Click", x, y)
	}

	drag(x, y) {
		console.log('h')
	}



	//=====================================================
	// Utility functions

	toggleDebugInfo() {
		this.debugMode = !this.debugMode
	}

	// Handy utility to draw a single grid 
	drawSquare(p, col, row) {
		let w = this.tileSize
		let x = (col + .5)*w
		let y = (row + .5)*w
		p.rect(x - w/2, y - w/2, w, w)
	}

	// Handy utility to draw text 
	drawText(p, col, row, text) {
		let w = this.tileSize
		let x = (col + .5)*w
		let y = (row + .5)*w
		p.text(text, x - w/2, y - w*.1)
	}

	// Is this cell selected?
	isSelected(x, y) {
		return (this.selectedCell && this.selectedCell[0] == x && this.selectedCell[1] === y)
	}

	//------------------------------------------------
	// Neighbor positions
	getEightNeighborPositions(x1, y1, wrap) {
		return [...this.getNearestNeighborPositions(x1, y1, wrap),
		...this.getCornerNeighborPositions(x1, y1, wrap)]
	}

	getNearestNeighborPositions(x1, y1, wrap) {
		let w = this.dimensions[0]
		let h = this.dimensions[1]
		let x0 = x1 - 1
		let x2 = x1 + 1
		let y0 = y1 - 1
		let y2 = y1 + 1
		if (wrap)  {
			x0 = (x0 + w)%w
			x2 = (x2 + w)%w
			y0 = (y0 + h)%h
			y2 = (y2 + h)%h
		}
		
		return [[x1,y0],[x2,y1],[x1,y2],[x0,y1]]
	}
	getCornerNeighborPositions(x1, y1, wrap) {
		let w = this.dimensions[0]
		let h = this.dimensions[1]
		let x0 = x1 - 1
		let x2 = x1 + 1
		let y0 = y1 - 1
		let y2 = y1 + 1
		if (wrap)  {
			x0 = (x0 + w)%w
			x2 = (x2 + w)%w
			y0 = (y0 + h)%h
			y2 = (y2 + h)%h
		}
		
		return [[x0,y0],[x0,y2],[x2,y2],[x2,y0]]
	}
}