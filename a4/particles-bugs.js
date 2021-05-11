// Create a particle system with an initialize, update, and draw function

// let mySystem = new BasicParticleSystem()
// mySystem.update()
// mySystem.draw()

class BugsParticles {
	constructor() {
		this.bugs = []
		let BugsNum = 6
		for (var i = 0; i < BugsNum; i++) {
			this.bugs.push(new Bug())
		}
	}

	update(p) {
		this.bugs.forEach(b => b.update(p))
	}

	// Draw INTO the heatmap
	drawHeatmap(p, heatmapScale) {
		p.fill(0, 0, 0, 3)
		p.rect(0, 0, p.width, p.height)
		p.push()
		p.scale(1/heatmapScale)
		p.fill(255, 0, 0)
		p.noStroke()
		this.bugs.forEach(b => {
			p.fill(0, 255, 0)

			// Draw *behind* the bug
			let pos = Vector.addMultiples(b.position, 1, b.velocity, -300)
			p.circle(...pos, 15)
		})
		p.pop()
	}

	getClosest(point, range) {
		let closestDist = range
		let closest = undefined

		this.bugs.forEach(b => {
			let d = Vector.getDistance(b.position, point)
			if (d < closestDist) {
				closest = b
				closestDist = d
			}
		})
		if (closest)
			return closest.position 
	}

	draw(p) {

		let debugDraw = DEBUG_DRAW[this.constructor.name]
		if (debugDraw) {
			debugDrawHeatmap(p)
		}
		
		p.push()
		p.noStroke()

		
		this.bugs.forEach(b => b.draw(p))
		if (debugDraw) {
			this.bugs.forEach(b => b.drawDebug(p))
		}
		p.pop()
	}
}

class Bug {
	constructor() {
		this.position = new Vector(Math.random()*400,Math.random()*300)
		this.velocity = Vector.polar(Math.random()*.1, Math.random()*200)
		this.smellValue =[0,0,0]

		this.angle = 0
		this.force = new Vector (0, 0)

		this.eyes = [new Vector(0,0),new Vector(0,0)]
		this.eyes.forEach(eye => eye.value = 0)
	}

	update(p) {

		let dt = Math.min(.1, p.deltaTime*.001)
		let t = p.millis()*.001

		this.smellValue = readHeatmapAt(this.position)

		this.position.addMultiples(this.velocity, p.deltaTime)

		// Set the position of the eyes
		// this.eyes.forEach(eye => eye.value = 0)
		let eyeRadius = 10
		let eyeAngle = 1
		this.eyes[0].setToPolarOffset(this.position, eyeRadius, this.angle + eyeAngle) 
		this.eyes[1].setToPolarOffset(this.position, eyeRadius, this.angle - eyeAngle)
		this.eyes.forEach(eye => eye.value = readHeatmapAt(eye)[1]/255)

		this.force.setToPolar((0.0001 + (this.smellValue[2]/255)/ 1000), this.angle)
		this.velocity.addMultiples(this.force, p.deltaTime)
		this.velocity.mult(1 - .5*SLIDER.drag)
		this.position.addMultiples(this.velocity, p.deltaTime)
		
		// Wraparound
		this.position[0] = (this.position[0]+p.width)%p.width
		this.position[1] = (this.position[1]+p.height)%p.height
		
		this.angle = this.velocity.angle
	}

	drawDebug(p) {
		p.stroke(0, 0, 100)
		p.strokeWeight(3)
		p.fill(0)

		this.eyes.forEach(eye => {
			p.stroke(0, 0, 100)
		})
	}

	draw(p) {
		// console.log(this.value)
		p.push()
		// this.position[1] = Math.abs(this.position[1])
		p.translate(...this.position)
		p.rotate(this.angle)

		p.stroke(0)
		p.fill(0, 0, 50)

		let bodyWidth = 35
		let bodyLength = 60
		p.ellipse(-bodyLength*.3, 0, -bodyLength, bodyWidth)

		p.fill(0, 0, 30)
		p.line(0, 0, -0.8*bodyLength, 0)
		p.circle(0, 0, bodyWidth, bodyWidth)
		p.pop()
	
		this.angle += this.eyes[0].value - this.eyes[1].value
		
		this.eyes.forEach(eye => {
			p.stroke(0, 0, 0, 5)
			p.fill(100 * eye.value)
			p.circle(...eye, 10)
		})
	}


}

