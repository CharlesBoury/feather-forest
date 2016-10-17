

//------------------------------------------------------------------------
//
//  EN CHANTIER
//
//  a faire :
//    . listHTML()
//    . setListElementValue() quand la valeur n'existe pas (il faut alors
//      créer du nouveau HTML et le bind au world)
//    . supprimer les éléments d'une liste
//
//



interface.list = {}

function initLists() {
	/* fonction necessaire à l'accès des
	 * lists sous forme de variables
	 */

	// reset
	interface.list = {}

	// pour toutes les strings
	var allLists = document.querySelectorAll(".inputList")
	for(var i = 0; i < allLists.length; i++) {
		var node = allLists[i]

		// creer une variable pour la string
		// accessible comme ca : interface.string.id
		registerList(node.id)
	}
}



function registerList(id) {
	Object.defineProperty(interface.list, id, {
		get: ()  => {return getListValue(id   )},
		set: (x) => {       setListValue(id, x)},
		enumerable: true
	})
}


function listHTML(nodeId, id, liste) {
	var result =
		'<span>'+id+'</span>'+
		'<ul class="inputList" id="'+nodeId+'">'

	for (var i = 0; i < liste.length; i++) {
		result += '<li>'+listElementHTML(liste, i)+'</li>'
	}

	result+= '</ul>'

	return result
}

function listElementHTML(list, index) {
	if (listElement instanceof Array) return listHTML(nodeId,id,listElement)
	return "prout"
}
		// <span>myList</span>
		// <ul class="inputList">
		// 	<li><label for="myList.0">0</label>
		// 	<input type="number" id="myList.0"></li>

		// 	<li><label for="myList.1">1</label>
		// 	<input type="number" id="myList.1"></li>
		// </ul>





function getListElementValue(id, i) {
	var idIndex = id+'['+i+']'
	var node = document.getElementById(idIndex)
	// si l'indice n'a aucun valeur, return undefined
	if (node === null) return undefined
	// si c'est une autre liste, choper sa valeur
	else if (node.tagName === "UL" ) return getListValue(idIndex)
	// sinon
	return document.getElementById(idIndex).value
}
function setListElementValue(id, i, newValue) {
	var idIndex = id+'['+i+']'
	var node = document.getElementById(idIndex)
	// si l'indice n'existait pas, créer son html
	if (node === null) {
		// mais c'est chiant, il faut aussi bind et tout
	}

	// sinon, si c'est une autre liste, set sa valeur
	else if (newValue instanceof Array) return setListValue(idIndex, newValue)

	//sinon set sa valeur
	document.getElementById(idIndex).value = newValue
}


function getListValue(id) {
	// pour toutes les <li> de la liste avec le bon id
	var liNodes = document.getElementById(id).children
	var result = []
	for (var i = 0; i < liNodes.length; i++) {
		result[i] = getListElementValue(id, i)
	}
	return result
}
function setListValue(id, newList) {
	for (var i = 0; i < newList.length; i++) {
		setListElementValue(id, i, newList[i])
	}
}