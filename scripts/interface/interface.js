
// contient les variables designer
var interface = {}


var inspectorNode      = document.getElementById('Inspector')
var entitiesListNode   = document.getElementById('EntitiesList')
var systemsListNode    = document.getElementById('SystemsList')
var componentsListNode = document.getElementById('ComponentsList')

// Object.defineProperty(window, "selectedEntityID", {
// 	get: ()  => {
// 		return (entitiesListNode.value === "") ? undefined : entitiesListNode.value
// 	},

// 	set: (x) => {
// 		entitiesListNode.value = x},

// 	enumerable: true
// })

function initInterfaceVariables() {
	interface = {}
	initSliders()
	initSelects()
	initCheckBoxes()
	initNumbers()
	initStrings()
	initColors()
}
/*
interface = {
	number: {
		x:30,
		y:120,
		time:0.12
	}
	slider: {
		alpha:1,
		speed:0.2
	},
	etc...
}
*/



//------------------------------------------------------------------------
//
//  EntitiesList
//

function createEntitiesList(entities) {
	// create HTML

	entitiesListNode.innerHTML =
		entities
			.map(e => '<option>'+e.id+'</option>')
			.reduce((a, b) => a+b, '')

	// set size
	entitiesListNode.setAttribute('size', entities.length)
	// attach event to open Inspector
	entitiesListNode.addEventListener('input', function() {
		selectEntityToInspect(entitiesListNode.value, entities)

	})
	// entitiesListNode.value = selectedEntityID

	// title with entities count
	var title = document.querySelector("#EntitiesListHeader .title").innerHTML = entities.length+" Entities"
}

function selectEntityToInspect(newID, entities) {
	console.log("debut select: "+selectedEntityID)

	if (selectedEntityID !== undefined) {
		unbindEntityPropertiesToInterface(
			getEntityWithID(selectedEntityID, entities)
		)
	}

	var entity = getEntityWithID(newID, entities)
	selectedEntityID = newID
	console.log("create inspector: "+selectedEntityID)
	inspectorNode.innerHTML = entityAsHTML(entity)
	initInterfaceVariables()
	bindEntityPropertiesToInterface(entity)

	console.log("fin select: "+selectedEntityID)
}


function deselectEntityToInspect(entities) {
	if (selectedEntityID === undefined) return

	// need to unbind, otherwise previous entities are still binded to 
	unbindEntityPropertiesToInterface(
		getEntityWithID(selectedEntityID, entities)
	)
	// delete Inspector
	inspectorNode.innerHTML = ""

	selectedEntityID = undefined
	entitiesListNode.value = ""

}

function deleteSelectedEntity(id,list) {
	if (id !== undefined) {
		deselectEntityToInspect(list)
		deleteEntityWithID(id,list)
		createEntitiesList(entities)
		
	}
}


//------------------------------------------------------------------------
//
//  Systems, and Components lists
//


function createSystemsList(systems) {
	systemsListNode.innerHTML = ''
	for (system in systems) {
		systemsListNode.innerHTML += '<option>'+system+'</option>'
	}
	systemsListNode.setAttribute('size', systemsListNode.children.length)
}

function createComponentsList(components) {
	componentsListNode.innerHTML = ''
	for (component in components) {
		componentsListNode.innerHTML += '<option>'+component+'</option>'
	}
	componentsListNode.setAttribute('size', componentsListNode.children.length)
}



//------------------------------------------------------------------------
//
//  Inspector
//

function createInspector(id, list) {
	// supprInspector()
	var entity = getEntityWithID(id, list)
	inspectorNode.innerHTML = entityAsHTML(entity)
	//bindEntityPropertiesToInterface(entity)
}


function entityAsHTML(entity) {
	var result = ''
	result += '<div class="entityID" id="'+entity.id+'">'+entity.id+'</div>'
	for (component in entity.components) {
		result +=
		'<div class="component">'+
			componentAsHTML(entity.components[component])+
		'</div>'
	}
	return result
}

function componentAsHTML(component) {
	var result = '<div class="componentName '+component.constructor.name+'">'+component.constructor.name+'</div>'
	for(property in component) {
		if (property !== 'meta')
		result +=
			'<div class="param">'+
				propertyAsHTML(component, property)+
			'</div>'
	}
	return result
}

function propertyAsHTML(component, property) {
	var value  = component[property]
	var type   = component.meta.types[property]
	var nodeId = component.constructor.name+'.'+property

	if (type === 'number') {
		var min, max, step
		// test existence des meta non-obligatoires (sinon bug bloquant)
		if (component.meta.min )  min = component.meta.min[property]
		if (component.meta.max )  max = component.meta.max[property]
		if (component.meta.step) step = component.meta.step[property]
		return numberHTML(nodeId, property, value, min, max, step)
	}
	if (type === 'string') {
		return stringHTML(nodeId, property, value)
	}
	if (type === 'slider') {
		var step = component.meta.step[property]
		var min  = component.meta.min[property]
		var max  = component.meta.max[property]
		return sliderHTML(nodeId, property, value, min, max, step)
	}
	if (type === 'checkbox') {
		return checkBoxHTML(nodeId, property, value)
	}
	if (type === 'select') {
		var options = component.meta.options[property]
		return selectHTML(nodeId, property, value, options)
	}
	return property + ' <i>no interface for type: ' + component.meta.types[property]+'</i>'
}

function labelHTML (nodeId, name) {
	return '<label for="'+nodeId+'">'+name+'</label>'
}



//------------------------------------------------------------------------
//
//  Binders
//

function bindable(propertyType) {
	var ok = ['number', 'string','slider','checkbox','select']
	return ok.filter(x=>x==propertyType).length !== 0
}

function bindEntityPropertiesToInterface(entity) {
	console.log("bind properties of "+ entity.id)
	// for each property of each component
	for (component in entity.components) {
		for(property in entity.components[component]) {
			// except if its type is unbindable
			var propertyType = entity.components[component].meta.types[property]
			if (bindable(propertyType)) {
				// bind it to its interface.
				var nodeId = component+'.'+property
				bindObjectPropertyToInterface(entity.components[component], property, nodeId)
			}
		}
	}
}

function unbindEntityPropertiesToInterface(entity) {
	console.log("unbind properties of "+ entity.id)
	if (entity === undefined) return
	// for each property of each component
	for (component in entity.components) {
		for(property in entity.components[component]) {
			// except if its name is meta or anims,
			if (property !== 'meta') {
				// bind it to its interface.
				unbindObjectPropertyToInterface(entity.components[component], property)
			}
		}
	}
}

function bindObjectPropertyToInterface(o, key, nodeId) {
	var type = o.meta.types[key]
	Object.defineProperty(o, key, {
		get: ()  => {return interface[type][nodeId]    },
		set: (x) => {       interface[type][nodeId] = x}
	})
}

function unbindObjectPropertyToInterface(o, key) {
	var temp = o[key]
	console.log("    unbind "+o.constructor.name+'.'+key)
	delete o[key] // remove getter and setter
	o[key] = temp
}





