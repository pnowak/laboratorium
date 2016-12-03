'use strict';

export function filterGender(data, condition, fn) {
	let filter = data.filter(function (item, index) {
		for (let i in item) {
			if (i === condition) {
				return item[i].some(fn);
			}
		}
	});

	return filter;
}

export function isWomen(x) {
	return x === 'Female';
}

export function isMen(x) {
	return x === 'Male';
}