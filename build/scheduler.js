!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("scheduler",[],t):"object"==typeof exports?exports.scheduler=t():e.scheduler=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(2),u=r(i),o=n(3),s=r(o),a=60,f=function(){function e(){(0,u.default)(this,e),this._delayTasks=[],this._nextTasks=[],this._deferTasks=[],this._highTasks=[],this._usurpTask=[],this._enterframeTasks=[],this._idTable=0,this._startTime=(new Date).getTime(),this._deltaTime=0,this._loop()}return(0,s.default)(e,[{key:"addEF",value:function(e,t){t=t||[];var n=this._idTable;return this._enterframeTasks[n]={func:e,params:t},this._idTable++,n}},{key:"removeEF",value:function(e){return void 0!==this._enterframeTasks[e]&&(this._enterframeTasks[e]=null),-1}},{key:"delay",value:function(e,t,n){var r=(new Date).getTime(),i={func:e,params:t,delay:n,time:r};this._delayTasks.push(i)}},{key:"defer",value:function(e,t){var n={func:e,params:t};this._deferTasks.push(n)}},{key:"next",value:function(e,t){var n={func:e,params:t};this._nextTasks.push(n)}},{key:"usurp",value:function(e,t){var n={func:e,params:t};this._usurpTask.push(n)}},{key:"_process",value:function(){var e=0,t=void 0,n=void 0,r=void 0;for(e=0;e<this._enterframeTasks.length;e++)t=this._enterframeTasks[e],null!==t&&void 0!==t&&t.func(t.params);for(;this._highTasks.length>0;)t=this._highTasks.pop(),t.func(t.params);var i=(new Date).getTime();for(this._deltaTime=(i-this._startTime)/1e3,e=0;e<this._delayTasks.length;e++)t=this._delayTasks[e],i-t.time>t.delay&&(t.func(t.params),this._delayTasks.splice(e,1));for(i=(new Date).getTime(),this._deltaTime=(i-this._startTime)/1e3,n=1e3/a;this._deferTasks.length>0;){if(t=this._deferTasks.shift(),r=(new Date).getTime(),!(r-i<n)){this._deferTasks.unshift(t);break}t.func(t.params)}for(i=(new Date).getTime(),this._deltaTime=(i-this._startTime)/1e3,n=1e3/a;this._usurpTask.length>0;)t=this._usurpTask.shift(),r=(new Date).getTime(),r-i<n&&t.func(t.params);this._highTasks=this._highTasks.concat(this._nextTasks),this._nextTasks=[],this._usurpTask=[]}},{key:"_loop",value:function(){var e=this;this._process(),window.requestAnimationFrame(function(){return e._loop()})}},{key:"deltaTime",get:function(){return this._deltaTime}}]),e}(),c=new f;t.default=c,e.exports=t.default},function(e,t){"use strict";t.__esModule=!0,t.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var i=n(4),u=r(i);t.default=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,u.default)(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}()},function(e,t,n){e.exports={"default":n(5),__esModule:!0}},function(e,t,n){n(6);var r=n(9).Object;e.exports=function(e,t,n){return r.defineProperty(e,t,n)}},function(e,t,n){var r=n(7);r(r.S+r.F*!n(17),"Object",{defineProperty:n(13).f})},function(e,t,n){var r=n(8),i=n(9),u=n(10),o=n(12),s="prototype",a=function(e,t,n){var f,c,l,p=e&a.F,h=e&a.G,d=e&a.S,_=e&a.P,v=e&a.B,T=e&a.W,y=h?i:i[t]||(i[t]={}),m=y[s],k=h?r:d?r[t]:(r[t]||{})[s];h&&(n=t);for(f in n)c=!p&&k&&void 0!==k[f],c&&f in y||(l=c?k[f]:n[f],y[f]=h&&"function"!=typeof k[f]?n[f]:v&&c?u(l,r):T&&k[f]==l?function(e){var t=function(t,n,r){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,n)}return new e(t,n,r)}return e.apply(this,arguments)};return t[s]=e[s],t}(l):_&&"function"==typeof l?u(Function.call,l):l,_&&((y.virtual||(y.virtual={}))[f]=l,e&a.R&&m&&!m[f]&&o(m,f,l)))};a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,e.exports=a},function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(e,t){var n=e.exports={version:"2.5.1"};"number"==typeof __e&&(__e=n)},function(e,t,n){var r=n(11);e.exports=function(e,t,n){if(r(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,i){return e.call(t,n,r,i)}}return function(){return e.apply(t,arguments)}}},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t,n){var r=n(13),i=n(21);e.exports=n(17)?function(e,t,n){return r.f(e,t,i(1,n))}:function(e,t,n){return e[t]=n,e}},function(e,t,n){var r=n(14),i=n(16),u=n(20),o=Object.defineProperty;t.f=n(17)?Object.defineProperty:function(e,t,n){if(r(e),t=u(t,!0),r(n),i)try{return o(e,t,n)}catch(s){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},function(e,t,n){var r=n(15);e.exports=function(e){if(!r(e))throw TypeError(e+" is not an object!");return e}},function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,t,n){e.exports=!n(17)&&!n(18)(function(){return 7!=Object.defineProperty(n(19)("div"),"a",{get:function(){return 7}}).a})},function(e,t,n){e.exports=!n(18)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,t){e.exports=function(e){try{return!!e()}catch(t){return!0}}},function(e,t,n){var r=n(15),i=n(8).document,u=r(i)&&r(i.createElement);e.exports=function(e){return u?i.createElement(e):{}}},function(e,t,n){var r=n(15);e.exports=function(e,t){if(!r(e))return e;var n,i;if(t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;if("function"==typeof(n=e.valueOf)&&!r(i=n.call(e)))return i;if(!t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;throw TypeError("Can't convert object to primitive value")}},function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}}])});