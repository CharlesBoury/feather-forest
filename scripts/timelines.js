

var cycle = 0
var totalTime = 0

var anims = {
	BasStill: {
		properties:[
			{position:0/8, img:'Gabrielle/Bas'},
		],
		actions:[]
	},
	BasDroiteStill: {
		properties:[
			{position:0/8, img:'Gabrielle/BasDroite'},
		],
		actions:[]
	},
	DroiteStill: {
		properties:[
			{position:0/8, img:'Gabrielle/Droite'},
		],
		actions:[]
	},
	HautDroiteStill: {
		properties:[
			{position:0/8, img:'Gabrielle/HautDroite'},
		],
		actions:[]
	},
	HautStill: {
		properties:[
			{position:0/8, img:'Gabrielle/Haut'},
		],
		actions:[]
	},
	HautGaucheStill: {
		properties:[
			{position:0/8, img:'Gabrielle/HautGauche'},
		],
		actions:[]
	},
	GaucheStill: {
		properties:[
			{position:0/8, img:'Gabrielle/Gauche'},
		],
		actions:[]
	},
	BasGaucheStill: {
		properties:[
			{position:0/8, img:'Gabrielle/BasGauche'},
		],
		actions:[]
	},




	Bas: {
		properties:[
			{position:0/8, img:'Gabrielle/Bas1'},
			{position:1/8, img:'Gabrielle/Bas2'},
			{position:2/8, img:'Gabrielle/Bas3'},
			{position:3/8, img:'Gabrielle/Bas4'}
		],
		actions:[
			{position:4/8, action: 'resetTime'}
		]
	},

	BasDroite: {
		properties:[
			{position:0/8, img:'Gabrielle/BasDroite1'},
			{position:1/8, img:'Gabrielle/BasDroite2'},
			{position:2/8, img:'Gabrielle/BasDroite3'},
			{position:3/8, img:'Gabrielle/BasDroite4'}
		],
		actions:[
			{position:4/8, action: 'resetTime'}
		]
	},

	Droite: {
		properties:[
			{position:0/8, img:'Gabrielle/Droite1'},
			{position:1/8, img:'Gabrielle/Droite2'},
			{position:2/8, img:'Gabrielle/Droite3'},
			{position:3/8, img:'Gabrielle/Droite4'}
		],
		actions:[
			{position:4/8, action: 'resetTime'}
		]
	},
	HautDroite: {
		properties:[
			{position:0/8, img:'Gabrielle/HautDroite1'},
			{position:1/8, img:'Gabrielle/HautDroite2'},
			{position:2/8, img:'Gabrielle/HautDroite3'},
			{position:3/8, img:'Gabrielle/HautDroite4'}
		],
		actions:[
			{position:4/8, action: 'resetTime'}
		]
	},
	Haut: {
		properties:[
			{position:0/8, img:'Gabrielle/Haut1'},
			{position:1/8, img:'Gabrielle/Haut2'},
			{position:2/8, img:'Gabrielle/Haut3'},
			{position:3/8, img:'Gabrielle/Haut4'}
		],
		actions:[
			{position:4/8, action: 'resetTime'}
		]
	},
	HautGauche: {
		properties:[
			{position:0/8, img:'Gabrielle/HautGauche1'},
			{position:1/8, img:'Gabrielle/HautGauche2'},
			{position:2/8, img:'Gabrielle/HautGauche3'},
			{position:3/8, img:'Gabrielle/HautGauche4'}
		],
		actions:[
			{position:4/8, action: 'resetTime'}
		]
	},
	Gauche: {
		properties:[
			{position:0/8, img:'Gabrielle/Gauche1'},
			{position:1/8, img:'Gabrielle/Gauche2'},
			{position:2/8, img:'Gabrielle/Gauche3'},
			{position:3/8, img:'Gabrielle/Gauche4'}
		],
		actions:[
			{position:4/8, action: 'resetTime'}
		]
	},
	BasGauche: {
		properties:[
			{position:0/8, img:'Gabrielle/BasGauche1'},
			{position:1/8, img:'Gabrielle/BasGauche2'},
			{position:2/8, img:'Gabrielle/BasGauche3'},
			{position:3/8, img:'Gabrielle/BasGauche4'}
		],
		actions:[
			{position:4/8, action: 'resetTime'}
		]
	},
}




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



function syncOutfitFromTimeline(entity) {
	var outfit   = entity.components.Outfit
	var timeline = entity.components.Timeline
	outfit.imgName =
		timeline.anims[timeline.currentAnim].properties
			.filter(x => x.position <= timeline.time)
			.pop()
			.img
}




function drawTimeline(context, zoom, grille, time) {
	var layer  = context.layer
	var width  = context.width
	var height = context.height

	// fond
	layer
		.fillStyle("#FFC089")
		.fillRect(0, height - 20, width, 20)

	// barres verticales pour chaque seconde
	for (var i = 0; i < width / zoom; i++) {
		layer
			.strokeStyle("#23176D")
			.lineWidth(2)
			.strokeLine(i*zoom, height - 20, i*zoom, height)
	}
	// barres verticales pour chaque frame
	for (var i = 0; i < width*grille/(zoom); i++) {
		layer
			.strokeStyle("#EFA15D")
			.lineWidth(1)
			.strokeLine(i*zoom/grille, height - 20, i*zoom/grille, height)
	}

	var pos = time*zoom 
	// tete de lecture
	layer
		.strokeStyle("#790900")
		.lineWidth(2)
		.strokeLine(pos, height - 20, pos, height)

		.fillStyle("#790900")
		.font("14px Arial")
		.fillText(""+time.toFixed(3)+"s",
			pos,
			height - 25)
}







