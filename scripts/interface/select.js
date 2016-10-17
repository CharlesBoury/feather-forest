
interface.select = {}

function initSelects() {
	/* fonction necessaire à l'accès des
	 * selects sous forme de variables
	 */

	// reset
	interface.select = {}

	// pour tous les selects
	var allSelects = document.querySelectorAll("select")
	for(var i = 0; i < allSelects.length; i++) {

		// creer une variable pour le select
		// accessible comme ca : interface.select.id
		registerSelect(allSelects[i].id)
	}
}



function registerSelect(id) {
	Object.defineProperty(interface.select, id, {
		get: ()  => {return getSelectValue(id   )},
		set: (x) => {       setSelectValue(id, x)},
		enumerable: true
	})
}

function selectHTML(nodeId, id, value, options) {
	function maybeSelected(opt) { return (value === opt)? 'selected' : ''}
	var result =
		labelHTML(nodeId, id)+
		'<select id="'+nodeId+'">'+
			options
				.map(opt => '<option '+maybeSelected(opt)+'>'+opt+'</option>')
				.reduce((a, b) => a+b, '')+
		'</select>'
	return result
}








function getSelectValue(id) {
	return document.getElementById(id).value
}
function setSelectValue(id, newValue) {
	document.getElementById(id).value = newValue
}
