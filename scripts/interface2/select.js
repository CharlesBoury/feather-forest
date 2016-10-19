



interface.select = {
	asNode: (component,propertyName) => {
		let elem = document.createElement('div')
			elem.className = "param"
			elem.innerHTML = interface.select.rawHTML(component,propertyName)

		interface.select.bindToInterface(component, propertyName)

		return elem
	},

	rawHTML: (component, propertyName) => { // pure function
		let nodeID  = getNodeID(component,propertyName)
		let value   = component[propertyName]
		let options = component.meta.options[propertyName]

		function maybeSelected(opt) {return (value===opt)?'selected':''}

		return	`<label for=${nodeID}>${propertyName}</label>`+
				`<select id=${nodeID}>${
					options.map(opt => '<option '+maybeSelected(opt)+'>'+opt+'</option>').reduce((a, b) => a+b, '')
				}</select>`
	},

	bindToInterface: (component, propertyName) => {
		let nodeID = getNodeID(component,propertyName)

		Object.defineProperty(component, propertyName, {
			get: ()  => {return document.getElementById(nodeID).value},
			set: (x) => {document.getElementById(nodeID).value = x}
		})
	}
}