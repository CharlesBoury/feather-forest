
let entities = []
var monEntite
var selectedEntityID
let screen
let mouseDrag = false


function getEntityWithID(id, list) {
	return list.filter(x => x['id'] == id)[0]
}

function deleteEntityWithID(id,list) {
	entities = list.filter(x => x['id'] !== id)
}

function getSelectedEntity() {
	return getEntityWithID(selectedEntityID, entities)
}


function createEntity(entity) {
	if (entity === undefined) {
		entity = new Entity().addComponent(new components.Position())
	}
	entities.push(entity)
	return entity
}

var app = new PLAYGROUND.Application({

	container: "#Canvas",

	create: function() {
		this.loadImages.apply(this, assets)

		entities  = initialWorld
		monEntite = initialWorld[0]

		screen = {
			width:this.width,
			height: this.height
		}
		
		createEntitiesList(entities)
		createSystemsList(systems)
		createComponentsList(components)
		selectedEntityID = monEntite.id // creates Inspector
	},
	mousedown: function(event) {
		mouseDrag = true
	},

	mouseup: function() {
		mouseDrag = false
	},

	mousemove: function(event) {
		if (mouseDrag) {
			let entity = getSelectedEntity()
			if (entity === undefined) return

			entity.components.Position.x += event.original.movementX
			entity.components.Position.y += event.original.movementY
		}
	},

	step: function(dt) { // dt est en secondes (généralement = 0.016)

		// for each system
		for (system in systems) {
			// for each entity
			for (var i=0;i<entities.length;i++) {


				var entity = entities[i]
				// if entity has needed components
				if (entity.hasComponents.apply(entity, systems.neededComponents[system])) {

					// operate system with good arguments
					if      (system === "userInput"       ) systems[system](entity, this.keyboard.keys)
					else if (system === "moveMessage"     ) systems[system](entity,dt)
					else if (system === "move"            ) systems[system](entity,dt)
					else if (system === "collideMessage"  ) systems[system](entity,entities)
					else if (system === "timeline"        ) systems[system](entity,dt)
					else if (system === "replaceIfCollide") systems[system](entity, entities)
					else                                    systems[system](entity)
				}
			}
		}
	},

	render: function(dt) {

		// render
		//    need an entity with camera and position
		//    each Entity needs position

		let camera = entities.filter(x=>x.hasComponents('Camera'))[0]
		if (camera === undefined) {
			this.layer
				.clear("black")
				.font("14px Arial")
				.fillStyle('white')
				.fillText("No camera", 5,18)
			return			
		}
		if (!camera.hasComponents('Position')) {
			this.layer
				.clear("black")
				.font("14px Arial")
				.fillStyle('white')
				.fillText("camera needs a Position component", 5,18)
			return			
		}
		this.layer.clear(camera.components.Camera.bgColor)


		//------------------------------------------------------------------------
		//
		//  Game layer
		//

		let orderedDisplayableEntities = []
		/* [
			[entities on layer 1],
			[entities on layer 2],
			[entities on layer 3],
			etc...
		] */
		let displayableEntities = entities.filter(x=>x.hasComponents("Position", "Outfit"))
		let minLayer = displayableEntities[0].components.Outfit.meta.min.layer
		let currentLayer = minLayer
		for (var i = 0; i < getLayersNumber(entities); i++) {
			orderedDisplayableEntities[i] = displayableEntities.filter(x=>x.components.Outfit.layer === currentLayer)
			currentLayer ++
		}

		// sort the "0" layer by Position.y
		orderedDisplayableEntities[1].sort(
			function(a,b){
				if      (a.components.Position.y < b.components.Position.y) return -1
				else if (a.components.Position.y > b.components.Position.y) return 1
				else return 0
			}
		)

		for (eachLayer of orderedDisplayableEntities) {
			for(entity of eachLayer) {
			// loop to draw entities based on its layer

				let position = entity.components.Position
				let outfit   = entity.components.Outfit

				let image = this.images[outfit.imgName]
				if (image instanceof Node) {
					this.layer
						.a(outfit.alpha)
						.align(outfit.pivotX, outfit.pivotY)
						.globalCompositeOperation(outfit.blendMode)
						.drawImage(
							image,
							position.getScreenPos(camera).x,
							position.getScreenPos(camera).y)
						.ra() // restore alpha, hopefully 1
						.globalCompositeOperation("source-over")
						.realign()
					if (entity.id === selectedEntityID) {
						this.layer
							.strokeStyle("rgba(0,0,255,0.3)")
							.align(outfit.pivotX, outfit.pivotY)
							.strokeRect(position.getScreenPos(camera).x,position.getScreenPos(camera).y,image.width, image.height)
							.realign()
					}
				} else {
					// if imgName doesn't correspond to a particular asset
					this.layer
						.font("14px Arial")
						.fillStyle('blue')
						.fillText("imgName introuvable", position.getScreenPos(camera).x,position.getScreenPos(camera).y)
				}
			}
		}


		//------------------------------------------------------------------------
		//
		//  Display colliders
		//

		for(entity of entities.filter(x=>x.hasComponents("Position", "Collider"))) {
			let position = entity.components.Position
			let collider = entity.components.Collider
			this.layer
				.strokeStyle("darkred")
				.strokeRect(
					position.getScreenPos(camera).x+collider.x, 
					position.getScreenPos(camera).y+collider.y, 
					collider.L, 
					collider.H)
		}


		//------------------------------------------------------------------------
		//
		//  Display pivot for selected entity
		//

		for(entity of entities.filter(x=>x.hasComponents("Position"))) {

			if (entity.id === selectedEntityID) {
				let position = entity.components.Position
				this.layer
					.fillStyle("blue")
					.a(0.5)
					.fillCircle(
						position.getScreenPos(camera).x,
						position.getScreenPos(camera).y,
						10)
					.ra()
			}
		}



		// autres
		// this.layer
		// 	.font("14px Arial")
		// 	.fillStyle('white')
		// 	.fillText("totalTime : "+totalTime.toFixed(3), 5,18)
		// 	.fillText("cycle : "+cycle, 5,35)

		// document.getElementById('monEntite').innerHTML = '<div>monEntite</div>'+entityAsHTMLList(monEntite)

	}
})

var timelinePanel = new PLAYGROUND.Application({

	container: "#TimelinePanel",

	render: function(dt) {
		this.layer.clear("#25312c")
		let entity = getSelectedEntity()
		if (entity === undefined) return
		if (entity.hasComponents('Timeline')) {
			// timeline
			drawTimeline(this, 600, 8,entity.components.Timeline.time)
		}
	}
})