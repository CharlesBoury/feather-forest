

var cycle = 0
var totalTime = 0



function stepTimeline(timeline, dt) {

	// l'action la plus proche de la tete de lecture dans le passé
	var currentAction = 
		timeline.anims[timeline.currentAnim].actions
		.filter(x => x.position <= timeline.time)
		.pop()

	if (currentAction !== undefined) {
		if (currentAction.action === 'resetTime') {
			// probleme : la tete de lecture ne tombe pas souvent pile-poil sur l'action
			// donc on garde l'avancée
			var avancee = currentAction.position
			resetTime(timeline, avancee)

		}
	}

	timeline.time = timeline.time + dt * timeline.speed
	totalTime     += dt * timeline.speed

	// roundedError += roundAtDigits(timeline.time, 3) - timeline.time

	// putain de base 2 de merde
	timeline.time = roundAtDigits(timeline.time, 3)
	totalTime     = roundAtDigits(totalTime,     3)
}



function resetTime(timeline, from) {
	// s'il n'y a aucun argument (=appelé depuis le bouton interface)
	if (timeline === undefined && from === undefined) {
		// on cible specifiquement monEntite
		monEntite.components.Timeline.time = 0	
	}
	else timeline.time -= from

	// also
	cycle ++
}



function drawTimeline(context, zoom, grille, time) {
	var layer  = context.layer
	var width  = context.width
	var height = context.height

	// fond
	layer
		.fillStyle("#3b4e47")
		.fillRect(0, height - 20, width, 20)

	// barres verticales pour chaque seconde
	for (var i = 0; i < width / zoom; i++) {
		layer
			.strokeStyle("#498871")
			.lineWidth(4)
			.strokeLine(i*zoom+2, height - 20, i*zoom+2, height)

			.fillStyle("#498871")
			.font("14px Arial")
			.fillText(""+i+"s",i*zoom+6, height-4)
	}
	// barres verticales pour chaque frame
	for (var i = 0; i < width*grille/(zoom); i++) {
		layer
			.strokeStyle("#486d5f")
			.lineWidth(1)
			.strokeLine(i*zoom/grille, height - 20, i*zoom/grille, height)
	}

	var pos = time*zoom 
	// tete de lecture
	layer
		.strokeStyle("black")
		.lineWidth(2)
		.strokeLine(pos, height - 20, pos, height)

		.fillStyle("black")
		.font("14px Arial")
		.fillText(""+time.toFixed(3)+"s",
			pos,
			height - 25)
}







