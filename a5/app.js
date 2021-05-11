

// Do setup
document.addEventListener("DOMContentLoaded", function(){
	new Vue({
		el: "#chat",
		template: `<div id="chat">
			<chat-widget :messages="messages" />

			<div class="controls">
				<div>
					<button @click="handleInput('I like sweet cocktails')">Sweet 🍹</button>
					<button @click="handleInput('I like sour cocktails')">Sour 🍸</button>
					<button @click="handleInput('I like bitter cocktails')">Bitter 🥃</button>
				</div>
				<br>
				<div>
					<button @click="handleInput('Give me the recipe!')">Get the recipe</button>
					<button @click="handleInput('Lets try a another cocktail')">Try another cocktail</button>
					<button @click="handleInput('Lets try a different flavor')">Try different flavor</button>
				</div>
			</div>

			
		</div>`,

		watch: {
			// currentInput() {
			// 	console.log('Input is now', this.currentInput)
			// },

			messages() {
				// console.log("messages", this.messages)
			}
		},

		methods: {
			sayKey() {
				console.log("KEY")
			},

			postToChat(text, owner, isSelf) {
				this.messages.push({
					text: text,
					isSelf: isSelf,
					owner: owner,
				})
			},

			enterInput() {
				let text = this.currentInput
				this.currentInput = ""

				
				this.handleInput(text)

			},

			handleInput(text) {
				// Does bot things
				this.postToChat(text, "🧍🏻", true)

				// Add to the messages in chat
			
				// Bot does something
				let output = this.bot.respondTo(text)

				setTimeout(() => {
					this.postToChat(output, "🧑🏻‍💼")
					
				}, Math.random()*100 + 400)

			}
		},

		mounted() {

			let open1 = 1;
			let open2 = 1;

			setInterval(() => {
				if (open1){
					this.postToChat("Hi! I'm the cocktailbot and I will be your bartender tonight", "🧑🏻‍💼")
					open1 = 0
				}
			}, 1000)

			setInterval(() => {
				if (open2){
					this.postToChat("What type of cocktail do you like?", "🧑🏻‍💼")
					open2 = 0
				}
			}, 2000)

			this.bot.post = (text) =>  {
				let open = 1;
				setInterval(() => {
					if (open){
						this.postToChat(text, "🧑🏻‍💼")
						open = 0
					}
				}, 1000)
			}
		},
		

		data() {
			return {
				// Store the bot
				bot: new CocktailBot(),

				// And the message
				messages: [],

				// And the current thing in the input
				currentInput: ""
			}
		}
	})	
})
