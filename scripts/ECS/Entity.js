


Entity.prototype.count = 0
// Entity constructor
function Entity() {
	/* creates an object that looks like that :
		{
	    	"id": "2cd27003",
	    	"components": {}
		}
	*/

	// random unique ID
	this.id = (Math.random()*100000000 | 0).toString(16) +Entity.prototype.count
	// no component
	this.components = {}
	this.enabledComponents = {}
	// We keep track of how many entities have been created
	Entity.prototype.count++
	return this
}





/* handlers to add and remove components :
	myEntity.addComponent(new position(20,200))
	myEntity.addComponentRaw("position", {x: 20, y: 200})
	myEntity.removeComponent("position")
*/

Entity.prototype.addComponent = function addComponent(component) {
	this.components[component.constructor.name] = component
	this.enabledComponents[component.constructor.name] = true
	return this
}
Entity.prototype.addComponentRaw = function addComponent(name, value) {
	this.components[name] = value
	this.enabledComponents[name] = true
	return this
}
Entity.prototype.removeComponent = function removeComponent(name) {
	delete this.components[name]
	delete this.enabledComponents[name]
	return this
}
Entity.prototype.removeAllComponents = function removeAllComponents() {
	this.components = {}
	this.enabledComponents = {}
	return this
}
Entity.prototype.enableComponent = function enableComponent(name) {
	this.enabledComponents[name] = true
	return this
}
Entity.prototype.disableComponent = function disableComponent(name) {
	this.enabledComponents[name] = false
	return this
}

Entity.prototype.has = function (componentName) {
	if (this.enabledComponents[componentName] === undefined) return false
	else return this.enabledComponents[componentName]
}

Entity.prototype.hasComponents = function (componentName) {
	// myEntity.hasComponents('Position','Outfit')
	return Array.from(arguments).map(x=> this.has(x)).reduce((a,b)=> a&&b, true)
}











