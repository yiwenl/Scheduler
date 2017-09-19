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
/******/ 	__webpack_require__.p = "http://localhost:8080/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _scheduler = __webpack_require__(2);

	var _scheduler2 = _interopRequireDefault(_scheduler);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var index = _scheduler2.default.addEF(loop); // main.js

	var count = 0;

	function loop() {
		console.log('Loop', count, _scheduler2.default.deltaTime);

		if (count++ > 10) {
			_scheduler2.default.removeEF(index);
			_scheduler2.default.next(call, '00');
		}
	}

	_scheduler2.default.delay(call, '01', 500);
	_scheduler2.default.delay(call, '02', 1000);

	function call(str) {
		console.log('Calling : ', str);
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(3);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(4);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Scheduler.js
	var FRAMERATE = 60;

	var Scheduler = function () {
		function Scheduler() {
			(0, _classCallCheck3.default)(this, Scheduler);

			this._delayTasks = [];
			this._nextTasks = [];
			this._deferTasks = [];
			this._highTasks = [];
			this._usurpTask = [];
			this._enterframeTasks = [];
			this._idTable = 0;

			this._startTime = new Date().getTime();

			this._deltaTime = 0;

			this._loop();
		}

		//  PUBLIC METHODS

		(0, _createClass3.default)(Scheduler, [{
			key: "addEF",
			value: function addEF(func, params) {
				params = params || [];
				var id = this._idTable;
				this._enterframeTasks[id] = { func: func, params: params };
				this._idTable++;
				return id;
			}
		}, {
			key: "removeEF",
			value: function removeEF(id) {
				if (this._enterframeTasks[id] !== undefined) {
					this._enterframeTasks[id] = null;
				}
				return -1;
			}
		}, {
			key: "delay",
			value: function delay(func, params, _delay) {
				var time = new Date().getTime();
				var t = { func: func, params: params, delay: _delay, time: time };
				this._delayTasks.push(t);
			}
		}, {
			key: "defer",
			value: function defer(func, params) {
				var t = { func: func, params: params };
				this._deferTasks.push(t);
			}
		}, {
			key: "next",
			value: function next(func, params) {
				var t = { func: func, params: params };
				this._nextTasks.push(t);
			}
		}, {
			key: "usurp",
			value: function usurp(func, params) {
				var t = { func: func, params: params };
				this._usurpTask.push(t);
			}

			//  PRIVATE METHODS

		}, {
			key: "_process",
			value: function _process() {
				var i = 0;
				var task = void 0;
				var interval = void 0;
				var current = void 0;
				for (i = 0; i < this._enterframeTasks.length; i++) {
					task = this._enterframeTasks[i];
					if (task !== null && task !== undefined) {
						task.func(task.params);
					}
				}

				while (this._highTasks.length > 0) {
					task = this._highTasks.pop();
					task.func(task.params);
				}

				var startTime = new Date().getTime();

				for (i = 0; i < this._delayTasks.length; i++) {
					task = this._delayTasks[i];
					if (startTime - task.time > task.delay) {
						task.func(task.params);
						this._delayTasks.splice(i, 1);
					}
				}

				startTime = new Date().getTime();
				interval = 1000 / FRAMERATE;
				while (this._deferTasks.length > 0) {
					task = this._deferTasks.shift();
					current = new Date().getTime();
					if (current - startTime < interval) {
						task.func(task.params);
					} else {
						this._deferTasks.unshift(task);
						break;
					}
				}

				startTime = new Date().getTime();
				interval = 1000 / FRAMERATE;
				while (this._usurpTask.length > 0) {
					task = this._usurpTask.shift();
					current = new Date().getTime();
					if (current - startTime < interval) {
						task.func(task.params);
					}
				}

				this._highTasks = this._highTasks.concat(this._nextTasks);
				this._nextTasks = [];
				this._usurpTask = [];

				this._deltaTime = (startTime - this._startTime) / 1000;
			}
		}, {
			key: "_loop",
			value: function _loop() {
				var _this = this;

				this._process();
				window.requestAnimationFrame(function () {
					return _this._loop();
				});
			}
		}, {
			key: "deltaTime",
			get: function get() {
				return this._deltaTime;
			}
		}]);
		return Scheduler;
	}();

	var scheduler = new Scheduler();

	exports.default = scheduler;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(5);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(6), __esModule: true };

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	var $Object = __webpack_require__(10).Object;
	module.exports = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(18), 'Object', { defineProperty: __webpack_require__(14).f });


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(9);
	var core = __webpack_require__(10);
	var ctx = __webpack_require__(11);
	var hide = __webpack_require__(13);
	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && key in exports) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	module.exports = $export;


/***/ },
/* 9 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ },
/* 10 */
/***/ function(module, exports) {

	var core = module.exports = { version: '2.5.1' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(12);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(14);
	var createDesc = __webpack_require__(22);
	module.exports = __webpack_require__(18) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(15);
	var IE8_DOM_DEFINE = __webpack_require__(17);
	var toPrimitive = __webpack_require__(21);
	var dP = Object.defineProperty;

	exports.f = __webpack_require__(18) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(16);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(18) && !__webpack_require__(19)(function () {
	  return Object.defineProperty(__webpack_require__(20)('div'), 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(19)(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(16);
	var document = __webpack_require__(9).document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(16);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};


/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};


/***/ }
/******/ ]);