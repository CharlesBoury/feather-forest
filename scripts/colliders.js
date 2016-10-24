




function testCollide(entityA,entityB) { // need colliders and position

	var a = getColliderWorldRect(entityA)
	var b = getColliderWorldRect(entityB)

	if (overlap(a.left,a.right,b.left,b.right) && overlap(a.top,a.bottom,b.top,b.bottom)) {
		return [entityA.id,entityB.id]
	} else return []
}

function collidingInfos(entity, entitiesWithColliderAndPosition) { // need colliders and position
	// return array of colliding entites :
	// if entity collide with bloup and pouet, then [bloup.id,pouet.id]

	var collidingWith = []

	for (var i = 0; i < entitiesWithColliderAndPosition.length; i++) {
			var entityB = entitiesWithColliderAndPosition[i]

			// on skip la collision avec soi-même
			if (entity.id !== entityB.id) {

				if (testCollide(entity, entityB).length !== 0) {
					collidingWith.push(entityB.id)
			}

		}
	}
	return collidingWith
}


function overlap(aDebut,aFin,bDebut,bFin) {
	// check if 2 ranges overlap
	// 3-5 and 4-6 overlap
	// 3-5 and 5-6 don't

	// debut doit etre plus petit que fin
	if (aDebut > aFin) return overlap(aFin, aDebut,bDebut,bFin)
	if (bDebut > bFin) return overlap(aDebut,aFin,bFin,bDebut)

	return bDebut < aFin && bFin > aDebut
}

function getColliderWorldRect(entity) {
	// entity should have 
	var position = entity.components.Position
	var collider = entity.components.Collider

	var rect = new Rect(collider)
	rect.x += position.x
	rect.y += position.y
	return rect
}