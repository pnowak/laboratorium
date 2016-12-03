'use strict';

function filterActive(data, condition) {
	let filter = data.filter(function (item, index) {
		for (let i in item) {
			if ((i === condition) && (item[i] === true)) {
				return item;
			}
		}
	});

	return filter;
}

export default filterActive;