
var initialWorld = []

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "Gabrielle"
		}))
		.addComponent(new components.Position({
			x:600,
			y:337
		}))
		.addComponent(new components.Deplacements({
			vitesse: 600
		}))
		.addComponent(new components.Outfit({
			imgName: 'Gabrielle/Bas1',
			pivotX:  0.5,
			pivotY:  0.9,
			layer:   0
		}))
		.addComponent(new components.Timeline({
			play: false,
			anims: animsGabrielle,
			currentAnim: 'Bas'
		}))
		.addComponent(new components.Collider({
			x: -50,
			y: -30,
			L: 100,
			H: 60,
			canBePushed: true
		}))
		.addComponent(new components.Intentions())
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "Blob"
		}))
		.addComponent(new components.Position({
			x:500,
			y:400
		}))
		// .addComponent(new components.Deplacements({
		// 	vitesse: 300
		// }))
		.addComponent(new components.Outfit({
			imgName: 'Monstres/Blob',
			pivotX:  0.5,
			pivotY:  0.9,
			layer:   0
		}))
		// .addComponent(new components.Collider({
		// 	x: -33,
		// 	y: -39,
		// 	L:  67,
		// 	H:  49,
		// 	canBePushed: true
		// }))
		// .addComponent(new components.Intentions({
		// 	cerveau: "blob"
		// }))
)



//------------------------------------------------------------------------
//
//  world limits
//

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "WorldLimit Bottom"
		}))
		.addComponent(new components.Position({
			x:0,
			y:670
		}))
		.addComponent(new components.Collider({
			x: 0,
			y: 0,
			L: 2400,
			H: 10
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "WorldLimit Left"
		}))
		.addComponent(new components.Position({
			x:0,
			y:-675
		}))
		.addComponent(new components.Collider({
			x: -5,
			y: 0,
			L: 10,
			H: 1350
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "WorldLimit Top"
		}))
		.addComponent(new components.Position({
			x:0,
			y:-675
		}))
		.addComponent(new components.Collider({
			x: 0,
			y: -5,
			L: 2400,
			H: 10
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "WorldLimit Right"
		}))
		.addComponent(new components.Position({
			x:2400,
			y:-675
		}))
		.addComponent(new components.Collider({
			x: -5,
			y: 0,
			L: 10,
			H: 1350
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "Plantule"
		}))
		.addComponent(new components.Position({
			x:760,
			y:400
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/Plantule/01',
			pivotX:  0.4,
			pivotY:  0.98,
			layer:   0
		}))
		.addComponent(new components.Timeline({
				play: true,
				currentAnim: 'Idle',
				anims: animsPlantule,
		}))
)

//------------------------------------------------------------------------
//
//  background
//

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "Fond1"
		}))
		.addComponent(new components.Position({
			x:555,
			y:215
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/Background1',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "Fond2"
		}))
		.addComponent(new components.Position({
			x:140,
			y:430
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/Background1',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

//------------------------------------------------------------------------
//
//  foreground
//

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "Decors"
		}))
		.addComponent(new components.Position({
			x:0,
			y:0
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/Foreground3',
			pivotX:  0,
			pivotY:  0,
			layer:   1
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "Decors"
		}))
	.addComponent(new components.Position({
		x:1307,
		y:-230
	}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/Foreground1',
			pivotX:  1,
			pivotY:  0,
			layer:   1
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "Decors"
		}))
		.addComponent(new components.Position({
			x:-81,
			y:762
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/Foreground2',
			pivotX:  0,
			pivotY:  1,
			layer:   1
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "Cam"
		}))
		.addComponent(new components.Position({
			x:0,
			y:0
		}))
		.addComponent(new components.Camera({
			following: initialWorld[0].id,
			bgColor:   "#2f4b2b"
		}))
)