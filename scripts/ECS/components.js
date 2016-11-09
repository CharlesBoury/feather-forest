

// IL FAUT QUE TOUS LES COMPONENTS AIENT DES VALEURS DE BASE
// ET UN TYPE

var components = {
	Name: function Name(o) {
		if (o === undefined) o = {}
		this.value = o.value === undefined ? "" : o.value

	this.meta = {
		types: {
			value: "string"
		}
	}
	Object.defineProperty(this, "meta", {enumerable: false})
	},

	Position: function Position(o) {
		if (o === undefined) o = {}

		this.x = o.x === undefined ? 0 : o.x
		this.y = o.y === undefined ? 0 : o.y

		this.meta = {
			types: {
				x: "number",
				y: "number"
			},
			step: {
				x: 1,
				y: 1
			}
		},
		this.getScreenPos = function(cameraEntity) {
			let cameraPosition = cameraEntity.components.Position
			return {
				x: this.x - cameraPosition.x,
				y: this.y - cameraPosition.y
			}
		}

		Object.defineProperty(this, "getScreenPos", {enumerable: false})
		Object.defineProperty(this, "meta", {enumerable: false})
	},


	Deplacements: function Deplacements(o) {
		if (o === undefined) o = {}

		this.direction = o.direction === undefined ? 'Bas' : o.direction
		this.vitesse   = o.vitesse   === undefined ? 1     : o.vitesse

		this.bouge     = false
		this.moveMessageX = 0
		this.moveMessageY = 0

		this.meta = {
			types: {
				direction: "select",
				vitesse: "number",
				bouge: "checkbox",
				moveMessageX: "number",
				moveMessageY: "number"
			},
			step: {
				vitesse: 1,
			},
			options: {
				direction: ['Bas','BasDroite','Droite','HautDroite','Haut', 'HautGauche','Gauche', 'BasGauche'],
			}
		}
		Object.defineProperty(this, "meta", {enumerable: false})
		Object.defineProperty(this, 'horizontalSign', {
			// enumerable: true, // a l'air de rentrer en conflit avec get&set du bind interface
			enumerable: false,
			get: ()  => {
				if      (this.direction.includes('Droite')) return  1
				else if (this.direction.includes('Gauche')) return -1
				else                                        return  0
			},
			set: (x) => {console.log('Deplacements.horizontalSign is a read.only value.')},
		})
		Object.defineProperty(this, 'verticalSign', {
			// enumerable: true, // a l'air de rentrer en conflit avec get&set du bind interface
			enumerable: false,
			get: ()  => {
				if      (this.direction.includes('Bas'))  return  1
				else if (this.direction.includes('Haut')) return -1
				else                                      return  0
			},
			set: (x) => {console.log('Deplacements.verticalSign is a read.only value.')},
		})
	},


	Outfit: function Outfit(o) {
		if (o === undefined) o = {}

		this.imgName = o.imgName === undefined ? 'DefaultImg' : o.imgName
		this.pivotX  = o.pivotX  === undefined ? 0            : o.pivotX
		this.pivotY  = o.pivotY  === undefined ? 0            : o.pivotY
		this.alpha   = o.alpha   === undefined ? 1            : o.alpha
		this.layer   = o.layer   === undefined ? 0            : o.layer

		this.meta = {
			types: {
				imgName: "string",
				pivotX:  "slider",
				pivotY:  "slider",
				alpha:   "slider",
				layer:   "slider"
			},
			min: {
				pivotX:  0,
				pivotY:  0,
				alpha:   0,
				layer:   -1
			},
			max: {
				pivotX:  1,
				pivotY:  1,
				alpha:   1,
				layer:   1
			},
			step: {
				pivotX:  0.01,
				pivotY:  0.01,
				alpha:   0.01,
				layer:   1
			}
		}
		Object.defineProperty(this, "meta", {enumerable: false})
	},


	Timeline: function Timeline(o) {
		if (o === undefined) o = {}
		this.currentAnim = o.currentAnim === undefined ? "Default"    : o.currentAnim
		this.play        = o.play        === undefined ? false        : o.play
		this.time        = o.time        === undefined ? 0            : o.time
		this.speed       = o.speed       === undefined ? 1            : o.speed
		this.anims       = o.anims       === undefined ? animsDefault : o.anims

		this.meta = {
			types: {
				currentAnim : "string",
				play: "checkbox",
				time: "number",
				speed: "slider"
			},
			min: {
				time: 0,
				speed:0
			},
			max: {
				speed: 2
			},
			step: {
				time: 0.001,
				speed: 0.1
			}
		}
		Object.defineProperty(this, "meta", {enumerable: false})
	},


	Collider: function Collider(o) {
		if (o === undefined) o = {}

		this.x           = o.x            === undefined ? 0     : o.x
		this.y           = o.y            === undefined ? 0     : o.y
		this.L           = o.L            === undefined ? 100   : o.L
		this.H           = o.H            === undefined ? 100   : o.H
		this.canBePushed = o.canBePushed  === undefined ? false : o.canBePushed

		this.collidedWith = []

		this.meta = {
			types: {
				x: "number",
				y: "number",
				L: "number",
				H: "number",
				canBePushed: "checkbox",
			},
			min: {
				L:0,
				H:0
			}
		}
		Object.defineProperty(this, "meta", {enumerable: false})
	},


	Intentions: function Intentions(o) {
		if (o === undefined) o = {}

		this.cerveau    = o.cerveau === undefined ? "manette" : o.cerveau
		this.horizontal = 0
		this.vertical   = 0

		this.meta = {
			types: {
				cerveau: "select",
				horizontal: "slider",
				vertical: "slider",
			},
			min: {
				horizontal: -1,
				vertical:   -1,
			},
			max: {
				horizontal: 1,
				vertical:   1,
			},
			step: {
				horizontal: 1,		
				vertical:   1,		
			},
			options: {
				cerveau: ["manette", "blob", "rien"]
			},
		}
		Object.defineProperty(this, "meta", {enumerable: false})
	},


	Camera: function Camera(o) {
		if (o === undefined) o = {}

		this.following = o.following  === undefined ? ""        : o.following
		this.bgColor   = o.bgColor    === undefined ? "#586D65" : o.bgColor
		this.meta = {
			types: {
				following: "string",
				bgColor: "color"
			}
		}
		Object.defineProperty(this, "meta", {enumerable: false})
	}
}


function getLayersNumber(entitiesList) {
	let max = entitiesList.filter(x=>x.hasComponents("Outfit"))[0].components.Outfit.meta.max.layer
	let min = entitiesList.filter(x=>x.hasComponents("Outfit"))[0].components.Outfit.meta.min.layer
	return max - min + 1 // +1 is for the layer 0
}