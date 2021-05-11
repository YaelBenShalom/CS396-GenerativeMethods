// Create a particle system with an initialize, update, and draw function

// let mySystem = new BasicParticleSystem()
// mySystem.update()
// mySystem.draw()

class SpidersParticles {
	constructor() {
		console.log("MAKE A PARTICLE SYSTEM", this)
		this.gravity = [0, 100]

		// My array of particles
		this.particles = []

		// Make some particles
		let SpidersNum = 3
		for (var i = 0; i < SpidersNum; i++) {
			let particle = {
				idNumber: i,
				position: Vector.polar(i * 40, i),
				velocity: new Vector(100, 0),
				borderForce: new Vector(0,0),
				wanderForce: new Vector(0,0),
				circularForce: new Vector(0, 0),
				wind: new Vector(0, 0)
				// mouseAttractorForce: new Vector(0,0)
			}

			// console.log(particle.position[0])
			// Add this to my particles
			this.particles.push(particle)
		}
	}

	update(p) {
		this.gravity = [0, 10*SLIDER.gravity]


		// let mouse = [p.mouseX - p.width/2, p.mouseY - p.height/2]
		let dt = p.deltaTime*.001
		// Don't update more than a tenth of a second at a time, even if we get out of sync
		dt = Math.min(.1, dt)
		let t = p.millis()*.001
		// console.log(t)
		// console.log(SLIDER)
		this.particles.forEach(pt => {

			// Stay inside a circle of "range": 
			// ie: apply an increasing force the farther you get outside the circle
			let dist = pt.position.magnitude
			let range = 50
			let distOutsideBorder = Math.max(0, dist - range)/range
			let borderStrength = 50*distOutsideBorder**2
			if (dist > 0)
				pt.borderForce.setToMultiple(pt.position, -borderStrength/dist)
			
			// Wind force pushing to the right
			let windStrength = (SLIDER.wind * 200) * p.noise(t * 0.5)
			
			if (SLIDER.wind < 0.5) {
				windStrength = ((SLIDER.wind - 0.5) * 500) * p.noise(t * 0.5)
			}
			
			pt.wind.setToPolar(windStrength, 0)

			// Wander left to right
			let wanderStrength = 100
			let wanderDirectionCalculation = Math.cos((pt.idNumber + 1) * (0.25 * t))
			let wanderDirection = 1
			
			//let wanderDirection = 15*p.noise(pt.idNumber, t*.2)
			function changeWanderDirection() {
				if (wanderDirectionCalculation > 0) {
					wanderDirection = 0
				} 
				else {
					wanderDirection = 5*Math.PI
				}
			}

			changeWanderDirection()
			pt.wanderForce.setToPolar(wanderStrength, wanderDirection)

			// Spin in a Circle
			pt.circularForce.setToPolar(150, 2 * Math.PI * Math.cos((t * 0.25)))
			
			// Add all the forces to the velocity
			pt.velocity.addMultiples(pt.borderForce, dt)
			pt.velocity.addMultiples(pt.wanderForce, dt)
			pt.velocity.addMultiples(pt.wind, dt)
			pt.velocity.addMultiples(pt.circularForce, dt)

			// Add some "drag"
			pt.velocity.mult(1 - .1*SLIDER.drag)

			// Update the position
			pt.velocity.addMultiples(this.gravity, dt)
			pt.position.addMultiples(pt.velocity, dt)
			
		})
	}

	drawHeatmap(p, heatmapScale) {
		p.push()
		p.translate(p.width/2, p.height/2)
		p.scale(1/heatmapScale)
		p.noStroke()
		p.fill(0, 256, 0)
		this.particles.forEach(pt => p.circle(...pt.position, 60))
		p.pop()
		// p.filter(p.BLUR, 3);
	}

	draw(p) {

		let debugDraw = DEBUG_DRAW[this.constructor.name]
		// if (debugDraw) {
		// 	debugDrawHeatmap(p)
		// }
		
		p.push()
		p.translate(p.width/2, p.height/2)
		this.particles.forEach(pt => {

			p.stroke(256, 256, 256)
			p.fill(0, 0, 0)
			p.line(0, -200, pt.position[0], pt.position[1])

			let side = 1
			for (let i = 0; i < 2; i++) {

				p.line(pt.position[0], pt.position[1], pt.position[0]+20*side, pt.position[1]-20)
				p.line(pt.position[0]+20*side, pt.position[1]-20, pt.position[0]+30*side, pt.position[1])

				p.line(pt.position[0], pt.position[1], pt.position[0]+20*side, pt.position[1]-10)
				p.line(pt.position[0]+20*side, pt.position[1]-10, pt.position[0]+30*side, pt.position[1]+10)

				p.line(pt.position[0], pt.position[1], pt.position[0]+20*side, pt.position[1])
				p.line(pt.position[0]+20*side, pt.position[1], pt.position[0]+30*side, pt.position[1]+20)
				side *= -1
			}

			p.circle(pt.position[0], pt.position[1], 16)

			p.noStroke()
			p.fill(256, 256, 256, 0.05)
			p.circle(pt.position[0], pt.position[1], 28)

			if (debugDraw) {
				// pt.velocity.drawArrow({p, 
				// 	multiple:.4,
				// 	center:pt.position, 
				// 	color:[0,0,0]}) 

				let forceLengthMultiple = .2
				pt.borderForce.drawArrow({p, 
					multiple:forceLengthMultiple,
					center:pt.position, 
					color:[50,100,40]}) 

				// pt.mouseAttractorForce.drawArrow({p, 
				// 	multiple:forceLengthMultiple,
				// 	center:pt.position, 
				// 	color:[150,100,40]}) 

				pt.wind.drawArrow({p, 
					multiple:forceLengthMultiple,
					center:pt.position, 
					color:[240,100,50]}) 

				pt.wanderForce.drawArrow({p, 
					multiple:forceLengthMultiple,
					center:pt.position, 
					color:[120,100,50]}) 
				
				pt.circularForce.drawArrow({p, 
					multiple:forceLengthMultiple,
					center:pt.position, 
					color:[0,100,50]}) 
			}
		})

		p.pop()
	}
}

