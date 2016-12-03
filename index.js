'use strict';

import status from './src/status';
import json from './src/json';
import filter from './src/filter';
import { isWomen, isMen } from './src/gender';

const url = 'http://zadanie.laboratorium.ee/users.json';

fetch(url)
        .then(status)
        .then(json)
        .then(function(data) {
        	const active = filter(data);
            console.log(active);

        }).catch(function(error) {
          	console.log('Request failed', error);
        });