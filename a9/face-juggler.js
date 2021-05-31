class JugglerMask {
	constructor() {
		this.particles = []
		this.edges = []

		for (var j = 0; j < 2; j++) {
			for (var i = 0; i < 5; i++) {
				for (var k = 0; k < 1; k ++) {
					let pt = new Vector(0,0)
					pt.id = `hand-${j}-${i}`
					pt.radius = 10 + Math.random()*10
					pt.idNumber = j*5 + i + 100*k
					pt.velocity =  Vector.polar(1, Math.random()*100)
					pt.force =  new Vector(0,0)
					pt.color = [Math.random()*360, 100, 50]
					pt.attachPoint = hand[j].fingers[i][3]
					this.particles.push(pt)
				}
			}
		}
	}

	draw(p) {
		let t = p.millis()*.001

		p.background(360*SLIDER.backgroundColor, 100, 90, .8)
		let weight = SLIDER.thickness*2 + 1

		// Both face sides
		face.sideOrder.forEach(side => {
			p.stroke(0)
			p.strokeWeight(weight)
			p.fill(80 + side.index*10)

			let outlinePoints = side.faceRings[0].concat(face.centerLine.slice().reverse())
			drawContour(p, outlinePoints)

			p.noFill()
			let eyebrow = side.eyeRings[0].slice(2, 7).map(pt => {
				let pt2 = new Vector(0,0)

				pt2.setToLerp(side.eye, pt, .2 + 2*SLIDER.eyebrows)
				return pt2
			})

			drawContour(p, eyebrow)
			drawContour(p, side.eyeRings[4])
			side.eye.draw(p, 5)

			p.fill(360*SLIDER.color, 100*SLIDER.saturation, 50, .35)
			p.noStroke()
			drawRibbon(p, side.eyeRings[0], (pct, sideIndex) => Math.abs(10*Math.sin(8*pct*Math.PI)), true)
		})

		// Lips
		p.fill(1, 100, 40)
		p.noStroke()
		drawRibbon(p, face.mouth[4].concat(face.mouth[4].slice(0,1)), (pct, sideIndex) => Math.abs(10*Math.sin(pct*Math.PI*2)), true)

		this.particles.forEach(pt => {
			
			// Draw a nice sphere
			let count = 4
			p.noStroke()
			let flicker = Math.sin(pt.idNumber + t*5)
			p.fill(...pt.color, .2*flicker)
			pt.draw(p, pt.radius*5)

			for (var i = 0; i < count; i++) {
				let pct = 1 - i/count
				
				p.fill(pt.color[0], pt.color[1], (30* (1 + .2*flicker)) + pt.color[2]*(1 - pct))
				pt.draw(p, pt.radius*pct)
			}
			
			p.stroke(0)
			p.strokeWeight(weight)
			Vector.drawLineBetween({p:p, v0:pt, v1:pt.attachPoint,offsetStart:pt.radius})
		})

		hand.forEach(h => {
			p.beginShape()
			p.stroke(0)
			p.fill(360*SLIDER.color, 100*SLIDER.saturation, 50)
			p.vertex(...h.wrist)
			h.fingers.forEach((finger, fingerIndex) => {
				drawRibbonVertices(p, finger, (pct, sideIndex) => {
					return 10*(1 + pct)*sideIndex
				}, true)
			})

			p.vertex(...h.wrist)
			p.endShape()
		})
	}

	update(t, dt, frameCount) {
		let gravity = 140*SLIDER.saturation**2 - 10
		let offset = new Vector()
		
		this.particles.forEach(pt => {
			pt.force.setTo(0, gravity*pt.radius*2)
			offset.setToDifference(pt, pt.attachPoint)

			if (offset.magnitude > 0) {
				pt.force.addMultiples(offset, -20)
				pt.debug = pt.force.toString() + " " + dt	
			}

			pt.velocity.addMultiples(pt.force, 300*dt/pt.radius**2)

			// Drag and clamp
			pt.velocity.mult(.98)
			pt.velocity.clampMagnitude(0, 20000)
			pt.addMultiples(pt.velocity, dt)

			// Ease the particles toward the attach point, in case they get tooo far off
			pt.setToLerp(pt, pt.attachPoint, .01)
			pt.mult(.99)
		})
	}
}

masks.juggler = JugglerMask