


var systems = {

//------------------------------------------------------------------------
//
//  Cerveaux
//

	userInput: function(entity, keys) {

		// should have
		var intentions = entity.components.Intentions

		if (intentions.cerveau === "manette") {
			// choose vertical and horizontal signs
			if      (keys.up && keys.down) intentions.vertical =  0
			else if (keys.up             ) intentions.vertical = -1
			else if (           keys.down) intentions.vertical =  1
			else                           intentions.vertical =  0

			if      (keys.left && keys.right) intentions.horizontal =  0
			else if (keys.left              ) intentions.horizontal = -1
			else if (             keys.right) intentions.horizontal =  1
			else                              intentions.horizontal =  0
		}

	},

	setDeplacementsFromIntentions: function(entity) {

		// should have
		var intentions   = entity.components.Intentions
		var deplacements = entity.components.Deplacements

		// choose direction
		if (intentions.vertical === 1) {
			if (intentions.horizontal === 0) deplacements.direction = 'Bas'
			if (intentions.horizontal === 1) deplacements.direction = 'BasDroite'
			if (intentions.horizontal ===-1) deplacements.direction = 'BasGauche'
		}
		if (intentions.vertical ===-1) {
			if (intentions.horizontal === 0) deplacements.direction = 'Haut'
			if (intentions.horizontal === 1) deplacements.direction = 'HautDroite'
			if (intentions.horizontal ===-1) deplacements.direction = 'HautGauche'
		}
		if (intentions.vertical === 0) {
			if (intentions.horizontal === 1) deplacements.direction = 'Droite'
			if (intentions.horizontal ===-1) deplacements.direction = 'Gauche'
		}
		// choose if walking
		deplacements.bouge = intentions.horizontal!==0 || intentions.vertical!==0
	},

	moveMessage: function(entity,dt) {

		// should have
		var position     = entity.components.Position
		var deplacements = entity.components.Deplacements

		var vit = deplacements.vitesse // en pixels/seconde
		// if diagonal, reduce vit
		if (deplacements.horizontalSign!==0 && deplacements.verticalSign!==0) vit *= Math.cos(Math.PI/4)

		// move
		if (deplacements.bouge) {
			deplacements.moveMessageX = deplacements.horizontalSign*vit*dt
			deplacements.moveMessageY = deplacements.verticalSign  *vit*dt
			//rounded
			deplacements.moveMessageX = roundAtDigits(deplacements.moveMessageX, nombresApresLaVirgule(1))
			deplacements.moveMessageY = roundAtDigits(deplacements.moveMessageY, nombresApresLaVirgule(1))
		} else {
			deplacements.moveMessageX = 0
			deplacements.moveMessageY = 0
		}
	},

//------------------------------------------------------------------------
//
//  Bougeur
//

	move: function(entity, dt) {

		// should have
		var position     = entity.components.Position
		var deplacements = entity.components.Deplacements

		// move entity
		if (deplacements.bouge) {
			position.x += deplacements.moveMessageX
			position.y += deplacements.moveMessageY

			//rounded
			position.x = roundAtDigits(position.x, nombresApresLaVirgule(1))
			position.y = roundAtDigits(position.y, nombresApresLaVirgule(1))
		}
	},

	collideMessage: function(entity, allEntities) {

		// first remove previous "collidedWith" messages
		entity.components.Collider.collidedWith = []

		// then attach new messages if collided
		var entitiesWithCollider = allEntities.filter(x=>x.hasComponents("Position", "Collider"))
		entity.components.Collider.collidedWith = collidingInfos(entity, entitiesWithCollider)

	},

	replaceIfCollide: function(entity, allEntities) {

		
		var position     = entity.components.Position
		var deplacements = entity.components.Deplacements // besoin des moveMessage
		var collider     = entity.components.Collider

		// if it collided with others and can be pushed, replace it
		var collidedWithOthers = collider.collidedWith.length > 0
		var pushable           = collider.canBePushed

		if (collidedWithOthers && pushable) {
			// entity has to be replaced
			// console.log(entity.id+' has to be replaced')

			// get current and previous colliders with world coordinates
			var colliderRect = getColliderWorldRect(entity)
			var previousColliderRect = getColliderWorldRect(entity)
				previousColliderRect.x -= deplacements.moveMessageX
				previousColliderRect.y -= deplacements.moveMessageY

			// for each colliding
			for (var i = 0; i < collider.collidedWith.length; i++) {
				var otherId = collider.collidedWith[i]
				var otherEntity = getEntityWithID(otherId, allEntities)
				var otherCollider = otherEntity.components.Collider
				var otherColliderRect = getColliderWorldRect(otherEntity)

				// console.log('    because of '+otherId)


				// calcul de la position relative entre previous et other
				var a = previousColliderRect
				var b = otherColliderRect
				var horizontal
				if (deplacements.moveMessageX >=0) horizontal = (b.right - a.left) - (a.L+b.L)
				if (deplacements.moveMessageX < 0) horizontal = a.left - b.right
				var vertical
				if (deplacements.moveMessageY >=0) vertical   = (b.bottom - a.top) - (a.H+b.H)
				if (deplacements.moveMessageY < 0) vertical   = a.top - b.bottom

				// console.log(horizontal, vertical)
				// si le decalage est plus horizontal que vertical, on ne replace qu'horizontalement
				// et inversement
				// (voire les schemas rouges et bleus dans le carnet)
				if (horizontal > vertical) {
					// replacement UNIQUEMENT horizontal
					if (deplacements.moveMessageX >=0) position.x -= (colliderRect.right - otherColliderRect.left)
					if (deplacements.moveMessageX < 0) position.x += (otherColliderRect.right - colliderRect.left)
				}
				else if (horizontal < vertical) {
					// replacement UNIQUEMENT vertical
					if (deplacements.moveMessageY >=0) position.y -= (colliderRect.bottom - otherColliderRect.top)
					if (deplacements.moveMessageY < 0) position.y += (otherColliderRect.bottom - colliderRect.top)
				}
			}
		}
	},

//------------------------------------------------------------------------
//
//  Renderer
//

	setAnimFromDeplacements: function(entity) {
		// choose anim from direction and bouge

		var deplacements = entity.components.Deplacements
		var timeline    = entity.components.Timeline

		if (deplacements.bouge) {
			timeline.currentAnim = deplacements.direction
			timeline.play = true
		} else {
			timeline.currentAnim = deplacements.direction+'Still'
			timeline.play = false
		}
	},

	timeline: function(entity, dt) {
		var timeline = entity.components.Timeline

		// if currentAnim exists and is playing
		if (timeline.play && timeline.anims[timeline.currentAnim] !== undefined) {

			// step through time
			timeline.time = timeline.time + dt * timeline.speed

			// chercher l'action la plus proche de la tete de lecture dans le passé
			let currentAction = 
				timeline.anims[timeline.currentAnim].actions
				.filter(x => x.position <= timeline.time)
				.pop()				

			if (currentAction !== undefined) {
				if (currentAction.action === 'resetTime') {
					// probleme : la tete de lecture ne tombe pas souvent
					// pile-poil sur l'action donc on garde l'avancée
					resetTime(timeline, currentAction.position)

					function resetTime(timeline, from) {
						timeline.time -= from
					}
				}
			}

			// putain de base 2 de merde
			timeline.time = roundAtDigits(timeline.time, 3)
		}
	},

	// a transformer pour que ca marche pour toutes les proprietes
	syncOutfitFromTimeline: function(entity) {
		var outfit   = entity.components.Outfit
		var timeline = entity.components.Timeline

		if (timeline.anims[timeline.currentAnim] !== undefined) {
			let currentProperty =
				timeline.anims[timeline.currentAnim].properties
					.filter(x => x.position <= timeline.time)
					.pop()
			if (currentProperty !== undefined) {
				outfit.imgName = currentProperty.img
			}
		}

	},

	cameraFollow: function(entity) {
		let idToFollow = entity.components.Camera.following
		// B c'est l'entite à suivre
		let b = getEntityWithID(idToFollow, entities)

		if (b !== undefined) {
			if (b.hasComponents('Position')) {

				let positionB = b.components.Position

				let screenPos  = positionB.getScreenPos(entity)
				// let visibleBox = getImageDimensionFromName(entityToFollow.Components.Outfit.imgName)

				if (screenPos.x >= screen.width) {
					pouet('droite')
					entity.components.Position.x += screen.width
				} else if (screenPos.x <= 0) {
					pouet('gauche')
					entity.components.Position.x -= screen.width
				} else if (screenPos.y >= screen.height) {
					pouet('bas')
					entity.components.Position.y += screen.height
				} else if (screenPos.y < 0) {
					pouet('haut')
					entity.components.Position.y -= screen.height
				}
			}
		}

	},

	neededComponents: {
		userInput:                     ["Intentions"                                                                 ],
		setDeplacementsFromIntentions: ["Intentions", "Deplacements"                                                 ],
		moveMessage:                   [              "Deplacements","Position"                                      ],
		move:                          [              "Deplacements","Position"                                      ],
		collideMessage:                [                             "Position",          "Collider"                 ],
		replaceIfCollide:              [              "Deplacements","Position",          "Collider"                 ],
		setAnimFromDeplacements:       [              "Deplacements",           "Timeline"                           ],
		timeline:                      [                                        "Timeline"                           ],
		syncOutfitFromTimeline:        [                                        "Timeline",                  'Outfit'],
		cameraFollow:                  [                             "Position",                    "Camera"         ],
	},
}

// neededComponents n'apparait pas dans la liste des systems
Object.defineProperty(systems, 'neededComponents', {
	enumerable:false
})


