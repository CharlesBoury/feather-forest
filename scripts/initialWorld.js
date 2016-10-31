
var initialWorld = []

initialWorld.push(
	new Entity()
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
			pivotY:  0.9
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
		.addComponent(new components.Position({
			x:200,
			y:300
		}))
		.addComponent(new components.Collider({
			x: 0,
			y: 0,
			L: 200,
			H: 200
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Position({
			x:760,
			y:400
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/Plantule/01',
			pivotX:  0.4,
			pivotY:  0.98
		}))
		.addComponent(new components.Timeline({
				play: true,
				currentAnim: 'Idle',
				anims: animsPlantule,
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Position({
			x:0,
			y:0
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/Foreground3',
			pivotX:  0,
			pivotY:  0
		}))
)

initialWorld.push(
	new Entity()
	.addComponent(new components.Position({
		x:1307,
		y:-230
	}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/Foreground1',
			pivotX:  1,
			pivotY:  0
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Position({
			x:-81,
			y:762
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/Foreground2',
			pivotX:  0,
			pivotY:  1
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Position({
			x:0,
			y:0
		}))
		.addComponent(new components.Camera({
			following: initialWorld[0].id
		}))
)