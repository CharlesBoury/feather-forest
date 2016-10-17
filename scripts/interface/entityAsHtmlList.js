
function entityAsHTMLList (myEntity) {
	return myEntity.toString()
		.replace(/{/g, '<ul><li>')
		.replace(/,/g, '</li><li>')
		.replace(/}/g, '</li></ul>')
		// .replace(/"/g, '')
}