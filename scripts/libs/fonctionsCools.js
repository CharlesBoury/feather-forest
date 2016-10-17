

function nombresApresLaVirgule(number) {
	var sp = (number + '').split('.')
	if (sp[1] !== undefined) {
		return sp[1].length
	} else {
		return 0
	}
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