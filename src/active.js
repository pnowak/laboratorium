'use strict';

function filterActive(data, active = true) {
	let filter = data.filter(function (item, index) {
		for (let i in item) {
			if ((i === 'active') && (item[i] === active)) {
				return item;
			}
		}
	});

	return filter;
}

export default filterActive;