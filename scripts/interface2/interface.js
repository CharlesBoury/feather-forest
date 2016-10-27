
let interface = {}

let inspectorNode      = document.getElementById('Inspector')
let entitiesListNode   = document.getElementById('EntitiesList')
let systemsListNode    = document.getElementById('SystemsList')
let componentsListNode = document.getElementById('ComponentsList')


Object.defineProperty(this, "selectedEntityID", {
	get: ()  => {return entitiesListNode.value},
	set: (x) => {
		if (x !== entitiesListNode.value) {
			deselectEntity()
			entitiesListNode.value = x
			createInspectorFor(x)
		}
	}
})

function getNodeID(component,propertyName) {
	return component.constructor.name+'.'+propertyName
}

function unbind(component,propertyName) {
	let temp = component[propertyName]
	delete     component[propertyName] // remove getter and setter
	           component[propertyName] = temp
}

function deleteNodeWithID(id) {
	let node = document.getElementById(id)
	// delete HTML node
	node.parentNode.removeChild(node)
}

function defautNode(component, propertyName) {
	let elem = document.createElement('div')
		elem.className = "param"
		elem.innerHTML = defautRawHTML(component,propertyName)
	return elem
}
function defautRawHTML(component, propertyName) {
	let nodeID = getNodeID(component,propertyName)
	let type = component.meta.types[propertyName]

	return `<label for=${nodeID}>${propertyName}</label>`+
		   `<i id=${nodeID}>no interface for type: ${type}</i>`
}


//------------------------------------------------------------------------
//
//  Hierarchy
//

function createEntitiesList(entities) {
	// create HTML

	entitiesListNode.innerHTML =
		entities
			.map(e => '<option>'+e.id+'</option>')
			.reduce((a, b) => a+b, '')

	// set size
	entitiesListNode.setAttribute('size', Math.max(entities.length,2))
	// attach event to open Inspector
	entitiesListNode.addEventListener('input', function(e) {
		deleteInspector()
		let id = e.target.value
		createInspectorFor(id)
	})
	// entitiesListNode.value = selectedEntityID

	// title with entities count
	var title = document.querySelector("#EntitiesCount").innerHTML = entities.length+" Entities"

	entitiesListNode.value = ""
}

function deselectEntity() {
	entitiesListNode.value = ""
	deleteInspector()

}

function deleteEntity(id) {
	deleteInspector()
	deleteEntityWithID(id, entities)
	createEntitiesList(entities)
}

function createEntityInterface() {
	let newEntity = createEntity()
	createEntitiesList(entities)
	entitiesListNode.value = newEntity.id
	createInspectorFor(newEntity.id)
}

//------------------------------------------------------------------------
//
//  Inspector
//

function createInspectorFor(entityID) {
	deleteInspector()
	createEntityVue(getEntityWithID(entityID, entities))
}

function deleteInspector() {
	if (inspectorNode.innerHTML !== "") {
		// console.log("deleting inspector...")
		let entityID = document.querySelector(".entityID").id
		// console.log("    id of entity: "+entityID)
		deleteEntityVue(getEntityWithID(entityID, entities))
	}
}


function createEntityVue(entity) {
	// console.log(`creating vue for ${entity.id}...`)
	let entityIDnode = document.createElement('div')
		entityIDnode.className = "entityID"
		entityIDnode.id = entity.id
		entityIDnode.innerHTML = entity.id
		inspectorNode.insertAdjacentElement('afterbegin', entityIDnode)

	let componentsNode = document.createElement('div')
		componentsNode.id = "components"
		inspectorNode.insertAdjacentElement('beforeend', componentsNode)

	insertButtonAddComponent()

	for (component in entity.components) {
		createComponentVue(entity.components[component])
	}
}

function deleteEntityVue(entity) {
	// console.log(`deleting vue for ${entity.id}...`)
	for (component in entity.components) {
		deleteComponentVue(entity.components[component])
	}
	inspectorNode.innerHTML = ""
}

function createComponentVue(component) {
	// console.log(`creating vue for ${component.constructor.name}...`)
	let componentNode           = document.createElement('div')
		let componentIsEnabled = getSelectedEntity().enabledComponents[component.constructor.name]
		if(componentIsEnabled) { componentNode.className = "component"          }
		else                   { componentNode.className = "component disabled" }
		componentNode.id        = component.constructor.name
	document
		.getElementById('components')
		.insertAdjacentElement('beforeend', componentNode)

	let componentNameNode = document.createElement('div')
	componentNameNode.className = "componentName"
	componentNameNode.innerHTML = component.constructor.name

	let disableButton = document.createElement('button')
		disableButton.innerHTML = "z"
		disableButton.className = "disableComponent"
		disableButton.addEventListener("click", function(){
			disableComponentFromVue(component)
		})

	let deleteButton = document.createElement('button')
		deleteButton. innerHTML = "x"
		deleteButton.className = "deleteComponent"
		deleteButton.addEventListener("click", function(){
			deleteComponentFromVue(component)
		})

	let buttons = document.createElement('div')
		buttons.insertAdjacentElement('beforeend', disableButton)
		buttons.insertAdjacentElement('beforeend', deleteButton)
		componentNameNode.insertAdjacentElement('beforeend', buttons)
	
	componentNode.insertAdjacentElement('afterbegin', componentNameNode)

	for (property in component) {
		createPropertyVue(component, property, componentNode)
	}
}


function deleteComponentVue(component) {
	// console.log(`deleting vue for ${component.constructor.name}...`)
	for (propertyName in component) {
		deletePropertyVue(component, propertyName)
	}
	if (component !== undefined) {
		deleteNodeWithID(component.constructor.name)

	}
}


function createPropertyVue(component, propertyName, parentNode) {
	let type = component.meta.types[propertyName]

	let propertyAsNode
	if (interface[type] !== undefined) propertyAsNode = interface[type].asNode(component, propertyName)
	else                               propertyAsNode = defautNode(component, propertyName)
	parentNode.insertAdjacentElement('beforeend', propertyAsNode)

	// console.log(`|    created vue for ${getNodeID(component,propertyName)}`)
}

function deletePropertyVue(component, propertyName) {
	unbind(component, propertyName) // a faire avant de detruire le html
	// sinon les getters et les setters sont perdus

	let nodeID = getNodeID(component,propertyName)
	let nodeToDelete = document.getElementById(nodeID).closest(".param")
	// delete HTML node
	nodeToDelete.parentNode.removeChild(nodeToDelete)

	// console.log(`|    deleted vue for ${getNodeID(component,propertyName)}`)
}



//------------------------------------------------------------------------
//
//  Systems
//


function createSystemsList(systems) {
	systemsListNode.innerHTML = ''
	for (system in systems) {
		systemsListNode.innerHTML += '<option>'+system+'</option>'
	}
	systemsListNode.setAttribute('size', systemsListNode.children.length)
}


//------------------------------------------------------------------------
//
//  Components
//


function createComponentsList(components) {
	componentsListNode.innerHTML = ''
	for (component in components) {
		componentsListNode.innerHTML += '<option>'+component+'</option>'
	}
	componentsListNode.setAttribute('size', componentsListNode.children.length)
}







function deleteComponentFromVue(component) {
	let entity = getEntityWithID(selectedEntityID, entities)
	if (entity !== undefined) {
		entity.removeComponent(component.constructor.name)
		deleteComponentVue(component)
	}
}

function disableComponentFromVue(component) {
	let entity = getEntityWithID(selectedEntityID, entities)
	if (entity !== undefined) {
		entity.toggleComponent(component.constructor.name)
		let componentNode = document.querySelector("#"+component.constructor.name)
		if(componentNode.className === "component") {
			componentNode.className = "component disabled"
		} else {
			componentNode.className = "component"
		}
	}
}

function createComponentFromVue(component) {
	let entity = getEntityWithID(selectedEntityID, entities)
	let componentName = component.constructor.name
	if (entity !== undefined && !entity.hasComponents(componentName)) {
		entity.addComponent(component)
		createComponentVue(entity.components[componentName])
	}
}


function createNodeChooseComponent() {
	let entity = getEntityWithID(selectedEntityID, entities)
	let missingComponents = []
	if (entity !== undefined) {
		for (component in components) {
			if (!entity.hasComponents(component)) {
				missingComponents.push(component)
			}
		}
		let selectComponentNode = document.createElement('select')
		for (c of missingComponents) {
			selectComponentNode.innerHTML += `<option>${c}</option>`
		}
		deleteNodeWithID("AddComponent")

		let validerNode = document.createElement('button')
			validerNode.innerHTML = "ok"
			validerNode.addEventListener('click', function() {

				let chosenComponentName = document.querySelector("#AddComponent select").value
				createComponentFromVue(new components[chosenComponentName]())
				deleteNodeWithID("AddComponent")
				insertButtonAddComponent()
			})

		let addComponentEtape2Node = document.createElement('div')
		addComponentEtape2Node.id = "AddComponent"
		addComponentEtape2Node.insertAdjacentElement('beforeend', selectComponentNode)
		addComponentEtape2Node.insertAdjacentElement('beforeend', validerNode)


		inspectorNode.insertAdjacentElement('beforeend', addComponentEtape2Node)
	}
}


function insertButtonAddComponent() {
	let addComponentNode = document.createElement('button')
	addComponentNode.id = "AddComponent"
	addComponentNode.innerHTML = "new component"
	addComponentNode.addEventListener('click', function(){createNodeChooseComponent()})
	inspectorNode.insertAdjacentElement('beforeend', addComponentNode)
}