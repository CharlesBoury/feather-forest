
var entities = []
var monEntite


function getEntityWithID(id, list) {
	return list.filter(x => x['id'] == id)[0]
}

function deleteEntityWithID(id,list) {
	entities = list.filter(x => x['id'] !== id)
}

function createEntity(entity) {
	if (entity ===undefined) entity = new Entity()
	entities.push(entity)
}

var app = new PLAYGROUND.Application({

	container: "#canvas",

	create: function() {
		this.loadImages.apply(this, assets)

		entities  = initialWorld
		monEntite = initialWorld[0]
	},

	step: function(dt) { // dt est en secondes (généralement = 0.016)

		// if (entities !== undefined) { // pour les premieres frames avant 'ready' (sinon erreurs)

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
							// oups, ca le fait pour chaque entite
							else if (system === "replaceIfCollide") systems[system](entity, entities)
							else                                    systems[system](entity)
						}
					}
				}
			}
		// }
	},

	render: function(dt) {
		// this.layer.clear(interface.color.myColor)
		this.layer.clear('white')


		// render
		for (var i = 0; i < entities.length; i++) {
			var entity = entities[i]

			var position = entity.components.Position
			var outfit   = entity.components.Outfit
			var collider = entity.components.Collider

			// if entity has position and outfit
			if (entity.hasComponents("Position", "Outfit")) {
				var imageName = outfit.imgName

				// display its image with specified alpha
				this.layer
					.a(outfit.alpha)
					.drawImage(
						this.images[imageName],
						position.x-this.images[imageName].width*outfit.pivotX,
						position.y-this.images[imageName].height*outfit.pivotY)
					.ra() // restore alpha, hopefully 1
			}

			// draw collider
			if (entity.hasComponents("Position", "Collider")) {
				this.layer
					.strokeStyle("darkred")
					.strokeRect(position.x+collider.x, position.y+collider.y, collider.L, collider.H)
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
	}
})
