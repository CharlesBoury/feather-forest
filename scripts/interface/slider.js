
interface.slider = {}

function initSliders() {
	/* fonction necessaire à l'affichage des valeurs
	 * et à l'accès des sliders sous forme de variables
	 */


	// reset
	interface.slider = {}

	// pour tous les sliders
	var allSliders = document.querySelectorAll("input[type=range]")
	for(var i = 0; i < allSliders.length; i++) {
		var node = allSliders[i]


		// afficher la valeur actuelle
		updateDisplay(node.id)

		// creer une variable pour le slider
		// accessible comme ca : interface.slider.id
		registerSilder(node.id)

		// ajouter un ecouteur (oninput)
		// qui mettra à jour l'affichage
		allSliders[i].addEventListener('input', function(e) {
			updateDisplay(this.id)
		})
	}
}

function updateDisplay(id) {
	// ecrit la valeur et le nom du slider dans les spans d'en dessous
	var slider = document.getElementById(id)
	var valeur = slider.parentNode.getElementsByClassName('valeur')[0]
	valeur.innerHTML = slider.value
}

function sliderHTML(nodeId, id, value, min, max, step) {
	var result =
		labelHTML(nodeId, id)+
		'<span class="valeur">valeur</span>'+
		'<input id="'+nodeId+'" type="range"'+
			'value="'+value+'" '+
			'min="'+min+'" '+
			'max="'+max+'" '+
			'step="'+step+'">'
	return result
}



function registerSilder(id) {
	Object.defineProperty(interface.slider, id, {
		get: ()  => {return getSliderValue(id   )},
		set: (x) => {       setSliderValue(id, x)},
		enumerable: true
	})
}

// Getters & Setters ! Magic !!

function getSliderValue(id) {
	return Number(document.getElementById(id).value)
}
function setSliderValue(id, newValue) {
	document.getElementById(id).value = newValue
	updateDisplay(id)
}






