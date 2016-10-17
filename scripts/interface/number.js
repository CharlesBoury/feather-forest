
interface.number = {}

function initNumbers() {
	/* fonction necessaire à l'accès des
	 * numbers sous forme de variables
	 */

	// reset
	interface.number = {}

	// pour tous les numbers
	var allNumbers = document.querySelectorAll("input[type=number]")
	for(var i = 0; i < allNumbers.length; i++) {
		var node = allNumbers[i]

		// creer une variable pour le number
		// accessible comme ca : interface.number.id
		// attention, par exemple :
		// id = "Position.x"

		registerNumbers(node.id)

		// s'assurer qu'il a un step
		if (!node.step) {
			node.step = 1
		}

		// ajouter event 'drag' au label correspondant
		// var label = document.querySelector('label[for='+node.id+']')
		var label = Array.from(
			document.getElementsByTagName('label'))
			.filter(x=>x.getAttribute("for") === node.id)
			[0]

		label.addEventListener('mousedown',
			function(e) {
				dragNumber(e, e.target.getAttribute('for'))
			})
	}
}



function registerNumbers(id) {
	Object.defineProperty(interface.number, id, {
		get: ()  => {return getNumberValue(id)},
		set: (x) => {       setNumberValue(id,x)},
		enumerable: true
	})
}


function numberHTML(nodeId, id, value, min, max, step) {
	var result =
		labelHTML(nodeId, id)+
		'<input type="number" id="'+nodeId+'" value="'+value+'"'+
		((min !== undefined)  ? 'min="' +min +'"' : '')+
		((max !== undefined)  ? 'max="' +max +'"' : '')+
		((step !== undefined) ? 'step="'+step+'"' : '')+
		'>'
	return result
}




function getNumberValue(id) {
	return Number(document.getElementById(id).value)
}
function setNumberValue(id, newValue) {
	var elem = document.getElementById(id)

	elem.value = newValue

	//capped if necessary
	if (elem.hasAttribute('min')) {
		elem.value = Math.max(elem.getAttribute("min"), elem.value)
	}
	if (elem.hasAttribute('max')) {
		elem.value = Math.min(elem.getAttribute("max"), elem.value)
	}
}





function dragNumber(e, id) {
	var previousPos = e.clientX
	var step = Number(document.getElementById(id).step)
	if (e.button == 0) {
		// console.log('start at '+previousPos)
		document.addEventListener('mousemove', modifNumber)
		document.addEventListener('mouseup', finish)
	}
	function modifNumber(e) {
		var modif = (e.clientX - previousPos) * step
		// console.log('modif '+id+' de '+ modif)
		interface.number[id] += modif
		// on round sinon ya des erreurs d'arrondis partout
		// et le champ d'input est rouge
		interface.number[id] = roundAtDigits(interface.number[id], nombresApresLaVirgule(step) )

		previousPos = e.clientX
	}

	function finish(e) {
		document.removeEventListener('mousemove', modifNumber)
		document.removeEventListener('mouseup', finish)
		// console.log('finish at '+e.clientX)
		// console.log('-----')
	}
}