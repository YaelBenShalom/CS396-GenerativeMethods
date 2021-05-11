	
let simCount = 0

let noise = (new p5()).noise

document.addEventListener("DOMContentLoaded", function(){
	new Vue({
		el : "#app",
		template: `<div id="app">
			<p> A community where no one is paying it forward to the surrounding neighbors. In this case, nothing happens:
			</p>
			<simulation type="LoveSimulation" mode="gol" :dimensions="[33,20]" :tileSize="20" :factor="0"/>
			<br>
			<p> A community where every person is paying it forward to one neighbor. Is this situation, we can start see some good deeds spread slowly:
			</p>
			<simulation type="LoveSimulation" mode="gol" :dimensions="[33,20]" :tileSize="20" :factor=".04"/>
			<br>
			<p> A community where every person is paying it forward to two neighbors. Now it's starting to look better:
			</p>
			<simulation type="LoveSimulation" mode="gol" :dimensions="[33,20]" :tileSize="20" :factor=".13"/>
			<br>
			<p> A community where every person is paying it forward to three or more neighbors, as Trevor McKinney intended. In this case the good deeds spread fast and everyone benefits from a better community:
			</p>
			<simulation type="LoveSimulation" mode="gol" :dimensions="[33,20]" :tileSize="20" :factor=".5"/>
			
		</div>`,
	}) 
})

//==================================
// Grid utilities

// Create a grid of columns
function createGrid(w, h) {
	const grid = Array.from(new Array(w),()=>Array.from(new Array(h),()=>"-"));
	return grid
}

// Set a grid equal to a function
function setGrid(grid, fxn) {
	if (grid === undefined)
		console.warn("no grid!")
	if (fxn === undefined)
		console.warn("no function for setting the grid!")
	for (var i = 0; i < grid.length; i++) {
		for (var j = 0; j < grid[i].length; j++) {
			grid[i][j] = fxn(i,j)
		}
	}
}

// Copy a grid
function copyGrid(dest, src) {
	for (var i = 0; i < src.length; i++) {
		for (var j = 0; j < src[i].length; j++) {
			dest[i][j] = src[i][j]
		}
	}
}