class Flowers {

	constructor(aof) {
		this.aof = aof
		this.center = new Vector(0,0)
		this.color = new Vector(0,0,0)
		this.size = 0
		this.growingDistance = 0
		this.growingSpeed = 0
		this.numberOfPetals = 0
	}

	update(p, t, dt) {
		// No update needed here
		// Updates are good for if you want to maintain more complicated state 
	}

	draw(p) {
		let t = p.frameCount * .004

		// Set color 
		let color = this.aof.get("color")
		this.color.setTo((720*color)%360, 80, 50, 100)
		p.fill(this.color)

		// Set size 
		let sizeSlider = this.aof.get("size")
		p.scale((sizeSlider + 0.25) * 1.25)

		// Set growing distance and speed 
		let growingDistance = this.aof.get("growing distance")
		let growingSpeed = this.aof.get("growing speed")
		let growingScale = (growingDistance*40) * Math.sin(t * growingSpeed*5) - 60

		// stem
		p.strokeWeight(4);
		p.stroke(120, 40, 25);
		p.line(0, 0, -10, -70+growingScale);

		// leaf
		p.translate(0, growingScale)

		p.noStroke();
		p.rotate(Math.PI/6)
		p.fill(120, 40, 50);
		p.ellipse(11+growingScale/35, growingScale/20, 3.5-growingScale/30, 15-growingScale/10)
		p.rotate(-Math.PI/6)

		// flower
		p.translate(-10, -80)
	
		p.noStroke()
		p.fill(60, 100, 50)
		p.circle(0, 0, 13+5*sizeSlider)

		let petals = this.aof.get("number of petals")
		let numOfPetals = Math.round(6 + petals * 6)

		p.beginShape()
		p.rotate(2*Math.PI/1.2)
		for (var i = 0; i < numOfPetals; i++) {
			p.fill(this.color)
			p.ellipse(0, 4*(15+2*sizeSlider)/3-growingScale/9, 7*(17+2*sizeSlider-growingScale/10)/(2*numOfPetals), 15+2*sizeSlider-growingScale/10)
			p.rotate(2*Math.PI/numOfPetals)
		}
		p.endShape()
	}
}

Flowers.drawBackground = function(p) {
	p.background(190, 80, 90)
	p.noStroke()
	p.fill(120, 80, 90, 0.3)
	p.rect(0, 230, 600, 260)
	p.fill(120, 80, 90, 0.65)
	p.rect(0, 260, 600, 280)
	p.fill(120, 100, 90)
	p.rect(0, 280, 600, 400)
}

// Static properties for this class
Flowers.landmarks = {
	"Jasmine": [0.08, 0.80, 0.80, 0.30, 0.60],
	"Hibiscus": [0.010, 1.00, 1.00, 1.00, 0.30],
	"Daisy": [0.42, 0.35, 0.60, 0.40, 0.60],
	"Pansy": [0.35, 0.15, 1.00, 0.50, 0.50],
	"Sunflower": [0.57, 1.00, 0.20, 0.10, 0.00]
}

Flowers.labels = ["color", "size", "growing distance", "growing speed", "number of petals"]







