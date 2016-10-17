
interface.string = {}

function initStrings() {
	/* fonction necessaire à l'accès des
	 * strings sous forme de variables
	 */

	// reset
	interface.string = {}

	// pour toutes les strings
	var allStrings = document.querySelectorAll("input[type=text]")
	for(var i = 0; i < allStrings.length; i++) {
		var node = allStrings[i]

		// creer une variable pour la string
		// accessible comme ca : interface.string.id
		registerString(node.id)
	}
}



function registerString(id) {
	Object.defineProperty(interface.string, id, {
		get: ()  => {return getStringValue(id   )},
		set: (x) => {       setStringValue(id, x)},
		enumerable: true
	})
}

function stringHTML(nodeId, id, value) {
	var result =
		labelHTML(nodeId, id)+
		'<input type="text" id="'+nodeId+'" value="'+value+'">'
	return result
}


function getStringValue(id) {
	return document.getElementById(id).value
}
function setStringValue(id, newValue) {
	document.getElementById(id).value = newValue
}
