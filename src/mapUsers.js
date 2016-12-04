'use strict';

import { get } from './helpers';

function mapName(data) {
	return data.map(function (item, index) {
        item.full_name = [item.last_name, item.first_name, item.username].join(' ');
        createLi(item.full_name, item);
    });
}

function createLi(value, item) {
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

	if (root.textContent !== '') {
		let child = root.childNodes;
		let arrayChild = Array.from(child);

		arrayChild.forEach(function (item, index) {
			console.log(item);
			item.classList.add('disappear');
		});
	}

	for (let prop in item) {
        if (item.hasOwnProperty(prop)) {
        	let p = document.createElement('p');
        	let content = document.createTextNode(`${prop} ${item[prop]}`);

        	p.appendChild(content);
            root.appendChild(p);
        }
    }	
}

export default mapName;