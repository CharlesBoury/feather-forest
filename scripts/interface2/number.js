



interface.number = {
	asNode: (component,propertyName) => {

		let elem = document.createElement('div')
			elem.className = "param"
			elem.innerHTML = interface.number.rawHTML(component,propertyName)
			elem.querySelector('label').addEventListener('mousedown',function(event) {
				interface.number.dragNumber(event, component, propertyName)
			})

		interface.number.bindToInterface(component, propertyName)

		return elem
	},

	rawHTML: (component, propertyName) => {
		let nodeID = getNodeID(component,propertyName)
		let value  = component[propertyName]
		let min, max, step
		if (component.meta.min  !== undefined) min  = component.meta.min[propertyName]
		if (component.meta.max  !== undefined) max  = component.meta.max[propertyName]
		if (component.meta.step !== undefined) step = component.meta.step[propertyName]

		return	`<label for="${nodeID}">${propertyName}</label>`+
				`<input type=number id=${nodeID} value=${value} `+
				((min  !== undefined) ? `min=${min} `  : ''      )+
				((max  !== undefined) ? `max=${max} `  : ''      )+
				((step !== undefined) ? `step=${step} `: 'step=1')+
				'>'
	},

	bindToInterface: (component, propertyName) => {
		let nodeID = getNodeID(component,propertyName)

		Object.defineProperty(component, propertyName, {
			get: ()  => {return Number(document.getElementById(nodeID).value)},
			set: (x) => {
				let elem = document.getElementById(nodeID)
				elem.value = x
				//capped if necessary
				if (elem.hasAttribute('min')) {
					elem.value = Math.max(elem.getAttribute("min"), elem.value)
				}
				if (elem.hasAttribute('max')) {
					elem.value = Math.min(elem.getAttribute("max"), elem.value)
				}
			}
		})
	},


	//------------------------------------------------------------------------
	//
	//  Specifique
	//


	dragNumber: (e, component, propertyName) => {
		let nodeID = getNodeID(component,propertyName)
		let previousPos = e.clientX
		let step = Number(document.getElementById(nodeID).step)
	
		if (e.button == 0) {
			document.addEventListener('mousemove', modifNumber)
			document.addEventListener('mouseup', finish)
		}
		function modifNumber(e) {
			let modif = (e.clientX - previousPos) * step
			// console.log('modif '+id+' de '+ modif)
			component[propertyName] += modif
			// on round sinon ya des erreurs d'arrondis partout
			// et le champ d'input est rouge
			component[propertyName] = roundAtDigits(component[propertyName], nombresApresLaVirgule(step))

			previousPos = e.clientX
		}

		function finish(e) {
			document.removeEventListener('mousemove', modifNumber)
			document.removeEventListener('mouseup', finish)
			// console.log('finish at '+e.clientX)
			// console.log('-----')
		}
	}
}