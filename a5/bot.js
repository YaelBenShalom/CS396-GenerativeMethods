class CocktailBot {
	constructor() {
		this.grammar = tracery.createGrammar(cocktailGrammar)
		this.grammar.addModifiers(baseEngModifiers)		
	}

	respondTo(s) {
		console.log("User said", s)

		// Sweet cocktail
		if (s.toLowerCase().includes("sweet")) {

			this.SweetCocktail = this.grammar.flatten("#SweetCocktails#")
			this.adjective = this.grammar.flatten("#adjectives#")

			this.post(`I think ${this.SweetCocktail} is ${this.adjective} cocktail`)
			this.post(`What do you think?`)

			this.CurrentCocktail = this.SweetCocktail
			this.CurrentFlavor = "sweet"
			
			return None
		}

		// Sour cocktail
		else if (s.toLowerCase().includes("sour")) {

			this.SourCocktail = this.grammar.flatten("#SourCocktails#")

			this.post(`I think you will like ${this.SourCocktail}`)
			this.post(`What do you think?`)

			this.CurrentCocktail = this.SourCocktail
			this.CurrentFlavor = "sour"

			return None
		}

		// Bitter cocktail
		else if (s.toLowerCase().includes("bitter")) {

			this.BitterCocktail = this.grammar.flatten("#BitterCocktails#")

			this.post(`You might like ${this.BitterCocktail}. It's a sophisticated cocktail`)
			this.post(`What do you think?`)

			this.CurrentCocktail = this.BitterCocktail
			this.CurrentFlavor = "bitter"

			return None
		}

		// Try different flavor
		if (s.toLowerCase().includes("different")) {

			this.CurrentFlavor = undefined

			this.post(`No problem!`)
			this.post(`So what type of cocktail do you like?`)

			return None
		}

		// Try different flavor
		if (s.toLowerCase().includes("another")) {

			if (this.CurrentFlavor == "sweet") {
				this.SweetCocktail = this.grammar.flatten("#SweetCocktails#")
				this.adjective = this.grammar.flatten("#adjectives#")
	
				this.post(`Mmmm let me think...`)

				open = 1
				setInterval(() => {
					if (open){
						this.post(`What about ${this.SweetCocktail}?`)
						open = 0
					}
				}, 2000)

				this.CurrentCocktail = this.SweetCocktail
				this.CurrentFlavor = "sweet"
			}

			else if (this.CurrentFlavor == "sour") {
				this.SourCocktail = this.grammar.flatten("#SourCocktails#")

				this.post(`Mmmm let me think...`)

				open = 1
				setInterval(() => {
					if (open){
						this.post(`What about ${this.SourCocktail}?`)
						open = 0
					}
				}, 2000)

				this.CurrentCocktail = this.SourCocktail
				this.CurrentFlavor = "sour"
			}

			else if (this.CurrentFlavor == "bitter") {
				this.BitterCocktail = this.grammar.flatten("#BitterCocktails#")
				this.bitterAdjective = this.grammar.flatten("#bitterAdjectives#")

				this.post(`Mmmm let me think...`)

				open = 1
				setInterval(() => {
					if (open){
						this.post(`What about ${this.BitterCocktail}?`)
						open = 0
					}
				}, 2000)

				this.CurrentCocktail = this.BitterCocktail
				this.CurrentFlavor = "bitter"
			}

			else {
				this.post(`You didn't tell me what type of cocktail you would like`)
				this.post(`Do you like sweet, sour or bitter cocktails?`)
			}

			return None
		}

		// Get recipe
		else if (s.toLowerCase().includes("recipe")) {

			if (this.CurrentCocktail == undefined) {
				this.post(`You didn't choose any cocktail`)
				this.post(`What type of cocktail do you like?`)

				return None
			}

			this.post(`Great choice!`)
			
			if (this.CurrentCocktail == "Piña Colada") {
				this.Ingredients = this.grammar.flatten("#PinaColadaIngredients#")
				this.Recipe = this.grammar.flatten("#PinaColadaRecipe#")
			}

			else if (this.CurrentCocktail == "Cosmopolitan") {
				this.Ingredients = this.grammar.flatten("#CosmopolitanIngredients#")
				this.Recipe = this.grammar.flatten("#CosmopolitanRecipe#")
			}

			else if (this.CurrentCocktail == "Classic Daiquiri") {
				this.Ingredients = this.grammar.flatten("#DaiquiriIngredients#")
				this.Recipe = this.grammar.flatten("#DaiquiriRecipe#")
			}

			else if (this.CurrentCocktail == "Aperol Spritz") {
				this.Ingredients = this.grammar.flatten("#AperolIngredients#")
				this.Recipe = this.grammar.flatten("#AperolRecipe#")
			}

			else if (this.CurrentCocktail == "Hurricane") {
				this.Ingredients = this.grammar.flatten("#HurricaneIngredients#")
				this.Recipe = this.grammar.flatten("#HurricaneRecipe#")
			}

			else if (this.CurrentCocktail == "Mai Tai") {
				this.Ingredients = this.grammar.flatten("#MaiTaiIngredients#")
				this.Recipe = this.grammar.flatten("#MaiTaiRecipe#")
			}

			else if (this.CurrentCocktail == "Classic Mojito") {
				this.Ingredients = this.grammar.flatten("#MojitoIngredients#")
				this.Recipe = this.grammar.flatten("#MojitoRecipe#")
			}

			else if (this.CurrentCocktail == "Classic Margarita") {
				this.Ingredients = this.grammar.flatten("#MargaritaIngredients#")
				this.Recipe = this.grammar.flatten("#MargaritaRecipe#")
			}

			else if (this.CurrentCocktail == "Tequila Sunrise") {
				this.Ingredients = this.grammar.flatten("#TequilaSunriseIngredients#")
				this.Recipe = this.grammar.flatten("#TequilaSunriseRecipe#")
			}

			else if (this.CurrentCocktail == "Cuba Libre") {
				this.Ingredients = this.grammar.flatten("#CubaLibreIngredients#")
				this.Recipe = this.grammar.flatten("#CubaLibreRecipe#")
			}

			else if (this.CurrentCocktail == "Sangria") {
				this.Ingredients = this.grammar.flatten("#SangriaIngredients#")
				this.Recipe = this.grammar.flatten("#SangriaRecipe#")
			}

			else if (this.CurrentCocktail == "Whiskey Sour") {
				this.Ingredients = this.grammar.flatten("#WhiskeySourIngredients#")
				this.Recipe = this.grammar.flatten("#WhiskeySourRecipe#")
			}

			else if (this.CurrentCocktail == "Tequila Sour") {
				this.Ingredients = this.grammar.flatten("#TequilaSourIngredients#")
				this.Recipe = this.grammar.flatten("#TequilaSourRecipe#")
			}

			else if (this.CurrentCocktail == "Pisco Sour") {
				this.Ingredients = this.grammar.flatten("#PiscoSourIngredients#")
				this.Recipe = this.grammar.flatten("#PiscoSourRecipe#")
			}

			else if (this.CurrentCocktail == "Vodka Sour") {
				this.Ingredients = this.grammar.flatten("#VodkaSourIngredients#")
				this.Recipe = this.grammar.flatten("#VodkaSourRecipe#")
			}

			else if (this.CurrentCocktail == "Old-Fashioned") {
				this.Ingredients = this.grammar.flatten("#OldFashionedIngredients#")
				this.Recipe = this.grammar.flatten("#OldFashionedRecipe#")
			}

			else if (this.CurrentCocktail == "Negroni") {
				this.Ingredients = this.grammar.flatten("#NegroniIngredients#")
				this.Recipe = this.grammar.flatten("#NegroniRecipe#")
			}

			else if (this.CurrentCocktail == "Martini") {
				this.Ingredients = this.grammar.flatten("#MartiniIngredients#")
				this.Recipe = this.grammar.flatten("#MartiniRecipe#")
			}

			else if (this.CurrentCocktail == "Manhattan") {
				this.Ingredients = this.grammar.flatten("#ManhattanIngredients#")
				this.Recipe = this.grammar.flatten("#ManhattanRecipe#")
			}
			
			this.post(`The required ingredients are: ${this.Ingredients}`)
			this.post(`The recipe for ${this.CurrentCocktail} is: ${this.Recipe}`)
			this.post(`Enjoy your cocktail! 🍹🍸🍷`)
			this.post(`What would you like to try next?`)

			this.CurrentCocktail = undefined

			return None
		}

		return `I've never heard of ${s}... Would you like to try a different cocktail?`
	}
}