let fingerTrails = [[[],[],[],[],[]], [[],[],[],[],[]]]

masks.myMask = function(p) {
	
	let t = p.millis()*.001
	p.clear()
	
	let ringNum = 6
	for (var i = 0; i < ringNum; i++) {
		let hue_background = SLIDER.backgroundColor*360
		p.fill(hue_background, 30, 60, .12)
		p.noStroke(0)
		p.beginShape()
		let count = 10
		let pt = new Vector()
		
		for (var j = 0; j < count; j++) {
			let theta = j*Math.PI*2/count
			
			pt.setToPolar(150 + (40+i*60)*p.noise(j, t*.6 + i*.4), theta)
			pt[0] *= 1.5
			if (j === 0) {
				p.vertex(...pt)
			} else 
				p.curveVertex(...pt)
		}

		p.endShape(p.CLOSE)
	}
	
	// Get the two side contours of the face
	let sideContours = face.sides.map(side => {
		return side.faceRings[0]
	})

	// Join them together into a single continous contour
	let faceContour = joinSides(...sideContours)
	let weight = SLIDER.thickness*3 + 1
	let lightness = SLIDER.saturation*40+30
	let hue = SLIDER.color*360
	
	p.stroke(hue, 100*SLIDER.saturation, lightness)
	p.strokeWeight(weight)

	// Drawing contours is your most basic tool
	// A contour is an array of vectors (usually face points)
	// You can draw it smooth or normal, closed or open
	drawSmoothContour(p, faceContour, true)

	p.noFill()
	drawContour(p, face.centerLine)
	
	face.sideOrder.forEach(side => {
		p.noStroke()
		p.fill(hue, 100*SLIDER.saturation, lightness, .2)
		drawContour(p, side.eyeRings[2])

		p.stroke(hue, 100*SLIDER.saturation, lightness)
		p.strokeWeight(weight)
		p.fill(hue, 100, lightness-10, .2)
		drawContour(p, side.eyeRings[3])

		p.fill(0, 100, 100, .7)
		drawContour(p, side.eyeRings[4])

		p.fill(0, 0, 0, .5)
		p.noStroke()
		p.circle(...side.eye, 6)
		p.circle(...side.eye, 4)

		p.stroke(hue, 100*SLIDER.saturation, lightness)
		p.strokeWeight(weight)
	})

	face.sides.forEach(side => {
		// For each side
		// We can take slices of the contours to only draw part of them
		p.fill(120, 30, 60, .1)
		p.strokeWeight(weight)
		drawContour(p, side.nose[0].slice(-5), false)

		p.strokeWeight(SLIDER.eyebrows*4+1)
		drawContour(p, side.eyeRings[1].slice(2,8), false)
	})

	p.fill(0, 100, 0, .95)
	p.strokeWeight(weight/5)
	drawContour(p, face.mouth[3], true)

	p.fill(0, 100, 30, .5)
	p.stroke(0, 100, 30, .5)
	p.strokeWeight(weight)
	drawContour(p, face.mouth[2], true)

	hand.forEach((h,handIndex) => {
		h.fingers.forEach((finger,fingerIndex) => {
			// Leave a trail? Make an 8-point trail
			let trail = fingerTrails[handIndex][fingerIndex]
			if (!app.paused) {
				addToTrail(trail, finger[3], 12)
			}

			p.noStroke()
			p.fill(hue, 100*SLIDER.saturation, lightness, .2)
			drawRibbon(p, trail, (pct, side) => {

				return 5*pct*weight
			}, true)

			// Draw each bone of the finger
			for (var i = 0; i < finger.length - 1; i++) {
				p.fill(hue, 100*SLIDER.saturation, lightness)
				p.noStroke()

				// What angle is this finger bone?
				let joint0 = finger[i]
				let joint1 = finger[i + 1]
				let radius0 = getFingerSize(fingerIndex, i)
				let radius1 = getFingerSize(fingerIndex, i)
				let boneAngle = joint0.angleTo(joint1) 

				p.beginShape(p.TRIANGLE_MESH)
				joint0.polarOffsetVertex(p, radius0, boneAngle + Math.PI/2)
				joint0.polarOffsetVertex(p, radius0, boneAngle - Math.PI/2)
				joint1.polarOffsetVertex(p, radius1, boneAngle - Math.PI/2)
				joint1.polarOffsetVertex(p, radius1, boneAngle + Math.PI/2)
				p.endShape()

				p.fill(hue, 100*SLIDER.saturation, .95*lightness)
				p.beginShape(p.TRIANGLE_MESH)
				joint0.polarOffsetVertex(p, radius0*.3, boneAngle + Math.PI/2)
				joint0.polarOffsetVertex(p, radius0*.7, boneAngle - Math.PI/2)
				joint1.polarOffsetVertex(p, radius1*.7, boneAngle - Math.PI/2)
				joint1.polarOffsetVertex(p, radius1*.3, boneAngle + Math.PI/2)
				p.endShape()

				joint1.draw(p, radius1)
				p.fill(hue, 100*SLIDER.saturation, .85*lightness)
				joint1.draw(p, radius1*.8)
			}
		})
	})
}

function getFingerSize(fingerIndex, index) {
	let r = 1 + .3*Math.sin(1*fingerIndex - .5)
	// Make the thumb bigger
	if (fingerIndex == 0)
		r *= 1.6
	r *= 12
	// Taper the fingers a bit
	r *= (1 - .06*index)
	return r
}