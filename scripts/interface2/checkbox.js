



interface.checkbox = {
	asNode: (component, propertyName) => {

		let elem = document.createElement('div')
			elem.className = "param"
			elem.innerHTML = interface.checkbox.rawHTML(component,propertyName)

		interface.checkbox.bindToInterface(component, propertyName)
		return elem
	},

	rawHTML: (component, propertyName) => {
		let nodeID = getNodeID(component,propertyName)
		let value  = component[propertyName]

		return `<label for=${nodeID}>${propertyName}</label>`+
			   `<input id=${nodeID} type=checkbox ${(value === true) ? "checked=checked" : ""}>`
	},

	bindToInterface: (component, propertyName) => {
		let nodeID = getNodeID(component,propertyName)

		Object.defineProperty(component, propertyName, {
			get: ()  => {return document.getElementById(nodeID).checked    },
			set: (x) => {       document.getElementById(nodeID).checked = x}
		})
	}
}