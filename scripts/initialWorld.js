
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
			vitesse: 380
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
			x: -25,
			y: -13,
			L: 50,
			H: 26,
			canBePushed: true
		}))
		.addComponent(new components.Intentions())
)
/*
initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "Blob"
		}))
		.addComponent(new components.Position({
			x:500,
			y:400
		}))
		.addComponent(new components.Deplacements({
			vitesse: 300
		}))
		.addComponent(new components.Outfit({
			imgName: 'Monstres/Blob',
			pivotX:  0.5,
			pivotY:  0.9,
			layer:   0
		}))
		.addComponent(new components.Collider({
			x: -33,
			y: -39,
			L:  67,
			H:  49,
			canBePushed: true
		}))
		.addComponent(new components.Intentions({
			cerveau: "blob"
		}))
)
*/


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
			imgName: 'Decors/Props/Plantule/01',
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
			value: "TacheFonce"
		}))
		.addComponent(new components.Position({
			x:220,
			y:300
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/TacheFonce',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "TacheFonce"
		}))
		.addComponent(new components.Position({
			x:660,
			y:220
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/TacheFonce',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "TacheFonce"
		}))
		.addComponent(new components.Position({
			x:820,
			y:220
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/TacheFonce',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "TacheFonce"
		}))
		.addComponent(new components.Position({
			x:860,
			y:240
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/TacheFonce',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

//------------------------------------------------


initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "TacheMarron"
		}))
		.addComponent(new components.Position({
			x:257,
			y:175
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/TacheMarron',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "TacheMarron"
		}))
		.addComponent(new components.Position({
			x:550,
			y:427
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/TacheMarron',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "TacheMarron"
		}))
		.addComponent(new components.Position({
			x:140,
			y:-250
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/TacheMarron',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

//------------------------------------------------

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "TacheBleue"
		}))
		.addComponent(new components.Position({
			x:323,
			y:277
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/TacheBleue1',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "TacheBleue"
		}))
		.addComponent(new components.Position({
			x:913,
			y:158
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/TacheBleue2',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "TacheBleue"
		}))
		.addComponent(new components.Position({
			x:782,
			y:479
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/TacheBleue3',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

//------------------------------------------------

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "Gazon"
		}))
		.addComponent(new components.Position({
			x:28,
			y:300
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/Gazon1',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "Gazon"
		}))
		.addComponent(new components.Position({
			x:415,
			y:38
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/Gazon1',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "Gazon"
		}))
		.addComponent(new components.Position({
			x:611,
			y:90
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/Gazon1',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "Gazon"
		}))
		.addComponent(new components.Position({
			x:954,
			y:-90
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/Gazon1',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "Gazon"
		}))
		.addComponent(new components.Position({
			x:200,
			y:368
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/Gazon2',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "TacheOrange"
		}))
		.addComponent(new components.Position({
			x:924,
			y:190
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/TacheOrange1',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "Gazon"
		}))
		.addComponent(new components.Position({
			x:780,
			y:506
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/Gazon2',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "Gazon"
		}))
		.addComponent(new components.Position({
			x:906,
			y:150
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/Gazon2',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "Gazon"
		}))
		.addComponent(new components.Position({
			x:1023,
			y:354
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/Gazon2',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "TacheOrange"
		}))
		.addComponent(new components.Position({
			x:446,
			y:376
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/TacheOrange2',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

//------------------------------------------------

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "TacheViolette"
		}))
		.addComponent(new components.Position({
			x:465,
			y:300
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/TacheViolette1',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "TacheViolette"
		}))
		.addComponent(new components.Position({
			x:618,
			y:404
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/TacheViolette2',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "TacheViolette"
		}))
		.addComponent(new components.Position({
			x:276,
			y:542
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/TacheViolette3',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

//------------------------------------------------

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "TacheOrange"
		}))
		.addComponent(new components.Position({
			x:661,
			y:421
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/TacheOrange3',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "TacheOrange"
		}))
		.addComponent(new components.Position({
			x:108,
			y:275
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/TacheOrange4',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "TacheOrange"
		}))
		.addComponent(new components.Position({
			x:585,
			y:235
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/TacheOrange5',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

//------------------------------------------------

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "TacheVerte"
		}))
		.addComponent(new components.Position({
			x:658,
			y:167
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/TacheVerte1',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "TacheVerte"
		}))
		.addComponent(new components.Position({
			x:308,
			y:316
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/TacheVerte2',
			pivotX:  0,
			pivotY:  0,
			layer:   -1
		}))
)

//------------------------------------------------


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
			imgName: 'Decors/Brocoli',
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
			value: "Rays"
		}))
		.addComponent(new components.Position({
			x:0,
			y:0
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/Rays',
			blendMode: 'overlay',
			layer:   1
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "Foreground"
		}))
		.addComponent(new components.Position({
			x:0,
			y:0
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/Foreground3',
			pivotX:  0,
			pivotY:  0,
			layer:   2
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "Foreground"
		}))
	.addComponent(new components.Position({
		x:1307,
		y:-230
	}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/Foreground1',
			pivotX:  1,
			pivotY:  0,
			layer:   2
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "Foreground"
		}))
		.addComponent(new components.Position({
			x:-81,
			y:762
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/Foreground2',
			pivotX:  0,
			pivotY:  1,
			layer:   2
		}))
)

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "Foreground"
		}))
		.addComponent(new components.Position({
			x:0,
			y:675
		}))
		.addComponent(new components.Outfit({
			imgName: 'Decors/Foreground4',
			pivotX:  0,
			pivotY:  1,
			layer:   2
		}))
)

//------------------------------------------------------------------------
//
//  Camera
//

initialWorld.push(
	new Entity()
		.addComponent(new components.Name({
			value: "Camera"
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


