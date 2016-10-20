
let entities = []
var monEntite
var selectedEntityID
let camera


function getEntityWithID(id, list) {
	return list.filter(x => x['id'] == id)[0]
}

function deleteEntityWithID(id,list) {
	entities = list.filter(x => x['id'] !== id)
}

function createEntity(entity) {
	if (entity ===undefined) entity = new Entity()
	entities.push(entity)
	return entity
}

var app = new PLAYGROUND.Application({

	container: "#canvas",

	create: function() {
		this.loadImages.apply(this, assets)

		entities  = initialWorld
		monEntite = initialWorld[0]
		camera = entities.filter(x=>x.hasComponents('Camera'))[0]
		camera.components.Camera.following = monEntite.id

		
		createEntitiesList(entities)
		createSystemsList(systems)
		createComponentsList(components)
		selectedEntityID = monEntite.id
	},

	step: function(dt) { // dt est en secondes (généralement = 0.016)


			// for each entity
			for (var i=0;i<entities.length;i++) {
				var entity = entities[i]

				// for each system
				for (system in systems) {
					if (system !== "neededComponents") {

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
			}
	},

	render: function(dt) {
		this.layer.clear(camera.components.Camera.bgColor)

		let cameraPosition = camera.components.Position


		// render
		for (var i = 0; i < entities.length; i++) {
			var entity = entities[i]

			var position = entity.components.Position
			let screenPos = {
				x:position.x-cameraPosition.x,
				y:position.y-cameraPosition.y}
			var outfit   = entity.components.Outfit
			var collider = entity.components.Collider

			// if entity has position and outfit
			if (entity.hasComponents("Position", "Outfit")) {
				var imageName = outfit.imgName

				var image = this.images[imageName]
				if (image !==undefined) {
					// display its image with specified alpha
					this.layer
						.a(outfit.alpha)
						.align(outfit.pivotX, outfit.pivotY)
						.drawImage(
							image,
							screenPos.x,
							screenPos.y)
						.ra() // restore alpha, hopefully 1
						.realign()
				} else {
					this.layer
						.font("14px Arial")
						.fillStyle('blue')
						.fillText("imgName introuvable", screenPos.x,screenPos.y)
				}
			}

			// draw collider
			if (entity.hasComponents("Position", "Collider")) {
				this.layer
					.strokeStyle("darkred")
					.strokeRect(screenPos.x+collider.x, screenPos.y+collider.y, collider.L, collider.H)
			}

			// draw pivot for selected entity
			if (entity.id === selectedEntityID && entity.hasComponents("Position")) {
				this.layer
					.fillStyle("blue")
					.a(0.5)
					.fillCircle(
						screenPos.x,
						screenPos.y,
						10)
					.ra()
				if (entity.hasComponents('Outfit') && image !== undefined) {
					this.layer
						.strokeStyle("rgba(0,0,255,0.3)")
						.align(outfit.pivotX, outfit.pivotY)
						.strokeRect(screenPos.x,screenPos.y,image.width, image.height)
						.realign()
				}
			}
		}


		// timeline
		// drawTimeline(this, 600, 8, monEntite.components.Timeline.time)

		// autres
		// this.layer
		// 	.font("14px Arial")
		// 	.fillStyle('white')
		// 	.fillText("totalTime : "+totalTime.toFixed(3), 5,18)
		// 	.fillText("cycle : "+cycle, 5,35)

		// document.getElementById('monEntite').innerHTML = '<div>monEntite</div>'+entityAsHTMLList(monEntite)

	}
})
