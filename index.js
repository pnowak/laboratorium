'use strict';

import status from './src/status';
import json from './src/json';

const url = 'http://zadanie.laboratorium.ee/users.json';

fetch(url)
        .then(status)
        .then(json)
        .then(function(data) {
            console.log(data);
        }).catch(function(error) {
          	console.log('Request failed', error);
        });