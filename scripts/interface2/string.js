



interface.string = {
	asNode: (component,propertyName) => {
		let elem = document.createElement('div')
			elem.className = "param"
			elem.innerHTML = interface.string.rawHTML(component,propertyName)

		interface.string.bindToInterface(component, propertyName)

		return elem
	},

	rawHTML: (component, propertyName) => { // pure function
		let nodeID  = getNodeID(component,propertyName)
		let value   = component[propertyName]

		function maybeSelected(opt) {return (value===opt)?'selected':''}

		return	`<label for=${nodeID}>${propertyName}</label>`+
				`<input id=${nodeID} type=text value=${value}>`
	},

	bindToInterface: (component, propertyName) => {
		let nodeID = getNodeID(component,propertyName)

		Object.defineProperty(component, propertyName, {
			get: ()  => {return document.getElementById(nodeID).value},
			set: (x) => {document.getElementById(nodeID).value = x}
		})
	}
}