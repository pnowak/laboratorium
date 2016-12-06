'use strict';

function filterLastSixMonth(data) {
	let filter = data.filter(function (item, index) {
		for (let i in item) {
			if (i === 'last_login' && item[i] !== null) {
				const halfOfYear = 15768000000;
				let now = Date.now();
				let last = Date.parse(item[i]);

				if ((now - last) <= halfOfYear) {
					return item;
				}
			}
		}
	});

	return filter;
}

export default filterLastSixMonth;