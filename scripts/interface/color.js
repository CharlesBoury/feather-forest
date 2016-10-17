
interface.color = {}

function initColors() {
	/* fonction necessaire à l'accès des
	 * colors sous forme de variables
	 */


	// reset
	interface.color = {}

	// pour toutes les colors
	var allColors = document.querySelectorAll("input[type=color]")
	for(var i = 0; i < allColors.length; i++) {

		// creer une variable pour la color
		// accessible comme ca : interface.color.id
		registerColor(allColors[i].id)
	}
}



function registerColor(id) {
	Object.defineProperty(interface.color, id, {
		get: ()  => {return getColorValue(id   )},
		set: (x) => {       setColorValue(id, x)},
		enumerable: true
	})
}




function getColorValue(id) {
	return document.getElementById(id).value
}
function setColorValue(id, newValue) {
	document.getElementById(id).value = newValue
}
