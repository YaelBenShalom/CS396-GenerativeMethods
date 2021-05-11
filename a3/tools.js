
let positions = []

// You may want to change these starting values
let tool = {
	background: [60,50,80],
	color: [200,80,70],
	size: 1,
	mode: "pencil",
}

let tools = {
	
	clear(p, size, background, color) {

		p.background(...background)
	},

	erase(p, size, background, color) {

		let mouse = [p.mouseX, p.mouseY]
		p.noStroke()
		p.fill(...background)
		p.circle(...mouse, 10*size)
	},

	pen(p, size, background, color) {

		p.stroke(...color)
		p.strokeWeight(size)
		p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY)
	},

	StringPen(p, size, background, color) {

		let t = p.millis()*.001
		let mouse = [p.mouseX, p.mouseY]
		positions.push(mouse)
		

		// Make a copy of the color, so we can safely mess with it
		let lineColor = color.slice()
		lineColor[2] += Math.random() + 200*p.noise(t*4) - 100
		
		p.noFill()
		p.stroke(...lineColor, .5*Math.random())
		p.strokeWeight(size)

		size += 12*p.noise(t*.5)
		// Step backwards along the curve
		let jump = 8
		let count = 6
		
		p.beginShape()
		for (var i = 0; i < count; i++) {
			let index = positions.length - 1 - i*jump

			// Is this even *in* our positions?
			if (index > 0) {
				// Make a copy so we can mess with it
				let pos = positions[index].slice()
				// Random scribbles, or noise?

				pos[0] += i*size*(p.noise(i) - .5)
				pos[1] += i*size*(p.noise(i + 10) - .5)
				p.curveVertex(...pos)
			}
		
		p.endShape()
		}
	},

	SymmetricPen(p, size, background, color) {

		let color2 = new Vector(...color)
		color2[2] *= (Math.random())

		let x0 = p.width / 2
		let y0 = p.height / 2

		p.translate(x0, y0);

		let splatCount = 4
        for (let i = 0; i < splatCount; i++) {
            p.rotate(Math.PI/2)

			p.strokeWeight(1.5*size)
            p.stroke(...color2, Math.random());
            p.line(p.mouseX - x0, p.mouseY - y0 - size, p.pmouseX - x0, p.pmouseY - y0 - size)

			p.push()
            p.scale(1, -1)

			p.strokeWeight(1.5*size)
            p.stroke(...color2, Math.random())
            p.line(p.mouseX - x0, p.mouseY - y0 - size, p.pmouseX - x0, p.pmouseY - y0 - size)
			
            p.pop()
        }
    },

	bubblePen(p, size, background, color) {

		let mouse = new Vector(p.mouseX, p.mouseY)
		let color2 = new Vector(...color)
			
		// Add a bit of a drop background to help it stand out
		p.noStroke()
		p.fill(0, 0, 100, .1)
		p.circle(...mouse, 20*size*(1 + Math.random()))

		let splatCount = 10
		for (var i = 0; i < splatCount; i++) {
			let r = (Math.random() + 1)*size*5
			let theta = Math.PI*2 * i/splatCount
			let splatSize = 8*size*Math.random()
			
			let x = r*Math.cos(theta)
			let y = r*Math.sin(theta)

			color2[2] *= (2*Math.random())

			p.fill(...color2, Math.random())
			if (i%2 == 1)
				p.fill(...color, Math.random())
			
			p.circle(mouse[0] + x, mouse[1] + y, splatSize)
		}
	},

	RainbowSquares(p, size, background, color) {

		let t = p.millis()*.001
		let hue = (t*75)%360

		let mouse = new Vector(p.mouseX, p.mouseY)

		let x = p.mouseX
		let y = p.mouseY

		// Add a bit of a drop background to help it stand out
		p.noStroke()
		p.fill(hue, 50, 50, .1)
		p.circle(...mouse, 10*size*(1 + Math.random()))

		let emojiOptions = ["🟥","🟧","🟨", "🟩", "🟦", "🟪"]
		
		let index = Math.floor(emojiOptions.length * Math.random())
		let emoji = emojiOptions[index]

		p.fill(...color, 1)
		p.textSize(Math.sqrt(size)*10)

		if (Math.random() < .8)
			p.text(emoji, x, y)
	},

	LoveEmoji(p, size, background, color) {

		let emojiOptions = ["😍","🥰","😘","🤩", "❤️", "💖", "💞", "💘", "💗", "💓", "💕", "💝"]
		
		let index = Math.floor(emojiOptions.length * Math.random())
		let emoji = emojiOptions[index]
		
		let x = p.mouseX
		let y = p.mouseY

		x += 10*size*(Math.random() - .5)
		y += 10*size*(Math.random() - .5)

		p.fill(...color, 1)
		p.textSize(Math.sqrt(size)*10)

		if (Math.random() < .8)
			p.text(emoji, x, y)
	},

	NatureEmoji(p, size, background, color) {

		let emojiOptions = ["🌵","🌲","🌳","🌴", "🌱", "🌿", "🍀", "🍃", "🌷", "🌹", "🌻", "🌺", "🌸", "🌼"]
		
		let index = Math.floor(emojiOptions.length * Math.random())
		let emoji = emojiOptions[index]
		
		let x = p.mouseX
		let y = p.mouseY

		x += 10*size*(Math.random() - .5)
		y += 10*size*(Math.random() - .5)

		p.fill(...color, 1)
		p.textSize(Math.sqrt(size)*10)

		if (Math.random() < .2)
			p.text(emoji, x, y)
	},

	FairyEmoji(p, size, background, color) {

		let mouse = new Vector(p.mouseX, p.mouseY)

		// Add a bit of a drop background to help it stand out
		p.noStroke()
		p.fill(100, 100, 90, .05)
		p.circle(...mouse, 10*size*(1 + Math.random()))

		let emojiOptions = ["🧚🏻‍♀️","🧚🏻","🧚🏻‍♂️","🧚🏼‍♀️","🧚🏼","🧚🏼‍♂️","🧚🏽‍♀️","🧚🏽","🧚🏽‍♂️","🧚🏾‍♀️","🧚🏾","🧚🏾‍♂️","🧚🏿‍♀️","🧚🏿","🧚🏿‍♂️"]
		
		let index = Math.floor(emojiOptions.length * Math.random())
		let emoji = emojiOptions[index]
		
		let x = p.mouseX
		let y = p.mouseY

		x += 10*size*(Math.random() - .5)
		y += 10*size*(Math.random() - .5)

		p.fill(...color, 1)
		p.textSize(Math.sqrt(size)*10)

		if (Math.random() < .2)
			p.text(emoji, x, y)
	},

	BollsEmoji(p, size, background, color) {

		let emojiOptions = ["⚽️","🏀","🏈","⚾️", "🥎", "🏐", "🏉", "🥏", "🎱", "🪀"]
		
		let index = Math.floor(emojiOptions.length * Math.random())
		let emoji = emojiOptions[index]
		
		let x = p.mouseX
		let y = p.mouseY

		x += 10*size*(Math.random() - .5)
		y += 10*size*(Math.random() - .5)

		p.fill(...color, 1)
		p.textSize(Math.sqrt(size)*10)

		if (Math.random() < .8)
			p.text(emoji, x, y)
	},

	StarsEmoji(p, size, background, color) {
		
		let mouse = new Vector(p.mouseX, p.mouseY)

		// Add a bit of a drop background to help it stand out
		p.noStroke()
		p.fill(60, 100, 90, .08)
		p.circle(...mouse, 10*size*(1 + Math.random()))

		let emojiOptions = ["🌟","⭐️","✨"]
		
		let index = Math.floor(emojiOptions.length * Math.random())
		let emoji = emojiOptions[index]
		
		let x = p.mouseX
		let y = p.mouseY

		x += 10*size*(Math.random() - .5)
		y += 10*size*(Math.random() - .5)

		p.fill(...color, 1)
		p.textSize(Math.sqrt(size)*10)

		if (Math.random() < .4)
			p.text(emoji, x, y)
	},
}