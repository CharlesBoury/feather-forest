

function nombresApresLaVirgule(number) {
	var sp = (number + '').split('.')
	if (sp[1] !== undefined) {
		return sp[1].length
	} else {
		return 0
	}
}

Number.prototype.pad = function(size) {
	//	68 .pad(5) = 00068
	// ne marche pas pour les nombres à virgule ou négatifs
	let s = String(this);
	while (s.length < (size || 2)) {s = "0" + s;}
	return s;
}


function roundAtDigits (number, digitNumber) {
	var base = Math.pow(10, digitNumber)
	return Math.round(number*base)/base
}


function combinaisons(f, list) {
	var result = []

	var saut = 0
	for (var i = 0; i < list.length; i++) {
		for (var j = 1+saut; j < list.length; j++) {
			result.push(f(list[i],list[j]))
		}
		saut++
	}
	return result
}


function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


// get the data as a string
Object.prototype.toString = function toString() {
	return JSON.stringify(this, null, 4)
}	
Object.prototype.print = function print() {
	console.log(this.toString())
}
Object.defineProperty(Object.prototype, 'toString', {
	enumerable:false
})
Object.defineProperty(Object.prototype, 'print', {
	enumerable:false
})


function pouet(message) {
	if (message === undefined) message = 'pouet'
	console.log(message)
}