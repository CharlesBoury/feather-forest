function Rect(o) {
	this.x = o.x
	this.y = o.y
	this.L = o.L
	this.H = o.H

	// tous les setters suivants BOUGENT le rect sans le redimensionner
	Object.defineProperty(this, "left", {
		get: ()     => {return this.x},
		set: (left) => {       this.x = left},
		enumerable: true
	})

	Object.defineProperty(this, "right", {
		get: ()      => {return this.x+this.L},
		set: (right) => {       this.x = right-this.L},
		enumerable: true
	})
	Object.defineProperty(this, "top", {
		get: ()    => {return this.y},
		set: (top) => {       this.y = top},
		enumerable: true
	})

	Object.defineProperty(this, "bottom", {
		get: ()       => {return this.y+this.H},
		set: (bottom) => {       this.y = bottom-this.H},
		enumerable: true
	})

	Object.defineProperty(this, "centerX", {
		get: ()        => {return this.x+this.L/2},
		set: (centerX) => {       this.x = centerX-this.L/2},
		enumerable: true
	})

	Object.defineProperty(this, "centerY", {
		get: ()        => {return this.y+this.H/2},
		set: (centerY) => {       this.y = centerY-this.H/2},
		enumerable: true
	})
}