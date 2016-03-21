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
		console.log('Loop', count);

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

	exports.default = (function () {
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
	})();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(6), __esModule: true };

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(7);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ }
/******/ ]);