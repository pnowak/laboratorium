'use strict';

import { get } from './helpers';

function mapName(data) {
	return data.map(function (item, index) {
        item.full_name = [item.last_name, item.first_name, item.username].join(' ');
        createLi(item.full_name);
    });
}

function createLi(value) {
	const node = get('users');
	const li = document.createElement('li');
	const content = document.createTextNode(value);

	li.appendChild(content);
	li.addEventListener('click', createUser, false);
	node.appendChild(li);
}

function createUser(item) {
	console.log(item);
}

export default mapName;