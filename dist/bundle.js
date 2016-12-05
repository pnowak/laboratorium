/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _status = __webpack_require__(1);

	var _status2 = _interopRequireDefault(_status);

	var _json = __webpack_require__(2);

	var _json2 = _interopRequireDefault(_json);

	var _active = __webpack_require__(3);

	var _active2 = _interopRequireDefault(_active);

	var _sixMonth = __webpack_require__(4);

	var _sixMonth2 = _interopRequireDefault(_sixMonth);

	var _mapUsers = __webpack_require__(5);

	var _mapUsers2 = _interopRequireDefault(_mapUsers);

	var _users = __webpack_require__(7);

	var _users2 = _interopRequireDefault(_users);

	var _gender = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var url = 'http://zadanie.laboratorium.ee/users.json';

	fetch(url).then(_status2.default).then(_json2.default).then(function (data) {
	    var active = (0, _active2.default)(data);
	    var male = (0, _gender.filterGender)(active, 'gender', _gender.isMen);
	    var female = (0, _gender.filterGender)(active, 'gender', _gender.isWomen);
	    var halfYear = (0, _sixMonth2.default)(active);

	    (0, _users2.default)('wszystkich: ' + data.length);
	    (0, _users2.default)('aktywnych: ' + active.length);
	    (0, _users2.default)('aktywnych kobiet: ' + female.length);
	    (0, _users2.default)('aktywnych m\u0119\u017Cczyzn: ' + male.length);
	    (0, _users2.default)('aktywnych w ci\u0105gu p\xF3\u0142 roku: ' + halfYear.length);

	    return active;
	}).then(function (active) {
	    var sort = active.sort(function (a, b) {
	        if (a.last_name === null || b.last_name === null) {
	            return;
	        }
	        return a.last_name.localeCompare(b.last_name);
	    });

	    return sort;
	}).then(function (sort) {
	    (0, _mapUsers2.default)(sort);
	}).catch(function (error) {
	    console.log('Request failed', error);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function status(response) {
	  if (response.status >= 200 && response.status < 300) {
	    return Promise.resolve(response);
	  } else {
	    return Promise.reject(new Error(response.statusText));
	  }
	}

	exports.default = status;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function json(response) {
	  return response.json();
	}

	exports.default = json;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	function filterActive(data) {
		var active = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

		var filter = data.filter(function (item, index) {
			for (var i in item) {
				if (i === 'active' && item[i] === active) {
					return item;
				}
			}
		});

		return filter;
	}

	exports.default = filterActive;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	function filterSixMonth(data) {
		var filter = data.filter(function (item, index) {
			for (var i in item) {
				if (i === 'last_login' && item[i] !== null) {
					var half = 15768000000;
					var now = Date.now();
					var last = Date.parse(item[i]);console.log(now - last);

					if (now - last > half) {
						return item;
					}
				}
			}
		});

		return filter;
	}

	exports.default = filterSixMonth;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _helpers = __webpack_require__(6);

	function mapUser(data) {
		return data.map(function (item, index) {
			item.full_name = [item.last_name, item.first_name, item.username].join(' ');
			createLi(item.full_name, item);
		});
	}

	function createLi(value, item) {
		var node = (0, _helpers.get)('users');
		var li = document.createElement('li');
		var content = document.createTextNode(value);

		li.appendChild(content);
		li.addEventListener('click', function (e) {
			createUser(item);
		}, false);
		node.appendChild(li);
	}

	function createUser(item) {
		var root = (0, _helpers.get)('user');
		var fragm = document.createDocumentFragment();

		if (root.textContent !== '') {
			var child = root.childNodes;
			var arrayChild = Array.from(child);

			arrayChild.forEach(function (item, index) {
				item.classList.add('disappear');
			});
		}

		for (var prop in item) {
			if (item.hasOwnProperty(prop)) {
				if (prop === 'favorites' && item[prop].color !== null) {
					var body = document.body;
					body.style.backgroundColor = item[prop].color;
				}

				if (prop === 'first_name' && item[prop] !== null || prop === 'last_name' && item[prop] !== null || prop === 'email' && item[prop] !== null) {
					var p = document.createElement('p');
					var content = document.createTextNode('' + item[prop]);

					p.appendChild(content);
					fragm.appendChild(p);
				}

				if (prop === 'avatar') {
					var img = document.createElement('img');
					var src = item[prop] ? img.setAttribute('src', item[prop]) : '';

					fragm.appendChild(img);
				}

				if (prop === 'coordinates') {
					var div = document.createElement('div');
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
		var geocoder = new google.maps.Geocoder();
		var latlng = { lat: parseFloat(address.lat), lng: parseFloat(address.lng) };
		var map = void 0;
		var marker = void 0;

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
			} else {
				console.log('Geocoder failed due to: ' + status);
			}
		});
	}

	exports.default = mapUser;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.get = get;
	function get(id) {
	    return document.getElementById(id);
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _helpers = __webpack_require__(6);

	function createLi(value) {
		var node = (0, _helpers.get)('summary');
		var li = document.createElement('li');
		var content = document.createTextNode(value);

		li.appendChild(content);
		node.appendChild(li);
	}

	exports.default = createLi;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.filterGender = filterGender;
	exports.isWomen = isWomen;
	exports.isMen = isMen;
	function filterGender(data, condition, fn) {
		var filter = data.filter(function (item, index) {
			for (var i in item) {
				if (i === condition) {
					return item[i].some(fn);
				}
			}
		});

		return filter;
	}

	function isWomen(x) {
		return x === 'Female';
	}

	function isMen(x) {
		return x === 'Male';
	}

/***/ }
/******/ ]);