typeof window !== "undefined" &&
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Hls"] = factory();
	else
		root["Hls"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/hls.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/eventemitter3/index.js":
/*!*********************************************!*\
  !*** ./node_modules/eventemitter3/index.js ***!
  \*********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),

/***/ "./node_modules/url-toolkit/src/url-toolkit.js":
/*!*****************************************************!*\
  !*** ./node_modules/url-toolkit/src/url-toolkit.js ***!
  \*****************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// see https://tools.ietf.org/html/rfc1808

/* jshint ignore:start */
(function(root) { 
/* jshint ignore:end */

  var URL_REGEX = /^((?:[a-zA-Z0-9+\-.]+:)?)(\/\/[^\/?#]*)?((?:[^\/\?#]*\/)*.*?)??(;.*?)?(\?.*?)?(#.*?)?$/;
  var FIRST_SEGMENT_REGEX = /^([^\/?#]*)(.*)$/;
  var SLASH_DOT_REGEX = /(?:\/|^)\.(?=\/)/g;
  var SLASH_DOT_DOT_REGEX = /(?:\/|^)\.\.\/(?!\.\.\/).*?(?=\/)/g;

  var URLToolkit = { // jshint ignore:line
    // If opts.alwaysNormalize is true then the path will always be normalized even when it starts with / or //
    // E.g
    // With opts.alwaysNormalize = false (default, spec compliant)
    // http://a.com/b/cd + /e/f/../g => http://a.com/e/f/../g
    // With opts.alwaysNormalize = true (not spec compliant)
    // http://a.com/b/cd + /e/f/../g => http://a.com/e/g
    buildAbsoluteURL: function(baseURL, relativeURL, opts) {
      opts = opts || {};
      // remove any remaining space and CRLF
      baseURL = baseURL.trim();
      relativeURL = relativeURL.trim();
      if (!relativeURL) {
        // 2a) If the embedded URL is entirely empty, it inherits the
        // entire base URL (i.e., is set equal to the base URL)
        // and we are done.
        if (!opts.alwaysNormalize) {
          return baseURL;
        }
        var basePartsForNormalise = URLToolkit.parseURL(baseURL);
        if (!basePartsForNormalise) {
          throw new Error('Error trying to parse base URL.');
        }
        basePartsForNormalise.path = URLToolkit.normalizePath(basePartsForNormalise.path);
        return URLToolkit.buildURLFromParts(basePartsForNormalise);
      }
      var relativeParts = URLToolkit.parseURL(relativeURL);
      if (!relativeParts) {
        throw new Error('Error trying to parse relative URL.');
      }
      if (relativeParts.scheme) {
        // 2b) If the embedded URL starts with a scheme name, it is
        // interpreted as an absolute URL and we are done.
        if (!opts.alwaysNormalize) {
          return relativeURL;
        }
        relativeParts.path = URLToolkit.normalizePath(relativeParts.path);
        return URLToolkit.buildURLFromParts(relativeParts);
      }
      var baseParts = URLToolkit.parseURL(baseURL);
      if (!baseParts) {
        throw new Error('Error trying to parse base URL.');
      }
      if (!baseParts.netLoc && baseParts.path && baseParts.path[0] !== '/') {
        // If netLoc missing and path doesn't start with '/', assume everthing before the first '/' is the netLoc
        // This causes 'example.com/a' to be handled as '//example.com/a' instead of '/example.com/a'
        var pathParts = FIRST_SEGMENT_REGEX.exec(baseParts.path);
        baseParts.netLoc = pathParts[1];
        baseParts.path = pathParts[2];
      }
      if (baseParts.netLoc && !baseParts.path) {
        baseParts.path = '/';
      }
      var builtParts = {
        // 2c) Otherwise, the embedded URL inherits the scheme of
        // the base URL.
        scheme: baseParts.scheme,
        netLoc: relativeParts.netLoc,
        path: null,
        params: relativeParts.params,
        query: relativeParts.query,
        fragment: relativeParts.fragment
      };
      if (!relativeParts.netLoc) {
        // 3) If the embedded URL's <net_loc> is non-empty, we skip to
        // Step 7.  Otherwise, the embedded URL inherits the <net_loc>
        // (if any) of the base URL.
        builtParts.netLoc = baseParts.netLoc;
        // 4) If the embedded URL path is preceded by a slash "/", the
        // path is not relative and we skip to Step 7.
        if (relativeParts.path[0] !== '/') {
          if (!relativeParts.path) {
            // 5) If the embedded URL path is empty (and not preceded by a
            // slash), then the embedded URL inherits the base URL path
            builtParts.path = baseParts.path;
            // 5a) if the embedded URL's <params> is non-empty, we skip to
            // step 7; otherwise, it inherits the <params> of the base
            // URL (if any) and
            if (!relativeParts.params) {
              builtParts.params = baseParts.params;
              // 5b) if the embedded URL's <query> is non-empty, we skip to
              // step 7; otherwise, it inherits the <query> of the base
              // URL (if any) and we skip to step 7.
              if (!relativeParts.query) {
                builtParts.query = baseParts.query;
              }
            }
          } else {
            // 6) The last segment of the base URL's path (anything
            // following the rightmost slash "/", or the entire path if no
            // slash is present) is removed and the embedded URL's path is
            // appended in its place.
            var baseURLPath = baseParts.path;
            var newPath = baseURLPath.substring(0, baseURLPath.lastIndexOf('/') + 1) + relativeParts.path;
            builtParts.path = URLToolkit.normalizePath(newPath);
          }
        }
      }
      if (builtParts.path === null) {
        builtParts.path = opts.alwaysNormalize ? URLToolkit.normalizePath(relativeParts.path) : relativeParts.path;
      }
      return URLToolkit.buildURLFromParts(builtParts);
    },
    parseURL: function(url) {
      var parts = URL_REGEX.exec(url);
      if (!parts) {
        return null;
      }
      return {
        scheme: parts[1] || '',
        netLoc: parts[2] || '',
        path: parts[3] || '',
        params: parts[4] || '',
        query: parts[5] || '',
        fragment: parts[6] || ''
      };
    },
    normalizePath: function(path) {
      // The following operations are
      // then applied, in order, to the new path:
      // 6a) All occurrences of "./", where "." is a complete path
      // segment, are removed.
      // 6b) If the path ends with "." as a complete path segment,
      // that "." is removed.
      path = path.split('').reverse().join('').replace(SLASH_DOT_REGEX, '');
      // 6c) All occurrences of "<segment>/../", where <segment> is a
      // complete path segment not equal to "..", are removed.
      // Removal of these path segments is performed iteratively,
      // removing the leftmost matching pattern on each iteration,
      // until no matching pattern remains.
      // 6d) If the path ends with "<segment>/..", where <segment> is a
      // complete path segment not equal to "..", that
      // "<segment>/.." is removed.
      while (path.length !== (path = path.replace(SLASH_DOT_DOT_REGEX, '')).length) {} // jshint ignore:line
      return path.split('').reverse().join('');
    },
    buildURLFromParts: function(parts) {
      return parts.scheme + parts.netLoc + parts.path + parts.params + parts.query + parts.fragment;
    }
  };

/* jshint ignore:start */
  if(true)
    module.exports = URLToolkit;
  else {}
})(this);
/* jshint ignore:end */


/***/ }),

/***/ "./src/controller/stream-controller.js":
/*!*********************************************!*\
  !*** ./src/controller/stream-controller.js ***!
  \*********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /Users/savlan/work/hls.js/src/controller/stream-controller.js: Support for the experimental syntax 'optionalChaining' isn't currently enabled (102:44):\n\n\u001b[0m \u001b[90m 100 | \u001b[39m      \u001b[36mbreak\u001b[39m\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 101 | \u001b[39m    \u001b[36mcase\u001b[39m \u001b[33mState\u001b[39m\u001b[33m.\u001b[39m\u001b[33mWAITING_LEVEL\u001b[39m\u001b[33m:\u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 102 | \u001b[39m      \u001b[36mvar\u001b[39m details \u001b[33m=\u001b[39m \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mlevels[\u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mlevel]\u001b[33m?\u001b[39m\u001b[33m.\u001b[39mdetails\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m     | \u001b[39m                                           \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 103 | \u001b[39m       \u001b[90m// check if playlist is already loaded (must be current level for live)\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 104 | \u001b[39m      \u001b[36mif\u001b[39m (details \u001b[33m&&\u001b[39m (\u001b[33m!\u001b[39mdetails\u001b[33m.\u001b[39mlive \u001b[33m||\u001b[39m \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mlevelLastLoaded \u001b[33m===\u001b[39m \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mlevel)) {\u001b[0m\n\u001b[0m \u001b[90m 105 | \u001b[39m        \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mstate \u001b[33m=\u001b[39m \u001b[33mState\u001b[39m\u001b[33m.\u001b[39m\u001b[33mIDLE\u001b[39m\u001b[33m;\u001b[39m\u001b[0m\n\nAdd @babel/plugin-proposal-optional-chaining (https://git.io/vb4Sk) to the 'plugins' section of your Babel config to enable transformation.\n    at Parser.raise (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:6322:17)\n    at Parser.expectPlugin (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:7643:18)\n    at Parser.parseSubscript (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:8420:12)\n    at Parser.parseSubscripts (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:8406:19)\n    at Parser.parseExprSubscripts (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:8395:17)\n    at Parser.parseMaybeUnary (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:8365:21)\n    at Parser.parseExprOps (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:8252:23)\n    at Parser.parseMaybeConditional (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:8225:23)\n    at Parser.parseMaybeAssign (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:8172:21)\n    at Parser.parseVar (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:10415:26)\n    at Parser.parseVarStatement (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:10234:10)\n    at Parser.parseStatementContent (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:9830:21)\n    at Parser.parseStatement (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:9763:17)\n    at Parser.parseSwitchStatement (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:10170:36)\n    at Parser.parseStatementContent (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:9814:21)\n    at Parser.parseStatement (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:9763:17)\n    at Parser.parseBlockOrModuleBlockBody (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:10340:25)\n    at Parser.parseBlockBody (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:10327:10)\n    at Parser.parseBlock (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:10311:10)\n    at Parser.parseFunctionBody (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:9382:24)\n    at Parser.parseFunctionBodyAndFinish (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:9352:10)\n    at Parser.parseMethod (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:9306:10)\n    at Parser.pushClassMethod (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:10743:30)\n    at Parser.parseClassMemberWithIsStatic (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:10668:12)\n    at Parser.parseClassMember (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:10607:10)\n    at /Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:10562:14\n    at Parser.withTopicForbiddingContext (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:9657:14)\n    at Parser.parseClassBody (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:10539:10)\n    at Parser.parseClass (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:10513:22)\n    at Parser.parseStatementContent (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:9805:21)\n    at Parser.parseStatement (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:9763:17)\n    at Parser.parseBlockOrModuleBlockBody (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:10340:25)\n    at Parser.parseBlockBody (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:10327:10)\n    at Parser.parseTopLevel (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:9692:10)\n    at Parser.parse (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:11209:17)\n    at parse (/Users/savlan/work/hls.js/node_modules/@babel/parser/lib/index.js:11245:38)\n    at parser (/Users/savlan/work/hls.js/node_modules/@babel/core/lib/transformation/normalize-file.js:170:34)\n    at normalizeFile (/Users/savlan/work/hls.js/node_modules/@babel/core/lib/transformation/normalize-file.js:138:11)\n    at runSync (/Users/savlan/work/hls.js/node_modules/@babel/core/lib/transformation/index.js:44:43)\n    at runAsync (/Users/savlan/work/hls.js/node_modules/@babel/core/lib/transformation/index.js:35:14)\n    at /Users/savlan/work/hls.js/node_modules/@babel/core/lib/transform.js:34:34\n    at processTicksAndRejections (internal/process/task_queues.js:79:11)");

/***/ }),

/***/ "./src/empty.js":
/*!**********************!*\
  !*** ./src/empty.js ***!
  \**********************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

// This file is inserted as a shim for modules which we do not want to include into the distro.
// This replacement is done in the "resolve" section of the webpack config.
module.exports = void 0;

/***/ }),

/***/ "./src/hls.ts":
/*!*********************************!*\
  !*** ./src/hls.ts + 36 modules ***!
  \*********************************/
/*! exports provided: default */
/*! ModuleConcatenation bailout: Cannot concat with ./src/controller/stream-controller.js (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ./node_modules/eventemitter3/index.js (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ./node_modules/url-toolkit/src/url-toolkit.js (<- Module is not an ECMAScript module) */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/url-toolkit/src/url-toolkit.js
var url_toolkit = __webpack_require__("./node_modules/url-toolkit/src/url-toolkit.js");

// CONCATENATED MODULE: ./src/errors.ts
var ErrorTypes;
/**
 * @enum {ErrorDetails}
 * @typedef {string} ErrorDetail
 */

(function (ErrorTypes) {
  ErrorTypes["NETWORK_ERROR"] = "networkError";
  ErrorTypes["MEDIA_ERROR"] = "mediaError";
  ErrorTypes["KEY_SYSTEM_ERROR"] = "keySystemError";
  ErrorTypes["MUX_ERROR"] = "muxError";
  ErrorTypes["OTHER_ERROR"] = "otherError";
})(ErrorTypes || (ErrorTypes = {}));

var ErrorDetails;

(function (ErrorDetails) {
  ErrorDetails["KEY_SYSTEM_NO_KEYS"] = "keySystemNoKeys";
  ErrorDetails["KEY_SYSTEM_NO_ACCESS"] = "keySystemNoAccess";
  ErrorDetails["KEY_SYSTEM_NO_SESSION"] = "keySystemNoSession";
  ErrorDetails["KEY_SYSTEM_LICENSE_REQUEST_FAILED"] = "keySystemLicenseRequestFailed";
  ErrorDetails["KEY_SYSTEM_NO_INIT_DATA"] = "keySystemNoInitData";
  ErrorDetails["MANIFEST_LOAD_ERROR"] = "manifestLoadError";
  ErrorDetails["MANIFEST_LOAD_TIMEOUT"] = "manifestLoadTimeOut";
  ErrorDetails["MANIFEST_PARSING_ERROR"] = "manifestParsingError";
  ErrorDetails["MANIFEST_INCOMPATIBLE_CODECS_ERROR"] = "manifestIncompatibleCodecsError";
  ErrorDetails["LEVEL_LOAD_ERROR"] = "levelLoadError";
  ErrorDetails["LEVEL_LOAD_TIMEOUT"] = "levelLoadTimeOut";
  ErrorDetails["LEVEL_SWITCH_ERROR"] = "levelSwitchError";
  ErrorDetails["AUDIO_TRACK_LOAD_ERROR"] = "audioTrackLoadError";
  ErrorDetails["AUDIO_TRACK_LOAD_TIMEOUT"] = "audioTrackLoadTimeOut";
  ErrorDetails["FRAG_LOAD_ERROR"] = "fragLoadError";
  ErrorDetails["FRAG_LOAD_TIMEOUT"] = "fragLoadTimeOut";
  ErrorDetails["FRAG_DECRYPT_ERROR"] = "fragDecryptError";
  ErrorDetails["FRAG_PARSING_ERROR"] = "fragParsingError";
  ErrorDetails["REMUX_ALLOC_ERROR"] = "remuxAllocError";
  ErrorDetails["KEY_LOAD_ERROR"] = "keyLoadError";
  ErrorDetails["KEY_LOAD_TIMEOUT"] = "keyLoadTimeOut";
  ErrorDetails["BUFFER_ADD_CODEC_ERROR"] = "bufferAddCodecError";
  ErrorDetails["BUFFER_APPEND_ERROR"] = "bufferAppendError";
  ErrorDetails["BUFFER_APPENDING_ERROR"] = "bufferAppendingError";
  ErrorDetails["BUFFER_STALLED_ERROR"] = "bufferStalledError";
  ErrorDetails["BUFFER_FULL_ERROR"] = "bufferFullError";
  ErrorDetails["BUFFER_SEEK_OVER_HOLE"] = "bufferSeekOverHole";
  ErrorDetails["BUFFER_NUDGE_ON_STALL"] = "bufferNudgeOnStall";
  ErrorDetails["INTERNAL_EXCEPTION"] = "internalException";
})(ErrorDetails || (ErrorDetails = {}));
// CONCATENATED MODULE: ./src/polyfills/number-isFinite.js
var isFiniteNumber = Number.isFinite || function (value) {
  return typeof value === 'number' && isFinite(value);
};
// CONCATENATED MODULE: ./src/events.js
var _HlsEvents;

/**
 * @readonly
 * @enum {string}
 */
var HlsEvents = (_HlsEvents = {
  // fired before MediaSource is attaching to media element - data: { media }
  MEDIA_ATTACHING: 'hlsMediaAttaching',
  // fired when MediaSource has been succesfully attached to media element - data: { }
  MEDIA_ATTACHED: 'hlsMediaAttached',
  // fired before detaching MediaSource from media element - data: { }
  MEDIA_DETACHING: 'hlsMediaDetaching',
  // fired when MediaSource has been detached from media element - data: { }
  MEDIA_DETACHED: 'hlsMediaDetached',
  // fired when we buffer is going to be reset - data: { }
  BUFFER_RESET: 'hlsBufferReset',
  // fired when we know about the codecs that we need buffers for to push into - data: {tracks : { container, codec, levelCodec, initSegment, metadata }}
  BUFFER_CODECS: 'hlsBufferCodecs',
  // fired when sourcebuffers have been created - data: { tracks : tracks }
  BUFFER_CREATED: 'hlsBufferCreated',
  // fired when we append a segment to the buffer - data: { segment: segment object }
  BUFFER_APPENDING: 'hlsBufferAppending',
  // fired when we are done with appending a media segment to the buffer - data : { parent : segment parent that triggered BUFFER_APPENDING, pending : nb of segments waiting for appending for this segment parent}
  BUFFER_APPENDED: 'hlsBufferAppended',
  // fired when the stream is finished and we want to notify the media buffer that there will be no more data - data: { }
  BUFFER_EOS: 'hlsBufferEos',
  // fired when the media buffer should be flushed - data { startOffset, endOffset }
  BUFFER_FLUSHING: 'hlsBufferFlushing',
  // fired when the media buffer has been flushed - data: { }
  BUFFER_FLUSHED: 'hlsBufferFlushed',
  // fired to signal that a manifest loading starts - data: { url : manifestURL}
  MANIFEST_LOADING: 'hlsManifestLoading',
  // fired after manifest has been loaded - data: { levels : [available quality levels], audioTracks : [ available audio tracks], url : manifestURL, stats : { trequest, tfirst, tload, mtime}}
  MANIFEST_LOADED: 'hlsManifestLoaded',
  // fired after manifest has been parsed - data: { levels : [available quality levels], firstLevel : index of first quality level appearing in Manifest}
  MANIFEST_PARSED: 'hlsManifestParsed',
  // fired when a level switch is requested - data: { level : id of new level }
  LEVEL_SWITCHING: 'hlsLevelSwitching',
  // fired when a level switch is effective - data: { level : id of new level }
  LEVEL_SWITCHED: 'hlsLevelSwitched',
  // fired when a level playlist loading starts - data: { url : level URL, level : id of level being loaded}
  LEVEL_LOADING: 'hlsLevelLoading',
  // fired when a level playlist loading finishes - data: { details : levelDetails object, level : id of loaded level, stats : { trequest, tfirst, tload, mtime} }
  LEVEL_LOADED: 'hlsLevelLoaded',
  // fired when a level's details have been updated based on previous details, after it has been loaded - data: { details : levelDetails object, level : id of updated level }
  LEVEL_UPDATED: 'hlsLevelUpdated',
  // fired when a level's PTS information has been updated after parsing a fragment - data: { details : levelDetails object, level : id of updated level, drift: PTS drift observed when parsing last fragment }
  LEVEL_PTS_UPDATED: 'hlsLevelPtsUpdated',
  // fired when the live back buffer is reached defined by the liveBackBufferLength config option - data : { bufferEnd: number }
  LIVE_BACK_BUFFER_REACHED: 'hlsLiveBackBufferReached',
  // fired to notify that audio track lists has been updated - data: { audioTracks : audioTracks }
  AUDIO_TRACKS_UPDATED: 'hlsAudioTracksUpdated',
  // fired when an audio track switching is requested - data: { id : audio track id }
  AUDIO_TRACK_SWITCHING: 'hlsAudioTrackSwitching',
  // fired when an audio track switch actually occurs - data: { id : audio track id }
  AUDIO_TRACK_SWITCHED: 'hlsAudioTrackSwitched',
  // fired when an audio track loading starts - data: { url : audio track URL, id : audio track id }
  AUDIO_TRACK_LOADING: 'hlsAudioTrackLoading',
  // fired when an audio track loading finishes - data: { details : levelDetails object, id : audio track id, stats : { trequest, tfirst, tload, mtime } }
  AUDIO_TRACK_LOADED: 'hlsAudioTrackLoaded',
  // fired to notify that subtitle track lists has been updated - data: { subtitleTracks : subtitleTracks }
  SUBTITLE_TRACKS_UPDATED: 'hlsSubtitleTracksUpdated',
  // fired when an subtitle track switch occurs - data: { id : subtitle track id }
  SUBTITLE_TRACK_SWITCH: 'hlsSubtitleTrackSwitch',
  // fired when a subtitle track loading starts - data: { url : subtitle track URL, id : subtitle track id }
  SUBTITLE_TRACK_LOADING: 'hlsSubtitleTrackLoading',
  // fired when a subtitle track loading finishes - data: { details : levelDetails object, id : subtitle track id, stats : { trequest, tfirst, tload, mtime } }
  SUBTITLE_TRACK_LOADED: 'hlsSubtitleTrackLoaded',
  // fired when a subtitle fragment has been processed - data: { success : boolean, frag : the processed frag }
  SUBTITLE_FRAG_PROCESSED: 'hlsSubtitleFragProcessed',
  // fired when the first timestamp is found - data: { id : demuxer id, initPTS: initPTS, frag : fragment object }
  INIT_PTS_FOUND: 'hlsInitPtsFound',
  // fired when a fragment loading starts - data: { frag : fragment object }
  FRAG_LOADING: 'hlsFragLoading',
  // fired when a fragment loading is progressing - data: { frag : fragment object, { trequest, tfirst, loaded } }
  FRAG_LOAD_PROGRESS: 'hlsFragLoadProgress',
  // Identifier for fragment load aborting for emergency switch down - data: { frag : fragment object }
  FRAG_LOAD_EMERGENCY_ABORTED: 'hlsFragLoadEmergencyAborted',
  // fired when a fragment loading is completed - data: { frag : fragment object, payload : fragment payload, stats : { trequest, tfirst, tload, length } }
  FRAG_LOADED: 'hlsFragLoaded',
  // fired when a fragment has finished decrypting - data: { id : demuxer id, frag: fragment object, payload : fragment payload, stats : { tstart, tdecrypt } }
  FRAG_DECRYPTED: 'hlsFragDecrypted',
  // fired when Init Segment has been extracted from fragment - data: { id : demuxer id, frag: fragment object, moov : moov MP4 box, codecs : codecs found while parsing fragment }
  FRAG_PARSING_INIT_SEGMENT: 'hlsFragParsingInitSegment',
  // fired when parsing sei text is completed - data: { id : demuxer id, frag: fragment object, samples : [ sei samples pes ] }
  FRAG_PARSING_USERDATA: 'hlsFragParsingUserdata',
  // fired when parsing id3 is completed - data: { id : demuxer id, frag: fragment object, samples : [ id3 samples pes ] }
  FRAG_PARSING_METADATA: 'hlsFragParsingMetadata',
  // fired when data have been extracted from fragment - data: { id : demuxer id, frag: fragment object, data1 : moof MP4 box or TS fragments, data2 : mdat MP4 box or null}
  FRAG_PARSING_DATA: 'hlsFragParsingData',
  // fired when fragment parsing is completed - data: { id : demuxer id, frag: fragment object }
  FRAG_PARSED: 'hlsFragParsed',
  // fired when fragment remuxed MP4 boxes have all been appended into SourceBuffer - data: { id : demuxer id, frag : fragment object, stats : { trequest, tfirst, tload, tparsed, tbuffered, length, bwEstimate } }
  FRAG_BUFFERED: 'hlsFragBuffered',
  // fired when fragment matching with current media position is changing - data : { id : demuxer id, frag : fragment object }
  FRAG_CHANGED: 'hlsFragChanged',
  // Identifier for a FPS drop event - data: { curentDropped, currentDecoded, totalDroppedFrames }
  FPS_DROP: 'hlsFpsDrop',
  // triggered when FPS drop triggers auto level capping - data: { level, droppedlevel }
  FPS_DROP_LEVEL_CAPPING: 'hlsFpsDropLevelCapping',
  // Identifier for an error event - data: { type : error type, details : error details, fatal : if true, hls.js cannot/will not try to recover, if false, hls.js will try to recover,other error specific data }
  ERROR: 'hlsError',
  // fired when hls.js instance starts destroying. Different from MEDIA_DETACHED as one could want to detach and reattach a media to the instance of hls.js to handle mid-rolls for example - data: { }
  DESTROYING: 'hlsDestroying',
  // fired when a decrypt key loading starts - data: { frag : fragment object }
  KEY_LOADING: 'hlsKeyLoading',
  // fired when a decrypt key loading is completed - data: { frag : fragment object, payload : key payload, stats : { trequest, tfirst, tload, length } }
  KEY_LOADED: 'hlsKeyLoaded',
  // fired upon stream controller state transitions - data: { previousState, nextState }
  STREAM_STATE_TRANSITION: 'hlsStreamStateTransition'
}, _HlsEvents["LIVE_BACK_BUFFER_REACHED"] = 'hlsLiveBackBufferReached', _HlsEvents);
/* harmony default export */ var events = (HlsEvents);
// CONCATENATED MODULE: ./src/utils/get-self-scope.js
function getSelfScope() {
  // see https://stackoverflow.com/a/11237259/589493
  if (typeof window === 'undefined') {
    /* eslint-disable-next-line no-undef */
    return self;
  } else {
    return window;
  }
}
// CONCATENATED MODULE: ./src/utils/logger.js


function noop() {}

var fakeLogger = {
  trace: noop,
  debug: noop,
  log: noop,
  warn: noop,
  info: noop,
  error: noop
};
var exportedLogger = fakeLogger; // let lastCallTime;
// function formatMsgWithTimeInfo(type, msg) {
//   const now = Date.now();
//   const diff = lastCallTime ? '+' + (now - lastCallTime) : '0';
//   lastCallTime = now;
//   msg = (new Date(now)).toISOString() + ' | [' +  type + '] > ' + msg + ' ( ' + diff + ' ms )';
//   return msg;
// }

function formatMsg(type, msg) {
  msg = '[' + type + '] > ' + msg;
  return msg;
}

var logger_global = getSelfScope();

function consolePrintFn(type) {
  var func = logger_global.console[type];

  if (func) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (args[0]) {
        args[0] = formatMsg(type, args[0]);
      }

      func.apply(logger_global.console, args);
    };
  }

  return noop;
}

function exportLoggerFunctions(debugConfig) {
  for (var _len2 = arguments.length, functions = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    functions[_key2 - 1] = arguments[_key2];
  }

  functions.forEach(function (type) {
    exportedLogger[type] = debugConfig[type] ? debugConfig[type].bind(debugConfig) : consolePrintFn(type);
  });
}

var enableLogs = function enableLogs(debugConfig) {
  // check that console is available
  if (logger_global.console && debugConfig === true || typeof debugConfig === 'object') {
    exportLoggerFunctions(debugConfig, // Remove out from list here to hard-disable a log-level
    // 'trace',
    'debug', 'log', 'info', 'warn', 'error'); // Some browsers don't allow to use bind on console object anyway
    // fallback to default if needed

    try {
      exportedLogger.log();
    } catch (e) {
      exportedLogger = fakeLogger;
    }
  } else {
    exportedLogger = fakeLogger;
  }
};
var logger = exportedLogger;
// CONCATENATED MODULE: ./src/event-handler.ts
/*
*
* All objects in the event handling chain should inherit from this class
*
*/



var FORBIDDEN_EVENT_NAMES = {
  'hlsEventGeneric': true,
  'hlsHandlerDestroying': true,
  'hlsHandlerDestroyed': true
};

var event_handler_EventHandler =
/*#__PURE__*/
function () {
  function EventHandler(hls) {
    this.hls = void 0;
    this.handledEvents = void 0;
    this.useGenericHandler = void 0;
    this.hls = hls;
    this.onEvent = this.onEvent.bind(this);

    for (var _len = arguments.length, events = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      events[_key - 1] = arguments[_key];
    }

    this.handledEvents = events;
    this.useGenericHandler = true;
    this.registerListeners();
  }

  var _proto = EventHandler.prototype;

  _proto.destroy = function destroy() {
    this.onHandlerDestroying();
    this.unregisterListeners();
    this.onHandlerDestroyed();
  };

  _proto.onHandlerDestroying = function onHandlerDestroying() {};

  _proto.onHandlerDestroyed = function onHandlerDestroyed() {};

  _proto.isEventHandler = function isEventHandler() {
    return typeof this.handledEvents === 'object' && this.handledEvents.length && typeof this.onEvent === 'function';
  };

  _proto.registerListeners = function registerListeners() {
    if (this.isEventHandler()) {
      this.handledEvents.forEach(function (event) {
        if (FORBIDDEN_EVENT_NAMES[event]) {
          throw new Error('Forbidden event-name: ' + event);
        }

        this.hls.on(event, this.onEvent);
      }, this);
    }
  };

  _proto.unregisterListeners = function unregisterListeners() {
    if (this.isEventHandler()) {
      this.handledEvents.forEach(function (event) {
        this.hls.off(event, this.onEvent);
      }, this);
    }
  }
  /**
   * arguments: event (string), data (any)
   */
  ;

  _proto.onEvent = function onEvent(event, data) {
    this.onEventGeneric(event, data);
  };

  _proto.onEventGeneric = function onEventGeneric(event, data) {
    var eventToFunction = function eventToFunction(event, data) {
      var funcName = 'on' + event.replace('hls', '');

      if (typeof this[funcName] !== 'function') {
        throw new Error("Event " + event + " has no generic handler in this " + this.constructor.name + " class (tried " + funcName + ")");
      }

      return this[funcName].bind(this, data);
    };

    try {
      eventToFunction.call(this, event, data).call();
    } catch (err) {
      logger.error("An internal error happened while handling event " + event + ". Error message: \"" + err.message + "\". Here is a stacktrace:", err);
      this.hls.trigger(events.ERROR, {
        type: ErrorTypes.OTHER_ERROR,
        details: ErrorDetails.INTERNAL_EXCEPTION,
        fatal: false,
        event: event,
        err: err
      });
    }
  };

  return EventHandler;
}();

/* harmony default export */ var event_handler = (event_handler_EventHandler);
// CONCATENATED MODULE: ./src/types/loader.ts
/**
 * `type` property values for this loaders' context object
 * @enum
 *
 */
var PlaylistContextType;
/**
 * @enum {string}
 */

(function (PlaylistContextType) {
  PlaylistContextType["MANIFEST"] = "manifest";
  PlaylistContextType["LEVEL"] = "level";
  PlaylistContextType["AUDIO_TRACK"] = "audioTrack";
  PlaylistContextType["SUBTITLE_TRACK"] = "subtitleTrack";
})(PlaylistContextType || (PlaylistContextType = {}));

var PlaylistLevelType;

(function (PlaylistLevelType) {
  PlaylistLevelType["MAIN"] = "main";
  PlaylistLevelType["AUDIO"] = "audio";
  PlaylistLevelType["SUBTITLE"] = "subtitle";
})(PlaylistLevelType || (PlaylistLevelType = {}));
// CONCATENATED MODULE: ./src/demux/mp4demuxer.js
/**
 * MP4 demuxer
 */


var UINT32_MAX = Math.pow(2, 32) - 1;

var mp4demuxer_MP4Demuxer =
/*#__PURE__*/
function () {
  function MP4Demuxer(observer, remuxer) {
    this.observer = observer;
    this.remuxer = remuxer;
  }

  var _proto = MP4Demuxer.prototype;

  _proto.resetTimeStamp = function resetTimeStamp(initPTS) {
    this.initPTS = initPTS;
  };

  _proto.resetInitSegment = function resetInitSegment(initSegment, audioCodec, videoCodec, duration) {
    // jshint unused:false
    if (initSegment && initSegment.byteLength) {
      var initData = this.initData = MP4Demuxer.parseInitSegment(initSegment); // default audio codec if nothing specified
      // TODO : extract that from initsegment

      if (audioCodec == null) {
        audioCodec = 'mp4a.40.5';
      }

      if (videoCodec == null) {
        videoCodec = 'avc1.42e01e';
      }

      var tracks = {};

      if (initData.audio && initData.video) {
        tracks.audiovideo = {
          container: 'video/mp4',
          codec: audioCodec + ',' + videoCodec,
          initSegment: duration ? initSegment : null
        };
      } else {
        if (initData.audio) {
          tracks.audio = {
            container: 'audio/mp4',
            codec: audioCodec,
            initSegment: duration ? initSegment : null
          };
        }

        if (initData.video) {
          tracks.video = {
            container: 'video/mp4',
            codec: videoCodec,
            initSegment: duration ? initSegment : null
          };
        }
      }

      this.observer.trigger(events.FRAG_PARSING_INIT_SEGMENT, {
        tracks: tracks
      });
    } else {
      if (audioCodec) {
        this.audioCodec = audioCodec;
      }

      if (videoCodec) {
        this.videoCodec = videoCodec;
      }
    }
  };

  MP4Demuxer.probe = function probe(data) {
    // ensure we find a moof box in the first 16 kB
    return MP4Demuxer.findBox({
      data: data,
      start: 0,
      end: Math.min(data.length, 16384)
    }, ['moof']).length > 0;
  };

  MP4Demuxer.bin2str = function bin2str(buffer) {
    return String.fromCharCode.apply(null, buffer);
  };

  MP4Demuxer.readUint16 = function readUint16(buffer, offset) {
    if (buffer.data) {
      offset += buffer.start;
      buffer = buffer.data;
    }

    var val = buffer[offset] << 8 | buffer[offset + 1];
    return val < 0 ? 65536 + val : val;
  };

  MP4Demuxer.readUint32 = function readUint32(buffer, offset) {
    if (buffer.data) {
      offset += buffer.start;
      buffer = buffer.data;
    }

    var val = buffer[offset] << 24 | buffer[offset + 1] << 16 | buffer[offset + 2] << 8 | buffer[offset + 3];
    return val < 0 ? 4294967296 + val : val;
  };

  MP4Demuxer.writeUint32 = function writeUint32(buffer, offset, value) {
    if (buffer.data) {
      offset += buffer.start;
      buffer = buffer.data;
    }

    buffer[offset] = value >> 24;
    buffer[offset + 1] = value >> 16 & 0xff;
    buffer[offset + 2] = value >> 8 & 0xff;
    buffer[offset + 3] = value & 0xff;
  } // Find the data for a box specified by its path
  ;

  MP4Demuxer.findBox = function findBox(data, path) {
    var results = [],
        i,
        size,
        type,
        end,
        subresults,
        start,
        endbox;

    if (data.data) {
      start = data.start;
      end = data.end;
      data = data.data;
    } else {
      start = 0;
      end = data.byteLength;
    }

    if (!path.length) {
      // short-circuit the search for empty paths
      return null;
    }

    for (i = start; i < end;) {
      size = MP4Demuxer.readUint32(data, i);
      type = MP4Demuxer.bin2str(data.subarray(i + 4, i + 8));
      endbox = size > 1 ? i + size : end;

      if (type === path[0]) {
        if (path.length === 1) {
          // this is the end of the path and we've found the box we were
          // looking for
          results.push({
            data: data,
            start: i + 8,
            end: endbox
          });
        } else {
          // recursively search for the next box along the path
          subresults = MP4Demuxer.findBox({
            data: data,
            start: i + 8,
            end: endbox
          }, path.slice(1));

          if (subresults.length) {
            results = results.concat(subresults);
          }
        }
      }

      i = endbox;
    } // we've finished searching all of data


    return results;
  };

  MP4Demuxer.parseSegmentIndex = function parseSegmentIndex(initSegment) {
    var moov = MP4Demuxer.findBox(initSegment, ['moov'])[0];
    var moovEndOffset = moov ? moov.end : null; // we need this in case we need to chop of garbage of the end of current data

    var index = 0;
    var sidx = MP4Demuxer.findBox(initSegment, ['sidx']);
    var references;

    if (!sidx || !sidx[0]) {
      return null;
    }

    references = [];
    sidx = sidx[0];
    var version = sidx.data[0]; // set initial offset, we skip the reference ID (not needed)

    index = version === 0 ? 8 : 16;
    var timescale = MP4Demuxer.readUint32(sidx, index);
    index += 4; // TODO: parse earliestPresentationTime and firstOffset
    // usually zero in our case

    var earliestPresentationTime = 0;
    var firstOffset = 0;

    if (version === 0) {
      index += 8;
    } else {
      index += 16;
    } // skip reserved


    index += 2;
    var startByte = sidx.end + firstOffset;
    var referencesCount = MP4Demuxer.readUint16(sidx, index);
    index += 2;

    for (var i = 0; i < referencesCount; i++) {
      var referenceIndex = index;
      var referenceInfo = MP4Demuxer.readUint32(sidx, referenceIndex);
      referenceIndex += 4;
      var referenceSize = referenceInfo & 0x7FFFFFFF;
      var referenceType = (referenceInfo & 0x80000000) >>> 31;

      if (referenceType === 1) {
        console.warn('SIDX has hierarchical references (not supported)');
        return;
      }

      var subsegmentDuration = MP4Demuxer.readUint32(sidx, referenceIndex);
      referenceIndex += 4;
      references.push({
        referenceSize: referenceSize,
        subsegmentDuration: subsegmentDuration,
        // unscaled
        info: {
          duration: subsegmentDuration / timescale,
          start: startByte,
          end: startByte + referenceSize - 1
        }
      });
      startByte += referenceSize; // Skipping 1 bit for |startsWithSap|, 3 bits for |sapType|, and 28 bits
      // for |sapDelta|.

      referenceIndex += 4; // skip to next ref

      index = referenceIndex;
    }

    return {
      earliestPresentationTime: earliestPresentationTime,
      timescale: timescale,
      version: version,
      referencesCount: referencesCount,
      references: references,
      moovEndOffset: moovEndOffset
    };
  }
  /**
   * Parses an MP4 initialization segment and extracts stream type and
   * timescale values for any declared tracks. Timescale values indicate the
   * number of clock ticks per second to assume for time-based values
   * elsewhere in the MP4.
   *
   * To determine the start time of an MP4, you need two pieces of
   * information: the timescale unit and the earliest base media decode
   * time. Multiple timescales can be specified within an MP4 but the
   * base media decode time is always expressed in the timescale from
   * the media header box for the track:
   * ```
   * moov > trak > mdia > mdhd.timescale
   * moov > trak > mdia > hdlr
   * ```
   * @param init {Uint8Array} the bytes of the init segment
   * @return {object} a hash of track type to timescale values or null if
   * the init segment is malformed.
   */
  ;

  MP4Demuxer.parseInitSegment = function parseInitSegment(initSegment) {
    var result = [];
    var traks = MP4Demuxer.findBox(initSegment, ['moov', 'trak']);
    traks.forEach(function (trak) {
      var tkhd = MP4Demuxer.findBox(trak, ['tkhd'])[0];

      if (tkhd) {
        var version = tkhd.data[tkhd.start];
        var index = version === 0 ? 12 : 20;
        var trackId = MP4Demuxer.readUint32(tkhd, index);
        var mdhd = MP4Demuxer.findBox(trak, ['mdia', 'mdhd'])[0];

        if (mdhd) {
          version = mdhd.data[mdhd.start];
          index = version === 0 ? 12 : 20;
          var timescale = MP4Demuxer.readUint32(mdhd, index);
          var hdlr = MP4Demuxer.findBox(trak, ['mdia', 'hdlr'])[0];

          if (hdlr) {
            var hdlrType = MP4Demuxer.bin2str(hdlr.data.subarray(hdlr.start + 8, hdlr.start + 12));
            var type = {
              'soun': 'audio',
              'vide': 'video'
            }[hdlrType];

            if (type) {
              // extract codec info. TODO : parse codec details to be able to build MIME type
              var codecBox = MP4Demuxer.findBox(trak, ['mdia', 'minf', 'stbl', 'stsd']);

              if (codecBox.length) {
                codecBox = codecBox[0];
                var codecType = MP4Demuxer.bin2str(codecBox.data.subarray(codecBox.start + 12, codecBox.start + 16));
                logger.log("MP4Demuxer:" + type + ":" + codecType + " found");
              }

              result[trackId] = {
                timescale: timescale,
                type: type
              };
              result[type] = {
                timescale: timescale,
                id: trackId
              };
            }
          }
        }
      }
    });
    return result;
  }
  /**
  * Determine the base media decode start time, in seconds, for an MP4
  * fragment. If multiple fragments are specified, the earliest time is
  * returned.
  *
  * The base media decode time can be parsed from track fragment
  * metadata:
  * ```
  * moof > traf > tfdt.baseMediaDecodeTime
  * ```
  * It requires the timescale value from the mdhd to interpret.
  *
  * @param timescale {object} a hash of track ids to timescale values.
  * @return {number} the earliest base media decode start time for the
  * fragment, in seconds
  */
  ;

  MP4Demuxer.getStartDTS = function getStartDTS(initData, fragment) {
    var trafs, baseTimes, result; // we need info from two childrend of each track fragment box

    trafs = MP4Demuxer.findBox(fragment, ['moof', 'traf']); // determine the start times for each track

    baseTimes = [].concat.apply([], trafs.map(function (traf) {
      return MP4Demuxer.findBox(traf, ['tfhd']).map(function (tfhd) {
        var id, scale, baseTime; // get the track id from the tfhd

        id = MP4Demuxer.readUint32(tfhd, 4); // assume a 90kHz clock if no timescale was specified

        scale = initData[id].timescale || 90e3; // get the base media decode time from the tfdt

        baseTime = MP4Demuxer.findBox(traf, ['tfdt']).map(function (tfdt) {
          var version, result;
          version = tfdt.data[tfdt.start];
          result = MP4Demuxer.readUint32(tfdt, 4);

          if (version === 1) {
            result *= Math.pow(2, 32);
            result += MP4Demuxer.readUint32(tfdt, 8);
          }

          return result;
        })[0]; // convert base time to seconds

        return baseTime / scale;
      });
    })); // return the minimum

    result = Math.min.apply(null, baseTimes);
    return isFinite(result) ? result : 0;
  };

  MP4Demuxer.offsetStartDTS = function offsetStartDTS(initData, fragment, timeOffset) {
    MP4Demuxer.findBox(fragment, ['moof', 'traf']).map(function (traf) {
      return MP4Demuxer.findBox(traf, ['tfhd']).map(function (tfhd) {
        // get the track id from the tfhd
        var id = MP4Demuxer.readUint32(tfhd, 4); // assume a 90kHz clock if no timescale was specified

        var timescale = initData[id].timescale || 90e3; // get the base media decode time from the tfdt

        MP4Demuxer.findBox(traf, ['tfdt']).map(function (tfdt) {
          var version = tfdt.data[tfdt.start];
          var baseMediaDecodeTime = MP4Demuxer.readUint32(tfdt, 4);

          if (version === 0) {
            MP4Demuxer.writeUint32(tfdt, 4, baseMediaDecodeTime - timeOffset * timescale);
          } else {
            baseMediaDecodeTime *= Math.pow(2, 32);
            baseMediaDecodeTime += MP4Demuxer.readUint32(tfdt, 8);
            baseMediaDecodeTime -= timeOffset * timescale;
            baseMediaDecodeTime = Math.max(baseMediaDecodeTime, 0);
            var upper = Math.floor(baseMediaDecodeTime / (UINT32_MAX + 1));
            var lower = Math.floor(baseMediaDecodeTime % (UINT32_MAX + 1));
            MP4Demuxer.writeUint32(tfdt, 4, upper);
            MP4Demuxer.writeUint32(tfdt, 8, lower);
          }
        });
      });
    });
  } // feed incoming data to the front of the parsing pipeline
  ;

  _proto.append = function append(data, timeOffset, contiguous, accurateTimeOffset) {
    var initData = this.initData;

    if (!initData) {
      this.resetInitSegment(data, this.audioCodec, this.videoCodec, false);
      initData = this.initData;
    }

    var startDTS,
        initPTS = this.initPTS;

    if (initPTS === undefined) {
      var _startDTS = MP4Demuxer.getStartDTS(initData, data);

      this.initPTS = initPTS = _startDTS - timeOffset;
      this.observer.trigger(events.INIT_PTS_FOUND, {
        initPTS: initPTS
      });
    }

    MP4Demuxer.offsetStartDTS(initData, data, initPTS);
    startDTS = MP4Demuxer.getStartDTS(initData, data);
    this.remuxer.remux(initData.audio, initData.video, null, null, startDTS, contiguous, accurateTimeOffset, data);
  };

  _proto.destroy = function destroy() {};

  return MP4Demuxer;
}();

/* harmony default export */ var mp4demuxer = (mp4demuxer_MP4Demuxer);
// CONCATENATED MODULE: ./src/loader/level-key.ts
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var level_key_LevelKey =
/*#__PURE__*/
function () {
  function LevelKey(baseURI, relativeURI) {
    this._uri = null;
    this.baseuri = void 0;
    this.reluri = void 0;
    this.method = null;
    this.key = null;
    this.iv = null;
    this.baseuri = baseURI;
    this.reluri = relativeURI;
  }

  _createClass(LevelKey, [{
    key: "uri",
    get: function get() {
      if (!this._uri && this.reluri) {
        this._uri = Object(url_toolkit["buildAbsoluteURL"])(this.baseuri, this.reluri, {
          alwaysNormalize: true
        });
      }

      return this._uri;
    }
  }]);

  return LevelKey;
}();


// CONCATENATED MODULE: ./src/loader/fragment.ts



function fragment_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function fragment_createClass(Constructor, protoProps, staticProps) { if (protoProps) fragment_defineProperties(Constructor.prototype, protoProps); if (staticProps) fragment_defineProperties(Constructor, staticProps); return Constructor; }




var ElementaryStreamTypes;

(function (ElementaryStreamTypes) {
  ElementaryStreamTypes["AUDIO"] = "audio";
  ElementaryStreamTypes["VIDEO"] = "video";
})(ElementaryStreamTypes || (ElementaryStreamTypes = {}));

var fragment_Fragment =
/*#__PURE__*/
function () {
  function Fragment() {
    var _this$_elementaryStre;

    this._url = null;
    this._byteRange = null;
    this._decryptdata = null;
    this._elementaryStreams = (_this$_elementaryStre = {}, _this$_elementaryStre[ElementaryStreamTypes.AUDIO] = false, _this$_elementaryStre[ElementaryStreamTypes.VIDEO] = false, _this$_elementaryStre);
    this.deltaPTS = 0;
    this.rawProgramDateTime = null;
    this.programDateTime = null;
    this.title = null;
    this.tagList = [];
    this.cc = void 0;
    this.type = void 0;
    this.relurl = void 0;
    this.baseurl = void 0;
    this.duration = void 0;
    this.start = void 0;
    this.sn = 0;
    this.urlId = 0;
    this.level = 0;
    this.levelkey = void 0;
    this.loader = void 0;
  }

  var _proto = Fragment.prototype;

  // setByteRange converts a EXT-X-BYTERANGE attribute into a two element array
  _proto.setByteRange = function setByteRange(value, previousFrag) {
    var params = value.split('@', 2);
    var byteRange = [];

    if (params.length === 1) {
      byteRange[0] = previousFrag ? previousFrag.byteRangeEndOffset : 0;
    } else {
      byteRange[0] = parseInt(params[1]);
    }

    byteRange[1] = parseInt(params[0]) + byteRange[0];
    this._byteRange = byteRange;
  };

  /**
   * @param {ElementaryStreamTypes} type
   */
  _proto.addElementaryStream = function addElementaryStream(type) {
    this._elementaryStreams[type] = true;
  }
  /**
   * @param {ElementaryStreamTypes} type
   */
  ;

  _proto.hasElementaryStream = function hasElementaryStream(type) {
    return this._elementaryStreams[type] === true;
  }
  /**
   * Utility method for parseLevelPlaylist to create an initialization vector for a given segment
   * @param {number} segmentNumber - segment number to generate IV with
   * @returns {Uint8Array}
   */
  ;

  _proto.createInitializationVector = function createInitializationVector(segmentNumber) {
    var uint8View = new Uint8Array(16);

    for (var i = 12; i < 16; i++) {
      uint8View[i] = segmentNumber >> 8 * (15 - i) & 0xff;
    }

    return uint8View;
  }
  /**
   * Utility method for parseLevelPlaylist to get a fragment's decryption data from the currently parsed encryption key data
   * @param levelkey - a playlist's encryption info
   * @param segmentNumber - the fragment's segment number
   * @returns {LevelKey} - an object to be applied as a fragment's decryptdata
   */
  ;

  _proto.setDecryptDataFromLevelKey = function setDecryptDataFromLevelKey(levelkey, segmentNumber) {
    var decryptdata = levelkey;

    if (levelkey && levelkey.method && levelkey.uri && !levelkey.iv) {
      decryptdata = new level_key_LevelKey(levelkey.baseuri, levelkey.reluri);
      decryptdata.method = levelkey.method;
      decryptdata.iv = this.createInitializationVector(segmentNumber);
    }

    return decryptdata;
  };

  fragment_createClass(Fragment, [{
    key: "url",
    get: function get() {
      if (!this._url && this.relurl) {
        this._url = Object(url_toolkit["buildAbsoluteURL"])(this.baseurl, this.relurl, {
          alwaysNormalize: true
        });
      }

      return this._url;
    },
    set: function set(value) {
      this._url = value;
    }
  }, {
    key: "byteRange",
    get: function get() {
      if (!this._byteRange) {
        return [];
      }

      return this._byteRange;
    }
    /**
     * @type {number}
     */

  }, {
    key: "byteRangeStartOffset",
    get: function get() {
      return this.byteRange[0];
    }
  }, {
    key: "byteRangeEndOffset",
    get: function get() {
      return this.byteRange[1];
    }
  }, {
    key: "decryptdata",
    get: function get() {
      if (!this.levelkey && !this._decryptdata) {
        return null;
      }

      if (!this._decryptdata && this.levelkey) {
        var sn = this.sn;

        if (typeof sn !== 'number') {
          // We are fetching decryption data for a initialization segment
          // If the segment was encrypted with AES-128
          // It must have an IV defined. We cannot substitute the Segment Number in.
          if (this.levelkey && this.levelkey.method === 'AES-128' && !this.levelkey.iv) {
            logger.warn("missing IV for initialization segment with method=\"" + this.levelkey.method + "\" - compliance issue");
          }
          /*
          Be converted to a Number.
          'initSegment' will become NaN.
          NaN, which when converted through ToInt32() -> +0.
          ---
          Explicitly set sn to resulting value from implicit conversions 'initSegment' values for IV generation.
          */


          sn = 0;
        }

        this._decryptdata = this.setDecryptDataFromLevelKey(this.levelkey, sn);
      }

      return this._decryptdata;
    }
  }, {
    key: "endProgramDateTime",
    get: function get() {
      if (this.programDateTime === null) {
        return null;
      }

      if (!isFiniteNumber(this.programDateTime)) {
        return null;
      }

      var duration = !isFiniteNumber(this.duration) ? 0 : this.duration;
      return this.programDateTime + duration * 1000;
    }
  }, {
    key: "encrypted",
    get: function get() {
      return !!(this.decryptdata && this.decryptdata.uri !== null && this.decryptdata.key === null);
    }
  }]);

  return Fragment;
}();


// CONCATENATED MODULE: ./src/loader/level.js


function level_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function level_createClass(Constructor, protoProps, staticProps) { if (protoProps) level_defineProperties(Constructor.prototype, protoProps); if (staticProps) level_defineProperties(Constructor, staticProps); return Constructor; }

var level_Level =
/*#__PURE__*/
function () {
  function Level(baseUrl) {
    // Please keep properties in alphabetical order
    this.endCC = 0;
    this.endSN = 0;
    this.fragments = [];
    this.initSegment = null;
    this.live = true;
    this.needSidxRanges = false;
    this.startCC = 0;
    this.startSN = 0;
    this.startTimeOffset = null;
    this.targetduration = 0;
    this.totalduration = 0;
    this.type = null;
    this.url = baseUrl;
    this.version = null;
  }

  level_createClass(Level, [{
    key: "hasProgramDateTime",
    get: function get() {
      return !!(this.fragments[0] && isFiniteNumber(this.fragments[0].programDateTime));
    }
  }]);

  return Level;
}();


// CONCATENATED MODULE: ./src/utils/attr-list.js
var DECIMAL_RESOLUTION_REGEX = /^(\d+)x(\d+)$/; // eslint-disable-line no-useless-escape

var ATTR_LIST_REGEX = /\s*(.+?)\s*=((?:\".*?\")|.*?)(?:,|$)/g; // eslint-disable-line no-useless-escape
// adapted from https://github.com/kanongil/node-m3u8parse/blob/master/attrlist.js

var AttrList =
/*#__PURE__*/
function () {
  function AttrList(attrs) {
    if (typeof attrs === 'string') {
      attrs = AttrList.parseAttrList(attrs);
    }

    for (var attr in attrs) {
      if (attrs.hasOwnProperty(attr)) {
        this[attr] = attrs[attr];
      }
    }
  }

  var _proto = AttrList.prototype;

  _proto.decimalInteger = function decimalInteger(attrName) {
    var intValue = parseInt(this[attrName], 10);

    if (intValue > Number.MAX_SAFE_INTEGER) {
      return Infinity;
    }

    return intValue;
  };

  _proto.hexadecimalInteger = function hexadecimalInteger(attrName) {
    if (this[attrName]) {
      var stringValue = (this[attrName] || '0x').slice(2);
      stringValue = (stringValue.length & 1 ? '0' : '') + stringValue;
      var value = new Uint8Array(stringValue.length / 2);

      for (var i = 0; i < stringValue.length / 2; i++) {
        value[i] = parseInt(stringValue.slice(i * 2, i * 2 + 2), 16);
      }

      return value;
    } else {
      return null;
    }
  };

  _proto.hexadecimalIntegerAsNumber = function hexadecimalIntegerAsNumber(attrName) {
    var intValue = parseInt(this[attrName], 16);

    if (intValue > Number.MAX_SAFE_INTEGER) {
      return Infinity;
    }

    return intValue;
  };

  _proto.decimalFloatingPoint = function decimalFloatingPoint(attrName) {
    return parseFloat(this[attrName]);
  };

  _proto.enumeratedString = function enumeratedString(attrName) {
    return this[attrName];
  };

  _proto.decimalResolution = function decimalResolution(attrName) {
    var res = DECIMAL_RESOLUTION_REGEX.exec(this[attrName]);

    if (res === null) {
      return undefined;
    }

    return {
      width: parseInt(res[1], 10),
      height: parseInt(res[2], 10)
    };
  };

  AttrList.parseAttrList = function parseAttrList(input) {
    var match,
        attrs = {};
    ATTR_LIST_REGEX.lastIndex = 0;

    while ((match = ATTR_LIST_REGEX.exec(input)) !== null) {
      var value = match[2],
          quote = '"';

      if (value.indexOf(quote) === 0 && value.lastIndexOf(quote) === value.length - 1) {
        value = value.slice(1, -1);
      }

      attrs[match[1]] = value;
    }

    return attrs;
  };

  return AttrList;
}();

/* harmony default export */ var attr_list = (AttrList);
// CONCATENATED MODULE: ./src/utils/codecs.ts
// from http://mp4ra.org/codecs.html
var sampleEntryCodesISO = {
  audio: {
    'a3ds': true,
    'ac-3': true,
    'ac-4': true,
    'alac': true,
    'alaw': true,
    'dra1': true,
    'dts+': true,
    'dts-': true,
    'dtsc': true,
    'dtse': true,
    'dtsh': true,
    'ec-3': true,
    'enca': true,
    'g719': true,
    'g726': true,
    'm4ae': true,
    'mha1': true,
    'mha2': true,
    'mhm1': true,
    'mhm2': true,
    'mlpa': true,
    'mp4a': true,
    'raw ': true,
    'Opus': true,
    'samr': true,
    'sawb': true,
    'sawp': true,
    'sevc': true,
    'sqcp': true,
    'ssmv': true,
    'twos': true,
    'ulaw': true
  },
  video: {
    'avc1': true,
    'avc2': true,
    'avc3': true,
    'avc4': true,
    'avcp': true,
    'drac': true,
    'dvav': true,
    'dvhe': true,
    'encv': true,
    'hev1': true,
    'hvc1': true,
    'mjp2': true,
    'mp4v': true,
    'mvc1': true,
    'mvc2': true,
    'mvc3': true,
    'mvc4': true,
    'resv': true,
    'rv60': true,
    's263': true,
    'svc1': true,
    'svc2': true,
    'vc-1': true,
    'vp08': true,
    'vp09': true
  }
};

function isCodecType(codec, type) {
  var typeCodes = sampleEntryCodesISO[type];
  return !!typeCodes && typeCodes[codec.slice(0, 4)] === true;
}

function isCodecSupportedInMp4(codec, type) {
  return MediaSource.isTypeSupported((type || 'video') + "/mp4;codecs=\"" + codec + "\"");
}


// CONCATENATED MODULE: ./src/loader/m3u8-parser.ts











/**
 * M3U8 parser
 * @module
 */
// https://regex101.com is your friend
var MASTER_PLAYLIST_REGEX = /#EXT-X-STREAM-INF:([^\n\r]*)[\r\n]+([^\r\n]+)/g;
var MASTER_PLAYLIST_MEDIA_REGEX = /#EXT-X-MEDIA:(.*)/g;
var LEVEL_PLAYLIST_REGEX_FAST = new RegExp([/#EXTINF:\s*(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source, // duration (#EXTINF:<duration>,<title>), group 1 => duration, group 2 => title
/|(?!#)([\S+ ?]+)/.source, // segment URI, group 3 => the URI (note newline is not eaten)
/|#EXT-X-BYTERANGE:*(.+)/.source, // next segment's byterange, group 4 => range spec (x@y)
/|#EXT-X-PROGRAM-DATE-TIME:(.+)/.source, // next segment's program date/time group 5 => the datetime spec
/|#.*/.source // All other non-segment oriented tags will match with all groups empty
].join(''), 'g');
var LEVEL_PLAYLIST_REGEX_SLOW = /(?:(?:#(EXTM3U))|(?:#EXT-X-(PLAYLIST-TYPE):(.+))|(?:#EXT-X-(MEDIA-SEQUENCE): *(\d+))|(?:#EXT-X-(TARGETDURATION): *(\d+))|(?:#EXT-X-(KEY):(.+))|(?:#EXT-X-(START):(.+))|(?:#EXT-X-(ENDLIST))|(?:#EXT-X-(DISCONTINUITY-SEQ)UENCE:(\d+))|(?:#EXT-X-(DIS)CONTINUITY))|(?:#EXT-X-(VERSION):(\d+))|(?:#EXT-X-(MAP):(.+))|(?:(#)([^:]*):(.*))|(?:(#)(.*))(?:.*)\r?\n?/;
var MP4_REGEX_SUFFIX = /\.(mp4|m4s|m4v|m4a)$/i;

var m3u8_parser_M3U8Parser =
/*#__PURE__*/
function () {
  function M3U8Parser() {}

  M3U8Parser.findGroup = function findGroup(groups, mediaGroupId) {
    for (var i = 0; i < groups.length; i++) {
      var group = groups[i];

      if (group.id === mediaGroupId) {
        return group;
      }
    }
  };

  M3U8Parser.convertAVC1ToAVCOTI = function convertAVC1ToAVCOTI(codec) {
    var avcdata = codec.split('.');
    var result;

    if (avcdata.length > 2) {
      result = avcdata.shift() + '.';
      result += parseInt(avcdata.shift()).toString(16);
      result += ('000' + parseInt(avcdata.shift()).toString(16)).substr(-4);
    } else {
      result = codec;
    }

    return result;
  };

  M3U8Parser.resolve = function resolve(url, baseUrl) {
    return url_toolkit["buildAbsoluteURL"](baseUrl, url, {
      alwaysNormalize: true
    });
  };

  M3U8Parser.parseMasterPlaylist = function parseMasterPlaylist(string, baseurl) {
    // TODO(typescript-level)
    var levels = [];
    MASTER_PLAYLIST_REGEX.lastIndex = 0; // TODO(typescript-level)

    function setCodecs(codecs, level) {
      ['video', 'audio'].forEach(function (type) {
        var filtered = codecs.filter(function (codec) {
          return isCodecType(codec, type);
        });

        if (filtered.length) {
          var preferred = filtered.filter(function (codec) {
            return codec.lastIndexOf('avc1', 0) === 0 || codec.lastIndexOf('mp4a', 0) === 0;
          });
          level[type + "Codec"] = preferred.length > 0 ? preferred[0] : filtered[0]; // remove from list

          codecs = codecs.filter(function (codec) {
            return filtered.indexOf(codec) === -1;
          });
        }
      });
      level.unknownCodecs = codecs;
    }

    var result;

    while ((result = MASTER_PLAYLIST_REGEX.exec(string)) != null) {
      // TODO(typescript-level)
      var level = {};
      var attrs = level.attrs = new attr_list(result[1]);
      level.url = M3U8Parser.resolve(result[2], baseurl);
      var resolution = attrs.decimalResolution('RESOLUTION');

      if (resolution) {
        level.width = resolution.width;
        level.height = resolution.height;
      }

      level.bitrate = attrs.decimalInteger('AVERAGE-BANDWIDTH') || attrs.decimalInteger('BANDWIDTH');
      level.name = attrs.NAME;
      setCodecs([].concat((attrs.CODECS || '').split(/[ ,]+/)), level);

      if (level.videoCodec && level.videoCodec.indexOf('avc1') !== -1) {
        level.videoCodec = M3U8Parser.convertAVC1ToAVCOTI(level.videoCodec);
      }

      levels.push(level);
    }

    return levels;
  };

  M3U8Parser.parseMasterPlaylistMedia = function parseMasterPlaylistMedia(string, baseurl, type, audioGroups) {
    if (audioGroups === void 0) {
      audioGroups = [];
    }

    var result;
    var medias = [];
    var id = 0;
    MASTER_PLAYLIST_MEDIA_REGEX.lastIndex = 0;

    while ((result = MASTER_PLAYLIST_MEDIA_REGEX.exec(string)) !== null) {
      var attrs = new attr_list(result[1]);

      if (attrs.TYPE === type) {
        var media = {
          id: id++,
          groupId: attrs['GROUP-ID'],
          name: attrs.NAME || attrs.LANGUAGE,
          type: type,
          default: attrs.DEFAULT === 'YES',
          autoselect: attrs.AUTOSELECT === 'YES',
          forced: attrs.FORCED === 'YES',
          lang: attrs.LANGUAGE
        };

        if (attrs.URI) {
          media.url = M3U8Parser.resolve(attrs.URI, baseurl);
        }

        if (audioGroups.length) {
          // If there are audio groups signalled in the manifest, let's look for a matching codec string for this track
          var groupCodec = M3U8Parser.findGroup(audioGroups, media.groupId); // If we don't find the track signalled, lets use the first audio groups codec we have
          // Acting as a best guess

          media.audioCodec = groupCodec ? groupCodec.codec : audioGroups[0].codec;
        }

        medias.push(media);
      }
    }

    return medias;
  };

  M3U8Parser.parseLevelPlaylist = function parseLevelPlaylist(string, baseurl, id, type, levelUrlId) {
    var currentSN = 0;
    var totalduration = 0;
    var level = new level_Level(baseurl);
    var discontinuityCounter = 0;
    var prevFrag = null;
    var frag = new fragment_Fragment();
    var result;
    var i;
    var levelkey;
    var firstPdtIndex = null;
    LEVEL_PLAYLIST_REGEX_FAST.lastIndex = 0;

    while ((result = LEVEL_PLAYLIST_REGEX_FAST.exec(string)) !== null) {
      var duration = result[1];

      if (duration) {
        // INF
        frag.duration = parseFloat(duration); // avoid sliced strings    https://github.com/video-dev/hls.js/issues/939

        var title = (' ' + result[2]).slice(1);
        frag.title = title || null;
        frag.tagList.push(title ? ['INF', duration, title] : ['INF', duration]);
      } else if (result[3]) {
        // url
        if (isFiniteNumber(frag.duration)) {
          var sn = currentSN++;
          frag.type = type;
          frag.start = totalduration;

          if (levelkey) {
            frag.levelkey = levelkey;
          }

          frag.sn = sn;
          frag.level = id;
          frag.cc = discontinuityCounter;
          frag.urlId = levelUrlId;
          frag.baseurl = baseurl; // avoid sliced strings    https://github.com/video-dev/hls.js/issues/939

          frag.relurl = (' ' + result[3]).slice(1);
          assignProgramDateTime(frag, prevFrag);
          level.fragments.push(frag);
          prevFrag = frag;
          totalduration += frag.duration;
          frag = new fragment_Fragment();
        }
      } else if (result[4]) {
        // X-BYTERANGE
        var data = (' ' + result[4]).slice(1);

        if (prevFrag) {
          frag.setByteRange(data, prevFrag);
        } else {
          frag.setByteRange(data);
        }
      } else if (result[5]) {
        // PROGRAM-DATE-TIME
        // avoid sliced strings    https://github.com/video-dev/hls.js/issues/939
        frag.rawProgramDateTime = (' ' + result[5]).slice(1);
        frag.tagList.push(['PROGRAM-DATE-TIME', frag.rawProgramDateTime]);

        if (firstPdtIndex === null) {
          firstPdtIndex = level.fragments.length;
        }
      } else {
        result = result[0].match(LEVEL_PLAYLIST_REGEX_SLOW);

        if (!result) {
          logger.warn('No matches on slow regex match for level playlist!');
          continue;
        }

        for (i = 1; i < result.length; i++) {
          if (typeof result[i] !== 'undefined') {
            break;
          }
        } // avoid sliced strings    https://github.com/video-dev/hls.js/issues/939


        var value1 = (' ' + result[i + 1]).slice(1);
        var value2 = (' ' + result[i + 2]).slice(1);

        switch (result[i]) {
          case '#':
            frag.tagList.push(value2 ? [value1, value2] : [value1]);
            break;

          case 'PLAYLIST-TYPE':
            level.type = value1.toUpperCase();
            break;

          case 'MEDIA-SEQUENCE':
            currentSN = level.startSN = parseInt(value1);
            break;

          case 'TARGETDURATION':
            level.targetduration = parseFloat(value1);
            break;

          case 'VERSION':
            level.version = parseInt(value1);
            break;

          case 'EXTM3U':
            break;

          case 'ENDLIST':
            level.live = false;
            break;

          case 'DIS':
            discontinuityCounter++;
            frag.tagList.push(['DIS']);
            break;

          case 'DISCONTINUITY-SEQ':
            discontinuityCounter = parseInt(value1);
            break;

          case 'KEY':
            {
              // https://tools.ietf.org/html/draft-pantos-http-live-streaming-08#section-3.4.4
              var decryptparams = value1;
              var keyAttrs = new attr_list(decryptparams);
              var decryptmethod = keyAttrs.enumeratedString('METHOD');
              var decrypturi = keyAttrs.URI;
              var decryptiv = keyAttrs.hexadecimalInteger('IV');

              if (decryptmethod) {
                levelkey = new level_key_LevelKey(baseurl, decrypturi);

                if (decrypturi && ['AES-128', 'SAMPLE-AES', 'SAMPLE-AES-CENC'].indexOf(decryptmethod) >= 0) {
                  levelkey.method = decryptmethod;
                  levelkey.key = null; // Initialization Vector (IV)

                  levelkey.iv = decryptiv;
                }
              }

              break;
            }

          case 'START':
            {
              var startAttrs = new attr_list(value1);
              var startTimeOffset = startAttrs.decimalFloatingPoint('TIME-OFFSET'); // TIME-OFFSET can be 0

              if (isFiniteNumber(startTimeOffset)) {
                level.startTimeOffset = startTimeOffset;
              }

              break;
            }

          case 'MAP':
            {
              var mapAttrs = new attr_list(value1);
              frag.relurl = mapAttrs.URI;

              if (mapAttrs.BYTERANGE) {
                frag.setByteRange(mapAttrs.BYTERANGE);
              }

              frag.baseurl = baseurl;
              frag.level = id;
              frag.type = type;
              frag.sn = 'initSegment';
              level.initSegment = frag;
              frag = new fragment_Fragment();
              frag.rawProgramDateTime = level.initSegment.rawProgramDateTime;
              break;
            }

          default:
            logger.warn("line parsed but not handled: " + result);
            break;
        }
      }
    }

    frag = prevFrag; // logger.log('found ' + level.fragments.length + ' fragments');

    if (frag && !frag.relurl) {
      level.fragments.pop();
      totalduration -= frag.duration;
    }

    level.totalduration = totalduration;
    level.averagetargetduration = totalduration / level.fragments.length;
    level.endSN = currentSN - 1;
    level.startCC = level.fragments[0] ? level.fragments[0].cc : 0;
    level.endCC = discontinuityCounter;

    if (!level.initSegment && level.fragments.length) {
      // this is a bit lurky but HLS really has no other way to tell us
      // if the fragments are TS or MP4, except if we download them :/
      // but this is to be able to handle SIDX.
      if (level.fragments.every(function (frag) {
        return MP4_REGEX_SUFFIX.test(frag.relurl);
      })) {
        logger.warn('MP4 fragments found but no init segment (probably no MAP, incomplete M3U8), trying to fetch SIDX');
        frag = new fragment_Fragment();
        frag.relurl = level.fragments[0].relurl;
        frag.baseurl = baseurl;
        frag.level = id;
        frag.type = type;
        frag.sn = 'initSegment';
        level.initSegment = frag;
        level.needSidxRanges = true;
      }
    }
    /**
     * Backfill any missing PDT values
       "If the first EXT-X-PROGRAM-DATE-TIME tag in a Playlist appears after
       one or more Media Segment URIs, the client SHOULD extrapolate
       backward from that tag (using EXTINF durations and/or media
       timestamps) to associate dates with those segments."
     * We have already extrapolated forward, but all fragments up to the first instance of PDT do not have their PDTs
     * computed.
     */


    if (firstPdtIndex) {
      backfillProgramDateTimes(level.fragments, firstPdtIndex);
    }

    return level;
  };

  return M3U8Parser;
}();



function backfillProgramDateTimes(fragments, startIndex) {
  var fragPrev = fragments[startIndex];

  for (var i = startIndex - 1; i >= 0; i--) {
    var frag = fragments[i];
    frag.programDateTime = fragPrev.programDateTime - frag.duration * 1000;
    fragPrev = frag;
  }
}

function assignProgramDateTime(frag, prevFrag) {
  if (frag.rawProgramDateTime) {
    frag.programDateTime = Date.parse(frag.rawProgramDateTime);
  } else if (prevFrag && prevFrag.programDateTime) {
    frag.programDateTime = prevFrag.endProgramDateTime;
  }

  if (!isFiniteNumber(frag.programDateTime)) {
    frag.programDateTime = null;
    frag.rawProgramDateTime = null;
  }
}
// CONCATENATED MODULE: ./src/loader/playlist-loader.ts



function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * PlaylistLoader - delegate for media manifest/playlist loading tasks. Takes care of parsing media to internal data-models.
 *
 * Once loaded, dispatches events with parsed data-models of manifest/levels/audio/subtitle tracks.
 *
 * Uses loader(s) set in config to do actual internal loading of resource tasks.
 *
 * @module
 *
 */







var _window = window,
    performance = _window.performance;
/**
 * @constructor
 */

var playlist_loader_PlaylistLoader =
/*#__PURE__*/
function (_EventHandler) {
  _inheritsLoose(PlaylistLoader, _EventHandler);

  /**
   * @constructs
   * @param {Hls} hls
   */
  function PlaylistLoader(hls) {
    var _this;

    _this = _EventHandler.call(this, hls, events.MANIFEST_LOADING, events.LEVEL_LOADING, events.AUDIO_TRACK_LOADING, events.SUBTITLE_TRACK_LOADING) || this;
    _this.loaders = {};
    return _this;
  }
  /**
   * @param {PlaylistContextType} type
   * @returns {boolean}
   */


  PlaylistLoader.canHaveQualityLevels = function canHaveQualityLevels(type) {
    return type !== PlaylistContextType.AUDIO_TRACK && type !== PlaylistContextType.SUBTITLE_TRACK;
  }
  /**
   * Map context.type to LevelType
   * @param {PlaylistLoaderContext} context
   * @returns {LevelType}
   */
  ;

  PlaylistLoader.mapContextToLevelType = function mapContextToLevelType(context) {
    var type = context.type;

    switch (type) {
      case PlaylistContextType.AUDIO_TRACK:
        return PlaylistLevelType.AUDIO;

      case PlaylistContextType.SUBTITLE_TRACK:
        return PlaylistLevelType.SUBTITLE;

      default:
        return PlaylistLevelType.MAIN;
    }
  };

  PlaylistLoader.getResponseUrl = function getResponseUrl(response, context) {
    var url = response.url; // responseURL not supported on some browsers (it is used to detect URL redirection)
    // data-uri mode also not supported (but no need to detect redirection)

    if (url === undefined || url.indexOf('data:') === 0) {
      // fallback to initial URL
      url = context.url;
    }

    return url;
  }
  /**
   * Returns defaults or configured loader-type overloads (pLoader and loader config params)
   * Default loader is XHRLoader (see utils)
   * @param {PlaylistLoaderContext} context
   * @returns {Loader} or other compatible configured overload
   */
  ;

  var _proto = PlaylistLoader.prototype;

  _proto.createInternalLoader = function createInternalLoader(context) {
    var config = this.hls.config;
    var PLoader = config.pLoader;
    var Loader = config.loader; // TODO(typescript-config): Verify once config is typed that InternalLoader always returns a Loader

    var InternalLoader = PLoader || Loader;
    var loader = new InternalLoader(config); // TODO - Do we really need to assign the instance or if the dep has been lost

    context.loader = loader;
    this.loaders[context.type] = loader;
    return loader;
  };

  _proto.getInternalLoader = function getInternalLoader(context) {
    return this.loaders[context.type];
  };

  _proto.resetInternalLoader = function resetInternalLoader(contextType) {
    if (this.loaders[contextType]) {
      delete this.loaders[contextType];
    }
  }
  /**
   * Call `destroy` on all internal loader instances mapped (one per context type)
   */
  ;

  _proto.destroyInternalLoaders = function destroyInternalLoaders() {
    for (var contextType in this.loaders) {
      var loader = this.loaders[contextType];

      if (loader) {
        loader.destroy();
      }

      this.resetInternalLoader(contextType);
    }
  };

  _proto.destroy = function destroy() {
    this.destroyInternalLoaders();

    _EventHandler.prototype.destroy.call(this);
  };

  _proto.onManifestLoading = function onManifestLoading(data) {
    this.load({
      url: data.url,
      type: PlaylistContextType.MANIFEST,
      level: 0,
      id: null,
      responseType: 'text'
    });
  };

  _proto.onLevelLoading = function onLevelLoading(data) {
    this.load({
      url: data.url,
      type: PlaylistContextType.LEVEL,
      level: data.level,
      id: data.id,
      responseType: 'text'
    });
  };

  _proto.onAudioTrackLoading = function onAudioTrackLoading(data) {
    this.load({
      url: data.url,
      type: PlaylistContextType.AUDIO_TRACK,
      level: null,
      id: data.id,
      responseType: 'text'
    });
  };

  _proto.onSubtitleTrackLoading = function onSubtitleTrackLoading(data) {
    this.load({
      url: data.url,
      type: PlaylistContextType.SUBTITLE_TRACK,
      level: null,
      id: data.id,
      responseType: 'text'
    });
  };

  _proto.load = function load(context) {
    var config = this.hls.config;
    logger.debug("Loading playlist of type " + context.type + ", level: " + context.level + ", id: " + context.id); // Check if a loader for this context already exists

    var loader = this.getInternalLoader(context);

    if (loader) {
      var loaderContext = loader.context;

      if (loaderContext && loaderContext.url === context.url) {
        // same URL can't overlap
        logger.trace('playlist request ongoing');
        return false;
      } else {
        logger.warn("aborting previous loader for type: " + context.type);
        loader.abort();
      }
    }

    var maxRetry;
    var timeout;
    var retryDelay;
    var maxRetryDelay; // apply different configs for retries depending on
    // context (manifest, level, audio/subs playlist)

    switch (context.type) {
      case PlaylistContextType.MANIFEST:
        maxRetry = config.manifestLoadingMaxRetry;
        timeout = config.manifestLoadingTimeOut;
        retryDelay = config.manifestLoadingRetryDelay;
        maxRetryDelay = config.manifestLoadingMaxRetryTimeout;
        break;

      case PlaylistContextType.LEVEL:
        // Disable internal loader retry logic, since we are managing retries in Level Controller
        maxRetry = 0;
        maxRetryDelay = 0;
        retryDelay = 0;
        timeout = config.levelLoadingTimeOut; // TODO Introduce retry settings for audio-track and subtitle-track, it should not use level retry config

        break;

      default:
        maxRetry = config.levelLoadingMaxRetry;
        timeout = config.levelLoadingTimeOut;
        retryDelay = config.levelLoadingRetryDelay;
        maxRetryDelay = config.levelLoadingMaxRetryTimeout;
        break;
    }

    loader = this.createInternalLoader(context);
    var loaderConfig = {
      timeout: timeout,
      maxRetry: maxRetry,
      retryDelay: retryDelay,
      maxRetryDelay: maxRetryDelay
    };
    var loaderCallbacks = {
      onSuccess: this.loadsuccess.bind(this),
      onError: this.loaderror.bind(this),
      onTimeout: this.loadtimeout.bind(this)
    };
    logger.debug("Calling internal loader delegate for URL: " + context.url);
    loader.load(context, loaderConfig, loaderCallbacks);
    return true;
  };

  _proto.loadsuccess = function loadsuccess(response, stats, context, networkDetails) {
    if (networkDetails === void 0) {
      networkDetails = null;
    }

    if (context.isSidxRequest) {
      this._handleSidxRequest(response, context);

      this._handlePlaylistLoaded(response, stats, context, networkDetails);

      return;
    }

    this.resetInternalLoader(context.type);

    if (typeof response.data !== 'string') {
      throw new Error('expected responseType of "text" for PlaylistLoader');
    }

    var string = response.data;
    stats.tload = performance.now(); // stats.mtime = new Date(target.getResponseHeader('Last-Modified'));
    // Validate if it is an M3U8 at all

    if (string.indexOf('#EXTM3U') !== 0) {
      this._handleManifestParsingError(response, context, 'no EXTM3U delimiter', networkDetails);

      return;
    } // Check if chunk-list or master. handle empty chunk list case (first EXTINF not signaled, but TARGETDURATION present)


    if (string.indexOf('#EXTINF:') > 0 || string.indexOf('#EXT-X-TARGETDURATION:') > 0) {
      this._handleTrackOrLevelPlaylist(response, stats, context, networkDetails);
    } else {
      this._handleMasterPlaylist(response, stats, context, networkDetails);
    }
  };

  _proto.loaderror = function loaderror(response, context, networkDetails) {
    if (networkDetails === void 0) {
      networkDetails = null;
    }

    this._handleNetworkError(context, networkDetails, false, response);
  };

  _proto.loadtimeout = function loadtimeout(stats, context, networkDetails) {
    if (networkDetails === void 0) {
      networkDetails = null;
    }

    this._handleNetworkError(context, networkDetails, true);
  } // TODO(typescript-config): networkDetails can currently be a XHR or Fetch impl,
  // but with custom loaders it could be generic investigate this further when config is typed
  ;

  _proto._handleMasterPlaylist = function _handleMasterPlaylist(response, stats, context, networkDetails) {
    var hls = this.hls;
    var string = response.data;
    var url = PlaylistLoader.getResponseUrl(response, context);
    var levels = m3u8_parser_M3U8Parser.parseMasterPlaylist(string, url);

    if (!levels.length) {
      this._handleManifestParsingError(response, context, 'no level found in manifest', networkDetails);

      return;
    } // multi level playlist, parse level info


    var audioGroups = levels.map(function (level) {
      return {
        id: level.attrs.AUDIO,
        codec: level.audioCodec
      };
    });
    var audioTracks = m3u8_parser_M3U8Parser.parseMasterPlaylistMedia(string, url, 'AUDIO', audioGroups);
    var subtitles = m3u8_parser_M3U8Parser.parseMasterPlaylistMedia(string, url, 'SUBTITLES');

    if (audioTracks.length) {
      // check if we have found an audio track embedded in main playlist (audio track without URI attribute)
      var embeddedAudioFound = false;
      audioTracks.forEach(function (audioTrack) {
        if (!audioTrack.url) {
          embeddedAudioFound = true;
        }
      }); // if no embedded audio track defined, but audio codec signaled in quality level,
      // we need to signal this main audio track this could happen with playlists with
      // alt audio rendition in which quality levels (main)
      // contains both audio+video. but with mixed audio track not signaled

      if (embeddedAudioFound === false && levels[0].audioCodec && !levels[0].attrs.AUDIO) {
        logger.log('audio codec signaled in quality level, but no embedded audio track signaled, create one');
        audioTracks.unshift({
          type: 'main',
          name: 'main',
          default: false,
          autoselect: false,
          forced: false,
          id: -1
        });
      }
    }

    hls.trigger(events.MANIFEST_LOADED, {
      levels: levels,
      audioTracks: audioTracks,
      subtitles: subtitles,
      url: url,
      stats: stats,
      networkDetails: networkDetails
    });
  };

  _proto._handleTrackOrLevelPlaylist = function _handleTrackOrLevelPlaylist(response, stats, context, networkDetails) {
    var hls = this.hls;
    var id = context.id,
        level = context.level,
        type = context.type;
    var url = PlaylistLoader.getResponseUrl(response, context); // if the values are null, they will result in the else conditional

    var levelUrlId = isFiniteNumber(id) ? id : 0;
    var levelId = isFiniteNumber(level) ? level : levelUrlId;
    var levelType = PlaylistLoader.mapContextToLevelType(context);
    var levelDetails = m3u8_parser_M3U8Parser.parseLevelPlaylist(response.data, url, levelId, levelType, levelUrlId); // set stats on level structure
    // TODO(jstackhouse): why? mixing concerns, is it just treated as value bag?

    levelDetails.tload = stats.tload; // We have done our first request (Manifest-type) and receive
    // not a master playlist but a chunk-list (track/level)
    // We fire the manifest-loaded event anyway with the parsed level-details
    // by creating a single-level structure for it.

    if (type === PlaylistContextType.MANIFEST) {
      var singleLevel = {
        url: url,
        details: levelDetails
      };
      hls.trigger(events.MANIFEST_LOADED, {
        levels: [singleLevel],
        audioTracks: [],
        url: url,
        stats: stats,
        networkDetails: networkDetails
      });
    } // save parsing time


    stats.tparsed = performance.now(); // in case we need SIDX ranges
    // return early after calling load for
    // the SIDX box.

    if (levelDetails.needSidxRanges) {
      var sidxUrl = levelDetails.initSegment.url;
      this.load({
        url: sidxUrl,
        isSidxRequest: true,
        type: type,
        level: level,
        levelDetails: levelDetails,
        id: id,
        rangeStart: 0,
        rangeEnd: 2048,
        responseType: 'arraybuffer'
      });
      return;
    } // extend the context with the new levelDetails property


    context.levelDetails = levelDetails;

    this._handlePlaylistLoaded(response, stats, context, networkDetails);
  };

  _proto._handleSidxRequest = function _handleSidxRequest(response, context) {
    if (typeof response.data === 'string') {
      throw new Error('sidx request must be made with responseType of array buffer');
    }

    var sidxInfo = mp4demuxer.parseSegmentIndex(new Uint8Array(response.data)); // if provided fragment does not contain sidx, early return

    if (!sidxInfo) {
      return;
    }

    var sidxReferences = sidxInfo.references;
    var levelDetails = context.levelDetails;
    sidxReferences.forEach(function (segmentRef, index) {
      var segRefInfo = segmentRef.info;

      if (!levelDetails) {
        return;
      }

      var frag = levelDetails.fragments[index];

      if (frag.byteRange.length === 0) {
        frag.setByteRange(String(1 + segRefInfo.end - segRefInfo.start) + '@' + String(segRefInfo.start));
      }
    });

    if (levelDetails) {
      levelDetails.initSegment.setByteRange(String(sidxInfo.moovEndOffset) + '@0');
    }
  };

  _proto._handleManifestParsingError = function _handleManifestParsingError(response, context, reason, networkDetails) {
    this.hls.trigger(events.ERROR, {
      type: ErrorTypes.NETWORK_ERROR,
      details: ErrorDetails.MANIFEST_PARSING_ERROR,
      fatal: true,
      url: response.url,
      reason: reason,
      networkDetails: networkDetails
    });
  };

  _proto._handleNetworkError = function _handleNetworkError(context, networkDetails, timeout, response) {
    if (timeout === void 0) {
      timeout = false;
    }

    if (response === void 0) {
      response = null;
    }

    logger.info("A network error occured while loading a " + context.type + "-type playlist");
    var details;
    var fatal;
    var loader = this.getInternalLoader(context);

    switch (context.type) {
      case PlaylistContextType.MANIFEST:
        details = timeout ? ErrorDetails.MANIFEST_LOAD_TIMEOUT : ErrorDetails.MANIFEST_LOAD_ERROR;
        fatal = true;
        break;

      case PlaylistContextType.LEVEL:
        details = timeout ? ErrorDetails.LEVEL_LOAD_TIMEOUT : ErrorDetails.LEVEL_LOAD_ERROR;
        fatal = false;
        break;

      case PlaylistContextType.AUDIO_TRACK:
        details = timeout ? ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT : ErrorDetails.AUDIO_TRACK_LOAD_ERROR;
        fatal = false;
        break;

      default:
        // details = ...?
        fatal = false;
    }

    if (loader) {
      loader.abort();
      this.resetInternalLoader(context.type);
    } // TODO(typescript-events): when error events are handled, type this


    var errorData = {
      type: ErrorTypes.NETWORK_ERROR,
      details: details,
      fatal: fatal,
      url: context.url,
      loader: loader,
      context: context,
      networkDetails: networkDetails
    };

    if (response) {
      errorData.response = response;
    }

    this.hls.trigger(events.ERROR, errorData);
  };

  _proto._handlePlaylistLoaded = function _handlePlaylistLoaded(response, stats, context, networkDetails) {
    var type = context.type,
        level = context.level,
        id = context.id,
        levelDetails = context.levelDetails;

    if (!levelDetails || !levelDetails.targetduration) {
      this._handleManifestParsingError(response, context, 'invalid target duration', networkDetails);

      return;
    }

    var canHaveLevels = PlaylistLoader.canHaveQualityLevels(context.type);

    if (canHaveLevels) {
      this.hls.trigger(events.LEVEL_LOADED, {
        details: levelDetails,
        level: level || 0,
        id: id || 0,
        stats: stats,
        networkDetails: networkDetails
      });
    } else {
      switch (type) {
        case PlaylistContextType.AUDIO_TRACK:
          this.hls.trigger(events.AUDIO_TRACK_LOADED, {
            details: levelDetails,
            id: id,
            stats: stats,
            networkDetails: networkDetails
          });
          break;

        case PlaylistContextType.SUBTITLE_TRACK:
          this.hls.trigger(events.SUBTITLE_TRACK_LOADED, {
            details: levelDetails,
            id: id,
            stats: stats,
            networkDetails: networkDetails
          });
          break;
      }
    }
  };

  return PlaylistLoader;
}(event_handler);

/* harmony default export */ var playlist_loader = (playlist_loader_PlaylistLoader);
// CONCATENATED MODULE: ./src/loader/fragment-loader.js



function fragment_loader_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*
 * Fragment Loader
*/





var fragment_loader_FragmentLoader =
/*#__PURE__*/
function (_EventHandler) {
  fragment_loader_inheritsLoose(FragmentLoader, _EventHandler);

  function FragmentLoader(hls) {
    var _this;

    _this = _EventHandler.call(this, hls, events.FRAG_LOADING) || this;
    _this.loaders = {};
    return _this;
  }

  var _proto = FragmentLoader.prototype;

  _proto.destroy = function destroy() {
    var loaders = this.loaders;

    for (var loaderName in loaders) {
      var loader = loaders[loaderName];

      if (loader) {
        loader.destroy();
      }
    }

    this.loaders = {};

    _EventHandler.prototype.destroy.call(this);
  };

  _proto.onFragLoading = function onFragLoading(data) {
    var frag = data.frag,
        type = frag.type,
        loaders = this.loaders,
        config = this.hls.config,
        FragmentILoader = config.fLoader,
        DefaultILoader = config.loader; // reset fragment state

    frag.loaded = 0;
    var loader = loaders[type];

    if (loader) {
      logger.warn("abort previous fragment loader for type: " + type);
      loader.abort();
    }

    loader = loaders[type] = frag.loader = config.fLoader ? new FragmentILoader(config) : new DefaultILoader(config);
    var loaderContext, loaderConfig, loaderCallbacks;
    loaderContext = {
      url: frag.url,
      frag: frag,
      responseType: 'arraybuffer',
      progressData: false
    };
    var start = frag.byteRangeStartOffset,
        end = frag.byteRangeEndOffset;

    if (isFiniteNumber(start) && isFiniteNumber(end)) {
      loaderContext.rangeStart = start;
      loaderContext.rangeEnd = end;
    }

    loaderConfig = {
      timeout: config.fragLoadingTimeOut,
      maxRetry: 0,
      retryDelay: 0,
      maxRetryDelay: config.fragLoadingMaxRetryTimeout
    };
    loaderCallbacks = {
      onSuccess: this.loadsuccess.bind(this),
      onError: this.loaderror.bind(this),
      onTimeout: this.loadtimeout.bind(this),
      onProgress: this.loadprogress.bind(this)
    };
    loader.load(loaderContext, loaderConfig, loaderCallbacks);
  };

  _proto.loadsuccess = function loadsuccess(response, stats, context, networkDetails) {
    if (networkDetails === void 0) {
      networkDetails = null;
    }

    var payload = response.data,
        frag = context.frag; // detach fragment loader on load success

    frag.loader = undefined;
    this.loaders[frag.type] = undefined;
    this.hls.trigger(events.FRAG_LOADED, {
      payload: payload,
      frag: frag,
      stats: stats,
      networkDetails: networkDetails
    });
  };

  _proto.loaderror = function loaderror(response, context, networkDetails) {
    if (networkDetails === void 0) {
      networkDetails = null;
    }

    var frag = context.frag;
    var loader = frag.loader;

    if (loader) {
      loader.abort();
    }

    this.loaders[frag.type] = undefined;
    this.hls.trigger(events.ERROR, {
      type: ErrorTypes.NETWORK_ERROR,
      details: ErrorDetails.FRAG_LOAD_ERROR,
      fatal: false,
      frag: context.frag,
      response: response,
      networkDetails: networkDetails
    });
  };

  _proto.loadtimeout = function loadtimeout(stats, context, networkDetails) {
    if (networkDetails === void 0) {
      networkDetails = null;
    }

    var frag = context.frag;
    var loader = frag.loader;

    if (loader) {
      loader.abort();
    }

    this.loaders[frag.type] = undefined;
    this.hls.trigger(events.ERROR, {
      type: ErrorTypes.NETWORK_ERROR,
      details: ErrorDetails.FRAG_LOAD_TIMEOUT,
      fatal: false,
      frag: context.frag,
      networkDetails: networkDetails
    });
  } // data will be used for progressive parsing
  ;

  _proto.loadprogress = function loadprogress(stats, context, data, networkDetails) {
    if (networkDetails === void 0) {
      networkDetails = null;
    }

    // jshint ignore:line
    var frag = context.frag;
    frag.loaded = stats.loaded;
    this.hls.trigger(events.FRAG_LOAD_PROGRESS, {
      frag: frag,
      stats: stats,
      networkDetails: networkDetails
    });
  };

  return FragmentLoader;
}(event_handler);

/* harmony default export */ var fragment_loader = (fragment_loader_FragmentLoader);
// CONCATENATED MODULE: ./src/loader/key-loader.ts
function key_loader_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*
 * Decrypt key Loader
*/





var key_loader_KeyLoader =
/*#__PURE__*/
function (_EventHandler) {
  key_loader_inheritsLoose(KeyLoader, _EventHandler);

  function KeyLoader(hls) {
    var _this;

    _this = _EventHandler.call(this, hls, events.KEY_LOADING) || this;
    _this.loaders = {};
    _this.decryptkey = null;
    _this.decrypturl = null;
    return _this;
  }

  var _proto = KeyLoader.prototype;

  _proto.destroy = function destroy() {
    for (var loaderName in this.loaders) {
      var loader = this.loaders[loaderName];

      if (loader) {
        loader.destroy();
      }
    }

    this.loaders = {};

    _EventHandler.prototype.destroy.call(this);
  };

  _proto.onKeyLoading = function onKeyLoading(data) {
    var frag = data.frag;
    var type = frag.type;
    var loader = this.loaders[type];

    if (!frag.decryptdata) {
      logger.warn('Missing decryption data on fragment in onKeyLoading');
      return;
    } // Load the key if the uri is different from previous one, or if the decrypt key has not yet been retrieved


    var uri = frag.decryptdata.uri;

    if (uri !== this.decrypturl || this.decryptkey === null) {
      var config = this.hls.config;

      if (loader) {
        logger.warn("abort previous key loader for type:" + type);
        loader.abort();
      }

      if (!uri) {
        logger.warn('key uri is falsy');
        return;
      }

      frag.loader = this.loaders[type] = new config.loader(config);
      this.decrypturl = uri;
      this.decryptkey = null;
      var loaderContext = {
        url: uri,
        frag: frag,
        responseType: 'arraybuffer'
      }; // maxRetry is 0 so that instead of retrying the same key on the same variant multiple times,
      // key-loader will trigger an error and rely on stream-controller to handle retry logic.
      // this will also align retry logic with fragment-loader

      var loaderConfig = {
        timeout: config.fragLoadingTimeOut,
        maxRetry: 0,
        retryDelay: config.fragLoadingRetryDelay,
        maxRetryDelay: config.fragLoadingMaxRetryTimeout
      };
      var loaderCallbacks = {
        onSuccess: this.loadsuccess.bind(this),
        onError: this.loaderror.bind(this),
        onTimeout: this.loadtimeout.bind(this)
      };
      frag.loader.load(loaderContext, loaderConfig, loaderCallbacks);
    } else if (this.decryptkey) {
      // Return the key if it's already been loaded
      frag.decryptdata.key = this.decryptkey;
      this.hls.trigger(events.KEY_LOADED, {
        frag: frag
      });
    }
  };

  _proto.loadsuccess = function loadsuccess(response, stats, context) {
    var frag = context.frag;

    if (!frag.decryptdata) {
      logger.error('after key load, decryptdata unset');
      return;
    }

    this.decryptkey = frag.decryptdata.key = new Uint8Array(response.data); // detach fragment loader on load success

    frag.loader = undefined;
    delete this.loaders[frag.type];
    this.hls.trigger(events.KEY_LOADED, {
      frag: frag
    });
  };

  _proto.loaderror = function loaderror(response, context) {
    var frag = context.frag;
    var loader = frag.loader;

    if (loader) {
      loader.abort();
    }

    delete this.loaders[frag.type];
    this.hls.trigger(events.ERROR, {
      type: ErrorTypes.NETWORK_ERROR,
      details: ErrorDetails.KEY_LOAD_ERROR,
      fatal: false,
      frag: frag,
      response: response
    });
  };

  _proto.loadtimeout = function loadtimeout(stats, context) {
    var frag = context.frag;
    var loader = frag.loader;

    if (loader) {
      loader.abort();
    }

    delete this.loaders[frag.type];
    this.hls.trigger(events.ERROR, {
      type: ErrorTypes.NETWORK_ERROR,
      details: ErrorDetails.KEY_LOAD_TIMEOUT,
      fatal: false,
      frag: frag
    });
  };

  return KeyLoader;
}(event_handler);

/* harmony default export */ var key_loader = (key_loader_KeyLoader);
// CONCATENATED MODULE: ./src/controller/fragment-tracker.js


function fragment_tracker_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }



var FragmentState = {
  NOT_LOADED: 'NOT_LOADED',
  APPENDING: 'APPENDING',
  PARTIAL: 'PARTIAL',
  OK: 'OK'
};
var fragment_tracker_FragmentTracker =
/*#__PURE__*/
function (_EventHandler) {
  fragment_tracker_inheritsLoose(FragmentTracker, _EventHandler);

  function FragmentTracker(hls) {
    var _this;

    _this = _EventHandler.call(this, hls, events.BUFFER_APPENDED, events.FRAG_BUFFERED, events.FRAG_LOADED) || this;
    _this.bufferPadding = 0.2;
    _this.fragments = Object.create(null);
    _this.timeRanges = Object.create(null);
    _this.config = hls.config;
    return _this;
  }

  var _proto = FragmentTracker.prototype;

  _proto.destroy = function destroy() {
    this.fragments = Object.create(null);
    this.timeRanges = Object.create(null);
    this.config = null;
    event_handler.prototype.destroy.call(this);

    _EventHandler.prototype.destroy.call(this);
  }
  /**
   * Return a Fragment that match the position and levelType.
   * If not found any Fragment, return null
   * @param {number} position
   * @param {LevelType} levelType
   * @returns {Fragment|null}
   */
  ;

  _proto.getBufferedFrag = function getBufferedFrag(position, levelType) {
    var fragments = this.fragments;
    var bufferedFrags = Object.keys(fragments).filter(function (key) {
      var fragmentEntity = fragments[key];

      if (fragmentEntity.body.type !== levelType) {
        return false;
      }

      if (!fragmentEntity.buffered) {
        return false;
      }

      var frag = fragmentEntity.body;
      return frag.startPTS <= position && position <= frag.endPTS;
    });

    if (bufferedFrags.length === 0) {
      return null;
    } else {
      // https://github.com/video-dev/hls.js/pull/1545#discussion_r166229566
      var bufferedFragKey = bufferedFrags.pop();
      return fragments[bufferedFragKey].body;
    }
  }
  /**
   * Partial fragments effected by coded frame eviction will be removed
   * The browser will unload parts of the buffer to free up memory for new buffer data
   * Fragments will need to be reloaded when the buffer is freed up, removing partial fragments will allow them to reload(since there might be parts that are still playable)
   * @param {String} elementaryStream The elementaryStream of media this is (eg. video/audio)
   * @param {TimeRanges} timeRange TimeRange object from a sourceBuffer
   */
  ;

  _proto.detectEvictedFragments = function detectEvictedFragments(elementaryStream, timeRange) {
    var _this2 = this;

    var fragmentTimes, time; // Check if any flagged fragments have been unloaded

    Object.keys(this.fragments).forEach(function (key) {
      var fragmentEntity = _this2.fragments[key];

      if (fragmentEntity.buffered === true) {
        var esData = fragmentEntity.range[elementaryStream];

        if (esData) {
          fragmentTimes = esData.time;

          for (var i = 0; i < fragmentTimes.length; i++) {
            time = fragmentTimes[i];

            if (_this2.isTimeBuffered(time.startPTS, time.endPTS, timeRange) === false) {
              // Unregister partial fragment as it needs to load again to be reused
              _this2.removeFragment(fragmentEntity.body);

              break;
            }
          }
        }
      }
    });
  }
  /**
   * Checks if the fragment passed in is loaded in the buffer properly
   * Partially loaded fragments will be registered as a partial fragment
   * @param {Object} fragment Check the fragment against all sourceBuffers loaded
   */
  ;

  _proto.detectPartialFragments = function detectPartialFragments(fragment) {
    var _this3 = this;

    var fragKey = this.getFragmentKey(fragment);
    var fragmentEntity = this.fragments[fragKey];

    if (fragmentEntity) {
      fragmentEntity.buffered = true;
      Object.keys(this.timeRanges).forEach(function (elementaryStream) {
        if (fragment.hasElementaryStream(elementaryStream)) {
          var timeRange = _this3.timeRanges[elementaryStream]; // Check for malformed fragments
          // Gaps need to be calculated for each elementaryStream

          fragmentEntity.range[elementaryStream] = _this3.getBufferedTimes(fragment.startPTS, fragment.endPTS, timeRange);
        }
      });
    }
  };

  _proto.getBufferedTimes = function getBufferedTimes(startPTS, endPTS, timeRange) {
    var fragmentTimes = [];
    var startTime, endTime;
    var fragmentPartial = false;

    for (var i = 0; i < timeRange.length; i++) {
      startTime = timeRange.start(i) - this.bufferPadding;
      endTime = timeRange.end(i) + this.bufferPadding;

      if (startPTS >= startTime && endPTS <= endTime) {
        // Fragment is entirely contained in buffer
        // No need to check the other timeRange times since it's completely playable
        fragmentTimes.push({
          startPTS: Math.max(startPTS, timeRange.start(i)),
          endPTS: Math.min(endPTS, timeRange.end(i))
        });
        break;
      } else if (startPTS < endTime && endPTS > startTime) {
        // Check for intersection with buffer
        // Get playable sections of the fragment
        fragmentTimes.push({
          startPTS: Math.max(startPTS, timeRange.start(i)),
          endPTS: Math.min(endPTS, timeRange.end(i))
        });
        fragmentPartial = true;
      } else if (endPTS <= startTime) {
        // No need to check the rest of the timeRange as it is in order
        break;
      }
    }

    return {
      time: fragmentTimes,
      partial: fragmentPartial
    };
  };

  _proto.getFragmentKey = function getFragmentKey(fragment) {
    return fragment.type + "_" + fragment.level + "_" + fragment.urlId + "_" + fragment.sn;
  }
  /**
   * Gets the partial fragment for a certain time
   * @param {Number} time
   * @returns {Object} fragment Returns a partial fragment at a time or null if there is no partial fragment
   */
  ;

  _proto.getPartialFragment = function getPartialFragment(time) {
    var _this4 = this;

    var timePadding, startTime, endTime;
    var bestFragment = null;
    var bestOverlap = 0;
    Object.keys(this.fragments).forEach(function (key) {
      var fragmentEntity = _this4.fragments[key];

      if (_this4.isPartial(fragmentEntity)) {
        startTime = fragmentEntity.body.startPTS - _this4.bufferPadding;
        endTime = fragmentEntity.body.endPTS + _this4.bufferPadding;

        if (time >= startTime && time <= endTime) {
          // Use the fragment that has the most padding from start and end time
          timePadding = Math.min(time - startTime, endTime - time);

          if (bestOverlap <= timePadding) {
            bestFragment = fragmentEntity.body;
            bestOverlap = timePadding;
          }
        }
      }
    });
    return bestFragment;
  }
  /**
   * @param {Object} fragment The fragment to check
   * @returns {String} Returns the fragment state when a fragment never loaded or if it partially loaded
   */
  ;

  _proto.getState = function getState(fragment) {
    var fragKey = this.getFragmentKey(fragment);
    var fragmentEntity = this.fragments[fragKey];
    var state = FragmentState.NOT_LOADED;

    if (fragmentEntity !== undefined) {
      if (!fragmentEntity.buffered) {
        state = FragmentState.APPENDING;
      } else if (this.isPartial(fragmentEntity) === true) {
        state = FragmentState.PARTIAL;
      } else {
        state = FragmentState.OK;
      }
    }

    return state;
  };

  _proto.isPartial = function isPartial(fragmentEntity) {
    return fragmentEntity.buffered === true && (fragmentEntity.range.video !== undefined && fragmentEntity.range.video.partial === true || fragmentEntity.range.audio !== undefined && fragmentEntity.range.audio.partial === true);
  };

  _proto.isTimeBuffered = function isTimeBuffered(startPTS, endPTS, timeRange) {
    var startTime, endTime;

    for (var i = 0; i < timeRange.length; i++) {
      startTime = timeRange.start(i) - this.bufferPadding;
      endTime = timeRange.end(i) + this.bufferPadding;

      if (startPTS >= startTime && endPTS <= endTime) {
        return true;
      }

      if (endPTS <= startTime) {
        // No need to check the rest of the timeRange as it is in order
        return false;
      }
    }

    return false;
  }
  /**
   * Fires when a fragment loading is completed
   */
  ;

  _proto.onFragLoaded = function onFragLoaded(e) {
    var fragment = e.frag; // don't track initsegment (for which sn is not a number)
    // don't track frags used for bitrateTest, they're irrelevant.

    if (!isFiniteNumber(fragment.sn) || fragment.bitrateTest) {
      return;
    }

    this.fragments[this.getFragmentKey(fragment)] = {
      body: fragment,
      range: Object.create(null),
      buffered: false
    };
  }
  /**
   * Fires when the buffer is updated
   */
  ;

  _proto.onBufferAppended = function onBufferAppended(e) {
    var _this5 = this;

    // Store the latest timeRanges loaded in the buffer
    this.timeRanges = e.timeRanges;
    Object.keys(this.timeRanges).forEach(function (elementaryStream) {
      var timeRange = _this5.timeRanges[elementaryStream];

      _this5.detectEvictedFragments(elementaryStream, timeRange);
    });
  }
  /**
   * Fires after a fragment has been loaded into the source buffer
   */
  ;

  _proto.onFragBuffered = function onFragBuffered(e) {
    this.detectPartialFragments(e.frag);
  }
  /**
   * Return true if fragment tracker has the fragment.
   * @param {Object} fragment
   * @returns {boolean}
   */
  ;

  _proto.hasFragment = function hasFragment(fragment) {
    var fragKey = this.getFragmentKey(fragment);
    return this.fragments[fragKey] !== undefined;
  }
  /**
   * Remove a fragment from fragment tracker until it is loaded again
   * @param {Object} fragment The fragment to remove
   */
  ;

  _proto.removeFragment = function removeFragment(fragment) {
    var fragKey = this.getFragmentKey(fragment);
    delete this.fragments[fragKey];
  }
  /**
   * Remove all fragments from fragment tracker.
   */
  ;

  _proto.removeAllFragments = function removeAllFragments() {
    this.fragments = Object.create(null);
  };

  return FragmentTracker;
}(event_handler);
// EXTERNAL MODULE: ./src/controller/stream-controller.js
var stream_controller = __webpack_require__("./src/controller/stream-controller.js");
var stream_controller_default = /*#__PURE__*/__webpack_require__.n(stream_controller);

// CONCATENATED MODULE: ./src/controller/level-helper.js





/**
 * @module LevelHelper
 *
 * Providing methods dealing with playlist sliding and drift
 *
 * TODO: Create an actual `Level` class/model that deals with all this logic in an object-oriented-manner.
 *
 * */

function addGroupId(level, type, id) {
  switch (type) {
    case 'audio':
      if (!level.audioGroupIds) {
        level.audioGroupIds = [];
      }

      level.audioGroupIds.push(id);
      break;

    case 'text':
      if (!level.textGroupIds) {
        level.textGroupIds = [];
      }

      level.textGroupIds.push(id);
      break;
  }
}
function updatePTS(fragments, fromIdx, toIdx) {
  var fragFrom = fragments[fromIdx],
      fragTo = fragments[toIdx],
      fragToPTS = fragTo.startPTS; // if we know startPTS[toIdx]

  if (isFiniteNumber(fragToPTS)) {
    // update fragment duration.
    // it helps to fix drifts between playlist reported duration and fragment real duration
    if (toIdx > fromIdx) {
      fragFrom.duration = fragToPTS - fragFrom.start;

      if (fragFrom.duration < 0) {
        logger.warn("negative duration computed for frag " + fragFrom.sn + ",level " + fragFrom.level + ", there should be some duration drift between playlist and fragment!");
      }
    } else {
      fragTo.duration = fragFrom.start - fragToPTS;

      if (fragTo.duration < 0) {
        logger.warn("negative duration computed for frag " + fragTo.sn + ",level " + fragTo.level + ", there should be some duration drift between playlist and fragment!");
      }
    }
  } else {
    // we dont know startPTS[toIdx]
    if (toIdx > fromIdx) {
      fragTo.start = fragFrom.start + fragFrom.duration;
    } else {
      fragTo.start = Math.max(fragFrom.start - fragTo.duration, 0);
    }
  }
}
function updateFragPTSDTS(details, frag, startPTS, endPTS, startDTS, endDTS) {
  // update frag PTS/DTS
  var maxStartPTS = startPTS;

  if (isFiniteNumber(frag.startPTS)) {
    // delta PTS between audio and video
    var deltaPTS = Math.abs(frag.startPTS - startPTS);

    if (!isFiniteNumber(frag.deltaPTS)) {
      frag.deltaPTS = deltaPTS;
    } else {
      frag.deltaPTS = Math.max(deltaPTS, frag.deltaPTS);
    }

    maxStartPTS = Math.max(startPTS, frag.startPTS);
    startPTS = Math.min(startPTS, frag.startPTS);
    endPTS = Math.max(endPTS, frag.endPTS);
    startDTS = Math.min(startDTS, frag.startDTS);
    endDTS = Math.max(endDTS, frag.endDTS);
  }

  var drift = startPTS - frag.start;
  frag.start = frag.startPTS = startPTS;
  frag.maxStartPTS = maxStartPTS;
  frag.endPTS = endPTS;
  frag.startDTS = startDTS;
  frag.endDTS = endDTS;
  frag.duration = endPTS - startPTS;
  var sn = frag.sn; // exit if sn out of range

  if (!details || sn < details.startSN || sn > details.endSN) {
    return 0;
  }

  var fragIdx, fragments, i;
  fragIdx = sn - details.startSN;
  fragments = details.fragments; // update frag reference in fragments array
  // rationale is that fragments array might not contain this frag object.
  // this will happen if playlist has been refreshed between frag loading and call to updateFragPTSDTS()
  // if we don't update frag, we won't be able to propagate PTS info on the playlist
  // resulting in invalid sliding computation

  fragments[fragIdx] = frag; // adjust fragment PTS/duration from seqnum-1 to frag 0

  for (i = fragIdx; i > 0; i--) {
    updatePTS(fragments, i, i - 1);
  } // adjust fragment PTS/duration from seqnum to last frag


  for (i = fragIdx; i < fragments.length - 1; i++) {
    updatePTS(fragments, i, i + 1);
  }

  details.PTSKnown = true;
  return drift;
}
function mergeDetails(oldDetails, newDetails) {
  // potentially retrieve cached initsegment
  if (newDetails.initSegment && oldDetails.initSegment) {
    newDetails.initSegment = oldDetails.initSegment;
  } // check if old/new playlists have fragments in common
  // loop through overlapping SN and update startPTS , cc, and duration if any found


  var ccOffset = 0;
  var PTSFrag;
  mapFragmentIntersection(oldDetails, newDetails, function (oldFrag, newFrag) {
    ccOffset = oldFrag.cc - newFrag.cc;

    if (isFiniteNumber(oldFrag.startPTS)) {
      newFrag.start = newFrag.startPTS = oldFrag.startPTS;
      newFrag.endPTS = oldFrag.endPTS;
      newFrag.duration = oldFrag.duration;
      newFrag.backtracked = oldFrag.backtracked;
      newFrag.dropped = oldFrag.dropped;
      PTSFrag = newFrag;
    } // PTS is known when there are overlapping segments


    newDetails.PTSKnown = true;
  });

  if (!newDetails.PTSKnown) {
    return;
  }

  if (ccOffset) {
    logger.log('discontinuity sliding from playlist, take drift into account');
    var newFragments = newDetails.fragments;

    for (var i = 0; i < newFragments.length; i++) {
      newFragments[i].cc += ccOffset;
    }
  } // if at least one fragment contains PTS info, recompute PTS information for all fragments


  if (PTSFrag) {
    updateFragPTSDTS(newDetails, PTSFrag, PTSFrag.startPTS, PTSFrag.endPTS, PTSFrag.startDTS, PTSFrag.endDTS);
  } else {
    // ensure that delta is within oldFragments range
    // also adjust sliding in case delta is 0 (we could have old=[50-60] and new=old=[50-61])
    // in that case we also need to adjust start offset of all fragments
    adjustSliding(oldDetails, newDetails);
  } // if we are here, it means we have fragments overlapping between
  // old and new level. reliable PTS info is thus relying on old level


  newDetails.PTSKnown = oldDetails.PTSKnown;
}
function mergeSubtitlePlaylists(oldPlaylist, newPlaylist, referenceStart) {
  if (referenceStart === void 0) {
    referenceStart = 0;
  }

  var lastIndex = -1;
  mapFragmentIntersection(oldPlaylist, newPlaylist, function (oldFrag, newFrag, index) {
    newFrag.start = oldFrag.start;
    lastIndex = index;
  });
  var frags = newPlaylist.fragments;

  if (lastIndex < 0) {
    frags.forEach(function (frag) {
      frag.start += referenceStart;
    });
    return;
  }

  for (var i = lastIndex + 1; i < frags.length; i++) {
    frags[i].start = frags[i - 1].start + frags[i - 1].duration;
  }
}
function mapFragmentIntersection(oldPlaylist, newPlaylist, intersectionFn) {
  if (!oldPlaylist || !newPlaylist) {
    return;
  }

  var start = Math.max(oldPlaylist.startSN, newPlaylist.startSN) - newPlaylist.startSN;
  var end = Math.min(oldPlaylist.endSN, newPlaylist.endSN) - newPlaylist.startSN;
  var delta = newPlaylist.startSN - oldPlaylist.startSN;

  for (var i = start; i <= end; i++) {
    var oldFrag = oldPlaylist.fragments[delta + i];
    var newFrag = newPlaylist.fragments[i];

    if (!oldFrag || !newFrag) {
      break;
    }

    intersectionFn(oldFrag, newFrag, i);
  }
}
function adjustSliding(oldPlaylist, newPlaylist) {
  var delta = newPlaylist.startSN - oldPlaylist.startSN;
  var oldFragments = oldPlaylist.fragments;
  var newFragments = newPlaylist.fragments;

  if (delta < 0 || delta > oldFragments.length) {
    return;
  }

  for (var i = 0; i < newFragments.length; i++) {
    newFragments[i].start += oldFragments[delta].start;
  }
}
function computeReloadInterval(currentPlaylist, newPlaylist, lastRequestTime) {
  var reloadInterval = 1000 * (newPlaylist.averagetargetduration ? newPlaylist.averagetargetduration : newPlaylist.targetduration);
  var minReloadInterval = reloadInterval / 2;

  if (currentPlaylist && newPlaylist.endSN === currentPlaylist.endSN) {
    // follow HLS Spec, If the client reloads a Playlist file and finds that it has not
    // changed then it MUST wait for a period of one-half the target
    // duration before retrying.
    reloadInterval = minReloadInterval;
  }

  if (lastRequestTime) {
    reloadInterval = Math.max(minReloadInterval, reloadInterval - (window.performance.now() - lastRequestTime));
  } // in any case, don't reload more than half of target duration


  return Math.round(reloadInterval);
}
// CONCATENATED MODULE: ./src/controller/level-controller.js
function level_controller_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function level_controller_createClass(Constructor, protoProps, staticProps) { if (protoProps) level_controller_defineProperties(Constructor.prototype, protoProps); if (staticProps) level_controller_defineProperties(Constructor, staticProps); return Constructor; }

function level_controller_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*
 * Level Controller
*/






var level_controller_window = window,
    level_controller_performance = level_controller_window.performance;
var chromeOrFirefox;

var level_controller_LevelController =
/*#__PURE__*/
function (_EventHandler) {
  level_controller_inheritsLoose(LevelController, _EventHandler);

  function LevelController(hls) {
    var _this;

    _this = _EventHandler.call(this, hls, events.MANIFEST_LOADED, events.LEVEL_LOADED, events.AUDIO_TRACK_SWITCHED, events.FRAG_LOADED, events.ERROR) || this;
    _this.canload = false;
    _this.currentLevelIndex = null;
    _this.manualLevelIndex = -1;
    _this.timer = null;
    chromeOrFirefox = /chrome|firefox/.test(navigator.userAgent.toLowerCase());
    return _this;
  }

  var _proto = LevelController.prototype;

  _proto.onHandlerDestroying = function onHandlerDestroying() {
    this.clearTimer();
    this.manualLevelIndex = -1;
  };

  _proto.clearTimer = function clearTimer() {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  };

  _proto.startLoad = function startLoad() {
    var levels = this._levels;
    this.canload = true;
    this.levelRetryCount = 0; // clean up live level details to force reload them, and reset load errors

    if (levels) {
      levels.forEach(function (level) {
        level.loadError = 0;
        var levelDetails = level.details;

        if (levelDetails && levelDetails.live) {
          level.details = undefined;
        }
      });
    } // speed up live playlist refresh if timer exists


    if (this.timer !== null) {
      this.loadLevel();
    }
  };

  _proto.stopLoad = function stopLoad() {
    this.canload = false;
  };

  _proto.onManifestLoaded = function onManifestLoaded(data) {
    var levels = [];
    var audioTracks = [];
    var bitrateStart;
    var levelSet = {};
    var levelFromSet = null;
    var videoCodecFound = false;
    var audioCodecFound = false; // regroup redundant levels together

    data.levels.forEach(function (level) {
      var attributes = level.attrs;
      level.loadError = 0;
      level.fragmentError = false;
      videoCodecFound = videoCodecFound || !!level.videoCodec;
      audioCodecFound = audioCodecFound || !!level.audioCodec; // erase audio codec info if browser does not support mp4a.40.34.
      // demuxer will autodetect codec and fallback to mpeg/audio

      if (chromeOrFirefox && level.audioCodec && level.audioCodec.indexOf('mp4a.40.34') !== -1) {
        level.audioCodec = undefined;
      }

      levelFromSet = levelSet[level.bitrate]; // FIXME: we would also have to match the resolution here

      if (!levelFromSet) {
        level.url = [level.url];
        level.urlId = 0;
        levelSet[level.bitrate] = level;
        levels.push(level);
      } else {
        levelFromSet.url.push(level.url);
      }

      if (attributes) {
        if (attributes.AUDIO) {
          audioCodecFound = true;
          addGroupId(levelFromSet || level, 'audio', attributes.AUDIO);
        }

        if (attributes.SUBTITLES) {
          addGroupId(levelFromSet || level, 'text', attributes.SUBTITLES);
        }
      }
    }); // remove audio-only level if we also have levels with audio+video codecs signalled

    if (videoCodecFound && audioCodecFound) {
      levels = levels.filter(function (_ref) {
        var videoCodec = _ref.videoCodec;
        return !!videoCodec;
      });
    } // only keep levels with supported audio/video codecs


    levels = levels.filter(function (_ref2) {
      var audioCodec = _ref2.audioCodec,
          videoCodec = _ref2.videoCodec;
      return (!audioCodec || isCodecSupportedInMp4(audioCodec, 'audio')) && (!videoCodec || isCodecSupportedInMp4(videoCodec, 'video'));
    });

    if (data.audioTracks) {
      audioTracks = data.audioTracks.filter(function (track) {
        return !track.audioCodec || isCodecSupportedInMp4(track.audioCodec, 'audio');
      }); // Reassign id's after filtering since they're used as array indices

      audioTracks.forEach(function (track, index) {
        track.id = index;
      });
    }

    if (levels.length > 0) {
      // start bitrate is the first bitrate of the manifest
      bitrateStart = levels[0].bitrate; // sort level on bitrate

      levels.sort(function (a, b) {
        return a.bitrate - b.bitrate;
      });
      this._levels = levels; // find index of first level in sorted levels

      for (var i = 0; i < levels.length; i++) {
        if (levels[i].bitrate === bitrateStart) {
          this._firstLevel = i;
          logger.log("manifest loaded," + levels.length + " level(s) found, first bitrate:" + bitrateStart);
          break;
        }
      } // Audio is only alternate if manifest include a URI along with the audio group tag


      this.hls.trigger(events.MANIFEST_PARSED, {
        levels: levels,
        audioTracks: audioTracks,
        firstLevel: this._firstLevel,
        stats: data.stats,
        audio: audioCodecFound,
        video: videoCodecFound,
        altAudio: audioTracks.some(function (t) {
          return !!t.url;
        })
      });
    } else {
      this.hls.trigger(events.ERROR, {
        type: ErrorTypes.MEDIA_ERROR,
        details: ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR,
        fatal: true,
        url: this.hls.url,
        reason: 'no level with compatible codecs found in manifest'
      });
    }
  };

  _proto.setLevelInternal = function setLevelInternal(newLevel) {
    var levels = this._levels;
    var hls = this.hls; // check if level idx is valid

    if (newLevel >= 0 && newLevel < levels.length) {
      // stopping live reloading timer if any
      this.clearTimer();

      if (this.currentLevelIndex !== newLevel) {
        logger.log("switching to level " + newLevel);
        this.currentLevelIndex = newLevel;
        var levelProperties = levels[newLevel];
        levelProperties.level = newLevel;
        hls.trigger(events.LEVEL_SWITCHING, levelProperties);
      }

      var level = levels[newLevel];
      var levelDetails = level.details; // check if we need to load playlist for this level

      if (!levelDetails || levelDetails.live) {
        // level not retrieved yet, or live playlist we need to (re)load it
        var urlId = level.urlId;
        hls.trigger(events.LEVEL_LOADING, {
          url: level.url[urlId],
          level: newLevel,
          id: urlId
        });
      }
    } else {
      // invalid level id given, trigger error
      hls.trigger(events.ERROR, {
        type: ErrorTypes.OTHER_ERROR,
        details: ErrorDetails.LEVEL_SWITCH_ERROR,
        level: newLevel,
        fatal: false,
        reason: 'invalid level idx'
      });
    }
  };

  _proto.onError = function onError(data) {
    if (data.fatal) {
      if (data.type === ErrorTypes.NETWORK_ERROR) {
        this.clearTimer();
      }

      return;
    }

    var levelError = false,
        fragmentError = false;
    var levelIndex; // try to recover not fatal errors

    switch (data.details) {
      case ErrorDetails.FRAG_LOAD_ERROR:
      case ErrorDetails.FRAG_LOAD_TIMEOUT:
      case ErrorDetails.KEY_LOAD_ERROR:
      case ErrorDetails.KEY_LOAD_TIMEOUT:
        levelIndex = data.frag.level;
        fragmentError = true;
        break;

      case ErrorDetails.LEVEL_LOAD_ERROR:
      case ErrorDetails.LEVEL_LOAD_TIMEOUT:
        levelIndex = data.context.level;
        levelError = true;
        break;

      case ErrorDetails.REMUX_ALLOC_ERROR:
        levelIndex = data.level;
        levelError = true;
        break;
    }

    if (levelIndex !== undefined) {
      this.recoverLevel(data, levelIndex, levelError, fragmentError);
    }
  }
  /**
   * Switch to a redundant stream if any available.
   * If redundant stream is not available, emergency switch down if ABR mode is enabled.
   *
   * @param {Object} errorEvent
   * @param {Number} levelIndex current level index
   * @param {Boolean} levelError
   * @param {Boolean} fragmentError
   */
  // FIXME Find a better abstraction where fragment/level retry management is well decoupled
  ;

  _proto.recoverLevel = function recoverLevel(errorEvent, levelIndex, levelError, fragmentError) {
    var _this2 = this;

    var config = this.hls.config;
    var errorDetails = errorEvent.details;
    var level = this._levels[levelIndex];
    var redundantLevels, delay, nextLevel;
    level.loadError++;
    level.fragmentError = fragmentError;

    if (levelError) {
      if (this.levelRetryCount + 1 <= config.levelLoadingMaxRetry) {
        // exponential backoff capped to max retry timeout
        delay = Math.min(Math.pow(2, this.levelRetryCount) * config.levelLoadingRetryDelay, config.levelLoadingMaxRetryTimeout); // Schedule level reload

        this.timer = setTimeout(function () {
          return _this2.loadLevel();
        }, delay); // boolean used to inform stream controller not to switch back to IDLE on non fatal error

        errorEvent.levelRetry = true;
        this.levelRetryCount++;
        logger.warn("level controller, " + errorDetails + ", retry in " + delay + " ms, current retry count is " + this.levelRetryCount);
      } else {
        logger.error("level controller, cannot recover from " + errorDetails + " error");
        this.currentLevelIndex = null; // stopping live reloading timer if any

        this.clearTimer(); // switch error to fatal

        errorEvent.fatal = true;
        return;
      }
    } // Try any redundant streams if available for both errors: level and fragment
    // If level.loadError reaches redundantLevels it means that we tried them all, no hope  => let's switch down


    if (levelError || fragmentError) {
      redundantLevels = level.url.length;

      if (redundantLevels > 1 && level.loadError < redundantLevels) {
        level.urlId = (level.urlId + 1) % redundantLevels;
        level.details = undefined;
        logger.warn("level controller, " + errorDetails + " for level " + levelIndex + ": switching to redundant URL-id " + level.urlId); // console.log('Current audio track group ID:', this.hls.audioTracks[this.hls.audioTrack].groupId);
        // console.log('New video quality level audio group id:', level.attrs.AUDIO);
      } else {
        // Search for available level
        if (this.manualLevelIndex === -1) {
          // When lowest level has been reached, let's start hunt from the top
          nextLevel = levelIndex === 0 ? this._levels.length - 1 : levelIndex - 1;
          logger.warn("level controller, " + errorDetails + ": switch to " + nextLevel);
          this.hls.nextAutoLevel = this.currentLevelIndex = nextLevel;
        } else if (fragmentError) {
          // Allow fragment retry as long as configuration allows.
          // reset this._level so that another call to set level() will trigger again a frag load
          logger.warn("level controller, " + errorDetails + ": reload a fragment");
          this.currentLevelIndex = null;
        }
      }
    }
  } // reset errors on the successful load of a fragment
  ;

  _proto.onFragLoaded = function onFragLoaded(_ref3) {
    var frag = _ref3.frag;

    if (frag !== undefined && frag.type === 'main') {
      var level = this._levels[frag.level];

      if (level !== undefined) {
        level.fragmentError = false;
        level.loadError = 0;
        this.levelRetryCount = 0;
      }
    }
  };

  _proto.onLevelLoaded = function onLevelLoaded(data) {
    var _this3 = this;

    var level = data.level,
        details = data.details; // only process level loaded events matching with expected level

    if (level !== this.currentLevelIndex) {
      return;
    }

    var curLevel = this._levels[level]; // reset level load error counter on successful level loaded only if there is no issues with fragments

    if (!curLevel.fragmentError) {
      curLevel.loadError = 0;
      this.levelRetryCount = 0;
    } // if current playlist is a live playlist, arm a timer to reload it


    if (details.live) {
      var reloadInterval = computeReloadInterval(curLevel.details, details, data.stats.trequest);
      logger.log("live playlist, reload in " + Math.round(reloadInterval) + " ms");
      this.timer = setTimeout(function () {
        return _this3.loadLevel();
      }, reloadInterval);
    } else {
      this.clearTimer();
    }
  };

  _proto.onAudioTrackSwitched = function onAudioTrackSwitched(data) {
    var audioGroupId = this.hls.audioTracks[data.id].groupId;
    var currentLevel = this.hls.levels[this.currentLevelIndex];

    if (!currentLevel) {
      return;
    }

    if (currentLevel.audioGroupIds) {
      var urlId = -1;

      for (var i = 0; i < currentLevel.audioGroupIds.length; i++) {
        if (currentLevel.audioGroupIds[i] === audioGroupId) {
          urlId = i;
          break;
        }
      }

      if (urlId !== currentLevel.urlId) {
        currentLevel.urlId = urlId;
        this.startLoad();
      }
    }
  };

  _proto.loadLevel = function loadLevel() {
    logger.debug('call to loadLevel');

    if (this.currentLevelIndex !== null && this.canload) {
      var levelObject = this._levels[this.currentLevelIndex];

      if (typeof levelObject === 'object' && levelObject.url.length > 0) {
        var level = this.currentLevelIndex;
        var id = levelObject.urlId;
        var url = levelObject.url[id];
        logger.log("Attempt loading level index " + level + " with URL-id " + id); // console.log('Current audio track group ID:', this.hls.audioTracks[this.hls.audioTrack].groupId);
        // console.log('New video quality level audio group id:', levelObject.attrs.AUDIO, level);

        this.hls.trigger(events.LEVEL_LOADING, {
          url: url,
          level: level,
          id: id
        });
      }
    }
  };

  level_controller_createClass(LevelController, [{
    key: "levels",
    get: function get() {
      return this._levels;
    }
  }, {
    key: "level",
    get: function get() {
      return this.currentLevelIndex;
    },
    set: function set(newLevel) {
      var levels = this._levels;

      if (levels) {
        newLevel = Math.min(newLevel, levels.length - 1);

        if (this.currentLevelIndex !== newLevel || !levels[newLevel].details) {
          this.setLevelInternal(newLevel);
        }
      }
    }
  }, {
    key: "manualLevel",
    get: function get() {
      return this.manualLevelIndex;
    },
    set: function set(newLevel) {
      this.manualLevelIndex = newLevel;

      if (this._startLevel === undefined) {
        this._startLevel = newLevel;
      }

      if (newLevel !== -1) {
        this.level = newLevel;
      }
    }
  }, {
    key: "firstLevel",
    get: function get() {
      return this._firstLevel;
    },
    set: function set(newLevel) {
      this._firstLevel = newLevel;
    }
  }, {
    key: "startLevel",
    get: function get() {
      // hls.startLevel takes precedence over config.startLevel
      // if none of these values are defined, fallback on this._firstLevel (first quality level appearing in variant manifest)
      if (this._startLevel === undefined) {
        var configStartLevel = this.hls.config.startLevel;

        if (configStartLevel !== undefined) {
          return configStartLevel;
        } else {
          return this._firstLevel;
        }
      } else {
        return this._startLevel;
      }
    },
    set: function set(newLevel) {
      this._startLevel = newLevel;
    }
  }, {
    key: "nextLoadLevel",
    get: function get() {
      if (this.manualLevelIndex !== -1) {
        return this.manualLevelIndex;
      } else {
        return this.hls.nextAutoLevel;
      }
    },
    set: function set(nextLevel) {
      this.level = nextLevel;

      if (this.manualLevelIndex === -1) {
        this.hls.nextAutoLevel = nextLevel;
      }
    }
  }]);

  return LevelController;
}(event_handler);


// CONCATENATED MODULE: ./src/demux/id3.js

/**
 * ID3 parser
 */

var ID3 =
/*#__PURE__*/
function () {
  function ID3() {}

  /**
   * Returns true if an ID3 header can be found at offset in data
   * @param {Uint8Array} data - The data to search in
   * @param {number} offset - The offset at which to start searching
   * @return {boolean} - True if an ID3 header is found
   */
  ID3.isHeader = function isHeader(data, offset) {
    /*
    * http://id3.org/id3v2.3.0
    * [0]     = 'I'
    * [1]     = 'D'
    * [2]     = '3'
    * [3,4]   = {Version}
    * [5]     = {Flags}
    * [6-9]   = {ID3 Size}
    *
    * An ID3v2 tag can be detected with the following pattern:
    *  $49 44 33 yy yy xx zz zz zz zz
    * Where yy is less than $FF, xx is the 'flags' byte and zz is less than $80
    */
    if (offset + 10 <= data.length) {
      // look for 'ID3' identifier
      if (data[offset] === 0x49 && data[offset + 1] === 0x44 && data[offset + 2] === 0x33) {
        // check version is within range
        if (data[offset + 3] < 0xFF && data[offset + 4] < 0xFF) {
          // check size is within range
          if (data[offset + 6] < 0x80 && data[offset + 7] < 0x80 && data[offset + 8] < 0x80 && data[offset + 9] < 0x80) {
            return true;
          }
        }
      }
    }

    return false;
  }
  /**
   * Returns true if an ID3 footer can be found at offset in data
   * @param {Uint8Array} data - The data to search in
   * @param {number} offset - The offset at which to start searching
   * @return {boolean} - True if an ID3 footer is found
   */
  ;

  ID3.isFooter = function isFooter(data, offset) {
    /*
    * The footer is a copy of the header, but with a different identifier
    */
    if (offset + 10 <= data.length) {
      // look for '3DI' identifier
      if (data[offset] === 0x33 && data[offset + 1] === 0x44 && data[offset + 2] === 0x49) {
        // check version is within range
        if (data[offset + 3] < 0xFF && data[offset + 4] < 0xFF) {
          // check size is within range
          if (data[offset + 6] < 0x80 && data[offset + 7] < 0x80 && data[offset + 8] < 0x80 && data[offset + 9] < 0x80) {
            return true;
          }
        }
      }
    }

    return false;
  }
  /**
   * Returns any adjacent ID3 tags found in data starting at offset, as one block of data
   * @param {Uint8Array} data - The data to search in
   * @param {number} offset - The offset at which to start searching
   * @return {Uint8Array} - The block of data containing any ID3 tags found
   */
  ;

  ID3.getID3Data = function getID3Data(data, offset) {
    var front = offset;
    var length = 0;

    while (ID3.isHeader(data, offset)) {
      // ID3 header is 10 bytes
      length += 10;

      var size = ID3._readSize(data, offset + 6);

      length += size;

      if (ID3.isFooter(data, offset + 10)) {
        // ID3 footer is 10 bytes
        length += 10;
      }

      offset += length;
    }

    if (length > 0) {
      return data.subarray(front, front + length);
    }

    return undefined;
  };

  ID3._readSize = function _readSize(data, offset) {
    var size = 0;
    size = (data[offset] & 0x7f) << 21;
    size |= (data[offset + 1] & 0x7f) << 14;
    size |= (data[offset + 2] & 0x7f) << 7;
    size |= data[offset + 3] & 0x7f;
    return size;
  }
  /**
   * Searches for the Elementary Stream timestamp found in the ID3 data chunk
   * @param {Uint8Array} data - Block of data containing one or more ID3 tags
   * @return {number} - The timestamp
   */
  ;

  ID3.getTimeStamp = function getTimeStamp(data) {
    var frames = ID3.getID3Frames(data);

    for (var i = 0; i < frames.length; i++) {
      var frame = frames[i];

      if (ID3.isTimeStampFrame(frame)) {
        return ID3._readTimeStamp(frame);
      }
    }

    return undefined;
  }
  /**
   * Returns true if the ID3 frame is an Elementary Stream timestamp frame
   * @param {ID3 frame} frame
   */
  ;

  ID3.isTimeStampFrame = function isTimeStampFrame(frame) {
    return frame && frame.key === 'PRIV' && frame.info === 'com.apple.streaming.transportStreamTimestamp';
  };

  ID3._getFrameData = function _getFrameData(data) {
    /*
    Frame ID       $xx xx xx xx (four characters)
    Size           $xx xx xx xx
    Flags          $xx xx
    */
    var type = String.fromCharCode(data[0], data[1], data[2], data[3]);

    var size = ID3._readSize(data, 4); // skip frame id, size, and flags


    var offset = 10;
    return {
      type: type,
      size: size,
      data: data.subarray(offset, offset + size)
    };
  }
  /**
   * Returns an array of ID3 frames found in all the ID3 tags in the id3Data
   * @param {Uint8Array} id3Data - The ID3 data containing one or more ID3 tags
   * @return {ID3 frame[]} - Array of ID3 frame objects
   */
  ;

  ID3.getID3Frames = function getID3Frames(id3Data) {
    var offset = 0;
    var frames = [];

    while (ID3.isHeader(id3Data, offset)) {
      var size = ID3._readSize(id3Data, offset + 6); // skip past ID3 header


      offset += 10;
      var end = offset + size; // loop through frames in the ID3 tag

      while (offset + 8 < end) {
        var frameData = ID3._getFrameData(id3Data.subarray(offset));

        var frame = ID3._decodeFrame(frameData);

        if (frame) {
          frames.push(frame);
        } // skip frame header and frame data


        offset += frameData.size + 10;
      }

      if (ID3.isFooter(id3Data, offset)) {
        offset += 10;
      }
    }

    return frames;
  };

  ID3._decodeFrame = function _decodeFrame(frame) {
    if (frame.type === 'PRIV') {
      return ID3._decodePrivFrame(frame);
    } else if (frame.type[0] === 'T') {
      return ID3._decodeTextFrame(frame);
    } else if (frame.type[0] === 'W') {
      return ID3._decodeURLFrame(frame);
    }

    return undefined;
  };

  ID3._readTimeStamp = function _readTimeStamp(timeStampFrame) {
    if (timeStampFrame.data.byteLength === 8) {
      var data = new Uint8Array(timeStampFrame.data); // timestamp is 33 bit expressed as a big-endian eight-octet number,
      // with the upper 31 bits set to zero.

      var pts33Bit = data[3] & 0x1;
      var timestamp = (data[4] << 23) + (data[5] << 15) + (data[6] << 7) + data[7];
      timestamp /= 45;

      if (pts33Bit) {
        timestamp += 47721858.84;
      } // 2^32 / 90


      return Math.round(timestamp);
    }

    return undefined;
  };

  ID3._decodePrivFrame = function _decodePrivFrame(frame) {
    /*
    Format: <text string>\0<binary data>
    */
    if (frame.size < 2) {
      return undefined;
    }

    var owner = ID3._utf8ArrayToStr(frame.data, true);

    var privateData = new Uint8Array(frame.data.subarray(owner.length + 1));
    return {
      key: frame.type,
      info: owner,
      data: privateData.buffer
    };
  };

  ID3._decodeTextFrame = function _decodeTextFrame(frame) {
    if (frame.size < 2) {
      return undefined;
    }

    if (frame.type === 'TXXX') {
      /*
      Format:
      [0]   = {Text Encoding}
      [1-?] = {Description}\0{Value}
      */
      var index = 1;

      var description = ID3._utf8ArrayToStr(frame.data.subarray(index), true);

      index += description.length + 1;

      var value = ID3._utf8ArrayToStr(frame.data.subarray(index));

      return {
        key: frame.type,
        info: description,
        data: value
      };
    } else {
      /*
      Format:
      [0]   = {Text Encoding}
      [1-?] = {Value}
      */
      var text = ID3._utf8ArrayToStr(frame.data.subarray(1));

      return {
        key: frame.type,
        data: text
      };
    }
  };

  ID3._decodeURLFrame = function _decodeURLFrame(frame) {
    if (frame.type === 'WXXX') {
      /*
      Format:
      [0]   = {Text Encoding}
      [1-?] = {Description}\0{URL}
      */
      if (frame.size < 2) {
        return undefined;
      }

      var index = 1;

      var description = ID3._utf8ArrayToStr(frame.data.subarray(index));

      index += description.length + 1;

      var value = ID3._utf8ArrayToStr(frame.data.subarray(index));

      return {
        key: frame.type,
        info: description,
        data: value
      };
    } else {
      /*
      Format:
      [0-?] = {URL}
      */
      var url = ID3._utf8ArrayToStr(frame.data);

      return {
        key: frame.type,
        data: url
      };
    }
  } // http://stackoverflow.com/questions/8936984/uint8array-to-string-in-javascript/22373197
  // http://www.onicos.com/staff/iz/amuse/javascript/expert/utf.txt

  /* utf.js - UTF-8 <=> UTF-16 convertion
   *
   * Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
   * Version: 1.0
   * LastModified: Dec 25 1999
   * This library is free.  You can redistribute it and/or modify it.
   */
  ;

  ID3._utf8ArrayToStr = function _utf8ArrayToStr(array, exitOnNull) {
    if (exitOnNull === void 0) {
      exitOnNull = false;
    }

    var decoder = getTextDecoder();

    if (decoder) {
      var decoded = decoder.decode(array);

      if (exitOnNull) {
        // grab up to the first null
        var idx = decoded.indexOf('\0');
        return idx !== -1 ? decoded.substring(0, idx) : decoded;
      } // remove any null characters


      return decoded.replace(/\0/g, '');
    }

    var len = array.length;
    var c;
    var char2;
    var char3;
    var out = '';
    var i = 0;

    while (i < len) {
      c = array[i++];

      if (c === 0x00 && exitOnNull) {
        return out;
      } else if (c === 0x00 || c === 0x03) {
        // If the character is 3 (END_OF_TEXT) or 0 (NULL) then skip it
        continue;
      }

      switch (c >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          // 0xxxxxxx
          out += String.fromCharCode(c);
          break;

        case 12:
        case 13:
          // 110x xxxx   10xx xxxx
          char2 = array[i++];
          out += String.fromCharCode((c & 0x1F) << 6 | char2 & 0x3F);
          break;

        case 14:
          // 1110 xxxx  10xx xxxx  10xx xxxx
          char2 = array[i++];
          char3 = array[i++];
          out += String.fromCharCode((c & 0x0F) << 12 | (char2 & 0x3F) << 6 | (char3 & 0x3F) << 0);
          break;

        default:
      }
    }

    return out;
  };

  return ID3;
}();

var decoder;

function getTextDecoder() {
  var global = getSelfScope(); // safeguard for code that might run both on worker and main thread

  if (!decoder && typeof global.TextDecoder !== 'undefined') {
    decoder = new global.TextDecoder('utf-8');
  }

  return decoder;
}

var utf8ArrayToStr = ID3._utf8ArrayToStr;
/* harmony default export */ var id3 = (ID3);

// CONCATENATED MODULE: ./src/utils/texttrack-utils.ts
function sendAddTrackEvent(track, videoEl) {
  var event;

  try {
    event = new Event('addtrack');
  } catch (err) {
    // for IE11
    event = document.createEvent('Event');
    event.initEvent('addtrack', false, false);
  }

  event.track = track;
  videoEl.dispatchEvent(event);
}
function clearCurrentCues(track) {
  if (track && track.cues) {
    while (track.cues.length > 0) {
      track.removeCue(track.cues[0]);
    }
  }
}
/**

 *  Given a list of Cues, finds the closest cue matching the given time.
 *  Modified verison of binary search O(log(n)).
 *
 * @export
 * @param {(TextTrackCueList | TextTrackCue[])} cues - List of cues.
 * @param {number} time - Target time, to find closest cue to.
 * @returns {TextTrackCue}
 */

function getClosestCue(cues, time) {
  // If the offset is less than the first element, the first element is the closest.
  if (time < cues[0].endTime) {
    return cues[0];
  } // If the offset is greater than the last cue, the last is the closest.


  if (time > cues[cues.length - 1].endTime) {
    return cues[cues.length - 1];
  }

  var left = 0;
  var right = cues.length - 1;

  while (left <= right) {
    var mid = Math.floor((right + left) / 2);

    if (time < cues[mid].endTime) {
      right = mid - 1;
    } else if (time > cues[mid].endTime) {
      left = mid + 1;
    } else {
      // If it's not lower or higher, it must be equal.
      return cues[mid];
    }
  } // At this point, left and right have swapped.
  // No direct match was found, left or right element must be the closest. Check which one has the smallest diff.


  return cues[left].endTime - time < time - cues[right].endTime ? cues[left] : cues[right];
}
// CONCATENATED MODULE: ./src/controller/id3-track-controller.js
function id3_track_controller_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*
 * id3 metadata track controller
*/






var id3_track_controller_ID3TrackController =
/*#__PURE__*/
function (_EventHandler) {
  id3_track_controller_inheritsLoose(ID3TrackController, _EventHandler);

  function ID3TrackController(hls) {
    var _this;

    _this = _EventHandler.call(this, hls, events.MEDIA_ATTACHED, events.MEDIA_DETACHING, events.FRAG_PARSING_METADATA, events.LIVE_BACK_BUFFER_REACHED) || this;
    _this.id3Track = undefined;
    _this.media = undefined;
    return _this;
  }

  var _proto = ID3TrackController.prototype;

  _proto.destroy = function destroy() {
    event_handler.prototype.destroy.call(this);
  } // Add ID3 metatadata text track.
  ;

  _proto.onMediaAttached = function onMediaAttached(data) {
    this.media = data.media;

    if (!this.media) {}
  };

  _proto.onMediaDetaching = function onMediaDetaching() {
    clearCurrentCues(this.id3Track);
    this.id3Track = undefined;
    this.media = undefined;
  };

  _proto.getID3Track = function getID3Track(textTracks) {
    for (var i = 0; i < textTracks.length; i++) {
      var textTrack = textTracks[i];

      if (textTrack.kind === 'metadata' && textTrack.label === 'id3') {
        // send 'addtrack' when reusing the textTrack for metadata,
        // same as what we do for captions
        sendAddTrackEvent(textTrack, this.media);
        return textTrack;
      }
    }

    return this.media.addTextTrack('metadata', 'id3');
  };

  _proto.onLiveBackBufferReached = function onLiveBackBufferReached(_ref) {
    var bufferEnd = _ref.bufferEnd;

    if (!this.id3Track || !this.id3Track.cues || !this.id3Track.cues.length) {
      return;
    }

    var foundCue = getClosestCue(this.id3Track.cues, bufferEnd);

    if (!foundCue) {
      return;
    }

    var removeCues = true;

    while (removeCues) {
      var cue = this.id3Track.cues[0];

      if (!this.id3Track.cues.length || cue.id === foundCue.id) {
        removeCues = false;
        return;
      }

      this.id3Track.removeCue(cue);
    }
  };

  _proto.onFragParsingMetadata = function onFragParsingMetadata(data) {
    var fragment = data.frag;
    var samples = data.samples; // create track dynamically

    if (!this.id3Track) {
      this.id3Track = this.getID3Track(this.media.textTracks);
      this.id3Track.mode = 'hidden';
    } // Attempt to recreate Safari functionality by creating
    // WebKitDataCue objects when available and store the decoded
    // ID3 data in the value property of the cue


    var Cue = window.WebKitDataCue || window.VTTCue || window.TextTrackCue;

    for (var i = 0; i < samples.length; i++) {
      var frames = id3.getID3Frames(samples[i].data);

      if (frames) {
        var startTime = samples[i].pts;
        var endTime = i < samples.length - 1 ? samples[i + 1].pts : fragment.endPTS;

        if (startTime === endTime) {
          // Give a slight bump to the endTime if it's equal to startTime to avoid a SyntaxError in IE
          endTime += 0.0001;
        } else if (startTime > endTime) {
          logger.warn('detected an id3 sample with endTime < startTime, adjusting endTime to (startTime + 0.25)');
          endTime = startTime + 0.25;
        }

        for (var j = 0; j < frames.length; j++) {
          var frame = frames[j]; // Safari doesn't put the timestamp frame in the TextTrack

          if (!id3.isTimeStampFrame(frame)) {
            var cue = new Cue(startTime, endTime, '');
            cue.value = frame;
            this.id3Track.addCue(cue);
          }
        }
      }
    }
  };

  _proto.onLiveBackBufferReached = function onLiveBackBufferReached(_ref2) {
    var bufferEnd = _ref2.bufferEnd;
    var id3Track = this.id3Track;

    if (!id3Track || !id3Track.cues || !id3Track.cues.length) {
      return;
    }

    var foundCue = getClosestCue(id3Track.cues, bufferEnd);

    if (!foundCue) {
      return;
    }

    while (id3Track.cues[0] !== foundCue) {
      id3Track.removeCue(id3Track.cues[0]);
    }
  };

  return ID3TrackController;
}(event_handler);

/* harmony default export */ var id3_track_controller = (id3_track_controller_ID3TrackController);
// CONCATENATED MODULE: ./src/utils/mediasource-helper.ts
/**
 * MediaSource helper
 */
function getMediaSource() {
  return window.MediaSource || window.WebKitMediaSource;
}
// CONCATENATED MODULE: ./src/is-supported.ts

function is_supported_isSupported() {
  var mediaSource = getMediaSource();

  if (!mediaSource) {
    return false;
  }

  var sourceBuffer = self.SourceBuffer || self.WebKitSourceBuffer;
  var isTypeSupported = mediaSource && typeof mediaSource.isTypeSupported === 'function' && mediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'); // if SourceBuffer is exposed ensure its API is valid
  // safari and old version of Chrome doe not expose SourceBuffer globally so checking SourceBuffer.prototype is impossible

  var sourceBufferValidAPI = !sourceBuffer || sourceBuffer.prototype && typeof sourceBuffer.prototype.appendBuffer === 'function' && typeof sourceBuffer.prototype.remove === 'function';
  return !!isTypeSupported && !!sourceBufferValidAPI;
}
// CONCATENATED MODULE: ./src/utils/buffer-helper.ts
/**
 * @module BufferHelper
 *
 * Providing methods dealing with buffer length retrieval for example.
 *
 * In general, a helper around HTML5 MediaElement TimeRanges gathered from `buffered` property.
 *
 * Also @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/buffered
*/
var BufferHelper =
/*#__PURE__*/
function () {
  function BufferHelper() {}

  /**
   * Return true if `media`'s buffered include `position`
   * @param {Bufferable} media
   * @param {number} position
   * @returns {boolean}
   */
  BufferHelper.isBuffered = function isBuffered(media, position) {
    try {
      if (media) {
        var buffered = media.buffered;

        for (var i = 0; i < buffered.length; i++) {
          if (position >= buffered.start(i) && position <= buffered.end(i)) {
            return true;
          }
        }
      }
    } catch (error) {// this is to catch
      // InvalidStateError: Failed to read the 'buffered' property from 'SourceBuffer':
      // This SourceBuffer has been removed from the parent media source
    }

    return false;
  };

  BufferHelper.bufferInfo = function bufferInfo(media, pos, maxHoleDuration) {
    try {
      if (media) {
        var vbuffered = media.buffered;
        var buffered = [];
        var i;

        for (i = 0; i < vbuffered.length; i++) {
          buffered.push({
            start: vbuffered.start(i),
            end: vbuffered.end(i)
          });
        }

        return this.bufferedInfo(buffered, pos, maxHoleDuration);
      }
    } catch (error) {// this is to catch
      // InvalidStateError: Failed to read the 'buffered' property from 'SourceBuffer':
      // This SourceBuffer has been removed from the parent media source
    }

    return {
      len: 0,
      start: pos,
      end: pos,
      nextStart: undefined
    };
  };

  BufferHelper.bufferedInfo = function bufferedInfo(buffered, pos, maxHoleDuration) {
    // sort on buffer.start/smaller end (IE does not always return sorted buffered range)
    buffered.sort(function (a, b) {
      var diff = a.start - b.start;

      if (diff) {
        return diff;
      } else {
        return b.end - a.end;
      }
    });
    var buffered2 = [];

    if (maxHoleDuration) {
      // there might be some small holes between buffer time range
      // consider that holes smaller than maxHoleDuration are irrelevant and build another
      // buffer time range representations that discards those holes
      for (var i = 0; i < buffered.length; i++) {
        var buf2len = buffered2.length;

        if (buf2len) {
          var buf2end = buffered2[buf2len - 1].end; // if small hole (value between 0 or maxHoleDuration ) or overlapping (negative)

          if (buffered[i].start - buf2end < maxHoleDuration) {
            // merge overlapping time ranges
            // update lastRange.end only if smaller than item.end
            // e.g.  [ 1, 15] with  [ 2,8] => [ 1,15] (no need to modify lastRange.end)
            // whereas [ 1, 8] with  [ 2,15] => [ 1,15] ( lastRange should switch from [1,8] to [1,15])
            if (buffered[i].end > buf2end) {
              buffered2[buf2len - 1].end = buffered[i].end;
            }
          } else {
            // big hole
            buffered2.push(buffered[i]);
          }
        } else {
          // first value
          buffered2.push(buffered[i]);
        }
      }
    } else {
      buffered2 = buffered;
    }

    var bufferLen = 0; // bufferStartNext can possibly be undefined based on the conditional logic below

    var bufferStartNext; // bufferStart and bufferEnd are buffer boundaries around current video position

    var bufferStart = pos;
    var bufferEnd = pos;

    for (var _i = 0; _i < buffered2.length; _i++) {
      var start = buffered2[_i].start,
          end = buffered2[_i].end; // logger.log('buf start/end:' + buffered.start(i) + '/' + buffered.end(i));

      if (pos + maxHoleDuration >= start && pos < end) {
        // play position is inside this buffer TimeRange, retrieve end of buffer position and buffer length
        bufferStart = start;
        bufferEnd = end;
        bufferLen = bufferEnd - pos;
      } else if (pos + maxHoleDuration < start) {
        bufferStartNext = start;
        break;
      }
    }

    return {
      len: bufferLen,
      start: bufferStart,
      end: bufferEnd,
      nextStart: bufferStartNext
    };
  };

  return BufferHelper;
}();
// CONCATENATED MODULE: ./src/utils/ewma.ts
/*
 * compute an Exponential Weighted moving average
 * - https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average
 *  - heavily inspired from shaka-player
 */
var EWMA =
/*#__PURE__*/
function () {
  //  About half of the estimated value will be from the last |halfLife| samples by weight.
  function EWMA(halfLife) {
    this.alpha_ = void 0;
    this.estimate_ = void 0;
    this.totalWeight_ = void 0;
    // Larger values of alpha expire historical data more slowly.
    this.alpha_ = halfLife ? Math.exp(Math.log(0.5) / halfLife) : 0;
    this.estimate_ = 0;
    this.totalWeight_ = 0;
  }

  var _proto = EWMA.prototype;

  _proto.sample = function sample(weight, value) {
    var adjAlpha = Math.pow(this.alpha_, weight);
    this.estimate_ = value * (1 - adjAlpha) + adjAlpha * this.estimate_;
    this.totalWeight_ += weight;
  };

  _proto.getTotalWeight = function getTotalWeight() {
    return this.totalWeight_;
  };

  _proto.getEstimate = function getEstimate() {
    if (this.alpha_) {
      var zeroFactor = 1 - Math.pow(this.alpha_, this.totalWeight_);
      return this.estimate_ / zeroFactor;
    } else {
      return this.estimate_;
    }
  };

  return EWMA;
}();

/* harmony default export */ var ewma = (EWMA);
// CONCATENATED MODULE: ./src/utils/ewma-bandwidth-estimator.ts
/*
 * EWMA Bandwidth Estimator
 *  - heavily inspired from shaka-player
 * Tracks bandwidth samples and estimates available bandwidth.
 * Based on the minimum of two exponentially-weighted moving averages with
 * different half-lives.
 */


var ewma_bandwidth_estimator_EwmaBandWidthEstimator =
/*#__PURE__*/
function () {
  // TODO(typescript-hls)
  function EwmaBandWidthEstimator(hls, slow, fast, defaultEstimate) {
    this.hls = void 0;
    this.defaultEstimate_ = void 0;
    this.minWeight_ = void 0;
    this.minDelayMs_ = void 0;
    this.slow_ = void 0;
    this.fast_ = void 0;
    this.hls = hls;
    this.defaultEstimate_ = defaultEstimate;
    this.minWeight_ = 0.001;
    this.minDelayMs_ = 50;
    this.slow_ = new ewma(slow);
    this.fast_ = new ewma(fast);
  }

  var _proto = EwmaBandWidthEstimator.prototype;

  _proto.sample = function sample(durationMs, numBytes) {
    durationMs = Math.max(durationMs, this.minDelayMs_);
    var numBits = 8 * numBytes,
        // weight is duration in seconds
    durationS = durationMs / 1000,
        // value is bandwidth in bits/s
    bandwidthInBps = numBits / durationS;
    this.fast_.sample(durationS, bandwidthInBps);
    this.slow_.sample(durationS, bandwidthInBps);
  };

  _proto.canEstimate = function canEstimate() {
    var fast = this.fast_;
    return fast && fast.getTotalWeight() >= this.minWeight_;
  };

  _proto.getEstimate = function getEstimate() {
    if (this.canEstimate()) {
      // console.log('slow estimate:'+ Math.round(this.slow_.getEstimate()));
      // console.log('fast estimate:'+ Math.round(this.fast_.getEstimate()));
      // Take the minimum of these two estimates.  This should have the effect of
      // adapting down quickly, but up more slowly.
      return Math.min(this.fast_.getEstimate(), this.slow_.getEstimate());
    } else {
      return this.defaultEstimate_;
    }
  };

  _proto.destroy = function destroy() {};

  return EwmaBandWidthEstimator;
}();

/* harmony default export */ var ewma_bandwidth_estimator = (ewma_bandwidth_estimator_EwmaBandWidthEstimator);
// CONCATENATED MODULE: ./src/controller/abr-controller.js



function abr_controller_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function abr_controller_createClass(Constructor, protoProps, staticProps) { if (protoProps) abr_controller_defineProperties(Constructor.prototype, protoProps); if (staticProps) abr_controller_defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function abr_controller_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*
 * simple ABR Controller
 *  - compute next level based on last fragment bw heuristics
 *  - implement an abandon rules triggered if we have less than 2 frag buffered and if computed bw shows that we risk buffer stalling
 */






var abr_controller_window = window,
    abr_controller_performance = abr_controller_window.performance;

var abr_controller_AbrController =
/*#__PURE__*/
function (_EventHandler) {
  abr_controller_inheritsLoose(AbrController, _EventHandler);

  function AbrController(hls) {
    var _this;

    _this = _EventHandler.call(this, hls, events.FRAG_LOADING, events.FRAG_LOADED, events.FRAG_BUFFERED, events.ERROR) || this;
    _this.lastLoadedFragLevel = 0;
    _this._nextAutoLevel = -1;
    _this.hls = hls;
    _this.timer = null;
    _this._bwEstimator = null;
    _this.onCheck = _this._abandonRulesCheck.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = AbrController.prototype;

  _proto.destroy = function destroy() {
    this.clearTimer();
    event_handler.prototype.destroy.call(this);
  };

  _proto.onFragLoading = function onFragLoading(data) {
    var frag = data.frag;

    if (frag.type === 'main') {
      if (!this.timer) {
        this.fragCurrent = frag;
        this.timer = setInterval(this.onCheck, 100);
      } // lazy init of BwEstimator, rationale is that we use different params for Live/VoD
      // so we need to wait for stream manifest / playlist type to instantiate it.


      if (!this._bwEstimator) {
        var hls = this.hls;
        var config = hls.config;
        var level = frag.level;
        var isLive = hls.levels[level].details.live;
        var ewmaFast;
        var ewmaSlow;

        if (isLive) {
          ewmaFast = config.abrEwmaFastLive;
          ewmaSlow = config.abrEwmaSlowLive;
        } else {
          ewmaFast = config.abrEwmaFastVoD;
          ewmaSlow = config.abrEwmaSlowVoD;
        }

        this._bwEstimator = new ewma_bandwidth_estimator(hls, ewmaSlow, ewmaFast, config.abrEwmaDefaultEstimate);
      }
    }
  };

  _proto._abandonRulesCheck = function _abandonRulesCheck() {
    /*
      monitor fragment retrieval time...
      we compute expected time of arrival of the complete fragment.
      we compare it to expected time of buffer starvation
    */
    var hls = this.hls;
    var video = hls.media;
    var frag = this.fragCurrent;

    if (!frag) {
      return;
    }

    var loader = frag.loader;
    var minAutoLevel = hls.minAutoLevel; // if loader has been destroyed or loading has been aborted, stop timer and return

    if (!loader || loader.stats && loader.stats.aborted) {
      logger.warn('frag loader destroy or aborted, disarm abandonRules');
      this.clearTimer(); // reset forced auto level value so that next level will be selected

      this._nextAutoLevel = -1;
      return;
    }

    var stats = loader.stats;
    /* only monitor frag retrieval time if
    (video not paused OR first fragment being loaded(ready state === HAVE_NOTHING = 0)) AND autoswitching enabled AND not lowest level (=> means that we have several levels) */

    if (video && stats && (!video.paused && video.playbackRate !== 0 || !video.readyState) && frag.autoLevel && frag.level) {
      var requestDelay = abr_controller_performance.now() - stats.trequest;
      var playbackRate = Math.abs(video.playbackRate); // monitor fragment load progress after half of expected fragment duration,to stabilize bitrate

      if (requestDelay > 500 * frag.duration / playbackRate) {
        var levels = hls.levels;
        var loadRate = Math.max(1, stats.bw ? stats.bw / 8 : stats.loaded * 1000 / requestDelay); // byte/s; at least 1 byte/s to avoid division by zero
        // compute expected fragment length using frag duration and level bitrate. also ensure that expected len is gte than already loaded size

        var level = levels[frag.level];
        var levelBitrate = level.realBitrate ? Math.max(level.realBitrate, level.bitrate) : level.bitrate;
        var expectedLen = stats.total ? stats.total : Math.max(stats.loaded, Math.round(frag.duration * levelBitrate / 8));
        var pos = video.currentTime;
        var fragLoadedDelay = (expectedLen - stats.loaded) / loadRate;
        var bufferStarvationDelay = (BufferHelper.bufferInfo(video, pos, hls.config.maxBufferHole).end - pos) / playbackRate; // consider emergency switch down only if we have less than 2 frag buffered AND
        // time to finish loading current fragment is bigger than buffer starvation delay
        // ie if we risk buffer starvation if bw does not increase quickly

        if (bufferStarvationDelay < 2 * frag.duration / playbackRate && fragLoadedDelay > bufferStarvationDelay) {
          var fragLevelNextLoadedDelay;
          var nextLoadLevel; // lets iterate through lower level and try to find the biggest one that could avoid rebuffering
          // we start from current level - 1 and we step down , until we find a matching level

          for (nextLoadLevel = frag.level - 1; nextLoadLevel > minAutoLevel; nextLoadLevel--) {
            // compute time to load next fragment at lower level
            // 0.8 : consider only 80% of current bw to be conservative
            // 8 = bits per byte (bps/Bps)
            var levelNextBitrate = levels[nextLoadLevel].realBitrate ? Math.max(levels[nextLoadLevel].realBitrate, levels[nextLoadLevel].bitrate) : levels[nextLoadLevel].bitrate;

            var _fragLevelNextLoadedDelay = frag.duration * levelNextBitrate / (8 * 0.8 * loadRate);

            if (_fragLevelNextLoadedDelay < bufferStarvationDelay) {
              // we found a lower level that be rebuffering free with current estimated bw !
              break;
            }
          } // only emergency switch down if it takes less time to load new fragment at lowest level instead
          // of finishing loading current one ...


          if (fragLevelNextLoadedDelay < fragLoadedDelay) {
            logger.warn("loading too slow, abort fragment loading and switch to level " + nextLoadLevel + ":fragLoadedDelay[" + nextLoadLevel + "]<fragLoadedDelay[" + (frag.level - 1) + "];bufferStarvationDelay:" + fragLevelNextLoadedDelay.toFixed(1) + "<" + fragLoadedDelay.toFixed(1) + ":" + bufferStarvationDelay.toFixed(1)); // force next load level in auto mode

            hls.nextLoadLevel = nextLoadLevel; // update bw estimate for this fragment before cancelling load (this will help reducing the bw)

            this._bwEstimator.sample(requestDelay, stats.loaded); // abort fragment loading


            loader.abort(); // stop abandon rules timer

            this.clearTimer();
            hls.trigger(events.FRAG_LOAD_EMERGENCY_ABORTED, {
              frag: frag,
              stats: stats
            });
          }
        }
      }
    }
  };

  _proto.onFragLoaded = function onFragLoaded(data) {
    var frag = data.frag;

    if (frag.type === 'main' && isFiniteNumber(frag.sn)) {
      // stop monitoring bw once frag loaded
      this.clearTimer(); // store level id after successful fragment load

      this.lastLoadedFragLevel = frag.level; // reset forced auto level value so that next level will be selected

      this._nextAutoLevel = -1; // compute level average bitrate

      if (this.hls.config.abrMaxWithRealBitrate) {
        var level = this.hls.levels[frag.level];
        var loadedBytes = (level.loaded ? level.loaded.bytes : 0) + data.stats.loaded;
        var loadedDuration = (level.loaded ? level.loaded.duration : 0) + data.frag.duration;
        level.loaded = {
          bytes: loadedBytes,
          duration: loadedDuration
        };
        level.realBitrate = Math.round(8 * loadedBytes / loadedDuration);
      } // if fragment has been loaded to perform a bitrate test,


      if (data.frag.bitrateTest) {
        var stats = data.stats;
        stats.tparsed = stats.tbuffered = stats.tload;
        this.onFragBuffered(data);
      }
    }
  };

  _proto.onFragBuffered = function onFragBuffered(data) {
    var stats = data.stats;
    var frag = data.frag; // only update stats on first frag buffering
    // if same frag is loaded multiple times, it might be in browser cache, and loaded quickly
    // and leading to wrong bw estimation
    // on bitrate test, also only update stats once (if tload = tbuffered == on FRAG_LOADED)

    if (stats.aborted !== true && frag.type === 'main' && isFiniteNumber(frag.sn) && (!frag.bitrateTest || stats.tload === stats.tbuffered)) {
      // use tparsed-trequest instead of tbuffered-trequest to compute fragLoadingProcessing; rationale is that  buffer appending only happens once media is attached
      // in case we use config.startFragPrefetch while media is not attached yet, fragment might be parsed while media not attached yet, but it will only be buffered on media attached
      // as a consequence it could happen really late in the process. meaning that appending duration might appears huge ... leading to underestimated throughput estimation
      var fragLoadingProcessingMs = stats.tparsed - stats.trequest;
      logger.log("latency/loading/parsing/append/kbps:" + Math.round(stats.tfirst - stats.trequest) + "/" + Math.round(stats.tload - stats.tfirst) + "/" + Math.round(stats.tparsed - stats.tload) + "/" + Math.round(stats.tbuffered - stats.tparsed) + "/" + Math.round(8 * stats.loaded / (stats.tbuffered - stats.trequest)));

      this._bwEstimator.sample(fragLoadingProcessingMs, stats.loaded);

      stats.bwEstimate = this._bwEstimator.getEstimate(); // if fragment has been loaded to perform a bitrate test, (hls.startLevel = -1), store bitrate test delay duration

      if (frag.bitrateTest) {
        this.bitrateTestDelay = fragLoadingProcessingMs / 1000;
      } else {
        this.bitrateTestDelay = 0;
      }
    }
  };

  _proto.onError = function onError(data) {
    // stop timer in case of frag loading error
    switch (data.details) {
      case ErrorDetails.FRAG_LOAD_ERROR:
      case ErrorDetails.FRAG_LOAD_TIMEOUT:
        this.clearTimer();
        break;

      default:
        break;
    }
  };

  _proto.clearTimer = function clearTimer() {
    clearInterval(this.timer);
    this.timer = null;
  } // return next auto level
  ;

  _proto._findBestLevel = function _findBestLevel(currentLevel, currentFragDuration, currentBw, minAutoLevel, maxAutoLevel, maxFetchDuration, bwFactor, bwUpFactor, levels) {
    for (var i = maxAutoLevel; i >= minAutoLevel; i--) {
      var levelInfo = levels[i];

      if (!levelInfo) {
        continue;
      }

      var levelDetails = levelInfo.details;
      var avgDuration = levelDetails ? levelDetails.totalduration / levelDetails.fragments.length : currentFragDuration;
      var live = levelDetails ? levelDetails.live : false;
      var adjustedbw = void 0; // follow algorithm captured from stagefright :
      // https://android.googlesource.com/platform/frameworks/av/+/master/media/libstagefright/httplive/LiveSession.cpp
      // Pick the highest bandwidth stream below or equal to estimated bandwidth.
      // consider only 80% of the available bandwidth, but if we are switching up,
      // be even more conservative (70%) to avoid overestimating and immediately
      // switching back.

      if (i <= currentLevel) {
        adjustedbw = bwFactor * currentBw;
      } else {
        adjustedbw = bwUpFactor * currentBw;
      }

      var bitrate = levels[i].realBitrate ? Math.max(levels[i].realBitrate, levels[i].bitrate) : levels[i].bitrate;
      var fetchDuration = bitrate * avgDuration / adjustedbw;
      logger.trace("level/adjustedbw/bitrate/avgDuration/maxFetchDuration/fetchDuration: " + i + "/" + Math.round(adjustedbw) + "/" + bitrate + "/" + avgDuration + "/" + maxFetchDuration + "/" + fetchDuration); // if adjusted bw is greater than level bitrate AND

      if (adjustedbw > bitrate && ( // fragment fetchDuration unknown OR live stream OR fragment fetchDuration less than max allowed fetch duration, then this level matches
      // we don't account for max Fetch Duration for live streams, this is to avoid switching down when near the edge of live sliding window ...
      // special case to support startLevel = -1 (bitrateTest) on live streams : in that case we should not exit loop so that _findBestLevel will return -1
      !fetchDuration || live && !this.bitrateTestDelay || fetchDuration < maxFetchDuration)) {
        // as we are looping from highest to lowest, this will return the best achievable quality level
        return i;
      }
    } // not enough time budget even with quality level 0 ... rebuffering might happen


    return -1;
  };

  abr_controller_createClass(AbrController, [{
    key: "nextAutoLevel",
    get: function get() {
      var forcedAutoLevel = this._nextAutoLevel;
      var bwEstimator = this._bwEstimator; // in case next auto level has been forced, and bw not available or not reliable, return forced value

      if (forcedAutoLevel !== -1 && (!bwEstimator || !bwEstimator.canEstimate())) {
        return forcedAutoLevel;
      } // compute next level using ABR logic


      var nextABRAutoLevel = this._nextABRAutoLevel; // if forced auto level has been defined, use it to cap ABR computed quality level

      if (forcedAutoLevel !== -1) {
        nextABRAutoLevel = Math.min(forcedAutoLevel, nextABRAutoLevel);
      }

      return nextABRAutoLevel;
    },
    set: function set(nextLevel) {
      this._nextAutoLevel = nextLevel;
    }
  }, {
    key: "_nextABRAutoLevel",
    get: function get() {
      var hls = this.hls;
      var maxAutoLevel = hls.maxAutoLevel,
          levels = hls.levels,
          config = hls.config,
          minAutoLevel = hls.minAutoLevel;
      var video = hls.media;
      var currentLevel = this.lastLoadedFragLevel;
      var currentFragDuration = this.fragCurrent ? this.fragCurrent.duration : 0;
      var pos = video ? video.currentTime : 0; // playbackRate is the absolute value of the playback rate; if video.playbackRate is 0, we use 1 to load as
      // if we're playing back at the normal rate.

      var playbackRate = video && video.playbackRate !== 0 ? Math.abs(video.playbackRate) : 1.0;
      var avgbw = this._bwEstimator ? this._bwEstimator.getEstimate() : config.abrEwmaDefaultEstimate; // bufferStarvationDelay is the wall-clock time left until the playback buffer is exhausted.

      var bufferStarvationDelay = (BufferHelper.bufferInfo(video, pos, config.maxBufferHole).end - pos) / playbackRate; // First, look to see if we can find a level matching with our avg bandwidth AND that could also guarantee no rebuffering at all

      var bestLevel = this._findBestLevel(currentLevel, currentFragDuration, avgbw, minAutoLevel, maxAutoLevel, bufferStarvationDelay, config.abrBandWidthFactor, config.abrBandWidthUpFactor, levels);

      if (bestLevel >= 0) {
        return bestLevel;
      } else {
        logger.trace('rebuffering expected to happen, lets try to find a quality level minimizing the rebuffering'); // not possible to get rid of rebuffering ... let's try to find level that will guarantee less than maxStarvationDelay of rebuffering
        // if no matching level found, logic will return 0

        var maxStarvationDelay = currentFragDuration ? Math.min(currentFragDuration, config.maxStarvationDelay) : config.maxStarvationDelay;
        var bwFactor = config.abrBandWidthFactor;
        var bwUpFactor = config.abrBandWidthUpFactor;

        if (bufferStarvationDelay === 0) {
          // in case buffer is empty, let's check if previous fragment was loaded to perform a bitrate test
          var bitrateTestDelay = this.bitrateTestDelay;

          if (bitrateTestDelay) {
            // if it is the case, then we need to adjust our max starvation delay using maxLoadingDelay config value
            // max video loading delay used in  automatic start level selection :
            // in that mode ABR controller will ensure that video loading time (ie the time to fetch the first fragment at lowest quality level +
            // the time to fetch the fragment at the appropriate quality level is less than ```maxLoadingDelay``` )
            // cap maxLoadingDelay and ensure it is not bigger 'than bitrate test' frag duration
            var maxLoadingDelay = currentFragDuration ? Math.min(currentFragDuration, config.maxLoadingDelay) : config.maxLoadingDelay;
            maxStarvationDelay = maxLoadingDelay - bitrateTestDelay;
            logger.trace("bitrate test took " + Math.round(1000 * bitrateTestDelay) + "ms, set first fragment max fetchDuration to " + Math.round(1000 * maxStarvationDelay) + " ms"); // don't use conservative factor on bitrate test

            bwFactor = bwUpFactor = 1;
          }
        }

        bestLevel = this._findBestLevel(currentLevel, currentFragDuration, avgbw, minAutoLevel, maxAutoLevel, bufferStarvationDelay + maxStarvationDelay, bwFactor, bwUpFactor, levels);
        return Math.max(bestLevel, 0);
      }
    }
  }]);

  return AbrController;
}(event_handler);

/* harmony default export */ var abr_controller = (abr_controller_AbrController);
// CONCATENATED MODULE: ./src/controller/buffer-controller.ts


function buffer_controller_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*
 * Buffer Controller
 */





var buffer_controller_MediaSource = getMediaSource();

var buffer_controller_BufferController =
/*#__PURE__*/
function (_EventHandler) {
  buffer_controller_inheritsLoose(BufferController, _EventHandler);

  // the value that we have set mediasource.duration to
  // (the actual duration may be tweaked slighly by the browser)
  // the value that we want to set mediaSource.duration to
  // the target duration of the current media playlist
  // current stream state: true - for live broadcast, false - for VoD content
  // cache the self generated object url to detect hijack of video tag
  // signals that the sourceBuffers need to be flushed
  // signals that mediaSource should have endOfStream called
  // this is optional because this property is removed from the class sometimes
  // The number of BUFFER_CODEC events received before any sourceBuffers are created
  // The total number of BUFFER_CODEC events received
  // A reference to the attached media element
  // A reference to the active media source
  // List of pending segments to be appended to source buffer
  // A guard to see if we are currently appending to the source buffer
  // counters
  function BufferController(hls) {
    var _this;

    _this = _EventHandler.call(this, hls, events.MEDIA_ATTACHING, events.MEDIA_DETACHING, events.MANIFEST_PARSED, events.BUFFER_RESET, events.BUFFER_APPENDING, events.BUFFER_CODECS, events.BUFFER_EOS, events.BUFFER_FLUSHING, events.LEVEL_PTS_UPDATED, events.LEVEL_UPDATED) || this;
    _this._msDuration = null;
    _this._levelDuration = null;
    _this._levelTargetDuration = 10;
    _this._live = null;
    _this._objectUrl = null;
    _this._needsFlush = false;
    _this._needsEos = false;
    _this.config = void 0;
    _this.audioTimestampOffset = void 0;
    _this.bufferCodecEventsExpected = 0;
    _this._bufferCodecEventsTotal = 0;
    _this.media = null;
    _this.mediaSource = null;
    _this.segments = [];
    _this.parent = void 0;
    _this.appending = false;
    _this.appended = 0;
    _this.appendError = 0;
    _this.flushBufferCounter = 0;
    _this.tracks = {};
    _this.pendingTracks = {};
    _this.sourceBuffer = {};
    _this.flushRange = [];

    _this._onMediaSourceOpen = function () {
      logger.log('media source opened');

      _this.hls.trigger(events.MEDIA_ATTACHED, {
        media: _this.media
      });

      var mediaSource = _this.mediaSource;

      if (mediaSource) {
        // once received, don't listen anymore to sourceopen event
        mediaSource.removeEventListener('sourceopen', _this._onMediaSourceOpen);
      }

      _this.checkPendingTracks();
    };

    _this._onMediaSourceClose = function () {
      logger.log('media source closed');
    };

    _this._onMediaSourceEnded = function () {
      logger.log('media source ended');
    };

    _this._onSBUpdateEnd = function () {
      // update timestampOffset
      if (_this.audioTimestampOffset && _this.sourceBuffer.audio) {
        var audioBuffer = _this.sourceBuffer.audio;
        logger.warn("change mpeg audio timestamp offset from " + audioBuffer.timestampOffset + " to " + _this.audioTimestampOffset);
        audioBuffer.timestampOffset = _this.audioTimestampOffset;
        delete _this.audioTimestampOffset;
      }

      if (_this._needsFlush) {
        _this.doFlush();
      }

      if (_this._needsEos) {
        _this.checkEos();
      }

      _this.appending = false;
      var parent = _this.parent; // count nb of pending segments waiting for appending on this sourcebuffer

      var pending = _this.segments.reduce(function (counter, segment) {
        return segment.parent === parent ? counter + 1 : counter;
      }, 0); // this.sourceBuffer is better to use than media.buffered as it is closer to the PTS data from the fragments


      var timeRanges = {};
      var sbSet = _this.sourceBuffer;

      for (var streamType in sbSet) {
        var sb = sbSet[streamType];

        if (!sb) {
          throw Error("handling source buffer update end error: source buffer for " + streamType + " uninitilized and unable to update buffered TimeRanges.");
        }

        timeRanges[streamType] = sb.buffered;
      }

      _this.hls.trigger(events.BUFFER_APPENDED, {
        parent: parent,
        pending: pending,
        timeRanges: timeRanges
      }); // don't append in flushing mode


      if (!_this._needsFlush) {
        _this.doAppending();
      }

      _this.updateMediaElementDuration(); // appending goes first


      if (pending === 0) {
        _this.flushLiveBackBuffer();
      }
    };

    _this._onSBUpdateError = function (event) {
      logger.error('sourceBuffer error:', event); // according to http://www.w3.org/TR/media-source/#sourcebuffer-append-error
      // this error might not always be fatal (it is fatal if decode error is set, in that case
      // it will be followed by a mediaElement error ...)

      _this.hls.trigger(events.ERROR, {
        type: ErrorTypes.MEDIA_ERROR,
        details: ErrorDetails.BUFFER_APPENDING_ERROR,
        fatal: false
      }); // we don't need to do more than that, as accordin to the spec, updateend will be fired just after

    };

    _this.config = hls.config;
    return _this;
  }

  var _proto = BufferController.prototype;

  _proto.destroy = function destroy() {
    event_handler.prototype.destroy.call(this);
  };

  _proto.onLevelPtsUpdated = function onLevelPtsUpdated(data) {
    var type = data.type;
    var audioTrack = this.tracks.audio; // Adjusting `SourceBuffer.timestampOffset` (desired point in the timeline where the next frames should be appended)
    // in Chrome browser when we detect MPEG audio container and time delta between level PTS and `SourceBuffer.timestampOffset`
    // is greater than 100ms (this is enough to handle seek for VOD or level change for LIVE videos). At the time of change we issue
    // `SourceBuffer.abort()` and adjusting `SourceBuffer.timestampOffset` if `SourceBuffer.updating` is false or awaiting `updateend`
    // event if SB is in updating state.
    // More info here: https://github.com/video-dev/hls.js/issues/332#issuecomment-257986486

    if (type === 'audio' && audioTrack && audioTrack.container === 'audio/mpeg') {
      // Chrome audio mp3 track
      var audioBuffer = this.sourceBuffer.audio;

      if (!audioBuffer) {
        throw Error('Level PTS Updated and source buffer for audio uninitalized');
      }

      var delta = Math.abs(audioBuffer.timestampOffset - data.start); // adjust timestamp offset if time delta is greater than 100ms

      if (delta > 0.1) {
        var updating = audioBuffer.updating;

        try {
          audioBuffer.abort();
        } catch (err) {
          logger.warn('can not abort audio buffer: ' + err);
        }

        if (!updating) {
          logger.warn('change mpeg audio timestamp offset from ' + audioBuffer.timestampOffset + ' to ' + data.start);
          audioBuffer.timestampOffset = data.start;
        } else {
          this.audioTimestampOffset = data.start;
        }
      }
    }
  };

  _proto.onManifestParsed = function onManifestParsed(data) {
    // in case of alt audio 2 BUFFER_CODECS events will be triggered, one per stream controller
    // sourcebuffers will be created all at once when the expected nb of tracks will be reached
    // in case alt audio is not used, only one BUFFER_CODEC event will be fired from main stream controller
    // it will contain the expected nb of source buffers, no need to compute it
    this.bufferCodecEventsExpected = this._bufferCodecEventsTotal = data.altAudio ? 2 : 1;
    logger.log(this.bufferCodecEventsExpected + " bufferCodec event(s) expected");
  };

  _proto.onMediaAttaching = function onMediaAttaching(data) {
    var media = this.media = data.media;

    if (media && buffer_controller_MediaSource) {
      // setup the media source
      var ms = this.mediaSource = new buffer_controller_MediaSource(); // Media Source listeners

      ms.addEventListener('sourceopen', this._onMediaSourceOpen);
      ms.addEventListener('sourceended', this._onMediaSourceEnded);
      ms.addEventListener('sourceclose', this._onMediaSourceClose); // link video and media Source

      media.src = window.URL.createObjectURL(ms); // cache the locally generated object url

      this._objectUrl = media.src;
    }
  };

  _proto.onMediaDetaching = function onMediaDetaching() {
    logger.log('media source detaching');
    var ms = this.mediaSource;

    if (ms) {
      if (ms.readyState === 'open') {
        try {
          // endOfStream could trigger exception if any sourcebuffer is in updating state
          // we don't really care about checking sourcebuffer state here,
          // as we are anyway detaching the MediaSource
          // let's just avoid this exception to propagate
          ms.endOfStream();
        } catch (err) {
          logger.warn("onMediaDetaching:" + err.message + " while calling endOfStream");
        }
      }

      ms.removeEventListener('sourceopen', this._onMediaSourceOpen);
      ms.removeEventListener('sourceended', this._onMediaSourceEnded);
      ms.removeEventListener('sourceclose', this._onMediaSourceClose); // Detach properly the MediaSource from the HTMLMediaElement as
      // suggested in https://github.com/w3c/media-source/issues/53.

      if (this.media) {
        if (this._objectUrl) {
          window.URL.revokeObjectURL(this._objectUrl);
        } // clean up video tag src only if it's our own url. some external libraries might
        // hijack the video tag and change its 'src' without destroying the Hls instance first


        if (this.media.src === this._objectUrl) {
          this.media.removeAttribute('src');
          this.media.load();
        } else {
          logger.warn('media.src was changed by a third party - skip cleanup');
        }
      }

      this.mediaSource = null;
      this.media = null;
      this._objectUrl = null;
      this.bufferCodecEventsExpected = this._bufferCodecEventsTotal;
      this.pendingTracks = {};
      this.tracks = {};
      this.sourceBuffer = {};
      this.flushRange = [];
      this.segments = [];
      this.appended = 0;
    }

    this.hls.trigger(events.MEDIA_DETACHED);
  };

  _proto.checkPendingTracks = function checkPendingTracks() {
    var bufferCodecEventsExpected = this.bufferCodecEventsExpected,
        pendingTracks = this.pendingTracks; // Check if we've received all of the expected bufferCodec events. When none remain, create all the sourceBuffers at once.
    // This is important because the MSE spec allows implementations to throw QuotaExceededErrors if creating new sourceBuffers after
    // data has been appended to existing ones.
    // 2 tracks is the max (one for audio, one for video). If we've reach this max go ahead and create the buffers.

    var pendingTracksCount = Object.keys(pendingTracks).length;

    if (pendingTracksCount && !bufferCodecEventsExpected || pendingTracksCount === 2) {
      // ok, let's create them now !
      this.createSourceBuffers(pendingTracks);
      this.pendingTracks = {}; // append any pending segments now !

      this.doAppending();
    }
  };

  _proto.onBufferReset = function onBufferReset() {
    var sourceBuffer = this.sourceBuffer;

    for (var type in sourceBuffer) {
      var sb = sourceBuffer[type];

      try {
        if (sb) {
          if (this.mediaSource) {
            this.mediaSource.removeSourceBuffer(sb);
          }

          sb.removeEventListener('updateend', this._onSBUpdateEnd);
          sb.removeEventListener('error', this._onSBUpdateError);
        }
      } catch (err) {}
    }

    this.sourceBuffer = {};
    this.flushRange = [];
    this.segments = [];
    this.appended = 0;
  };

  _proto.onBufferCodecs = function onBufferCodecs(tracks) {
    var _this2 = this;

    // if source buffer(s) not created yet, appended buffer tracks in this.pendingTracks
    // if sourcebuffers already created, do nothing ...
    if (Object.keys(this.sourceBuffer).length) {
      return;
    }

    Object.keys(tracks).forEach(function (trackName) {
      _this2.pendingTracks[trackName] = tracks[trackName];
    });
    this.bufferCodecEventsExpected = Math.max(this.bufferCodecEventsExpected - 1, 0);

    if (this.mediaSource && this.mediaSource.readyState === 'open') {
      this.checkPendingTracks();
    }
  };

  _proto.createSourceBuffers = function createSourceBuffers(tracks) {
    var sourceBuffer = this.sourceBuffer,
        mediaSource = this.mediaSource;

    if (!mediaSource) {
      throw Error('createSourceBuffers called when mediaSource was null');
    }

    for (var trackName in tracks) {
      if (!sourceBuffer[trackName]) {
        var track = tracks[trackName];

        if (!track) {
          throw Error("source buffer exists for track " + trackName + ", however track does not");
        } // use levelCodec as first priority


        var codec = track.levelCodec || track.codec;
        var mimeType = track.container + ";codecs=" + codec;
        logger.log("creating sourceBuffer(" + mimeType + ")");

        try {
          var sb = sourceBuffer[trackName] = mediaSource.addSourceBuffer(mimeType);
          sb.addEventListener('updateend', this._onSBUpdateEnd);
          sb.addEventListener('error', this._onSBUpdateError);
          this.tracks[trackName] = {
            buffer: sb,
            codec: codec,
            id: track.id,
            container: track.container,
            levelCodec: track.levelCodec
          };
        } catch (err) {
          logger.error("error while trying to add sourceBuffer:" + err.message);
          this.hls.trigger(events.ERROR, {
            type: ErrorTypes.MEDIA_ERROR,
            details: ErrorDetails.BUFFER_ADD_CODEC_ERROR,
            fatal: false,
            err: err,
            mimeType: mimeType
          });
        }
      }
    }

    this.hls.trigger(events.BUFFER_CREATED, {
      tracks: this.tracks
    });
  };

  _proto.onBufferAppending = function onBufferAppending(data) {
    if (!this._needsFlush) {
      if (!this.segments) {
        this.segments = [data];
      } else {
        this.segments.push(data);
      }

      this.doAppending();
    }
  } // on BUFFER_EOS mark matching sourcebuffer(s) as ended and trigger checkEos()
  // an undefined data.type will mark all buffers as EOS.
  ;

  _proto.onBufferEos = function onBufferEos(data) {
    for (var type in this.sourceBuffer) {
      if (!data.type || data.type === type) {
        var sb = this.sourceBuffer[type];

        if (sb && !sb.ended) {
          sb.ended = true;
          logger.log(type + " sourceBuffer now EOS");
        }
      }
    }

    this.checkEos();
  } // if all source buffers are marked as ended, signal endOfStream() to MediaSource.
  ;

  _proto.checkEos = function checkEos() {
    var sourceBuffer = this.sourceBuffer,
        mediaSource = this.mediaSource;

    if (!mediaSource || mediaSource.readyState !== 'open') {
      this._needsEos = false;
      return;
    }

    for (var type in sourceBuffer) {
      var sb = sourceBuffer[type];
      if (!sb) continue;

      if (!sb.ended) {
        return;
      }

      if (sb.updating) {
        this._needsEos = true;
        return;
      }
    }

    logger.log('all media data are available, signal endOfStream() to MediaSource and stop loading fragment'); // Notify the media element that it now has all of the media data

    try {
      mediaSource.endOfStream();
    } catch (e) {
      logger.warn('exception while calling mediaSource.endOfStream()');
    }

    this._needsEos = false;
  };

  _proto.onBufferFlushing = function onBufferFlushing(data) {
    if (data.type) {
      this.flushRange.push({
        start: data.startOffset,
        end: data.endOffset,
        type: data.type
      });
    } else {
      this.flushRange.push({
        start: data.startOffset,
        end: data.endOffset,
        type: 'video'
      });
      this.flushRange.push({
        start: data.startOffset,
        end: data.endOffset,
        type: 'audio'
      });
    } // attempt flush immediately


    this.flushBufferCounter = 0;
    this.doFlush();
  };

  _proto.flushLiveBackBuffer = function flushLiveBackBuffer() {
    // clear back buffer for live only
    if (!this._live) {
      return;
    }

    var liveBackBufferLength = this.config.liveBackBufferLength;

    if (!isFinite(liveBackBufferLength) || liveBackBufferLength < 0) {
      return;
    }

    if (!this.media) {
      logger.error('flushLiveBackBuffer called without attaching media');
      return;
    }

    var currentTime = this.media.currentTime;
    var sourceBuffer = this.sourceBuffer;
    var bufferTypes = Object.keys(sourceBuffer);
    var targetBackBufferPosition = currentTime - Math.max(liveBackBufferLength, this._levelTargetDuration);

    for (var index = bufferTypes.length - 1; index >= 0; index--) {
      var bufferType = bufferTypes[index];
      var sb = sourceBuffer[bufferType];

      if (sb) {
        var buffered = sb.buffered; // when target buffer start exceeds actual buffer start

        if (buffered.length > 0 && targetBackBufferPosition > buffered.start(0)) {
          // remove buffer up until current time minus minimum back buffer length (removing buffer too close to current
          // time will lead to playback freezing)
          // credits for level target duration - https://github.com/videojs/http-streaming/blob/3132933b6aa99ddefab29c10447624efd6fd6e52/src/segment-loader.js#L91
          if (this.removeBufferRange(bufferType, sb, 0, targetBackBufferPosition)) {
            this.hls.trigger(events.LIVE_BACK_BUFFER_REACHED, {
              bufferEnd: targetBackBufferPosition
            });
          }
        }
      }
    }
  };

  _proto.onLevelUpdated = function onLevelUpdated(_ref) {
    var details = _ref.details;

    if (details.fragments.length > 0) {
      this._levelDuration = details.totalduration + details.fragments[0].start;
      this._levelTargetDuration = details.averagetargetduration || details.targetduration || 10;
      this._live = details.live;
      this.updateMediaElementDuration();
    }
  }
  /**
   * Update Media Source duration to current level duration or override to Infinity if configuration parameter
   * 'liveDurationInfinity` is set to `true`
   * More details: https://github.com/video-dev/hls.js/issues/355
   */
  ;

  _proto.updateMediaElementDuration = function updateMediaElementDuration() {
    var config = this.config;
    var duration;

    if (this._levelDuration === null || !this.media || !this.mediaSource || !this.sourceBuffer || this.media.readyState === 0 || this.mediaSource.readyState !== 'open') {
      return;
    }

    for (var type in this.sourceBuffer) {
      var sb = this.sourceBuffer[type];

      if (sb && sb.updating === true) {
        // can't set duration whilst a buffer is updating
        return;
      }
    }

    duration = this.media.duration; // initialise to the value that the media source is reporting

    if (this._msDuration === null) {
      this._msDuration = this.mediaSource.duration;
    }

    if (this._live === true && config.liveDurationInfinity === true) {
      // Override duration to Infinity
      logger.log('Media Source duration is set to Infinity');
      this._msDuration = this.mediaSource.duration = Infinity;
    } else if (this._levelDuration > this._msDuration && this._levelDuration > duration || !isFiniteNumber(duration)) {
      // levelDuration was the last value we set.
      // not using mediaSource.duration as the browser may tweak this value
      // only update Media Source duration if its value increase, this is to avoid
      // flushing already buffered portion when switching between quality level
      logger.log("Updating Media Source duration to " + this._levelDuration.toFixed(3));
      this._msDuration = this.mediaSource.duration = this._levelDuration;
    }
  };

  _proto.doFlush = function doFlush() {
    // loop through all buffer ranges to flush
    while (this.flushRange.length) {
      var range = this.flushRange[0]; // flushBuffer will abort any buffer append in progress and flush Audio/Video Buffer

      if (this.flushBuffer(range.start, range.end, range.type)) {
        // range flushed, remove from flush array
        this.flushRange.shift();
        this.flushBufferCounter = 0;
      } else {
        this._needsFlush = true; // avoid looping, wait for SB update end to retrigger a flush

        return;
      }
    }

    if (this.flushRange.length === 0) {
      // everything flushed
      this._needsFlush = false; // let's recompute this.appended, which is used to avoid flush looping

      var appended = 0;
      var sourceBuffer = this.sourceBuffer;

      try {
        for (var type in sourceBuffer) {
          var sb = sourceBuffer[type];

          if (sb) {
            appended += sb.buffered.length;
          }
        }
      } catch (error) {
        // error could be thrown while accessing buffered, in case sourcebuffer has already been removed from MediaSource
        // this is harmess at this stage, catch this to avoid reporting an internal exception
        logger.error('error while accessing sourceBuffer.buffered');
      }

      this.appended = appended;
      this.hls.trigger(events.BUFFER_FLUSHED);
    }
  };

  _proto.doAppending = function doAppending() {
    var config = this.config,
        hls = this.hls,
        segments = this.segments,
        sourceBuffer = this.sourceBuffer;

    if (!Object.keys(sourceBuffer).length) {
      // early exit if no source buffers have been initialized yet
      return;
    }

    if (!this.media || this.media.error) {
      this.segments = [];
      logger.error('trying to append although a media error occured, flush segment and abort');
      return;
    }

    if (this.appending) {
      // logger.log(`sb appending in progress`);
      return;
    }

    var segment = segments.shift();

    if (!segment) {
      // handle undefined shift
      return;
    }

    try {
      var sb = sourceBuffer[segment.type];

      if (!sb) {
        // in case we don't have any source buffer matching with this segment type,
        // it means that Mediasource fails to create sourcebuffer
        // discard this segment, and trigger update end
        this._onSBUpdateEnd();

        return;
      }

      if (sb.updating) {
        // if we are still updating the source buffer from the last segment, place this back at the front of the queue
        segments.unshift(segment);
        return;
      } // reset sourceBuffer ended flag before appending segment


      sb.ended = false; // logger.log(`appending ${segment.content} ${type} SB, size:${segment.data.length}, ${segment.parent}`);

      this.parent = segment.parent;
      sb.appendBuffer(segment.data);
      this.appendError = 0;
      this.appended++;
      this.appending = true;
    } catch (err) {
      // in case any error occured while appending, put back segment in segments table
      logger.error("error while trying to append buffer:" + err.message);
      segments.unshift(segment);
      var event = {
        type: ErrorTypes.MEDIA_ERROR,
        parent: segment.parent,
        details: '',
        fatal: false
      };

      if (err.code === 22) {
        // QuotaExceededError: http://www.w3.org/TR/html5/infrastructure.html#quotaexceedederror
        // let's stop appending any segments, and report BUFFER_FULL_ERROR error
        this.segments = [];
        event.details = ErrorDetails.BUFFER_FULL_ERROR;
      } else {
        this.appendError++;
        event.details = ErrorDetails.BUFFER_APPEND_ERROR;
        /* with UHD content, we could get loop of quota exceeded error until
          browser is able to evict some data from sourcebuffer. retrying help recovering this
        */

        if (this.appendError > config.appendErrorMaxRetry) {
          logger.log("fail " + config.appendErrorMaxRetry + " times to append segment in sourceBuffer");
          this.segments = [];
          event.fatal = true;
        }
      }

      hls.trigger(events.ERROR, event);
    }
  }
  /*
    flush specified buffered range,
    return true once range has been flushed.
    as sourceBuffer.remove() is asynchronous, flushBuffer will be retriggered on sourceBuffer update end
  */
  ;

  _proto.flushBuffer = function flushBuffer(startOffset, endOffset, sbType) {
    var sourceBuffer = this.sourceBuffer; // exit if no sourceBuffers are initialized

    if (!Object.keys(sourceBuffer).length) {
      return true;
    }

    var currentTime = 'null';

    if (this.media) {
      currentTime = this.media.currentTime.toFixed(3);
    }

    logger.log("flushBuffer,pos/start/end: " + currentTime + "/" + startOffset + "/" + endOffset); // safeguard to avoid infinite looping : don't try to flush more than the nb of appended segments

    if (this.flushBufferCounter >= this.appended) {
      logger.warn('abort flushing too many retries');
      return true;
    }

    var sb = sourceBuffer[sbType]; // we are going to flush buffer, mark source buffer as 'not ended'

    if (sb) {
      sb.ended = false;

      if (!sb.updating) {
        if (this.removeBufferRange(sbType, sb, startOffset, endOffset)) {
          this.flushBufferCounter++;
          return false;
        }
      } else {
        logger.warn('cannot flush, sb updating in progress');
        return false;
      }
    }

    logger.log('buffer flushed'); // everything flushed !

    return true;
  }
  /**
   * Removes first buffered range from provided source buffer that lies within given start and end offsets.
   *
   * @param {string} type Type of the source buffer, logging purposes only.
   * @param {SourceBuffer} sb Target SourceBuffer instance.
   * @param {number} startOffset
   * @param {number} endOffset
   *
   * @returns {boolean} True when source buffer remove requested.
   */
  ;

  _proto.removeBufferRange = function removeBufferRange(type, sb, startOffset, endOffset) {
    try {
      for (var i = 0; i < sb.buffered.length; i++) {
        var bufStart = sb.buffered.start(i);
        var bufEnd = sb.buffered.end(i);
        var removeStart = Math.max(bufStart, startOffset);
        var removeEnd = Math.min(bufEnd, endOffset);
        /* sometimes sourcebuffer.remove() does not flush
          the exact expected time range.
          to avoid rounding issues/infinite loop,
          only flush buffer range of length greater than 500ms.
        */

        if (Math.min(removeEnd, bufEnd) - removeStart > 0.5) {
          var currentTime = 'null';

          if (this.media) {
            currentTime = this.media.currentTime.toString();
          }

          logger.log("sb remove " + type + " [" + removeStart + "," + removeEnd + "], of [" + bufStart + "," + bufEnd + "], pos:" + currentTime);
          sb.remove(removeStart, removeEnd);
          return true;
        }
      }
    } catch (error) {
      logger.warn('removeBufferRange failed', error);
    }

    return false;
  };

  return BufferController;
}(event_handler);

/* harmony default export */ var buffer_controller = (buffer_controller_BufferController);
// CONCATENATED MODULE: ./src/controller/cap-level-controller.js
function cap_level_controller_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function cap_level_controller_createClass(Constructor, protoProps, staticProps) { if (protoProps) cap_level_controller_defineProperties(Constructor.prototype, protoProps); if (staticProps) cap_level_controller_defineProperties(Constructor, staticProps); return Constructor; }

function cap_level_controller_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*
 * cap stream level to media size dimension controller
*/



var cap_level_controller_CapLevelController =
/*#__PURE__*/
function (_EventHandler) {
  cap_level_controller_inheritsLoose(CapLevelController, _EventHandler);

  function CapLevelController(hls) {
    var _this;

    _this = _EventHandler.call(this, hls, events.FPS_DROP_LEVEL_CAPPING, events.MEDIA_ATTACHING, events.MANIFEST_PARSED, events.BUFFER_CODECS, events.MEDIA_DETACHING) || this;
    _this.autoLevelCapping = Number.POSITIVE_INFINITY;
    _this.firstLevel = null;
    _this.levels = [];
    _this.media = null;
    _this.restrictedLevels = [];
    _this.timer = null;
    return _this;
  }

  var _proto = CapLevelController.prototype;

  _proto.destroy = function destroy() {
    if (this.hls.config.capLevelToPlayerSize) {
      this.media = null;
      this.stopCapping();
    }
  };

  _proto.onFpsDropLevelCapping = function onFpsDropLevelCapping(data) {
    // Don't add a restricted level more than once
    if (CapLevelController.isLevelAllowed(data.droppedLevel, this.restrictedLevels)) {
      this.restrictedLevels.push(data.droppedLevel);
    }
  };

  _proto.onMediaAttaching = function onMediaAttaching(data) {
    this.media = data.media instanceof window.HTMLVideoElement ? data.media : null;
  };

  _proto.onManifestParsed = function onManifestParsed(data) {
    var hls = this.hls;
    this.restrictedLevels = [];
    this.levels = data.levels;
    this.firstLevel = data.firstLevel;

    if (hls.config.capLevelToPlayerSize && data.video) {
      // Start capping immediately if the manifest has signaled video codecs
      this.startCapping();
    }
  } // Only activate capping when playing a video stream; otherwise, multi-bitrate audio-only streams will be restricted
  // to the first level
  ;

  _proto.onBufferCodecs = function onBufferCodecs(data) {
    var hls = this.hls;

    if (hls.config.capLevelToPlayerSize && data.video) {
      // If the manifest did not signal a video codec capping has been deferred until we're certain video is present
      this.startCapping();
    }
  };

  _proto.onLevelsUpdated = function onLevelsUpdated(data) {
    this.levels = data.levels;
  };

  _proto.onMediaDetaching = function onMediaDetaching() {
    this.stopCapping();
  };

  _proto.detectPlayerSize = function detectPlayerSize() {
    if (this.media) {
      var levelsLength = this.levels ? this.levels.length : 0;

      if (levelsLength) {
        var hls = this.hls;
        hls.autoLevelCapping = this.getMaxLevel(levelsLength - 1);

        if (hls.autoLevelCapping > this.autoLevelCapping) {
          // if auto level capping has a higher value for the previous one, flush the buffer using nextLevelSwitch
          // usually happen when the user go to the fullscreen mode.
          hls.streamController.nextLevelSwitch();
        }

        this.autoLevelCapping = hls.autoLevelCapping;
      }
    }
  }
  /*
  * returns level should be the one with the dimensions equal or greater than the media (player) dimensions (so the video will be downscaled)
  */
  ;

  _proto.getMaxLevel = function getMaxLevel(capLevelIndex) {
    var _this2 = this;

    if (!this.levels) {
      return -1;
    }

    var validLevels = this.levels.filter(function (level, index) {
      return CapLevelController.isLevelAllowed(index, _this2.restrictedLevels) && index <= capLevelIndex;
    });
    return CapLevelController.getMaxLevelByMediaSize(validLevels, this.mediaWidth, this.mediaHeight);
  };

  _proto.startCapping = function startCapping() {
    if (this.timer) {
      // Don't reset capping if started twice; this can happen if the manifest signals a video codec
      return;
    }

    this.autoLevelCapping = Number.POSITIVE_INFINITY;
    this.hls.firstLevel = this.getMaxLevel(this.firstLevel);
    clearInterval(this.timer);
    this.timer = setInterval(this.detectPlayerSize.bind(this), 1000);
    this.detectPlayerSize();
  };

  _proto.stopCapping = function stopCapping() {
    this.restrictedLevels = [];
    this.firstLevel = null;
    this.autoLevelCapping = Number.POSITIVE_INFINITY;

    if (this.timer) {
      this.timer = clearInterval(this.timer);
      this.timer = null;
    }
  };

  CapLevelController.isLevelAllowed = function isLevelAllowed(level, restrictedLevels) {
    if (restrictedLevels === void 0) {
      restrictedLevels = [];
    }

    return restrictedLevels.indexOf(level) === -1;
  };

  CapLevelController.getMaxLevelByMediaSize = function getMaxLevelByMediaSize(levels, width, height) {
    if (!levels || levels && !levels.length) {
      return -1;
    } // Levels can have the same dimensions but differing bandwidths - since levels are ordered, we can look to the next
    // to determine whether we've chosen the greatest bandwidth for the media's dimensions


    var atGreatestBandiwdth = function atGreatestBandiwdth(curLevel, nextLevel) {
      if (!nextLevel) {
        return true;
      }

      return curLevel.width !== nextLevel.width || curLevel.height !== nextLevel.height;
    }; // If we run through the loop without breaking, the media's dimensions are greater than every level, so default to
    // the max level


    var maxLevelIndex = levels.length - 1;

    for (var i = 0; i < levels.length; i += 1) {
      var level = levels[i];

      if ((level.width >= width || level.height >= height) && atGreatestBandiwdth(level, levels[i + 1])) {
        maxLevelIndex = i;
        break;
      }
    }

    return maxLevelIndex;
  };

  cap_level_controller_createClass(CapLevelController, [{
    key: "mediaWidth",
    get: function get() {
      var width;
      var media = this.media;

      if (media) {
        width = media.width || media.clientWidth || media.offsetWidth;
        width *= CapLevelController.contentScaleFactor;
      }

      return width;
    }
  }, {
    key: "mediaHeight",
    get: function get() {
      var height;
      var media = this.media;

      if (media) {
        height = media.height || media.clientHeight || media.offsetHeight;
        height *= CapLevelController.contentScaleFactor;
      }

      return height;
    }
  }], [{
    key: "contentScaleFactor",
    get: function get() {
      var pixelRatio = 1;

      try {
        pixelRatio = window.devicePixelRatio;
      } catch (e) {}

      return pixelRatio;
    }
  }]);

  return CapLevelController;
}(event_handler);

/* harmony default export */ var cap_level_controller = (cap_level_controller_CapLevelController);
// CONCATENATED MODULE: ./src/controller/fps-controller.js
function fps_controller_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*
 * FPS Controller
*/



var fps_controller_window = window,
    fps_controller_performance = fps_controller_window.performance;

var fps_controller_FPSController =
/*#__PURE__*/
function (_EventHandler) {
  fps_controller_inheritsLoose(FPSController, _EventHandler);

  function FPSController(hls) {
    return _EventHandler.call(this, hls, events.MEDIA_ATTACHING) || this;
  }

  var _proto = FPSController.prototype;

  _proto.destroy = function destroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.isVideoPlaybackQualityAvailable = false;
  };

  _proto.onMediaAttaching = function onMediaAttaching(data) {
    var config = this.hls.config;

    if (config.capLevelOnFPSDrop) {
      var video = this.video = data.media instanceof window.HTMLVideoElement ? data.media : null;

      if (typeof video.getVideoPlaybackQuality === 'function') {
        this.isVideoPlaybackQualityAvailable = true;
      }

      clearInterval(this.timer);
      this.timer = setInterval(this.checkFPSInterval.bind(this), config.fpsDroppedMonitoringPeriod);
    }
  };

  _proto.checkFPS = function checkFPS(video, decodedFrames, droppedFrames) {
    var currentTime = fps_controller_performance.now();

    if (decodedFrames) {
      if (this.lastTime) {
        var currentPeriod = currentTime - this.lastTime,
            currentDropped = droppedFrames - this.lastDroppedFrames,
            currentDecoded = decodedFrames - this.lastDecodedFrames,
            droppedFPS = 1000 * currentDropped / currentPeriod,
            hls = this.hls;
        hls.trigger(events.FPS_DROP, {
          currentDropped: currentDropped,
          currentDecoded: currentDecoded,
          totalDroppedFrames: droppedFrames
        });

        if (droppedFPS > 0) {
          // logger.log('checkFPS : droppedFPS/decodedFPS:' + droppedFPS/(1000 * currentDecoded / currentPeriod));
          if (currentDropped > hls.config.fpsDroppedMonitoringThreshold * currentDecoded) {
            var currentLevel = hls.currentLevel;
            logger.warn('drop FPS ratio greater than max allowed value for currentLevel: ' + currentLevel);

            if (currentLevel > 0 && (hls.autoLevelCapping === -1 || hls.autoLevelCapping >= currentLevel)) {
              currentLevel = currentLevel - 1;
              hls.trigger(events.FPS_DROP_LEVEL_CAPPING, {
                level: currentLevel,
                droppedLevel: hls.currentLevel
              });
              hls.autoLevelCapping = currentLevel;
              hls.streamController.nextLevelSwitch();
            }
          }
        }
      }

      this.lastTime = currentTime;
      this.lastDroppedFrames = droppedFrames;
      this.lastDecodedFrames = decodedFrames;
    }
  };

  _proto.checkFPSInterval = function checkFPSInterval() {
    var video = this.video;

    if (video) {
      if (this.isVideoPlaybackQualityAvailable) {
        var videoPlaybackQuality = video.getVideoPlaybackQuality();
        this.checkFPS(video, videoPlaybackQuality.totalVideoFrames, videoPlaybackQuality.droppedVideoFrames);
      } else {
        this.checkFPS(video, video.webkitDecodedFrameCount, video.webkitDroppedFrameCount);
      }
    }
  };

  return FPSController;
}(event_handler);

/* harmony default export */ var fps_controller = (fps_controller_FPSController);
// CONCATENATED MODULE: ./src/utils/xhr-loader.js
/**
 * XHR based logger
*/

var xhr_loader_window = window,
    xhr_loader_performance = xhr_loader_window.performance,
    XMLHttpRequest = xhr_loader_window.XMLHttpRequest;

var xhr_loader_XhrLoader =
/*#__PURE__*/
function () {
  function XhrLoader(config) {
    if (config && config.xhrSetup) {
      this.xhrSetup = config.xhrSetup;
    }
  }

  var _proto = XhrLoader.prototype;

  _proto.destroy = function destroy() {
    this.abort();
    this.loader = null;
  };

  _proto.abort = function abort() {
    var loader = this.loader;

    if (loader && loader.readyState !== 4) {
      this.stats.aborted = true;
      loader.abort();
    }

    window.clearTimeout(this.requestTimeout);
    this.requestTimeout = null;
    window.clearTimeout(this.retryTimeout);
    this.retryTimeout = null;
  };

  _proto.load = function load(context, config, callbacks) {
    this.context = context;
    this.config = config;
    this.callbacks = callbacks;
    this.stats = {
      trequest: xhr_loader_performance.now(),
      retry: 0
    };
    this.retryDelay = config.retryDelay;
    this.loadInternal();
  };

  _proto.loadInternal = function loadInternal() {
    var xhr,
        context = this.context;
    xhr = this.loader = new XMLHttpRequest();
    var stats = this.stats;
    stats.tfirst = 0;
    stats.loaded = 0;
    var xhrSetup = this.xhrSetup;

    try {
      if (xhrSetup) {
        try {
          xhrSetup(xhr, context.url);
        } catch (e) {
          // fix xhrSetup: (xhr, url) => {xhr.setRequestHeader("Content-Language", "test");}
          // not working, as xhr.setRequestHeader expects xhr.readyState === OPEN
          xhr.open('GET', context.url, true);
          xhrSetup(xhr, context.url);
        }
      }

      if (!xhr.readyState) {
        xhr.open('GET', context.url, true);
      }
    } catch (e) {
      // IE11 throws an exception on xhr.open if attempting to access an HTTP resource over HTTPS
      this.callbacks.onError({
        code: xhr.status,
        text: e.message
      }, context, xhr);
      return;
    }

    if (context.rangeEnd) {
      xhr.setRequestHeader('Range', 'bytes=' + context.rangeStart + '-' + (context.rangeEnd - 1));
    }

    xhr.onreadystatechange = this.readystatechange.bind(this);
    xhr.onprogress = this.loadprogress.bind(this);
    xhr.responseType = context.responseType; // setup timeout before we perform request

    this.requestTimeout = window.setTimeout(this.loadtimeout.bind(this), this.config.timeout);
    xhr.send();
  };

  _proto.readystatechange = function readystatechange(event) {
    var xhr = event.currentTarget,
        readyState = xhr.readyState,
        stats = this.stats,
        context = this.context,
        config = this.config; // don't proceed if xhr has been aborted

    if (stats.aborted) {
      return;
    } // >= HEADERS_RECEIVED


    if (readyState >= 2) {
      // clear xhr timeout and rearm it if readyState less than 4
      window.clearTimeout(this.requestTimeout);

      if (stats.tfirst === 0) {
        stats.tfirst = Math.max(xhr_loader_performance.now(), stats.trequest);
      }

      if (readyState === 4) {
        var status = xhr.status; // http status between 200 to 299 are all successful

        if (status >= 200 && status < 300) {
          stats.tload = Math.max(stats.tfirst, xhr_loader_performance.now());
          var data, len;

          if (context.responseType === 'arraybuffer') {
            data = xhr.response;
            len = data.byteLength;
          } else {
            data = xhr.responseText;
            len = data.length;
          }

          stats.loaded = stats.total = len;
          var response = {
            url: xhr.responseURL,
            data: data
          };
          this.callbacks.onSuccess(response, stats, context, xhr);
        } else {
          // if max nb of retries reached or if http status between 400 and 499 (such error cannot be recovered, retrying is useless), return error
          if (stats.retry >= config.maxRetry) {
            logger.error(status + " while loading " + context.url);
            this.callbacks.onError({
              code: status,
              text: xhr.statusText
            }, context, xhr);
          } else {
            // retry
            logger.warn(status + " while loading " + context.url + ", retrying in " + this.retryDelay + "..."); // aborts and resets internal state

            this.destroy(); // schedule retry

            this.retryTimeout = window.setTimeout(this.loadInternal.bind(this), this.retryDelay); // set exponential backoff

            this.retryDelay = Math.min(2 * this.retryDelay, config.maxRetryDelay);
            stats.retry++;
          }
        }
      } else {
        // readyState >= 2 AND readyState !==4 (readyState = HEADERS_RECEIVED || LOADING) rearm timeout as xhr not finished yet
        this.requestTimeout = window.setTimeout(this.loadtimeout.bind(this), config.timeout);
      }
    }
  };

  _proto.loadtimeout = function loadtimeout() {
    logger.warn("timeout while loading " + this.context.url);
    this.callbacks.onTimeout(this.stats, this.context, null);
  };

  _proto.loadprogress = function loadprogress(event) {
    var xhr = event.currentTarget,
        stats = this.stats;
    stats.loaded = event.loaded;

    if (event.lengthComputable) {
      stats.total = event.total;
    }

    var onProgress = this.callbacks.onProgress;

    if (onProgress) {
      // third arg is to provide on progress data
      onProgress(stats, this.context, null, xhr);
    }
  };

  return XhrLoader;
}();

/* harmony default export */ var xhr_loader = (xhr_loader_XhrLoader);
// EXTERNAL MODULE: ./src/empty.js
var empty = __webpack_require__("./src/empty.js");

// CONCATENATED MODULE: ./src/utils/mediakeys-helper.ts
/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/requestMediaKeySystemAccess
 */
var KeySystems;

(function (KeySystems) {
  KeySystems["WIDEVINE"] = "com.widevine.alpha";
  KeySystems["PLAYREADY"] = "com.microsoft.playready";
})(KeySystems || (KeySystems = {}));

var requestMediaKeySystemAccess = function () {
  if (typeof window !== 'undefined' && window.navigator && window.navigator.requestMediaKeySystemAccess) {
    return window.navigator.requestMediaKeySystemAccess.bind(window.navigator);
  } else {
    return null;
  }
}();


// CONCATENATED MODULE: ./src/config.ts
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * HLS config
 */




 // import FetchLoader from './utils/fetch-loader';









// If possible, keep hlsDefaultConfig shallow
// It is cloned whenever a new Hls instance is created, by keeping the config
var hlsDefaultConfig = _objectSpread({
  autoStartLoad: true,
  // used by stream-controller
  startPosition: -1,
  // used by stream-controller
  defaultAudioCodec: void 0,
  // used by stream-controller
  debug: false,
  // used by logger
  capLevelOnFPSDrop: false,
  // used by fps-controller
  capLevelToPlayerSize: false,
  // used by cap-level-controller
  initialLiveManifestSize: 1,
  // used by stream-controller
  maxBufferLength: 30,
  // used by stream-controller
  maxBufferSize: 60 * 1000 * 1000,
  // used by stream-controller
  maxBufferHole: 0.5,
  // used by stream-controller
  lowBufferWatchdogPeriod: 0.5,
  // used by stream-controller
  highBufferWatchdogPeriod: 3,
  // used by stream-controller
  nudgeOffset: 0.1,
  // used by stream-controller
  nudgeMaxRetry: 3,
  // used by stream-controller
  maxFragLookUpTolerance: 0.25,
  // used by stream-controller
  liveSyncDurationCount: 3,
  // used by stream-controller
  liveMaxLatencyDurationCount: Infinity,
  // used by stream-controller
  liveSyncDuration: void 0,
  // used by stream-controller
  liveMaxLatencyDuration: void 0,
  // used by stream-controller
  liveDurationInfinity: false,
  // used by buffer-controller
  liveBackBufferLength: Infinity,
  // used by buffer-controller
  maxMaxBufferLength: 600,
  // used by stream-controller
  enableWorker: true,
  // used by demuxer
  enableSoftwareAES: true,
  // used by decrypter
  manifestLoadingTimeOut: 10000,
  // used by playlist-loader
  manifestLoadingMaxRetry: 1,
  // used by playlist-loader
  manifestLoadingRetryDelay: 1000,
  // used by playlist-loader
  manifestLoadingMaxRetryTimeout: 64000,
  // used by playlist-loader
  startLevel: void 0,
  // used by level-controller
  levelLoadingTimeOut: 10000,
  // used by playlist-loader
  levelLoadingMaxRetry: 4,
  // used by playlist-loader
  levelLoadingRetryDelay: 1000,
  // used by playlist-loader
  levelLoadingMaxRetryTimeout: 64000,
  // used by playlist-loader
  fragLoadingTimeOut: 20000,
  // used by fragment-loader
  fragLoadingMaxRetry: 6,
  // used by fragment-loader
  fragLoadingRetryDelay: 1000,
  // used by fragment-loader
  fragLoadingMaxRetryTimeout: 64000,
  // used by fragment-loader
  startFragPrefetch: false,
  // used by stream-controller
  fpsDroppedMonitoringPeriod: 5000,
  // used by fps-controller
  fpsDroppedMonitoringThreshold: 0.2,
  // used by fps-controller
  appendErrorMaxRetry: 3,
  // used by buffer-controller
  loader: xhr_loader,
  // loader: FetchLoader,
  fLoader: void 0,
  // used by fragment-loader
  pLoader: void 0,
  // used by playlist-loader
  xhrSetup: void 0,
  // used by xhr-loader
  licenseXhrSetup: void 0,
  // used by eme-controller
  // fetchSetup: void 0,
  abrController: abr_controller,
  bufferController: buffer_controller,
  capLevelController: cap_level_controller,
  fpsController: fps_controller,
  stretchShortVideoTrack: false,
  // used by mp4-remuxer
  maxAudioFramesDrift: 1,
  // used by mp4-remuxer
  forceKeyFrameOnDiscontinuity: true,
  // used by ts-demuxer
  abrEwmaFastLive: 3,
  // used by abr-controller
  abrEwmaSlowLive: 9,
  // used by abr-controller
  abrEwmaFastVoD: 3,
  // used by abr-controller
  abrEwmaSlowVoD: 9,
  // used by abr-controller
  abrEwmaDefaultEstimate: 5e5,
  // 500 kbps  // used by abr-controller
  abrBandWidthFactor: 0.95,
  // used by abr-controller
  abrBandWidthUpFactor: 0.7,
  // used by abr-controller
  abrMaxWithRealBitrate: false,
  // used by abr-controller
  maxStarvationDelay: 4,
  // used by abr-controller
  maxLoadingDelay: 4,
  // used by abr-controller
  minAutoBitrate: 0,
  // used by hls
  emeEnabled: false,
  // used by eme-controller
  widevineLicenseUrl: void 0,
  // used by eme-controller
  requestMediaKeySystemAccessFunc: requestMediaKeySystemAccess
}, timelineConfig(), {
  subtitleStreamController:  false ? undefined : void 0,
  subtitleTrackController:  false ? undefined : void 0,
  timelineController:  false ? undefined : void 0,
  audioStreamController:  false ? undefined : void 0,
  audioTrackController:  false ? undefined : void 0,
  emeController:  false ? undefined : void 0
});

function timelineConfig() {
  if (true) {
    // intentionally doing this over returning Partial<TimelineControllerConfig> above
    // this has the added nice property of still requiring the object below to completely define all props.
    return {};
  }

  return {
    cueHandler: empty,
    // used by timeline-controller
    enableCEA708Captions: true,
    // used by timeline-controller
    enableWebVTT: true,
    // used by timeline-controller
    captionsTextTrack1Label: 'English',
    // used by timeline-controller
    captionsTextTrack1LanguageCode: 'en',
    // used by timeline-controller
    captionsTextTrack2Label: 'Spanish',
    // used by timeline-controller
    captionsTextTrack2LanguageCode: 'es' // used by timeline-controller

  };
}
// EXTERNAL MODULE: ./node_modules/eventemitter3/index.js
var eventemitter3 = __webpack_require__("./node_modules/eventemitter3/index.js");

// CONCATENATED MODULE: ./src/observer.ts
function observer_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }


/**
 * Simple adapter sub-class of Nodejs-like EventEmitter.
 */

var Observer =
/*#__PURE__*/
function (_EventEmitter) {
  observer_inheritsLoose(Observer, _EventEmitter);

  function Observer() {
    return _EventEmitter.apply(this, arguments) || this;
  }

  var _proto = Observer.prototype;

  /**
   * We simply want to pass along the event-name itself
   * in every call to a handler, which is the purpose of our `trigger` method
   * extending the standard API.
   */
  _proto.trigger = function trigger(event) {
    for (var _len = arguments.length, data = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      data[_key - 1] = arguments[_key];
    }

    this.emit.apply(this, [event, event].concat(data));
  };

  return Observer;
}(eventemitter3["EventEmitter"]);
// CONCATENATED MODULE: ./src/hls.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return hls_Hls; });
function hls_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { hls_defineProperty(target, key, source[key]); }); } return target; }

function hls_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function hls_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function hls_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function hls_createClass(Constructor, protoProps, staticProps) { if (protoProps) hls_defineProperties(Constructor.prototype, protoProps); if (staticProps) hls_defineProperties(Constructor, staticProps); return Constructor; }

function hls_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }















/**
 * @module Hls
 * @class
 * @constructor
 */

var hls_Hls =
/*#__PURE__*/
function (_Observer) {
  hls_inheritsLoose(Hls, _Observer);

  /**
   * @type {boolean}
   */
  Hls.isSupported = function isSupported() {
    return is_supported_isSupported();
  }
  /**
   * @type {HlsEvents}
   */
  ;

  hls_createClass(Hls, null, [{
    key: "version",

    /**
     * @type {string}
     */
    get: function get() {
      return undefined;
    }
  }, {
    key: "Events",
    get: function get() {
      return events;
    }
    /**
     * @type {HlsErrorTypes}
     */

  }, {
    key: "ErrorTypes",
    get: function get() {
      return ErrorTypes;
    }
    /**
     * @type {HlsErrorDetails}
     */

  }, {
    key: "ErrorDetails",
    get: function get() {
      return ErrorDetails;
    }
    /**
     * @type {HlsConfig}
     */

  }, {
    key: "DefaultConfig",
    get: function get() {
      if (!Hls.defaultConfig) {
        return hlsDefaultConfig;
      }

      return Hls.defaultConfig;
    }
    /**
     * @type {HlsConfig}
     */
    ,
    set: function set(defaultConfig) {
      Hls.defaultConfig = defaultConfig;
    }
    /**
     * Creates an instance of an HLS client that can attach to exactly one `HTMLMediaElement`.
     *
     * @constructs Hls
     * @param {HlsConfig} config
     */

  }]);

  function Hls(userConfig) {
    var _this;

    if (userConfig === void 0) {
      userConfig = {};
    }

    _this = _Observer.call(this) || this;
    _this.config = void 0;
    _this._autoLevelCapping = void 0;
    _this.abrController = void 0;
    _this.capLevelController = void 0;
    _this.levelController = void 0;
    _this.streamController = void 0;
    _this.networkControllers = void 0;
    _this.audioTrackController = void 0;
    _this.subtitleTrackController = void 0;
    _this.emeController = void 0;
    _this.coreComponents = void 0;
    _this.media = null;
    _this.url = null;
    var defaultConfig = Hls.DefaultConfig;

    if ((userConfig.liveSyncDurationCount || userConfig.liveMaxLatencyDurationCount) && (userConfig.liveSyncDuration || userConfig.liveMaxLatencyDuration)) {
      throw new Error('Illegal hls.js config: don\'t mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration');
    } // Shallow clone


    _this.config = hls_objectSpread({}, defaultConfig, userConfig);

    var _assertThisInitialize = hls_assertThisInitialized(_this),
        config = _assertThisInitialize.config;

    if (config.liveMaxLatencyDurationCount !== void 0 && config.liveMaxLatencyDurationCount <= config.liveSyncDurationCount) {
      throw new Error('Illegal hls.js config: "liveMaxLatencyDurationCount" must be gt "liveSyncDurationCount"');
    }

    if (config.liveMaxLatencyDuration !== void 0 && (config.liveSyncDuration === void 0 || config.liveMaxLatencyDuration <= config.liveSyncDuration)) {
      throw new Error('Illegal hls.js config: "liveMaxLatencyDuration" must be gt "liveSyncDuration"');
    }

    enableLogs(config.debug);
    _this._autoLevelCapping = -1; // core controllers and network loaders

    /**
     * @member {AbrController} abrController
     */

    var abrController = _this.abrController = new config.abrController(hls_assertThisInitialized(_this)); // eslint-disable-line new-cap

    var bufferController = new config.bufferController(hls_assertThisInitialized(_this)); // eslint-disable-line new-cap

    var capLevelController = _this.capLevelController = new config.capLevelController(hls_assertThisInitialized(_this)); // eslint-disable-line new-cap

    var fpsController = new config.fpsController(hls_assertThisInitialized(_this)); // eslint-disable-line new-cap

    var playListLoader = new playlist_loader(hls_assertThisInitialized(_this));
    var fragmentLoader = new fragment_loader(hls_assertThisInitialized(_this));
    var keyLoader = new key_loader(hls_assertThisInitialized(_this));
    var id3TrackController = new id3_track_controller(hls_assertThisInitialized(_this)); // network controllers

    /**
     * @member {LevelController} levelController
     */

    var levelController = _this.levelController = new level_controller_LevelController(hls_assertThisInitialized(_this)); // FIXME: FragmentTracker must be defined before StreamController because the order of event handling is important

    var fragmentTracker = new fragment_tracker_FragmentTracker(hls_assertThisInitialized(_this));
    /**
     * @member {StreamController} streamController
     */

    var streamController = _this.streamController = new stream_controller_default.a(hls_assertThisInitialized(_this), fragmentTracker);
    var networkControllers = [levelController, streamController]; // optional audio stream controller

    /**
     * @var {ICoreComponent | Controller}
     */

    var Controller = config.audioStreamController;

    if (Controller) {
      networkControllers.push(new Controller(hls_assertThisInitialized(_this), fragmentTracker));
    }
    /**
     * @member {INetworkController[]} networkControllers
     */


    _this.networkControllers = networkControllers;
    /**
     * @var {ICoreComponent[]}
     */

    var coreComponents = [playListLoader, fragmentLoader, keyLoader, abrController, bufferController, capLevelController, fpsController, id3TrackController, fragmentTracker]; // optional audio track and subtitle controller

    Controller = config.audioTrackController;

    if (Controller) {
      var audioTrackController = new Controller(hls_assertThisInitialized(_this));
      /**
       * @member {AudioTrackController} audioTrackController
       */

      _this.audioTrackController = audioTrackController;
      coreComponents.push(audioTrackController);
    }

    Controller = config.subtitleTrackController;

    if (Controller) {
      var subtitleTrackController = new Controller(hls_assertThisInitialized(_this));
      /**
       * @member {SubtitleTrackController} subtitleTrackController
       */

      _this.subtitleTrackController = subtitleTrackController;
      networkControllers.push(subtitleTrackController);
    }

    Controller = config.emeController;

    if (Controller) {
      var emeController = new Controller(hls_assertThisInitialized(_this));
      /**
       * @member {EMEController} emeController
       */

      _this.emeController = emeController;
      coreComponents.push(emeController);
    } // optional subtitle controllers


    Controller = config.subtitleStreamController;

    if (Controller) {
      networkControllers.push(new Controller(hls_assertThisInitialized(_this), fragmentTracker));
    }

    Controller = config.timelineController;

    if (Controller) {
      coreComponents.push(new Controller(hls_assertThisInitialized(_this)));
    }
    /**
     * @member {ICoreComponent[]}
     */


    _this.coreComponents = coreComponents;
    return _this;
  }
  /**
   * Dispose of the instance
   */


  var _proto = Hls.prototype;

  _proto.destroy = function destroy() {
    logger.log('destroy');
    this.trigger(events.DESTROYING);
    this.detachMedia();
    this.coreComponents.concat(this.networkControllers).forEach(function (component) {
      component.destroy();
    });
    this.url = null;
    this.removeAllListeners();
    this._autoLevelCapping = -1;
  }
  /**
   * Attach a media element
   * @param {HTMLMediaElement} media
   */
  ;

  _proto.attachMedia = function attachMedia(media) {
    logger.log('attachMedia');
    this.media = media;
    this.trigger(events.MEDIA_ATTACHING, {
      media: media
    });
  }
  /**
   * Detach from the media
   */
  ;

  _proto.detachMedia = function detachMedia() {
    logger.log('detachMedia');
    this.trigger(events.MEDIA_DETACHING);
    this.media = null;
  }
  /**
   * Set the source URL. Can be relative or absolute.
   * @param {string} url
   */
  ;

  _proto.loadSource = function loadSource(url) {
    url = url_toolkit["buildAbsoluteURL"](window.location.href, url, {
      alwaysNormalize: true
    });
    logger.log("loadSource:" + url);
    this.url = url; // when attaching to a source URL, trigger a playlist load

    this.trigger(events.MANIFEST_LOADING, {
      url: url
    });
  }
  /**
   * Start loading data from the stream source.
   * Depending on default config, client starts loading automatically when a source is set.
   *
   * @param {number} startPosition Set the start position to stream from
   * @default -1 None (from earliest point)
   */
  ;

  _proto.startLoad = function startLoad(startPosition) {
    if (startPosition === void 0) {
      startPosition = -1;
    }

    logger.log("startLoad(" + startPosition + ")");
    this.networkControllers.forEach(function (controller) {
      controller.startLoad(startPosition);
    });
  }
  /**
   * Stop loading of any stream data.
   */
  ;

  _proto.stopLoad = function stopLoad() {
    logger.log('stopLoad');
    this.networkControllers.forEach(function (controller) {
      controller.stopLoad();
    });
  }
  /**
   * Swap through possible audio codecs in the stream (for example to switch from stereo to 5.1)
   */
  ;

  _proto.swapAudioCodec = function swapAudioCodec() {
    logger.log('swapAudioCodec');
    this.streamController.swapAudioCodec();
  }
  /**
   * When the media-element fails, this allows to detach and then re-attach it
   * as one call (convenience method).
   *
   * Automatic recovery of media-errors by this process is configurable.
   */
  ;

  _proto.recoverMediaError = function recoverMediaError() {
    logger.log('recoverMediaError');
    var media = this.media;
    this.detachMedia();

    if (media) {
      this.attachMedia(media);
    }
  }
  /**
   * @type {QualityLevel[]}
   */
  // todo(typescript-levelController)
  ;

  hls_createClass(Hls, [{
    key: "levels",
    get: function get() {
      return this.levelController.levels;
    }
    /**
     * Index of quality level currently played
     * @type {number}
     */

  }, {
    key: "currentLevel",
    get: function get() {
      return this.streamController.currentLevel;
    }
    /**
     * Set quality level index immediately .
     * This will flush the current buffer to replace the quality asap.
     * That means playback will interrupt at least shortly to re-buffer and re-sync eventually.
     * @type {number} -1 for automatic level selection
     */
    ,
    set: function set(newLevel) {
      logger.log("set currentLevel:" + newLevel);
      this.loadLevel = newLevel;
      this.streamController.immediateLevelSwitch();
    }
    /**
     * Index of next quality level loaded as scheduled by stream controller.
     * @type {number}
     */

  }, {
    key: "nextLevel",
    get: function get() {
      return this.streamController.nextLevel;
    }
    /**
     * Set quality level index for next loaded data.
     * This will switch the video quality asap, without interrupting playback.
     * May abort current loading of data, and flush parts of buffer (outside currently played fragment region).
     * @type {number} -1 for automatic level selection
     */
    ,
    set: function set(newLevel) {
      logger.log("set nextLevel:" + newLevel);
      this.levelController.manualLevel = newLevel;
      this.streamController.nextLevelSwitch();
    }
    /**
     * Return the quality level of the currently or last (of none is loaded currently) segment
     * @type {number}
     */

  }, {
    key: "loadLevel",
    get: function get() {
      return this.levelController.level;
    }
    /**
     * Set quality level index for next loaded data in a conservative way.
     * This will switch the quality without flushing, but interrupt current loading.
     * Thus the moment when the quality switch will appear in effect will only be after the already existing buffer.
     * @type {number} newLevel -1 for automatic level selection
     */
    ,
    set: function set(newLevel) {
      logger.log("set loadLevel:" + newLevel);
      this.levelController.manualLevel = newLevel;
    }
    /**
     * get next quality level loaded
     * @type {number}
     */

  }, {
    key: "nextLoadLevel",
    get: function get() {
      return this.levelController.nextLoadLevel;
    }
    /**
     * Set quality level of next loaded segment in a fully "non-destructive" way.
     * Same as `loadLevel` but will wait for next switch (until current loading is done).
     * @type {number} level
     */
    ,
    set: function set(level) {
      this.levelController.nextLoadLevel = level;
    }
    /**
     * Return "first level": like a default level, if not set,
     * falls back to index of first level referenced in manifest
     * @type {number}
     */

  }, {
    key: "firstLevel",
    get: function get() {
      return Math.max(this.levelController.firstLevel, this.minAutoLevel);
    }
    /**
     * Sets "first-level", see getter.
     * @type {number}
     */
    ,
    set: function set(newLevel) {
      logger.log("set firstLevel:" + newLevel);
      this.levelController.firstLevel = newLevel;
    }
    /**
     * Return start level (level of first fragment that will be played back)
     * if not overrided by user, first level appearing in manifest will be used as start level
     * if -1 : automatic start level selection, playback will start from level matching download bandwidth
     * (determined from download of first segment)
     * @type {number}
     */

  }, {
    key: "startLevel",
    get: function get() {
      return this.levelController.startLevel;
    }
    /**
     * set  start level (level of first fragment that will be played back)
     * if not overrided by user, first level appearing in manifest will be used as start level
     * if -1 : automatic start level selection, playback will start from level matching download bandwidth
     * (determined from download of first segment)
     * @type {number} newLevel
     */
    ,
    set: function set(newLevel) {
      logger.log("set startLevel:" + newLevel); // if not in automatic start level detection, ensure startLevel is greater than minAutoLevel

      if (newLevel !== -1) {
        newLevel = Math.max(newLevel, this.minAutoLevel);
      }

      this.levelController.startLevel = newLevel;
    }
    /**
     * set  dynamically set capLevelToPlayerSize against (`CapLevelController`)
     *
     * @type {boolean}
     */

  }, {
    key: "capLevelToPlayerSize",
    set: function set(shouldStartCapping) {
      var newCapLevelToPlayerSize = !!shouldStartCapping;

      if (newCapLevelToPlayerSize !== this.config.capLevelToPlayerSize) {
        if (newCapLevelToPlayerSize) {
          this.capLevelController.startCapping(); // If capping occurs, nextLevelSwitch will happen based on size.
        } else {
          this.capLevelController.stopCapping();
          this.autoLevelCapping = -1;
          this.streamController.nextLevelSwitch(); // Now we're uncapped, get the next level asap.
        }

        this.config.capLevelToPlayerSize = newCapLevelToPlayerSize;
      }
    }
    /**
     * Capping/max level value that should be used by automatic level selection algorithm (`ABRController`)
     * @type {number}
     */

  }, {
    key: "autoLevelCapping",
    get: function get() {
      return this._autoLevelCapping;
    }
    /**
     * get bandwidth estimate
     * @type {number}
     */
    ,

    /**
     * Capping/max level value that should be used by automatic level selection algorithm (`ABRController`)
     * @type {number}
     */
    set: function set(newLevel) {
      logger.log("set autoLevelCapping:" + newLevel);
      this._autoLevelCapping = newLevel;
    }
    /**
     * True when automatic level selection enabled
     * @type {boolean}
     */

  }, {
    key: "bandwidthEstimate",
    get: function get() {
      var bwEstimator = this.abrController._bwEstimator;
      return bwEstimator ? bwEstimator.getEstimate() : NaN;
    }
  }, {
    key: "autoLevelEnabled",
    get: function get() {
      return this.levelController.manualLevel === -1;
    }
    /**
     * Level set manually (if any)
     * @type {number}
     */

  }, {
    key: "manualLevel",
    get: function get() {
      return this.levelController.manualLevel;
    }
    /**
     * min level selectable in auto mode according to config.minAutoBitrate
     * @type {number}
     */

  }, {
    key: "minAutoLevel",
    get: function get() {
      var levels = this.levels,
          minAutoBitrate = this.config.minAutoBitrate;
      var len = levels ? levels.length : 0;

      for (var i = 0; i < len; i++) {
        var levelNextBitrate = levels[i].realBitrate ? Math.max(levels[i].realBitrate, levels[i].bitrate) : levels[i].bitrate;

        if (levelNextBitrate > minAutoBitrate) {
          return i;
        }
      }

      return 0;
    }
    /**
     * max level selectable in auto mode according to autoLevelCapping
     * @type {number}
     */

  }, {
    key: "maxAutoLevel",
    get: function get() {
      var levels = this.levels,
          autoLevelCapping = this.autoLevelCapping;
      var maxAutoLevel;

      if (autoLevelCapping === -1 && levels && levels.length) {
        maxAutoLevel = levels.length - 1;
      } else {
        maxAutoLevel = autoLevelCapping;
      }

      return maxAutoLevel;
    }
    /**
     * next automatically selected quality level
     * @type {number}
     */

  }, {
    key: "nextAutoLevel",
    get: function get() {
      // ensure next auto level is between  min and max auto level
      return Math.min(Math.max(this.abrController.nextAutoLevel, this.minAutoLevel), this.maxAutoLevel);
    }
    /**
     * this setter is used to force next auto level.
     * this is useful to force a switch down in auto mode:
     * in case of load error on level N, hls.js can set nextAutoLevel to N-1 for example)
     * forced value is valid for one fragment. upon succesful frag loading at forced level,
     * this value will be resetted to -1 by ABR controller.
     * @type {number}
     */
    ,
    set: function set(nextLevel) {
      this.abrController.nextAutoLevel = Math.max(this.minAutoLevel, nextLevel);
    }
    /**
     * @type {AudioTrack[]}
     */
    // todo(typescript-audioTrackController)

  }, {
    key: "audioTracks",
    get: function get() {
      var audioTrackController = this.audioTrackController;
      return audioTrackController ? audioTrackController.audioTracks : [];
    }
    /**
     * index of the selected audio track (index in audio track lists)
     * @type {number}
     */

  }, {
    key: "audioTrack",
    get: function get() {
      var audioTrackController = this.audioTrackController;
      return audioTrackController ? audioTrackController.audioTrack : -1;
    }
    /**
     * selects an audio track, based on its index in audio track lists
     * @type {number}
     */
    ,
    set: function set(audioTrackId) {
      var audioTrackController = this.audioTrackController;

      if (audioTrackController) {
        audioTrackController.audioTrack = audioTrackId;
      }
    }
    /**
     * @type {Seconds}
     */

  }, {
    key: "liveSyncPosition",
    get: function get() {
      return this.streamController.liveSyncPosition;
    }
    /**
     * get alternate subtitle tracks list from playlist
     * @type {SubtitleTrack[]}
     */
    // todo(typescript-subtitleTrackController)

  }, {
    key: "subtitleTracks",
    get: function get() {
      var subtitleTrackController = this.subtitleTrackController;
      return subtitleTrackController ? subtitleTrackController.subtitleTracks : [];
    }
    /**
     * index of the selected subtitle track (index in subtitle track lists)
     * @type {number}
     */

  }, {
    key: "subtitleTrack",
    get: function get() {
      var subtitleTrackController = this.subtitleTrackController;
      return subtitleTrackController ? subtitleTrackController.subtitleTrack : -1;
    }
    /**
     * select an subtitle track, based on its index in subtitle track lists
     * @type {number}
     */
    ,
    set: function set(subtitleTrackId) {
      var subtitleTrackController = this.subtitleTrackController;

      if (subtitleTrackController) {
        subtitleTrackController.subtitleTrack = subtitleTrackId;
      }
    }
    /**
     * @type {boolean}
     */

  }, {
    key: "subtitleDisplay",
    get: function get() {
      var subtitleTrackController = this.subtitleTrackController;
      return subtitleTrackController ? subtitleTrackController.subtitleDisplay : false;
    }
    /**
     * Enable/disable subtitle display rendering
     * @type {boolean}
     */
    ,
    set: function set(value) {
      var subtitleTrackController = this.subtitleTrackController;

      if (subtitleTrackController) {
        subtitleTrackController.subtitleDisplay = value;
      }
    }
  }]);

  return Hls;
}(Observer);

hls_Hls.defaultConfig = void 0;


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=hls.light.js.map