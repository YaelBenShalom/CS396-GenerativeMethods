let animations = [
	// Each animation is represented an object
	// with a title, setup, and draw function
	// This one draws a circle moving around
	{
		title: "My First Animated GIF!",

		// Both draw and setup have access to the processing object "p"
		draw: function(p) {
			// Each frame, draw a light gray background
			p.background(0, 0, 0)
			
			let t = p.millis()*.001

			p.translate(p.width / 2, p.height / 2)

			for (var i = 0; i < 10; i++) {
				p.noStroke()
				p.fill(210 + i * 5, 100, 20, .18)
				let r = 1 + .2 * i
				p.ellipse(0, 0, r * 170, r * 170)
			  }

			for (var i = 0; i < 100; i++) {

				let theta = i * .22 + t
				let r = 1.6 * i
				let radius = 1.3 * i

				let x = r * Math.cos(theta)
				let y = r * Math.sin(theta)

				let hue = (t*25 + i)%360
				
				// // Make a drop shadow
				// p.noStroke()
				p.stroke(hue, 100, 38)
				p.fill(hue, 100, 40, .01*i)
				p.circle(x, y, radius/2)
			}
		}
	},

	{
		title: "And here are some more...",

		// Both draw and setup have access to the processing object "p"
		setup: function(p) {
			p.background(0, 0, 0, 20)
			p.translate(p.width / 2, p.height / 2)
		},

		draw: function(p) {
			p.background(0, 0, 0, .05);

			let t = p.millis() * .001
			let loopPct = (t / 6) % 1
		
			p.push()
			p.translate(p.width / 2, p.height / 2)
		
			// Here's a function to draw a flowers that fades out as it ages
			function drawFlower(loopPct) {
		
				let size = 30 * loopPct
				let hue = 240 + (10 * t)%60

				// Draw the center
				p.noStroke()
				p.fill(60, 100, 75*loopPct, t)
				p.circle(0, 0, size)
			
				p.fill(hue, 70, 30, 1)
				p.stroke(hue, 70, 30, 1)
			
				p.beginShape()
				let flowerPts = 7
			
				for (var i = 0; i < flowerPts; i++) {
			
					p.rotate(2*Math.PI/flowerPts)
					p.ellipse(0, 2*size/3, size/2, size)
				}
				p.endShape()
			}
		
			let flowerCount = 5
			for (var i = 0; i < flowerCount; i++) {
			
				let bounceHeight = 15
				let bounceFrequency = 10
				let bounceX = Math.sin(loopPct * bounceFrequency) * bounceHeight
			
				let x = i*80 - bounceX - 2*p.width/5
				let y = 2*p.height/5 - loopPct*p.height
			
				p.push()
				p.translate(x, y)
			
				drawFlower(loopPct)
				p.pop()
			}
			p.pop()
		}
	},

	{
		title: " ",

		setup: function(p) {
			p.background(30, 70, 80, 20)
			p.translate(p.width / 2, p.height / 2)
		},

		// Both draw and setup have access to the processing object "p"
		draw: function(p) {
			// Each frame, draw a light gray background
			p.background(30, 70, 80, .05);
			p.translate(p.width / 2, p.height / 2)

			let t = p.millis()*.001

			let theta = 1.5*t
			let r = 100
			let radius = 65

			let x = 1.4*r * Math.cos(3*theta)
			let y = 1.7 * r * Math.sin(theta)

			let hue = (t*35)%360
			
			// // Make a drop shadow
			p.stroke(hue, 100, 39)
			p.fill(hue, 100, 40, 1)
			p.circle(x, y, radius/2)
		}
	},

	{
		title: " ",

		// Both draw and setup have access to the processing object "p"
		draw: function(p) {

			p.background(120, 100, 20)

			let t = p.millis() * .001
			let loopPct = (t / 6) % 1
			let size = 30 * loopPct
			let hue = 60-(10 * t)%60

			p.push()
			p.translate(p.width / 2, p.height / 2)
		
			// Make a green gradient by stacking circles
			for (var i = 0; i < 10; i++) {
				p.noStroke()
				p.fill(30 + i * 10, 60, 32, .2)
				let r = 1 + .15 * i
				p.ellipse(0, 0, r * 170, r * 170)
			}

			p.noStroke()
			p.fill(60, 50, 50, .8)
			p.circle(0, 0, 75)

			p.beginShape()
			let flowerPts = 5
			
			for (var j = 0; j < 3; j++) {
				p.rotate(Math.PI*t/10)

				p.strokeWeight(5)
				p.stroke(0, 30, 40, .2)
				p.fill(0, 40, 78, .6)

				for (var i = 0; i < flowerPts; i++) {
			
					p.rotate(2*Math.PI/flowerPts)
					p.ellipse(0, 98, 65, 125)
				}

				p.strokeWeight(5)
				p.stroke(0, 30, 40, .2)
				p.fill(0, 45, 80, .5)
				p.rotate(Math.PI/flowerPts)

				for (var i = 0; i < flowerPts; i++) {
			
					p.rotate(2*Math.PI/flowerPts)
					p.ellipse(0, 92, 60, 110)
				}
				p.endShape()
			}
		}
	},

	{
		title: "Here is a little optical illusions - the background color doesn't change:",

		// Both draw and setup have access to the processing object "p"
		draw: function(p) {

			let t = p.millis()*.001

			for (var i = 0; i < 100 ; i++) {
				let x = p.width/10
				let y = p.width/10
				let noise = Math.sin(3*t)

				let hue = (t*50 + i)%360
				p.background(0, 0, 20)
				p.strokeWeight(5)
				p.stroke(hue, 100, 20)
				
				for (var j = 0; j < 11 ; j++) {
					p.line(10*x/2, (j+noise)*y/2, (10-j+noise)*x/2, 10*y/2)
					p.line(10*x/2, (j+noise)*y/2, (10+j+noise)*x/2, 10*y/2)
					p.line((j+noise)*x/2, 10*y/2, 10*x/2, (10+j+noise)*y/2)
					p.line((20-j+noise)*x/2, 10*y/2, 10*x/2, (10+j+noise)*y/2)
				}
			}
		}
	}
]