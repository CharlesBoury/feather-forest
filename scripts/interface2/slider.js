



interface.slider = {
	asNode: (component,propertyName) => {
		let elem = document.createElement('div')
			elem.className = "param"
			elem.innerHTML = interface.slider.rawHTML(component,propertyName)
			elem.querySelector('input').addEventListener('input',function(event) {
				interface.slider.updateDisplay(getNodeID(component,propertyName))
			})

		interface.slider.bindToInterface(component, propertyName)

		return elem
	},

	rawHTML: (component, propertyName) => { // pure function
		let nodeID = getNodeID(component,propertyName)
		let value  = component[propertyName]
		let min    = component.meta.min[propertyName]
		let max    = component.meta.max[propertyName]
		let step   = component.meta.step[propertyName]

		return	`<label for=${nodeID}>${propertyName}</label>`+
				`<span class="valeur">${value}</span>`+
				`<input id=${nodeID} type=range value=${value} min=${min} max=${max} step=${step}>`
	},

	bindToInterface: (component, propertyName) => {
		let nodeID = getNodeID(component,propertyName)

		Object.defineProperty(component, propertyName, {
			get: ()  => {
				return Number(document.getElementById(nodeID).value)
			},
			set: (x) => {
				document.getElementById(nodeID).value = x
				interface.slider.updateDisplay(nodeID)
			}
		})
	},


	//------------------------------------------------------------------------
	//
	//  Specifique
	//


	
	updateDisplay: (nodeID) => {
		// ecrit la valeur et le nom du slider dans le span d'à côté
		let sliderNode = document.getElementById(nodeID)
		let valeurNode = sliderNode.parentNode.getElementsByClassName('valeur')[0]
		valeurNode.innerHTML = sliderNode.value
	}
}