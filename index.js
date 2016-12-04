'use strict';

import status from './src/status';
import json from './src/json';
import filterActive from './src/active';
import createLi from './src/li';
import { get } from './src/helpers';
import { isWomen, isMen, filterGender } from './src/gender';

const url = 'http://zadanie.laboratorium.ee/users.json';

fetch(url)
        .then(status)
        .then(json)
        .then(function(data) {
        	const active = filterActive(data);
            const male = filterGender(active, 'gender', isMen);
            const female = filterGender(active, 'gender', isWomen);

            createLi(`wszystkich: ${data.length}`);
            createLi(`aktywnych: ${active.length}`);
            createLi(`aktywnych kobiet: ${female.length}`);
            createLi(`aktywnych mężczyzn: ${male.length}`);

        	return active;
        }).then(function(active) {
            active.forEach(function (item, index) {
                for (let prop in item) {
                    if (data.hasOwnProperty(prop)) {
                        
                    }
                }
                console.log(item);
            });

        }).catch(function(error) {
          	console.log('Request failed', error);
        });