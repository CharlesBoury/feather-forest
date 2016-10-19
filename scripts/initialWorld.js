
var initialWorld = []

initialWorld.push(
	new Entity()
		.addComponent(new components.Position(600,337))
		.addComponent(new components.Deplacements(undefined, 600))
		.addComponent(new components.Outfit('Gabrielle/Bas1',0.5,0.9))
		.addComponent(new components.Timeline())
		.addComponent(new components.Collider(-50,-30,100,60,true))
		.addComponent(new components.Intentions())
)

initialWorld[0].components.Timeline.play = false
initialWorld[0].components.Timeline.anims = anims
initialWorld[0].components.Timeline.meta.options.currentAnim = Object.keys(anims)
initialWorld[0].components.Timeline.currentAnim = 'Bas'


initialWorld.push(
	new Entity()
	.addComponent(new components.Position(850,400))
	.addComponent(new components.Collider(-100,-100,200,200))
)

initialWorld.push(
	new Entity()
	.addComponent(new components.Position(200,300))
	.addComponent(new components.Collider(0,0,200,200))
)

initialWorld.push(
	new Entity()
	.addComponent(new components.Position(0,0))
	.addComponent(new components.Outfit('Decors/Foreground3',0,0))
)

initialWorld.push(
	new Entity()
	.addComponent(new components.Position(1307,-230))
	.addComponent(new components.Outfit('Decors/Foreground1',1,0))
)

initialWorld.push(
	new Entity()
	.addComponent(new components.Position(-81,762))
	.addComponent(new components.Outfit('Decors/Foreground2',0,1))
)

initialWorld.push(
	new Entity()
	.addComponent(new components.Position(0,0))
	.addComponent(new components.Camera())
)