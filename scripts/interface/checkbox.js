
interface.checkbox = {}

function initCheckBoxes() {
	/* fonction necessaire à l'accès des
	 * checkboxes sous forme de variables
	 */

	// reset
	interface.checkbox = {}

	// pour tous les checkboxes
	var allCheckBoxes = document.querySelectorAll("input[type=checkbox]")
	for(var i = 0; i < allCheckBoxes.length; i++) {

		// creer une variable pour la checkBox
		// accessible comme ca : interface.checkbox.id
		registerCheckBox(allCheckBoxes[i].id)
	}
}



function registerCheckBox(id) {
	Object.defineProperty(interface.checkbox, id, {
		get: ()  => {return getCheckBoxValue(id   )},
		set: (x) => {       setCheckBoxValue(id, x)},
		enumerable: true
	})
}


function checkBoxHTML(nodeId, id, value) {
	var result =
		labelHTML(nodeId, id)+
		'<input id="'+nodeId+'" type="checkbox"'+
		((value === true) ? 'checked="checked"' : '')+
		' >'
	return result
}



function getCheckBoxValue(id) {
	return document.getElementById(id).checked
}
function setCheckBoxValue(id, newValue) {
	document.getElementById(id).checked = newValue
}
