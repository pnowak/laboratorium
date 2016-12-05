'use strict';

import { get } from './helpers';

function createLi(value) {
	const node = get('summary');
	const li = document.createElement('li');
	const content = document.createTextNode(value);

	li.appendChild(content);
	node.appendChild(li);
}

export default createLi;