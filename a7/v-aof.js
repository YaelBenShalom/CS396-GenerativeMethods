// Components for exploring an array of floats

//====================================================================================
// Breeding multiple arrays of floats

Vue.component("aof-population", {
	template: `<div class="aof-population section">
		<div>
		<br>
			Number of flowers:
			<select v-model="controls.count" @change="reroll">
				<option>1</option><option>3</option><option>5</option><option>7</option><option>10</option><option>15</option>
			</select>
			
			<button class="randomized-button" @click="reroll">Randomize All</button>
			<div>
				<br>
				Animate: <select v-model="controls.animationMode"><option v-for="opt in animationModes">{{opt}}</option></select>
				<button class="play-button" @click="controls.isAnimating = !controls.isAnimating">{{controls.isAnimating?"▶️":"⏸"}}</button>
			</div>
		</div>
	</div>`,

	mounted() {
		population.nextGeneration()
	},
	methods: {
		reroll() {
			population.nextGeneration({count:controls.count})
		}
	},

	data() {
		return {
			controls:controls,
			animationModes: ["wander"]
		}
	},
})

//====================================================================================
// Looking at landmarks

Vue.component("aof-landmarks", {
	template: `<div class="aof-population section">
		<div>
			<br>
			<button class="randomized-button" v-for="(landmarkAOF,landmarkName) in controls.selectedClass.landmarks" @click="controls.selectedAOF.setValues(landmarkAOF, landmarkName)">{{landmarkName}}</button>
		</div>
	</div>`,
	data() {
		return {
			controls:controls,
		}
	},
	// props: ["app"]
})

//====================================================================================
// A set of sliders for a single AOF

Vue.component("aof-sliders", {
	template: `<div class="aof-view section" v-if="aof">
		<div class="contrast title">AOF: {{aof.idNumber}}</div>
		<div class="controls">
			<button class="randomized-button" @click="aof.randomize()">Randomize Selected</button>
		</div>
		<table>
			<tr v-for="(value,valIndex in aof.values">
				<td class="label">{{aof.labels[valIndex]}}</td>
				<td class="slider-cell">
					<input type="range" min="0" max="1" :step=".001" class="slider" :value="value" @input="ev => change(ev, valIndex)" />
				</td>

			</tr>
		</table>
		<br>
		<input style="width: 38%; text-align: center" v-model="aofinput" @keyup.enter='setFromInput'>
		
	</div>
	// <div v-else>
	// ((no aof))
	// </div>
	`,

	mounted() {
		this.updateValues()
	},
	watch: {
		"aof.values"() {
			this.updateValues()
		}
	},
	methods: {
		updateValues() {
			if (this.aof)
				this.aofinput = this.aof.valuesToString()
		},
		setFromInput() {
			let val = JSON.parse(this.aofinput)
			this.aof.setValues(val)
		},
		change(ev,  valIndex) {
			let val = parseFloat(ev.target.value)
			this.aof.set(valIndex, val)
		}
	},
	data() {
		return {
			animationMode: undefined,
			aofinput: ""
		}
	},
	props: ["aof"]
})