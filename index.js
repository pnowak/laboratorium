'use strict';

import status from './src/status';
import json from './src/json';
import filterActive from './src/active';
import mapName from './src/mapUsers';
import createLi from './src/li';
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
            const sort = active.sort(function (a, b) { 
                if (a.last_name === null || b.last_name === null) { 
                    return;
                }
                return a.last_name.localeCompare(b.last_name);
            });

            return sort;
        }).then(function(sort) {
            mapName(sort);
        }).catch(function(error) {
          	console.log('Request failed', error);
        });