'use strict';

import status from './src/status';
import json from './src/json';
import filterActive from './src/active';
import { isWomen, isMen, filterGender } from './src/gender';

const url = 'http://zadanie.laboratorium.ee/users.json';

fetch(url)
        .then(status)
        .then(json)
        .then(function(data) {
        	const active = filterActive(data);
        	return active;
        }).then(function(active) {
        	const male = filterGender(active, 'gender', isMen);
        	const female = filterGender(active, 'gender', isWomen);
            console.log(male, female);

        }).catch(function(error) {
          	console.log('Request failed', error);
        });