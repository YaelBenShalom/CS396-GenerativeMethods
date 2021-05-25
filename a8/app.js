// Setup and Vue things

Vue.component("occurrence", {
	template: `<div>
		{{occurrence.Emoji}} {{occurrence.Code}} {{occurrence.Occurrences}}
	</div>
	`,

	// What data does this get from its parent?
	props: ["occurrence"]
})

Vue.component("emoji_data", {
	template: `<div>
		{{emoji_data.no}} {{emoji_data.codes}} {{emoji_data.char}} {{emoji_data.name}} {{emoji_data.keywords}}
	</div>
	`,

	// What data does this get from its parent?
	props: ["emoji_data"]
})

Vue.component("emoji", {
    template: `
	<div class = "tooltips"> 
		{{occurrence.Emoji}}
		<div class="tooltiptext">
			<p style="font-size:60px">{{occurrence.Emoji}}</p>
			<p style="font-size:24px">{{occurrence.Occurrences}} occurrences</p>
			<p style="font-size:24px">({{(100*occurrence.Occurrences/TotOccurrences).toFixed(2)}}% of all emoji occurrences)</p>
		</div>
	</div>
	`,

	computed: {
		breed() {
			return this.emoji
		}
	},

	// What data does this get from its parent?
	props: ["emoji"]
})
const canvasW = 10000
const canvasH = 650
const MaxOccurrences = 754843296
const TotOccurrences = 9697034587
const NumOfOccurrences = 845


document.addEventListener("DOMContentLoaded", function(){
	
	// Create a new Vue 

	new Vue({
		template: `
		<div class="app">
			<div class="scroll" id="p5">
			</div>
		</div>`,
		el: "#app",
	
		computed: {
			occurrenceslice() {
				let slice_occurrences = this.occurrences.slice(0, NumOfOccurrences)
				return slice_occurrences
			},
			// emoji_data_slice() {
			// 	let slice_emoji_data = this.emoji_data.slice(0, NumOfOccurrences)
			// 	return slice_emoji_data
			// }
		},

		data() {
			return {
				occurrences: emojiOccurrenceData,
				emoji_data: emojiData,
				// emoji: emoji
			}
		},

		mounted() {
			// When this compentent is mounted, also create a processing instance 

		let p = new p5((p) => {
			// Save the noise fxn
			noise = p.noise


			let mousePos = []
			// Basic P5 setup
			p.setup = () => {
				p.createCanvas(canvasW, canvasH)
				p.colorMode(p.HSL)
				p.ellipseMode(p.RADIUS)

				p.fill(p.color('#FFF3F1'))
				p.strokeWeight(.5)
				p.stroke(0)
				p.rect(0,0,canvasW,canvasH)

				document.getElementById('distribution').innerHTML = `
				<div class="emoji-polaroid"
				</div>
				`
			}

			//-------------------------------------------
			// Mouse things

			p.mouseClicked = () => {
				if (p.mouseX > 0 && p.mouseX < canvasW && p.mouseY > 0 && p.mouseY < canvasH) {
					
				}
				
				// figure out where we clicked
			}
			//-------------------------------------------
			// Draw
			p.draw = () => {
				
				let weight = canvasW/NumOfOccurrences
				let max_height = (canvasH-18)/MaxOccurrences

				this.occurrenceslice.forEach((occurrence, index) => {
					
					p.fill(p.color('#FDD7BC'))
			
					// let result = emojiData.find( ({ char }) => char === occurrence.Emoji );
					// console.log(result)

					let height = Math.floor(occurrence.Occurrences*max_height)+15
					
					p.rect(index*weight, canvasH-height, weight, height)

					if (index*weight<p.mouseX && index*weight+weight>p.mouseX &&
						p.mouseY>canvasH-height && p.mouseY<canvasH){
							
						document.getElementById('distribution').innerHTML = `
						<div class="emoji-polaroid">
							<p style="font-size:36px">${occurrence.Emoji}</p>
							<p style="font-size:18px">${occurrence.Occurrences} occurrences</p>
							<p style="font-size:18px">(${(100*occurrence.Occurrences/TotOccurrences).toFixed(2)}% of all emoji occurrences)</p>
						</div>
						`
					}
				})
			
			}
		}, document.getElementById("p5"))
			}
		}) 
})
