

// IL FAUT QUE TOUS LES COMPONENTS AIENT DES VALEURS DE BASE
// ET UN TYPE

var components = {
	Position: function Position(posX,posY) {

		if (posX !== undefined && posY === undefined) {
			console.error('Position component has only one argument, it needs 0 or 2')
		} else {
			this.x = posX || 0
			this.y = posY || 0

			this.meta = {
				types: {
					x: "number",
					y: "number"
				},
				step: {
					x: 1,
					y: 1
				}
			}
		}
	},


	Deplacements: function Deplacements(dir, vit) {
		this.direction = dir === undefined ? 'Bas' : dir
		this.vitesse   = vit === undefined ? 1     : vit
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


	Outfit: function Outfit(imgName, pivotX, pivotY, alpha) {

		this.imgName = imgName === undefined ? 'Defaut/DefaultImg' : imgName
		this.pivotX  = pivotX  === undefined ? 0        : pivotX
		this.pivotY  = pivotY  === undefined ? 0        : pivotY
		this.alpha   = alpha   === undefined ? 1        : alpha

		this.meta = {
			types: {
				imgName: "string",
				pivotX:  "slider",
				pivotY:  "slider",
				alpha:   "slider"
			},
			min: {
				pivotX:  0,
				pivotY:  0,
				alpha:   0
			},
			max: {
				pivotX:  1,
				pivotY:  1,
				alpha:   1
			},
			step: {
				pivotX:  0.01,
				pivotY:  0.01,
				alpha:   0.01
			}
		}
	},


	Timeline: function Timeline() {
		this.currentAnim = "Defaut"
		this.play = true
		this.time = 0
		this.speed = 1
		this.anims = {
			Defaut: {
				properties:[],
				actions:[],
			},
		}

		this.meta = {
			types: {
				currentAnim : "select",
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
			},
			options: {
				currentAnim: ['Defaut']
			}
		}
	},


	Collider: function Collider(x,y,L,H, canBePushed) {
		this.x = x  === undefined ? 0   : x
		this.y = y  === undefined ? 0   : y
		this.L = L  === undefined ? 100 : L
		this.H = H  === undefined ? 100 : H
		this.canBePushed = canBePushed  === undefined ? false : canBePushed
		this.collidedWith = []

		this.meta = {
			types: {
				x: "number",
				y: "number",
				L: "number",
				H: "number",
				canBePushed: "checkbox",
			}
		}
	},


	Intentions: function Intentions() {
		this.cerveau = "manette"
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
				cerveau: ["manette", "rien"]
			},
		}
	},
}







