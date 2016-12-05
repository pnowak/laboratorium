'use strict';

function filterSixMonth(data) {
	let filter = data.filter(function (item, index) {
		for (let i in item) {
			if (i === 'last_login' && item[i] !== null) {
				const half = 15768000000;
				let now = Date.now();
				let last = Date.parse(item[i]);

				if ((now - last) > half) {
					return item;
				}
			}
		}
	});

	return filter;
}

export default filterSixMonth;