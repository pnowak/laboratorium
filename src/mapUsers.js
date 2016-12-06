'use strict';

import { get } from './helpers';

function mapUser(data) {
	return data.map(function (item, index) {
        item.full_name = [item.last_name, item.first_name, item.username].join(' ');
        createUserLi(item.full_name, item);
    });
}

function createUserLi(value, item) {
	const node = get('users');
	const li = document.createElement('li');
	const content = document.createTextNode(value);

	li.appendChild(content);
	li.addEventListener('click', function (e) {
		createUser(item);
	}, false);
	node.appendChild(li);
}

function createUser(item) {
	const root = get('user');
	let fragm = document.createDocumentFragment();

	if (root.textContent !== '') {
		let child = root.childNodes;
		let arrayChild = Array.from(child);

		arrayChild.forEach(function (item, index) {
			item.classList.add('disappear');
		});
	}

	for (let prop in item) {
		if (item.hasOwnProperty(prop)) {
			if (prop === 'favorites') {
				const body = document.body;

				if (item[prop].color !== null) {
					body.style.backgroundColor = item[prop].color;
				} else {
					body.style.backgroundColor = '#ffffff';
				}
			}

			if ((prop === 'first_name' && item[prop] !== null) || (prop === 'last_name' && item[prop] !== null) || (prop === 'email' && item[prop] !== null)) {
				let p = document.createElement('p');
				let content = document.createTextNode(`${item[prop]}`);

				p.appendChild(content);
				fragm.appendChild(p);
			}

			if (prop === 'avatar') {
				let img = document.createElement('img');
				let src = item[prop] ? img.setAttribute('src', item[prop]) : '';

				fragm.appendChild(img);
			}

			if (prop === 'coordinates') {
				let div = document.createElement('div');
				div.style.width = 300 + 'px';
				div.style.height = 200 + 'px';

				createMap(item[prop], div);

				fragm.appendChild(div);
			}
		}
	}

	root.appendChild(fragm);
}

function createMap(address, div) {
		const geocoder = new google.maps.Geocoder();
		const latlng = { lat: parseFloat(address.lat), lng: parseFloat(address.lng) };
		const root = get('user');
        const p = document.createElement('p');
		let map;
		let marker;
		let place;

		geocoder.geocode({ 'location': latlng }, function (results, status) {
			if (status === 'OK') {
				map = new google.maps.Map(div, {
					zoom: 8,
					center: latlng
				});
				marker = new google.maps.Marker({
					map: map,
					position: latlng
				});
				place = document.createTextNode(results[0].formatted_address);
				p.appendChild(place);
				root.appendChild(p);
			} else {
				console.log('Geocoder failed due to: ' + status);
			}
		});
	}

export default mapUser;