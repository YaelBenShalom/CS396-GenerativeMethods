console.log("Hello, webpage not loaded yet")

// Run this function after the page is loaded
document.addEventListener("DOMContentLoaded", function(){
	console.log("Hello, webpage!")
});

// Run this function after a button is pressed
function buttonPress(){
	console.log("A button was pressed")
}