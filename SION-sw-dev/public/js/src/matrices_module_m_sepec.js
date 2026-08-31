/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/async/dist/async.mjs":
/*!*******************************************!*\
  !*** ./node_modules/async/dist/async.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "apply": () => (/* binding */ apply),
/* harmony export */   "applyEach": () => (/* binding */ applyEach$1),
/* harmony export */   "applyEachSeries": () => (/* binding */ applyEachSeries),
/* harmony export */   "asyncify": () => (/* binding */ asyncify),
/* harmony export */   "auto": () => (/* binding */ auto),
/* harmony export */   "autoInject": () => (/* binding */ autoInject),
/* harmony export */   "cargo": () => (/* binding */ cargo),
/* harmony export */   "cargoQueue": () => (/* binding */ cargo$1),
/* harmony export */   "compose": () => (/* binding */ compose),
/* harmony export */   "concat": () => (/* binding */ concat$1),
/* harmony export */   "concatLimit": () => (/* binding */ concatLimit$1),
/* harmony export */   "concatSeries": () => (/* binding */ concatSeries$1),
/* harmony export */   "constant": () => (/* binding */ constant),
/* harmony export */   "detect": () => (/* binding */ detect$1),
/* harmony export */   "detectLimit": () => (/* binding */ detectLimit$1),
/* harmony export */   "detectSeries": () => (/* binding */ detectSeries$1),
/* harmony export */   "dir": () => (/* binding */ dir),
/* harmony export */   "doUntil": () => (/* binding */ doUntil),
/* harmony export */   "doWhilst": () => (/* binding */ doWhilst$1),
/* harmony export */   "each": () => (/* binding */ each),
/* harmony export */   "eachLimit": () => (/* binding */ eachLimit$2),
/* harmony export */   "eachOf": () => (/* binding */ eachOf$1),
/* harmony export */   "eachOfLimit": () => (/* binding */ eachOfLimit$2),
/* harmony export */   "eachOfSeries": () => (/* binding */ eachOfSeries$1),
/* harmony export */   "eachSeries": () => (/* binding */ eachSeries$1),
/* harmony export */   "ensureAsync": () => (/* binding */ ensureAsync),
/* harmony export */   "every": () => (/* binding */ every$1),
/* harmony export */   "everyLimit": () => (/* binding */ everyLimit$1),
/* harmony export */   "everySeries": () => (/* binding */ everySeries$1),
/* harmony export */   "filter": () => (/* binding */ filter$1),
/* harmony export */   "filterLimit": () => (/* binding */ filterLimit$1),
/* harmony export */   "filterSeries": () => (/* binding */ filterSeries$1),
/* harmony export */   "forever": () => (/* binding */ forever$1),
/* harmony export */   "groupBy": () => (/* binding */ groupBy),
/* harmony export */   "groupByLimit": () => (/* binding */ groupByLimit$1),
/* harmony export */   "groupBySeries": () => (/* binding */ groupBySeries),
/* harmony export */   "log": () => (/* binding */ log),
/* harmony export */   "map": () => (/* binding */ map$1),
/* harmony export */   "mapLimit": () => (/* binding */ mapLimit$1),
/* harmony export */   "mapSeries": () => (/* binding */ mapSeries$1),
/* harmony export */   "mapValues": () => (/* binding */ mapValues),
/* harmony export */   "mapValuesLimit": () => (/* binding */ mapValuesLimit$1),
/* harmony export */   "mapValuesSeries": () => (/* binding */ mapValuesSeries),
/* harmony export */   "memoize": () => (/* binding */ memoize),
/* harmony export */   "nextTick": () => (/* binding */ nextTick),
/* harmony export */   "parallel": () => (/* binding */ parallel),
/* harmony export */   "parallelLimit": () => (/* binding */ parallelLimit),
/* harmony export */   "priorityQueue": () => (/* binding */ priorityQueue),
/* harmony export */   "queue": () => (/* binding */ queue$1),
/* harmony export */   "race": () => (/* binding */ race$1),
/* harmony export */   "reduce": () => (/* binding */ reduce$1),
/* harmony export */   "reduceRight": () => (/* binding */ reduceRight),
/* harmony export */   "reflect": () => (/* binding */ reflect),
/* harmony export */   "reflectAll": () => (/* binding */ reflectAll),
/* harmony export */   "reject": () => (/* binding */ reject$2),
/* harmony export */   "rejectLimit": () => (/* binding */ rejectLimit$1),
/* harmony export */   "rejectSeries": () => (/* binding */ rejectSeries$1),
/* harmony export */   "retry": () => (/* binding */ retry),
/* harmony export */   "retryable": () => (/* binding */ retryable),
/* harmony export */   "seq": () => (/* binding */ seq),
/* harmony export */   "series": () => (/* binding */ series),
/* harmony export */   "setImmediate": () => (/* binding */ setImmediate$1),
/* harmony export */   "some": () => (/* binding */ some$1),
/* harmony export */   "someLimit": () => (/* binding */ someLimit$1),
/* harmony export */   "someSeries": () => (/* binding */ someSeries$1),
/* harmony export */   "sortBy": () => (/* binding */ sortBy$1),
/* harmony export */   "timeout": () => (/* binding */ timeout),
/* harmony export */   "times": () => (/* binding */ times),
/* harmony export */   "timesLimit": () => (/* binding */ timesLimit),
/* harmony export */   "timesSeries": () => (/* binding */ timesSeries),
/* harmony export */   "transform": () => (/* binding */ transform),
/* harmony export */   "tryEach": () => (/* binding */ tryEach$1),
/* harmony export */   "unmemoize": () => (/* binding */ unmemoize),
/* harmony export */   "until": () => (/* binding */ until),
/* harmony export */   "waterfall": () => (/* binding */ waterfall$1),
/* harmony export */   "whilst": () => (/* binding */ whilst$1),
/* harmony export */   "all": () => (/* binding */ every$1),
/* harmony export */   "allLimit": () => (/* binding */ everyLimit$1),
/* harmony export */   "allSeries": () => (/* binding */ everySeries$1),
/* harmony export */   "any": () => (/* binding */ some$1),
/* harmony export */   "anyLimit": () => (/* binding */ someLimit$1),
/* harmony export */   "anySeries": () => (/* binding */ someSeries$1),
/* harmony export */   "find": () => (/* binding */ detect$1),
/* harmony export */   "findLimit": () => (/* binding */ detectLimit$1),
/* harmony export */   "findSeries": () => (/* binding */ detectSeries$1),
/* harmony export */   "flatMap": () => (/* binding */ concat$1),
/* harmony export */   "flatMapLimit": () => (/* binding */ concatLimit$1),
/* harmony export */   "flatMapSeries": () => (/* binding */ concatSeries$1),
/* harmony export */   "forEach": () => (/* binding */ each),
/* harmony export */   "forEachSeries": () => (/* binding */ eachSeries$1),
/* harmony export */   "forEachLimit": () => (/* binding */ eachLimit$2),
/* harmony export */   "forEachOf": () => (/* binding */ eachOf$1),
/* harmony export */   "forEachOfSeries": () => (/* binding */ eachOfSeries$1),
/* harmony export */   "forEachOfLimit": () => (/* binding */ eachOfLimit$2),
/* harmony export */   "inject": () => (/* binding */ reduce$1),
/* harmony export */   "foldl": () => (/* binding */ reduce$1),
/* harmony export */   "foldr": () => (/* binding */ reduceRight),
/* harmony export */   "select": () => (/* binding */ filter$1),
/* harmony export */   "selectLimit": () => (/* binding */ filterLimit$1),
/* harmony export */   "selectSeries": () => (/* binding */ filterSeries$1),
/* harmony export */   "wrapSync": () => (/* binding */ asyncify),
/* harmony export */   "during": () => (/* binding */ whilst$1),
/* harmony export */   "doDuring": () => (/* binding */ doWhilst$1)
/* harmony export */ });
/**
 * Creates a continuation function with some arguments already applied.
 *
 * Useful as a shorthand when combined with other control flow functions. Any
 * arguments passed to the returned function are added to the arguments
 * originally passed to apply.
 *
 * @name apply
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {Function} fn - The function you want to eventually apply all
 * arguments to. Invokes with (arguments...).
 * @param {...*} arguments... - Any number of arguments to automatically apply
 * when the continuation is called.
 * @returns {Function} the partially-applied function
 * @example
 *
 * // using apply
 * async.parallel([
 *     async.apply(fs.writeFile, 'testfile1', 'test1'),
 *     async.apply(fs.writeFile, 'testfile2', 'test2')
 * ]);
 *
 *
 * // the same process without using apply
 * async.parallel([
 *     function(callback) {
 *         fs.writeFile('testfile1', 'test1', callback);
 *     },
 *     function(callback) {
 *         fs.writeFile('testfile2', 'test2', callback);
 *     }
 * ]);
 *
 * // It's possible to pass any number of additional arguments when calling the
 * // continuation:
 *
 * node> var fn = async.apply(sys.puts, 'one');
 * node> fn('two', 'three');
 * one
 * two
 * three
 */
function apply(fn, ...args) {
    return (...callArgs) => fn(...args,...callArgs);
}

function initialParams (fn) {
    return function (...args/*, callback*/) {
        var callback = args.pop();
        return fn.call(this, args, callback);
    };
}

/* istanbul ignore file */

var hasSetImmediate = typeof setImmediate === 'function' && setImmediate;
var hasNextTick = typeof process === 'object' && typeof process.nextTick === 'function';

function fallback(fn) {
    setTimeout(fn, 0);
}

function wrap(defer) {
    return (fn, ...args) => defer(() => fn(...args));
}

var _defer;

if (hasSetImmediate) {
    _defer = setImmediate;
} else if (hasNextTick) {
    _defer = process.nextTick;
} else {
    _defer = fallback;
}

var setImmediate$1 = wrap(_defer);

/**
 * Take a sync function and make it async, passing its return value to a
 * callback. This is useful for plugging sync functions into a waterfall,
 * series, or other async functions. Any arguments passed to the generated
 * function will be passed to the wrapped function (except for the final
 * callback argument). Errors thrown will be passed to the callback.
 *
 * If the function passed to `asyncify` returns a Promise, that promises's
 * resolved/rejected state will be used to call the callback, rather than simply
 * the synchronous return value.
 *
 * This also means you can asyncify ES2017 `async` functions.
 *
 * @name asyncify
 * @static
 * @memberOf module:Utils
 * @method
 * @alias wrapSync
 * @category Util
 * @param {Function} func - The synchronous function, or Promise-returning
 * function to convert to an {@link AsyncFunction}.
 * @returns {AsyncFunction} An asynchronous wrapper of the `func`. To be
 * invoked with `(args..., callback)`.
 * @example
 *
 * // passing a regular synchronous function
 * async.waterfall([
 *     async.apply(fs.readFile, filename, "utf8"),
 *     async.asyncify(JSON.parse),
 *     function (data, next) {
 *         // data is the result of parsing the text.
 *         // If there was a parsing error, it would have been caught.
 *     }
 * ], callback);
 *
 * // passing a function returning a promise
 * async.waterfall([
 *     async.apply(fs.readFile, filename, "utf8"),
 *     async.asyncify(function (contents) {
 *         return db.model.create(contents);
 *     }),
 *     function (model, next) {
 *         // `model` is the instantiated model object.
 *         // If there was an error, this function would be skipped.
 *     }
 * ], callback);
 *
 * // es2017 example, though `asyncify` is not needed if your JS environment
 * // supports async functions out of the box
 * var q = async.queue(async.asyncify(async function(file) {
 *     var intermediateStep = await processFile(file);
 *     return await somePromise(intermediateStep)
 * }));
 *
 * q.push(files);
 */
function asyncify(func) {
    if (isAsync(func)) {
        return function (...args/*, callback*/) {
            const callback = args.pop();
            const promise = func.apply(this, args);
            return handlePromise(promise, callback)
        }
    }

    return initialParams(function (args, callback) {
        var result;
        try {
            result = func.apply(this, args);
        } catch (e) {
            return callback(e);
        }
        // if result is Promise object
        if (result && typeof result.then === 'function') {
            return handlePromise(result, callback)
        } else {
            callback(null, result);
        }
    });
}

function handlePromise(promise, callback) {
    return promise.then(value => {
        invokeCallback(callback, null, value);
    }, err => {
        invokeCallback(callback, err && err.message ? err : new Error(err));
    });
}

function invokeCallback(callback, error, value) {
    try {
        callback(error, value);
    } catch (err) {
        setImmediate$1(e => { throw e }, err);
    }
}

function isAsync(fn) {
    return fn[Symbol.toStringTag] === 'AsyncFunction';
}

function isAsyncGenerator(fn) {
    return fn[Symbol.toStringTag] === 'AsyncGenerator';
}

function isAsyncIterable(obj) {
    return typeof obj[Symbol.asyncIterator] === 'function';
}

function wrapAsync(asyncFn) {
    if (typeof asyncFn !== 'function') throw new Error('expected a function')
    return isAsync(asyncFn) ? asyncify(asyncFn) : asyncFn;
}

// conditionally promisify a function.
// only return a promise if a callback is omitted
function awaitify (asyncFn, arity = asyncFn.length) {
    if (!arity) throw new Error('arity is undefined')
    function awaitable (...args) {
        if (typeof args[arity - 1] === 'function') {
            return asyncFn.apply(this, args)
        }

        return new Promise((resolve, reject) => {
            args[arity - 1] = (err, ...cbArgs) => {
                if (err) return reject(err)
                resolve(cbArgs.length > 1 ? cbArgs : cbArgs[0]);
            };
            asyncFn.apply(this, args);
        })
    }

    return awaitable
}

function applyEach (eachfn) {
    return function applyEach(fns, ...callArgs) {
        const go = awaitify(function (callback) {
            var that = this;
            return eachfn(fns, (fn, cb) => {
                wrapAsync(fn).apply(that, callArgs.concat(cb));
            }, callback);
        });
        return go;
    };
}

function _asyncMap(eachfn, arr, iteratee, callback) {
    arr = arr || [];
    var results = [];
    var counter = 0;
    var _iteratee = wrapAsync(iteratee);

    return eachfn(arr, (value, _, iterCb) => {
        var index = counter++;
        _iteratee(value, (err, v) => {
            results[index] = v;
            iterCb(err);
        });
    }, err => {
        callback(err, results);
    });
}

function isArrayLike(value) {
    return value &&
        typeof value.length === 'number' &&
        value.length >= 0 &&
        value.length % 1 === 0;
}

// A temporary value used to identify if the loop should be broken.
// See #1064, #1293
const breakLoop = {};

function once(fn) {
    function wrapper (...args) {
        if (fn === null) return;
        var callFn = fn;
        fn = null;
        callFn.apply(this, args);
    }
    Object.assign(wrapper, fn);
    return wrapper
}

function getIterator (coll) {
    return coll[Symbol.iterator] && coll[Symbol.iterator]();
}

function createArrayIterator(coll) {
    var i = -1;
    var len = coll.length;
    return function next() {
        return ++i < len ? {value: coll[i], key: i} : null;
    }
}

function createES2015Iterator(iterator) {
    var i = -1;
    return function next() {
        var item = iterator.next();
        if (item.done)
            return null;
        i++;
        return {value: item.value, key: i};
    }
}

function createObjectIterator(obj) {
    var okeys = obj ? Object.keys(obj) : [];
    var i = -1;
    var len = okeys.length;
    return function next() {
        var key = okeys[++i];
        return i < len ? {value: obj[key], key} : null;
    };
}

function createIterator(coll) {
    if (isArrayLike(coll)) {
        return createArrayIterator(coll);
    }

    var iterator = getIterator(coll);
    return iterator ? createES2015Iterator(iterator) : createObjectIterator(coll);
}

function onlyOnce(fn) {
    return function (...args) {
        if (fn === null) throw new Error("Callback was already called.");
        var callFn = fn;
        fn = null;
        callFn.apply(this, args);
    };
}

// for async generators
function asyncEachOfLimit(generator, limit, iteratee, callback) {
    let done = false;
    let canceled = false;
    let awaiting = false;
    let running = 0;
    let idx = 0;

    function replenish() {
        //console.log('replenish')
        if (running >= limit || awaiting || done) return
        //console.log('replenish awaiting')
        awaiting = true;
        generator.next().then(({value, done: iterDone}) => {
            //console.log('got value', value)
            if (canceled || done) return
            awaiting = false;
            if (iterDone) {
                done = true;
                if (running <= 0) {
                    //console.log('done nextCb')
                    callback(null);
                }
                return;
            }
            running++;
            iteratee(value, idx, iterateeCallback);
            idx++;
            replenish();
        }).catch(handleError);
    }

    function iterateeCallback(err, result) {
        //console.log('iterateeCallback')
        running -= 1;
        if (canceled) return
        if (err) return handleError(err)

        if (err === false) {
            done = true;
            canceled = true;
            return
        }

        if (result === breakLoop || (done && running <= 0)) {
            done = true;
            //console.log('done iterCb')
            return callback(null);
        }
        replenish();
    }

    function handleError(err) {
        if (canceled) return
        awaiting = false;
        done = true;
        callback(err);
    }

    replenish();
}

var eachOfLimit = (limit) => {
    return (obj, iteratee, callback) => {
        callback = once(callback);
        if (limit <= 0) {
            throw new RangeError('concurrency limit cannot be less than 1')
        }
        if (!obj) {
            return callback(null);
        }
        if (isAsyncGenerator(obj)) {
            return asyncEachOfLimit(obj, limit, iteratee, callback)
        }
        if (isAsyncIterable(obj)) {
            return asyncEachOfLimit(obj[Symbol.asyncIterator](), limit, iteratee, callback)
        }
        var nextElem = createIterator(obj);
        var done = false;
        var canceled = false;
        var running = 0;
        var looping = false;

        function iterateeCallback(err, value) {
            if (canceled) return
            running -= 1;
            if (err) {
                done = true;
                callback(err);
            }
            else if (err === false) {
                done = true;
                canceled = true;
            }
            else if (value === breakLoop || (done && running <= 0)) {
                done = true;
                return callback(null);
            }
            else if (!looping) {
                replenish();
            }
        }

        function replenish () {
            looping = true;
            while (running < limit && !done) {
                var elem = nextElem();
                if (elem === null) {
                    done = true;
                    if (running <= 0) {
                        callback(null);
                    }
                    return;
                }
                running += 1;
                iteratee(elem.value, elem.key, onlyOnce(iterateeCallback));
            }
            looping = false;
        }

        replenish();
    };
};

/**
 * The same as [`eachOf`]{@link module:Collections.eachOf} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name eachOfLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.eachOf]{@link module:Collections.eachOf}
 * @alias forEachOfLimit
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - An async function to apply to each
 * item in `coll`. The `key` is the item's key, or index in the case of an
 * array.
 * Invoked with (item, key, callback).
 * @param {Function} [callback] - A callback which is called when all
 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
 * @returns {Promise} a promise, if a callback is omitted
 */
function eachOfLimit$1(coll, limit, iteratee, callback) {
    return eachOfLimit(limit)(coll, wrapAsync(iteratee), callback);
}

var eachOfLimit$2 = awaitify(eachOfLimit$1, 4);

// eachOf implementation optimized for array-likes
function eachOfArrayLike(coll, iteratee, callback) {
    callback = once(callback);
    var index = 0,
        completed = 0,
        {length} = coll,
        canceled = false;
    if (length === 0) {
        callback(null);
    }

    function iteratorCallback(err, value) {
        if (err === false) {
            canceled = true;
        }
        if (canceled === true) return
        if (err) {
            callback(err);
        } else if ((++completed === length) || value === breakLoop) {
            callback(null);
        }
    }

    for (; index < length; index++) {
        iteratee(coll[index], index, onlyOnce(iteratorCallback));
    }
}

// a generic version of eachOf which can handle array, object, and iterator cases.
function eachOfGeneric (coll, iteratee, callback) {
    return eachOfLimit$2(coll, Infinity, iteratee, callback);
}

/**
 * Like [`each`]{@link module:Collections.each}, except that it passes the key (or index) as the second argument
 * to the iteratee.
 *
 * @name eachOf
 * @static
 * @memberOf module:Collections
 * @method
 * @alias forEachOf
 * @category Collection
 * @see [async.each]{@link module:Collections.each}
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A function to apply to each
 * item in `coll`.
 * The `key` is the item's key, or index in the case of an array.
 * Invoked with (item, key, callback).
 * @param {Function} [callback] - A callback which is called when all
 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
 * @returns {Promise} a promise, if a callback is omitted
 * @example
 *
 * var obj = {dev: "/dev.json", test: "/test.json", prod: "/prod.json"};
 * var configs = {};
 *
 * async.forEachOf(obj, function (value, key, callback) {
 *     fs.readFile(__dirname + value, "utf8", function (err, data) {
 *         if (err) return callback(err);
 *         try {
 *             configs[key] = JSON.parse(data);
 *         } catch (e) {
 *             return callback(e);
 *         }
 *         callback();
 *     });
 * }, function (err) {
 *     if (err) console.error(err.message);
 *     // configs is now a map of JSON data
 *     doSomethingWith(configs);
 * });
 */
function eachOf(coll, iteratee, callback) {
    var eachOfImplementation = isArrayLike(coll) ? eachOfArrayLike : eachOfGeneric;
    return eachOfImplementation(coll, wrapAsync(iteratee), callback);
}

var eachOf$1 = awaitify(eachOf, 3);

/**
 * Produces a new collection of values by mapping each value in `coll` through
 * the `iteratee` function. The `iteratee` is called with an item from `coll`
 * and a callback for when it has finished processing. Each of these callback
 * takes 2 arguments: an `error`, and the transformed item from `coll`. If
 * `iteratee` passes an error to its callback, the main `callback` (for the
 * `map` function) is immediately called with the error.
 *
 * Note, that since this function applies the `iteratee` to each item in
 * parallel, there is no guarantee that the `iteratee` functions will complete
 * in order. However, the results array will be in the same order as the
 * original `coll`.
 *
 * If `map` is passed an Object, the results will be an Array.  The results
 * will roughly be in the order of the original Objects' keys (but this can
 * vary across JavaScript engines).
 *
 * @name map
 * @static
 * @memberOf module:Collections
 * @method
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with the transformed item.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Results is an Array of the
 * transformed items from the `coll`. Invoked with (err, results).
 * @returns {Promise} a promise, if no callback is passed
 * @example
 *
 * async.map(['file1','file2','file3'], fs.stat, function(err, results) {
 *     // results is now an array of stats for each file
 * });
 */
function map (coll, iteratee, callback) {
    return _asyncMap(eachOf$1, coll, iteratee, callback)
}
var map$1 = awaitify(map, 3);

/**
 * Applies the provided arguments to each function in the array, calling
 * `callback` after all functions have completed. If you only provide the first
 * argument, `fns`, then it will return a function which lets you pass in the
 * arguments as if it were a single function call. If more arguments are
 * provided, `callback` is required while `args` is still optional. The results
 * for each of the applied async functions are passed to the final callback
 * as an array.
 *
 * @name applyEach
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array|Iterable|AsyncIterable|Object} fns - A collection of {@link AsyncFunction}s
 * to all call with the same arguments
 * @param {...*} [args] - any number of separate arguments to pass to the
 * function.
 * @param {Function} [callback] - the final argument should be the callback,
 * called when all functions have completed processing.
 * @returns {AsyncFunction} - Returns a function that takes no args other than
 * an optional callback, that is the result of applying the `args` to each
 * of the functions.
 * @example
 *
 * const appliedFn = async.applyEach([enableSearch, updateSchema], 'bucket')
 *
 * appliedFn((err, results) => {
 *     // results[0] is the results for `enableSearch`
 *     // results[1] is the results for `updateSchema`
 * });
 *
 * // partial application example:
 * async.each(
 *     buckets,
 *     async (bucket) => async.applyEach([enableSearch, updateSchema], bucket)(),
 *     callback
 * );
 */
var applyEach$1 = applyEach(map$1);

/**
 * The same as [`eachOf`]{@link module:Collections.eachOf} but runs only a single async operation at a time.
 *
 * @name eachOfSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.eachOf]{@link module:Collections.eachOf}
 * @alias forEachOfSeries
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * Invoked with (item, key, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Invoked with (err).
 * @returns {Promise} a promise, if a callback is omitted
 */
function eachOfSeries(coll, iteratee, callback) {
    return eachOfLimit$2(coll, 1, iteratee, callback)
}
var eachOfSeries$1 = awaitify(eachOfSeries, 3);

/**
 * The same as [`map`]{@link module:Collections.map} but runs only a single async operation at a time.
 *
 * @name mapSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.map]{@link module:Collections.map}
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with the transformed item.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Results is an array of the
 * transformed items from the `coll`. Invoked with (err, results).
 * @returns {Promise} a promise, if no callback is passed
 */
function mapSeries (coll, iteratee, callback) {
    return _asyncMap(eachOfSeries$1, coll, iteratee, callback)
}
var mapSeries$1 = awaitify(mapSeries, 3);

/**
 * The same as [`applyEach`]{@link module:ControlFlow.applyEach} but runs only a single async operation at a time.
 *
 * @name applyEachSeries
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.applyEach]{@link module:ControlFlow.applyEach}
 * @category Control Flow
 * @param {Array|Iterable|AsyncIterable|Object} fns - A collection of {@link AsyncFunction}s to all
 * call with the same arguments
 * @param {...*} [args] - any number of separate arguments to pass to the
 * function.
 * @param {Function} [callback] - the final argument should be the callback,
 * called when all functions have completed processing.
 * @returns {AsyncFunction} - A function, that when called, is the result of
 * appling the `args` to the list of functions.  It takes no args, other than
 * a callback.
 */
var applyEachSeries = applyEach(mapSeries$1);

const PROMISE_SYMBOL = Symbol('promiseCallback');

function promiseCallback () {
    let resolve, reject;
    function callback (err, ...args) {
        if (err) return reject(err)
        resolve(args.length > 1 ? args : args[0]);
    }

    callback[PROMISE_SYMBOL] = new Promise((res, rej) => {
        resolve = res,
        reject = rej;
    });

    return callback
}

/**
 * Determines the best order for running the {@link AsyncFunction}s in `tasks`, based on
 * their requirements. Each function can optionally depend on other functions
 * being completed first, and each function is run as soon as its requirements
 * are satisfied.
 *
 * If any of the {@link AsyncFunction}s pass an error to their callback, the `auto` sequence
 * will stop. Further tasks will not execute (so any other functions depending
 * on it will not run), and the main `callback` is immediately called with the
 * error.
 *
 * {@link AsyncFunction}s also receive an object containing the results of functions which
 * have completed so far as the first argument, if they have dependencies. If a
 * task function has no dependencies, it will only be passed a callback.
 *
 * @name auto
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Object} tasks - An object. Each of its properties is either a
 * function or an array of requirements, with the {@link AsyncFunction} itself the last item
 * in the array. The object's key of a property serves as the name of the task
 * defined by that property, i.e. can be used when specifying requirements for
 * other tasks. The function receives one or two arguments:
 * * a `results` object, containing the results of the previously executed
 *   functions, only passed if the task has any dependencies,
 * * a `callback(err, result)` function, which must be called when finished,
 *   passing an `error` (which can be `null`) and the result of the function's
 *   execution.
 * @param {number} [concurrency=Infinity] - An optional `integer` for
 * determining the maximum number of tasks that can be run in parallel. By
 * default, as many as possible.
 * @param {Function} [callback] - An optional callback which is called when all
 * the tasks have been completed. It receives the `err` argument if any `tasks`
 * pass an error to their callback. Results are always returned; however, if an
 * error occurs, no further `tasks` will be performed, and the results object
 * will only contain partial results. Invoked with (err, results).
 * @returns {Promise} a promise, if a callback is not passed
 * @example
 *
 * async.auto({
 *     // this function will just be passed a callback
 *     readData: async.apply(fs.readFile, 'data.txt', 'utf-8'),
 *     showData: ['readData', function(results, cb) {
 *         // results.readData is the file's contents
 *         // ...
 *     }]
 * }, callback);
 *
 * async.auto({
 *     get_data: function(callback) {
 *         console.log('in get_data');
 *         // async code to get some data
 *         callback(null, 'data', 'converted to array');
 *     },
 *     make_folder: function(callback) {
 *         console.log('in make_folder');
 *         // async code to create a directory to store a file in
 *         // this is run at the same time as getting the data
 *         callback(null, 'folder');
 *     },
 *     write_file: ['get_data', 'make_folder', function(results, callback) {
 *         console.log('in write_file', JSON.stringify(results));
 *         // once there is some data and the directory exists,
 *         // write the data to a file in the directory
 *         callback(null, 'filename');
 *     }],
 *     email_link: ['write_file', function(results, callback) {
 *         console.log('in email_link', JSON.stringify(results));
 *         // once the file is written let's email a link to it...
 *         // results.write_file contains the filename returned by write_file.
 *         callback(null, {'file':results.write_file, 'email':'user@example.com'});
 *     }]
 * }, function(err, results) {
 *     console.log('err = ', err);
 *     console.log('results = ', results);
 * });
 */
function auto(tasks, concurrency, callback) {
    if (typeof concurrency !== 'number') {
        // concurrency is optional, shift the args.
        callback = concurrency;
        concurrency = null;
    }
    callback = once(callback || promiseCallback());
    var numTasks = Object.keys(tasks).length;
    if (!numTasks) {
        return callback(null);
    }
    if (!concurrency) {
        concurrency = numTasks;
    }

    var results = {};
    var runningTasks = 0;
    var canceled = false;
    var hasError = false;

    var listeners = Object.create(null);

    var readyTasks = [];

    // for cycle detection:
    var readyToCheck = []; // tasks that have been identified as reachable
    // without the possibility of returning to an ancestor task
    var uncheckedDependencies = {};

    Object.keys(tasks).forEach(key => {
        var task = tasks[key];
        if (!Array.isArray(task)) {
            // no dependencies
            enqueueTask(key, [task]);
            readyToCheck.push(key);
            return;
        }

        var dependencies = task.slice(0, task.length - 1);
        var remainingDependencies = dependencies.length;
        if (remainingDependencies === 0) {
            enqueueTask(key, task);
            readyToCheck.push(key);
            return;
        }
        uncheckedDependencies[key] = remainingDependencies;

        dependencies.forEach(dependencyName => {
            if (!tasks[dependencyName]) {
                throw new Error('async.auto task `' + key +
                    '` has a non-existent dependency `' +
                    dependencyName + '` in ' +
                    dependencies.join(', '));
            }
            addListener(dependencyName, () => {
                remainingDependencies--;
                if (remainingDependencies === 0) {
                    enqueueTask(key, task);
                }
            });
        });
    });

    checkForDeadlocks();
    processQueue();

    function enqueueTask(key, task) {
        readyTasks.push(() => runTask(key, task));
    }

    function processQueue() {
        if (canceled) return
        if (readyTasks.length === 0 && runningTasks === 0) {
            return callback(null, results);
        }
        while(readyTasks.length && runningTasks < concurrency) {
            var run = readyTasks.shift();
            run();
        }

    }

    function addListener(taskName, fn) {
        var taskListeners = listeners[taskName];
        if (!taskListeners) {
            taskListeners = listeners[taskName] = [];
        }

        taskListeners.push(fn);
    }

    function taskComplete(taskName) {
        var taskListeners = listeners[taskName] || [];
        taskListeners.forEach(fn => fn());
        processQueue();
    }


    function runTask(key, task) {
        if (hasError) return;

        var taskCallback = onlyOnce((err, ...result) => {
            runningTasks--;
            if (err === false) {
                canceled = true;
                return
            }
            if (result.length < 2) {
                [result] = result;
            }
            if (err) {
                var safeResults = {};
                Object.keys(results).forEach(rkey => {
                    safeResults[rkey] = results[rkey];
                });
                safeResults[key] = result;
                hasError = true;
                listeners = Object.create(null);
                if (canceled) return
                callback(err, safeResults);
            } else {
                results[key] = result;
                taskComplete(key);
            }
        });

        runningTasks++;
        var taskFn = wrapAsync(task[task.length - 1]);
        if (task.length > 1) {
            taskFn(results, taskCallback);
        } else {
            taskFn(taskCallback);
        }
    }

    function checkForDeadlocks() {
        // Kahn's algorithm
        // https://en.wikipedia.org/wiki/Topological_sorting#Kahn.27s_algorithm
        // http://connalle.blogspot.com/2013/10/topological-sortingkahn-algorithm.html
        var currentTask;
        var counter = 0;
        while (readyToCheck.length) {
            currentTask = readyToCheck.pop();
            counter++;
            getDependents(currentTask).forEach(dependent => {
                if (--uncheckedDependencies[dependent] === 0) {
                    readyToCheck.push(dependent);
                }
            });
        }

        if (counter !== numTasks) {
            throw new Error(
                'async.auto cannot execute tasks due to a recursive dependency'
            );
        }
    }

    function getDependents(taskName) {
        var result = [];
        Object.keys(tasks).forEach(key => {
            const task = tasks[key];
            if (Array.isArray(task) && task.indexOf(taskName) >= 0) {
                result.push(key);
            }
        });
        return result;
    }

    return callback[PROMISE_SYMBOL]
}

var FN_ARGS = /^(?:async\s+)?(?:function)?\s*\w*\s*\(\s*([^)]+)\s*\)(?:\s*{)/;
var ARROW_FN_ARGS = /^(?:async\s+)?\(?\s*([^)=]+)\s*\)?(?:\s*=>)/;
var FN_ARG_SPLIT = /,/;
var FN_ARG = /(=.+)?(\s*)$/;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

function parseParams(func) {
    const src = func.toString().replace(STRIP_COMMENTS, '');
    let match = src.match(FN_ARGS);
    if (!match) {
        match = src.match(ARROW_FN_ARGS);
    }
    if (!match) throw new Error('could not parse args in autoInject\nSource:\n' + src)
    let [, args] = match;
    return args
        .replace(/\s/g, '')
        .split(FN_ARG_SPLIT)
        .map((arg) => arg.replace(FN_ARG, '').trim());
}

/**
 * A dependency-injected version of the [async.auto]{@link module:ControlFlow.auto} function. Dependent
 * tasks are specified as parameters to the function, after the usual callback
 * parameter, with the parameter names matching the names of the tasks it
 * depends on. This can provide even more readable task graphs which can be
 * easier to maintain.
 *
 * If a final callback is specified, the task results are similarly injected,
 * specified as named parameters after the initial error parameter.
 *
 * The autoInject function is purely syntactic sugar and its semantics are
 * otherwise equivalent to [async.auto]{@link module:ControlFlow.auto}.
 *
 * @name autoInject
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.auto]{@link module:ControlFlow.auto}
 * @category Control Flow
 * @param {Object} tasks - An object, each of whose properties is an {@link AsyncFunction} of
 * the form 'func([dependencies...], callback). The object's key of a property
 * serves as the name of the task defined by that property, i.e. can be used
 * when specifying requirements for other tasks.
 * * The `callback` parameter is a `callback(err, result)` which must be called
 *   when finished, passing an `error` (which can be `null`) and the result of
 *   the function's execution. The remaining parameters name other tasks on
 *   which the task is dependent, and the results from those tasks are the
 *   arguments of those parameters.
 * @param {Function} [callback] - An optional callback which is called when all
 * the tasks have been completed. It receives the `err` argument if any `tasks`
 * pass an error to their callback, and a `results` object with any completed
 * task results, similar to `auto`.
 * @returns {Promise} a promise, if no callback is passed
 * @example
 *
 * //  The example from `auto` can be rewritten as follows:
 * async.autoInject({
 *     get_data: function(callback) {
 *         // async code to get some data
 *         callback(null, 'data', 'converted to array');
 *     },
 *     make_folder: function(callback) {
 *         // async code to create a directory to store a file in
 *         // this is run at the same time as getting the data
 *         callback(null, 'folder');
 *     },
 *     write_file: function(get_data, make_folder, callback) {
 *         // once there is some data and the directory exists,
 *         // write the data to a file in the directory
 *         callback(null, 'filename');
 *     },
 *     email_link: function(write_file, callback) {
 *         // once the file is written let's email a link to it...
 *         // write_file contains the filename returned by write_file.
 *         callback(null, {'file':write_file, 'email':'user@example.com'});
 *     }
 * }, function(err, results) {
 *     console.log('err = ', err);
 *     console.log('email_link = ', results.email_link);
 * });
 *
 * // If you are using a JS minifier that mangles parameter names, `autoInject`
 * // will not work with plain functions, since the parameter names will be
 * // collapsed to a single letter identifier.  To work around this, you can
 * // explicitly specify the names of the parameters your task function needs
 * // in an array, similar to Angular.js dependency injection.
 *
 * // This still has an advantage over plain `auto`, since the results a task
 * // depends on are still spread into arguments.
 * async.autoInject({
 *     //...
 *     write_file: ['get_data', 'make_folder', function(get_data, make_folder, callback) {
 *         callback(null, 'filename');
 *     }],
 *     email_link: ['write_file', function(write_file, callback) {
 *         callback(null, {'file':write_file, 'email':'user@example.com'});
 *     }]
 *     //...
 * }, function(err, results) {
 *     console.log('err = ', err);
 *     console.log('email_link = ', results.email_link);
 * });
 */
function autoInject(tasks, callback) {
    var newTasks = {};

    Object.keys(tasks).forEach(key => {
        var taskFn = tasks[key];
        var params;
        var fnIsAsync = isAsync(taskFn);
        var hasNoDeps =
            (!fnIsAsync && taskFn.length === 1) ||
            (fnIsAsync && taskFn.length === 0);

        if (Array.isArray(taskFn)) {
            params = [...taskFn];
            taskFn = params.pop();

            newTasks[key] = params.concat(params.length > 0 ? newTask : taskFn);
        } else if (hasNoDeps) {
            // no dependencies, use the function as-is
            newTasks[key] = taskFn;
        } else {
            params = parseParams(taskFn);
            if ((taskFn.length === 0 && !fnIsAsync) && params.length === 0) {
                throw new Error("autoInject task functions require explicit parameters.");
            }

            // remove callback param
            if (!fnIsAsync) params.pop();

            newTasks[key] = params.concat(newTask);
        }

        function newTask(results, taskCb) {
            var newArgs = params.map(name => results[name]);
            newArgs.push(taskCb);
            wrapAsync(taskFn)(...newArgs);
        }
    });

    return auto(newTasks, callback);
}

// Simple doubly linked list (https://en.wikipedia.org/wiki/Doubly_linked_list) implementation
// used for queues. This implementation assumes that the node provided by the user can be modified
// to adjust the next and last properties. We implement only the minimal functionality
// for queue support.
class DLL {
    constructor() {
        this.head = this.tail = null;
        this.length = 0;
    }

    removeLink(node) {
        if (node.prev) node.prev.next = node.next;
        else this.head = node.next;
        if (node.next) node.next.prev = node.prev;
        else this.tail = node.prev;

        node.prev = node.next = null;
        this.length -= 1;
        return node;
    }

    empty () {
        while(this.head) this.shift();
        return this;
    }

    insertAfter(node, newNode) {
        newNode.prev = node;
        newNode.next = node.next;
        if (node.next) node.next.prev = newNode;
        else this.tail = newNode;
        node.next = newNode;
        this.length += 1;
    }

    insertBefore(node, newNode) {
        newNode.prev = node.prev;
        newNode.next = node;
        if (node.prev) node.prev.next = newNode;
        else this.head = newNode;
        node.prev = newNode;
        this.length += 1;
    }

    unshift(node) {
        if (this.head) this.insertBefore(this.head, node);
        else setInitial(this, node);
    }

    push(node) {
        if (this.tail) this.insertAfter(this.tail, node);
        else setInitial(this, node);
    }

    shift() {
        return this.head && this.removeLink(this.head);
    }

    pop() {
        return this.tail && this.removeLink(this.tail);
    }

    toArray() {
        return [...this]
    }

    *[Symbol.iterator] () {
        var cur = this.head;
        while (cur) {
            yield cur.data;
            cur = cur.next;
        }
    }

    remove (testFn) {
        var curr = this.head;
        while(curr) {
            var {next} = curr;
            if (testFn(curr)) {
                this.removeLink(curr);
            }
            curr = next;
        }
        return this;
    }
}

function setInitial(dll, node) {
    dll.length = 1;
    dll.head = dll.tail = node;
}

function queue(worker, concurrency, payload) {
    if (concurrency == null) {
        concurrency = 1;
    }
    else if(concurrency === 0) {
        throw new RangeError('Concurrency must not be zero');
    }

    var _worker = wrapAsync(worker);
    var numRunning = 0;
    var workersList = [];
    const events = {
        error: [],
        drain: [],
        saturated: [],
        unsaturated: [],
        empty: []
    };

    function on (event, handler) {
        events[event].push(handler);
    }

    function once (event, handler) {
        const handleAndRemove = (...args) => {
            off(event, handleAndRemove);
            handler(...args);
        };
        events[event].push(handleAndRemove);
    }

    function off (event, handler) {
        if (!event) return Object.keys(events).forEach(ev => events[ev] = [])
        if (!handler) return events[event] = []
        events[event] = events[event].filter(ev => ev !== handler);
    }

    function trigger (event, ...args) {
        events[event].forEach(handler => handler(...args));
    }

    var processingScheduled = false;
    function _insert(data, insertAtFront, rejectOnError, callback) {
        if (callback != null && typeof callback !== 'function') {
            throw new Error('task callback must be a function');
        }
        q.started = true;

        var res, rej;
        function promiseCallback (err, ...args) {
            // we don't care about the error, let the global error handler
            // deal with it
            if (err) return rejectOnError ? rej(err) : res()
            if (args.length <= 1) return res(args[0])
            res(args);
        }

        var item = {
            data,
            callback: rejectOnError ?
                promiseCallback :
                (callback || promiseCallback)
        };

        if (insertAtFront) {
            q._tasks.unshift(item);
        } else {
            q._tasks.push(item);
        }

        if (!processingScheduled) {
            processingScheduled = true;
            setImmediate$1(() => {
                processingScheduled = false;
                q.process();
            });
        }

        if (rejectOnError || !callback) {
            return new Promise((resolve, reject) => {
                res = resolve;
                rej = reject;
            })
        }
    }

    function _createCB(tasks) {
        return function (err, ...args) {
            numRunning -= 1;

            for (var i = 0, l = tasks.length; i < l; i++) {
                var task = tasks[i];

                var index = workersList.indexOf(task);
                if (index === 0) {
                    workersList.shift();
                } else if (index > 0) {
                    workersList.splice(index, 1);
                }

                task.callback(err, ...args);

                if (err != null) {
                    trigger('error', err, task.data);
                }
            }

            if (numRunning <= (q.concurrency - q.buffer) ) {
                trigger('unsaturated');
            }

            if (q.idle()) {
                trigger('drain');
            }
            q.process();
        };
    }

    function _maybeDrain(data) {
        if (data.length === 0 && q.idle()) {
            // call drain immediately if there are no tasks
            setImmediate$1(() => trigger('drain'));
            return true
        }
        return false
    }

    const eventMethod = (name) => (handler) => {
        if (!handler) {
            return new Promise((resolve, reject) => {
                once(name, (err, data) => {
                    if (err) return reject(err)
                    resolve(data);
                });
            })
        }
        off(name);
        on(name, handler);

    };

    var isProcessing = false;
    var q = {
        _tasks: new DLL(),
        *[Symbol.iterator] () {
            yield* q._tasks[Symbol.iterator]();
        },
        concurrency,
        payload,
        buffer: concurrency / 4,
        started: false,
        paused: false,
        push (data, callback) {
            if (Array.isArray(data)) {
                if (_maybeDrain(data)) return
                return data.map(datum => _insert(datum, false, false, callback))
            }
            return _insert(data, false, false, callback);
        },
        pushAsync (data, callback) {
            if (Array.isArray(data)) {
                if (_maybeDrain(data)) return
                return data.map(datum => _insert(datum, false, true, callback))
            }
            return _insert(data, false, true, callback);
        },
        kill () {
            off();
            q._tasks.empty();
        },
        unshift (data, callback) {
            if (Array.isArray(data)) {
                if (_maybeDrain(data)) return
                return data.map(datum => _insert(datum, true, false, callback))
            }
            return _insert(data, true, false, callback);
        },
        unshiftAsync (data, callback) {
            if (Array.isArray(data)) {
                if (_maybeDrain(data)) return
                return data.map(datum => _insert(datum, true, true, callback))
            }
            return _insert(data, true, true, callback);
        },
        remove (testFn) {
            q._tasks.remove(testFn);
        },
        process () {
            // Avoid trying to start too many processing operations. This can occur
            // when callbacks resolve synchronously (#1267).
            if (isProcessing) {
                return;
            }
            isProcessing = true;
            while(!q.paused && numRunning < q.concurrency && q._tasks.length){
                var tasks = [], data = [];
                var l = q._tasks.length;
                if (q.payload) l = Math.min(l, q.payload);
                for (var i = 0; i < l; i++) {
                    var node = q._tasks.shift();
                    tasks.push(node);
                    workersList.push(node);
                    data.push(node.data);
                }

                numRunning += 1;

                if (q._tasks.length === 0) {
                    trigger('empty');
                }

                if (numRunning === q.concurrency) {
                    trigger('saturated');
                }

                var cb = onlyOnce(_createCB(tasks));
                _worker(data, cb);
            }
            isProcessing = false;
        },
        length () {
            return q._tasks.length;
        },
        running () {
            return numRunning;
        },
        workersList () {
            return workersList;
        },
        idle() {
            return q._tasks.length + numRunning === 0;
        },
        pause () {
            q.paused = true;
        },
        resume () {
            if (q.paused === false) { return; }
            q.paused = false;
            setImmediate$1(q.process);
        }
    };
    // define these as fixed properties, so people get useful errors when updating
    Object.defineProperties(q, {
        saturated: {
            writable: false,
            value: eventMethod('saturated')
        },
        unsaturated: {
            writable: false,
            value: eventMethod('unsaturated')
        },
        empty: {
            writable: false,
            value: eventMethod('empty')
        },
        drain: {
            writable: false,
            value: eventMethod('drain')
        },
        error: {
            writable: false,
            value: eventMethod('error')
        },
    });
    return q;
}

/**
 * Creates a `cargo` object with the specified payload. Tasks added to the
 * cargo will be processed altogether (up to the `payload` limit). If the
 * `worker` is in progress, the task is queued until it becomes available. Once
 * the `worker` has completed some tasks, each callback of those tasks is
 * called. Check out [these](https://camo.githubusercontent.com/6bbd36f4cf5b35a0f11a96dcd2e97711ffc2fb37/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313637363837312f36383130382f62626330636662302d356632392d313165322d393734662d3333393763363464633835382e676966) [animations](https://camo.githubusercontent.com/f4810e00e1c5f5f8addbe3e9f49064fd5d102699/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313637363837312f36383130312f38346339323036362d356632392d313165322d383134662d3964336430323431336266642e676966)
 * for how `cargo` and `queue` work.
 *
 * While [`queue`]{@link module:ControlFlow.queue} passes only one task to one of a group of workers
 * at a time, cargo passes an array of tasks to a single worker, repeating
 * when the worker is finished.
 *
 * @name cargo
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.queue]{@link module:ControlFlow.queue}
 * @category Control Flow
 * @param {AsyncFunction} worker - An asynchronous function for processing an array
 * of queued tasks. Invoked with `(tasks, callback)`.
 * @param {number} [payload=Infinity] - An optional `integer` for determining
 * how many tasks should be processed per round; if omitted, the default is
 * unlimited.
 * @returns {module:ControlFlow.QueueObject} A cargo object to manage the tasks. Callbacks can
 * attached as certain properties to listen for specific events during the
 * lifecycle of the cargo and inner queue.
 * @example
 *
 * // create a cargo object with payload 2
 * var cargo = async.cargo(function(tasks, callback) {
 *     for (var i=0; i<tasks.length; i++) {
 *         console.log('hello ' + tasks[i].name);
 *     }
 *     callback();
 * }, 2);
 *
 * // add some items
 * cargo.push({name: 'foo'}, function(err) {
 *     console.log('finished processing foo');
 * });
 * cargo.push({name: 'bar'}, function(err) {
 *     console.log('finished processing bar');
 * });
 * await cargo.push({name: 'baz'});
 * console.log('finished processing baz');
 */
function cargo(worker, payload) {
    return queue(worker, 1, payload);
}

/**
 * Creates a `cargoQueue` object with the specified payload. Tasks added to the
 * cargoQueue will be processed together (up to the `payload` limit) in `concurrency` parallel workers.
 * If the all `workers` are in progress, the task is queued until one becomes available. Once
 * a `worker` has completed some tasks, each callback of those tasks is
 * called. Check out [these](https://camo.githubusercontent.com/6bbd36f4cf5b35a0f11a96dcd2e97711ffc2fb37/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313637363837312f36383130382f62626330636662302d356632392d313165322d393734662d3333393763363464633835382e676966) [animations](https://camo.githubusercontent.com/f4810e00e1c5f5f8addbe3e9f49064fd5d102699/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313637363837312f36383130312f38346339323036362d356632392d313165322d383134662d3964336430323431336266642e676966)
 * for how `cargo` and `queue` work.
 *
 * While [`queue`]{@link module:ControlFlow.queue} passes only one task to one of a group of workers
 * at a time, and [`cargo`]{@link module:ControlFlow.cargo} passes an array of tasks to a single worker,
 * the cargoQueue passes an array of tasks to multiple parallel workers.
 *
 * @name cargoQueue
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.queue]{@link module:ControlFlow.queue}
 * @see [async.cargo]{@link module:ControlFLow.cargo}
 * @category Control Flow
 * @param {AsyncFunction} worker - An asynchronous function for processing an array
 * of queued tasks. Invoked with `(tasks, callback)`.
 * @param {number} [concurrency=1] - An `integer` for determining how many
 * `worker` functions should be run in parallel.  If omitted, the concurrency
 * defaults to `1`.  If the concurrency is `0`, an error is thrown.
 * @param {number} [payload=Infinity] - An optional `integer` for determining
 * how many tasks should be processed per round; if omitted, the default is
 * unlimited.
 * @returns {module:ControlFlow.QueueObject} A cargoQueue object to manage the tasks. Callbacks can
 * attached as certain properties to listen for specific events during the
 * lifecycle of the cargoQueue and inner queue.
 * @example
 *
 * // create a cargoQueue object with payload 2 and concurrency 2
 * var cargoQueue = async.cargoQueue(function(tasks, callback) {
 *     for (var i=0; i<tasks.length; i++) {
 *         console.log('hello ' + tasks[i].name);
 *     }
 *     callback();
 * }, 2, 2);
 *
 * // add some items
 * cargoQueue.push({name: 'foo'}, function(err) {
 *     console.log('finished processing foo');
 * });
 * cargoQueue.push({name: 'bar'}, function(err) {
 *     console.log('finished processing bar');
 * });
 * cargoQueue.push({name: 'baz'}, function(err) {
 *     console.log('finished processing baz');
 * });
 * cargoQueue.push({name: 'boo'}, function(err) {
 *     console.log('finished processing boo');
 * });
 */
function cargo$1(worker, concurrency, payload) {
    return queue(worker, concurrency, payload);
}

/**
 * Reduces `coll` into a single value using an async `iteratee` to return each
 * successive step. `memo` is the initial state of the reduction. This function
 * only operates in series.
 *
 * For performance reasons, it may make sense to split a call to this function
 * into a parallel map, and then use the normal `Array.prototype.reduce` on the
 * results. This function is for situations where each step in the reduction
 * needs to be async; if you can get the data before reducing it, then it's
 * probably a good idea to do so.
 *
 * @name reduce
 * @static
 * @memberOf module:Collections
 * @method
 * @alias inject
 * @alias foldl
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {*} memo - The initial state of the reduction.
 * @param {AsyncFunction} iteratee - A function applied to each item in the
 * array to produce the next step in the reduction.
 * The `iteratee` should complete with the next state of the reduction.
 * If the iteratee complete with an error, the reduction is stopped and the
 * main `callback` is immediately called with the error.
 * Invoked with (memo, item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Result is the reduced value. Invoked with
 * (err, result).
 * @returns {Promise} a promise, if no callback is passed
 * @example
 *
 * async.reduce([1,2,3], 0, function(memo, item, callback) {
 *     // pointless async:
 *     process.nextTick(function() {
 *         callback(null, memo + item)
 *     });
 * }, function(err, result) {
 *     // result is now equal to the last value of memo, which is 6
 * });
 */
function reduce(coll, memo, iteratee, callback) {
    callback = once(callback);
    var _iteratee = wrapAsync(iteratee);
    return eachOfSeries$1(coll, (x, i, iterCb) => {
        _iteratee(memo, x, (err, v) => {
            memo = v;
            iterCb(err);
        });
    }, err => callback(err, memo));
}
var reduce$1 = awaitify(reduce, 4);

/**
 * Version of the compose function that is more natural to read. Each function
 * consumes the return value of the previous function. It is the equivalent of
 * [compose]{@link module:ControlFlow.compose} with the arguments reversed.
 *
 * Each function is executed with the `this` binding of the composed function.
 *
 * @name seq
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.compose]{@link module:ControlFlow.compose}
 * @category Control Flow
 * @param {...AsyncFunction} functions - the asynchronous functions to compose
 * @returns {Function} a function that composes the `functions` in order
 * @example
 *
 * // Requires lodash (or underscore), express3 and dresende's orm2.
 * // Part of an app, that fetches cats of the logged user.
 * // This example uses `seq` function to avoid overnesting and error
 * // handling clutter.
 * app.get('/cats', function(request, response) {
 *     var User = request.models.User;
 *     async.seq(
 *         _.bind(User.get, User),  // 'User.get' has signature (id, callback(err, data))
 *         function(user, fn) {
 *             user.getCats(fn);      // 'getCats' has signature (callback(err, data))
 *         }
 *     )(req.session.user_id, function (err, cats) {
 *         if (err) {
 *             console.error(err);
 *             response.json({ status: 'error', message: err.message });
 *         } else {
 *             response.json({ status: 'ok', message: 'Cats found', data: cats });
 *         }
 *     });
 * });
 */
function seq(...functions) {
    var _functions = functions.map(wrapAsync);
    return function (...args) {
        var that = this;

        var cb = args[args.length - 1];
        if (typeof cb == 'function') {
            args.pop();
        } else {
            cb = promiseCallback();
        }

        reduce$1(_functions, args, (newargs, fn, iterCb) => {
            fn.apply(that, newargs.concat((err, ...nextargs) => {
                iterCb(err, nextargs);
            }));
        },
        (err, results) => cb(err, ...results));

        return cb[PROMISE_SYMBOL]
    };
}

/**
 * Creates a function which is a composition of the passed asynchronous
 * functions. Each function consumes the return value of the function that
 * follows. Composing functions `f()`, `g()`, and `h()` would produce the result
 * of `f(g(h()))`, only this version uses callbacks to obtain the return values.
 *
 * If the last argument to the composed function is not a function, a promise
 * is returned when you call it.
 *
 * Each function is executed with the `this` binding of the composed function.
 *
 * @name compose
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {...AsyncFunction} functions - the asynchronous functions to compose
 * @returns {Function} an asynchronous function that is the composed
 * asynchronous `functions`
 * @example
 *
 * function add1(n, callback) {
 *     setTimeout(function () {
 *         callback(null, n + 1);
 *     }, 10);
 * }
 *
 * function mul3(n, callback) {
 *     setTimeout(function () {
 *         callback(null, n * 3);
 *     }, 10);
 * }
 *
 * var add1mul3 = async.compose(mul3, add1);
 * add1mul3(4, function (err, result) {
 *     // result now equals 15
 * });
 */
function compose(...args) {
    return seq(...args.reverse());
}

/**
 * The same as [`map`]{@link module:Collections.map} but runs a maximum of `limit` async operations at a time.
 *
 * @name mapLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.map]{@link module:Collections.map}
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with the transformed item.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Results is an array of the
 * transformed items from the `coll`. Invoked with (err, results).
 * @returns {Promise} a promise, if no callback is passed
 */
function mapLimit (coll, limit, iteratee, callback) {
    return _asyncMap(eachOfLimit(limit), coll, iteratee, callback)
}
var mapLimit$1 = awaitify(mapLimit, 4);

/**
 * The same as [`concat`]{@link module:Collections.concat} but runs a maximum of `limit` async operations at a time.
 *
 * @name concatLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.concat]{@link module:Collections.concat}
 * @category Collection
 * @alias flatMapLimit
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - A function to apply to each item in `coll`,
 * which should use an array as its result. Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished, or an error occurs. Results is an array
 * containing the concatenated results of the `iteratee` function. Invoked with
 * (err, results).
 * @returns A Promise, if no callback is passed
 */
function concatLimit(coll, limit, iteratee, callback) {
    var _iteratee = wrapAsync(iteratee);
    return mapLimit$1(coll, limit, (val, iterCb) => {
        _iteratee(val, (err, ...args) => {
            if (err) return iterCb(err);
            return iterCb(err, args);
        });
    }, (err, mapResults) => {
        var result = [];
        for (var i = 0; i < mapResults.length; i++) {
            if (mapResults[i]) {
                result = result.concat(...mapResults[i]);
            }
        }

        return callback(err, result);
    });
}
var concatLimit$1 = awaitify(concatLimit, 4);

/**
 * Applies `iteratee` to each item in `coll`, concatenating the results. Returns
 * the concatenated list. The `iteratee`s are called in parallel, and the
 * results are concatenated as they return. The results array will be returned in
 * the original order of `coll` passed to the `iteratee` function.
 *
 * @name concat
 * @static
 * @memberOf module:Collections
 * @method
 * @category Collection
 * @alias flatMap
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A function to apply to each item in `coll`,
 * which should use an array as its result. Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished, or an error occurs. Results is an array
 * containing the concatenated results of the `iteratee` function. Invoked with
 * (err, results).
 * @returns A Promise, if no callback is passed
 * @example
 *
 * async.concat(['dir1','dir2','dir3'], fs.readdir, function(err, files) {
 *     // files is now a list of filenames that exist in the 3 directories
 * });
 */
function concat(coll, iteratee, callback) {
    return concatLimit$1(coll, Infinity, iteratee, callback)
}
var concat$1 = awaitify(concat, 3);

/**
 * The same as [`concat`]{@link module:Collections.concat} but runs only a single async operation at a time.
 *
 * @name concatSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.concat]{@link module:Collections.concat}
 * @category Collection
 * @alias flatMapSeries
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A function to apply to each item in `coll`.
 * The iteratee should complete with an array an array of results.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished, or an error occurs. Results is an array
 * containing the concatenated results of the `iteratee` function. Invoked with
 * (err, results).
 * @returns A Promise, if no callback is passed
 */
function concatSeries(coll, iteratee, callback) {
    return concatLimit$1(coll, 1, iteratee, callback)
}
var concatSeries$1 = awaitify(concatSeries, 3);

/**
 * Returns a function that when called, calls-back with the values provided.
 * Useful as the first function in a [`waterfall`]{@link module:ControlFlow.waterfall}, or for plugging values in to
 * [`auto`]{@link module:ControlFlow.auto}.
 *
 * @name constant
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {...*} arguments... - Any number of arguments to automatically invoke
 * callback with.
 * @returns {AsyncFunction} Returns a function that when invoked, automatically
 * invokes the callback with the previous given arguments.
 * @example
 *
 * async.waterfall([
 *     async.constant(42),
 *     function (value, next) {
 *         // value === 42
 *     },
 *     //...
 * ], callback);
 *
 * async.waterfall([
 *     async.constant(filename, "utf8"),
 *     fs.readFile,
 *     function (fileData, next) {
 *         //...
 *     }
 *     //...
 * ], callback);
 *
 * async.auto({
 *     hostname: async.constant("https://server.net/"),
 *     port: findFreePort,
 *     launchServer: ["hostname", "port", function (options, cb) {
 *         startServer(options, cb);
 *     }],
 *     //...
 * }, callback);
 */
function constant(...args) {
    return function (...ignoredArgs/*, callback*/) {
        var callback = ignoredArgs.pop();
        return callback(null, ...args);
    };
}

function _createTester(check, getResult) {
    return (eachfn, arr, _iteratee, cb) => {
        var testPassed = false;
        var testResult;
        const iteratee = wrapAsync(_iteratee);
        eachfn(arr, (value, _, callback) => {
            iteratee(value, (err, result) => {
                if (err || err === false) return callback(err);

                if (check(result) && !testResult) {
                    testPassed = true;
                    testResult = getResult(true, value);
                    return callback(null, breakLoop);
                }
                callback();
            });
        }, err => {
            if (err) return cb(err);
            cb(null, testPassed ? testResult : getResult(false));
        });
    };
}

/**
 * Returns the first value in `coll` that passes an async truth test. The
 * `iteratee` is applied in parallel, meaning the first iteratee to return
 * `true` will fire the detect `callback` with that result. That means the
 * result might not be the first item in the original `coll` (in terms of order)
 * that passes the test.

 * If order within the original `coll` is important, then look at
 * [`detectSeries`]{@link module:Collections.detectSeries}.
 *
 * @name detect
 * @static
 * @memberOf module:Collections
 * @method
 * @alias find
 * @category Collections
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A truth test to apply to each item in `coll`.
 * The iteratee must complete with a boolean value as its result.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called as soon as any
 * iteratee returns `true`, or after all the `iteratee` functions have finished.
 * Result will be the first item in the array that passes the truth test
 * (iteratee) or the value `undefined` if none passed. Invoked with
 * (err, result).
 * @returns A Promise, if no callback is passed
 * @example
 *
 * async.detect(['file1','file2','file3'], function(filePath, callback) {
 *     fs.access(filePath, function(err) {
 *         callback(null, !err)
 *     });
 * }, function(err, result) {
 *     // result now equals the first file in the list that exists
 * });
 */
function detect(coll, iteratee, callback) {
    return _createTester(bool => bool, (res, item) => item)(eachOf$1, coll, iteratee, callback)
}
var detect$1 = awaitify(detect, 3);

/**
 * The same as [`detect`]{@link module:Collections.detect} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name detectLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.detect]{@link module:Collections.detect}
 * @alias findLimit
 * @category Collections
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - A truth test to apply to each item in `coll`.
 * The iteratee must complete with a boolean value as its result.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called as soon as any
 * iteratee returns `true`, or after all the `iteratee` functions have finished.
 * Result will be the first item in the array that passes the truth test
 * (iteratee) or the value `undefined` if none passed. Invoked with
 * (err, result).
 * @returns a Promise if no callback is passed
 */
function detectLimit(coll, limit, iteratee, callback) {
    return _createTester(bool => bool, (res, item) => item)(eachOfLimit(limit), coll, iteratee, callback)
}
var detectLimit$1 = awaitify(detectLimit, 4);

/**
 * The same as [`detect`]{@link module:Collections.detect} but runs only a single async operation at a time.
 *
 * @name detectSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.detect]{@link module:Collections.detect}
 * @alias findSeries
 * @category Collections
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A truth test to apply to each item in `coll`.
 * The iteratee must complete with a boolean value as its result.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called as soon as any
 * iteratee returns `true`, or after all the `iteratee` functions have finished.
 * Result will be the first item in the array that passes the truth test
 * (iteratee) or the value `undefined` if none passed. Invoked with
 * (err, result).
 * @returns a Promise if no callback is passed
 */
function detectSeries(coll, iteratee, callback) {
    return _createTester(bool => bool, (res, item) => item)(eachOfLimit(1), coll, iteratee, callback)
}

var detectSeries$1 = awaitify(detectSeries, 3);

function consoleFunc(name) {
    return (fn, ...args) => wrapAsync(fn)(...args, (err, ...resultArgs) => {
        if (typeof console === 'object') {
            if (err) {
                if (console.error) {
                    console.error(err);
                }
            } else if (console[name]) {
                resultArgs.forEach(x => console[name](x));
            }
        }
    })
}

/**
 * Logs the result of an [`async` function]{@link AsyncFunction} to the
 * `console` using `console.dir` to display the properties of the resulting object.
 * Only works in Node.js or in browsers that support `console.dir` and
 * `console.error` (such as FF and Chrome).
 * If multiple arguments are returned from the async function,
 * `console.dir` is called on each argument in order.
 *
 * @name dir
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {AsyncFunction} function - The function you want to eventually apply
 * all arguments to.
 * @param {...*} arguments... - Any number of arguments to apply to the function.
 * @example
 *
 * // in a module
 * var hello = function(name, callback) {
 *     setTimeout(function() {
 *         callback(null, {hello: name});
 *     }, 1000);
 * };
 *
 * // in the node repl
 * node> async.dir(hello, 'world');
 * {hello: 'world'}
 */
var dir = consoleFunc('dir');

/**
 * The post-check version of [`whilst`]{@link module:ControlFlow.whilst}. To reflect the difference in
 * the order of operations, the arguments `test` and `iteratee` are switched.
 *
 * `doWhilst` is to `whilst` as `do while` is to `while` in plain JavaScript.
 *
 * @name doWhilst
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.whilst]{@link module:ControlFlow.whilst}
 * @category Control Flow
 * @param {AsyncFunction} iteratee - A function which is called each time `test`
 * passes. Invoked with (callback).
 * @param {AsyncFunction} test - asynchronous truth test to perform after each
 * execution of `iteratee`. Invoked with (...args, callback), where `...args` are the
 * non-error args from the previous callback of `iteratee`.
 * @param {Function} [callback] - A callback which is called after the test
 * function has failed and repeated execution of `iteratee` has stopped.
 * `callback` will be passed an error and any arguments passed to the final
 * `iteratee`'s callback. Invoked with (err, [results]);
 * @returns {Promise} a promise, if no callback is passed
 */
function doWhilst(iteratee, test, callback) {
    callback = onlyOnce(callback);
    var _fn = wrapAsync(iteratee);
    var _test = wrapAsync(test);
    var results;

    function next(err, ...args) {
        if (err) return callback(err);
        if (err === false) return;
        results = args;
        _test(...args, check);
    }

    function check(err, truth) {
        if (err) return callback(err);
        if (err === false) return;
        if (!truth) return callback(null, ...results);
        _fn(next);
    }

    return check(null, true);
}

var doWhilst$1 = awaitify(doWhilst, 3);

/**
 * Like ['doWhilst']{@link module:ControlFlow.doWhilst}, except the `test` is inverted. Note the
 * argument ordering differs from `until`.
 *
 * @name doUntil
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.doWhilst]{@link module:ControlFlow.doWhilst}
 * @category Control Flow
 * @param {AsyncFunction} iteratee - An async function which is called each time
 * `test` fails. Invoked with (callback).
 * @param {AsyncFunction} test - asynchronous truth test to perform after each
 * execution of `iteratee`. Invoked with (...args, callback), where `...args` are the
 * non-error args from the previous callback of `iteratee`
 * @param {Function} [callback] - A callback which is called after the test
 * function has passed and repeated execution of `iteratee` has stopped. `callback`
 * will be passed an error and any arguments passed to the final `iteratee`'s
 * callback. Invoked with (err, [results]);
 * @returns {Promise} a promise, if no callback is passed
 */
function doUntil(iteratee, test, callback) {
    const _test = wrapAsync(test);
    return doWhilst$1(iteratee, (...args) => {
        const cb = args.pop();
        _test(...args, (err, truth) => cb (err, !truth));
    }, callback);
}

function _withoutIndex(iteratee) {
    return (value, index, callback) => iteratee(value, callback);
}

/**
 * Applies the function `iteratee` to each item in `coll`, in parallel.
 * The `iteratee` is called with an item from the list, and a callback for when
 * it has finished. If the `iteratee` passes an error to its `callback`, the
 * main `callback` (for the `each` function) is immediately called with the
 * error.
 *
 * Note, that since this function applies `iteratee` to each item in parallel,
 * there is no guarantee that the iteratee functions will complete in order.
 *
 * @name each
 * @static
 * @memberOf module:Collections
 * @method
 * @alias forEach
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to
 * each item in `coll`. Invoked with (item, callback).
 * The array index is not passed to the iteratee.
 * If you need the index, use `eachOf`.
 * @param {Function} [callback] - A callback which is called when all
 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
 * @returns {Promise} a promise, if a callback is omitted
 * @example
 *
 * // assuming openFiles is an array of file names and saveFile is a function
 * // to save the modified contents of that file:
 *
 * async.each(openFiles, saveFile, function(err){
 *   // if any of the saves produced an error, err would equal that error
 * });
 *
 * // assuming openFiles is an array of file names
 * async.each(openFiles, function(file, callback) {
 *
 *     // Perform operation on file here.
 *     console.log('Processing file ' + file);
 *
 *     if( file.length > 32 ) {
 *       console.log('This file name is too long');
 *       callback('File name too long');
 *     } else {
 *       // Do work to process file here
 *       console.log('File processed');
 *       callback();
 *     }
 * }, function(err) {
 *     // if any of the file processing produced an error, err would equal that error
 *     if( err ) {
 *       // One of the iterations produced an error.
 *       // All processing will now stop.
 *       console.log('A file failed to process');
 *     } else {
 *       console.log('All files have been processed successfully');
 *     }
 * });
 */
function eachLimit(coll, iteratee, callback) {
    return eachOf$1(coll, _withoutIndex(wrapAsync(iteratee)), callback);
}

var each = awaitify(eachLimit, 3);

/**
 * The same as [`each`]{@link module:Collections.each} but runs a maximum of `limit` async operations at a time.
 *
 * @name eachLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.each]{@link module:Collections.each}
 * @alias forEachLimit
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The array index is not passed to the iteratee.
 * If you need the index, use `eachOfLimit`.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called when all
 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
 * @returns {Promise} a promise, if a callback is omitted
 */
function eachLimit$1(coll, limit, iteratee, callback) {
    return eachOfLimit(limit)(coll, _withoutIndex(wrapAsync(iteratee)), callback);
}
var eachLimit$2 = awaitify(eachLimit$1, 4);

/**
 * The same as [`each`]{@link module:Collections.each} but runs only a single async operation at a time.
 *
 * Note, that unlike [`each`]{@link module:Collections.each}, this function applies iteratee to each item
 * in series and therefore the iteratee functions will complete in order.

 * @name eachSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.each]{@link module:Collections.each}
 * @alias forEachSeries
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to each
 * item in `coll`.
 * The array index is not passed to the iteratee.
 * If you need the index, use `eachOfSeries`.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called when all
 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
 * @returns {Promise} a promise, if a callback is omitted
 */
function eachSeries(coll, iteratee, callback) {
    return eachLimit$2(coll, 1, iteratee, callback)
}
var eachSeries$1 = awaitify(eachSeries, 3);

/**
 * Wrap an async function and ensure it calls its callback on a later tick of
 * the event loop.  If the function already calls its callback on a next tick,
 * no extra deferral is added. This is useful for preventing stack overflows
 * (`RangeError: Maximum call stack size exceeded`) and generally keeping
 * [Zalgo](http://blog.izs.me/post/59142742143/designing-apis-for-asynchrony)
 * contained. ES2017 `async` functions are returned as-is -- they are immune
 * to Zalgo's corrupting influences, as they always resolve on a later tick.
 *
 * @name ensureAsync
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {AsyncFunction} fn - an async function, one that expects a node-style
 * callback as its last argument.
 * @returns {AsyncFunction} Returns a wrapped function with the exact same call
 * signature as the function passed in.
 * @example
 *
 * function sometimesAsync(arg, callback) {
 *     if (cache[arg]) {
 *         return callback(null, cache[arg]); // this would be synchronous!!
 *     } else {
 *         doSomeIO(arg, callback); // this IO would be asynchronous
 *     }
 * }
 *
 * // this has a risk of stack overflows if many results are cached in a row
 * async.mapSeries(args, sometimesAsync, done);
 *
 * // this will defer sometimesAsync's callback if necessary,
 * // preventing stack overflows
 * async.mapSeries(args, async.ensureAsync(sometimesAsync), done);
 */
function ensureAsync(fn) {
    if (isAsync(fn)) return fn;
    return function (...args/*, callback*/) {
        var callback = args.pop();
        var sync = true;
        args.push((...innerArgs) => {
            if (sync) {
                setImmediate$1(() => callback(...innerArgs));
            } else {
                callback(...innerArgs);
            }
        });
        fn.apply(this, args);
        sync = false;
    };
}

/**
 * Returns `true` if every element in `coll` satisfies an async test. If any
 * iteratee call returns `false`, the main `callback` is immediately called.
 *
 * @name every
 * @static
 * @memberOf module:Collections
 * @method
 * @alias all
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
 * in the collection in parallel.
 * The iteratee must complete with a boolean result value.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Result will be either `true` or `false`
 * depending on the values of the async tests. Invoked with (err, result).
 * @returns {Promise} a promise, if no callback provided
 * @example
 *
 * async.every(['file1','file2','file3'], function(filePath, callback) {
 *     fs.access(filePath, function(err) {
 *         callback(null, !err)
 *     });
 * }, function(err, result) {
 *     // if result is true then every file exists
 * });
 */
function every(coll, iteratee, callback) {
    return _createTester(bool => !bool, res => !res)(eachOf$1, coll, iteratee, callback)
}
var every$1 = awaitify(every, 3);

/**
 * The same as [`every`]{@link module:Collections.every} but runs a maximum of `limit` async operations at a time.
 *
 * @name everyLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.every]{@link module:Collections.every}
 * @alias allLimit
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
 * in the collection in parallel.
 * The iteratee must complete with a boolean result value.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Result will be either `true` or `false`
 * depending on the values of the async tests. Invoked with (err, result).
 * @returns {Promise} a promise, if no callback provided
 */
function everyLimit(coll, limit, iteratee, callback) {
    return _createTester(bool => !bool, res => !res)(eachOfLimit(limit), coll, iteratee, callback)
}
var everyLimit$1 = awaitify(everyLimit, 4);

/**
 * The same as [`every`]{@link module:Collections.every} but runs only a single async operation at a time.
 *
 * @name everySeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.every]{@link module:Collections.every}
 * @alias allSeries
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
 * in the collection in series.
 * The iteratee must complete with a boolean result value.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Result will be either `true` or `false`
 * depending on the values of the async tests. Invoked with (err, result).
 * @returns {Promise} a promise, if no callback provided
 */
function everySeries(coll, iteratee, callback) {
    return _createTester(bool => !bool, res => !res)(eachOfSeries$1, coll, iteratee, callback)
}
var everySeries$1 = awaitify(everySeries, 3);

function filterArray(eachfn, arr, iteratee, callback) {
    var truthValues = new Array(arr.length);
    eachfn(arr, (x, index, iterCb) => {
        iteratee(x, (err, v) => {
            truthValues[index] = !!v;
            iterCb(err);
        });
    }, err => {
        if (err) return callback(err);
        var results = [];
        for (var i = 0; i < arr.length; i++) {
            if (truthValues[i]) results.push(arr[i]);
        }
        callback(null, results);
    });
}

function filterGeneric(eachfn, coll, iteratee, callback) {
    var results = [];
    eachfn(coll, (x, index, iterCb) => {
        iteratee(x, (err, v) => {
            if (err) return iterCb(err);
            if (v) {
                results.push({index, value: x});
            }
            iterCb(err);
        });
    }, err => {
        if (err) return callback(err);
        callback(null, results
            .sort((a, b) => a.index - b.index)
            .map(v => v.value));
    });
}

function _filter(eachfn, coll, iteratee, callback) {
    var filter = isArrayLike(coll) ? filterArray : filterGeneric;
    return filter(eachfn, coll, wrapAsync(iteratee), callback);
}

/**
 * Returns a new array of all the values in `coll` which pass an async truth
 * test. This operation is performed in parallel, but the results array will be
 * in the same order as the original.
 *
 * @name filter
 * @static
 * @memberOf module:Collections
 * @method
 * @alias select
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {Function} iteratee - A truth test to apply to each item in `coll`.
 * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
 * with a boolean argument once it has completed. Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Invoked with (err, results).
 * @returns {Promise} a promise, if no callback provided
 * @example
 *
 * async.filter(['file1','file2','file3'], function(filePath, callback) {
 *     fs.access(filePath, function(err) {
 *         callback(null, !err)
 *     });
 * }, function(err, results) {
 *     // results now equals an array of the existing files
 * });
 */
function filter (coll, iteratee, callback) {
    return _filter(eachOf$1, coll, iteratee, callback)
}
var filter$1 = awaitify(filter, 3);

/**
 * The same as [`filter`]{@link module:Collections.filter} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name filterLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.filter]{@link module:Collections.filter}
 * @alias selectLimit
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {Function} iteratee - A truth test to apply to each item in `coll`.
 * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
 * with a boolean argument once it has completed. Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Invoked with (err, results).
 * @returns {Promise} a promise, if no callback provided
 */
function filterLimit (coll, limit, iteratee, callback) {
    return _filter(eachOfLimit(limit), coll, iteratee, callback)
}
var filterLimit$1 = awaitify(filterLimit, 4);

/**
 * The same as [`filter`]{@link module:Collections.filter} but runs only a single async operation at a time.
 *
 * @name filterSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.filter]{@link module:Collections.filter}
 * @alias selectSeries
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {Function} iteratee - A truth test to apply to each item in `coll`.
 * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
 * with a boolean argument once it has completed. Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Invoked with (err, results)
 * @returns {Promise} a promise, if no callback provided
 */
function filterSeries (coll, iteratee, callback) {
    return _filter(eachOfSeries$1, coll, iteratee, callback)
}
var filterSeries$1 = awaitify(filterSeries, 3);

/**
 * Calls the asynchronous function `fn` with a callback parameter that allows it
 * to call itself again, in series, indefinitely.

 * If an error is passed to the callback then `errback` is called with the
 * error, and execution stops, otherwise it will never be called.
 *
 * @name forever
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {AsyncFunction} fn - an async function to call repeatedly.
 * Invoked with (next).
 * @param {Function} [errback] - when `fn` passes an error to it's callback,
 * this function will be called, and execution stops. Invoked with (err).
 * @returns {Promise} a promise that rejects if an error occurs and an errback
 * is not passed
 * @example
 *
 * async.forever(
 *     function(next) {
 *         // next is suitable for passing to things that need a callback(err [, whatever]);
 *         // it will result in this function being called again.
 *     },
 *     function(err) {
 *         // if next is called with a value in its first parameter, it will appear
 *         // in here as 'err', and execution will stop.
 *     }
 * );
 */
function forever(fn, errback) {
    var done = onlyOnce(errback);
    var task = wrapAsync(ensureAsync(fn));

    function next(err) {
        if (err) return done(err);
        if (err === false) return;
        task(next);
    }
    return next();
}
var forever$1 = awaitify(forever, 2);

/**
 * The same as [`groupBy`]{@link module:Collections.groupBy} but runs a maximum of `limit` async operations at a time.
 *
 * @name groupByLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.groupBy]{@link module:Collections.groupBy}
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with a `key` to group the value under.
 * Invoked with (value, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Result is an `Object` whoses
 * properties are arrays of values which returned the corresponding key.
 * @returns {Promise} a promise, if no callback is passed
 */
function groupByLimit(coll, limit, iteratee, callback) {
    var _iteratee = wrapAsync(iteratee);
    return mapLimit$1(coll, limit, (val, iterCb) => {
        _iteratee(val, (err, key) => {
            if (err) return iterCb(err);
            return iterCb(err, {key, val});
        });
    }, (err, mapResults) => {
        var result = {};
        // from MDN, handle object having an `hasOwnProperty` prop
        var {hasOwnProperty} = Object.prototype;

        for (var i = 0; i < mapResults.length; i++) {
            if (mapResults[i]) {
                var {key} = mapResults[i];
                var {val} = mapResults[i];

                if (hasOwnProperty.call(result, key)) {
                    result[key].push(val);
                } else {
                    result[key] = [val];
                }
            }
        }

        return callback(err, result);
    });
}

var groupByLimit$1 = awaitify(groupByLimit, 4);

/**
 * Returns a new object, where each value corresponds to an array of items, from
 * `coll`, that returned the corresponding key. That is, the keys of the object
 * correspond to the values passed to the `iteratee` callback.
 *
 * Note: Since this function applies the `iteratee` to each item in parallel,
 * there is no guarantee that the `iteratee` functions will complete in order.
 * However, the values for each key in the `result` will be in the same order as
 * the original `coll`. For Objects, the values will roughly be in the order of
 * the original Objects' keys (but this can vary across JavaScript engines).
 *
 * @name groupBy
 * @static
 * @memberOf module:Collections
 * @method
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with a `key` to group the value under.
 * Invoked with (value, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Result is an `Object` whoses
 * properties are arrays of values which returned the corresponding key.
 * @returns {Promise} a promise, if no callback is passed
 * @example
 *
 * async.groupBy(['userId1', 'userId2', 'userId3'], function(userId, callback) {
 *     db.findById(userId, function(err, user) {
 *         if (err) return callback(err);
 *         return callback(null, user.age);
 *     });
 * }, function(err, result) {
 *     // result is object containing the userIds grouped by age
 *     // e.g. { 30: ['userId1', 'userId3'], 42: ['userId2']};
 * });
 */
function groupBy (coll, iteratee, callback) {
    return groupByLimit$1(coll, Infinity, iteratee, callback)
}

/**
 * The same as [`groupBy`]{@link module:Collections.groupBy} but runs only a single async operation at a time.
 *
 * @name groupBySeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.groupBy]{@link module:Collections.groupBy}
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with a `key` to group the value under.
 * Invoked with (value, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Result is an `Object` whoses
 * properties are arrays of values which returned the corresponding key.
 * @returns {Promise} a promise, if no callback is passed
 */
function groupBySeries (coll, iteratee, callback) {
    return groupByLimit$1(coll, 1, iteratee, callback)
}

/**
 * Logs the result of an `async` function to the `console`. Only works in
 * Node.js or in browsers that support `console.log` and `console.error` (such
 * as FF and Chrome). If multiple arguments are returned from the async
 * function, `console.log` is called on each argument in order.
 *
 * @name log
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {AsyncFunction} function - The function you want to eventually apply
 * all arguments to.
 * @param {...*} arguments... - Any number of arguments to apply to the function.
 * @example
 *
 * // in a module
 * var hello = function(name, callback) {
 *     setTimeout(function() {
 *         callback(null, 'hello ' + name);
 *     }, 1000);
 * };
 *
 * // in the node repl
 * node> async.log(hello, 'world');
 * 'hello world'
 */
var log = consoleFunc('log');

/**
 * The same as [`mapValues`]{@link module:Collections.mapValues} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name mapValuesLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.mapValues]{@link module:Collections.mapValues}
 * @category Collection
 * @param {Object} obj - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - A function to apply to each value and key
 * in `coll`.
 * The iteratee should complete with the transformed value as its result.
 * Invoked with (value, key, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. `result` is a new object consisting
 * of each key from `obj`, with each transformed value on the right-hand side.
 * Invoked with (err, result).
 * @returns {Promise} a promise, if no callback is passed
 */
function mapValuesLimit(obj, limit, iteratee, callback) {
    callback = once(callback);
    var newObj = {};
    var _iteratee = wrapAsync(iteratee);
    return eachOfLimit(limit)(obj, (val, key, next) => {
        _iteratee(val, key, (err, result) => {
            if (err) return next(err);
            newObj[key] = result;
            next(err);
        });
    }, err => callback(err, newObj));
}

var mapValuesLimit$1 = awaitify(mapValuesLimit, 4);

/**
 * A relative of [`map`]{@link module:Collections.map}, designed for use with objects.
 *
 * Produces a new Object by mapping each value of `obj` through the `iteratee`
 * function. The `iteratee` is called each `value` and `key` from `obj` and a
 * callback for when it has finished processing. Each of these callbacks takes
 * two arguments: an `error`, and the transformed item from `obj`. If `iteratee`
 * passes an error to its callback, the main `callback` (for the `mapValues`
 * function) is immediately called with the error.
 *
 * Note, the order of the keys in the result is not guaranteed.  The keys will
 * be roughly in the order they complete, (but this is very engine-specific)
 *
 * @name mapValues
 * @static
 * @memberOf module:Collections
 * @method
 * @category Collection
 * @param {Object} obj - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A function to apply to each value and key
 * in `coll`.
 * The iteratee should complete with the transformed value as its result.
 * Invoked with (value, key, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. `result` is a new object consisting
 * of each key from `obj`, with each transformed value on the right-hand side.
 * Invoked with (err, result).
 * @returns {Promise} a promise, if no callback is passed
 * @example
 *
 * async.mapValues({
 *     f1: 'file1',
 *     f2: 'file2',
 *     f3: 'file3'
 * }, function (file, key, callback) {
 *   fs.stat(file, callback);
 * }, function(err, result) {
 *     // result is now a map of stats for each file, e.g.
 *     // {
 *     //     f1: [stats for file1],
 *     //     f2: [stats for file2],
 *     //     f3: [stats for file3]
 *     // }
 * });
 */
function mapValues(obj, iteratee, callback) {
    return mapValuesLimit$1(obj, Infinity, iteratee, callback)
}

/**
 * The same as [`mapValues`]{@link module:Collections.mapValues} but runs only a single async operation at a time.
 *
 * @name mapValuesSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.mapValues]{@link module:Collections.mapValues}
 * @category Collection
 * @param {Object} obj - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A function to apply to each value and key
 * in `coll`.
 * The iteratee should complete with the transformed value as its result.
 * Invoked with (value, key, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. `result` is a new object consisting
 * of each key from `obj`, with each transformed value on the right-hand side.
 * Invoked with (err, result).
 * @returns {Promise} a promise, if no callback is passed
 */
function mapValuesSeries(obj, iteratee, callback) {
    return mapValuesLimit$1(obj, 1, iteratee, callback)
}

/**
 * Caches the results of an async function. When creating a hash to store
 * function results against, the callback is omitted from the hash and an
 * optional hash function can be used.
 *
 * **Note: if the async function errs, the result will not be cached and
 * subsequent calls will call the wrapped function.**
 *
 * If no hash function is specified, the first argument is used as a hash key,
 * which may work reasonably if it is a string or a data type that converts to a
 * distinct string. Note that objects and arrays will not behave reasonably.
 * Neither will cases where the other arguments are significant. In such cases,
 * specify your own hash function.
 *
 * The cache of results is exposed as the `memo` property of the function
 * returned by `memoize`.
 *
 * @name memoize
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {AsyncFunction} fn - The async function to proxy and cache results from.
 * @param {Function} hasher - An optional function for generating a custom hash
 * for storing results. It has all the arguments applied to it apart from the
 * callback, and must be synchronous.
 * @returns {AsyncFunction} a memoized version of `fn`
 * @example
 *
 * var slow_fn = function(name, callback) {
 *     // do something
 *     callback(null, result);
 * };
 * var fn = async.memoize(slow_fn);
 *
 * // fn can now be used as if it were slow_fn
 * fn('some name', function() {
 *     // callback
 * });
 */
function memoize(fn, hasher = v => v) {
    var memo = Object.create(null);
    var queues = Object.create(null);
    var _fn = wrapAsync(fn);
    var memoized = initialParams((args, callback) => {
        var key = hasher(...args);
        if (key in memo) {
            setImmediate$1(() => callback(null, ...memo[key]));
        } else if (key in queues) {
            queues[key].push(callback);
        } else {
            queues[key] = [callback];
            _fn(...args, (err, ...resultArgs) => {
                // #1465 don't memoize if an error occurred
                if (!err) {
                    memo[key] = resultArgs;
                }
                var q = queues[key];
                delete queues[key];
                for (var i = 0, l = q.length; i < l; i++) {
                    q[i](err, ...resultArgs);
                }
            });
        }
    });
    memoized.memo = memo;
    memoized.unmemoized = fn;
    return memoized;
}

/**
 * Calls `callback` on a later loop around the event loop. In Node.js this just
 * calls `process.nextTick`.  In the browser it will use `setImmediate` if
 * available, otherwise `setTimeout(callback, 0)`, which means other higher
 * priority events may precede the execution of `callback`.
 *
 * This is used internally for browser-compatibility purposes.
 *
 * @name nextTick
 * @static
 * @memberOf module:Utils
 * @method
 * @see [async.setImmediate]{@link module:Utils.setImmediate}
 * @category Util
 * @param {Function} callback - The function to call on a later loop around
 * the event loop. Invoked with (args...).
 * @param {...*} args... - any number of additional arguments to pass to the
 * callback on the next tick.
 * @example
 *
 * var call_order = [];
 * async.nextTick(function() {
 *     call_order.push('two');
 *     // call_order now equals ['one','two']
 * });
 * call_order.push('one');
 *
 * async.setImmediate(function (a, b, c) {
 *     // a, b, and c equal 1, 2, and 3
 * }, 1, 2, 3);
 */
var _defer$1;

if (hasNextTick) {
    _defer$1 = process.nextTick;
} else if (hasSetImmediate) {
    _defer$1 = setImmediate;
} else {
    _defer$1 = fallback;
}

var nextTick = wrap(_defer$1);

var _parallel = awaitify((eachfn, tasks, callback) => {
    var results = isArrayLike(tasks) ? [] : {};

    eachfn(tasks, (task, key, taskCb) => {
        wrapAsync(task)((err, ...result) => {
            if (result.length < 2) {
                [result] = result;
            }
            results[key] = result;
            taskCb(err);
        });
    }, err => callback(err, results));
}, 3);

/**
 * Run the `tasks` collection of functions in parallel, without waiting until
 * the previous function has completed. If any of the functions pass an error to
 * its callback, the main `callback` is immediately called with the value of the
 * error. Once the `tasks` have completed, the results are passed to the final
 * `callback` as an array.
 *
 * **Note:** `parallel` is about kicking-off I/O tasks in parallel, not about
 * parallel execution of code.  If your tasks do not use any timers or perform
 * any I/O, they will actually be executed in series.  Any synchronous setup
 * sections for each task will happen one after the other.  JavaScript remains
 * single-threaded.
 *
 * **Hint:** Use [`reflect`]{@link module:Utils.reflect} to continue the
 * execution of other tasks when a task fails.
 *
 * It is also possible to use an object instead of an array. Each property will
 * be run as a function and the results will be passed to the final `callback`
 * as an object instead of an array. This can be a more readable way of handling
 * results from {@link async.parallel}.
 *
 * @name parallel
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array|Iterable|AsyncIterable|Object} tasks - A collection of
 * [async functions]{@link AsyncFunction} to run.
 * Each async function can complete with any number of optional `result` values.
 * @param {Function} [callback] - An optional callback to run once all the
 * functions have completed successfully. This function gets a results array
 * (or object) containing all the result arguments passed to the task callbacks.
 * Invoked with (err, results).
 * @returns {Promise} a promise, if a callback is not passed
 *
 * @example
 * async.parallel([
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'one');
 *         }, 200);
 *     },
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'two');
 *         }, 100);
 *     }
 * ],
 * // optional callback
 * function(err, results) {
 *     // the results array will equal ['one','two'] even though
 *     // the second function had a shorter timeout.
 * });
 *
 * // an example using an object instead of an array
 * async.parallel({
 *     one: function(callback) {
 *         setTimeout(function() {
 *             callback(null, 1);
 *         }, 200);
 *     },
 *     two: function(callback) {
 *         setTimeout(function() {
 *             callback(null, 2);
 *         }, 100);
 *     }
 * }, function(err, results) {
 *     // results is now equals to: {one: 1, two: 2}
 * });
 */
function parallel(tasks, callback) {
    return _parallel(eachOf$1, tasks, callback);
}

/**
 * The same as [`parallel`]{@link module:ControlFlow.parallel} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name parallelLimit
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.parallel]{@link module:ControlFlow.parallel}
 * @category Control Flow
 * @param {Array|Iterable|AsyncIterable|Object} tasks - A collection of
 * [async functions]{@link AsyncFunction} to run.
 * Each async function can complete with any number of optional `result` values.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {Function} [callback] - An optional callback to run once all the
 * functions have completed successfully. This function gets a results array
 * (or object) containing all the result arguments passed to the task callbacks.
 * Invoked with (err, results).
 * @returns {Promise} a promise, if a callback is not passed
 */
function parallelLimit(tasks, limit, callback) {
    return _parallel(eachOfLimit(limit), tasks, callback);
}

/**
 * A queue of tasks for the worker function to complete.
 * @typedef {Iterable} QueueObject
 * @memberOf module:ControlFlow
 * @property {Function} length - a function returning the number of items
 * waiting to be processed. Invoke with `queue.length()`.
 * @property {boolean} started - a boolean indicating whether or not any
 * items have been pushed and processed by the queue.
 * @property {Function} running - a function returning the number of items
 * currently being processed. Invoke with `queue.running()`.
 * @property {Function} workersList - a function returning the array of items
 * currently being processed. Invoke with `queue.workersList()`.
 * @property {Function} idle - a function returning false if there are items
 * waiting or being processed, or true if not. Invoke with `queue.idle()`.
 * @property {number} concurrency - an integer for determining how many `worker`
 * functions should be run in parallel. This property can be changed after a
 * `queue` is created to alter the concurrency on-the-fly.
 * @property {number} payload - an integer that specifies how many items are
 * passed to the worker function at a time. only applies if this is a
 * [cargo]{@link module:ControlFlow.cargo} object
 * @property {AsyncFunction} push - add a new task to the `queue`. Calls `callback`
 * once the `worker` has finished processing the task. Instead of a single task,
 * a `tasks` array can be submitted. The respective callback is used for every
 * task in the list. Invoke with `queue.push(task, [callback])`,
 * @property {AsyncFunction} unshift - add a new task to the front of the `queue`.
 * Invoke with `queue.unshift(task, [callback])`.
 * @property {AsyncFunction} pushAsync - the same as `q.push`, except this returns
 * a promise that rejects if an error occurs.
 * @property {AsyncFunction} unshirtAsync - the same as `q.unshift`, except this returns
 * a promise that rejects if an error occurs.
 * @property {Function} remove - remove items from the queue that match a test
 * function.  The test function will be passed an object with a `data` property,
 * and a `priority` property, if this is a
 * [priorityQueue]{@link module:ControlFlow.priorityQueue} object.
 * Invoked with `queue.remove(testFn)`, where `testFn` is of the form
 * `function ({data, priority}) {}` and returns a Boolean.
 * @property {Function} saturated - a function that sets a callback that is
 * called when the number of running workers hits the `concurrency` limit, and
 * further tasks will be queued.  If the callback is omitted, `q.saturated()`
 * returns a promise for the next occurrence.
 * @property {Function} unsaturated - a function that sets a callback that is
 * called when the number of running workers is less than the `concurrency` &
 * `buffer` limits, and further tasks will not be queued. If the callback is
 * omitted, `q.unsaturated()` returns a promise for the next occurrence.
 * @property {number} buffer - A minimum threshold buffer in order to say that
 * the `queue` is `unsaturated`.
 * @property {Function} empty - a function that sets a callback that is called
 * when the last item from the `queue` is given to a `worker`. If the callback
 * is omitted, `q.empty()` returns a promise for the next occurrence.
 * @property {Function} drain - a function that sets a callback that is called
 * when the last item from the `queue` has returned from the `worker`. If the
 * callback is omitted, `q.drain()` returns a promise for the next occurrence.
 * @property {Function} error - a function that sets a callback that is called
 * when a task errors. Has the signature `function(error, task)`. If the
 * callback is omitted, `error()` returns a promise that rejects on the next
 * error.
 * @property {boolean} paused - a boolean for determining whether the queue is
 * in a paused state.
 * @property {Function} pause - a function that pauses the processing of tasks
 * until `resume()` is called. Invoke with `queue.pause()`.
 * @property {Function} resume - a function that resumes the processing of
 * queued tasks when the queue is paused. Invoke with `queue.resume()`.
 * @property {Function} kill - a function that removes the `drain` callback and
 * empties remaining tasks from the queue forcing it to go idle. No more tasks
 * should be pushed to the queue after calling this function. Invoke with `queue.kill()`.
 *
 * @example
 * const q = aync.queue(worker, 2)
 * q.push(item1)
 * q.push(item2)
 * q.push(item3)
 * // queues are iterable, spread into an array to inspect
 * const items = [...q] // [item1, item2, item3]
 * // or use for of
 * for (let item of q) {
 *     console.log(item)
 * }
 *
 * q.drain(() => {
 *     console.log('all done')
 * })
 * // or
 * await q.drain()
 */

/**
 * Creates a `queue` object with the specified `concurrency`. Tasks added to the
 * `queue` are processed in parallel (up to the `concurrency` limit). If all
 * `worker`s are in progress, the task is queued until one becomes available.
 * Once a `worker` completes a `task`, that `task`'s callback is called.
 *
 * @name queue
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {AsyncFunction} worker - An async function for processing a queued task.
 * If you want to handle errors from an individual task, pass a callback to
 * `q.push()`. Invoked with (task, callback).
 * @param {number} [concurrency=1] - An `integer` for determining how many
 * `worker` functions should be run in parallel.  If omitted, the concurrency
 * defaults to `1`.  If the concurrency is `0`, an error is thrown.
 * @returns {module:ControlFlow.QueueObject} A queue object to manage the tasks. Callbacks can be
 * attached as certain properties to listen for specific events during the
 * lifecycle of the queue.
 * @example
 *
 * // create a queue object with concurrency 2
 * var q = async.queue(function(task, callback) {
 *     console.log('hello ' + task.name);
 *     callback();
 * }, 2);
 *
 * // assign a callback
 * q.drain(function() {
 *     console.log('all items have been processed');
 * });
 * // or await the end
 * await q.drain()
 *
 * // assign an error callback
 * q.error(function(err, task) {
 *     console.error('task experienced an error');
 * });
 *
 * // add some items to the queue
 * q.push({name: 'foo'}, function(err) {
 *     console.log('finished processing foo');
 * });
 * // callback is optional
 * q.push({name: 'bar'});
 *
 * // add some items to the queue (batch-wise)
 * q.push([{name: 'baz'},{name: 'bay'},{name: 'bax'}], function(err) {
 *     console.log('finished processing item');
 * });
 *
 * // add some items to the front of the queue
 * q.unshift({name: 'bar'}, function (err) {
 *     console.log('finished processing bar');
 * });
 */
function queue$1 (worker, concurrency) {
    var _worker = wrapAsync(worker);
    return queue((items, cb) => {
        _worker(items[0], cb);
    }, concurrency, 1);
}

// Binary min-heap implementation used for priority queue.
// Implementation is stable, i.e. push time is considered for equal priorities
class Heap {
    constructor() {
        this.heap = [];
        this.pushCount = Number.MIN_SAFE_INTEGER;
    }

    get length() {
        return this.heap.length;
    }

    empty () {
        this.heap = [];
        return this;
    }

    percUp(index) {
        let p;

        while (index > 0 && smaller(this.heap[index], this.heap[p=parent(index)])) {
            let t = this.heap[index];
            this.heap[index] = this.heap[p];
            this.heap[p] = t;

            index = p;
        }
    }

    percDown(index) {
        let l;

        while ((l=leftChi(index)) < this.heap.length) {
            if (l+1 < this.heap.length && smaller(this.heap[l+1], this.heap[l])) {
                l = l+1;
            }

            if (smaller(this.heap[index], this.heap[l])) {
                break;
            }

            let t = this.heap[index];
            this.heap[index] = this.heap[l];
            this.heap[l] = t;

            index = l;
        }
    }

    push(node) {
        node.pushCount = ++this.pushCount;
        this.heap.push(node);
        this.percUp(this.heap.length-1);
    }

    unshift(node) {
        return this.heap.push(node);
    }

    shift() {
        let [top] = this.heap;

        this.heap[0] = this.heap[this.heap.length-1];
        this.heap.pop();
        this.percDown(0);

        return top;
    }

    toArray() {
        return [...this];
    }

    *[Symbol.iterator] () {
        for (let i = 0; i < this.heap.length; i++) {
            yield this.heap[i].data;
        }
    }

    remove (testFn) {
        let j = 0;
        for (let i = 0; i < this.heap.length; i++) {
            if (!testFn(this.heap[i])) {
                this.heap[j] = this.heap[i];
                j++;
            }
        }

        this.heap.splice(j);

        for (let i = parent(this.heap.length-1); i >= 0; i--) {
            this.percDown(i);
        }

        return this;
    }
}

function leftChi(i) {
    return (i<<1)+1;
}

function parent(i) {
    return ((i+1)>>1)-1;
}

function smaller(x, y) {
    if (x.priority !== y.priority) {
        return x.priority < y.priority;
    }
    else {
        return x.pushCount < y.pushCount;
    }
}

/**
 * The same as [async.queue]{@link module:ControlFlow.queue} only tasks are assigned a priority and
 * completed in ascending priority order.
 *
 * @name priorityQueue
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.queue]{@link module:ControlFlow.queue}
 * @category Control Flow
 * @param {AsyncFunction} worker - An async function for processing a queued task.
 * If you want to handle errors from an individual task, pass a callback to
 * `q.push()`.
 * Invoked with (task, callback).
 * @param {number} concurrency - An `integer` for determining how many `worker`
 * functions should be run in parallel.  If omitted, the concurrency defaults to
 * `1`.  If the concurrency is `0`, an error is thrown.
 * @returns {module:ControlFlow.QueueObject} A priorityQueue object to manage the tasks. There are two
 * differences between `queue` and `priorityQueue` objects:
 * * `push(task, priority, [callback])` - `priority` should be a number. If an
 *   array of `tasks` is given, all tasks will be assigned the same priority.
 * * The `unshift` method was removed.
 */
function priorityQueue(worker, concurrency) {
    // Start with a normal queue
    var q = queue$1(worker, concurrency);

    q._tasks = new Heap();

    // Override push to accept second parameter representing priority
    q.push = function(data, priority = 0, callback = () => {}) {
        if (typeof callback !== 'function') {
            throw new Error('task callback must be a function');
        }
        q.started = true;
        if (!Array.isArray(data)) {
            data = [data];
        }
        if (data.length === 0 && q.idle()) {
            // call drain immediately if there are no tasks
            return setImmediate$1(() => q.drain());
        }

        for (var i = 0, l = data.length; i < l; i++) {
            var item = {
                data: data[i],
                priority,
                callback
            };

            q._tasks.push(item);
        }

        setImmediate$1(q.process);
    };

    // Remove unshift function
    delete q.unshift;

    return q;
}

/**
 * Runs the `tasks` array of functions in parallel, without waiting until the
 * previous function has completed. Once any of the `tasks` complete or pass an
 * error to its callback, the main `callback` is immediately called. It's
 * equivalent to `Promise.race()`.
 *
 * @name race
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array} tasks - An array containing [async functions]{@link AsyncFunction}
 * to run. Each function can complete with an optional `result` value.
 * @param {Function} callback - A callback to run once any of the functions have
 * completed. This function gets an error or result from the first function that
 * completed. Invoked with (err, result).
 * @returns undefined
 * @example
 *
 * async.race([
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'one');
 *         }, 200);
 *     },
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'two');
 *         }, 100);
 *     }
 * ],
 * // main callback
 * function(err, result) {
 *     // the result will be equal to 'two' as it finishes earlier
 * });
 */
function race(tasks, callback) {
    callback = once(callback);
    if (!Array.isArray(tasks)) return callback(new TypeError('First argument to race must be an array of functions'));
    if (!tasks.length) return callback();
    for (var i = 0, l = tasks.length; i < l; i++) {
        wrapAsync(tasks[i])(callback);
    }
}

var race$1 = awaitify(race, 2);

/**
 * Same as [`reduce`]{@link module:Collections.reduce}, only operates on `array` in reverse order.
 *
 * @name reduceRight
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.reduce]{@link module:Collections.reduce}
 * @alias foldr
 * @category Collection
 * @param {Array} array - A collection to iterate over.
 * @param {*} memo - The initial state of the reduction.
 * @param {AsyncFunction} iteratee - A function applied to each item in the
 * array to produce the next step in the reduction.
 * The `iteratee` should complete with the next state of the reduction.
 * If the iteratee complete with an error, the reduction is stopped and the
 * main `callback` is immediately called with the error.
 * Invoked with (memo, item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Result is the reduced value. Invoked with
 * (err, result).
 * @returns {Promise} a promise, if no callback is passed
 */
function reduceRight (array, memo, iteratee, callback) {
    var reversed = [...array].reverse();
    return reduce$1(reversed, memo, iteratee, callback);
}

/**
 * Wraps the async function in another function that always completes with a
 * result object, even when it errors.
 *
 * The result object has either the property `error` or `value`.
 *
 * @name reflect
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {AsyncFunction} fn - The async function you want to wrap
 * @returns {Function} - A function that always passes null to it's callback as
 * the error. The second argument to the callback will be an `object` with
 * either an `error` or a `value` property.
 * @example
 *
 * async.parallel([
 *     async.reflect(function(callback) {
 *         // do some stuff ...
 *         callback(null, 'one');
 *     }),
 *     async.reflect(function(callback) {
 *         // do some more stuff but error ...
 *         callback('bad stuff happened');
 *     }),
 *     async.reflect(function(callback) {
 *         // do some more stuff ...
 *         callback(null, 'two');
 *     })
 * ],
 * // optional callback
 * function(err, results) {
 *     // values
 *     // results[0].value = 'one'
 *     // results[1].error = 'bad stuff happened'
 *     // results[2].value = 'two'
 * });
 */
function reflect(fn) {
    var _fn = wrapAsync(fn);
    return initialParams(function reflectOn(args, reflectCallback) {
        args.push((error, ...cbArgs) => {
            let retVal = {};
            if (error) {
                retVal.error = error;
            }
            if (cbArgs.length > 0){
                var value = cbArgs;
                if (cbArgs.length <= 1) {
                    [value] = cbArgs;
                }
                retVal.value = value;
            }
            reflectCallback(null, retVal);
        });

        return _fn.apply(this, args);
    });
}

/**
 * A helper function that wraps an array or an object of functions with `reflect`.
 *
 * @name reflectAll
 * @static
 * @memberOf module:Utils
 * @method
 * @see [async.reflect]{@link module:Utils.reflect}
 * @category Util
 * @param {Array|Object|Iterable} tasks - The collection of
 * [async functions]{@link AsyncFunction} to wrap in `async.reflect`.
 * @returns {Array} Returns an array of async functions, each wrapped in
 * `async.reflect`
 * @example
 *
 * let tasks = [
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'one');
 *         }, 200);
 *     },
 *     function(callback) {
 *         // do some more stuff but error ...
 *         callback(new Error('bad stuff happened'));
 *     },
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'two');
 *         }, 100);
 *     }
 * ];
 *
 * async.parallel(async.reflectAll(tasks),
 * // optional callback
 * function(err, results) {
 *     // values
 *     // results[0].value = 'one'
 *     // results[1].error = Error('bad stuff happened')
 *     // results[2].value = 'two'
 * });
 *
 * // an example using an object instead of an array
 * let tasks = {
 *     one: function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'one');
 *         }, 200);
 *     },
 *     two: function(callback) {
 *         callback('two');
 *     },
 *     three: function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'three');
 *         }, 100);
 *     }
 * };
 *
 * async.parallel(async.reflectAll(tasks),
 * // optional callback
 * function(err, results) {
 *     // values
 *     // results.one.value = 'one'
 *     // results.two.error = 'two'
 *     // results.three.value = 'three'
 * });
 */
function reflectAll(tasks) {
    var results;
    if (Array.isArray(tasks)) {
        results = tasks.map(reflect);
    } else {
        results = {};
        Object.keys(tasks).forEach(key => {
            results[key] = reflect.call(this, tasks[key]);
        });
    }
    return results;
}

function reject(eachfn, arr, _iteratee, callback) {
    const iteratee = wrapAsync(_iteratee);
    return _filter(eachfn, arr, (value, cb) => {
        iteratee(value, (err, v) => {
            cb(err, !v);
        });
    }, callback);
}

/**
 * The opposite of [`filter`]{@link module:Collections.filter}. Removes values that pass an `async` truth test.
 *
 * @name reject
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.filter]{@link module:Collections.filter}
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {Function} iteratee - An async truth test to apply to each item in
 * `coll`.
 * The should complete with a boolean value as its `result`.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Invoked with (err, results).
 * @returns {Promise} a promise, if no callback is passed
 * @example
 *
 * async.reject(['file1','file2','file3'], function(filePath, callback) {
 *     fs.access(filePath, function(err) {
 *         callback(null, !err)
 *     });
 * }, function(err, results) {
 *     // results now equals an array of missing files
 *     createFiles(results);
 * });
 */
function reject$1 (coll, iteratee, callback) {
    return reject(eachOf$1, coll, iteratee, callback)
}
var reject$2 = awaitify(reject$1, 3);

/**
 * The same as [`reject`]{@link module:Collections.reject} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name rejectLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.reject]{@link module:Collections.reject}
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {Function} iteratee - An async truth test to apply to each item in
 * `coll`.
 * The should complete with a boolean value as its `result`.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Invoked with (err, results).
 * @returns {Promise} a promise, if no callback is passed
 */
function rejectLimit (coll, limit, iteratee, callback) {
    return reject(eachOfLimit(limit), coll, iteratee, callback)
}
var rejectLimit$1 = awaitify(rejectLimit, 4);

/**
 * The same as [`reject`]{@link module:Collections.reject} but runs only a single async operation at a time.
 *
 * @name rejectSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.reject]{@link module:Collections.reject}
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {Function} iteratee - An async truth test to apply to each item in
 * `coll`.
 * The should complete with a boolean value as its `result`.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Invoked with (err, results).
 * @returns {Promise} a promise, if no callback is passed
 */
function rejectSeries (coll, iteratee, callback) {
    return reject(eachOfSeries$1, coll, iteratee, callback)
}
var rejectSeries$1 = awaitify(rejectSeries, 3);

function constant$1(value) {
    return function () {
        return value;
    }
}

/**
 * Attempts to get a successful response from `task` no more than `times` times
 * before returning an error. If the task is successful, the `callback` will be
 * passed the result of the successful task. If all attempts fail, the callback
 * will be passed the error and result (if any) of the final attempt.
 *
 * @name retry
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @see [async.retryable]{@link module:ControlFlow.retryable}
 * @param {Object|number} [opts = {times: 5, interval: 0}| 5] - Can be either an
 * object with `times` and `interval` or a number.
 * * `times` - The number of attempts to make before giving up.  The default
 *   is `5`.
 * * `interval` - The time to wait between retries, in milliseconds.  The
 *   default is `0`. The interval may also be specified as a function of the
 *   retry count (see example).
 * * `errorFilter` - An optional synchronous function that is invoked on
 *   erroneous result. If it returns `true` the retry attempts will continue;
 *   if the function returns `false` the retry flow is aborted with the current
 *   attempt's error and result being returned to the final callback.
 *   Invoked with (err).
 * * If `opts` is a number, the number specifies the number of times to retry,
 *   with the default interval of `0`.
 * @param {AsyncFunction} task - An async function to retry.
 * Invoked with (callback).
 * @param {Function} [callback] - An optional callback which is called when the
 * task has succeeded, or after the final failed attempt. It receives the `err`
 * and `result` arguments of the last attempt at completing the `task`. Invoked
 * with (err, results).
 * @returns {Promise} a promise if no callback provided
 *
 * @example
 *
 * // The `retry` function can be used as a stand-alone control flow by passing
 * // a callback, as shown below:
 *
 * // try calling apiMethod 3 times
 * async.retry(3, apiMethod, function(err, result) {
 *     // do something with the result
 * });
 *
 * // try calling apiMethod 3 times, waiting 200 ms between each retry
 * async.retry({times: 3, interval: 200}, apiMethod, function(err, result) {
 *     // do something with the result
 * });
 *
 * // try calling apiMethod 10 times with exponential backoff
 * // (i.e. intervals of 100, 200, 400, 800, 1600, ... milliseconds)
 * async.retry({
 *   times: 10,
 *   interval: function(retryCount) {
 *     return 50 * Math.pow(2, retryCount);
 *   }
 * }, apiMethod, function(err, result) {
 *     // do something with the result
 * });
 *
 * // try calling apiMethod the default 5 times no delay between each retry
 * async.retry(apiMethod, function(err, result) {
 *     // do something with the result
 * });
 *
 * // try calling apiMethod only when error condition satisfies, all other
 * // errors will abort the retry control flow and return to final callback
 * async.retry({
 *   errorFilter: function(err) {
 *     return err.message === 'Temporary error'; // only retry on a specific error
 *   }
 * }, apiMethod, function(err, result) {
 *     // do something with the result
 * });
 *
 * // to retry individual methods that are not as reliable within other
 * // control flow functions, use the `retryable` wrapper:
 * async.auto({
 *     users: api.getUsers.bind(api),
 *     payments: async.retryable(3, api.getPayments.bind(api))
 * }, function(err, results) {
 *     // do something with the results
 * });
 *
 */
const DEFAULT_TIMES = 5;
const DEFAULT_INTERVAL = 0;

function retry(opts, task, callback) {
    var options = {
        times: DEFAULT_TIMES,
        intervalFunc: constant$1(DEFAULT_INTERVAL)
    };

    if (arguments.length < 3 && typeof opts === 'function') {
        callback = task || promiseCallback();
        task = opts;
    } else {
        parseTimes(options, opts);
        callback = callback || promiseCallback();
    }

    if (typeof task !== 'function') {
        throw new Error("Invalid arguments for async.retry");
    }

    var _task = wrapAsync(task);

    var attempt = 1;
    function retryAttempt() {
        _task((err, ...args) => {
            if (err === false) return
            if (err && attempt++ < options.times &&
                (typeof options.errorFilter != 'function' ||
                    options.errorFilter(err))) {
                setTimeout(retryAttempt, options.intervalFunc(attempt - 1));
            } else {
                callback(err, ...args);
            }
        });
    }

    retryAttempt();
    return callback[PROMISE_SYMBOL]
}

function parseTimes(acc, t) {
    if (typeof t === 'object') {
        acc.times = +t.times || DEFAULT_TIMES;

        acc.intervalFunc = typeof t.interval === 'function' ?
            t.interval :
            constant$1(+t.interval || DEFAULT_INTERVAL);

        acc.errorFilter = t.errorFilter;
    } else if (typeof t === 'number' || typeof t === 'string') {
        acc.times = +t || DEFAULT_TIMES;
    } else {
        throw new Error("Invalid arguments for async.retry");
    }
}

/**
 * A close relative of [`retry`]{@link module:ControlFlow.retry}.  This method
 * wraps a task and makes it retryable, rather than immediately calling it
 * with retries.
 *
 * @name retryable
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.retry]{@link module:ControlFlow.retry}
 * @category Control Flow
 * @param {Object|number} [opts = {times: 5, interval: 0}| 5] - optional
 * options, exactly the same as from `retry`, except for a `opts.arity` that
 * is the arity of the `task` function, defaulting to `task.length`
 * @param {AsyncFunction} task - the asynchronous function to wrap.
 * This function will be passed any arguments passed to the returned wrapper.
 * Invoked with (...args, callback).
 * @returns {AsyncFunction} The wrapped function, which when invoked, will
 * retry on an error, based on the parameters specified in `opts`.
 * This function will accept the same parameters as `task`.
 * @example
 *
 * async.auto({
 *     dep1: async.retryable(3, getFromFlakyService),
 *     process: ["dep1", async.retryable(3, function (results, cb) {
 *         maybeProcessData(results.dep1, cb);
 *     })]
 * }, callback);
 */
function retryable (opts, task) {
    if (!task) {
        task = opts;
        opts = null;
    }
    let arity = (opts && opts.arity) || task.length;
    if (isAsync(task)) {
        arity += 1;
    }
    var _task = wrapAsync(task);
    return initialParams((args, callback) => {
        if (args.length < arity - 1 || callback == null) {
            args.push(callback);
            callback = promiseCallback();
        }
        function taskFn(cb) {
            _task(...args, cb);
        }

        if (opts) retry(opts, taskFn, callback);
        else retry(taskFn, callback);

        return callback[PROMISE_SYMBOL]
    });
}

/**
 * Run the functions in the `tasks` collection in series, each one running once
 * the previous function has completed. If any functions in the series pass an
 * error to its callback, no more functions are run, and `callback` is
 * immediately called with the value of the error. Otherwise, `callback`
 * receives an array of results when `tasks` have completed.
 *
 * It is also possible to use an object instead of an array. Each property will
 * be run as a function, and the results will be passed to the final `callback`
 * as an object instead of an array. This can be a more readable way of handling
 *  results from {@link async.series}.
 *
 * **Note** that while many implementations preserve the order of object
 * properties, the [ECMAScript Language Specification](http://www.ecma-international.org/ecma-262/5.1/#sec-8.6)
 * explicitly states that
 *
 * > The mechanics and order of enumerating the properties is not specified.
 *
 * So if you rely on the order in which your series of functions are executed,
 * and want this to work on all platforms, consider using an array.
 *
 * @name series
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array|Iterable|AsyncIterable|Object} tasks - A collection containing
 * [async functions]{@link AsyncFunction} to run in series.
 * Each function can complete with any number of optional `result` values.
 * @param {Function} [callback] - An optional callback to run once all the
 * functions have completed. This function gets a results array (or object)
 * containing all the result arguments passed to the `task` callbacks. Invoked
 * with (err, result).
 * @return {Promise} a promise, if no callback is passed
 * @example
 * async.series([
 *     function(callback) {
 *         // do some stuff ...
 *         callback(null, 'one');
 *     },
 *     function(callback) {
 *         // do some more stuff ...
 *         callback(null, 'two');
 *     }
 * ],
 * // optional callback
 * function(err, results) {
 *     // results is now equal to ['one', 'two']
 * });
 *
 * async.series({
 *     one: function(callback) {
 *         setTimeout(function() {
 *             callback(null, 1);
 *         }, 200);
 *     },
 *     two: function(callback){
 *         setTimeout(function() {
 *             callback(null, 2);
 *         }, 100);
 *     }
 * }, function(err, results) {
 *     // results is now equal to: {one: 1, two: 2}
 * });
 */
function series(tasks, callback) {
    return _parallel(eachOfSeries$1, tasks, callback);
}

/**
 * Returns `true` if at least one element in the `coll` satisfies an async test.
 * If any iteratee call returns `true`, the main `callback` is immediately
 * called.
 *
 * @name some
 * @static
 * @memberOf module:Collections
 * @method
 * @alias any
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
 * in the collections in parallel.
 * The iteratee should complete with a boolean `result` value.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called as soon as any
 * iteratee returns `true`, or after all the iteratee functions have finished.
 * Result will be either `true` or `false` depending on the values of the async
 * tests. Invoked with (err, result).
 * @returns {Promise} a promise, if no callback provided
 * @example
 *
 * async.some(['file1','file2','file3'], function(filePath, callback) {
 *     fs.access(filePath, function(err) {
 *         callback(null, !err)
 *     });
 * }, function(err, result) {
 *     // if result is true then at least one of the files exists
 * });
 */
function some(coll, iteratee, callback) {
    return _createTester(Boolean, res => res)(eachOf$1, coll, iteratee, callback)
}
var some$1 = awaitify(some, 3);

/**
 * The same as [`some`]{@link module:Collections.some} but runs a maximum of `limit` async operations at a time.
 *
 * @name someLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.some]{@link module:Collections.some}
 * @alias anyLimit
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
 * in the collections in parallel.
 * The iteratee should complete with a boolean `result` value.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called as soon as any
 * iteratee returns `true`, or after all the iteratee functions have finished.
 * Result will be either `true` or `false` depending on the values of the async
 * tests. Invoked with (err, result).
 * @returns {Promise} a promise, if no callback provided
 */
function someLimit(coll, limit, iteratee, callback) {
    return _createTester(Boolean, res => res)(eachOfLimit(limit), coll, iteratee, callback)
}
var someLimit$1 = awaitify(someLimit, 4);

/**
 * The same as [`some`]{@link module:Collections.some} but runs only a single async operation at a time.
 *
 * @name someSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.some]{@link module:Collections.some}
 * @alias anySeries
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
 * in the collections in series.
 * The iteratee should complete with a boolean `result` value.
 * Invoked with (item, callback).
 * @param {Function} [callback] - A callback which is called as soon as any
 * iteratee returns `true`, or after all the iteratee functions have finished.
 * Result will be either `true` or `false` depending on the values of the async
 * tests. Invoked with (err, result).
 * @returns {Promise} a promise, if no callback provided
 */
function someSeries(coll, iteratee, callback) {
    return _createTester(Boolean, res => res)(eachOfSeries$1, coll, iteratee, callback)
}
var someSeries$1 = awaitify(someSeries, 3);

/**
 * Sorts a list by the results of running each `coll` value through an async
 * `iteratee`.
 *
 * @name sortBy
 * @static
 * @memberOf module:Collections
 * @method
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * The iteratee should complete with a value to use as the sort criteria as
 * its `result`.
 * Invoked with (item, callback).
 * @param {Function} callback - A callback which is called after all the
 * `iteratee` functions have finished, or an error occurs. Results is the items
 * from the original `coll` sorted by the values returned by the `iteratee`
 * calls. Invoked with (err, results).
 * @returns {Promise} a promise, if no callback passed
 * @example
 *
 * async.sortBy(['file1','file2','file3'], function(file, callback) {
 *     fs.stat(file, function(err, stats) {
 *         callback(err, stats.mtime);
 *     });
 * }, function(err, results) {
 *     // results is now the original array of files sorted by
 *     // modified date
 * });
 *
 * // By modifying the callback parameter the
 * // sorting order can be influenced:
 *
 * // ascending order
 * async.sortBy([1,9,3,5], function(x, callback) {
 *     callback(null, x);
 * }, function(err,result) {
 *     // result callback
 * });
 *
 * // descending order
 * async.sortBy([1,9,3,5], function(x, callback) {
 *     callback(null, x*-1);    //<- x*-1 instead of x, turns the order around
 * }, function(err,result) {
 *     // result callback
 * });
 */
function sortBy (coll, iteratee, callback) {
    var _iteratee = wrapAsync(iteratee);
    return map$1(coll, (x, iterCb) => {
        _iteratee(x, (err, criteria) => {
            if (err) return iterCb(err);
            iterCb(err, {value: x, criteria});
        });
    }, (err, results) => {
        if (err) return callback(err);
        callback(null, results.sort(comparator).map(v => v.value));
    });

    function comparator(left, right) {
        var a = left.criteria, b = right.criteria;
        return a < b ? -1 : a > b ? 1 : 0;
    }
}
var sortBy$1 = awaitify(sortBy, 3);

/**
 * Sets a time limit on an asynchronous function. If the function does not call
 * its callback within the specified milliseconds, it will be called with a
 * timeout error. The code property for the error object will be `'ETIMEDOUT'`.
 *
 * @name timeout
 * @static
 * @memberOf module:Utils
 * @method
 * @category Util
 * @param {AsyncFunction} asyncFn - The async function to limit in time.
 * @param {number} milliseconds - The specified time limit.
 * @param {*} [info] - Any variable you want attached (`string`, `object`, etc)
 * to timeout Error for more information..
 * @returns {AsyncFunction} Returns a wrapped function that can be used with any
 * of the control flow functions.
 * Invoke this function with the same parameters as you would `asyncFunc`.
 * @example
 *
 * function myFunction(foo, callback) {
 *     doAsyncTask(foo, function(err, data) {
 *         // handle errors
 *         if (err) return callback(err);
 *
 *         // do some stuff ...
 *
 *         // return processed data
 *         return callback(null, data);
 *     });
 * }
 *
 * var wrapped = async.timeout(myFunction, 1000);
 *
 * // call `wrapped` as you would `myFunction`
 * wrapped({ bar: 'bar' }, function(err, data) {
 *     // if `myFunction` takes < 1000 ms to execute, `err`
 *     // and `data` will have their expected values
 *
 *     // else `err` will be an Error with the code 'ETIMEDOUT'
 * });
 */
function timeout(asyncFn, milliseconds, info) {
    var fn = wrapAsync(asyncFn);

    return initialParams((args, callback) => {
        var timedOut = false;
        var timer;

        function timeoutCallback() {
            var name = asyncFn.name || 'anonymous';
            var error  = new Error('Callback function "' + name + '" timed out.');
            error.code = 'ETIMEDOUT';
            if (info) {
                error.info = info;
            }
            timedOut = true;
            callback(error);
        }

        args.push((...cbArgs) => {
            if (!timedOut) {
                callback(...cbArgs);
                clearTimeout(timer);
            }
        });

        // setup timer and call original function
        timer = setTimeout(timeoutCallback, milliseconds);
        fn(...args);
    });
}

function range(size) {
    var result = Array(size);
    while (size--) {
        result[size] = size;
    }
    return result;
}

/**
 * The same as [times]{@link module:ControlFlow.times} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name timesLimit
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.times]{@link module:ControlFlow.times}
 * @category Control Flow
 * @param {number} count - The number of times to run the function.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - The async function to call `n` times.
 * Invoked with the iteration index and a callback: (n, next).
 * @param {Function} callback - see [async.map]{@link module:Collections.map}.
 * @returns {Promise} a promise, if no callback is provided
 */
function timesLimit(count, limit, iteratee, callback) {
    var _iteratee = wrapAsync(iteratee);
    return mapLimit$1(range(count), limit, _iteratee, callback);
}

/**
 * Calls the `iteratee` function `n` times, and accumulates results in the same
 * manner you would use with [map]{@link module:Collections.map}.
 *
 * @name times
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.map]{@link module:Collections.map}
 * @category Control Flow
 * @param {number} n - The number of times to run the function.
 * @param {AsyncFunction} iteratee - The async function to call `n` times.
 * Invoked with the iteration index and a callback: (n, next).
 * @param {Function} callback - see {@link module:Collections.map}.
 * @returns {Promise} a promise, if no callback is provided
 * @example
 *
 * // Pretend this is some complicated async factory
 * var createUser = function(id, callback) {
 *     callback(null, {
 *         id: 'user' + id
 *     });
 * };
 *
 * // generate 5 users
 * async.times(5, function(n, next) {
 *     createUser(n, function(err, user) {
 *         next(err, user);
 *     });
 * }, function(err, users) {
 *     // we should now have 5 users
 * });
 */
function times (n, iteratee, callback) {
    return timesLimit(n, Infinity, iteratee, callback)
}

/**
 * The same as [times]{@link module:ControlFlow.times} but runs only a single async operation at a time.
 *
 * @name timesSeries
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.times]{@link module:ControlFlow.times}
 * @category Control Flow
 * @param {number} n - The number of times to run the function.
 * @param {AsyncFunction} iteratee - The async function to call `n` times.
 * Invoked with the iteration index and a callback: (n, next).
 * @param {Function} callback - see {@link module:Collections.map}.
 * @returns {Promise} a promise, if no callback is provided
 */
function timesSeries (n, iteratee, callback) {
    return timesLimit(n, 1, iteratee, callback)
}

/**
 * A relative of `reduce`.  Takes an Object or Array, and iterates over each
 * element in parallel, each step potentially mutating an `accumulator` value.
 * The type of the accumulator defaults to the type of collection passed in.
 *
 * @name transform
 * @static
 * @memberOf module:Collections
 * @method
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {*} [accumulator] - The initial state of the transform.  If omitted,
 * it will default to an empty Object or Array, depending on the type of `coll`
 * @param {AsyncFunction} iteratee - A function applied to each item in the
 * collection that potentially modifies the accumulator.
 * Invoked with (accumulator, item, key, callback).
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Result is the transformed accumulator.
 * Invoked with (err, result).
 * @returns {Promise} a promise, if no callback provided
 * @example
 *
 * async.transform([1,2,3], function(acc, item, index, callback) {
 *     // pointless async:
 *     process.nextTick(function() {
 *         acc[index] = item * 2
 *         callback(null)
 *     });
 * }, function(err, result) {
 *     // result is now equal to [2, 4, 6]
 * });
 *
 * @example
 *
 * async.transform({a: 1, b: 2, c: 3}, function (obj, val, key, callback) {
 *     setImmediate(function () {
 *         obj[key] = val * 2;
 *         callback();
 *     })
 * }, function (err, result) {
 *     // result is equal to {a: 2, b: 4, c: 6}
 * })
 */
function transform (coll, accumulator, iteratee, callback) {
    if (arguments.length <= 3 && typeof accumulator === 'function') {
        callback = iteratee;
        iteratee = accumulator;
        accumulator = Array.isArray(coll) ? [] : {};
    }
    callback = once(callback || promiseCallback());
    var _iteratee = wrapAsync(iteratee);

    eachOf$1(coll, (v, k, cb) => {
        _iteratee(accumulator, v, k, cb);
    }, err => callback(err, accumulator));
    return callback[PROMISE_SYMBOL]
}

/**
 * It runs each task in series but stops whenever any of the functions were
 * successful. If one of the tasks were successful, the `callback` will be
 * passed the result of the successful task. If all tasks fail, the callback
 * will be passed the error and result (if any) of the final attempt.
 *
 * @name tryEach
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array|Iterable|AsyncIterable|Object} tasks - A collection containing functions to
 * run, each function is passed a `callback(err, result)` it must call on
 * completion with an error `err` (which can be `null`) and an optional `result`
 * value.
 * @param {Function} [callback] - An optional callback which is called when one
 * of the tasks has succeeded, or all have failed. It receives the `err` and
 * `result` arguments of the last attempt at completing the `task`. Invoked with
 * (err, results).
 * @returns {Promise} a promise, if no callback is passed
 * @example
 * async.tryEach([
 *     function getDataFromFirstWebsite(callback) {
 *         // Try getting the data from the first website
 *         callback(err, data);
 *     },
 *     function getDataFromSecondWebsite(callback) {
 *         // First website failed,
 *         // Try getting the data from the backup website
 *         callback(err, data);
 *     }
 * ],
 * // optional callback
 * function(err, results) {
 *     Now do something with the data.
 * });
 *
 */
function tryEach(tasks, callback) {
    var error = null;
    var result;
    return eachSeries$1(tasks, (task, taskCb) => {
        wrapAsync(task)((err, ...args) => {
            if (err === false) return taskCb(err);

            if (args.length < 2) {
                [result] = args;
            } else {
                result = args;
            }
            error = err;
            taskCb(err ? null : {});
        });
    }, () => callback(error, result));
}

var tryEach$1 = awaitify(tryEach);

/**
 * Undoes a [memoize]{@link module:Utils.memoize}d function, reverting it to the original,
 * unmemoized form. Handy for testing.
 *
 * @name unmemoize
 * @static
 * @memberOf module:Utils
 * @method
 * @see [async.memoize]{@link module:Utils.memoize}
 * @category Util
 * @param {AsyncFunction} fn - the memoized function
 * @returns {AsyncFunction} a function that calls the original unmemoized function
 */
function unmemoize(fn) {
    return (...args) => {
        return (fn.unmemoized || fn)(...args);
    };
}

/**
 * Repeatedly call `iteratee`, while `test` returns `true`. Calls `callback` when
 * stopped, or an error occurs.
 *
 * @name whilst
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {AsyncFunction} test - asynchronous truth test to perform before each
 * execution of `iteratee`. Invoked with ().
 * @param {AsyncFunction} iteratee - An async function which is called each time
 * `test` passes. Invoked with (callback).
 * @param {Function} [callback] - A callback which is called after the test
 * function has failed and repeated execution of `iteratee` has stopped. `callback`
 * will be passed an error and any arguments passed to the final `iteratee`'s
 * callback. Invoked with (err, [results]);
 * @returns {Promise} a promise, if no callback is passed
 * @example
 *
 * var count = 0;
 * async.whilst(
 *     function test(cb) { cb(null, count < 5); },
 *     function iter(callback) {
 *         count++;
 *         setTimeout(function() {
 *             callback(null, count);
 *         }, 1000);
 *     },
 *     function (err, n) {
 *         // 5 seconds have passed, n = 5
 *     }
 * );
 */
function whilst(test, iteratee, callback) {
    callback = onlyOnce(callback);
    var _fn = wrapAsync(iteratee);
    var _test = wrapAsync(test);
    var results = [];

    function next(err, ...rest) {
        if (err) return callback(err);
        results = rest;
        if (err === false) return;
        _test(check);
    }

    function check(err, truth) {
        if (err) return callback(err);
        if (err === false) return;
        if (!truth) return callback(null, ...results);
        _fn(next);
    }

    return _test(check);
}
var whilst$1 = awaitify(whilst, 3);

/**
 * Repeatedly call `iteratee` until `test` returns `true`. Calls `callback` when
 * stopped, or an error occurs. `callback` will be passed an error and any
 * arguments passed to the final `iteratee`'s callback.
 *
 * The inverse of [whilst]{@link module:ControlFlow.whilst}.
 *
 * @name until
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.whilst]{@link module:ControlFlow.whilst}
 * @category Control Flow
 * @param {AsyncFunction} test - asynchronous truth test to perform before each
 * execution of `iteratee`. Invoked with (callback).
 * @param {AsyncFunction} iteratee - An async function which is called each time
 * `test` fails. Invoked with (callback).
 * @param {Function} [callback] - A callback which is called after the test
 * function has passed and repeated execution of `iteratee` has stopped. `callback`
 * will be passed an error and any arguments passed to the final `iteratee`'s
 * callback. Invoked with (err, [results]);
 * @returns {Promise} a promise, if a callback is not passed
 *
 * @example
 * const results = []
 * let finished = false
 * async.until(function test(page, cb) {
 *     cb(null, finished)
 * }, function iter(next) {
 *     fetchPage(url, (err, body) => {
 *         if (err) return next(err)
 *         results = results.concat(body.objects)
 *         finished = !!body.next
 *         next(err)
 *     })
 * }, function done (err) {
 *     // all pages have been fetched
 * })
 */
function until(test, iteratee, callback) {
    const _test = wrapAsync(test);
    return whilst$1((cb) => _test((err, truth) => cb (err, !truth)), iteratee, callback);
}

/**
 * Runs the `tasks` array of functions in series, each passing their results to
 * the next in the array. However, if any of the `tasks` pass an error to their
 * own callback, the next function is not executed, and the main `callback` is
 * immediately called with the error.
 *
 * @name waterfall
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array} tasks - An array of [async functions]{@link AsyncFunction}
 * to run.
 * Each function should complete with any number of `result` values.
 * The `result` values will be passed as arguments, in order, to the next task.
 * @param {Function} [callback] - An optional callback to run once all the
 * functions have completed. This will be passed the results of the last task's
 * callback. Invoked with (err, [results]).
 * @returns undefined
 * @example
 *
 * async.waterfall([
 *     function(callback) {
 *         callback(null, 'one', 'two');
 *     },
 *     function(arg1, arg2, callback) {
 *         // arg1 now equals 'one' and arg2 now equals 'two'
 *         callback(null, 'three');
 *     },
 *     function(arg1, callback) {
 *         // arg1 now equals 'three'
 *         callback(null, 'done');
 *     }
 * ], function (err, result) {
 *     // result now equals 'done'
 * });
 *
 * // Or, with named functions:
 * async.waterfall([
 *     myFirstFunction,
 *     mySecondFunction,
 *     myLastFunction,
 * ], function (err, result) {
 *     // result now equals 'done'
 * });
 * function myFirstFunction(callback) {
 *     callback(null, 'one', 'two');
 * }
 * function mySecondFunction(arg1, arg2, callback) {
 *     // arg1 now equals 'one' and arg2 now equals 'two'
 *     callback(null, 'three');
 * }
 * function myLastFunction(arg1, callback) {
 *     // arg1 now equals 'three'
 *     callback(null, 'done');
 * }
 */
function waterfall (tasks, callback) {
    callback = once(callback);
    if (!Array.isArray(tasks)) return callback(new Error('First argument to waterfall must be an array of functions'));
    if (!tasks.length) return callback();
    var taskIndex = 0;

    function nextTask(args) {
        var task = wrapAsync(tasks[taskIndex++]);
        task(...args, onlyOnce(next));
    }

    function next(err, ...args) {
        if (err === false) return
        if (err || taskIndex === tasks.length) {
            return callback(err, ...args);
        }
        nextTask(args);
    }

    nextTask([]);
}

var waterfall$1 = awaitify(waterfall);

/**
 * An "async function" in the context of Async is an asynchronous function with
 * a variable number of parameters, with the final parameter being a callback.
 * (`function (arg1, arg2, ..., callback) {}`)
 * The final callback is of the form `callback(err, results...)`, which must be
 * called once the function is completed.  The callback should be called with a
 * Error as its first argument to signal that an error occurred.
 * Otherwise, if no error occurred, it should be called with `null` as the first
 * argument, and any additional `result` arguments that may apply, to signal
 * successful completion.
 * The callback must be called exactly once, ideally on a later tick of the
 * JavaScript event loop.
 *
 * This type of function is also referred to as a "Node-style async function",
 * or a "continuation passing-style function" (CPS). Most of the methods of this
 * library are themselves CPS/Node-style async functions, or functions that
 * return CPS/Node-style async functions.
 *
 * Wherever we accept a Node-style async function, we also directly accept an
 * [ES2017 `async` function]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function}.
 * In this case, the `async` function will not be passed a final callback
 * argument, and any thrown error will be used as the `err` argument of the
 * implicit callback, and the return value will be used as the `result` value.
 * (i.e. a `rejected` of the returned Promise becomes the `err` callback
 * argument, and a `resolved` value becomes the `result`.)
 *
 * Note, due to JavaScript limitations, we can only detect native `async`
 * functions and not transpilied implementations.
 * Your environment must have `async`/`await` support for this to work.
 * (e.g. Node > v7.6, or a recent version of a modern browser).
 * If you are using `async` functions through a transpiler (e.g. Babel), you
 * must still wrap the function with [asyncify]{@link module:Utils.asyncify},
 * because the `async function` will be compiled to an ordinary function that
 * returns a promise.
 *
 * @typedef {Function} AsyncFunction
 * @static
 */

var index = {
    apply,
    applyEach: applyEach$1,
    applyEachSeries,
    asyncify,
    auto,
    autoInject,
    cargo,
    cargoQueue: cargo$1,
    compose,
    concat: concat$1,
    concatLimit: concatLimit$1,
    concatSeries: concatSeries$1,
    constant,
    detect: detect$1,
    detectLimit: detectLimit$1,
    detectSeries: detectSeries$1,
    dir,
    doUntil,
    doWhilst: doWhilst$1,
    each,
    eachLimit: eachLimit$2,
    eachOf: eachOf$1,
    eachOfLimit: eachOfLimit$2,
    eachOfSeries: eachOfSeries$1,
    eachSeries: eachSeries$1,
    ensureAsync,
    every: every$1,
    everyLimit: everyLimit$1,
    everySeries: everySeries$1,
    filter: filter$1,
    filterLimit: filterLimit$1,
    filterSeries: filterSeries$1,
    forever: forever$1,
    groupBy,
    groupByLimit: groupByLimit$1,
    groupBySeries,
    log,
    map: map$1,
    mapLimit: mapLimit$1,
    mapSeries: mapSeries$1,
    mapValues,
    mapValuesLimit: mapValuesLimit$1,
    mapValuesSeries,
    memoize,
    nextTick,
    parallel,
    parallelLimit,
    priorityQueue,
    queue: queue$1,
    race: race$1,
    reduce: reduce$1,
    reduceRight,
    reflect,
    reflectAll,
    reject: reject$2,
    rejectLimit: rejectLimit$1,
    rejectSeries: rejectSeries$1,
    retry,
    retryable,
    seq,
    series,
    setImmediate: setImmediate$1,
    some: some$1,
    someLimit: someLimit$1,
    someSeries: someSeries$1,
    sortBy: sortBy$1,
    timeout,
    times,
    timesLimit,
    timesSeries,
    transform,
    tryEach: tryEach$1,
    unmemoize,
    until,
    waterfall: waterfall$1,
    whilst: whilst$1,

    // aliases
    all: every$1,
    allLimit: everyLimit$1,
    allSeries: everySeries$1,
    any: some$1,
    anyLimit: someLimit$1,
    anySeries: someSeries$1,
    find: detect$1,
    findLimit: detectLimit$1,
    findSeries: detectSeries$1,
    flatMap: concat$1,
    flatMapLimit: concatLimit$1,
    flatMapSeries: concatSeries$1,
    forEach: each,
    forEachSeries: eachSeries$1,
    forEachLimit: eachLimit$2,
    forEachOf: eachOf$1,
    forEachOfSeries: eachOfSeries$1,
    forEachOfLimit: eachOfLimit$2,
    inject: reduce$1,
    foldl: reduce$1,
    foldr: reduceRight,
    select: filter$1,
    selectLimit: filterLimit$1,
    selectSeries: filterSeries$1,
    wrapSync: asyncify,
    during: whilst$1,
    doDuring: doWhilst$1
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (index);



/***/ }),

/***/ "./src/charts_module/emitter.js":
/*!**************************************!*\
  !*** ./src/charts_module/emitter.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var ChartEmitter = /*#__PURE__*/function (_EventEmitter) {
  _inherits(ChartEmitter, _EventEmitter);

  var _super = _createSuper(ChartEmitter);

  function ChartEmitter() {
    _classCallCheck(this, ChartEmitter);

    return _super.apply(this, arguments);
  }

  return ChartEmitter;
}((events__WEBPACK_IMPORTED_MODULE_0___default()));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChartEmitter);

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var _constants;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var constants = (_constants = {
  URL_SERVER_ALARMS: '/server/alarms',
  URL_SERVER_AUTH: '/server/auth',
  URL_SERVER_GEOMAPS: '/server/geomaps',
  URL_SERVER_GROUPS: '/server/groups',
  URL_SERVER_GPS_DEVICES: '/server/gps_devices',
  URL_SERVER_VEHICLES: '/server/vehicles',
  URL_SERVER_VARIABLES: '/server/variables',
  URL_SERVER_CUSTOM_VARIABLES: '/server/custom_variables',
  URL_SERVER_MATRICES: '/server/matrices',
  URL_SERVER_REPORTS: '/server/reports',
  URL_SERVER_UNITS: '/server/units',
  URL_SERVER_USERS: '/server/users',
  URL_SERVER_EVENTS: '/server/events',
  URL_SERVER_CHARTS: '/server/charts',
  URL_SERVER_GRAPHICS: '/server/graphics',
  URL_SERVER_CHART_EVENTS: '/server/chart_events',
  URL_SERVER_OPERATIONS: '/server/operations',
  URL_SERVER_FOOTER_VARIABLES: '/server/footer_variables',
  URL_SERVER_DASHBOARD_VARIABLES: '/server/dashboard_variables',
  URL_SERVER_LOG_EVENTS: '/server/log/events',
  URL_SERVER_LOG_ALARMS: '/server/log/alarms',
  URL_SERVER_LOG_ORBCOMMS: '/server/log/orbcomms',
  URL_SERVER_OVERWRITES: '/server/overwrites',
  URL_SERVER_CORIOLIS: '/server/variables/coriolis',
  EVENT_UDAPTE_VARIABLES: 'update-variables',
  EVENT_ALARMS_VARIABLES: 'alarms-variables',
  EVENT_COMMENT_VARIABLE: 'comment-variable',
  EVENT_UPDATE_COMMENT_GROUP: 'update-comment-group',
  EVENT_EMPTY_UDAPTE_VARIABLES_VALUE: 'empty-update-variables-value',
  EVENT_UDAPTE_ALARMS_ACTIVE: 'update-alarms-active',
  EVENT_UDAPTE_VARIABLES_VALUE: 'update-variables-value',
  EVENT_UDAPTE_VARIABLES_ALARM: 'update-variables-alarm',
  EVENT_UDAPTE_VARIABLES_TIMEOUT: 'update-variables-timeout',
  EVENT_REQUEST_REPORT: 'request-report',
  EVENT_RESPONSE_REPORT: 'response-report',
  EVENT_REQUEST_REPORT_LOCATOR: 'request-report-locator',
  EVENT_RESPONSE_REPORT_LOCATOR: 'response-report-locator',
  EVENT_UDAPTE_VEHICLE: 'update-vehicle',
  EVENT_CREATE_FILE: 'create-file',
  EVENT_COPY_FILE: 'copy-file',
  EVENT_MOVE_FILE: 'move-file',
  EVENT_RENAME_FILE: 'rename-file',
  EVENT_DELETE_FILE: 'delete-file',
  EVENT_GET_CONTENT: 'get-content',
  EVENT_VARIABLES: 'variables',
  EVENT_SETPOINTS: 'setpoints',
  EVENT_OPEN_CREATE_EVENT: 'open-create-event-chart',
  EVENT_OPEN_EVENT_CHART: 'open-event-chart',
  EVENT_INSERT_EVENT_CHART: 'insert-event-chart',
  LABEL_EVENTS: 'Eventos',
  MATRIX_MODULE: 1,
  GRAPHIC_MODULE: 2,
  REPORTS_MODULE: 3,
  EVENTS_MODULE: 4,
  LOCATION_MODULE: 5,
  LOCATOR_MODULE: 6,
  EXPLORER_MODULE: 7,
  CONFIGURATION_MODULE: 8,
  OPERATIONS_MODULE: 9,
  PROFILE_MODULE: 10,
  SHUTDOWN_REMOTE_MODULE: 11,
  CORIOLIS_MODULE: 12,
  DASHBOARD_MODULE: 13,
  TIMEOUT_VALUE: 1,
  WARNING_VALUE: 2,
  DANGER_VALUE: 3,
  TYPE_VALUE_ALARM: 1,
  TYPE_TIMEOUT_ALARM: 2,
  TIMEOUT_DEFAULT: 5,
  RT_HTTP: 1,
  RT_WS: 2,
  DARK_THEME: 1,
  WHITE_THEME: 2
}, _defineProperty(_constants, "TYPE_VALUE_ALARM", 1), _defineProperty(_constants, "WARNING_SOUND", '/static/media/warning.mp3'), _defineProperty(_constants, "DANGER_SOUND", '/static/media/danger.mp3'), _defineProperty(_constants, "TIMEOUT_SOUND", '/static/media/timeout.mp3'), _defineProperty(_constants, "EXT_DOC", 'doc'), _defineProperty(_constants, "EXT_DOCX", 'docx'), _defineProperty(_constants, "EXT_GIF", 'gif'), _defineProperty(_constants, "EXT_JPEG", 'jpeg'), _defineProperty(_constants, "EXT_JPG", 'jpg'), _defineProperty(_constants, "EXT_MIDI", 'midi'), _defineProperty(_constants, "EXT_MP3", 'mp3'), _defineProperty(_constants, "EXT_MP4", 'mp4'), _defineProperty(_constants, "EXT_PDF", 'pdf'), _defineProperty(_constants, "EXT_PNG", 'png'), _defineProperty(_constants, "EXT_PPT", 'ppt'), _defineProperty(_constants, "EXT_PPTX", 'pptx'), _defineProperty(_constants, "EXT_PUB", 'pub'), _defineProperty(_constants, "EXT_RAR", 'rar'), _defineProperty(_constants, "EXT_TXT", 'txt'), _defineProperty(_constants, "EXT_VSD", 'vsd'), _defineProperty(_constants, "EXT_WAV", 'wav'), _defineProperty(_constants, "EXT_XLS", 'xls'), _defineProperty(_constants, "EXT_XLSX", 'xlsx'), _defineProperty(_constants, "EXT_ZIP", 'zip'), _defineProperty(_constants, "STATUS_OK", 200), _defineProperty(_constants, "STATUS_CREATED", 201), _defineProperty(_constants, "STATUS_ACCEPTED", 202), _defineProperty(_constants, "METHOD_GET", 'GET'), _defineProperty(_constants, "METHOD_POST", 'POST'), _defineProperty(_constants, "METHOD_PUT", 'PUT'), _defineProperty(_constants, "METHOD_DELETE", 'DELETE'), _defineProperty(_constants, "JSON", 'json'), _defineProperty(_constants, "APPLICATION_JSON", 'application/json'), _defineProperty(_constants, "ACCESS_TOKEN_WS", 'access_token_ws'), _defineProperty(_constants, "ACCESS_TOKEN_WSA", 'access_token_wsa'), _defineProperty(_constants, "ACCESS_TOKEN_WSE", 'access_token_wse'), _defineProperty(_constants, "TTX_PROTOCOOL", 'ttx-protocol'), _defineProperty(_constants, "MARKER_ICON", 'marker_icon'), _defineProperty(_constants, "TEMPLATE", 'template'), _defineProperty(_constants, "NA", 'N/A'), _defineProperty(_constants, "MESSAGE_SAVED_OK", 'Los cambios se guardaron correctamente'), _defineProperty(_constants, "MESSAGE_ERROR", 'Ocurrió un error al solicitar la información'), _defineProperty(_constants, "LIMIT_FOR_RECONNECTION", 3), _defineProperty(_constants, "ROLES", ['Administrador General', 'Administrador de Sistema', 'Administrador', 'Operador', 'Invitado']), _constants);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (constants);

/***/ }),

/***/ "./src/header.jsx":
/*!************************!*\
  !*** ./src/header.jsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var _matrix_module_menu_lateral_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./matrix_module/menu-lateral.jsx */ "./src/matrix_module/menu-lateral.jsx");
/* harmony import */ var _location_module_menu_lateral_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./location_module/menu-lateral.jsx */ "./src/location_module/menu-lateral.jsx");
/* harmony import */ var _locator_module_menu_lateral_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./locator_module/menu-lateral.jsx */ "./src/locator_module/menu-lateral.jsx");
/* harmony import */ var _matrix_module_notification_item_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./matrix_module/notification-item.jsx */ "./src/matrix_module/notification-item.jsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }







var PROFILE = 1;
var CONFIGURATION = 2;
var LOGOUT = 3;

var Header = /*#__PURE__*/function (_Component) {
  _inherits(Header, _Component);

  var _super = _createSuper(Header);

  function Header(props) {
    var _this;

    _classCallCheck(this, Header);

    _this = _super.call(this, props);
    _this.state = {
      isOpenNotifications: false
    };
    return _this;
  }

  _createClass(Header, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "handleOpenMenu",
    value: function handleOpenMenu() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        $('#bar_notific').animate({
          marginRight: '-300px'
        }, 100);
        $('#sbar_config').animate({
          marginRight: '-300px'
        }, 100);
      };

      return fn;
    }
  }, {
    key: "handleOpenConfigMenu",
    value: function handleOpenConfigMenu() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        $('#sbar_config').animate({
          marginRight: '0px'
        }, 100);
      };

      return fn;
    }
  }, {
    key: "handleCloseConfigMenu",
    value: function handleCloseConfigMenu() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        $('#sbar_config').animate({
          marginRight: '-300px'
        }, 100);
      };

      return fn;
    }
  }, {
    key: "handleOpenNotifications",
    value: function handleOpenNotifications() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        $('#bar_notific').animate({
          marginRight: '0px'
        }, 100);
      };

      return fn;
    }
  }, {
    key: "handleCloseNotifications",
    value: function handleCloseNotifications() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        $('#bar_notific').animate({
          marginRight: '-300px'
        }, 100);
      };

      return fn;
    }
  }, {
    key: "handleRemoveNotification",
    value: function handleRemoveNotification() {
      var self = this;

      var fn = function fn(id) {
        var f = self.props.onRemoveNotification;
        if (f) f(id);
      };

      return fn;
    }
  }, {
    key: "createItemNotification",
    value: function createItemNotification() {
      var _this2 = this;

      var self = this;

      var fn = function fn(item) {
        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_matrix_module_notification_item_jsx__WEBPACK_IMPORTED_MODULE_4__.default, {
          notification: item,
          onRemove: _this2.handleRemoveNotification()
        });
      };

      return fn;
    }
    /* Header: Matriz */

  }, {
    key: "handleRestoreMatrix",
    value: function handleRestoreMatrix() {
      var self = this;

      var fn = function fn(structure, mi) {
        var f = self.props.onRestoreMatrix;
        if (f) f(structure, mi);
      };

      return fn;
    }
  }, {
    key: "handleItemGroup",
    value: function handleItemGroup() {
      var self = this;

      var fn = function fn(structure, mi) {
        var f = self.props.onItemGroup;
        if (f) f(structure, mi);
      };

      return fn;
    }
  }, {
    key: "handleChangeMatrix",
    value: function handleChangeMatrix() {
      var self = this;

      var fn = function fn(m, s, mi, si) {
        var f = self.props.onChangeMatrix;
        if (f) f(m, s, mi, si);
      };

      return fn;
    }
    /* Header: Matriz */

    /* Header: Ubicación */

  }, {
    key: "handleRestoreMatrixLocation",
    value: function handleRestoreMatrixLocation() {
      var self = this;

      var fn = function fn(structure) {
        var f = self.props.onRestoreMatrix;
        if (f) f(structure);
      };

      return fn;
    }
  }, {
    key: "handleItemGroupLocation",
    value: function handleItemGroupLocation() {
      var self = this;

      var fn = function fn(structure) {
        var f = self.props.onItemGroup;
        if (f) f(structure);
      };

      return fn;
    }
  }, {
    key: "handleChangeMatrixLocation",
    value: function handleChangeMatrixLocation() {
      var self = this;

      var fn = function fn(m, s) {
        self.setState({
          matrix: m,
          structure: s
        }, function () {
          var f = self.props.onChangeMatrix;
          if (f) f(m, s);
        });
      };

      return fn;
    }
    /* Header: Ubicación */

    /* Header: Localización de Pozos */

  }, {
    key: "handleItemVehicle",
    value: function handleItemVehicle() {
      var self = this;

      var fn = function fn(vehicle) {
        var f = self.props.onItemVehicle(vehicle);
        if (f) f();
      };

      return fn;
    }
  }, {
    key: "handleItemVehicleReport",
    value: function handleItemVehicleReport() {
      var self = this;

      var fn = function fn(vehicle) {
        var f = self.props.onItemVehicleReport(vehicle);
        if (f) f();
      };

      return fn;
    }
  }, {
    key: "updateVisibilityVehicle",
    value: function updateVisibilityVehicle() {
      var self = this;

      var fn = function fn(json, id) {
        var f = self.props.onUpdateVisibilityVehicle(json, id);
        if (f) f();
      };

      return fn;
    }
    /* Header: Localización de Pozos */

  }, {
    key: "render",
    value: function render(props, state) {
      var srcAvatar = "/static/images/avatars/default.png";
      if (USER_AVATAR != '') srcAvatar = "/static/images/avatars/".concat(USER_AVATAR);
      var module = this.props.module;
      var menuLateral = false;
      var notifications = [];
      var itemMenuDashboard = false;

      if (window.SYSTEM_HOST === "diavaz.technotex.com") {
        itemMenuDashboard = function () {
          return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
            href: "/dashboard"
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
            className: "material-icons"
          }, "dashboard"), " Dashboard"));
        }();
      }

      if (module == _constants__WEBPACK_IMPORTED_MODULE_5__.default.MATRIX_MODULE) {
        var o = props.o;
        menuLateral = (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_matrix_module_menu_lateral_jsx__WEBPACK_IMPORTED_MODULE_1__.default, {
          o: o,
          onRestoreMatrix: this.handleRestoreMatrix(),
          onItemGroup: this.handleItemGroup(),
          onChangeMatrix: this.handleChangeMatrix()
        });
      } else if (module == _constants__WEBPACK_IMPORTED_MODULE_5__.default.LOCATION_MODULE) {
        var _o = props.o;
        menuLateral = (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_location_module_menu_lateral_jsx__WEBPACK_IMPORTED_MODULE_2__.default, {
          o: _o,
          onRestoreMatrix: this.handleRestoreMatrixLocation(),
          onItemGroup: this.handleItemGroupLocation(),
          onChangeMatrix: this.handleChangeMatrixLocation()
        });
      } else if (module == _constants__WEBPACK_IMPORTED_MODULE_5__.default.LOCATOR_MODULE) {
        var _o2 = props.o;
        menuLateral = (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_locator_module_menu_lateral_jsx__WEBPACK_IMPORTED_MODULE_3__.default, {
          o: _o2,
          onItemVehicle: this.handleItemVehicle(),
          onItemVehicleReport: this.handleItemVehicleReport(),
          onUpdateVisibilityVehicle: this.updateVisibilityVehicle()
        });
      }

      if (props.notifications) {
        notifications = props.notifications;
      }

      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("section", {
        className: "menu_top"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "row"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "col s12 m5 contrato_px"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "logo_pemex animated fadeInLeft",
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("img", {
        src: LOGO_LEFT,
        alt: "Logo"
      }))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "contrato"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", null, TITLE_ONE_LEFT, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("br", null), TITLE_TWO_LEFT))))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "col s12 m3 sion-contrato-client"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", null, TITLE_ONE, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("br", null), TITLE_TWO)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "col s12 m4 avatar_logo"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "avat"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "img_redondo bar_config",
        href: "#",
        onClick: this.handleOpenConfigMenu()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", null, USER_NAME, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", null, USER_JOB)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("img", {
        src: srcAvatar
      }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons right"
      }, "arrow_drop_down")))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "logo_ttx animated fadeIn",
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("img", {
        src: window.LOGO_TTX_DEFAULT,
        alt: "Logo"
      }))))))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("nav", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "row"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", {
        id: "nav-mobile",
        className: "nav_menu "
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        id: "mostrar_menu",
        className: "button-collapse bar_matrices",
        "data-activates": "slide-out",
        href: "#",
        onClick: this.handleOpenMenu()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "menu"))), itemMenuDashboard, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        href: "/matrices"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "developer_board"), "Matriz")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        href: "/charts"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "timeline"), "Gr\xE1fica")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        href: "/reports"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "assessment"), "Reportes")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        href: "/dynamic_graphics"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "filter_b_and_w"), "Gr\xE1ficos Din\xE1micos")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        href: "/operations"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "assignment"), "Operaciones")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        href: "/events"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "date_range"), "Eventos")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        href: "/location"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "room"), "Ubicaci\xF3n")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        href: "http://138.68.224.153:5000",
        target: "_blank"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "gps_fixed"), "Localizador")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        href: "/explorer"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "pageview"), "Explorador")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
        className: "float_right"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        href: "#",
        className: "bar_notific",
        onClick: this.handleOpenNotifications()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "chat_bubble"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", null, notifications.length)))), menuLateral, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", {
        id: "sbar_config",
        className: "sidebar_config",
        style: "margin-right: -300px;"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "config"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "avatar_bar"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("img", {
        src: srcAvatar,
        alt: "Imagen"
      })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("h6", null, USER_NAME, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("br", null), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("strong", null, USER_JOB)))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("br", null)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "menu"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        href: "/profile"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "edit"), " Editar Perfil"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "menu"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        href: "/configuration"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "settings"), " Configuraciones"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "menu"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        href: "".concat(_constants__WEBPACK_IMPORTED_MODULE_5__.default.URL_SERVER_AUTH, "/logout")
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "highlight_off"), " Cerrar Sesi\xF3n"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        id: "btn_cerrar_sidebar",
        href: "#",
        className: "btn bottm_left sidenav-close",
        onClick: this.handleCloseConfigMenu()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons left"
      }, "keyboard_arrow_left"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("br", null)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", {
        id: "bar_notific",
        "class": "sidebar_notif",
        style: "margin-right: -300px;"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
        className: "space"
      }), notifications.map(this.createItemNotification()), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        href: "#",
        className: "btn bottm_left sidenav-close",
        onClick: this.handleCloseNotifications()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons left"
      }, "keyboard_arrow_left")))))));
    }
  }]);

  return Header;
}(preact__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);

/***/ }),

/***/ "./src/location_module/menu-lateral.jsx":
/*!**********************************************!*\
  !*** ./src/location_module/menu-lateral.jsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var MenuLateral = /*#__PURE__*/function (_Component) {
  _inherits(MenuLateral, _Component);

  var _super = _createSuper(MenuLateral);

  function MenuLateral(props) {
    _classCallCheck(this, MenuLateral);

    return _super.call(this, props);
  }

  _createClass(MenuLateral, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      $(".button-collapse").sideNav();
    }
  }, {
    key: "handleCloseMenuLateral",
    value: function handleCloseMenuLateral() {
      var self = this;

      var fn = function fn(evt) {
        $('.button-collapse').sideNav('hide');
      };

      return fn;
    }
  }, {
    key: "handleChangeMatrix",
    value: function handleChangeMatrix(value) {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        var o = self.props.o;

        if (o) {
          var matrices = o.matrices_;
          if (!matrices) matrices = [];

          for (var i = 0; i < matrices.length; i++) {
            var m = matrices[i];

            if (m.id == value) {
              var s = m.structure;
              var f = self.props.onChangeMatrix;
              if (f) f(m, s);
              return;
            }
          }
        }
      };

      return fn;
    }
  }, {
    key: "handleItemGroup",
    value: function handleItemGroup(group) {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var structure = [group];
        var f = self.props.onItemGroup;
        if (f) f(structure);
      };

      return fn;
    }
  }, {
    key: "handleRestoreMatrix",
    value: function handleRestoreMatrix() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        var o = self.props.o;

        if (o) {
          var m = o.matrix;

          if (m) {
            if (!m.structure) m.structure = [];
            var structure = m.structure;
            var f = self.props.onRestoreMatrix;
            if (f) f(structure);
          }
        }
      };

      return fn;
    }
  }, {
    key: "createItemMatrix",
    value: function createItemMatrix() {
      var self = this;

      var fn = function fn(item, index) {
        var key = index = index + 1;
        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
          key: key
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
          style: "color: #888; margin-left: 20px;"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
          href: "#",
          onClick: self.handleChangeMatrix(item.id)
        }, item.name)));
      };

      return fn;
    }
  }, {
    key: "createItemGroup",
    value: function createItemGroup() {
      var _this = this;

      var self = this;

      var fn = function fn(item, index) {
        if (!item.sons) item.sons = [];
        var key = index = index + 1;
        var image = 'macropera.png';
        var type = item.type;
        if (type == 'Pozo') image = 'pozo.svg';
        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
          key: key
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
          className: "collapsible-header"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
          className: "col s2"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("img", {
          src: "/static/images/".concat(image),
          width: "24",
          height: "24",
          alt: "Icono de Grupo",
          style: "vertical-align: middle;"
        })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
          className: "col s10",
          onClick: _this.handleItemGroup(item)
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", null, item.name))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
          className: "collapsible-body"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", {
          className: "collapsible",
          "data-collapsible": "expandable"
        }, item.sons.map(_this.createItemGroup()))));
      };

      return fn;
    }
  }, {
    key: "getViewMatrix",
    value: function getViewMatrix(o) {
      if (!o) return;
      if (!o.matrix) return;
      if (!o.matrix.structure) o.matrix.structure = [];
      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "collapsible-header"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons",
        onClick: this.handleRestoreMatrix()
      }, "developer_board"), o.matrix.name), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "collapsible-body"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", {
        className: "collapsible",
        "data-collapsible": "expandable"
      }, o.matrix.structure.map(this.createItemGroup()))));
    }
  }, {
    key: "render",
    value: function render(props, state) {
      var o = props.o;

      if (!o) {
        o = {
          matrices_: []
        };
      }

      if (!o.matrices_) o.matrices_ = [];
      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", {
        id: "slide-out",
        className: "side-nav collapsible",
        "data-collapsible": "expandable"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "user-view"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "background"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("img", {
        src: "/static/images/sidebar.jpg",
        alt: "Imagen"
      })))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "collapsible-header"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "developer_board"), " Matrices"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "collapsible-body"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", {
        className: "collapsible",
        "data-collapsible": "expandable"
      }, o.matrices_.map(this.createItemMatrix())))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("br", null)), this.getViewMatrix(), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        href: "#",
        className: "btn bottm_right",
        id: "close_side",
        onClick: this.handleCloseMenuLateral()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons left"
      }, "keyboard_arrow_left"))));
    }
  }]);

  return MenuLateral;
}(preact__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MenuLateral);

/***/ }),

/***/ "./src/locator_module/menu-lateral.jsx":
/*!*********************************************!*\
  !*** ./src/locator_module/menu-lateral.jsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var MenuLateral = /*#__PURE__*/function (_Component) {
  _inherits(MenuLateral, _Component);

  var _super = _createSuper(MenuLateral);

  function MenuLateral(props) {
    _classCallCheck(this, MenuLateral);

    return _super.call(this, props);
  }

  _createClass(MenuLateral, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      $(".button-collapse").sideNav();
      $('.collapsible').collapsible();
    }
  }, {
    key: "handleCloseMenuLateral",
    value: function handleCloseMenuLateral() {
      var self = this;

      var fn = function fn(evt) {
        $('.button-collapse').sideNav('hide');
      };

      return fn;
    }
  }, {
    key: "handleItemVehicle",
    value: function handleItemVehicle(vehicle) {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        var f = self.props.onItemVehicle;
        if (f) f(vehicle);
      };

      return fn;
    }
  }, {
    key: "handleItemVehicleReport",
    value: function handleItemVehicleReport(vehicle) {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        var f = self.props.onItemVehicleReport;
        if (f) f(vehicle);
      };

      return fn;
    }
  }, {
    key: "handleChecked",
    value: function handleChecked(item) {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        var id = item.id;

        if (id) {
          var element = "#input-visible-".concat(id);
          var inputVisible = document.querySelector(element);
          var checked = inputVisible.checked;
          inputVisible.checked = !checked;
          var json = {
            visible: inputVisible.checked
          };
          var f = self.props.onUpdateVisibilityVehicle;
          if (f) f(json, id);
        }
      };

      return fn;
    }
  }, {
    key: "createItemVehicle",
    value: function createItemVehicle() {
      var self = this;

      var fn = function fn(item, index) {
        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
          className: "collapsible-header"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
          className: "col s2"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
          className: "material-icons"
        }, "directions_car")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
          className: "col s10 txt",
          style: "font-size: 1.4em; margin-left: 0.4em;font-weight: 200;",
          onClick: self.handleItemVehicle(item)
        }, item.alias)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
          className: "collapsible-body",
          style: "display: none;"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
          style: "text-align: center;"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
          "class": "switch"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
          onClick: self.handleChecked(item)
        }, "Off", (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
          id: "input-visible-".concat(item.id),
          checked: item.visible,
          type: "checkbox"
        }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
          "class": "lever"
        }), "On"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
          style: "text-align: center;",
          onClick: self.handleItemVehicleReport(item)
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
          className: "material-icons",
          style: "font-size: 2em; color: #d4d4d4; cursor: pointer;"
        }, "insert_drive_file"))));
      };

      return fn;
    }
  }, {
    key: "render",
    value: function render(props, state) {
      var o = props.o;

      if (!o) {
        o = {
          vehicles: []
        };
      } else {
        if (!o.vehicles) o.vehicles = [];
      }

      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", {
        id: "slide-out",
        className: "side-nav collapsible",
        "data-collapsible": "expandable"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "user-view"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "background"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("img", {
        src: "/static/images/sidebar.jpg",
        alt: "Imagen"
      })))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "collapsible-header"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "directions_car"), " Vehiculos"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "collapsible-body"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", {
        className: "collapsible",
        "data-collapsible": "expandable"
      }, o.vehicles.map(this.createItemVehicle())))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        href: "#",
        className: "btn bottm_right",
        onClick: this.handleCloseMenuLateral()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons left"
      }, "keyboard_arrow_left"))));
    }
  }]);

  return MenuLateral;
}(preact__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MenuLateral);

/***/ }),

/***/ "./src/matrix_module/chart-item-group.jsx":
/*!************************************************!*\
  !*** ./src/matrix_module/chart-item-group.jsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var _chart_view_variable_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chart-view-variable.jsx */ "./src/matrix_module/chart-view-variable.jsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var ChartItemGroup = /*#__PURE__*/function (_Component) {
  _inherits(ChartItemGroup, _Component);

  var _super = _createSuper(ChartItemGroup);

  function ChartItemGroup(props) {
    _classCallCheck(this, ChartItemGroup);

    return _super.call(this, props);
  }

  _createClass(ChartItemGroup, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      $('.collapsible').collapsible();
      $('.tooltipped').tooltip({
        delay: 20
      });
    }
  }, {
    key: "handleOpenDynamicGraphics",
    value: function handleOpenDynamicGraphics() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var son = self.props.son;

        if (son) {
          if (son.type == 'Pozo') {
            if (son.id) {
              var f = self.props.onOpenDynamicGraphicsGroup;
              if (f) f(son.id);
            }
          }
        }
      };

      return fn;
    }
  }, {
    key: "handleOpenDynamicGraphicsGroup",
    value: function handleOpenDynamicGraphicsGroup() {
      var self = this;

      var fn = function fn(group_id) {
        if (group_id) {
          var f = self.props.onOpenDynamicGraphicsGroup;
          if (f) f(group_id);
        }
      };

      return fn;
    }
  }, {
    key: "handleOpenComment",
    value: function handleOpenComment() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var group = self.props.son;

        if (group) {
          var o = {
            group_id: group.id,
            name: group.name
          };
          var f = self.props.onOpenCommentGroup;
          if (f) f(o);
          $('#comentarios_macro').modal('open');
        }
      };

      return fn;
    }
  }, {
    key: "handleOpenCommentGroup",
    value: function handleOpenCommentGroup() {
      var self = this;

      var fn = function fn(group) {
        if (group) {
          var f = self.props.onOpenCommentGroup;
          if (f) f(group);
        }
      };

      return fn;
    }
  }, {
    key: "handleOpenCommentVariable",
    value: function handleOpenCommentVariable() {
      var self = this;

      var fn = function fn(variable) {
        if (variable) {
          var f = self.props.onOpenCommentVariable;
          if (f) f(variable);
        }
      };

      return fn;
    }
  }, {
    key: "handleChangeSoundVariable",
    value: function handleChangeSoundVariable() {
      var self = this;

      var fn = function fn(variable) {
        if (variable) {
          var f = self.props.onChangeSoundVariable;
          if (f) f(variable);
        }
      };

      return fn;
    }
  }, {
    key: "createSons",
    value: function createSons() {
      var self = this;

      var fn = function fn(son, index) {
        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(ChartItemGroup, {
          key: index,
          son: son,
          onOpenDynamicGraphicsGroup: self.handleOpenDynamicGraphicsGroup(),
          onOpenCommentGroup: self.handleOpenCommentGroup(),
          onOpenCommentVariable: self.handleOpenCommentVariable(),
          onChangeSoundVariable: self.handleChangeSoundVariable()
        });
      };

      return fn;
    }
  }, {
    key: "createvariables",
    value: function createvariables() {
      var self = this;

      var fn = function fn(variable, index) {
        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_chart_view_variable_jsx__WEBPACK_IMPORTED_MODULE_1__.default, {
          key: index,
          variable: variable,
          onOpenCommentVariable: self.handleOpenCommentVariable(),
          onChangeSoundVariable: self.handleChangeSoundVariable()
        });
      };

      return fn;
    }
  }, {
    key: "render",
    value: function render(props, state) {
      var son = props.son;
      var variables = son.variables;
      var sons = son.sons;

      if (!sons) {
        sons = [];
      }

      if (!variables) {
        variables = [];
      }

      var son_comment = 'N/A';

      if (son.comment) {
        son_comment = son.comment;
      }

      var src = '/static/images/pozo.svg';

      if (son.type == 'Macropera') {
        src = '/static/images/macropera.png';
      } else if (son.type == 'Pozo') {
        src = '/static/images/pozo.svg';
      }

      var classActive = '';

      if (sons.length > 0 || variables.length > 0) {
        classActive = 'active';
      }

      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "thumb_matriz"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", {
        className: "collapsible collapsible-accordion abuelo",
        "data-collapsible": "accordion"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
        className: classActive
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "collapsible-header flexi ".concat(classActive)
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "col s1 icon"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("img", {
        src: src,
        width: "25",
        alt: son.type,
        style: "vertical-align: middle;"
      })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "col s9 txt"
      }, son.name), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "col s2 actions t_right"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "tooltipped",
        href: "#",
        "data-position": "left",
        "data-delay": "20",
        "data-tooltip": son_comment,
        onClick: this.handleOpenComment()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons right"
      }, "mode_comment")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        href: "#",
        onClick: this.handleOpenDynamicGraphics()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "filter_b_and_w")))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "collapsible-body abuelo",
        style: "display: none;"
      }, sons.map(this.createSons())), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "collapsible-body padre",
        style: "display: none;"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "row"
      }, variables.map(this.createvariables()))))));
    }
  }]);

  return ChartItemGroup;
}(preact__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChartItemGroup);

/***/ }),

/***/ "./src/matrix_module/chart-view-variable.jsx":
/*!***************************************************!*\
  !*** ./src/matrix_module/chart-view-variable.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! underscore */ "./node_modules/underscore/modules/index-all.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants.js */ "./src/constants.js");
/* harmony import */ var _chart_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chart.jsx */ "./src/matrix_module/chart.jsx");
/* harmony import */ var _charts_module_emitter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../charts_module/emitter.js */ "./src/charts_module/emitter.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }







var ChartViewVariableInline = /*#__PURE__*/function (_Component) {
  _inherits(ChartViewVariableInline, _Component);

  var _super = _createSuper(ChartViewVariableInline);

  function ChartViewVariableInline(props) {
    var _this;

    _classCallCheck(this, ChartViewVariableInline);

    _this = _super.call(this, props);
    _this.state = {
      emitter: new _charts_module_emitter_js__WEBPACK_IMPORTED_MODULE_4__.default(),
      preTimestamp: false
    };
    return _this;
  }

  _createClass(ChartViewVariableInline, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      $('.tooltipped').tooltip({
        delay: 20
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      $('.tooltipped').tooltip('remove');
      $('.tooltipped').tooltip({
        delay: 20
      });

      if (this.state.emitter) {
        var variable = this.props.variable; //EXPERIMENTAL alarm_id alarm_setpoint

        var variableIn = (0,underscore__WEBPACK_IMPORTED_MODULE_1__.clone)(variable);

        if (variableIn) {
          var variable_prefix_name = variableIn.id;
          var variable_unit = '';

          if (variable.is_custom) {
            variable_prefix_name = "cv_".concat(variable_prefix_name);
          } else {
            variable_prefix_name = "v_".concat(variable_prefix_name);
          }

          if (variableIn.display) {
            variable_unit = variableIn.display;
          } else {
            variable_unit = variableIn.unit;
          }

          variableIn.variable_prefix_name = variable_prefix_name;
          variableIn.variable_unit = variable_unit;
          this.state.emitter.emit(_constants_js__WEBPACK_IMPORTED_MODULE_2__.default.EVENT_UDAPTE_ALARMS_ACTIVE, variableIn);
        }

        if (variable.timestamp !== this.state.preTimestamp) {
          this.state.preTimestamp = variable.timestamp;
          var o = {
            variable_id: variable.id,
            is_custom: variable.is_custom,
            value: variable.value,
            timestamp: variable.timestamp
          };

          if (o.value === ' ') {
            this.state.emitter.emit(_constants_js__WEBPACK_IMPORTED_MODULE_2__.default.EVENT_EMPTY_UDAPTE_VARIABLES_VALUE, o);
          } else {
            this.state.emitter.emit(_constants_js__WEBPACK_IMPORTED_MODULE_2__.default.EVENT_UDAPTE_VARIABLES_VALUE, o);
          }
        }
      }
    }
  }, {
    key: "getRecords24hrsVariable",
    value: function getRecords24hrsVariable() {
      var _this2 = this;

      var self = this;

      var fn = function fn(f) {
        var variable = self.props.variable;

        if (variable) {
          var now = new Date();
          var time = now.getTime() - 1000 * 60 * 60 * 6;
          var start = new Date(time);
          var json = {
            variables: [variable.id],
            start_date: _this2.getDateToString(start),
            final_date: _this2.getDateToString(now)
          };
          var url = "".concat(_constants_js__WEBPACK_IMPORTED_MODULE_2__.default.URL_SERVER_VARIABLES, "/record");

          if (variable.is_custom) {
            url = "".concat(_constants_js__WEBPACK_IMPORTED_MODULE_2__.default.URL_SERVER_CUSTOM_VARIABLES, "/record");
          }

          var xhr = $.ajax({
            url: url,
            type: _constants_js__WEBPACK_IMPORTED_MODULE_2__.default.METHOD_POST,
            contentType: _constants_js__WEBPACK_IMPORTED_MODULE_2__.default.APPLICATION_JSON,
            data: JSON.stringify(json)
          });
          xhr.done(function (res, status, response) {
            if (response.status === _constants_js__WEBPACK_IMPORTED_MODULE_2__.default.STATUS_OK) {
              var docs = res.docs;
              docs = self.updateVariable(docs);
              var variable_name = variable.name;

              if (variable.rename) {
                variable_name = variable.rename;
              }

              var o = {
                variables: docs,
                start_date: json.start_date,
                final_date: json.final_date,
                title: "".concat(variable_name)
              };
              f(null, o);
            } else if (response.status === _constants_js__WEBPACK_IMPORTED_MODULE_2__.default.STATUS_ACCEPTED) {
              f(res.message);
            }
          });
          xhr.fail(function (res, status, respose) {
            if (res.responseJSON) {
              var _json = res.responseJSON;
              f(_json.message);
            } else {
              f(_constants_js__WEBPACK_IMPORTED_MODULE_2__.default.MESSAGE_ERROR);
            }
          });
        }
      };

      return fn;
    }
  }, {
    key: "updateVariable",
    value: function updateVariable(docs) {
      var variable = this.props.variable;

      if (docs.length > 0) {
        var variable_name = variable.name;
        var variable_display = '';

        if (variable.display) {
          variable_display = variable.display;
        } else {
          variable_display = variable.unit;
        }

        if (variable.rename) {
          variable_name = variable.rename;
        }

        docs[0].variable_display = variable_display;
        docs[0].variable_name = variable_name;
        docs[0].variable_is_custom = variable.is_custom;

        if ((0,underscore__WEBPACK_IMPORTED_MODULE_1__.isString)(variable.expression)) {
          docs[0].variable_expression = variable.expression;
        }
      }

      return docs;
    }
  }, {
    key: "handleOpenComment",
    value: function handleOpenComment() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var variable = self.props.variable;

        if (variable) {
          var name = variable.name;

          if (variable.rename) {
            name = variable.rename;
          }

          var o = {
            variable_id: variable.id,
            is_custom: variable.is_custom,
            name: name,
            device: variable.device
          };
          var f = self.props.onOpenCommentVariable;
          if (f) f(o);
          $('#comentarios_macro').modal('open');
        }
      };

      return fn;
    }
  }, {
    key: "handleChangeSound",
    value: function handleChangeSound(variable) {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();

        if (variable) {
          var f = self.props.onChangeSoundVariable;
          if (f) f(variable);
        }
      };

      return fn;
    }
  }, {
    key: "replaceAll",
    value: function replaceAll(s, old, n) {
      s = s.replace(old, n);
      var i = s.indexOf(old);

      if (i >= 0) {
        this.replaceAll(s, old, n);
      }

      return s;
    }
  }, {
    key: "getDateToString",
    value: function getDateToString(date) {
      var str = 'N/A';

      if ((0,underscore__WEBPACK_IMPORTED_MODULE_1__.isDate)(date) || (0,underscore__WEBPACK_IMPORTED_MODULE_1__.isNumber)(date)) {
        date = new Date(date);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        if (month < 10) {
          month = "0".concat(month);
        }

        if (day < 10) {
          day = "0".concat(day);
        }

        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();

        if (hour < 10) {
          hour = "0".concat(hour);
        }

        if (min < 10) {
          min = "0".concat(min);
        }

        if (sec < 10) {
          sec = "0".concat(sec);
        }

        str = "".concat(year, "-").concat(month, "-").concat(day, " ").concat(hour, ":").concat(min, ":").concat(sec);
      }

      return str;
    }
  }, {
    key: "render",
    value: function render(props, state) {
      var variable = props.variable;
      var prefix = '-';
      if (variable.is_custom) prefix = '-cv-';
      var variable_comment = 'N/A';
      var variable_sound_icon = 'volume_up';

      if (variable.comment) {
        variable_comment = variable.comment;
      }

      if (variable.mute) {
        variable_sound_icon = 'volume_off';
      } else {
        variable_sound_icon = 'volume_up';
      }

      var urlQuick = "/charts/".concat(variable.id);

      if (variable.is_custom) {
        urlQuick = "/charts/".concat(variable.id, "/true");
      }

      var variable_color = variable.color;
      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "variable sion-variable-chart",
        style: "background-color: ".concat(variable_color, ";")
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "row"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "actions_var"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        hidden: !variable.on_timeout,
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons right"
      }, "access_time")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        hidden: !variable.is_ringing,
        href: "#",
        onClick: this.handleChangeSound(variable)
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons right"
      }, variable_sound_icon)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        hidden: true,
        href: "#",
        onClick: this.handleOpenComment(),
        className: "tooltipped",
        "data-position": "bottom",
        "data-delay": "20",
        "data-tooltip": variable_comment
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons right"
      }, "mode_comment")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        href: urlQuick
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons right"
      }, "show_chart")))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_chart_jsx__WEBPACK_IMPORTED_MODULE_3__.default, {
        chart: "chart-24".concat(prefix).concat(variable.id),
        init: this.getRecords24hrsVariable(),
        chartEmitter: this.state.emitter
      }));
    }
  }]);

  return ChartViewVariableInline;
}(preact__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChartViewVariableInline);

/***/ }),

/***/ "./src/matrix_module/chart-view.jsx":
/*!******************************************!*\
  !*** ./src/matrix_module/chart-view.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var _chart_item_group_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chart-item-group.jsx */ "./src/matrix_module/chart-item-group.jsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var ChartView = /*#__PURE__*/function (_Component) {
  _inherits(ChartView, _Component);

  var _super = _createSuper(ChartView);

  function ChartView(props) {
    _classCallCheck(this, ChartView);

    return _super.call(this, props);
  }

  _createClass(ChartView, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "handleTableView",
    value: function handleTableView() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        $('.tooltipped').tooltip('remove');
        var f = self.props.onTableView;
        if (f) f();
      };

      return fn;
    }
  }, {
    key: "handleTableViewCol",
    value: function handleTableViewCol() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        $('.tooltipped').tooltip('remove');
        var f = self.props.onTableViewCol;
        if (f) f();
      };

      return fn;
    }
  }, {
    key: "handleListView",
    value: function handleListView() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        $('.tooltipped').tooltip('remove');
        var f = self.props.onListView;
        if (f) f();
      };

      return fn;
    }
  }, {
    key: "handleListViewMin",
    value: function handleListViewMin() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        $('.tooltipped').tooltip('remove');
        var f = self.props.onListViewMin;
        if (f) f();
      };

      return fn;
    }
  }, {
    key: "handleOpenCommentGroup",
    value: function handleOpenCommentGroup() {
      var self = this;

      var fn = function fn(group) {
        if (group) {
          var f = self.props.onOpenCommentVariable;
          if (f) f(group);
        }
      };

      return fn;
    }
  }, {
    key: "handleOpenCommentVariable",
    value: function handleOpenCommentVariable() {
      var self = this;

      var fn = function fn(variable) {
        if (variable) {
          var f = self.props.onOpenCommentVariable;
          if (f) f(variable);
        }
      };

      return fn;
    }
  }, {
    key: "handleChangeSoundVariable",
    value: function handleChangeSoundVariable() {
      var self = this;

      var fn = function fn(variable) {
        if (variable) {
          var f = self.props.onChangeSoundVariable;
          if (f) f(variable);
        }
      };

      return fn;
    }
  }, {
    key: "handleOpenDynamicGraphicsGroup",
    value: function handleOpenDynamicGraphicsGroup() {
      var self = this;

      var fn = function fn(group_id) {
        if (group_id) {
          var f = self.props.onOpenDynamicGraphicsGroup;
          if (f) f(group_id);
        }
      };

      return fn;
    }
  }, {
    key: "createStructure",
    value: function createStructure() {
      var self = this;

      var fn = function fn(son, index) {
        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_chart_item_group_jsx__WEBPACK_IMPORTED_MODULE_1__.default, {
          key: index,
          son: son,
          onOpenDynamicGraphicsGroup: self.handleOpenDynamicGraphicsGroup(),
          onOpenCommentGroup: self.handleOpenCommentGroup(),
          onOpenCommentVariable: self.handleOpenCommentVariable(),
          onChangeSoundVariable: self.handleChangeSoundVariable()
        });
      };

      return fn;
    }
  }, {
    key: "render",
    value: function render(props, state) {
      var s = props.structure;

      if (!s) {
        s = [];
      }

      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "col s12 m12 body_int"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "fixed-action-btn horizontal click-to-toggle"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn-large btn_ttx_rojo pulse"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "visibility")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
        onClick: this.handleListView()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn_ttx tooltipped",
        "data-position": "top",
        "data-delay": "20",
        "data-tooltip": "Vista Avanzada",
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "view_list"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
        onClick: this.handleListViewMin()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn_ttx tooltipped",
        "data-position": "top",
        "data-delay": "20",
        "data-tooltip": "Vista Clasica",
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "list"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
        onClick: this.handleTableView()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn_ttx tooltipped",
        "data-position": "top",
        "data-delay": "20",
        "data-tooltip": "Vista en Tabla",
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "view_comfy"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
        onClick: this.handleTableViewCol()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn_ttx tooltipped",
        "data-position": "top",
        "data-delay": "20",
        "data-tooltip": "Vista en Tabla de Columnas",
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "view_week"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn_ttx tooltipped",
        "data-position": "top",
        "data-delay": "20",
        "data-tooltip": "Vista de Grafica",
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "show_chart"))))), s.map(this.createStructure()));
    }
  }]);

  return ChartView;
}(preact__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChartView);

/***/ }),

/***/ "./src/matrix_module/chart.jsx":
/*!*************************************!*\
  !*** ./src/matrix_module/chart.jsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! underscore */ "./node_modules/underscore/modules/index-all.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../constants.js */ "./src/constants.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var CHART_Y_AXIS_UNIT = 'chart-y-axis-unit';
var INPUT_SPAN_MIN = 'input-span-min';
var INPUT_SPAN_MAX = 'input-span-max';
var TRIGGER_ZOOM = 'zoom';

var Chart = /*#__PURE__*/function (_Component) {
  _inherits(Chart, _Component);

  var _super = _createSuper(Chart);

  function Chart(props) {
    var _this;

    _classCallCheck(this, Chart);

    _this = _super.call(this, props);
    _this.state = {
      charting: false,
      variables_: [],
      variables: [],
      date_of: false,
      date_to: false,
      series: [],
      isOk: false,
      variablesSetpoint: [],
      setpoints: []
    };
    _this.extremes = {
      x: {
        min: 0,
        max: 0
      },
      y: {
        min: 0,
        max: 0
      }
    };
    return _this;
  }

  _createClass(Chart, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var f = self.props.init;

      if (f) {
        f(function (err, o) {
          if (err) {
            Materialize.toast(err, 2500);
            ;
            return;
          }

          var chart = self.getConfigChart(o);
          self.updateChart(chart);
          $('.tooltipped').tooltip('remove');
          $('.tooltipped').tooltip({
            delay: 20
          });
        });
      }

      if (this.props.chartEmitter) {
        this.props.chartEmitter.on(_constants_js__WEBPACK_IMPORTED_MODULE_2__.default.EVENT_UDAPTE_VARIABLES_VALUE, function (variable) {
          if (variable) {
            if (self.state.isOk) {
              if (!self.chartOne) return;
              var series = self.state.series;

              for (var i = 0; i < series.length; i++) {
                var serie = series[i];
                var id = variable.variable_id;
                var isCustom = variable.is_custom;
                if (!isCustom) isCustom = false;
                if (!serie.is_custom) serie.is_custom = false;

                if (serie.variable_id === id) {
                  if (serie.is_custom === isCustom) {
                    var timestamp = new Date(variable.timestamp);
                    var value = variable.value;
                    var expression = serie.expression;
                    var display = serie.display;
                    var hasConversion = (0,underscore__WEBPACK_IMPORTED_MODULE_1__.isString)(expression) && (0,underscore__WEBPACK_IMPORTED_MODULE_1__.isString)(display);

                    if (hasConversion && (0,underscore__WEBPACK_IMPORTED_MODULE_1__.isNumber)(value) && !(0,underscore__WEBPACK_IMPORTED_MODULE_1__.isNaN)(value)) {
                      var nExpression = self.replaceAll(expression, '${value}', value);

                      try {
                        var v = math.eval(nExpression);
                        var str = "".concat(v);
                        var iPoint = str.indexOf('.');

                        if (iPoint === -1) {
                          iPoint = str.length - 4;
                        }

                        var nString = math.format(v, {
                          precision: iPoint + 4
                        });
                        var nValue = parseFloat(nString);

                        if ((0,underscore__WEBPACK_IMPORTED_MODULE_1__.isNumber)(nValue)) {
                          value = nValue;
                        }
                      } catch (e) {
                        console.log('Exception: ', timestamp, value);
                      }
                    }

                    var time = timestamp.getTime();
                    var point = [time, value];

                    if (self.chartOne.series[serie.position]) {
                      var shifted = serie.shifted;
                      self.chartOne.series[serie.position].addPoint(point, true, shifted);

                      if (!shifted) {
                        var rLength = serie.rLength + 1;
                        self.state.series[i].rLength = rLength; // console.log("Shifted: INACTIVE: ", rLength, id, isCustom);

                        if (rLength > 8000) {
                          self.state.series[i].shifted = true;
                          console.log("Shifted: ACTIVE");
                        }
                      }
                    }

                    break;
                  }
                }
              }
            }
          }
        });
        this.props.chartEmitter.on(_constants_js__WEBPACK_IMPORTED_MODULE_2__.default.EVENT_EMPTY_UDAPTE_VARIABLES_VALUE, function (variable) {
          if (variable) {
            if (self.state.isOk) {
              if (!self.chartOne) return;
              var series = self.state.series;

              for (var i = 0; i < series.length; i++) {
                var serie = series[i];
                var id = variable.variable_id;
                var isCustom = variable.is_custom;
                if (!isCustom) isCustom = false;
                if (!serie.is_custom) serie.is_custom = false;

                if (serie.variable_id === id) {
                  if (serie.is_custom === isCustom) {
                    var timestamp = new Date(variable.timestamp);
                    var value = variable.value;
                    if (value === ' ') value = 0;
                    if (!(0,underscore__WEBPACK_IMPORTED_MODULE_1__.isNumber)(value)) value = 0;
                    var time = timestamp.getTime();
                    var point = [time, value];

                    if (self.chartOne.series[serie.position]) {
                      var shifted = serie.shifted;
                      self.chartOne.series[serie.position].addPoint(point, true, shifted);

                      if (!shifted) {
                        var rLength = serie.rLength + 1;
                        self.state.series[i].rLength = rLength; // console.log("Shifted: INACTIVE: ", rLength, id, isCustom);

                        if (rLength > 8000) {
                          self.state.series[i].shifted = true;
                          console.log("Shifted: ACTIVE");
                        }
                      }
                    }

                    break;
                  }
                }
              }
            }
          }
        });
        this.props.chartEmitter.on(_constants_js__WEBPACK_IMPORTED_MODULE_2__.default.EVENT_UDAPTE_ALARMS_ACTIVE, function (variable) {
          if (self.chartOne) {
            for (var j = 0; j < self.chartOne.yAxis.length; j++) {
              if (self.chartOne.yAxis[j]) {
                var className = self.chartOne.yAxis[j].userOptions.className;

                if (className === CHART_Y_AXIS_UNIT) {
                  var text = self.chartOne.yAxis[j].userOptions.title.text;

                  if (text === variable.variable_unit) {
                    var id = "".concat(variable.variable_prefix_name);
                    self.chartOne.yAxis[j].removePlotLine(id);
                    break;
                  }
                }
              }
            }

            if (variable.alarm_id) {
              if (variable.color) {
                var addPlot = {
                  value: variable.alarm_setpoint,
                  color: variable.color,
                  dashStyle: 'shortdash',
                  width: 2,
                  label: {
                    style: {
                      fontWeight: 'bold',
                      color: '#fff'
                    },
                    text: variable.alarm_alias
                  },
                  id: "".concat(variable.variable_prefix_name)
                };

                for (var _j = 0; _j < self.chartOne.yAxis.length; _j++) {
                  if (self.chartOne.yAxis[_j]) {
                    var _className = self.chartOne.yAxis[_j].userOptions.className;

                    if (_className === CHART_Y_AXIS_UNIT) {
                      var _text = self.chartOne.yAxis[_j].userOptions.title.text;

                      if (_text === variable.variable_unit) {
                        self.chartOne.yAxis[_j].addPlotLine(addPlot);

                        break;
                      }
                    }
                  }
                }
              }
            }
          }
        });
      }
    }
  }, {
    key: "getConfigChart",
    value: function getConfigChart(o) {
      var self = this;
      self.state.series = [];
      self.state.isOk = false;
      var variables = o.variables;
      var start_date = new Date(o.start_date);
      var final_date = new Date(o.final_date);
      var diff = final_date.getTime() - start_date.getTime();
      var maxNumber = 8000;
      var seriesOptions = [];
      var units = [];
      var yAxis = {
        opposite: false,
        className: CHART_Y_AXIS_UNIT,
        title: {
          text: 'UNIDAD (U)'
        }
      };
      var length = variables.length;
      if (length >= 1) yAxis = [];
      self.state.setpoints = [];
      self.state.variablesSetpoint = [];

      var _loop = function _loop(i) {
        var variable = variables[i];
        var shifted = false;
        if (!variable.variable_alarms) variable.variable_alarms = [];
        var variableSetpoint = {
          id: variable.variable_id,
          device: variable.variable_device,
          name: variable.variable_name,
          unit: variable.variable_display,
          alarms: variable.variable_alarms
        };
        self.state.variablesSetpoint.push(variableSetpoint);
        var records = variable.records;
        if (!records) records = [];
        var rLength = records.length;

        if (rLength > maxNumber) {
          shifted = true;
          maxNumber = rLength;
        }

        var variable_name = variable.variable_name;
        variable_name = "".concat(variable.variable_device, ".").concat(variable_name);
        var variable_color = variable.variable_color;
        if (!variable_color) variable_color = '#F44336';
        var display = variable.variable_display;
        var expression = variable.variable_expression;
        var into = false;
        var yAxisIndex = -1;

        if (display) {
          for (var j = 0; j < units.length; j++) {
            var unit = units[j];

            if (unit.display === display) {
              yAxisIndex = j;
              into = true;
              break;
            }
          }

          if (!into) {
            var _o = {
              display: display,
              expression: expression
            };
            units.push(_o);
          }
        }

        if (!into) {
          var axis = {
            lineColor: variable_color,
            lineWidth: 2,
            className: CHART_Y_AXIS_UNIT,
            labels: {
              format: "{value} ".concat(display)
            },
            title: {
              text: display
            },
            plotLines: [{
              value: 0,
              width: 2,
              color: 'silver'
            }]
          };
          var unitsSize = units.length;

          if (unitsSize % 2 != 0) {
            axis.opposite = false;
          }

          if (unitsSize > 0) {
            axis.gridLineWidth = 1;
          }

          yAxis.push(axis);
          yAxisIndex = yAxis.length - 1;
        }

        var hasConversion = (0,underscore__WEBPACK_IMPORTED_MODULE_1__.isString)(expression) && (0,underscore__WEBPACK_IMPORTED_MODULE_1__.isString)(display);
        var serie = {
          id: 'dataseries',
          name: variable_name,
          color: variable_color,
          lineWidth: 2,
          tooltip: {
            valueSuffix: " ".concat(display)
          },
          data: function () {
            var values = [];
            var size = records.length;

            for (var _j2 = 0; _j2 < size; _j2++) {
              var record = records[_j2];
              var timestamp = new Date(record.t);
              var value = record.v;

              if (hasConversion && (0,underscore__WEBPACK_IMPORTED_MODULE_1__.isNumber)(value) && !(0,underscore__WEBPACK_IMPORTED_MODULE_1__.isNaN)(value)) {
                var nExpression = self.replaceAll(expression, '${value}', value);

                try {
                  var v = math.eval(nExpression);
                  var str = "".concat(v);
                  var iPoint = str.indexOf('.');

                  if (iPoint === -1) {
                    iPoint = str.length - 4;
                  }

                  var nString = math.format(v, {
                    precision: iPoint + 4
                  });
                  var nValue = parseFloat(nString);

                  if ((0,underscore__WEBPACK_IMPORTED_MODULE_1__.isNumber)(nValue)) {
                    value = nValue;
                  }
                } catch (e) {
                  console.log('Exception: ', timestamp, value);
                }
              }

              var time = timestamp.getTime();
              var _o2 = [time, value];
              values.push(_o2);
            }

            return values;
          }()
        };

        if (yAxisIndex > -1) {
          serie.yAxis = yAxisIndex;
        }

        seriesOptions.push(serie);
        var size = seriesOptions.length;

        if (size > 0) {
          var position = size - 1;
          self.state.series.push({
            rLength: rLength,
            shifted: shifted,
            position: position,
            variable_id: variable.variable_id,
            is_custom: variable.variable_is_custom,
            expression: variable.variable_expression,
            display: variable.variable_display
          });
        }
      };

      for (var i = 0; i < length; i++) {
        _loop(i);
      }

      var startDateUTC = Chart.getUTCDate(start_date);
      var title = o.title;
      var subtitle = o.subtitle;
      var chart = {
        key: this.props.chart,
        pointStart: startDateUTC,
        yAxis: yAxis,
        title: title,
        subtitle: subtitle,
        seriesOptions: seriesOptions,
        variables: variables,
        diff: diff,
        maxNumber: maxNumber
      };

      if (chart.key === '24') {
        chart.pointInterval = 1000 * 20;
      } else if (chart.key === 'annual') {
        chart.pointInterval = 1000 * 60 * 60 * 24;
      } else {
        chart.pointInterval = 1000 * 20;
      }

      return chart;
    }
  }, {
    key: "updateChart",
    value: function updateChart(chart) {
      var self = this;
      var chartKey = chart.key;
      var keyChartContent = "container-chart-".concat(chartKey);
      var buttons = [];
      var diff = chart.diff;
      var dataGroupingStatus = false;

      if (chart.maxNumber > 18000) {
        dataGroupingStatus = true;
      }

      var day = 1000 * 60 * 60 * 24;

      if (diff < day * 3) {
        buttons = [{
          count: 15,
          type: 'minute',
          text: '15M'
        }, {
          count: 30,
          type: 'minute',
          text: '30M'
        }, {
          count: 1,
          type: 'hour',
          text: '1H'
        }];
      } else if (diff >= day * 3 && diff < day * 15) {
        buttons = [{
          count: 30,
          type: 'minute',
          text: '30M'
        }, {
          count: 60,
          type: 'minute',
          text: '1H'
        }, {
          count: 12,
          type: 'hour',
          text: '12H'
        }];
      } else if (diff >= day * 15 && diff < day * 31) {
        buttons = [{
          count: 1,
          type: 'hour',
          text: '1H'
        }, {
          count: 12,
          type: 'hour',
          text: '12H'
        }, {
          count: 1,
          type: 'day',
          text: '1D'
        }];
      } else if (diff >= day * 31 && diff < day * 61) {
        buttons = [{
          count: 12,
          type: 'hour',
          text: '12H'
        }, {
          count: 1,
          type: 'day',
          text: '1D'
        }, {
          count: 1,
          type: 'week',
          text: '1S'
        }];
      } else if (diff >= day * 61 && diff < day * 181) {
        buttons = [{
          count: 1,
          type: 'day',
          text: '1D'
        }, {
          count: 1,
          type: 'week',
          text: '1S'
        }, {
          count: 1,
          type: 'month',
          text: '1M'
        }];
      } else if (diff >= day * 181 && diff < day * 366) {
        buttons = [{
          count: 1,
          type: 'week',
          text: '1S'
        }, {
          count: 2,
          type: 'week',
          text: '2S'
        }, {
          count: 1,
          type: 'month',
          text: '1M'
        }];
      } else if (diff >= day * 366 && diff < day * 730) {
        buttons = [{
          count: 1,
          type: 'week',
          text: '1S'
        }, {
          count: 2,
          type: 'week',
          text: '2S'
        }, {
          count: 1,
          type: 'month',
          text: '1M'
        }];
      } else {
        buttons = [{
          count: 2,
          type: 'week',
          text: '2S'
        }, {
          count: 1,
          type: 'month',
          text: '1M'
        }, {
          count: 3,
          type: 'month',
          text: '3M'
        }];
      }

      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      console.log(tz);
      var config = {
        time: {
          timezone: tz
        },
        chart: {
          //zoomType: 'xy',
          resetZoomButton: {
            theme: {
              display: 'none'
            }
          },
          events: {
            click: function click(e) {
              var inputMin = document.querySelector("#".concat(INPUT_SPAN_MIN, "-").concat(chartKey));
              var inputMax = document.querySelector("#".concat(INPUT_SPAN_MAX, "-").concat(chartKey));

              if (inputMin && inputMax) {
                var min = inputMin.value.trim();
                min = parseFloat(min);
                var max = inputMax.value.trim();
                max = parseFloat(max);

                if (!(0,underscore__WEBPACK_IMPORTED_MODULE_1__.isNaN)(max) && !(0,underscore__WEBPACK_IMPORTED_MODULE_1__.isNaN)(min)) {
                  var _sizeY = self.chartOne.yAxis.length;

                  for (var i = 0; i < _sizeY; i++) {
                    var className = self.chartOne.yAxis[i].userOptions.className;

                    if (className === CHART_Y_AXIS_UNIT) {
                      self.chartOne.yAxis[i].setExtremes(min, max);
                    }
                  }
                }
              }
            }
          }
        },
        boost: {
          useGPUTranslations: true
        },
        plotOptions: {
          series: {
            cursor: 'pointer',
            dataGrouping: {
              enabled: dataGroupingStatus
            },
            turboThreshold: chart.maxNumber * 2,
            pointStart: chart.pointStart,
            pointInterval: chart.pointInterval
          }
        },
        legend: {
          enabled: false
        },
        xAxis: {
          events: {
            afterSetExtremes: self.getRecordsForExtremes()
          },
          gridLineWidth: 1
        },
        yAxis: chart.yAxis,
        tooltip: {
          split: true,
          formatter: function formatter() {
            var tooltip = [false];

            if (this.point) {
              var title = this.point.title;
              var text = this.point.text;
              var date = this.point.x;
              var s = self.chartOne.time.dateFormat('%Y-%m-%d %H:%M:%S', date);
              var content = title + '<br>' + text + '<br>' + s;
              tooltip[0] = content;
            }

            var points = [];

            if (this.points) {
              this.points.map(function (point) {
                var name = false;
                var unit = '';

                if (point) {
                  name = point.series.name;
                  unit = point.series.userOptions.tooltip.valueSuffix;
                }

                var date = point.x;
                var s = self.chartOne.time.dateFormat('%Y-%m-%d %H:%M:%S', date);
                var content = name + '<br>' + point.y + ' ' + unit + '<br>' + s;
                points.push({
                  y: point.point.plotY,
                  content: content
                });
              });
            }

            for (var i = 0; i < points.length; i++) {
              var point = points[i];
              tooltip.push(point.content);
            }

            return tooltip;
          }
        },
        rangeSelector: {
          buttons: buttons,
          inputEnabled: false,
          selected: 0
        },
        title: {
          text: chart.title
        },

        /*subtitle: {
          text: chart.subtitle
        },*/
        exporting: {
          enabled: true
        },
        navigator: {
          enabled: true
        },
        series: chart.seriesOptions
      }; //console.log(JSON.stringify(config));

      console.time('line'); // Create the chart

      this.chartOne = Highcharts.stockChart(keyChartContent, config);
      console.timeEnd('line');
      var sizeX = this.chartOne.xAxis.length;
      var sizeY = this.chartOne.yAxis.length;

      for (var i = 0; i < sizeX; i++) {
        self.extremes.x.min = this.chartOne.xAxis[i].min;
        self.extremes.x.max = this.chartOne.xAxis[i].max;
      }

      for (var _i = 0; _i < sizeY; _i++) {
        var className = self.chartOne.yAxis[_i].userOptions.className;

        if (className === CHART_Y_AXIS_UNIT) {
          self.extremes.y.min = this.chartOne.yAxis[_i].min;
          self.extremes.y.max = this.chartOne.yAxis[_i].max;
        }
      }

      self.state.isOk = true;
    }
  }, {
    key: "getRecordsForExtremes",
    value: function getRecordsForExtremes() {
      var self = this;

      var fn = function fn(evt) {
        if (evt.trigger === TRIGGER_ZOOM) {
          var chartKey = self.props.chart;
          var keyBtnResetZoom = "#content-reset-zoom-".concat(chartKey);
          $(keyBtnResetZoom).show();
          $('.highcharts-range-selector-group').hide();
          var sizeY = self.chartOne.yAxis.length;

          for (var i = 0; i < sizeY; i++) {
            var className = self.chartOne.yAxis[i].userOptions.className;

            if (className === CHART_Y_AXIS_UNIT) {
              self.chartOne.yAxis[i].setExtremes(undefined, undefined);
            }
          }
        }
      };

      return fn;
    }
  }, {
    key: "handleResetZoom",
    value: function handleResetZoom() {
      var _this2 = this;

      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();

        if (self.chartOne) {
          var chartKey = self.props.chart;
          var keyBtnResetZoom = "#content-reset-zoom-".concat(chartKey);
          $(keyBtnResetZoom).hide();
          $('.highcharts-range-selector-group').show();
          var sizeX = _this2.chartOne.xAxis.length;
          var sizeY = _this2.chartOne.yAxis.length;

          for (var i = 0; i < sizeX; i++) {
            self.chartOne.xAxis[i].setExtremes(self.extremes.x.min, self.extremes.x.max);
          }

          for (var _i2 = 0; _i2 < sizeY; _i2++) {
            var className = self.chartOne.yAxis[_i2].userOptions.className;

            if (className === CHART_Y_AXIS_UNIT) {
              self.chartOne.yAxis[_i2].setExtremes(undefined, undefined);
            }
          }
        }
      };

      return fn;
    }
  }, {
    key: "getDateToString",
    value: function getDateToString(date) {
      var str = 'N/A';

      if ((0,underscore__WEBPACK_IMPORTED_MODULE_1__.isDate)(date) || (0,underscore__WEBPACK_IMPORTED_MODULE_1__.isNumber)(date)) {
        date = new Date(date);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        if (month < 10) {
          month = "0".concat(month);
        }

        if (day < 10) {
          day = "0".concat(day);
        }

        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();

        if (hour < 10) {
          hour = "0".concat(hour);
        }

        if (min < 10) {
          min = "0".concat(min);
        }

        if (sec < 10) {
          sec = "0".concat(sec);
        }

        str = "".concat(year, "-").concat(month, "-").concat(day, " ").concat(hour, ":").concat(min, ":").concat(sec);
      }

      return str;
    }
  }, {
    key: "parseDate",
    value: function parseDate(s) {
      if (s) {
        if ((0,underscore__WEBPACK_IMPORTED_MODULE_1__.isString)(s)) {
          var elements = s.split('-');
          elements = elements.reverse();
          var value = '';

          for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            if (i === 0) {
              value = "".concat(element);
            } else {
              value = "".concat(value, "-").concat(element);
            }
          }

          return value;
        }
      }

      return s;
    }
  }, {
    key: "parseTime",
    value: function parseTime(s) {
      if (s) {
        if ((0,underscore__WEBPACK_IMPORTED_MODULE_1__.isString)(s)) {
          var elements = s.split(':');

          if (elements.length === 3) {
            var hours = elements[0];
            var minutes = elements[1];
            var value = "".concat(hours, ":").concat(minutes);
            return value;
          }
        }
      }

      return s;
    }
  }, {
    key: "replaceAll",
    value: function replaceAll(s, old, n) {
      s = s.replace(old, n);
      var i = s.indexOf(old);

      if (i >= 0) {
        this.replaceAll(s, old, n);
      }

      return s;
    }
  }, {
    key: "sortByValue",
    value: function sortByValue() {
      var fn = function fn(a, b) {
        if (a.y < b.y) return -1;
        if (a.y > b.y) return 1;
        return 0;
      };

      return fn;
    }
  }, {
    key: "render",
    value: function render(props, state) {
      var chartKey = this.props.chart;
      var keyChartContent = "container-chart-".concat(chartKey);
      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        id: "menugrafica",
        className: "menu_grafica"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "row"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "col s12 m12",
        style: "background: #313131; height: 350px;"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        id: keyChartContent,
        style: "height: 330px; width: 100%; margin: 10px auto"
      })))));
    }
  }]);

  return Chart;
}(preact__WEBPACK_IMPORTED_MODULE_0__.Component);

Chart.getUTCDate = function (date) {
  if ((0,underscore__WEBPACK_IMPORTED_MODULE_1__.isDate)(date)) {
    var day = date.getUTCDate();
    var month = date.getUTCMonth();
    var year = date.getUTCFullYear();
    var hours = date.getUTCHours();
    var mins = date.getUTCMinutes();
    var secs = date.getUTCSeconds();
    return Date.UTC(year, month, day, hours, mins, secs);
  }

  return date;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Chart);

/***/ }),

/***/ "./src/matrix_module/list-item-group-min.jsx":
/*!***************************************************!*\
  !*** ./src/matrix_module/list-item-group-min.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var _list_view_variable_inline_min_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list-view-variable-inline-min.jsx */ "./src/matrix_module/list-view-variable-inline-min.jsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var ListItemGroupMin = /*#__PURE__*/function (_Component) {
  _inherits(ListItemGroupMin, _Component);

  var _super = _createSuper(ListItemGroupMin);

  function ListItemGroupMin(props) {
    var _this;

    _classCallCheck(this, ListItemGroupMin);

    _this = _super.call(this, props);
    _this.state = {
      variable: false
    };
    return _this;
  }

  _createClass(ListItemGroupMin, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      $('.collapsible').collapsible();
      $('.tooltipped').tooltip({
        delay: 20
      });
    }
  }, {
    key: "handleOpenDynamicGraphics",
    value: function handleOpenDynamicGraphics() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var son = self.props.son;

        if (son) {
          if (son.type == 'Pozo') {
            if (son.id) {
              var f = self.props.onOpenDynamicGraphicsGroup;
              if (f) f(son.id);
            }
          }
        }
      };

      return fn;
    }
  }, {
    key: "handleOpenDynamicGraphicsGroup",
    value: function handleOpenDynamicGraphicsGroup() {
      var self = this;

      var fn = function fn(group_id) {
        if (group_id) {
          var f = self.props.onOpenDynamicGraphicsGroup;
          if (f) f(group_id);
        }
      };

      return fn;
    }
  }, {
    key: "handleOpenComment",
    value: function handleOpenComment() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var group = self.props.son;

        if (group) {
          var o = {
            group_id: group.id,
            name: group.name
          };
          self.props.onOpenCommentGroup(o);
          $('#comentarios_macro').modal('open');
        }
      };

      return fn;
    }
  }, {
    key: "handleOpenCommentAdditional",
    value: function handleOpenCommentAdditional() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var variable = self.state.variable;

        if (variable) {
          var name = variable.name;

          if (variable.rename) {
            name = variable.rename;
          }

          var o = {
            variable_id: variable.id,
            is_custom: variable.is_custom,
            name: name,
            device: variable.device
          };
          self.props.onOpenCommentVariable(o);
          $('#comentarios_macro').modal('open');
        }
      };

      return fn;
    }
  }, {
    key: "handleOpenCommentGrop",
    value: function handleOpenCommentGrop() {
      var self = this;

      var fn = function fn(group) {
        if (group) {
          self.props.onOpenCommentGroup(group);
        }
      };

      return fn;
    }
  }, {
    key: "handleOpenCommentVariable",
    value: function handleOpenCommentVariable() {
      var self = this;

      var fn = function fn(variable) {
        if (variable) {
          self.props.onOpenCommentVariable(variable);
        }
      };

      return fn;
    }
  }, {
    key: "handleChangeSound",
    value: function handleChangeSound(variable) {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();

        if (variable) {
          var f = self.props.onChangeSoundVariable;
          if (f) f(variable);
        }
      };

      return fn;
    }
  }, {
    key: "handleChangeSoundVariable",
    value: function handleChangeSoundVariable() {
      var self = this;

      var fn = function fn(variable) {
        if (variable) {
          var f = self.props.onChangeSoundVariable;
          if (f) f(variable);
        }
      };

      return fn;
    }
  }, {
    key: "handleShowOptions",
    value: function handleShowOptions() {
      var self = this;

      var fn = function fn(variableIn) {
        var variable = self.state.variable;

        if (variable && variableIn) {
          var isEqual = variable.id == variableIn.id;

          if (isEqual) {
            self.setState({
              variable: false
            }, function () {
              $('.tooltipped').tooltip({
                delay: 20
              });
            });
            return;
          }
        }

        self.setState({
          variable: variableIn
        }, function () {
          $('.tooltipped').tooltip({
            delay: 20
          });
        });
      };

      return fn;
    }
  }, {
    key: "createSons",
    value: function createSons() {
      var _this2 = this;

      var self = this;

      var fn = function fn(son, index) {
        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(ListItemGroupMin, {
          key: index,
          son: son,
          onOpenDynamicGraphicsGroup: _this2.handleOpenDynamicGraphicsGroup(),
          onOpenCommentGroup: _this2.handleOpenCommentGrop(),
          onOpenCommentVariable: _this2.handleOpenCommentVariable(),
          onChangeSoundVariable: self.handleChangeSoundVariable()
        });
      };

      return fn;
    }
  }, {
    key: "createvariables",
    value: function createvariables() {
      var _this3 = this;

      var self = this;

      var fn = function fn(variable, index) {
        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_list_view_variable_inline_min_jsx__WEBPACK_IMPORTED_MODULE_1__.default, {
          key: index,
          variable: variable,
          onShowOptions: _this3.handleShowOptions()
        });
      };

      return fn;
    }
  }, {
    key: "render",
    value: function render(props, state) {
      var _this4 = this;

      var son = props.son;
      var variables = son.variables;
      var sons = son.sons;

      if (!sons) {
        sons = [];
      }

      if (!variables) {
        variables = [];
      }

      var group_comment = 'N/A';

      if (son.comment) {
        group_comment = son.comment;
      }

      var variable_options = false;
      var variable_name = false;
      var variable_comment = 'N/A';
      var variable_sound_icon = 'volume_up';
      var on_timeout = false;
      var is_ringing = false;
      var vOptions = state.variable;

      if (vOptions) {
        var name = vOptions.name;

        if (vOptions.rename) {
          name = vOptions.rename;
        }

        variable_name = ' - ' + name;

        if (vOptions.on_timeout) {
          on_timeout = vOptions.on_timeout;
        }

        if (vOptions.is_ringing) {
          is_ringing = vOptions.is_ringing;
        }

        if (vOptions.comment) {
          variable_comment = vOptions.comment;
        }

        if (vOptions.mute) {
          variable_sound_icon = 'volume_off';
        } else {
          variable_sound_icon = 'volume_up';
        }

        variable_options = function () {
          return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
            className: "actions_var"
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
            hidden: !on_timeout,
            href: "#"
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
            className: "material-icons right"
          }, "access_time")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
            hidden: !is_ringing,
            href: "#",
            onClick: _this4.handleChangeSound(vOptions)
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
            className: "material-icons right"
          }, variable_sound_icon)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
            hidden: true,
            className: "tooltipped",
            href: "#",
            "data-position": "left",
            "data-delay": "20",
            "data-tooltip": variable_comment,
            onClick: _this4.handleOpenCommentAdditional()
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
            className: "material-icons right"
          }, "insert_comment")));
        }();
      }

      var src = '/static/images/pozo.svg';

      if (son.type == 'Macropera') {
        src = '/static/images/macropera.png';
      } else if (son.type == 'Pozo') {
        src = '/static/images/pozo.svg';
      }

      var classActive = '';

      if (sons.length > 0 || variables.length > 0) {
        classActive = 'active';
      }

      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "thumb_matriz"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", {
        className: "collapsible collapsible-accordion abuelo",
        "data-collapsible": "accordion"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
        className: classActive
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "collapsible-header flexi ".concat(classActive)
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "col s1 icon"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("img", {
        src: src,
        width: "25",
        alt: son.type,
        style: "vertical-align: middle;"
      })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "col s9 txt"
      }, son.name, variable_name), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "col s2 actions t_right"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "tooltipped",
        href: "#",
        "data-position": "left",
        "data-delay": "20",
        "data-tooltip": group_comment,
        onClick: this.handleOpenComment()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons right"
      }, "mode_comment")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        href: "#",
        onClick: this.handleOpenDynamicGraphics()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "filter_b_and_w")), variable_options)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "collapsible-body abuelo",
        style: "display: none;"
      }, sons.map(this.createSons())), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "collapsible-body padre",
        style: "display: none;"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "row"
      }, variables.map(this.createvariables()))))));
    }
  }]);

  return ListItemGroupMin;
}(preact__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListItemGroupMin);

/***/ }),

/***/ "./src/matrix_module/list-item-group.jsx":
/*!***********************************************!*\
  !*** ./src/matrix_module/list-item-group.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var _list_view_variable_inline_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list-view-variable-inline.jsx */ "./src/matrix_module/list-view-variable-inline.jsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var ListItemGroup = /*#__PURE__*/function (_Component) {
  _inherits(ListItemGroup, _Component);

  var _super = _createSuper(ListItemGroup);

  function ListItemGroup(props) {
    _classCallCheck(this, ListItemGroup);

    return _super.call(this, props);
  }

  _createClass(ListItemGroup, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      $('.collapsible').collapsible();
      $('.tooltipped').tooltip({
        delay: 20
      });
    }
  }, {
    key: "handleOpenDynamicGraphics",
    value: function handleOpenDynamicGraphics() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var son = self.props.son;

        if (son) {
          if (son.type == 'Pozo') {
            if (son.id) {
              var f = self.props.onOpenDynamicGraphicsGroup;
              if (f) f(son.id);
            }
          }
        }
      };

      return fn;
    }
  }, {
    key: "handleOpenDynamicGraphicsGroup",
    value: function handleOpenDynamicGraphicsGroup() {
      var self = this;

      var fn = function fn(group_id) {
        if (group_id) {
          var f = self.props.onOpenDynamicGraphicsGroup;
          if (f) f(group_id);
        }
      };

      return fn;
    }
  }, {
    key: "handleOpenComment",
    value: function handleOpenComment() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var group = self.props.son;

        if (group) {
          var o = {
            group_id: group.id,
            name: group.name
          };
          var f = self.props.onOpenCommentGroup;
          if (f) f(o);
          $('#comentarios_macro').modal('open');
        }
      };

      return fn;
    }
  }, {
    key: "handleOpenCommentGroup",
    value: function handleOpenCommentGroup() {
      var self = this;

      var fn = function fn(group) {
        if (group) {
          var f = self.props.onOpenCommentGroup;
          if (f) f(group);
        }
      };

      return fn;
    }
  }, {
    key: "handleOpenCommentVariable",
    value: function handleOpenCommentVariable() {
      var self = this;

      var fn = function fn(variable) {
        if (variable) {
          var f = self.props.onOpenCommentVariable;
          if (f) f(variable);
        }
      };

      return fn;
    }
  }, {
    key: "handleChangeSoundVariable",
    value: function handleChangeSoundVariable() {
      var self = this;

      var fn = function fn(variable) {
        if (variable) {
          var f = self.props.onChangeSoundVariable;
          if (f) f(variable);
        }
      };

      return fn;
    }
  }, {
    key: "createSons",
    value: function createSons() {
      var self = this;

      var fn = function fn(son, index) {
        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(ListItemGroup, {
          key: index,
          son: son,
          onOpenDynamicGraphicsGroup: self.handleOpenDynamicGraphicsGroup(),
          onOpenCommentGroup: self.handleOpenCommentGroup(),
          onOpenCommentVariable: self.handleOpenCommentVariable(),
          onChangeSoundVariable: self.handleChangeSoundVariable()
        });
      };

      return fn;
    }
  }, {
    key: "createvariables",
    value: function createvariables() {
      var self = this;

      var fn = function fn(variable, index) {
        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_list_view_variable_inline_jsx__WEBPACK_IMPORTED_MODULE_1__.default, {
          key: index,
          variable: variable,
          onOpenCommentVariable: self.handleOpenCommentVariable(),
          onChangeSoundVariable: self.handleChangeSoundVariable()
        });
      };

      return fn;
    }
  }, {
    key: "render",
    value: function render(props, state) {
      var son = props.son;
      var variables = son.variables;
      var sons = son.sons;

      if (!sons) {
        sons = [];
      }

      if (!variables) {
        variables = [];
      }

      var son_comment = 'N/A';

      if (son.comment) {
        son_comment = son.comment;
      }

      var src = '/static/images/pozo.svg';

      if (son.type == 'Macropera') {
        src = '/static/images/macropera.png';
      } else if (son.type == 'Pozo') {
        src = '/static/images/pozo.svg';
      }

      var classActive = '';

      if (sons.length > 0 || variables.length > 0) {
        classActive = 'active';
      }

      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "thumb_matriz"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", {
        className: "collapsible collapsible-accordion abuelo",
        "data-collapsible": "accordion"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
        className: classActive
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "collapsible-header flexi ".concat(classActive)
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "col s1 icon"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("img", {
        src: src,
        width: "25",
        alt: son.type,
        style: "vertical-align: middle;"
      })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "col s9 txt"
      }, son.name), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "col s2 actions t_right"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "tooltipped",
        href: "#",
        "data-position": "left",
        "data-delay": "20",
        "data-tooltip": son_comment,
        onClick: this.handleOpenComment()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons right"
      }, "mode_comment")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        href: "#",
        onClick: this.handleOpenDynamicGraphics()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "filter_b_and_w")))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "collapsible-body abuelo",
        style: "display: none;"
      }, sons.map(this.createSons())), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "collapsible-body padre",
        style: "display: none;"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "row"
      }, variables.map(this.createvariables()))))));
    }
  }]);

  return ListItemGroup;
}(preact__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListItemGroup);

/***/ }),

/***/ "./src/matrix_module/list-view-min.jsx":
/*!*********************************************!*\
  !*** ./src/matrix_module/list-view-min.jsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var _list_item_group_min_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list-item-group-min.jsx */ "./src/matrix_module/list-item-group-min.jsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var ListView = /*#__PURE__*/function (_Component) {
  _inherits(ListView, _Component);

  var _super = _createSuper(ListView);

  function ListView(props) {
    _classCallCheck(this, ListView);

    return _super.call(this, props);
  }

  _createClass(ListView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      $('.tooltipped').tooltip({
        delay: 20
      });
    }
  }, {
    key: "handleOpenCommentGroup",
    value: function handleOpenCommentGroup() {
      var self = this;

      var fn = function fn(group) {
        if (group) {
          var f = self.props.onOpenCommentGroup;
          if (f) f(group);
        }
      };

      return fn;
    }
  }, {
    key: "handleOpenCommentVariable",
    value: function handleOpenCommentVariable() {
      var self = this;

      var fn = function fn(variable) {
        if (variable) {
          var f = self.props.onOpenCommentVariable;
          if (f) f(variable);
        }
      };

      return fn;
    }
  }, {
    key: "handleChangeSoundVariable",
    value: function handleChangeSoundVariable() {
      var self = this;

      var fn = function fn(variable) {
        if (variable) {
          var f = self.props.onChangeSoundVariable;
          if (f) f(variable);
        }
      };

      return fn;
    }
  }, {
    key: "handleChartView",
    value: function handleChartView() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        $('.tooltipped').tooltip('remove');
        var f = self.props.onChartView;
        if (f) f();
      };

      return fn;
    }
  }, {
    key: "handleListView",
    value: function handleListView() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        $('.tooltipped').tooltip('remove');
        var f = self.props.onListView;
        if (f) f();
      };

      return fn;
    }
  }, {
    key: "handleTableView",
    value: function handleTableView() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        $('.tooltipped').tooltip('remove');
        var f = self.props.onTableView;
        if (f) f();
      };

      return fn;
    }
  }, {
    key: "handleTableViewCol",
    value: function handleTableViewCol() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        $('.tooltipped').tooltip('remove');
        var f = self.props.onTableViewCol;
        if (f) f();
      };

      return fn;
    }
  }, {
    key: "handleOpenDynamicGraphicsGroup",
    value: function handleOpenDynamicGraphicsGroup() {
      var self = this;

      var fn = function fn(group_id) {
        if (group_id) {
          var f = self.props.onOpenDynamicGraphicsGroup;
          if (f) f(group_id);
        }
      };

      return fn;
    }
  }, {
    key: "createStructure",
    value: function createStructure() {
      var _this = this;

      var self = this;

      var fn = function fn(son, index) {
        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_list_item_group_min_jsx__WEBPACK_IMPORTED_MODULE_1__.default, {
          key: index,
          son: son,
          onOpenDynamicGraphicsGroup: self.handleOpenDynamicGraphicsGroup(),
          onOpenCommentGroup: _this.handleOpenCommentGroup(),
          onOpenCommentVariable: _this.handleOpenCommentVariable(),
          onChangeSoundVariable: self.handleChangeSoundVariable()
        });
      };

      return fn;
    }
  }, {
    key: "render",
    value: function render(props, state) {
      var s = props.structure;
      if (!s) s = [];
      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "col s12 m12 body_int"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "fixed-action-btn horizontal click-to-toggle"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn-large btn_ttx_rojo pulse"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "visibility")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
        onClick: this.handleListView()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn_ttx tooltipped",
        "data-position": "top",
        "data-delay": "20",
        "data-tooltip": "Vista Avanzada",
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "view_list"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn_ttx tooltipped",
        "data-position": "top",
        "data-delay": "20",
        "data-tooltip": "Vista Clasica",
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "list"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
        onClick: this.handleTableView()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn_ttx tooltipped",
        "data-position": "top",
        "data-delay": "20",
        "data-tooltip": "Vista en Tabla",
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "view_comfy"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
        onClick: this.handleTableViewCol()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn_ttx tooltipped",
        "data-position": "top",
        "data-delay": "20",
        "data-tooltip": "Vista en Tabla de Columnas",
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "view_week"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
        onClick: this.handleChartView()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn_ttx tooltipped",
        "data-position": "top",
        "data-delay": "20",
        "data-tooltip": "Vista de Grafica",
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "show_chart"))))), s.map(this.createStructure()));
    }
  }]);

  return ListView;
}(preact__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListView);

/***/ }),

/***/ "./src/matrix_module/list-view-variable-inline-min.jsx":
/*!*************************************************************!*\
  !*** ./src/matrix_module/list-view-variable-inline-min.jsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! underscore */ "./node_modules/underscore/modules/index-all.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var ListViewVariableInlineMin = /*#__PURE__*/function (_Component) {
  _inherits(ListViewVariableInlineMin, _Component);

  var _super = _createSuper(ListViewVariableInlineMin);

  function ListViewVariableInlineMin(props) {
    _classCallCheck(this, ListViewVariableInlineMin);

    return _super.call(this, props);
  }

  _createClass(ListViewVariableInlineMin, [{
    key: "handleShowOptions",
    value: function handleShowOptions() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        var variable = self.props.variable;
        var f = self.props.onShowOptions;
        if (f) f(variable);
      };

      return fn;
    }
  }, {
    key: "replaceAll",
    value: function replaceAll(s, old, n) {
      s = s.replace(old, n);
      var i = s.indexOf(old);

      if (i >= 0) {
        this.replaceAll(s, old, n);
      }

      return s;
    }
  }, {
    key: "render",
    value: function render(props, state) {
      var variable = props.variable;
      var variable_id = variable.id;
      var variable_value = variable.value;
      var variable_timestamp = variable.timestamp;
      var hasConversion = (0,underscore__WEBPACK_IMPORTED_MODULE_1__.isString)(variable.expression) && (0,underscore__WEBPACK_IMPORTED_MODULE_1__.isString)(variable.display) && (0,underscore__WEBPACK_IMPORTED_MODULE_1__.isNumber)(variable_value);

      if (hasConversion) {
        var expression = this.replaceAll(variable.expression, '${value}', variable_value);

        try {
          var v = math.eval(expression);
          var str = "".concat(v);
          var iPoint = str.indexOf('.');

          if (iPoint == -1) {
            iPoint = str.length - 4;
          }

          var nValue = math.format(v, {
            precision: iPoint + 4
          });
          variable_value = nValue;
        } catch (e) {
          variable_value = '¿¿??';
        }
      }

      var variable_color = variable.color;
      var variable_name = variable.name;
      var variable_display = '';

      if (variable.display) {
        variable_display = variable.display;
      } else {
        variable_display = variable.unit;
      }

      if (variable.rename) {
        variable_name = variable.rename;
      }

      var urlQuick = "/charts/".concat(variable_id);

      if (variable.is_custom) {
        urlQuick = "/charts/".concat(variable_id, "/true");
      }

      if (variable_display === 'BOOL') {
        if (variable_value > 0) {
          variable_value = 'ACTIVO';
        } else {
          variable_value = 'INACTIVO';
        }

        variable_display = '';
      }

      if (variable_display === 'MAP CP') {
        var description = CP_MAPS[variable_value];

        if (description) {
          variable_value = description;
        } else {
          variable_value = 'N/A';
        }

        variable_display = '';
      }

      if (variable_display === 'MAP CP II') {
        var _description = CP_MAPS_II[variable_value];

        if (_description) {
          variable_value = _description;
        } else {
          variable_value = 'N/A';
        }

        variable_display = '';
      }

      if (variable_value === ' ') {
        variable_value = '0';
      }

      if (variable_value === '0' || variable_value === 0) {
        variable_value = (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
          style: "color: #F2ED0A !important;"
        }, variable_value);
      }

      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "variable",
        style: "background-color: ".concat(variable_color, ";"),
        onClick: this.handleShowOptions()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("table", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("tbody", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("tr", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("td", {
        style: "padding: 0px;"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        href: urlQuick,
        style: "color: #EDEDED"
      }, "\xA0\xA0\xA0", variable_name)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("td", {
        style: "padding: 0px; text-align: right;"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        href: urlQuick,
        style: "color: #EDEDED",
        title: variable_timestamp
      }, variable_value, "  ", variable_display))))));
    }
  }]);

  return ListViewVariableInlineMin;
}(preact__WEBPACK_IMPORTED_MODULE_0__.Component);
/*

      <div className="variable" style={{backgroundColor: color}}>
        <div className="icon_var">
          <div className="icon">
            NOMBRE_VARIABLE
          </div>
        </div>
        <div className="txt_var">
          <p className="val">000000.0000</p>
        </div>
        <p className="date">25-01-2018 15:42:01</p>
        <div className="actions_var">
          <a href="#"><i className="material-icons right">portable_wifi_off</i></a>
          <a href="#"><i className="material-icons right">volume_up</i></a>
          <a href="#"><i className="material-icons right">mode_comment</i></a>
        </div>
      </div>

  <tr>
    <td style="color:#333;">{variable.name}</td>
    <td style="color:#333;">000000.0000</td>
    <td style="color:#333;">{variable.display}</td>
    <td style="color:#333;">25-01-2018 17:42:00</td>
    <td style="color:#333;">Comentario</td>
  </tr>

*/


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListViewVariableInlineMin);

/***/ }),

/***/ "./src/matrix_module/list-view-variable-inline.jsx":
/*!*********************************************************!*\
  !*** ./src/matrix_module/list-view-variable-inline.jsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! underscore */ "./node_modules/underscore/modules/index-all.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var ListViewVariableInline = /*#__PURE__*/function (_Component) {
  _inherits(ListViewVariableInline, _Component);

  var _super = _createSuper(ListViewVariableInline);

  function ListViewVariableInline(props) {
    _classCallCheck(this, ListViewVariableInline);

    return _super.call(this, props);
  }

  _createClass(ListViewVariableInline, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      $('.tooltipped').tooltip({
        delay: 20
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      $('.tooltipped').tooltip('remove');
      $('.tooltipped').tooltip({
        delay: 20
      });
    }
  }, {
    key: "handleOpenComment",
    value: function handleOpenComment() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var variable = self.props.variable;

        if (variable) {
          var name = variable.name;

          if (variable.rename) {
            name = variable.rename;
          }

          var o = {
            variable_id: variable.id,
            is_custom: variable.is_custom,
            name: name,
            device: variable.device
          };
          var f = self.props.onOpenCommentVariable;
          if (f) f(o);
          $('#comentarios_macro').modal('open');
        }
      };

      return fn;
    }
  }, {
    key: "handleChangeSound",
    value: function handleChangeSound(variable) {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();

        if (variable) {
          var f = self.props.onChangeSoundVariable;
          if (f) f(variable);
        }
      };

      return fn;
    }
  }, {
    key: "replaceAll",
    value: function replaceAll(s, old, n) {
      s = s.replace(old, n);
      var i = s.indexOf(old);

      if (i >= 0) {
        this.replaceAll(s, old, n);
      }

      return s;
    }
  }, {
    key: "render",
    value: function render(props, state) {
      var variable = props.variable;
      var variable_id = variable.id;
      var variable_value = variable.value;
      var variable_timestamp = variable.timestamp;
      var hasConversion = (0,underscore__WEBPACK_IMPORTED_MODULE_1__.isString)(variable.expression) && (0,underscore__WEBPACK_IMPORTED_MODULE_1__.isString)(variable.display) && (0,underscore__WEBPACK_IMPORTED_MODULE_1__.isNumber)(variable_value);

      if (hasConversion) {
        var expression = this.replaceAll(variable.expression, '${value}', variable_value);

        try {
          var v = math.eval(expression);
          var str = "".concat(v);
          var iPoint = str.indexOf('.');

          if (iPoint == -1) {
            iPoint = str.length - 4;
          }

          var nValue = math.format(v, {
            precision: iPoint + 4
          });
          variable_value = nValue;
        } catch (e) {
          variable_value = '¿¿??';
        }
      }

      var variable_color = variable.color;
      var variable_comment = 'N/A';
      var variable_name = variable.name;
      var variable_display = '';
      var variable_sound_icon = 'volume_up';

      if (variable.display) {
        variable_display = variable.display;
      } else {
        variable_display = variable.unit;
      }

      if (variable.rename) {
        variable_name = variable.rename;
      }

      if (variable.comment) {
        variable_comment = variable.comment;
      }

      if (variable.mute) {
        variable_sound_icon = 'volume_off';
      } else {
        variable_sound_icon = 'volume_up';
      }

      var urlQuick = "/charts/".concat(variable_id);

      if (variable.is_custom) {
        urlQuick = "/charts/".concat(variable_id, "/true");
      }

      if (variable_display === 'BOOL') {
        if (variable_value > 0) {
          variable_value = 'ACTIVO';
        } else {
          variable_value = 'INACTIVO';
        }

        variable_display = '';
      }

      if (variable_display === 'MAP CP') {
        var description = CP_MAPS[variable_value];

        if (description) {
          variable_value = description;
        } else {
          variable_value = 'N/A';
        }

        variable_display = '';
      }

      if (variable_display === 'MAP CP II') {
        var _description = CP_MAPS_II[variable_value];

        if (_description) {
          variable_value = _description;
        } else {
          variable_value = 'N/A';
        }

        variable_display = '';
      }

      if (variable_value === ' ') {
        variable_value = '0';
      }

      if (variable_value === '0' || variable_value === 0) {
        variable_value = (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
          style: "color: #F2ED0A !important;"
        }, variable_value);
      }

      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "variable",
        style: "background-color: ".concat(variable_color, ";")
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("table", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("tbody", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("tr", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("td", {
        style: "padding: 0px;"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        href: urlQuick,
        style: "color: #EDEDED"
      }, "\xA0\xA0\xA0", variable_name)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("td", {
        style: "padding: 0px; text-align: right;"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        href: urlQuick,
        style: "color: #EDEDED"
      }, variable_value, " ", variable_display))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("tr", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("td", {
        colspan: "2",
        style: "padding: 0px; text-align: right; font-size: 0.75em;"
      }, variable_timestamp)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("tr", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("td", {
        colspan: "2",
        style: "padding: 0px; text-align: right;"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "actions_var"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        hidden: !variable.on_timeout,
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons right"
      }, "access_time")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        hidden: !variable.is_ringing,
        href: "#",
        onClick: this.handleChangeSound(variable)
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons right"
      }, variable_sound_icon)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        hidden: true,
        href: "#",
        onClick: this.handleOpenComment(),
        className: "tooltipped",
        "data-position": "bottom",
        "data-delay": "20",
        "data-tooltip": variable_comment
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons right"
      }, "mode_comment"))))))));
    }
  }]);

  return ListViewVariableInline;
}(preact__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListViewVariableInline);

/***/ }),

/***/ "./src/matrix_module/list-view.jsx":
/*!*****************************************!*\
  !*** ./src/matrix_module/list-view.jsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var _list_item_group_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list-item-group.jsx */ "./src/matrix_module/list-item-group.jsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var ListView = /*#__PURE__*/function (_Component) {
  _inherits(ListView, _Component);

  var _super = _createSuper(ListView);

  function ListView(props) {
    _classCallCheck(this, ListView);

    return _super.call(this, props);
  }

  _createClass(ListView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      $('.tooltipped').tooltip({
        delay: 20
      });
    }
  }, {
    key: "handleTableView",
    value: function handleTableView() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        $('.tooltipped').tooltip('remove');
        var f = self.props.onTableView;
        if (f) f();
      };

      return fn;
    }
  }, {
    key: "handleListViewMin",
    value: function handleListViewMin() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        $('.tooltipped').tooltip('remove');
        var f = self.props.onListViewMin;
        if (f) f();
      };

      return fn;
    }
  }, {
    key: "handleTableViewCol",
    value: function handleTableViewCol() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        $('.tooltipped').tooltip('remove');
        var f = self.props.onTableViewCol;
        if (f) f();
      };

      return fn;
    }
  }, {
    key: "handleChartView",
    value: function handleChartView() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        $('.tooltipped').tooltip('remove');
        var f = self.props.onChartView;
        if (f) f();
      };

      return fn;
    }
  }, {
    key: "handleOpenCommentGroup",
    value: function handleOpenCommentGroup() {
      var self = this;

      var fn = function fn(group) {
        if (group) {
          var f = self.props.onOpenCommentVariable;
          if (f) f(group);
        }
      };

      return fn;
    }
  }, {
    key: "handleOpenCommentVariable",
    value: function handleOpenCommentVariable() {
      var self = this;

      var fn = function fn(variable) {
        if (variable) {
          var f = self.props.onOpenCommentVariable;
          if (f) f(variable);
        }
      };

      return fn;
    }
  }, {
    key: "handleChangeSoundVariable",
    value: function handleChangeSoundVariable() {
      var self = this;

      var fn = function fn(variable) {
        if (variable) {
          var f = self.props.onChangeSoundVariable;
          if (f) f(variable);
        }
      };

      return fn;
    }
  }, {
    key: "handleOpenDynamicGraphicsGroup",
    value: function handleOpenDynamicGraphicsGroup() {
      var self = this;

      var fn = function fn(group_id) {
        if (group_id) {
          var f = self.props.onOpenDynamicGraphicsGroup;
          if (f) f(group_id);
        }
      };

      return fn;
    }
  }, {
    key: "createStructure",
    value: function createStructure() {
      var self = this;

      var fn = function fn(son, index) {
        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_list_item_group_jsx__WEBPACK_IMPORTED_MODULE_1__.default, {
          key: index,
          son: son,
          onOpenDynamicGraphicsGroup: self.handleOpenDynamicGraphicsGroup(),
          onOpenCommentGroup: self.handleOpenCommentGroup(),
          onOpenCommentVariable: self.handleOpenCommentVariable(),
          onChangeSoundVariable: self.handleChangeSoundVariable()
        });
      };

      return fn;
    }
  }, {
    key: "render",
    value: function render(props, state) {
      var s = props.structure;

      if (!s) {
        s = [];
      }

      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "col s12 m12 body_int"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "fixed-action-btn horizontal click-to-toggle"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn-large btn_ttx_rojo pulse"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "visibility")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn_ttx tooltipped",
        "data-position": "top",
        "data-delay": "20",
        "data-tooltip": "Vista Avanzada",
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "view_list"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
        onClick: this.handleListViewMin()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn_ttx tooltipped",
        "data-position": "top",
        "data-delay": "20",
        "data-tooltip": "Vista Clasica",
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "list"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
        onClick: this.handleTableView()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn_ttx tooltipped",
        "data-position": "top",
        "data-delay": "20",
        "data-tooltip": "Vista en Tabla",
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "view_comfy"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
        onClick: this.handleTableViewCol()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn_ttx tooltipped",
        "data-position": "top",
        "data-delay": "20",
        "data-tooltip": "Vista en Tabla de Columnas",
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "view_week"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
        onClick: this.handleChartView()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn_ttx tooltipped",
        "data-position": "top",
        "data-delay": "20",
        "data-tooltip": "Vista de Grafica",
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "show_chart"))))), s.map(this.createStructure()));
    }
  }]);

  return ListView;
}(preact__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListView);

/***/ }),

/***/ "./src/matrix_module/menu-lateral.jsx":
/*!********************************************!*\
  !*** ./src/matrix_module/menu-lateral.jsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var MenuLateral = /*#__PURE__*/function (_Component) {
  _inherits(MenuLateral, _Component);

  var _super = _createSuper(MenuLateral);

  function MenuLateral(props) {
    _classCallCheck(this, MenuLateral);

    return _super.call(this, props);
  }

  _createClass(MenuLateral, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      $(".button-collapse").sideNav();
    }
  }, {
    key: "handleCloseMenuLateral",
    value: function handleCloseMenuLateral() {
      var self = this;

      var fn = function fn(evt) {
        $('.button-collapse').sideNav('hide');
      };

      return fn;
    }
  }, {
    key: "handleMatrices",
    value: function handleMatrices() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        evt.stopPropagation();
      };

      return fn;
    }
  }, {
    key: "handleChangeMatrix",
    value: function handleChangeMatrix(value) {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var o = self.props.o;

        if (o) {
          var matrices = o.matrices_;
          if (!matrices) matrices = [];

          for (var i = 0; i < matrices.length; i++) {
            var m = matrices[i];

            if (m.id == value) {
              var s = m.structure;
              var f = self.props.onChangeMatrix;
              if (f) f(m, s, 0, 0);
              return;
            }
          }
        }
      };

      return fn;
    }
  }, {
    key: "handleItemGroup",
    value: function handleItemGroup(mi, group) {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var structure = [group];
        var f = self.props.onItemGroup;
        if (f) f(structure, mi);
      };

      return fn;
    }
  }, {
    key: "handleRestoreMatrix",
    value: function handleRestoreMatrix(mi) {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        var o = self.props.o;

        if (o) {
          var matrices = o.matrices;

          if (matrices) {
            if (matrices[mi]) {
              var m = matrices[mi];
              if (!m.structure) m.structure = [];
              var structure = m.structure;
              var f = self.props.onRestoreMatrix;
              if (f) f(structure, mi);
            }
          }
        }
      };

      return fn;
    }
  }, {
    key: "createItemMatrix",
    value: function createItemMatrix() {
      var self = this;

      var fn = function fn(item, index) {
        var key = index = index + 1;
        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
          key: key
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
          style: "color: #888; margin-left: 20px;"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
          href: "#",
          onClick: self.handleChangeMatrix(item.id)
        }, item.name)));
      };

      return fn;
    }
  }, {
    key: "createItemGroup",
    value: function createItemGroup(mi) {
      var _this = this;

      var self = this;

      var fn = function fn(item, index) {
        if (!item.sons) item.sons = [];
        var key = index = index + 1;
        var image = 'macropera.png';
        var type = item.type;
        if (type == 'Pozo') image = 'pozo.svg';
        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
          key: key
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
          className: "collapsible-header"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
          className: "col s2"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("img", {
          src: "/static/images/".concat(image),
          width: "24",
          height: "24",
          alt: "Icono de Grupo",
          style: "vertical-align: middle;"
        })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
          className: "col s10",
          onClick: _this.handleItemGroup(mi, item)
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", null, item.name))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
          className: "collapsible-body"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", {
          className: "collapsible",
          "data-collapsible": "expandable"
        }, item.sons.map(_this.createItemGroup(mi)))));
      };

      return fn;
    }
  }, {
    key: "createViewMatrix",
    value: function createViewMatrix() {
      var _this2 = this;

      var self = this;

      var fn = function fn(matrix, index) {
        if (!matrix.name) matrix.name = 'N/A';
        if (!matrix.structure) matrix.structure = [];
        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
          className: "collapsible-header"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
          className: "material-icons",
          onClick: _this2.handleRestoreMatrix(index)
        }, "developer_board"), matrix.name), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
          className: "collapsible-body"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", {
          className: "collapsible",
          "data-collapsible": "expandable"
        }, matrix.structure.map(_this2.createItemGroup(index)))));
      };

      return fn;
    }
  }, {
    key: "render",
    value: function render(props, state) {
      var o = props.o;

      if (!o) {
        o = {
          matrices_: [],
          matrices: []
        };
      }

      if (!o.matrices) o.matrices = [];
      if (!o.matrices_) o.matrices_ = [];
      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        id: "slide-out",
        className: "side-nav bar_matrices"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", {
        className: "collapsible",
        "data-collapsible": "expandable"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "user-view"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "background"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("img", {
        src: "/static/images/sidebar.jpg",
        alt: "Imagen"
      })))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "collapsible-header"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "developer_board"), " Matrices"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "collapsible-body"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", {
        className: "collapsible",
        "data-collapsible": "expandable"
      }, o.matrices_.map(this.createItemMatrix())))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("br", null)), o.matrices.map(this.createViewMatrix()), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        href: "#",
        className: "btn bottm_right",
        onClick: this.handleCloseMenuLateral()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons left"
      }, "keyboard_arrow_left")))));
    }
  }]);

  return MenuLateral;
}(preact__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MenuLateral);

/***/ }),

/***/ "./src/matrix_module/notification-item.jsx":
/*!*************************************************!*\
  !*** ./src/matrix_module/notification-item.jsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../constants */ "./src/constants.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var NotificationItem = /*#__PURE__*/function (_Component) {
  _inherits(NotificationItem, _Component);

  var _super = _createSuper(NotificationItem);

  function NotificationItem(props) {
    _classCallCheck(this, NotificationItem);

    return _super.call(this, props);
  }

  _createClass(NotificationItem, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "handleRemove",
    value: function handleRemove() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var notification = self.props.notification;
        var id = notification.id;
        var f = self.props.onRemove;
        if (f) f(id);
      };

      return fn;
    }
  }, {
    key: "render",
    value: function render(props, state) {
      var notification = props.notification;
      var type = notification.type;
      var icon = 'notifications';

      if (type == _constants__WEBPACK_IMPORTED_MODULE_1__.default.TYPE_VALUE_ALARM) {
        icon = 'warning';
      } else if (type == _constants__WEBPACK_IMPORTED_MODULE_1__.default.TYPE_TIMEOUT_ALARM) {
        icon = 'alarm';
      } // warning
      // message comentario
      // volume_off silenciar alarma
      // portable_wifi_off perdida de conexion


      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "notifica"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "row thumb"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "flexi"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "col s2"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, icon)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "col s10"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", null, notification.description)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "borrar_notif"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn_noti ",
        href: "#",
        onClick: this.handleRemove()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "fa fa-times"
      })))))));
    }
  }]);

  return NotificationItem;
}(preact__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NotificationItem);

/***/ }),

/***/ "./src/matrix_module/table-item-col-variable.jsx":
/*!*******************************************************!*\
  !*** ./src/matrix_module/table-item-col-variable.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! underscore */ "./node_modules/underscore/modules/index-all.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var TableItemColVariable = /*#__PURE__*/function (_Component) {
  _inherits(TableItemColVariable, _Component);

  var _super = _createSuper(TableItemColVariable);

  function TableItemColVariable(props) {
    _classCallCheck(this, TableItemColVariable);

    return _super.call(this, props);
  }

  _createClass(TableItemColVariable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      $('.tooltipped').tooltip({
        delay: 20
      });
    }
  }, {
    key: "handleChangeSound",
    value: function handleChangeSound(variable) {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();

        if (variable) {
          var f = self.props.onChangeSoundVariable;
          if (f) f(variable);
        }
      };

      return fn;
    }
  }, {
    key: "handleOpenCommentOfGroup",
    value: function handleOpenCommentOfGroup(group) {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        if (group) {
          var o = {
            group_id: group.id,
            name: group.name
          };
          var f = self.props.onOpenCommentGroup;
          if (f) f(o);
          $('#comentarios_macro').modal('open');
        }
      };

      return fn;
    }
  }, {
    key: "handleOpenCommentOfVariable",
    value: function handleOpenCommentOfVariable(variable) {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        if (variable) {
          var name = variable.name;

          if (variable.rename) {
            name = variable.rename;
          }

          var o = {
            variable_id: variable.id,
            is_custom: variable.is_custom,
            name: name,
            device: variable.device
          };
          var f = self.props.onOpenCommentVariable;
          if (f) f(o);
          $('#comentarios_macro').modal('open');
        }
      };

      return fn;
    }
  }, {
    key: "replaceAll",
    value: function replaceAll(s, old, n) {
      s = s.replace(old, n);
      var i = s.indexOf(old);

      if (i >= 0) {
        this.replaceAll(s, old, n);
      }

      return s;
    }
  }, {
    key: "createItemAlarm",
    value: function createItemAlarm() {
      var self = this;

      var fn = function fn(alarm, index) {
        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", {
          key: index
        }, alarm.alias, ": ", (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
          style: "color: ".concat(alarm.color, " !important;")
        }, alarm.setpoint));
      };

      return fn;
    }
  }, {
    key: "getTooltip",
    value: function getTooltip(alarms, valueIn, display, timestamp) {
      if (timestamp && display == 'PSI') {
        if ((0,underscore__WEBPACK_IMPORTED_MODULE_1__.isString)(valueIn) || (0,underscore__WEBPACK_IMPORTED_MODULE_1__.isObject)(valueIn)) {
          return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
            className: "popover__content"
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", {
            className: "variable-timestamp"
          }, timestamp), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", {
            className: "variable-timestamp"
          }, valueIn, " Kg/cm\xB2"), alarms.map(this.createItemAlarm()));
        }

        if ((0,underscore__WEBPACK_IMPORTED_MODULE_1__.isNumber)(valueIn)) {
          // PSI to Kg/cm²
          var value = valueIn * 0.070307;
          var s = value.toFixed(3);
          return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
            className: "popover__content"
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", {
            className: "variable-timestamp"
          }, timestamp), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", {
            className: "variable-timestamp"
          }, s, " Kg/cm\xB2"), alarms.map(this.createItemAlarm()));
        }
      }

      if (timestamp && display == 'Kg/cm²') {
        if ((0,underscore__WEBPACK_IMPORTED_MODULE_1__.isString)(valueIn) || (0,underscore__WEBPACK_IMPORTED_MODULE_1__.isObject)(valueIn)) {
          var vIn = parseFloat(valueIn);

          if ((0,underscore__WEBPACK_IMPORTED_MODULE_1__.isNumber)(vIn)) {
            // Kg/cm² to PSI
            var _value = vIn * 14.2233;

            valueIn = _value.toFixed(3);
          }

          return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
            className: "popover__content"
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", {
            className: "variable-timestamp"
          }, timestamp), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", {
            className: "variable-timestamp"
          }, valueIn, " PSI"), alarms.map(this.createItemAlarm()));
        }

        if ((0,underscore__WEBPACK_IMPORTED_MODULE_1__.isNumber)(valueIn)) {
          // Kg/cm² to PSI
          var _value2 = valueIn * 14.2233;

          var _s = _value2.toFixed(3);

          return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
            className: "popover__content"
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", {
            className: "variable-timestamp"
          }, timestamp), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", {
            className: "variable-timestamp"
          }, _s, " PSI"), alarms.map(this.createItemAlarm()));
        }
      }

      if (timestamp) {
        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
          className: "popover__content"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", {
          className: "variable-timestamp"
        }, timestamp), alarms.map(this.createItemAlarm()));
      }

      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "popover__content"
      }, alarms.map(this.createItemAlarm()));
    }
  }, {
    key: "getItems",
    value: function getItems(o) {
      var tds = [];
      var hasGroup = false;

      for (var key in o) {
        if (o.hasOwnProperty(key)) {
          if (key == '_group') {
            hasGroup = true;
            break;
          }
        }
      }

      if (hasGroup) {
        tds = this.getItems(o._group);
      }

      var i = {
        id: o.id,
        name: o.name,
        is_variable: o.is_variable,
        comment: o.comment
      };

      if (o.variables) {
        i.variables = o.variables;
      }

      if (i.is_variable) {
        i.is_na = o.is_na;
        i.is_custom = o.is_custom;
        i.rename = o.rename;
        i.device = o.device;
        i.value = o.value;
        i.timestamp = o.timestamp;
        i.color = o.color;
        i.on_timeout = o.on_timeout;
        i.is_ringing = o.is_ringing;
        i.expression = o.expression;
        if (!o.alarms) o.alarms = [];
        i.alarms = o.alarms;
        if (o.display) i.display = o.display;
        if (o.unit) i.display = o.unit;
        if (o.mute) i.mute = o.mute;
      }

      tds.push(i);
      return tds;
    }
  }, {
    key: "createItem",
    value: function createItem() {
      var _this = this;

      var self = this;

      var fn = function fn(td, index) {
        if (td.is_variable) {
          var variable_id = td.id;
          var variable_is_custom = td.is_custom;
          var variable_value = td.value;
          var variable_timestamp = td.timestamp;
          var isBool = false; // EXTRAS

          var alarms = td.alarms;
          if (!alarms) alarms = [];
          var rowSpan = 1;
          var colSpan = false;
          if (!variable_is_custom) variable_is_custom = false;

          if (window.FUSION_VARS) {
            if ((0,underscore__WEBPACK_IMPORTED_MODULE_1__.isArray)(window.FUSION_VARS)) {
              var size = window.FUSION_VARS.length;

              for (var i = 0; i < size; i++) {
                var o = window.FUSION_VARS[i];

                if (o.variable_id == variable_id) {
                  if (o.is_custom == variable_is_custom) {
                    if (o.hide) return;
                    rowSpan = o.rowspan;
                    colSpan = o.colspan;
                    break;
                  }
                }
              }
            }
          }

          if (td.is_na) variable_value = 'N/A';
          var hasConversion = (0,underscore__WEBPACK_IMPORTED_MODULE_1__.isString)(td.expression) && (0,underscore__WEBPACK_IMPORTED_MODULE_1__.isString)(td.display) && (0,underscore__WEBPACK_IMPORTED_MODULE_1__.isNumber)(variable_value);

          if (hasConversion) {
            var expression = _this.replaceAll(td.expression, '${value}', variable_value);

            try {
              var v = math.eval(expression);
              var str = "".concat(v);
              var iPoint = str.indexOf('.');

              if (iPoint == -1) {
                iPoint = str.length - 4;
              }

              var nValue = math.format(v, {
                precision: iPoint + 4
              });
              variable_value = nValue;
            } catch (e) {
              variable_value = '¿¿??';
            }
          }

          var variable_color = '';

          if (td.color) {
            variable_color = td.color;
          }

          var variable_comment = 'N/A';
          var variable_name = td.name;
          var variable_sound_icon = 'volume_up';
          var variable_display = '';

          if (td.rename) {
            variable_name = td.rename;
          }

          if (td.comment) {
            variable_comment = td.comment;
          }

          if (td.display) {
            variable_display = td.display;
          } else {
            variable_display = td.unit;
          }

          if (td.mute) {
            variable_sound_icon = 'volume_off';
          } else {
            variable_sound_icon = 'volume_up';
          }

          var urlQuick = "/charts/".concat(variable_id);

          if (variable_is_custom) {
            urlQuick = "/charts/".concat(variable_id, "/true");
          }

          if (variable_display === 'BOOL') {
            isBool = true;

            if (variable_value > 0) {
              variable_value = 'ACTIVO';
            } else {
              variable_value = 'INACTIVO';
            }

            variable_display = '';
          }

          if (variable_display === 'MAP CP') {
            if (CP_MAPS) {
              var description = CP_MAPS[variable_value];

              if (description) {
                variable_value = description;
              } else {
                variable_value = 'N/A';
              }

              variable_display = '';
            }
          }

          if (variable_display === 'MAP CP II') {
            if (CP_MAPS_II) {
              var _description = CP_MAPS_II[variable_value];

              if (_description) {
                variable_value = _description;
              } else {
                variable_value = 'N/A';
              }

              variable_display = '';
            }
          }

          if (variable_display === 'MAP CP III') {
            if (CP_MAPS_III) {
              var _description2 = CP_MAPS_III[variable_value];

              if (_description2) {
                variable_value = _description2;
              } else {
                variable_value = 'N/A';
              }

              variable_display = '';
            }
          }

          if (variable_display === 'MAP CP IV') {
            if (CP_MAPS_IV) {
              var _description3 = CP_MAPS_IV[variable_value];

              if (_description3) {
                variable_value = _description3;
              } else {
                variable_value = 'N/A';
              }

              variable_display = '';
            }
          }

          if (variable_value === ' ') {
            variable_value = '0';
          }

          if (isBool) {
            var styleBool = 'background: #919296; box-shadow: 0 0 8px #919296; border: 2px solid #919296; color: transparent !important;';

            if (variable_color !== '') {
              styleBool = "background: ".concat(variable_color, "; box-shadow: 0 0 8px ").concat(variable_color, "; border: 2px solid ").concat(variable_color, "; color: transparent !important;");
            }
            /*
              <a href="#"
                hidden={true}
                onClick={this.handleOpenCommentOfVariable()}
                className="tooltipped"
                data-position="bottom"
                data-delay="20"
                data-tooltip={variable_comment}>
                <i className="material-icons" style="vertical-align: middle;">mode_comment</i>
              </a>
            */


            return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("td", {
              rowSpan: rowSpan,
              colSpan: colSpan
            }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
              className: "Flex"
            }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
              className: "Indicator popover__wrapper"
            }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
              href: urlQuick,
              className: "popover__title"
            }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("strong", {
              className: "Inactive",
              style: styleBool
            })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
              className: "popover__content"
            }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", {
              className: "variable-timestamp"
            }, variable_timestamp))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
              className: "FlexBody",
              style: "padding-top: 12px;"
            }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
              href: "#",
              hidden: !td.is_ringing,
              onClick: _this.handleChangeSound(td)
            }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
              className: "material-icons",
              style: "vertical-align: middle;"
            }, variable_sound_icon)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
              href: "#",
              hidden: !td.on_timeout
            }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
              className: "material-icons",
              style: "vertical-align: middle;"
            }, "access_time")))));
            /*return (
              <td className="Indicator Notif">
                <a href="#" href={urlQuick} title={variable_timestamp}>
                  <strong className="Inactive"style={styleBool}></strong>
                </a>
                <br />
                <br />
                <a href="#"
                  hidden={true}
                  onClick={this.handleOpenCommentOfVariable()}
                  className="tooltipped"
                  data-position="bottom"
                  data-delay="20"
                  data-tooltip={variable_comment}>
                  <i className="material-icons" style="vertical-align: middle;">mode_comment</i>
                </a>
                <a href="#" hidden={!td.is_ringing} onClick={this.handleChangeSound(td)}>
                  <i className="material-icons" style="vertical-align: middle;">
                    {variable_sound_icon}
                  </i>
                </a>
                <a href="#" hidden={!td.on_timeout}>
                  <i className="material-icons" style="vertical-align: middle;">access_time</i>
                </a>
              </td>
            );*/
          }

          if (variable_color === '') variable_color = 'white';

          if (variable_value === '0' || variable_value === 0) {
            variable_value = (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
              style: "color: #F2ED0A !important;"
            }, variable_value);
          }

          var contentTooltip = false;

          if (window.INSERT_CONVERSION) {
            contentTooltip = self.getTooltip(alarms, variable_value, variable_display, variable_timestamp);
          } else {
            contentTooltip = self.getTooltip(alarms, null, null, variable_timestamp);
          }
          /*
            <a href="#"
              hidden={true}
              onClick={this.handleOpenCommentOfVariable()}
              className="tooltipped"
              data-position="bottom"
              data-delay="20"
              data-tooltip={variable_comment}>
              <i className="material-icons" style="vertical-align: middle;">mode_comment</i>
            </a>
          */


          return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("td", {
            rowSpan: rowSpan,
            colSpan: colSpan
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
            className: "Flex"
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("strong", {
            className: "popover__wrapper"
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
            className: "popover__title",
            href: urlQuick,
            style: "font-weight bolder; color: ".concat(variable_color, " !important;")
          }, variable_value), contentTooltip), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
            className: "FlexBody"
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
            href: "#",
            hidden: !td.is_ringing,
            onClick: _this.handleChangeSound(td)
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
            className: "material-icons",
            style: "vertical-align: middle;"
          }, variable_sound_icon)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
            href: "#",
            hidden: !td.on_timeout
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
            className: "material-icons",
            style: "vertical-align: middle;"
          }, "access_time")))));
          /*return (
            <td className={className}>
              <a href={urlQuick} title={variable_timestamp} style={`font-weight bolder; color: ${variable_color} !important;`}>{variable_value}</a>
              <br/>
              <a  href="#"
                  hidden={true}
                  onClick={this.handleOpenCommentOfVariable()}
                  className="tooltipped"
                  data-position="bottom"
                  data-delay="20"
                  data-tooltip={variable_comment}>
                <i className="material-icons" style="vertical-align: middle;">mode_comment</i>
              </a>
              <a href="#" hidden={!td.is_ringing} onClick={this.handleChangeSound(td)}>
                <i className="material-icons" style="vertical-align: middle;">
                  {variable_sound_icon}
                </i>
              </a>
              <a href="#" hidden={!td.on_timeout}>
                <i className="material-icons" style="vertical-align: middle;">access_time</i>
              </a>
          </td>
          );*/
        }

        var group_comment = 'N/A';

        if (td.comment) {
          group_comment = td.comment;
        }

        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("td", {
          className: "TitleMotoc",
          key: index
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("strong", null, td.name, "\xA0\xA0", (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
          href: "#",
          className: "tooltipped",
          "data-position": "left",
          "data-delay": "20",
          "data-tooltip": group_comment,
          onClick: _this.handleOpenCommentOfGroup(td)
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
          className: "material-icons",
          style: "vertical-align: middle;"
        }, "chat_bubble"))));
      };

      return fn;
    }
  }, {
    key: "render",
    value: function render(props, state) {
      var group = props.group;
      var names = props.names;
      var tds = this.getItems(group);
      var numInsert = group.max - tds.length;
      var tdsInsert = [];

      for (var i = 0; i < numInsert; i++) {
        tdsInsert.push({
          id: 0,
          name: ''
        });
      }

      for (var _i = 0; _i < tds.length; _i++) {
        var td = tds[_i];
        tdsInsert.push(td);

        if (td.variables) {
          var sizeName = names.length;

          if (sizeName > 0) {
            for (var k = 0; k < names.length; k++) {
              var name = names[k];
              var isEmpty = true;

              for (var j = 0; j < td.variables.length; j++) {
                var v = td.variables[j];
                var _i2 = {
                  id: v.id,
                  name: v.name,
                  is_variable: true,
                  comment: v.comment
                };

                if (_i2.is_variable) {
                  _i2.is_na = v.is_na;
                  _i2.is_custom = v.is_custom;
                  _i2.rename = v.rename;
                  _i2.device = v.device;
                  _i2.value = v.value;
                  _i2.timestamp = v.timestamp;
                  _i2.color = v.color;
                  _i2.on_timeout = v.on_timeout;
                  _i2.is_ringing = v.is_ringing;
                  _i2.expression = v.expression;
                  if (!v.alarms) v.alarms = [];
                  _i2.alarms = v.alarms;
                  if (v.display) _i2.display = v.display;
                  if (v.unit) _i2.display = v.unit;
                  if (v.mute) _i2.mute = v.mute;
                  var variable_name = v.name;

                  if (v.rename) {
                    variable_name = v.rename;
                  }

                  var variable_display = '';

                  if (v.display) {
                    variable_display = v.display;
                  } else {
                    variable_display = v.unit;
                  }

                  if (variable_display === 'BOOL') {
                    variable_display = '';
                  }

                  if (variable_display === 'MAP CP') {
                    variable_display = '';
                  }

                  if (variable_display === 'MAP CP II') {
                    variable_display = '';
                  }

                  if (variable_display === 'MAP CP III') {
                    variable_display = '';
                  }

                  if (variable_display === 'MAP CP IV') {
                    variable_display = '';
                  }

                  if (variable_display) {
                    variable_name = "".concat(variable_name, " (").concat(variable_display, ")");
                  }

                  if (name == variable_name) {
                    tdsInsert.push(_i2);
                    isEmpty = false;
                    break;
                  }
                }
              }

              if (isEmpty) {
                var _i3 = {
                  id: 0,
                  name: '',
                  is_variable: true,
                  comment: false
                };
                tdsInsert.push(_i3);
              }
            }
          } else {
            for (var _j = 0; _j < td.variables.length; _j++) {
              var _v = td.variables[_j];
              var _i4 = {
                id: _v.id,
                name: _v.name,
                is_variable: true,
                comment: _v.comment
              };

              if (_i4.is_variable) {
                _i4.is_na = _v.is_na;
                _i4.is_custom = _v.is_custom;
                _i4.rename = _v.rename;
                _i4.device = _v.device;
                _i4.value = _v.value;
                _i4.timestamp = _v.timestamp;
                _i4.color = _v.color;
                _i4.on_timeout = _v.on_timeout;
                _i4.is_ringing = _v.is_ringing;
                _i4.expression = _v.expression;
                if (!_v.alarms) _v.alarms = [];
                _i4.alarms = _v.alarms;
                if (_v.display) _i4.display = _v.display;
                if (_v.unit) _i4.display = _v.unit;
                if (_v.mute) _i4.mute = _v.mute;
                var _variable_name = _v.name;

                if (_v.rename) {
                  _variable_name = _v.rename;
                }

                var _variable_display = '';

                if (_v.display) {
                  _variable_display = _v.display;
                } else {
                  _variable_display = _v.unit;
                }

                if (_variable_display === 'BOOL') {
                  _variable_display = '';
                }

                if (_variable_display === 'MAP CP') {
                  _variable_display = '';
                }

                if (_variable_display === 'MAP CP II') {
                  _variable_display = '';
                }

                if (_variable_display === 'MAP CP III') {
                  _variable_display = '';
                }

                if (_variable_display === 'MAP CP IV') {
                  _variable_display = '';
                }

                if (_variable_display) {
                  _variable_name = "".concat(_variable_name, " (").concat(_variable_display, ")");
                }

                tdsInsert.push(_i4);
              }
            }
          }
        }

        if (window.COMMENT_COLUMN) {
          var insertComment = {
            id: 0,
            name: 'COMENTARIOS',
            is_variable: true,
            value: td.comment,
            timestamp: ''
          };
          tdsInsert.push(insertComment);
        }
      }

      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("tr", null, tdsInsert.map(this.createItem()));
    }
  }]);

  return TableItemColVariable;
}(preact__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TableItemColVariable);

/***/ }),

/***/ "./src/matrix_module/table-item-variable.jsx":
/*!***************************************************!*\
  !*** ./src/matrix_module/table-item-variable.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! underscore */ "./node_modules/underscore/modules/index-all.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var TableItemVariable = /*#__PURE__*/function (_Component) {
  _inherits(TableItemVariable, _Component);

  var _super = _createSuper(TableItemVariable);

  function TableItemVariable(props) {
    _classCallCheck(this, TableItemVariable);

    return _super.call(this, props);
  }

  _createClass(TableItemVariable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      $('.tooltipped').tooltip({
        delay: 20
      });
    }
  }, {
    key: "handleChangeSound",
    value: function handleChangeSound(variable) {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();

        if (variable) {
          var f = self.props.onChangeSoundVariable;
          if (f) f(variable);
        }
      };

      return fn;
    }
  }, {
    key: "handleOpenCommentOfGroup",
    value: function handleOpenCommentOfGroup(group) {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        if (group) {
          var o = {
            group_id: group.id,
            name: group.name
          };
          var f = self.props.onOpenCommentGroup;
          if (f) f(o);
          $('#comentarios_macro').modal('open');
        }
      };

      return fn;
    }
  }, {
    key: "handleOpenCommentOfVariable",
    value: function handleOpenCommentOfVariable(variable) {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        if (variable) {
          var name = variable.name;

          if (variable.rename) {
            name = variable.rename;
          }

          var o = {
            variable_id: variable.id,
            is_custom: variable.is_custom,
            name: name,
            device: variable.device
          };
          var f = self.props.onOpenCommentVariable;
          if (f) f(o);
          $('#comentarios_macro').modal('open');
        }
      };

      return fn;
    }
  }, {
    key: "replaceAll",
    value: function replaceAll(s, old, n) {
      s = s.replace(old, n);
      var i = s.indexOf(old);

      if (i >= 0) {
        this.replaceAll(s, old, n);
      }

      return s;
    }
  }, {
    key: "getItems",
    value: function getItems(o) {
      var tds = [];
      var hasGroup = false;

      for (var key in o) {
        if (o.hasOwnProperty(key)) {
          if (key == '_group') {
            hasGroup = true;
            break;
          }
        }
      }

      if (hasGroup) {
        tds = this.getItems(o._group);
      }

      var i = {
        id: o.id,
        name: o.name,
        is_variable: o.is_variable,
        comment: o.comment
      };

      if (i.is_variable) {
        i.is_custom = o.is_custom;
        i.rename = o.rename;
        i.device = o.device;
        i.value = o.value;
        i.timestamp = o.timestamp;
        i.color = o.color;
        i.on_timeout = o.on_timeout;
        i.is_ringing = o.is_ringing;
        i.expression = o.expression;
        if (o.display) i.display = o.display;
        if (o.unit) i.display = o.unit;
        if (o.mute) i.mute = o.mute;
      }

      tds.push(i);
      return tds;
    }
  }, {
    key: "createItem",
    value: function createItem() {
      var _this = this;

      var self = this;

      var fn = function fn(td, index, a) {
        if (td.is_variable) {
          var variable_id = td.id;
          var variable_is_custom = td.is_custom;
          var variable_value = td.value;
          var variable_tiemstamp = td.timestamp;
          var hasConversion = (0,underscore__WEBPACK_IMPORTED_MODULE_1__.isString)(td.expression) && (0,underscore__WEBPACK_IMPORTED_MODULE_1__.isString)(td.display) && (0,underscore__WEBPACK_IMPORTED_MODULE_1__.isNumber)(variable_value);

          if (hasConversion) {
            var expression = _this.replaceAll(td.expression, '${value}', variable_value);

            try {
              var v = math.eval(expression);
              var str = "".concat(v);
              var iPoint = str.indexOf('.');

              if (iPoint == -1) {
                iPoint = str.length - 4;
              }

              var nValue = math.format(v, {
                precision: iPoint + 4
              });
              variable_value = nValue;
            } catch (e) {
              variable_value = '¿¿??';
            }
          }

          var variable_color = false;

          if (td.color) {
            variable_color = td.color;
          }

          var variable_comment = 'N/A';
          var variable_name = td.name;
          var variable_display = '';
          var variable_sound_icon = 'volume_up';

          if (td.display) {
            variable_display = td.display;
          } else {
            variable_display = td.unit;
          }

          if (td.rename) {
            variable_name = td.rename;
          }

          if (td.comment) {
            variable_comment = td.comment;
          }

          if (td.mute) {
            variable_sound_icon = 'volume_off';
          } else {
            variable_sound_icon = 'volume_up';
          }

          var urlQuick = "/charts/".concat(variable_id);

          if (variable_is_custom) {
            urlQuick = "/charts/".concat(variable_id, "/true");
          }

          if (variable_display === 'BOOL') {
            if (variable_value > 0) {
              variable_value = 'ACTIVO';
            } else {
              variable_value = 'INACTIVO';
            }

            variable_display = '';
          }

          if (variable_display === 'MAP CP') {
            var description = CP_MAPS[variable_value];

            if (description) {
              variable_value = description;
            } else {
              variable_value = 'N/A';
            }

            variable_display = '';
          }

          if (variable_display === 'MAP CP II') {
            var _description = CP_MAPS_II[variable_value];

            if (_description) {
              variable_value = _description;
            } else {
              variable_value = 'N/A';
            }

            variable_display = '';
          }

          if (variable_value === ' ') {
            variable_value = '0';
          }

          if (variable_value === '0' || variable_value === 0) {
            variable_value = (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
              style: "color: #F2ED0A !important;"
            }, variable_value);
          }

          return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("td", {
            style: "padding: 0px; border: 1px solid rgba(255, 255, 255, 0.4);"
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("table", {
            style: "width: 100%; font-size: 0.90rem; font-weight: 600;"
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("tbody", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("tr", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("td", {
            style: "padding:0px 0px 0px 3px; width: 30%; background-color: ".concat(variable_color)
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
            href: urlQuick,
            style: "color: #EDEDED"
          }, variable_name)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("td", {
            style: "padding:0px 0px 0px 3px; width: 10%; border-right: 1px solid rgba(255, 255, 255, 0.4); background-color: ".concat(variable_color)
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
            className: "actions_var"
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
            hidden: !td.on_timeout,
            href: "#"
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
            className: "material-icons right"
          }, "access_time")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
            hidden: !td.is_ringing,
            href: "#",
            onClick: _this.handleChangeSound(td)
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
            className: "material-icons right"
          }, variable_sound_icon)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
            hidden: true,
            href: "#",
            className: "tooltipped",
            "data-position": "left",
            "data-delay": "20",
            "data-tooltip": variable_comment,
            onClick: _this.handleOpenCommentOfVariable(td)
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
            className: "material-icons right"
          }, "mode_comment")))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("td", {
            style: "padding:0px 3px 0px 0px; text-align: right; width: 15%;"
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
            href: urlQuick,
            style: "color: #EDEDED"
          }, variable_value)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("td", {
            style: "padding:0px 0px 0px 4px; text-align: left; width: 10%;"
          }, variable_display), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("td", {
            style: "padding: 0px 3px 0px 0px; text-align: right; width: 15%;"
          }, variable_tiemstamp)))));
        }

        var style = {};
        style.borderTop = '1px solid rgba(255, 255, 255, 0.4)';
        style.borderRight = '1px solid rgba(255, 255, 255, 0.4)';
        style.borderLeft = '1px solid rgba(255, 255, 255, 0.4)';
        style.borderBottom = '0x';
        style.padding = '0px';

        if (td.id == 0) {
          style.borderTop = '0px';
          return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("td", {
            style: style,
            key: index
          });
        }

        var group_comment = 'N/A';

        if (td.comment) {
          group_comment = td.comment;
        }

        style.padding = '0px 0px 0px 3px';
        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("td", {
          style: style,
          key: index
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("table", {
          style: "width: 100%; font-size: 0.90rem; font-weight: 600;"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("tbody", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("tr", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("td", {
          style: "padding:0px 0px 0px 3px; width: 80%;"
        }, td.name), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("td", {
          style: "padding:0px 0px 0px 3px; width: 10%;"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
          className: "actions_var"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
          href: "#",
          className: "tooltipped",
          "data-position": "left",
          "data-delay": "20",
          "data-tooltip": group_comment,
          onClick: _this.handleOpenCommentOfGroup(td)
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
          className: "material-icons right"
        }, "mode_comment"))))))));
      };

      return fn;
    }
  }, {
    key: "render",
    value: function render(props, state) {
      var variable = props.variable;
      var tds = this.getItems(variable);
      var numInsert = variable.max - tds.length;
      var tdsInsert = [];

      for (var i = 0; i < numInsert; i++) {
        tdsInsert.push({
          id: 0,
          name: ''
        });
      }

      for (var _i = 0; _i < tds.length; _i++) {
        var td = tds[_i];
        tdsInsert.push(td);
      }

      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("tr", null, tdsInsert.map(this.createItem()));
    }
  }]);

  return TableItemVariable;
}(preact__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TableItemVariable);

/***/ }),

/***/ "./src/matrix_module/table-view-col.jsx":
/*!**********************************************!*\
  !*** ./src/matrix_module/table-view-col.jsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! underscore */ "./node_modules/underscore/modules/index-all.js");
/* harmony import */ var _table_item_col_variable_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./table-item-col-variable.jsx */ "./src/matrix_module/table-item-col-variable.jsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var TableViewCol = /*#__PURE__*/function (_Component) {
  _inherits(TableViewCol, _Component);

  var _super = _createSuper(TableViewCol);

  function TableViewCol(props) {
    _classCallCheck(this, TableViewCol);

    return _super.call(this, props);
  }

  _createClass(TableViewCol, [{
    key: "handleOpenCommentGroup",
    value: function handleOpenCommentGroup() {
      var self = this;

      var fn = function fn(group) {
        if (group) {
          var f = self.props.onOpenCommentGroup;
          if (f) f(group);
        }
      };

      return fn;
    }
  }, {
    key: "handleOpenCommentVariable",
    value: function handleOpenCommentVariable() {
      var self = this;

      var fn = function fn(variable) {
        if (variable) {
          var f = self.props.onOpenCommentVariable;
          if (f) f(variable);
        }
      };

      return fn;
    }
  }, {
    key: "handleChangeSoundVariable",
    value: function handleChangeSoundVariable() {
      var self = this;

      var fn = function fn(variable) {
        if (variable) {
          var f = self.props.onChangeSoundVariable;
          if (f) f(variable);
        }
      };

      return fn;
    }
  }, {
    key: "handleListView",
    value: function handleListView() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        var f = self.props.onListView;
        if (f) f();
      };

      return fn;
    }
  }, {
    key: "handleListViewMin",
    value: function handleListViewMin() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        var f = self.props.onListViewMin;
        if (f) f();
      };

      return fn;
    }
  }, {
    key: "handleTableView",
    value: function handleTableView() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        $('.tooltipped').tooltip('remove');
        var f = self.props.onTableView;
        if (f) f();
      };

      return fn;
    }
  }, {
    key: "handleChartView",
    value: function handleChartView() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        $('.tooltipped').tooltip('remove');
        var f = self.props.onChartView;
        if (f) f();
      };

      return fn;
    }
  }, {
    key: "handleLogAlarmsView",
    value: function handleLogAlarmsView() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        $('.tooltipped').tooltip('remove');
        var f = self.props.onLogAlarmsView;
        if (f) f();
      };

      return fn;
    }
  }, {
    key: "createItemGroup",
    value: function createItemGroup(max, names, namesOnly, size) {
      var self = this;

      var fn = function fn(group, index) {
        group.max = max;
        /*let namesIn = clone(names);
        	if (namesIn.length == 0) {
        	if (namesOnly && size) {
        		let name = namesOnly[index];
        		for (let i = 1; i < size; i++) {
        			namesIn.push(name);
        		}
        	}
        }*/

        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_table_item_col_variable_jsx__WEBPACK_IMPORTED_MODULE_2__.default, {
          key: index,
          group: group,
          names: names,
          onOpenCommentGroup: self.handleOpenCommentGroup(),
          onOpenCommentVariable: self.handleOpenCommentVariable(),
          onChangeSoundVariable: self.handleChangeSoundVariable()
        });
      };

      return fn;
    }
  }, {
    key: "createTitleGroup",
    value: function createTitleGroup() {
      var fn = function fn(title, index) {
        if ((0,underscore__WEBPACK_IMPORTED_MODULE_1__.isObject)(title)) {
          return;
        }

        var value = title.indexOf('FLUJO GAS');

        if (value == 0) {
          title = title.replace('FLUJO GAS', '');
          title = title.replace('(MMPCD)', '');
          return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("th", {
            rowSpan: "1",
            key: index
          }, title);
        }

        value = title.indexOf('TEMP');

        if (value == 0) {
          title = title.replace('TEMP', '');
          title = title.replace('(°F)', '');
          return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("th", {
            rowSpan: "1",
            key: index
          }, title);
        }

        return;
      };

      return fn;
    }
  }, {
    key: "createTitle",
    value: function createTitle(hasFG, hasTEMP, flows, temps) {
      var fn = function fn(title, index) {
        if ((0,underscore__WEBPACK_IMPORTED_MODULE_1__.isObject)(title)) {
          if (title.name === 'COMENTARIO') {
            var styleComment = {
              width: '225px'
            };
            return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("th", {
              colSpan: title.colSpan,
              rowSpan: "2",
              className: title.className,
              key: index,
              style: styleComment
            }, title.name);
          }

          return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("th", {
            colSpan: title.colSpan,
            rowSpan: "2",
            className: title.className,
            key: index
          }, title.name);
        }

        var value = title.indexOf('FLUJO GAS');

        if (value === 0) {
          if (!hasFG) {
            hasFG = true;
            return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("th", {
              rowSpan: "1",
              colSpan: flows,
              key: index
            }, "FLUJO DE GAS (MMPCD)");
          }

          return;
        }

        value = title.indexOf('TEMP');

        if (value === 0) {
          if (!hasTEMP) {
            hasTEMP = true;
            return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("th", {
              rowSpan: "1",
              colSpan: temps,
              key: index
            }, "TEMPERATURA DE (\xB0F)");
          }

          return;
        }

        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("th", {
          key: index,
          rowSpan: "2"
        }, title);
      };

      return fn;
    }
  }, {
    key: "createTitleSimple",
    value: function createTitleSimple() {
      var fn = function fn(title, index) {
        if ((0,underscore__WEBPACK_IMPORTED_MODULE_1__.isObject)(title)) {
          return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("th", {
            colSpan: title.colSpan,
            rowSpan: "1",
            className: title.className,
            key: index
          }, title.name);
        }

        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("th", {
          key: index,
          rowSpan: "1"
        }, title);
      };

      return fn;
    }
  }, {
    key: "hasVPE",
    value: function hasVPE(names) {
      var count = 0;
      var size = names.length;

      for (var i = 0; i < size; i++) {
        var name = names[i];

        if (name.indexOf('VOLTAJE') >= 0 || name.indexOf('PRESION ESTATICA') >= 0) {
          count = count + 1;
        } else {
          count = count - 1;
        }
      }

      return count === 2;
    }
  }, {
    key: "getVariablesOrders",
    value: function getVariablesOrders() {
      var s = this.props.structure;

      if (!s) {
        s = [];
      }

      var titles = this.getVariables(s);
      return titles;
    }
  }, {
    key: "getVariables",
    value: function getVariables(sons) {
      var names = [];

      for (var i = 0; i < sons.length; i++) {
        var son = sons[i];

        if (son.variables) {
          for (var j = 0; j < son.variables.length; j++) {
            var variable = son.variables[j];
            var variable_name = variable.name;

            if (variable.rename) {
              variable_name = variable.rename;
            }

            var variable_display = '';

            if (variable.display) {
              variable_display = variable.display;
            } else {
              variable_display = variable.unit;
            }

            if (variable_display === 'BOOL') {
              variable_display = '';
            }

            if (variable_display === 'MAP CP' || variable_display === 'MAP CP II' || variable_display === 'MAP CP III' || variable_display === 'MAP CP IV') {
              variable_display = '';
            }

            if (variable_display) {
              variable_name = "".concat(variable_name, " (").concat(variable_display, ")");
            }

            names.push(variable_name);
          }
        }

        if (son.sons) {
          var namesOut = this.getVariables(son.sons);

          for (var _j = 0; _j < namesOut.length; _j++) {
            var nameOut = namesOut[_j];
            names.push(nameOut);
          }
        }
      }

      return names;
    }
  }, {
    key: "getDevices",
    value: function getDevices(sons) {
      var names = [];

      for (var i = 0; i < sons.length; i++) {
        var son = sons[i];

        if (son.variables) {
          for (var j = 0; j < son.variables.length; j++) {
            var variable = son.variables[j];
            var device = variable.device;
            names.push(device);
          }
        }

        if (son.sons) {
          var namesOut = this.getDevices(son.sons);

          for (var _j2 = 0; _j2 < namesOut.length; _j2++) {
            var nameOut = namesOut[_j2];
            names.push(nameOut);
          }
        }
      }

      return names;
    }
  }, {
    key: "getGroups",
    value: function getGroups(sons) {
      var groups = [];

      for (var i = 0; i < sons.length; i++) {
        var son = sons[i];
        var group = {
          id: son.id,
          name: son.name,
          type: son.type,
          comment: son.comment
        };

        if (son.variables) {
          group.variables = son.variables;
        }

        var insertInSon = false;

        if (son.sons) {
          if (son.sons.length > 0) {
            var groupsOut = this.getGroups(son.sons);

            if (groupsOut.length > 0) {
              groupsOut[0]._group = group;
              insertInSon = true;

              for (var j = 0; j < groupsOut.length; j++) {
                var groupOut = groupsOut[j];
                groups.push(groupOut);
              }
            }
          }
        }

        if (!insertInSon) {
          groups.push(group);
        }
      }

      return groups;
    }
  }, {
    key: "getItems",
    value: function getItems(o) {
      var tds = [];
      var hasGroup = false;

      for (var key in o) {
        if (o.hasOwnProperty(key)) {
          if (key == '_group') {
            hasGroup = true;
            break;
          }
        }
      }

      if (hasGroup) {
        tds = this.getItems(o._group);
      }

      var i = {
        id: o.id,
        name: o.name
      };
      tds.push(i);
      return tds;
    }
  }, {
    key: "getMaximun",
    value: function getMaximun(groups) {
      var value = 0;

      for (var i = 0; i < groups.length; i++) {
        var group = groups[i];
        var tds = this.getItems(group);

        if (tds.length > value) {
          value = tds.length;
        }
      }

      return value;
    }
  }, {
    key: "getOnlyUnique",
    value: function getOnlyUnique() {
      var fn = function fn(value, index, self) {
        return self.indexOf(value) === index;
      };

      return fn;
    }
  }, {
    key: "getCols",
    value: function getCols(names, prefix) {
      var cols = 0;
      var size = names.length;

      for (var i = 0; i < size; i++) {
        var name = names[i];

        if ((0,underscore__WEBPACK_IMPORTED_MODULE_1__.isString)(name)) {
          var value = name.indexOf(prefix);

          if (value === 0) {
            cols = cols + 1;
          }
        }
      }

      return cols;
    }
  }, {
    key: "render",
    value: function render(props, state) {
      var hasFG = false;
      var hasTEMP = false;
      var s = props.structure;

      if (!s) {
        s = [];
      }

      var groups = this.getGroups(s);
      var max = this.getMaximun(groups);
      var allNames = this.getVariablesOrders();
      var namesOut = allNames.filter(this.getOnlyUnique());
      var colSpan = max;

      if (colSpan == 0) {
        colSpan = 1;
      }

      var hasVPE = this.hasVPE(namesOut);

      if (hasVPE) {
        var installations = [{
          name: 'VARIABLES',
          colSpan: colSpan,
          className: 'TitleVar'
        }];
        var installationsOut = this.getDevices(s);
        installationsOut = installationsOut.filter(this.getOnlyUnique());
        installations = installations.concat(installationsOut);
        var _first = "DashInter";

        if ((0,underscore__WEBPACK_IMPORTED_MODULE_1__.isNumber)(this.props.first)) {
          if (this.props.first != 0) {
            _first = "DashInter DashInterNone";
          }
        }

        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
          className: "col s12 m12 body_int"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
          className: "fixed-action-btn horizontal click-to-toggle"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
          className: "btn-floating btn-large btn_ttx_rojo pulse"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
          className: "material-icons"
        }, "visibility")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
          onClick: this.handleListView()
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
          className: "btn-floating btn_ttx tooltipped",
          "data-position": "top",
          "data-delay": "20",
          "data-tooltip": "Vista Avanzada",
          href: "#"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
          className: "material-icons"
        }, "view_list"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
          onClick: this.handleListViewMin()
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
          className: "btn-floating btn_ttx tooltipped",
          "data-position": "top",
          "data-delay": "20",
          "data-tooltip": "Vista Clasica",
          href: "#"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
          className: "material-icons"
        }, "list"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
          onClick: this.handleTableView()
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
          className: "btn-floating btn_ttx tooltipped",
          "data-position": "top",
          "data-delay": "20",
          "data-tooltip": "Vista en Tabla",
          href: "#"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
          className: "material-icons"
        }, "view_comfy"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
          className: "btn-floating btn_ttx tooltipped",
          "data-position": "top",
          "data-delay": "20",
          "data-tooltip": "Vista en Tabla de Columnas",
          href: "#"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
          className: "material-icons"
        }, "view_week"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
          onClick: this.handleChartView()
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
          className: "btn-floating btn_ttx tooltipped",
          "data-position": "top",
          "data-delay": "20",
          "data-tooltip": "Vista de Grafica",
          href: "#"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
          className: "material-icons"
        }, "show_chart"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
          onClick: this.handleLogAlarmsView()
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
          className: "btn-floating btn_ttx tooltipped",
          "data-position": "top",
          "data-delay": "20",
          "data-tooltip": "Vista de Alarmas",
          href: "#"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
          className: "material-icons"
        }, "announcement"))))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
          className: _first
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("table", {
          className: "responsive-table table-static",
          style: "border-collapse: collapse;"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("thead", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("tr", null, installations.map(this.createTitleSimple()))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("tbody", null, groups.map(this.createItemGroup(max, [], namesOut, installations.length))))));
      }

      var names = [{
        name: 'INSTALACION',
        colSpan: colSpan,
        className: 'TitleVar'
      }];
      names = names.concat(namesOut);
      if (window.COMMENT_COLUMN) names.push({
        name: 'COMENTARIO',
        colSpan: colSpan
      });
      var flows = this.getCols(names, 'FLUJO GAS');
      var temps = this.getCols(names, 'TEMP');
      var first = "DashInter";

      if ((0,underscore__WEBPACK_IMPORTED_MODULE_1__.isNumber)(this.props.first)) {
        if (this.props.first != 0) {
          first = "DashInter DashInterNone";
        }
      }

      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "col s12 m12 body_int"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "fixed-action-btn horizontal click-to-toggle"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn-large btn_ttx_rojo pulse"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "visibility")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
        onClick: this.handleListView()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn_ttx tooltipped",
        "data-position": "top",
        "data-delay": "20",
        "data-tooltip": "Vista Avanzada",
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "view_list"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
        onClick: this.handleListViewMin()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn_ttx tooltipped",
        "data-position": "top",
        "data-delay": "20",
        "data-tooltip": "Vista Clasica",
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "list"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
        onClick: this.handleTableView()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn_ttx tooltipped",
        "data-position": "top",
        "data-delay": "20",
        "data-tooltip": "Vista en Tabla",
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "view_comfy"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn_ttx tooltipped",
        "data-position": "top",
        "data-delay": "20",
        "data-tooltip": "Vista en Tabla de Columnas",
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "view_week"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
        onClick: this.handleChartView()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn_ttx tooltipped",
        "data-position": "top",
        "data-delay": "20",
        "data-tooltip": "Vista de Grafica",
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "show_chart"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
        onClick: this.handleLogAlarmsView()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn_ttx tooltipped",
        "data-position": "top",
        "data-delay": "20",
        "data-tooltip": "Vista de Alarmas",
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "announcement"))))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: first
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("table", {
        className: "responsive-table table-static",
        style: "border-collapse: collapse;"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("thead", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("tr", null, names.map(this.createTitle(hasFG, hasTEMP, flows, temps))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("tr", null, names.map(this.createTitleGroup()))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("tbody", null, groups.map(this.createItemGroup(max, namesOut))))));
    }
  }]);

  return TableViewCol;
}(preact__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TableViewCol);

/***/ }),

/***/ "./src/matrix_module/table-view.jsx":
/*!******************************************!*\
  !*** ./src/matrix_module/table-view.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var _table_item_variable_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./table-item-variable.jsx */ "./src/matrix_module/table-item-variable.jsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var TableView = /*#__PURE__*/function (_Component) {
  _inherits(TableView, _Component);

  var _super = _createSuper(TableView);

  function TableView(props) {
    _classCallCheck(this, TableView);

    return _super.call(this, props);
  }

  _createClass(TableView, [{
    key: "handleOpenCommentGroup",
    value: function handleOpenCommentGroup() {
      var self = this;

      var fn = function fn(group) {
        if (group) {
          var f = self.props.onOpenCommentGroup;
          if (f) f(group);
        }
      };

      return fn;
    }
  }, {
    key: "handleOpenCommentVariable",
    value: function handleOpenCommentVariable() {
      var self = this;

      var fn = function fn(variable) {
        if (variable) {
          var f = self.props.onOpenCommentVariable;
          if (f) f(variable);
        }
      };

      return fn;
    }
  }, {
    key: "handleChangeSoundVariable",
    value: function handleChangeSoundVariable() {
      var self = this;

      var fn = function fn(variable) {
        if (variable) {
          var f = self.props.onChangeSoundVariable;
          console.log(f);
          if (f) f(variable);
        }
      };

      return fn;
    }
  }, {
    key: "handleChartView",
    value: function handleChartView() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        $('.tooltipped').tooltip('remove');
        var f = self.props.onChartView;
        if (f) f();
      };

      return fn;
    }
  }, {
    key: "handleListView",
    value: function handleListView() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        $('.tooltipped').tooltip('remove');
        var f = self.props.onListView;
        if (f) f();
      };

      return fn;
    }
  }, {
    key: "handleListViewMin",
    value: function handleListViewMin() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        $('.tooltipped').tooltip('remove');
        var f = self.props.onListViewMin;
        if (f) f();
      };

      return fn;
    }
  }, {
    key: "handleTableViewCol",
    value: function handleTableViewCol() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        $('.tooltipped').tooltip('remove');
        var f = self.props.onTableViewCol;
        if (f) f();
      };

      return fn;
    }
  }, {
    key: "createItemVariable",
    value: function createItemVariable(max) {
      var self = this;

      var fn = function fn(variable, index) {
        variable.max = max;
        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_table_item_variable_jsx__WEBPACK_IMPORTED_MODULE_1__.default, {
          key: index,
          variable: variable,
          onOpenCommentGroup: self.handleOpenCommentGroup(),
          onOpenCommentVariable: self.handleOpenCommentVariable(),
          onChangeSoundVariable: self.handleChangeSoundVariable()
        });
      };

      return fn;
    }
  }, {
    key: "getVariables",
    value: function getVariables(sons) {
      var variables = [];

      for (var i = 0; i < sons.length; i++) {
        var son = sons[i];

        if (son.sons) {
          if (son.sons[0]) {
            son.sons[0]._group = {
              id: son.id,
              name: son.name,
              type: son.type,
              comment: son.comment
            };
          }

          var variablesOut = this.getVariables(son.sons);

          for (var j = 0; j < variablesOut.length; j++) {
            var variableOut = variablesOut[j];
            variables.push(variableOut);
          }
        }

        if (son.variables) {
          for (var _j = 0; _j < son.variables.length; _j++) {
            var variable = son.variables[_j];

            if (_j == 0) {
              variable._group = {
                id: son.id,
                name: son.name,
                type: son.type,
                comment: son.comment
              };

              if (son._group) {
                var group = son._group;
                variable._group._group = {
                  id: group.id,
                  name: group.name,
                  type: group.type,
                  comment: group.comment
                };
              }
            }

            variable.is_variable = true;
            variables.push(variable);
          }
        }
      }

      return variables;
    }
  }, {
    key: "getItems",
    value: function getItems(o) {
      var tds = [];
      var hasGroup = false;

      for (var key in o) {
        if (o.hasOwnProperty(key)) {
          if (key == '_group') {
            hasGroup = true;
            break;
          }
        }
      }

      if (hasGroup) {
        tds = this.getItems(o._group);
      }

      var i = {
        id: o.id,
        name: o.name
      };
      tds.push(i);
      return tds;
    }
  }, {
    key: "getMaximun",
    value: function getMaximun(variables) {
      var value = 0;

      for (var i = 0; i < variables.length; i++) {
        var variable = variables[i];
        var tds = this.getItems(variable);

        if (tds.length > value) {
          value = tds.length;
        }
      }

      return value;
    }
  }, {
    key: "render",
    value: function render(props, state) {
      var s = props.structure;

      if (!s) {
        s = [];
      }

      var variables = this.getVariables(s);
      var max = this.getMaximun(variables);
      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "col s12 m12 body_int"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "fixed-action-btn horizontal click-to-toggle"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn-large btn_ttx_rojo pulse"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "visibility")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
        onClick: this.handleListView()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn_ttx tooltipped",
        "data-position": "top",
        "data-delay": "20",
        "data-tooltip": "Vista Avanzada",
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "view_list"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
        onClick: this.handleListViewMin()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn_ttx tooltipped",
        "data-position": "top",
        "data-delay": "20",
        "data-tooltip": "Vista Clasica",
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "list"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn_ttx tooltipped",
        "data-position": "top",
        "data-delay": "20",
        "data-tooltip": "Vista en Tabla",
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "view_comfy"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
        onClick: this.handleTableViewCol()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn_ttx tooltipped",
        "data-position": "top",
        "data-delay": "20",
        "data-tooltip": "Vista en Tabla de Columnas",
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "view_week"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
        onClick: this.handleChartView()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        className: "btn-floating btn_ttx tooltipped",
        "data-position": "top",
        "data-delay": "20",
        "data-tooltip": "Vista de Grafica",
        href: "#"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons"
      }, "show_chart"))))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("table", {
        "class": "table table-bordered",
        style: "border-collapse: collapse;"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("tbody", {
        style: "border: 1px solid rgba(255, 255, 255, 0.4);"
      }, variables.map(this.createItemVariable(max)))));
    }
  }]);

  return TableView;
}(preact__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TableView);

/***/ }),

/***/ "./node_modules/es5-ext/global.js":
/*!****************************************!*\
  !*** ./node_modules/es5-ext/global.js ***!
  \****************************************/
/***/ ((module) => {

var naiveFallback = function () {
	if (typeof self === "object" && self) return self;
	if (typeof window === "object" && window) return window;
	throw new Error("Unable to resolve global `this`");
};

module.exports = (function () {
	if (this) return this;

	// Unexpected strict mode (may happen if e.g. bundled into ESM module)

	// Fallback to standard globalThis if available
	if (typeof globalThis === "object" && globalThis) return globalThis;

	// Thanks @mathiasbynens -> https://mathiasbynens.be/notes/globalthis
	// In all ES5+ engines global object inherits from Object.prototype
	// (if you approached one that doesn't please report)
	try {
		Object.defineProperty(Object.prototype, "__global__", {
			get: function () { return this; },
			configurable: true
		});
	} catch (error) {
		// Unfortunate case of updates to Object.prototype being restricted
		// via preventExtensions, seal or freeze
		return naiveFallback();
	}
	try {
		// Safari case (window.__global__ works, but __global__ does not)
		if (!__global__) return naiveFallback();
		return __global__;
	} finally {
		delete Object.prototype.__global__;
	}
})();


/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function eventListener() {
      if (errorListener !== undefined) {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };
    var errorListener;

    // Adding an error listener is not optional because
    // if an error is thrown on an event emitter we cannot
    // guarantee that the actual event we are waiting will
    // be fired. The result could be a silent way to create
    // memory or file descriptor leaks, which is something
    // we should avoid.
    if (name !== 'error') {
      errorListener = function errorListener(err) {
        emitter.removeListener(name, eventListener);
        reject(err);
      };

      emitter.once('error', errorListener);
    }

    emitter.once(name, eventListener);
  });
}


/***/ }),

/***/ "./node_modules/preact/dist/preact.module.js":
/*!***************************************************!*\
  !*** ./node_modules/preact/dist/preact.module.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ N),
/* harmony export */   "hydrate": () => (/* binding */ O),
/* harmony export */   "createElement": () => (/* binding */ a),
/* harmony export */   "h": () => (/* binding */ a),
/* harmony export */   "Fragment": () => (/* binding */ y),
/* harmony export */   "createRef": () => (/* binding */ h),
/* harmony export */   "isValidElement": () => (/* binding */ l),
/* harmony export */   "Component": () => (/* binding */ p),
/* harmony export */   "cloneElement": () => (/* binding */ S),
/* harmony export */   "createContext": () => (/* binding */ q),
/* harmony export */   "toChildArray": () => (/* binding */ w),
/* harmony export */   "options": () => (/* binding */ n)
/* harmony export */ });
var n,l,u,i,t,r,o={},f=[],e=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function c(n,l){for(var u in l)n[u]=l[u];return n}function s(n){var l=n.parentNode;l&&l.removeChild(n)}function a(n,l,u){var i,t,r,o=arguments,f={};for(r in l)"key"==r?i=l[r]:"ref"==r?t=l[r]:f[r]=l[r];if(arguments.length>3)for(u=[u],r=3;r<arguments.length;r++)u.push(o[r]);if(null!=u&&(f.children=u),"function"==typeof n&&null!=n.defaultProps)for(r in n.defaultProps)void 0===f[r]&&(f[r]=n.defaultProps[r]);return v(n,f,i,t,null)}function v(l,u,i,t,r){var o={type:l,props:u,key:i,ref:t,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==r?++n.__v:r};return null!=n.vnode&&n.vnode(o),o}function h(){return{current:null}}function y(n){return n.children}function p(n,l){this.props=n,this.context=l}function d(n,l){if(null==l)return n.__?d(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return"function"==typeof n.type?d(n):null}function _(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return _(n)}}function k(l){(!l.__d&&(l.__d=!0)&&u.push(l)&&!m.__r++||t!==n.debounceRendering)&&((t=n.debounceRendering)||i)(m)}function m(){for(var n;m.__r=u.length;)n=u.sort(function(n,l){return n.__v.__b-l.__v.__b}),u=[],n.some(function(n){var l,u,i,t,r,o;n.__d&&(r=(t=(l=n).__v).__e,(o=l.__P)&&(u=[],(i=c({},t)).__v=t.__v+1,T(o,t,i,l.__n,void 0!==o.ownerSVGElement,null!=t.__h?[r]:null,u,null==r?d(t):r,t.__h),j(u,t),t.__e!=r&&_(t)))})}function b(n,l,u,i,t,r,e,c,s,a){var h,p,_,k,m,b,w,A=i&&i.__k||f,P=A.length;for(u.__k=[],h=0;h<l.length;h++)if(null!=(k=u.__k[h]=null==(k=l[h])||"boolean"==typeof k?null:"string"==typeof k||"number"==typeof k?v(null,k,null,null,k):Array.isArray(k)?v(y,{children:k},null,null,null):k.__b>0?v(k.type,k.props,k.key,null,k.__v):k)){if(k.__=u,k.__b=u.__b+1,null===(_=A[h])||_&&k.key==_.key&&k.type===_.type)A[h]=void 0;else for(p=0;p<P;p++){if((_=A[p])&&k.key==_.key&&k.type===_.type){A[p]=void 0;break}_=null}T(n,k,_=_||o,t,r,e,c,s,a),m=k.__e,(p=k.ref)&&_.ref!=p&&(w||(w=[]),_.ref&&w.push(_.ref,null,k),w.push(p,k.__c||m,k)),null!=m?(null==b&&(b=m),"function"==typeof k.type&&null!=k.__k&&k.__k===_.__k?k.__d=s=g(k,s,n):s=x(n,k,_,A,m,s),a||"option"!==u.type?"function"==typeof u.type&&(u.__d=s):n.value=""):s&&_.__e==s&&s.parentNode!=n&&(s=d(_))}for(u.__e=b,h=P;h--;)null!=A[h]&&("function"==typeof u.type&&null!=A[h].__e&&A[h].__e==u.__d&&(u.__d=d(i,h+1)),L(A[h],A[h]));if(w)for(h=0;h<w.length;h++)I(w[h],w[++h],w[++h])}function g(n,l,u){var i,t;for(i=0;i<n.__k.length;i++)(t=n.__k[i])&&(t.__=n,l="function"==typeof t.type?g(t,l,u):x(u,t,t,n.__k,t.__e,l));return l}function w(n,l){return l=l||[],null==n||"boolean"==typeof n||(Array.isArray(n)?n.some(function(n){w(n,l)}):l.push(n)),l}function x(n,l,u,i,t,r){var o,f,e;if(void 0!==l.__d)o=l.__d,l.__d=void 0;else if(null==u||t!=r||null==t.parentNode)n:if(null==r||r.parentNode!==n)n.appendChild(t),o=null;else{for(f=r,e=0;(f=f.nextSibling)&&e<i.length;e+=2)if(f==t)break n;n.insertBefore(t,r),o=r}return void 0!==o?o:t.nextSibling}function A(n,l,u,i,t){var r;for(r in u)"children"===r||"key"===r||r in l||C(n,r,null,u[r],i);for(r in l)t&&"function"!=typeof l[r]||"children"===r||"key"===r||"value"===r||"checked"===r||u[r]===l[r]||C(n,r,l[r],u[r],i)}function P(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]=null==u?"":"number"!=typeof u||e.test(l)?u:u+"px"}function C(n,l,u,i,t){var r;n:if("style"===l)if("string"==typeof u)n.style.cssText=u;else{if("string"==typeof i&&(n.style.cssText=i=""),i)for(l in i)u&&l in u||P(n.style,l,"");if(u)for(l in u)i&&u[l]===i[l]||P(n.style,l,u[l])}else if("o"===l[0]&&"n"===l[1])r=l!==(l=l.replace(/Capture$/,"")),l=l.toLowerCase()in n?l.toLowerCase().slice(2):l.slice(2),n.l||(n.l={}),n.l[l+r]=u,u?i||n.addEventListener(l,r?H:$,r):n.removeEventListener(l,r?H:$,r);else if("dangerouslySetInnerHTML"!==l){if(t)l=l.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if("href"!==l&&"list"!==l&&"form"!==l&&"download"!==l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null!=u&&(!1!==u||"a"===l[0]&&"r"===l[1])?n.setAttribute(l,u):n.removeAttribute(l))}}function $(l){this.l[l.type+!1](n.event?n.event(l):l)}function H(l){this.l[l.type+!0](n.event?n.event(l):l)}function T(l,u,i,t,r,o,f,e,s){var a,v,h,d,_,k,m,g,w,x,A,P=u.type;if(void 0!==u.constructor)return null;null!=i.__h&&(s=i.__h,e=u.__e=i.__e,u.__h=null,o=[e]),(a=n.__b)&&a(u);try{n:if("function"==typeof P){if(g=u.props,w=(a=P.contextType)&&t[a.__c],x=a?w?w.props.value:a.__:t,i.__c?m=(v=u.__c=i.__c).__=v.__E:("prototype"in P&&P.prototype.render?u.__c=v=new P(g,x):(u.__c=v=new p(g,x),v.constructor=P,v.render=M),w&&w.sub(v),v.props=g,v.state||(v.state={}),v.context=x,v.__n=t,h=v.__d=!0,v.__h=[]),null==v.__s&&(v.__s=v.state),null!=P.getDerivedStateFromProps&&(v.__s==v.state&&(v.__s=c({},v.__s)),c(v.__s,P.getDerivedStateFromProps(g,v.__s))),d=v.props,_=v.state,h)null==P.getDerivedStateFromProps&&null!=v.componentWillMount&&v.componentWillMount(),null!=v.componentDidMount&&v.__h.push(v.componentDidMount);else{if(null==P.getDerivedStateFromProps&&g!==d&&null!=v.componentWillReceiveProps&&v.componentWillReceiveProps(g,x),!v.__e&&null!=v.shouldComponentUpdate&&!1===v.shouldComponentUpdate(g,v.__s,x)||u.__v===i.__v){v.props=g,v.state=v.__s,u.__v!==i.__v&&(v.__d=!1),v.__v=u,u.__e=i.__e,u.__k=i.__k,v.__h.length&&f.push(v);break n}null!=v.componentWillUpdate&&v.componentWillUpdate(g,v.__s,x),null!=v.componentDidUpdate&&v.__h.push(function(){v.componentDidUpdate(d,_,k)})}v.context=x,v.props=g,v.state=v.__s,(a=n.__r)&&a(u),v.__d=!1,v.__v=u,v.__P=l,a=v.render(v.props,v.state,v.context),v.state=v.__s,null!=v.getChildContext&&(t=c(c({},t),v.getChildContext())),h||null==v.getSnapshotBeforeUpdate||(k=v.getSnapshotBeforeUpdate(d,_)),A=null!=a&&a.type===y&&null==a.key?a.props.children:a,b(l,Array.isArray(A)?A:[A],u,i,t,r,o,f,e,s),v.base=u.__e,u.__h=null,v.__h.length&&f.push(v),m&&(v.__E=v.__=null),v.__e=!1}else null==o&&u.__v===i.__v?(u.__k=i.__k,u.__e=i.__e):u.__e=z(i.__e,u,i,t,r,o,f,s);(a=n.diffed)&&a(u)}catch(l){u.__v=null,(s||null!=o)&&(u.__e=e,u.__h=!!s,o[o.indexOf(e)]=null),n.__e(l,u,i)}}function j(l,u){n.__c&&n.__c(u,l),l.some(function(u){try{l=u.__h,u.__h=[],l.some(function(n){n.call(u)})}catch(l){n.__e(l,u.__v)}})}function z(n,l,u,i,t,r,e,c){var a,v,h,y,p=u.props,d=l.props,_=l.type,k=0;if("svg"===_&&(t=!0),null!=r)for(;k<r.length;k++)if((a=r[k])&&(a===n||(_?a.localName==_:3==a.nodeType))){n=a,r[k]=null;break}if(null==n){if(null===_)return document.createTextNode(d);n=t?document.createElementNS("http://www.w3.org/2000/svg",_):document.createElement(_,d.is&&d),r=null,c=!1}if(null===_)p===d||c&&n.data===d||(n.data=d);else{if(r=r&&f.slice.call(n.childNodes),v=(p=u.props||o).dangerouslySetInnerHTML,h=d.dangerouslySetInnerHTML,!c){if(null!=r)for(p={},y=0;y<n.attributes.length;y++)p[n.attributes[y].name]=n.attributes[y].value;(h||v)&&(h&&(v&&h.__html==v.__html||h.__html===n.innerHTML)||(n.innerHTML=h&&h.__html||""))}if(A(n,d,p,t,c),h)l.__k=[];else if(k=l.props.children,b(n,Array.isArray(k)?k:[k],l,u,i,t&&"foreignObject"!==_,r,e,n.firstChild,c),null!=r)for(k=r.length;k--;)null!=r[k]&&s(r[k]);c||("value"in d&&void 0!==(k=d.value)&&(k!==n.value||"progress"===_&&!k)&&C(n,"value",k,p.value,!1),"checked"in d&&void 0!==(k=d.checked)&&k!==n.checked&&C(n,"checked",k,p.checked,!1))}return n}function I(l,u,i){try{"function"==typeof l?l(u):l.current=u}catch(l){n.__e(l,i)}}function L(l,u,i){var t,r,o;if(n.unmount&&n.unmount(l),(t=l.ref)&&(t.current&&t.current!==l.__e||I(t,null,u)),i||"function"==typeof l.type||(i=null!=(r=l.__e)),l.__e=l.__d=void 0,null!=(t=l.__c)){if(t.componentWillUnmount)try{t.componentWillUnmount()}catch(l){n.__e(l,u)}t.base=t.__P=null}if(t=l.__k)for(o=0;o<t.length;o++)t[o]&&L(t[o],u,i);null!=r&&s(r)}function M(n,l,u){return this.constructor(n,u)}function N(l,u,i){var t,r,e;n.__&&n.__(l,u),r=(t="function"==typeof i)?null:i&&i.__k||u.__k,e=[],T(u,l=(!t&&i||u).__k=a(y,null,[l]),r||o,o,void 0!==u.ownerSVGElement,!t&&i?[i]:r?null:u.firstChild?f.slice.call(u.childNodes):null,e,!t&&i?i:r?r.__e:u.firstChild,t),j(e,l)}function O(n,l){N(n,l,O)}function S(n,l,u){var i,t,r,o=arguments,f=c({},n.props);for(r in l)"key"==r?i=l[r]:"ref"==r?t=l[r]:f[r]=l[r];if(arguments.length>3)for(u=[u],r=3;r<arguments.length;r++)u.push(o[r]);return null!=u&&(f.children=u),v(n.type,f,i||n.key,t||n.ref,null)}function q(n,l){var u={__c:l="__cC"+r++,__:n,Consumer:function(n,l){return n.children(l)},Provider:function(n){var u,i;return this.getChildContext||(u=[],(i={})[l]=this,this.getChildContext=function(){return i},this.shouldComponentUpdate=function(n){this.props.value!==n.value&&u.some(k)},this.sub=function(n){u.push(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u.splice(u.indexOf(n),1),l&&l.call(n)}}),n.children}};return u.Provider.__=u.Consumer.contextType=u}n={__e:function(n,l){for(var u,i,t;l=l.__;)if((u=l.__c)&&!u.__)try{if((i=u.constructor)&&null!=i.getDerivedStateFromError&&(u.setState(i.getDerivedStateFromError(n)),t=u.__d),null!=u.componentDidCatch&&(u.componentDidCatch(n),t=u.__d),t)return u.__E=u}catch(l){n=l}throw n},__v:0},l=function(n){return null!=n&&void 0===n.constructor},p.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=c({},this.state),"function"==typeof n&&(n=n(c({},u),this.props)),n&&c(u,n),null!=n&&this.__v&&(l&&this.__h.push(l),k(this))},p.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),k(this))},p.prototype.render=y,u=[],i="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,m.__r=0,r=0;
//# sourceMappingURL=preact.module.js.map


/***/ }),

/***/ "./node_modules/underscore/modules/_baseCreate.js":
/*!********************************************************!*\
  !*** ./node_modules/underscore/modules/_baseCreate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ baseCreate)
/* harmony export */ });
/* harmony import */ var _isObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isObject.js */ "./node_modules/underscore/modules/isObject.js");
/* harmony import */ var _setup_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_setup.js */ "./node_modules/underscore/modules/_setup.js");



// Create a naked function reference for surrogate-prototype-swapping.
function ctor() {
  return function(){};
}

// An internal function for creating a new object that inherits from another.
function baseCreate(prototype) {
  if (!(0,_isObject_js__WEBPACK_IMPORTED_MODULE_0__.default)(prototype)) return {};
  if (_setup_js__WEBPACK_IMPORTED_MODULE_1__.nativeCreate) return (0,_setup_js__WEBPACK_IMPORTED_MODULE_1__.nativeCreate)(prototype);
  var Ctor = ctor();
  Ctor.prototype = prototype;
  var result = new Ctor;
  Ctor.prototype = null;
  return result;
}


/***/ }),

/***/ "./node_modules/underscore/modules/_baseIteratee.js":
/*!**********************************************************!*\
  !*** ./node_modules/underscore/modules/_baseIteratee.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ baseIteratee)
/* harmony export */ });
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./identity.js */ "./node_modules/underscore/modules/identity.js");
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isFunction.js */ "./node_modules/underscore/modules/isFunction.js");
/* harmony import */ var _isObject_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isObject.js */ "./node_modules/underscore/modules/isObject.js");
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isArray.js */ "./node_modules/underscore/modules/isArray.js");
/* harmony import */ var _matcher_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./matcher.js */ "./node_modules/underscore/modules/matcher.js");
/* harmony import */ var _property_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./property.js */ "./node_modules/underscore/modules/property.js");
/* harmony import */ var _optimizeCb_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_optimizeCb.js */ "./node_modules/underscore/modules/_optimizeCb.js");








// An internal function to generate callbacks that can be applied to each
// element in a collection, returning the desired result — either `_.identity`,
// an arbitrary callback, a property matcher, or a property accessor.
function baseIteratee(value, context, argCount) {
  if (value == null) return _identity_js__WEBPACK_IMPORTED_MODULE_0__.default;
  if ((0,_isFunction_js__WEBPACK_IMPORTED_MODULE_1__.default)(value)) return (0,_optimizeCb_js__WEBPACK_IMPORTED_MODULE_6__.default)(value, context, argCount);
  if ((0,_isObject_js__WEBPACK_IMPORTED_MODULE_2__.default)(value) && !(0,_isArray_js__WEBPACK_IMPORTED_MODULE_3__.default)(value)) return (0,_matcher_js__WEBPACK_IMPORTED_MODULE_4__.default)(value);
  return (0,_property_js__WEBPACK_IMPORTED_MODULE_5__.default)(value);
}


/***/ }),

/***/ "./node_modules/underscore/modules/_cb.js":
/*!************************************************!*\
  !*** ./node_modules/underscore/modules/_cb.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ cb)
/* harmony export */ });
/* harmony import */ var _underscore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./underscore.js */ "./node_modules/underscore/modules/underscore.js");
/* harmony import */ var _baseIteratee_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_baseIteratee.js */ "./node_modules/underscore/modules/_baseIteratee.js");
/* harmony import */ var _iteratee_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./iteratee.js */ "./node_modules/underscore/modules/iteratee.js");




// The function we call internally to generate a callback. It invokes
// `_.iteratee` if overridden, otherwise `baseIteratee`.
function cb(value, context, argCount) {
  if (_underscore_js__WEBPACK_IMPORTED_MODULE_0__.default.iteratee !== _iteratee_js__WEBPACK_IMPORTED_MODULE_2__.default) return _underscore_js__WEBPACK_IMPORTED_MODULE_0__.default.iteratee(value, context);
  return (0,_baseIteratee_js__WEBPACK_IMPORTED_MODULE_1__.default)(value, context, argCount);
}


/***/ }),

/***/ "./node_modules/underscore/modules/_chainResult.js":
/*!*********************************************************!*\
  !*** ./node_modules/underscore/modules/_chainResult.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ chainResult)
/* harmony export */ });
/* harmony import */ var _underscore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./underscore.js */ "./node_modules/underscore/modules/underscore.js");


// Helper function to continue chaining intermediate results.
function chainResult(instance, obj) {
  return instance._chain ? (0,_underscore_js__WEBPACK_IMPORTED_MODULE_0__.default)(obj).chain() : obj;
}


/***/ }),

/***/ "./node_modules/underscore/modules/_collectNonEnumProps.js":
/*!*****************************************************************!*\
  !*** ./node_modules/underscore/modules/_collectNonEnumProps.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ collectNonEnumProps)
/* harmony export */ });
/* harmony import */ var _setup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_setup.js */ "./node_modules/underscore/modules/_setup.js");
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isFunction.js */ "./node_modules/underscore/modules/isFunction.js");
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_has.js */ "./node_modules/underscore/modules/_has.js");




// Internal helper to create a simple lookup structure.
// `collectNonEnumProps` used to depend on `_.contains`, but this led to
// circular imports. `emulatedSet` is a one-off solution that only works for
// arrays of strings.
function emulatedSet(keys) {
  var hash = {};
  for (var l = keys.length, i = 0; i < l; ++i) hash[keys[i]] = true;
  return {
    contains: function(key) { return hash[key]; },
    push: function(key) {
      hash[key] = true;
      return keys.push(key);
    }
  };
}

// Internal helper. Checks `keys` for the presence of keys in IE < 9 that won't
// be iterated by `for key in ...` and thus missed. Extends `keys` in place if
// needed.
function collectNonEnumProps(obj, keys) {
  keys = emulatedSet(keys);
  var nonEnumIdx = _setup_js__WEBPACK_IMPORTED_MODULE_0__.nonEnumerableProps.length;
  var constructor = obj.constructor;
  var proto = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_1__.default)(constructor) && constructor.prototype || _setup_js__WEBPACK_IMPORTED_MODULE_0__.ObjProto;

  // Constructor is a special case.
  var prop = 'constructor';
  if ((0,_has_js__WEBPACK_IMPORTED_MODULE_2__.default)(obj, prop) && !keys.contains(prop)) keys.push(prop);

  while (nonEnumIdx--) {
    prop = _setup_js__WEBPACK_IMPORTED_MODULE_0__.nonEnumerableProps[nonEnumIdx];
    if (prop in obj && obj[prop] !== proto[prop] && !keys.contains(prop)) {
      keys.push(prop);
    }
  }
}


/***/ }),

/***/ "./node_modules/underscore/modules/_createAssigner.js":
/*!************************************************************!*\
  !*** ./node_modules/underscore/modules/_createAssigner.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createAssigner)
/* harmony export */ });
// An internal function for creating assigner functions.
function createAssigner(keysFunc, defaults) {
  return function(obj) {
    var length = arguments.length;
    if (defaults) obj = Object(obj);
    if (length < 2 || obj == null) return obj;
    for (var index = 1; index < length; index++) {
      var source = arguments[index],
          keys = keysFunc(source),
          l = keys.length;
      for (var i = 0; i < l; i++) {
        var key = keys[i];
        if (!defaults || obj[key] === void 0) obj[key] = source[key];
      }
    }
    return obj;
  };
}


/***/ }),

/***/ "./node_modules/underscore/modules/_createEscaper.js":
/*!***********************************************************!*\
  !*** ./node_modules/underscore/modules/_createEscaper.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createEscaper)
/* harmony export */ });
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keys.js */ "./node_modules/underscore/modules/keys.js");


// Internal helper to generate functions for escaping and unescaping strings
// to/from HTML interpolation.
function createEscaper(map) {
  var escaper = function(match) {
    return map[match];
  };
  // Regexes for identifying a key that needs to be escaped.
  var source = '(?:' + (0,_keys_js__WEBPACK_IMPORTED_MODULE_0__.default)(map).join('|') + ')';
  var testRegexp = RegExp(source);
  var replaceRegexp = RegExp(source, 'g');
  return function(string) {
    string = string == null ? '' : '' + string;
    return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
  };
}


/***/ }),

/***/ "./node_modules/underscore/modules/_createIndexFinder.js":
/*!***************************************************************!*\
  !*** ./node_modules/underscore/modules/_createIndexFinder.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createIndexFinder)
/* harmony export */ });
/* harmony import */ var _getLength_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_getLength.js */ "./node_modules/underscore/modules/_getLength.js");
/* harmony import */ var _setup_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_setup.js */ "./node_modules/underscore/modules/_setup.js");
/* harmony import */ var _isNaN_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isNaN.js */ "./node_modules/underscore/modules/isNaN.js");




// Internal function to generate the `_.indexOf` and `_.lastIndexOf` functions.
function createIndexFinder(dir, predicateFind, sortedIndex) {
  return function(array, item, idx) {
    var i = 0, length = (0,_getLength_js__WEBPACK_IMPORTED_MODULE_0__.default)(array);
    if (typeof idx == 'number') {
      if (dir > 0) {
        i = idx >= 0 ? idx : Math.max(idx + length, i);
      } else {
        length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
      }
    } else if (sortedIndex && idx && length) {
      idx = sortedIndex(array, item);
      return array[idx] === item ? idx : -1;
    }
    if (item !== item) {
      idx = predicateFind(_setup_js__WEBPACK_IMPORTED_MODULE_1__.slice.call(array, i, length), _isNaN_js__WEBPACK_IMPORTED_MODULE_2__.default);
      return idx >= 0 ? idx + i : -1;
    }
    for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
      if (array[idx] === item) return idx;
    }
    return -1;
  };
}


/***/ }),

/***/ "./node_modules/underscore/modules/_createPredicateIndexFinder.js":
/*!************************************************************************!*\
  !*** ./node_modules/underscore/modules/_createPredicateIndexFinder.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createPredicateIndexFinder)
/* harmony export */ });
/* harmony import */ var _cb_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_cb.js */ "./node_modules/underscore/modules/_cb.js");
/* harmony import */ var _getLength_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_getLength.js */ "./node_modules/underscore/modules/_getLength.js");



// Internal function to generate `_.findIndex` and `_.findLastIndex`.
function createPredicateIndexFinder(dir) {
  return function(array, predicate, context) {
    predicate = (0,_cb_js__WEBPACK_IMPORTED_MODULE_0__.default)(predicate, context);
    var length = (0,_getLength_js__WEBPACK_IMPORTED_MODULE_1__.default)(array);
    var index = dir > 0 ? 0 : length - 1;
    for (; index >= 0 && index < length; index += dir) {
      if (predicate(array[index], index, array)) return index;
    }
    return -1;
  };
}


/***/ }),

/***/ "./node_modules/underscore/modules/_createReduce.js":
/*!**********************************************************!*\
  !*** ./node_modules/underscore/modules/_createReduce.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createReduce)
/* harmony export */ });
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isArrayLike.js */ "./node_modules/underscore/modules/_isArrayLike.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keys.js */ "./node_modules/underscore/modules/keys.js");
/* harmony import */ var _optimizeCb_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_optimizeCb.js */ "./node_modules/underscore/modules/_optimizeCb.js");




// Internal helper to create a reducing function, iterating left or right.
function createReduce(dir) {
  // Wrap code that reassigns argument variables in a separate function than
  // the one that accesses `arguments.length` to avoid a perf hit. (#1991)
  var reducer = function(obj, iteratee, memo, initial) {
    var _keys = !(0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__.default)(obj) && (0,_keys_js__WEBPACK_IMPORTED_MODULE_1__.default)(obj),
        length = (_keys || obj).length,
        index = dir > 0 ? 0 : length - 1;
    if (!initial) {
      memo = obj[_keys ? _keys[index] : index];
      index += dir;
    }
    for (; index >= 0 && index < length; index += dir) {
      var currentKey = _keys ? _keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  return function(obj, iteratee, memo, context) {
    var initial = arguments.length >= 3;
    return reducer(obj, (0,_optimizeCb_js__WEBPACK_IMPORTED_MODULE_2__.default)(iteratee, context, 4), memo, initial);
  };
}


/***/ }),

/***/ "./node_modules/underscore/modules/_createSizePropertyCheck.js":
/*!*********************************************************************!*\
  !*** ./node_modules/underscore/modules/_createSizePropertyCheck.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createSizePropertyCheck)
/* harmony export */ });
/* harmony import */ var _setup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_setup.js */ "./node_modules/underscore/modules/_setup.js");


// Common internal logic for `isArrayLike` and `isBufferLike`.
function createSizePropertyCheck(getSizeProperty) {
  return function(collection) {
    var sizeProperty = getSizeProperty(collection);
    return typeof sizeProperty == 'number' && sizeProperty >= 0 && sizeProperty <= _setup_js__WEBPACK_IMPORTED_MODULE_0__.MAX_ARRAY_INDEX;
  }
}


/***/ }),

/***/ "./node_modules/underscore/modules/_deepGet.js":
/*!*****************************************************!*\
  !*** ./node_modules/underscore/modules/_deepGet.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ deepGet)
/* harmony export */ });
// Internal function to obtain a nested property in `obj` along `path`.
function deepGet(obj, path) {
  var length = path.length;
  for (var i = 0; i < length; i++) {
    if (obj == null) return void 0;
    obj = obj[path[i]];
  }
  return length ? obj : void 0;
}


/***/ }),

/***/ "./node_modules/underscore/modules/_escapeMap.js":
/*!*******************************************************!*\
  !*** ./node_modules/underscore/modules/_escapeMap.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Internal list of HTML entities for escaping.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;'
});


/***/ }),

/***/ "./node_modules/underscore/modules/_executeBound.js":
/*!**********************************************************!*\
  !*** ./node_modules/underscore/modules/_executeBound.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ executeBound)
/* harmony export */ });
/* harmony import */ var _baseCreate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_baseCreate.js */ "./node_modules/underscore/modules/_baseCreate.js");
/* harmony import */ var _isObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isObject.js */ "./node_modules/underscore/modules/isObject.js");



// Internal function to execute `sourceFunc` bound to `context` with optional
// `args`. Determines whether to execute a function as a constructor or as a
// normal function.
function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
  if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
  var self = (0,_baseCreate_js__WEBPACK_IMPORTED_MODULE_0__.default)(sourceFunc.prototype);
  var result = sourceFunc.apply(self, args);
  if ((0,_isObject_js__WEBPACK_IMPORTED_MODULE_1__.default)(result)) return result;
  return self;
}


/***/ }),

/***/ "./node_modules/underscore/modules/_flatten.js":
/*!*****************************************************!*\
  !*** ./node_modules/underscore/modules/_flatten.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ flatten)
/* harmony export */ });
/* harmony import */ var _getLength_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_getLength.js */ "./node_modules/underscore/modules/_getLength.js");
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_isArrayLike.js */ "./node_modules/underscore/modules/_isArrayLike.js");
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isArray.js */ "./node_modules/underscore/modules/isArray.js");
/* harmony import */ var _isArguments_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isArguments.js */ "./node_modules/underscore/modules/isArguments.js");





// Internal implementation of a recursive `flatten` function.
function flatten(input, depth, strict, output) {
  output = output || [];
  if (!depth && depth !== 0) {
    depth = Infinity;
  } else if (depth <= 0) {
    return output.concat(input);
  }
  var idx = output.length;
  for (var i = 0, length = (0,_getLength_js__WEBPACK_IMPORTED_MODULE_0__.default)(input); i < length; i++) {
    var value = input[i];
    if ((0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_1__.default)(value) && ((0,_isArray_js__WEBPACK_IMPORTED_MODULE_2__.default)(value) || (0,_isArguments_js__WEBPACK_IMPORTED_MODULE_3__.default)(value))) {
      // Flatten current level of array or arguments object.
      if (depth > 1) {
        flatten(value, depth - 1, strict, output);
        idx = output.length;
      } else {
        var j = 0, len = value.length;
        while (j < len) output[idx++] = value[j++];
      }
    } else if (!strict) {
      output[idx++] = value;
    }
  }
  return output;
}


/***/ }),

/***/ "./node_modules/underscore/modules/_getByteLength.js":
/*!***********************************************************!*\
  !*** ./node_modules/underscore/modules/_getByteLength.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shallowProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_shallowProperty.js */ "./node_modules/underscore/modules/_shallowProperty.js");


// Internal helper to obtain the `byteLength` property of an object.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_shallowProperty_js__WEBPACK_IMPORTED_MODULE_0__.default)('byteLength'));


/***/ }),

/***/ "./node_modules/underscore/modules/_getLength.js":
/*!*******************************************************!*\
  !*** ./node_modules/underscore/modules/_getLength.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shallowProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_shallowProperty.js */ "./node_modules/underscore/modules/_shallowProperty.js");


// Internal helper to obtain the `length` property of an object.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_shallowProperty_js__WEBPACK_IMPORTED_MODULE_0__.default)('length'));


/***/ }),

/***/ "./node_modules/underscore/modules/_group.js":
/*!***************************************************!*\
  !*** ./node_modules/underscore/modules/_group.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ group)
/* harmony export */ });
/* harmony import */ var _cb_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_cb.js */ "./node_modules/underscore/modules/_cb.js");
/* harmony import */ var _each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./each.js */ "./node_modules/underscore/modules/each.js");



// An internal function used for aggregate "group by" operations.
function group(behavior, partition) {
  return function(obj, iteratee, context) {
    var result = partition ? [[], []] : {};
    iteratee = (0,_cb_js__WEBPACK_IMPORTED_MODULE_0__.default)(iteratee, context);
    (0,_each_js__WEBPACK_IMPORTED_MODULE_1__.default)(obj, function(value, index) {
      var key = iteratee(value, index, obj);
      behavior(result, value, key);
    });
    return result;
  };
}


/***/ }),

/***/ "./node_modules/underscore/modules/_has.js":
/*!*************************************************!*\
  !*** ./node_modules/underscore/modules/_has.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ has)
/* harmony export */ });
/* harmony import */ var _setup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_setup.js */ "./node_modules/underscore/modules/_setup.js");


// Internal function to check whether `key` is an own property name of `obj`.
function has(obj, key) {
  return obj != null && _setup_js__WEBPACK_IMPORTED_MODULE_0__.hasOwnProperty.call(obj, key);
}


/***/ }),

/***/ "./node_modules/underscore/modules/_hasObjectTag.js":
/*!**********************************************************!*\
  !*** ./node_modules/underscore/modules/_hasObjectTag.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tagTester_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_tagTester.js */ "./node_modules/underscore/modules/_tagTester.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_tagTester_js__WEBPACK_IMPORTED_MODULE_0__.default)('Object'));


/***/ }),

/***/ "./node_modules/underscore/modules/_isArrayLike.js":
/*!*********************************************************!*\
  !*** ./node_modules/underscore/modules/_isArrayLike.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createSizePropertyCheck_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_createSizePropertyCheck.js */ "./node_modules/underscore/modules/_createSizePropertyCheck.js");
/* harmony import */ var _getLength_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_getLength.js */ "./node_modules/underscore/modules/_getLength.js");



// Internal helper for collection methods to determine whether a collection
// should be iterated as an array or as an object.
// Related: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
// Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_createSizePropertyCheck_js__WEBPACK_IMPORTED_MODULE_0__.default)(_getLength_js__WEBPACK_IMPORTED_MODULE_1__.default));


/***/ }),

/***/ "./node_modules/underscore/modules/_isBufferLike.js":
/*!**********************************************************!*\
  !*** ./node_modules/underscore/modules/_isBufferLike.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createSizePropertyCheck_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_createSizePropertyCheck.js */ "./node_modules/underscore/modules/_createSizePropertyCheck.js");
/* harmony import */ var _getByteLength_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_getByteLength.js */ "./node_modules/underscore/modules/_getByteLength.js");



// Internal helper to determine whether we should spend extensive checks against
// `ArrayBuffer` et al.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_createSizePropertyCheck_js__WEBPACK_IMPORTED_MODULE_0__.default)(_getByteLength_js__WEBPACK_IMPORTED_MODULE_1__.default));


/***/ }),

/***/ "./node_modules/underscore/modules/_keyInObj.js":
/*!******************************************************!*\
  !*** ./node_modules/underscore/modules/_keyInObj.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ keyInObj)
/* harmony export */ });
// Internal `_.pick` helper function to determine whether `key` is an enumerable
// property name of `obj`.
function keyInObj(value, key, obj) {
  return key in obj;
}


/***/ }),

/***/ "./node_modules/underscore/modules/_methodFingerprint.js":
/*!***************************************************************!*\
  !*** ./node_modules/underscore/modules/_methodFingerprint.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ie11fingerprint": () => (/* binding */ ie11fingerprint),
/* harmony export */   "mapMethods": () => (/* binding */ mapMethods),
/* harmony export */   "weakMapMethods": () => (/* binding */ weakMapMethods),
/* harmony export */   "setMethods": () => (/* binding */ setMethods)
/* harmony export */ });
/* harmony import */ var _getLength_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_getLength.js */ "./node_modules/underscore/modules/_getLength.js");
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isFunction.js */ "./node_modules/underscore/modules/isFunction.js");
/* harmony import */ var _allKeys_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./allKeys.js */ "./node_modules/underscore/modules/allKeys.js");




// Since the regular `Object.prototype.toString` type tests don't work for
// some types in IE 11, we use a fingerprinting heuristic instead, based
// on the methods. It's not great, but it's the best we got.
// The fingerprint method lists are defined below.
function ie11fingerprint(methods) {
  var length = (0,_getLength_js__WEBPACK_IMPORTED_MODULE_0__.default)(methods);
  return function(obj) {
    if (obj == null) return false;
    // `Map`, `WeakMap` and `Set` have no enumerable keys.
    var keys = (0,_allKeys_js__WEBPACK_IMPORTED_MODULE_2__.default)(obj);
    if ((0,_getLength_js__WEBPACK_IMPORTED_MODULE_0__.default)(keys)) return false;
    for (var i = 0; i < length; i++) {
      if (!(0,_isFunction_js__WEBPACK_IMPORTED_MODULE_1__.default)(obj[methods[i]])) return false;
    }
    // If we are testing against `WeakMap`, we need to ensure that
    // `obj` doesn't have a `forEach` method in order to distinguish
    // it from a regular `Map`.
    return methods !== weakMapMethods || !(0,_isFunction_js__WEBPACK_IMPORTED_MODULE_1__.default)(obj[forEachName]);
  };
}

// In the interest of compact minification, we write
// each string in the fingerprints only once.
var forEachName = 'forEach',
    hasName = 'has',
    commonInit = ['clear', 'delete'],
    mapTail = ['get', hasName, 'set'];

// `Map`, `WeakMap` and `Set` each have slightly different
// combinations of the above sublists.
var mapMethods = commonInit.concat(forEachName, mapTail),
    weakMapMethods = commonInit.concat(mapTail),
    setMethods = ['add'].concat(commonInit, forEachName, hasName);


/***/ }),

/***/ "./node_modules/underscore/modules/_optimizeCb.js":
/*!********************************************************!*\
  !*** ./node_modules/underscore/modules/_optimizeCb.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ optimizeCb)
/* harmony export */ });
// Internal function that returns an efficient (for current engines) version
// of the passed-in callback, to be repeatedly applied in other Underscore
// functions.
function optimizeCb(func, context, argCount) {
  if (context === void 0) return func;
  switch (argCount == null ? 3 : argCount) {
    case 1: return function(value) {
      return func.call(context, value);
    };
    // The 2-argument case is omitted because we’re not using it.
    case 3: return function(value, index, collection) {
      return func.call(context, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(context, accumulator, value, index, collection);
    };
  }
  return function() {
    return func.apply(context, arguments);
  };
}


/***/ }),

/***/ "./node_modules/underscore/modules/_setup.js":
/*!***************************************************!*\
  !*** ./node_modules/underscore/modules/_setup.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VERSION": () => (/* binding */ VERSION),
/* harmony export */   "root": () => (/* binding */ root),
/* harmony export */   "ArrayProto": () => (/* binding */ ArrayProto),
/* harmony export */   "ObjProto": () => (/* binding */ ObjProto),
/* harmony export */   "SymbolProto": () => (/* binding */ SymbolProto),
/* harmony export */   "push": () => (/* binding */ push),
/* harmony export */   "slice": () => (/* binding */ slice),
/* harmony export */   "toString": () => (/* binding */ toString),
/* harmony export */   "hasOwnProperty": () => (/* binding */ hasOwnProperty),
/* harmony export */   "supportsArrayBuffer": () => (/* binding */ supportsArrayBuffer),
/* harmony export */   "supportsDataView": () => (/* binding */ supportsDataView),
/* harmony export */   "nativeIsArray": () => (/* binding */ nativeIsArray),
/* harmony export */   "nativeKeys": () => (/* binding */ nativeKeys),
/* harmony export */   "nativeCreate": () => (/* binding */ nativeCreate),
/* harmony export */   "nativeIsView": () => (/* binding */ nativeIsView),
/* harmony export */   "_isNaN": () => (/* binding */ _isNaN),
/* harmony export */   "_isFinite": () => (/* binding */ _isFinite),
/* harmony export */   "hasEnumBug": () => (/* binding */ hasEnumBug),
/* harmony export */   "nonEnumerableProps": () => (/* binding */ nonEnumerableProps),
/* harmony export */   "MAX_ARRAY_INDEX": () => (/* binding */ MAX_ARRAY_INDEX)
/* harmony export */ });
// Current version.
var VERSION = '1.12.0';

// Establish the root object, `window` (`self`) in the browser, `global`
// on the server, or `this` in some virtual machines. We use `self`
// instead of `window` for `WebWorker` support.
var root = typeof self == 'object' && self.self === self && self ||
          typeof __webpack_require__.g == 'object' && __webpack_require__.g.global === __webpack_require__.g && __webpack_require__.g ||
          Function('return this')() ||
          {};

// Save bytes in the minified (but not gzipped) version:
var ArrayProto = Array.prototype, ObjProto = Object.prototype;
var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;

// Create quick reference variables for speed access to core prototypes.
var push = ArrayProto.push,
    slice = ArrayProto.slice,
    toString = ObjProto.toString,
    hasOwnProperty = ObjProto.hasOwnProperty;

// Modern feature detection.
var supportsArrayBuffer = typeof ArrayBuffer !== 'undefined',
    supportsDataView = typeof DataView !== 'undefined';

// All **ECMAScript 5+** native function implementations that we hope to use
// are declared here.
var nativeIsArray = Array.isArray,
    nativeKeys = Object.keys,
    nativeCreate = Object.create,
    nativeIsView = supportsArrayBuffer && ArrayBuffer.isView;

// Create references to these builtin functions because we override them.
var _isNaN = isNaN,
    _isFinite = isFinite;

// Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
  'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

// The largest integer that can be represented exactly.
var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;


/***/ }),

/***/ "./node_modules/underscore/modules/_shallowProperty.js":
/*!*************************************************************!*\
  !*** ./node_modules/underscore/modules/_shallowProperty.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ shallowProperty)
/* harmony export */ });
// Internal helper to generate a function to obtain property `key` from `obj`.
function shallowProperty(key) {
  return function(obj) {
    return obj == null ? void 0 : obj[key];
  };
}


/***/ }),

/***/ "./node_modules/underscore/modules/_stringTagBug.js":
/*!**********************************************************!*\
  !*** ./node_modules/underscore/modules/_stringTagBug.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasStringTagBug": () => (/* binding */ hasStringTagBug),
/* harmony export */   "isIE11": () => (/* binding */ isIE11)
/* harmony export */ });
/* harmony import */ var _setup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_setup.js */ "./node_modules/underscore/modules/_setup.js");
/* harmony import */ var _hasObjectTag_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_hasObjectTag.js */ "./node_modules/underscore/modules/_hasObjectTag.js");



// In IE 10 - Edge 13, `DataView` has string tag `'[object Object]'`.
// In IE 11, the most common among them, this problem also applies to
// `Map`, `WeakMap` and `Set`.
var hasStringTagBug = (
      _setup_js__WEBPACK_IMPORTED_MODULE_0__.supportsDataView && (0,_hasObjectTag_js__WEBPACK_IMPORTED_MODULE_1__.default)(new DataView(new ArrayBuffer(8)))
    ),
    isIE11 = (typeof Map !== 'undefined' && (0,_hasObjectTag_js__WEBPACK_IMPORTED_MODULE_1__.default)(new Map));


/***/ }),

/***/ "./node_modules/underscore/modules/_tagTester.js":
/*!*******************************************************!*\
  !*** ./node_modules/underscore/modules/_tagTester.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ tagTester)
/* harmony export */ });
/* harmony import */ var _setup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_setup.js */ "./node_modules/underscore/modules/_setup.js");


// Internal function for creating a `toString`-based type tester.
function tagTester(name) {
  var tag = '[object ' + name + ']';
  return function(obj) {
    return _setup_js__WEBPACK_IMPORTED_MODULE_0__.toString.call(obj) === tag;
  };
}


/***/ }),

/***/ "./node_modules/underscore/modules/_toBufferView.js":
/*!**********************************************************!*\
  !*** ./node_modules/underscore/modules/_toBufferView.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toBufferView)
/* harmony export */ });
/* harmony import */ var _getByteLength_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_getByteLength.js */ "./node_modules/underscore/modules/_getByteLength.js");


// Internal function to wrap or shallow-copy an ArrayBuffer,
// typed array or DataView to a new view, reusing the buffer.
function toBufferView(bufferSource) {
  return new Uint8Array(
    bufferSource.buffer || bufferSource,
    bufferSource.byteOffset || 0,
    (0,_getByteLength_js__WEBPACK_IMPORTED_MODULE_0__.default)(bufferSource)
  );
}


/***/ }),

/***/ "./node_modules/underscore/modules/_toPath.js":
/*!****************************************************!*\
  !*** ./node_modules/underscore/modules/_toPath.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toPath)
/* harmony export */ });
/* harmony import */ var _underscore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./underscore.js */ "./node_modules/underscore/modules/underscore.js");
/* harmony import */ var _toPath_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toPath.js */ "./node_modules/underscore/modules/toPath.js");



// Internal wrapper for `_.toPath` to enable minification.
// Similar to `cb` for `_.iteratee`.
function toPath(path) {
  return _underscore_js__WEBPACK_IMPORTED_MODULE_0__.default.toPath(path);
}


/***/ }),

/***/ "./node_modules/underscore/modules/_unescapeMap.js":
/*!*********************************************************!*\
  !*** ./node_modules/underscore/modules/_unescapeMap.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _invert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./invert.js */ "./node_modules/underscore/modules/invert.js");
/* harmony import */ var _escapeMap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_escapeMap.js */ "./node_modules/underscore/modules/_escapeMap.js");



// Internal list of HTML entities for unescaping.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_invert_js__WEBPACK_IMPORTED_MODULE_0__.default)(_escapeMap_js__WEBPACK_IMPORTED_MODULE_1__.default));


/***/ }),

/***/ "./node_modules/underscore/modules/after.js":
/*!**************************************************!*\
  !*** ./node_modules/underscore/modules/after.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ after)
/* harmony export */ });
// Returns a function that will only be executed on and after the Nth call.
function after(times, func) {
  return function() {
    if (--times < 1) {
      return func.apply(this, arguments);
    }
  };
}


/***/ }),

/***/ "./node_modules/underscore/modules/allKeys.js":
/*!****************************************************!*\
  !*** ./node_modules/underscore/modules/allKeys.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ allKeys)
/* harmony export */ });
/* harmony import */ var _isObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isObject.js */ "./node_modules/underscore/modules/isObject.js");
/* harmony import */ var _setup_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_setup.js */ "./node_modules/underscore/modules/_setup.js");
/* harmony import */ var _collectNonEnumProps_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_collectNonEnumProps.js */ "./node_modules/underscore/modules/_collectNonEnumProps.js");




// Retrieve all the enumerable property names of an object.
function allKeys(obj) {
  if (!(0,_isObject_js__WEBPACK_IMPORTED_MODULE_0__.default)(obj)) return [];
  var keys = [];
  for (var key in obj) keys.push(key);
  // Ahem, IE < 9.
  if (_setup_js__WEBPACK_IMPORTED_MODULE_1__.hasEnumBug) (0,_collectNonEnumProps_js__WEBPACK_IMPORTED_MODULE_2__.default)(obj, keys);
  return keys;
}


/***/ }),

/***/ "./node_modules/underscore/modules/before.js":
/*!***************************************************!*\
  !*** ./node_modules/underscore/modules/before.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ before)
/* harmony export */ });
// Returns a function that will only be executed up to (but not including) the
// Nth call.
function before(times, func) {
  var memo;
  return function() {
    if (--times > 0) {
      memo = func.apply(this, arguments);
    }
    if (times <= 1) func = null;
    return memo;
  };
}


/***/ }),

/***/ "./node_modules/underscore/modules/bind.js":
/*!*************************************************!*\
  !*** ./node_modules/underscore/modules/bind.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _restArguments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./restArguments.js */ "./node_modules/underscore/modules/restArguments.js");
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isFunction.js */ "./node_modules/underscore/modules/isFunction.js");
/* harmony import */ var _executeBound_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_executeBound.js */ "./node_modules/underscore/modules/_executeBound.js");




// Create a function bound to a given object (assigning `this`, and arguments,
// optionally).
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_restArguments_js__WEBPACK_IMPORTED_MODULE_0__.default)(function(func, context, args) {
  if (!(0,_isFunction_js__WEBPACK_IMPORTED_MODULE_1__.default)(func)) throw new TypeError('Bind must be called on a function');
  var bound = (0,_restArguments_js__WEBPACK_IMPORTED_MODULE_0__.default)(function(callArgs) {
    return (0,_executeBound_js__WEBPACK_IMPORTED_MODULE_2__.default)(func, bound, context, this, args.concat(callArgs));
  });
  return bound;
}));


/***/ }),

/***/ "./node_modules/underscore/modules/bindAll.js":
/*!****************************************************!*\
  !*** ./node_modules/underscore/modules/bindAll.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _restArguments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./restArguments.js */ "./node_modules/underscore/modules/restArguments.js");
/* harmony import */ var _flatten_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_flatten.js */ "./node_modules/underscore/modules/_flatten.js");
/* harmony import */ var _bind_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bind.js */ "./node_modules/underscore/modules/bind.js");




// Bind a number of an object's methods to that object. Remaining arguments
// are the method names to be bound. Useful for ensuring that all callbacks
// defined on an object belong to it.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_restArguments_js__WEBPACK_IMPORTED_MODULE_0__.default)(function(obj, keys) {
  keys = (0,_flatten_js__WEBPACK_IMPORTED_MODULE_1__.default)(keys, false, false);
  var index = keys.length;
  if (index < 1) throw new Error('bindAll must be passed function names');
  while (index--) {
    var key = keys[index];
    obj[key] = (0,_bind_js__WEBPACK_IMPORTED_MODULE_2__.default)(obj[key], obj);
  }
  return obj;
}));


/***/ }),

/***/ "./node_modules/underscore/modules/chain.js":
/*!**************************************************!*\
  !*** ./node_modules/underscore/modules/chain.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ chain)
/* harmony export */ });
/* harmony import */ var _underscore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./underscore.js */ "./node_modules/underscore/modules/underscore.js");


// Start chaining a wrapped Underscore object.
function chain(obj) {
  var instance = (0,_underscore_js__WEBPACK_IMPORTED_MODULE_0__.default)(obj);
  instance._chain = true;
  return instance;
}


/***/ }),

/***/ "./node_modules/underscore/modules/chunk.js":
/*!**************************************************!*\
  !*** ./node_modules/underscore/modules/chunk.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ chunk)
/* harmony export */ });
/* harmony import */ var _setup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_setup.js */ "./node_modules/underscore/modules/_setup.js");


// Chunk a single array into multiple arrays, each containing `count` or fewer
// items.
function chunk(array, count) {
  if (count == null || count < 1) return [];
  var result = [];
  var i = 0, length = array.length;
  while (i < length) {
    result.push(_setup_js__WEBPACK_IMPORTED_MODULE_0__.slice.call(array, i, i += count));
  }
  return result;
}


/***/ }),

/***/ "./node_modules/underscore/modules/clone.js":
/*!**************************************************!*\
  !*** ./node_modules/underscore/modules/clone.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ clone)
/* harmony export */ });
/* harmony import */ var _isObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isObject.js */ "./node_modules/underscore/modules/isObject.js");
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isArray.js */ "./node_modules/underscore/modules/isArray.js");
/* harmony import */ var _extend_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extend.js */ "./node_modules/underscore/modules/extend.js");




// Create a (shallow-cloned) duplicate of an object.
function clone(obj) {
  if (!(0,_isObject_js__WEBPACK_IMPORTED_MODULE_0__.default)(obj)) return obj;
  return (0,_isArray_js__WEBPACK_IMPORTED_MODULE_1__.default)(obj) ? obj.slice() : (0,_extend_js__WEBPACK_IMPORTED_MODULE_2__.default)({}, obj);
}


/***/ }),

/***/ "./node_modules/underscore/modules/compact.js":
/*!****************************************************!*\
  !*** ./node_modules/underscore/modules/compact.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ compact)
/* harmony export */ });
/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filter.js */ "./node_modules/underscore/modules/filter.js");


// Trim out all falsy values from an array.
function compact(array) {
  return (0,_filter_js__WEBPACK_IMPORTED_MODULE_0__.default)(array, Boolean);
}


/***/ }),

/***/ "./node_modules/underscore/modules/compose.js":
/*!****************************************************!*\
  !*** ./node_modules/underscore/modules/compose.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ compose)
/* harmony export */ });
// Returns a function that is the composition of a list of functions, each
// consuming the return value of the function that follows.
function compose() {
  var args = arguments;
  var start = args.length - 1;
  return function() {
    var i = start;
    var result = args[start].apply(this, arguments);
    while (i--) result = args[i].call(this, result);
    return result;
  };
}


/***/ }),

/***/ "./node_modules/underscore/modules/constant.js":
/*!*****************************************************!*\
  !*** ./node_modules/underscore/modules/constant.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ constant)
/* harmony export */ });
// Predicate-generating function. Often useful outside of Underscore.
function constant(value) {
  return function() {
    return value;
  };
}


/***/ }),

/***/ "./node_modules/underscore/modules/contains.js":
/*!*****************************************************!*\
  !*** ./node_modules/underscore/modules/contains.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ contains)
/* harmony export */ });
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isArrayLike.js */ "./node_modules/underscore/modules/_isArrayLike.js");
/* harmony import */ var _values_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./values.js */ "./node_modules/underscore/modules/values.js");
/* harmony import */ var _indexOf_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./indexOf.js */ "./node_modules/underscore/modules/indexOf.js");




// Determine if the array or object contains a given item (using `===`).
function contains(obj, item, fromIndex, guard) {
  if (!(0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__.default)(obj)) obj = (0,_values_js__WEBPACK_IMPORTED_MODULE_1__.default)(obj);
  if (typeof fromIndex != 'number' || guard) fromIndex = 0;
  return (0,_indexOf_js__WEBPACK_IMPORTED_MODULE_2__.default)(obj, item, fromIndex) >= 0;
}


/***/ }),

/***/ "./node_modules/underscore/modules/countBy.js":
/*!****************************************************!*\
  !*** ./node_modules/underscore/modules/countBy.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _group_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_group.js */ "./node_modules/underscore/modules/_group.js");
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_has.js */ "./node_modules/underscore/modules/_has.js");



// Counts instances of an object that group by a certain criterion. Pass
// either a string attribute to count by, or a function that returns the
// criterion.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_group_js__WEBPACK_IMPORTED_MODULE_0__.default)(function(result, value, key) {
  if ((0,_has_js__WEBPACK_IMPORTED_MODULE_1__.default)(result, key)) result[key]++; else result[key] = 1;
}));


/***/ }),

/***/ "./node_modules/underscore/modules/create.js":
/*!***************************************************!*\
  !*** ./node_modules/underscore/modules/create.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ create)
/* harmony export */ });
/* harmony import */ var _baseCreate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_baseCreate.js */ "./node_modules/underscore/modules/_baseCreate.js");
/* harmony import */ var _extendOwn_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extendOwn.js */ "./node_modules/underscore/modules/extendOwn.js");



// Creates an object that inherits from the given prototype object.
// If additional properties are provided then they will be added to the
// created object.
function create(prototype, props) {
  var result = (0,_baseCreate_js__WEBPACK_IMPORTED_MODULE_0__.default)(prototype);
  if (props) (0,_extendOwn_js__WEBPACK_IMPORTED_MODULE_1__.default)(result, props);
  return result;
}


/***/ }),

/***/ "./node_modules/underscore/modules/debounce.js":
/*!*****************************************************!*\
  !*** ./node_modules/underscore/modules/debounce.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ debounce)
/* harmony export */ });
/* harmony import */ var _restArguments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./restArguments.js */ "./node_modules/underscore/modules/restArguments.js");
/* harmony import */ var _delay_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./delay.js */ "./node_modules/underscore/modules/delay.js");



// When a sequence of calls of the returned function ends, the argument
// function is triggered. The end of a sequence is defined by the `wait`
// parameter. If `immediate` is passed, the argument function will be
// triggered at the beginning of the sequence instead of at the end.
function debounce(func, wait, immediate) {
  var timeout, result;

  var later = function(context, args) {
    timeout = null;
    if (args) result = func.apply(context, args);
  };

  var debounced = (0,_restArguments_js__WEBPACK_IMPORTED_MODULE_0__.default)(function(args) {
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(this, args);
    } else {
      timeout = (0,_delay_js__WEBPACK_IMPORTED_MODULE_1__.default)(later, wait, this, args);
    }

    return result;
  });

  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}


/***/ }),

/***/ "./node_modules/underscore/modules/defaults.js":
/*!*****************************************************!*\
  !*** ./node_modules/underscore/modules/defaults.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createAssigner_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_createAssigner.js */ "./node_modules/underscore/modules/_createAssigner.js");
/* harmony import */ var _allKeys_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./allKeys.js */ "./node_modules/underscore/modules/allKeys.js");



// Fill in a given object with default properties.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_createAssigner_js__WEBPACK_IMPORTED_MODULE_0__.default)(_allKeys_js__WEBPACK_IMPORTED_MODULE_1__.default, true));


/***/ }),

/***/ "./node_modules/underscore/modules/defer.js":
/*!**************************************************!*\
  !*** ./node_modules/underscore/modules/defer.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _partial_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./partial.js */ "./node_modules/underscore/modules/partial.js");
/* harmony import */ var _delay_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./delay.js */ "./node_modules/underscore/modules/delay.js");
/* harmony import */ var _underscore_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./underscore.js */ "./node_modules/underscore/modules/underscore.js");




// Defers a function, scheduling it to run after the current call stack has
// cleared.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_partial_js__WEBPACK_IMPORTED_MODULE_0__.default)(_delay_js__WEBPACK_IMPORTED_MODULE_1__.default, _underscore_js__WEBPACK_IMPORTED_MODULE_2__.default, 1));


/***/ }),

/***/ "./node_modules/underscore/modules/delay.js":
/*!**************************************************!*\
  !*** ./node_modules/underscore/modules/delay.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _restArguments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./restArguments.js */ "./node_modules/underscore/modules/restArguments.js");


// Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_restArguments_js__WEBPACK_IMPORTED_MODULE_0__.default)(function(func, wait, args) {
  return setTimeout(function() {
    return func.apply(null, args);
  }, wait);
}));


/***/ }),

/***/ "./node_modules/underscore/modules/difference.js":
/*!*******************************************************!*\
  !*** ./node_modules/underscore/modules/difference.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _restArguments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./restArguments.js */ "./node_modules/underscore/modules/restArguments.js");
/* harmony import */ var _flatten_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_flatten.js */ "./node_modules/underscore/modules/_flatten.js");
/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./filter.js */ "./node_modules/underscore/modules/filter.js");
/* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contains.js */ "./node_modules/underscore/modules/contains.js");





// Take the difference between one array and a number of other arrays.
// Only the elements present in just the first array will remain.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_restArguments_js__WEBPACK_IMPORTED_MODULE_0__.default)(function(array, rest) {
  rest = (0,_flatten_js__WEBPACK_IMPORTED_MODULE_1__.default)(rest, true, true);
  return (0,_filter_js__WEBPACK_IMPORTED_MODULE_2__.default)(array, function(value){
    return !(0,_contains_js__WEBPACK_IMPORTED_MODULE_3__.default)(rest, value);
  });
}));


/***/ }),

/***/ "./node_modules/underscore/modules/each.js":
/*!*************************************************!*\
  !*** ./node_modules/underscore/modules/each.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ each)
/* harmony export */ });
/* harmony import */ var _optimizeCb_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_optimizeCb.js */ "./node_modules/underscore/modules/_optimizeCb.js");
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_isArrayLike.js */ "./node_modules/underscore/modules/_isArrayLike.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keys.js */ "./node_modules/underscore/modules/keys.js");




// The cornerstone for collection functions, an `each`
// implementation, aka `forEach`.
// Handles raw objects in addition to array-likes. Treats all
// sparse array-likes as if they were dense.
function each(obj, iteratee, context) {
  iteratee = (0,_optimizeCb_js__WEBPACK_IMPORTED_MODULE_0__.default)(iteratee, context);
  var i, length;
  if ((0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_1__.default)(obj)) {
    for (i = 0, length = obj.length; i < length; i++) {
      iteratee(obj[i], i, obj);
    }
  } else {
    var _keys = (0,_keys_js__WEBPACK_IMPORTED_MODULE_2__.default)(obj);
    for (i = 0, length = _keys.length; i < length; i++) {
      iteratee(obj[_keys[i]], _keys[i], obj);
    }
  }
  return obj;
}


/***/ }),

/***/ "./node_modules/underscore/modules/escape.js":
/*!***************************************************!*\
  !*** ./node_modules/underscore/modules/escape.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createEscaper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_createEscaper.js */ "./node_modules/underscore/modules/_createEscaper.js");
/* harmony import */ var _escapeMap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_escapeMap.js */ "./node_modules/underscore/modules/_escapeMap.js");



// Function for escaping strings to HTML interpolation.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_createEscaper_js__WEBPACK_IMPORTED_MODULE_0__.default)(_escapeMap_js__WEBPACK_IMPORTED_MODULE_1__.default));


/***/ }),

/***/ "./node_modules/underscore/modules/every.js":
/*!**************************************************!*\
  !*** ./node_modules/underscore/modules/every.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ every)
/* harmony export */ });
/* harmony import */ var _cb_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_cb.js */ "./node_modules/underscore/modules/_cb.js");
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_isArrayLike.js */ "./node_modules/underscore/modules/_isArrayLike.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keys.js */ "./node_modules/underscore/modules/keys.js");




// Determine whether all of the elements pass a truth test.
function every(obj, predicate, context) {
  predicate = (0,_cb_js__WEBPACK_IMPORTED_MODULE_0__.default)(predicate, context);
  var _keys = !(0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_1__.default)(obj) && (0,_keys_js__WEBPACK_IMPORTED_MODULE_2__.default)(obj),
      length = (_keys || obj).length;
  for (var index = 0; index < length; index++) {
    var currentKey = _keys ? _keys[index] : index;
    if (!predicate(obj[currentKey], currentKey, obj)) return false;
  }
  return true;
}


/***/ }),

/***/ "./node_modules/underscore/modules/extend.js":
/*!***************************************************!*\
  !*** ./node_modules/underscore/modules/extend.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createAssigner_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_createAssigner.js */ "./node_modules/underscore/modules/_createAssigner.js");
/* harmony import */ var _allKeys_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./allKeys.js */ "./node_modules/underscore/modules/allKeys.js");



// Extend a given object with all the properties in passed-in object(s).
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_createAssigner_js__WEBPACK_IMPORTED_MODULE_0__.default)(_allKeys_js__WEBPACK_IMPORTED_MODULE_1__.default));


/***/ }),

/***/ "./node_modules/underscore/modules/extendOwn.js":
/*!******************************************************!*\
  !*** ./node_modules/underscore/modules/extendOwn.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createAssigner_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_createAssigner.js */ "./node_modules/underscore/modules/_createAssigner.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keys.js */ "./node_modules/underscore/modules/keys.js");



// Assigns a given object with all the own properties in the passed-in
// object(s).
// (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_createAssigner_js__WEBPACK_IMPORTED_MODULE_0__.default)(_keys_js__WEBPACK_IMPORTED_MODULE_1__.default));


/***/ }),

/***/ "./node_modules/underscore/modules/filter.js":
/*!***************************************************!*\
  !*** ./node_modules/underscore/modules/filter.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ filter)
/* harmony export */ });
/* harmony import */ var _cb_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_cb.js */ "./node_modules/underscore/modules/_cb.js");
/* harmony import */ var _each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./each.js */ "./node_modules/underscore/modules/each.js");



// Return all the elements that pass a truth test.
function filter(obj, predicate, context) {
  var results = [];
  predicate = (0,_cb_js__WEBPACK_IMPORTED_MODULE_0__.default)(predicate, context);
  (0,_each_js__WEBPACK_IMPORTED_MODULE_1__.default)(obj, function(value, index, list) {
    if (predicate(value, index, list)) results.push(value);
  });
  return results;
}


/***/ }),

/***/ "./node_modules/underscore/modules/find.js":
/*!*************************************************!*\
  !*** ./node_modules/underscore/modules/find.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ find)
/* harmony export */ });
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isArrayLike.js */ "./node_modules/underscore/modules/_isArrayLike.js");
/* harmony import */ var _findIndex_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./findIndex.js */ "./node_modules/underscore/modules/findIndex.js");
/* harmony import */ var _findKey_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./findKey.js */ "./node_modules/underscore/modules/findKey.js");




// Return the first value which passes a truth test.
function find(obj, predicate, context) {
  var keyFinder = (0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__.default)(obj) ? _findIndex_js__WEBPACK_IMPORTED_MODULE_1__.default : _findKey_js__WEBPACK_IMPORTED_MODULE_2__.default;
  var key = keyFinder(obj, predicate, context);
  if (key !== void 0 && key !== -1) return obj[key];
}


/***/ }),

/***/ "./node_modules/underscore/modules/findIndex.js":
/*!******************************************************!*\
  !*** ./node_modules/underscore/modules/findIndex.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createPredicateIndexFinder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_createPredicateIndexFinder.js */ "./node_modules/underscore/modules/_createPredicateIndexFinder.js");


// Returns the first index on an array-like that passes a truth test.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_createPredicateIndexFinder_js__WEBPACK_IMPORTED_MODULE_0__.default)(1));


/***/ }),

/***/ "./node_modules/underscore/modules/findKey.js":
/*!****************************************************!*\
  !*** ./node_modules/underscore/modules/findKey.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ findKey)
/* harmony export */ });
/* harmony import */ var _cb_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_cb.js */ "./node_modules/underscore/modules/_cb.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keys.js */ "./node_modules/underscore/modules/keys.js");



// Returns the first key on an object that passes a truth test.
function findKey(obj, predicate, context) {
  predicate = (0,_cb_js__WEBPACK_IMPORTED_MODULE_0__.default)(predicate, context);
  var _keys = (0,_keys_js__WEBPACK_IMPORTED_MODULE_1__.default)(obj), key;
  for (var i = 0, length = _keys.length; i < length; i++) {
    key = _keys[i];
    if (predicate(obj[key], key, obj)) return key;
  }
}


/***/ }),

/***/ "./node_modules/underscore/modules/findLastIndex.js":
/*!**********************************************************!*\
  !*** ./node_modules/underscore/modules/findLastIndex.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createPredicateIndexFinder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_createPredicateIndexFinder.js */ "./node_modules/underscore/modules/_createPredicateIndexFinder.js");


// Returns the last index on an array-like that passes a truth test.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_createPredicateIndexFinder_js__WEBPACK_IMPORTED_MODULE_0__.default)(-1));


/***/ }),

/***/ "./node_modules/underscore/modules/findWhere.js":
/*!******************************************************!*\
  !*** ./node_modules/underscore/modules/findWhere.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ findWhere)
/* harmony export */ });
/* harmony import */ var _find_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./find.js */ "./node_modules/underscore/modules/find.js");
/* harmony import */ var _matcher_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./matcher.js */ "./node_modules/underscore/modules/matcher.js");



// Convenience version of a common use case of `_.find`: getting the first
// object containing specific `key:value` pairs.
function findWhere(obj, attrs) {
  return (0,_find_js__WEBPACK_IMPORTED_MODULE_0__.default)(obj, (0,_matcher_js__WEBPACK_IMPORTED_MODULE_1__.default)(attrs));
}


/***/ }),

/***/ "./node_modules/underscore/modules/first.js":
/*!**************************************************!*\
  !*** ./node_modules/underscore/modules/first.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ first)
/* harmony export */ });
/* harmony import */ var _initial_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initial.js */ "./node_modules/underscore/modules/initial.js");


// Get the first element of an array. Passing **n** will return the first N
// values in the array. The **guard** check allows it to work with `_.map`.
function first(array, n, guard) {
  if (array == null || array.length < 1) return n == null || guard ? void 0 : [];
  if (n == null || guard) return array[0];
  return (0,_initial_js__WEBPACK_IMPORTED_MODULE_0__.default)(array, array.length - n);
}


/***/ }),

/***/ "./node_modules/underscore/modules/flatten.js":
/*!****************************************************!*\
  !*** ./node_modules/underscore/modules/flatten.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ flatten)
/* harmony export */ });
/* harmony import */ var _flatten_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_flatten.js */ "./node_modules/underscore/modules/_flatten.js");


// Flatten out an array, either recursively (by default), or up to `depth`.
// Passing `true` or `false` as `depth` means `1` or `Infinity`, respectively.
function flatten(array, depth) {
  return (0,_flatten_js__WEBPACK_IMPORTED_MODULE_0__.default)(array, depth, false);
}


/***/ }),

/***/ "./node_modules/underscore/modules/functions.js":
/*!******************************************************!*\
  !*** ./node_modules/underscore/modules/functions.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ functions)
/* harmony export */ });
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction.js */ "./node_modules/underscore/modules/isFunction.js");


// Return a sorted list of the function names available on the object.
function functions(obj) {
  var names = [];
  for (var key in obj) {
    if ((0,_isFunction_js__WEBPACK_IMPORTED_MODULE_0__.default)(obj[key])) names.push(key);
  }
  return names.sort();
}


/***/ }),

/***/ "./node_modules/underscore/modules/get.js":
/*!************************************************!*\
  !*** ./node_modules/underscore/modules/get.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ get)
/* harmony export */ });
/* harmony import */ var _toPath_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_toPath.js */ "./node_modules/underscore/modules/_toPath.js");
/* harmony import */ var _deepGet_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_deepGet.js */ "./node_modules/underscore/modules/_deepGet.js");
/* harmony import */ var _isUndefined_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isUndefined.js */ "./node_modules/underscore/modules/isUndefined.js");




// Get the value of the (deep) property on `path` from `object`.
// If any property in `path` does not exist or if the value is
// `undefined`, return `defaultValue` instead.
// The `path` is normalized through `_.toPath`.
function get(object, path, defaultValue) {
  var value = (0,_deepGet_js__WEBPACK_IMPORTED_MODULE_1__.default)(object, (0,_toPath_js__WEBPACK_IMPORTED_MODULE_0__.default)(path));
  return (0,_isUndefined_js__WEBPACK_IMPORTED_MODULE_2__.default)(value) ? defaultValue : value;
}


/***/ }),

/***/ "./node_modules/underscore/modules/groupBy.js":
/*!****************************************************!*\
  !*** ./node_modules/underscore/modules/groupBy.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _group_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_group.js */ "./node_modules/underscore/modules/_group.js");
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_has.js */ "./node_modules/underscore/modules/_has.js");



// Groups the object's values by a criterion. Pass either a string attribute
// to group by, or a function that returns the criterion.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_group_js__WEBPACK_IMPORTED_MODULE_0__.default)(function(result, value, key) {
  if ((0,_has_js__WEBPACK_IMPORTED_MODULE_1__.default)(result, key)) result[key].push(value); else result[key] = [value];
}));


/***/ }),

/***/ "./node_modules/underscore/modules/has.js":
/*!************************************************!*\
  !*** ./node_modules/underscore/modules/has.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ has)
/* harmony export */ });
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_has.js */ "./node_modules/underscore/modules/_has.js");
/* harmony import */ var _toPath_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_toPath.js */ "./node_modules/underscore/modules/_toPath.js");



// Shortcut function for checking if an object has a given property directly on
// itself (in other words, not on a prototype). Unlike the internal `has`
// function, this public version can also traverse nested properties.
function has(obj, path) {
  path = (0,_toPath_js__WEBPACK_IMPORTED_MODULE_1__.default)(path);
  var length = path.length;
  for (var i = 0; i < length; i++) {
    var key = path[i];
    if (!(0,_has_js__WEBPACK_IMPORTED_MODULE_0__.default)(obj, key)) return false;
    obj = obj[key];
  }
  return !!length;
}


/***/ }),

/***/ "./node_modules/underscore/modules/identity.js":
/*!*****************************************************!*\
  !*** ./node_modules/underscore/modules/identity.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ identity)
/* harmony export */ });
// Keep the identity function around for default iteratees.
function identity(value) {
  return value;
}


/***/ }),

/***/ "./node_modules/underscore/modules/index-all.js":
/*!******************************************************!*\
  !*** ./node_modules/underscore/modules/index-all.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _index_default_js__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "VERSION": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.VERSION),
/* harmony export */   "after": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.after),
/* harmony export */   "all": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.all),
/* harmony export */   "allKeys": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.allKeys),
/* harmony export */   "any": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.any),
/* harmony export */   "assign": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.assign),
/* harmony export */   "before": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.before),
/* harmony export */   "bind": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.bind),
/* harmony export */   "bindAll": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.bindAll),
/* harmony export */   "chain": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.chain),
/* harmony export */   "chunk": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.chunk),
/* harmony export */   "clone": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.clone),
/* harmony export */   "collect": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.collect),
/* harmony export */   "compact": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.compact),
/* harmony export */   "compose": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.compose),
/* harmony export */   "constant": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.constant),
/* harmony export */   "contains": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.contains),
/* harmony export */   "countBy": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.countBy),
/* harmony export */   "create": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.create),
/* harmony export */   "debounce": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.debounce),
/* harmony export */   "defaults": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.defaults),
/* harmony export */   "defer": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.defer),
/* harmony export */   "delay": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.delay),
/* harmony export */   "detect": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.detect),
/* harmony export */   "difference": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.difference),
/* harmony export */   "drop": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.drop),
/* harmony export */   "each": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.each),
/* harmony export */   "escape": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.escape),
/* harmony export */   "every": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.every),
/* harmony export */   "extend": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.extend),
/* harmony export */   "extendOwn": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.extendOwn),
/* harmony export */   "filter": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.filter),
/* harmony export */   "find": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.find),
/* harmony export */   "findIndex": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.findIndex),
/* harmony export */   "findKey": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.findKey),
/* harmony export */   "findLastIndex": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.findLastIndex),
/* harmony export */   "findWhere": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.findWhere),
/* harmony export */   "first": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.first),
/* harmony export */   "flatten": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.flatten),
/* harmony export */   "foldl": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.foldl),
/* harmony export */   "foldr": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.foldr),
/* harmony export */   "forEach": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.forEach),
/* harmony export */   "functions": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.functions),
/* harmony export */   "get": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.get),
/* harmony export */   "groupBy": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.groupBy),
/* harmony export */   "has": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.has),
/* harmony export */   "head": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.head),
/* harmony export */   "identity": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.identity),
/* harmony export */   "include": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.include),
/* harmony export */   "includes": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.includes),
/* harmony export */   "indexBy": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.indexBy),
/* harmony export */   "indexOf": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.indexOf),
/* harmony export */   "initial": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.initial),
/* harmony export */   "inject": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.inject),
/* harmony export */   "intersection": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.intersection),
/* harmony export */   "invert": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.invert),
/* harmony export */   "invoke": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.invoke),
/* harmony export */   "isArguments": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.isArguments),
/* harmony export */   "isArray": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.isArray),
/* harmony export */   "isArrayBuffer": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.isArrayBuffer),
/* harmony export */   "isBoolean": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.isBoolean),
/* harmony export */   "isDataView": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.isDataView),
/* harmony export */   "isDate": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.isDate),
/* harmony export */   "isElement": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.isElement),
/* harmony export */   "isEmpty": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.isEmpty),
/* harmony export */   "isEqual": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.isEqual),
/* harmony export */   "isError": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.isError),
/* harmony export */   "isFinite": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.isFinite),
/* harmony export */   "isFunction": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.isFunction),
/* harmony export */   "isMap": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.isMap),
/* harmony export */   "isMatch": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.isMatch),
/* harmony export */   "isNaN": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.isNaN),
/* harmony export */   "isNull": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.isNull),
/* harmony export */   "isNumber": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.isNumber),
/* harmony export */   "isObject": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.isObject),
/* harmony export */   "isRegExp": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.isRegExp),
/* harmony export */   "isSet": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.isSet),
/* harmony export */   "isString": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.isString),
/* harmony export */   "isSymbol": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.isSymbol),
/* harmony export */   "isTypedArray": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.isTypedArray),
/* harmony export */   "isUndefined": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.isUndefined),
/* harmony export */   "isWeakMap": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.isWeakMap),
/* harmony export */   "isWeakSet": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.isWeakSet),
/* harmony export */   "iteratee": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.iteratee),
/* harmony export */   "keys": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.keys),
/* harmony export */   "last": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.last),
/* harmony export */   "lastIndexOf": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.lastIndexOf),
/* harmony export */   "map": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.map),
/* harmony export */   "mapObject": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.mapObject),
/* harmony export */   "matcher": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.matcher),
/* harmony export */   "matches": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.matches),
/* harmony export */   "max": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.max),
/* harmony export */   "memoize": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.memoize),
/* harmony export */   "methods": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.methods),
/* harmony export */   "min": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.min),
/* harmony export */   "mixin": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.mixin),
/* harmony export */   "negate": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.negate),
/* harmony export */   "noop": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.noop),
/* harmony export */   "now": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.now),
/* harmony export */   "object": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.object),
/* harmony export */   "omit": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.omit),
/* harmony export */   "once": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.once),
/* harmony export */   "pairs": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.pairs),
/* harmony export */   "partial": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.partial),
/* harmony export */   "partition": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.partition),
/* harmony export */   "pick": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.pick),
/* harmony export */   "pluck": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.pluck),
/* harmony export */   "property": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.property),
/* harmony export */   "propertyOf": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.propertyOf),
/* harmony export */   "random": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.random),
/* harmony export */   "range": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.range),
/* harmony export */   "reduce": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.reduce),
/* harmony export */   "reduceRight": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.reduceRight),
/* harmony export */   "reject": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.reject),
/* harmony export */   "rest": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.rest),
/* harmony export */   "restArguments": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.restArguments),
/* harmony export */   "result": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.result),
/* harmony export */   "sample": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.sample),
/* harmony export */   "select": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.select),
/* harmony export */   "shuffle": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.shuffle),
/* harmony export */   "size": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.size),
/* harmony export */   "some": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.some),
/* harmony export */   "sortBy": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.sortBy),
/* harmony export */   "sortedIndex": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.sortedIndex),
/* harmony export */   "tail": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.tail),
/* harmony export */   "take": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.take),
/* harmony export */   "tap": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.tap),
/* harmony export */   "template": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.template),
/* harmony export */   "templateSettings": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.templateSettings),
/* harmony export */   "throttle": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.throttle),
/* harmony export */   "times": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.times),
/* harmony export */   "toArray": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.toArray),
/* harmony export */   "toPath": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.toPath),
/* harmony export */   "transpose": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.transpose),
/* harmony export */   "unescape": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.unescape),
/* harmony export */   "union": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.union),
/* harmony export */   "uniq": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.uniq),
/* harmony export */   "unique": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.unique),
/* harmony export */   "uniqueId": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.uniqueId),
/* harmony export */   "unzip": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.unzip),
/* harmony export */   "values": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.values),
/* harmony export */   "where": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.where),
/* harmony export */   "without": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.without),
/* harmony export */   "wrap": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.wrap),
/* harmony export */   "zip": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_1__.zip)
/* harmony export */ });
/* harmony import */ var _index_default_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-default.js */ "./node_modules/underscore/modules/index-default.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "./node_modules/underscore/modules/index.js");
// ESM Exports
// ===========
// This module is the package entry point for ES module users. In other words,
// it is the module they are interfacing with when they import from the whole
// package instead of from a submodule, like this:
//
// ```js
// import { map } from 'underscore';
// ```
//
// The difference with `./index-default`, which is the package entry point for
// CommonJS, AMD and UMD users, is purely technical. In ES modules, named and
// default exports are considered to be siblings, so when you have a default
// export, its properties are not automatically available as named exports. For
// this reason, we re-export the named exports in addition to providing the same
// default export as in `./index-default`.




/***/ }),

/***/ "./node_modules/underscore/modules/index-default.js":
/*!**********************************************************!*\
  !*** ./node_modules/underscore/modules/index-default.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/underscore/modules/index.js");
// Default Export
// ==============
// In this module, we mix our bundled exports into the `_` object and export
// the result. This is analogous to setting `module.exports = _` in CommonJS.
// Hence, this module is also the entry point of our UMD bundle and the package
// entry point for CommonJS and AMD users. In other words, this is (the source
// of) the module you are interfacing with when you do any of the following:
//
// ```js
// // CommonJS
// var _ = require('underscore');
//
// // AMD
// define(['underscore'], function(_) {...});
//
// // UMD in the browser
// // _ is available as a global variable
// ```



// Add all of the Underscore functions to the wrapper object.
var _ = (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.mixin)(_index_js__WEBPACK_IMPORTED_MODULE_0__);
// Legacy Node.js API.
_._ = _;
// Export the Underscore API.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_);


/***/ }),

/***/ "./node_modules/underscore/modules/index.js":
/*!**************************************************!*\
  !*** ./node_modules/underscore/modules/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VERSION": () => (/* reexport safe */ _setup_js__WEBPACK_IMPORTED_MODULE_0__.VERSION),
/* harmony export */   "restArguments": () => (/* reexport safe */ _restArguments_js__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "isObject": () => (/* reexport safe */ _isObject_js__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "isNull": () => (/* reexport safe */ _isNull_js__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "isUndefined": () => (/* reexport safe */ _isUndefined_js__WEBPACK_IMPORTED_MODULE_4__.default),
/* harmony export */   "isBoolean": () => (/* reexport safe */ _isBoolean_js__WEBPACK_IMPORTED_MODULE_5__.default),
/* harmony export */   "isElement": () => (/* reexport safe */ _isElement_js__WEBPACK_IMPORTED_MODULE_6__.default),
/* harmony export */   "isString": () => (/* reexport safe */ _isString_js__WEBPACK_IMPORTED_MODULE_7__.default),
/* harmony export */   "isNumber": () => (/* reexport safe */ _isNumber_js__WEBPACK_IMPORTED_MODULE_8__.default),
/* harmony export */   "isDate": () => (/* reexport safe */ _isDate_js__WEBPACK_IMPORTED_MODULE_9__.default),
/* harmony export */   "isRegExp": () => (/* reexport safe */ _isRegExp_js__WEBPACK_IMPORTED_MODULE_10__.default),
/* harmony export */   "isError": () => (/* reexport safe */ _isError_js__WEBPACK_IMPORTED_MODULE_11__.default),
/* harmony export */   "isSymbol": () => (/* reexport safe */ _isSymbol_js__WEBPACK_IMPORTED_MODULE_12__.default),
/* harmony export */   "isArrayBuffer": () => (/* reexport safe */ _isArrayBuffer_js__WEBPACK_IMPORTED_MODULE_13__.default),
/* harmony export */   "isDataView": () => (/* reexport safe */ _isDataView_js__WEBPACK_IMPORTED_MODULE_14__.default),
/* harmony export */   "isArray": () => (/* reexport safe */ _isArray_js__WEBPACK_IMPORTED_MODULE_15__.default),
/* harmony export */   "isFunction": () => (/* reexport safe */ _isFunction_js__WEBPACK_IMPORTED_MODULE_16__.default),
/* harmony export */   "isArguments": () => (/* reexport safe */ _isArguments_js__WEBPACK_IMPORTED_MODULE_17__.default),
/* harmony export */   "isFinite": () => (/* reexport safe */ _isFinite_js__WEBPACK_IMPORTED_MODULE_18__.default),
/* harmony export */   "isNaN": () => (/* reexport safe */ _isNaN_js__WEBPACK_IMPORTED_MODULE_19__.default),
/* harmony export */   "isTypedArray": () => (/* reexport safe */ _isTypedArray_js__WEBPACK_IMPORTED_MODULE_20__.default),
/* harmony export */   "isEmpty": () => (/* reexport safe */ _isEmpty_js__WEBPACK_IMPORTED_MODULE_21__.default),
/* harmony export */   "isMatch": () => (/* reexport safe */ _isMatch_js__WEBPACK_IMPORTED_MODULE_22__.default),
/* harmony export */   "isEqual": () => (/* reexport safe */ _isEqual_js__WEBPACK_IMPORTED_MODULE_23__.default),
/* harmony export */   "isMap": () => (/* reexport safe */ _isMap_js__WEBPACK_IMPORTED_MODULE_24__.default),
/* harmony export */   "isWeakMap": () => (/* reexport safe */ _isWeakMap_js__WEBPACK_IMPORTED_MODULE_25__.default),
/* harmony export */   "isSet": () => (/* reexport safe */ _isSet_js__WEBPACK_IMPORTED_MODULE_26__.default),
/* harmony export */   "isWeakSet": () => (/* reexport safe */ _isWeakSet_js__WEBPACK_IMPORTED_MODULE_27__.default),
/* harmony export */   "keys": () => (/* reexport safe */ _keys_js__WEBPACK_IMPORTED_MODULE_28__.default),
/* harmony export */   "allKeys": () => (/* reexport safe */ _allKeys_js__WEBPACK_IMPORTED_MODULE_29__.default),
/* harmony export */   "values": () => (/* reexport safe */ _values_js__WEBPACK_IMPORTED_MODULE_30__.default),
/* harmony export */   "pairs": () => (/* reexport safe */ _pairs_js__WEBPACK_IMPORTED_MODULE_31__.default),
/* harmony export */   "invert": () => (/* reexport safe */ _invert_js__WEBPACK_IMPORTED_MODULE_32__.default),
/* harmony export */   "functions": () => (/* reexport safe */ _functions_js__WEBPACK_IMPORTED_MODULE_33__.default),
/* harmony export */   "methods": () => (/* reexport safe */ _functions_js__WEBPACK_IMPORTED_MODULE_33__.default),
/* harmony export */   "extend": () => (/* reexport safe */ _extend_js__WEBPACK_IMPORTED_MODULE_34__.default),
/* harmony export */   "extendOwn": () => (/* reexport safe */ _extendOwn_js__WEBPACK_IMPORTED_MODULE_35__.default),
/* harmony export */   "assign": () => (/* reexport safe */ _extendOwn_js__WEBPACK_IMPORTED_MODULE_35__.default),
/* harmony export */   "defaults": () => (/* reexport safe */ _defaults_js__WEBPACK_IMPORTED_MODULE_36__.default),
/* harmony export */   "create": () => (/* reexport safe */ _create_js__WEBPACK_IMPORTED_MODULE_37__.default),
/* harmony export */   "clone": () => (/* reexport safe */ _clone_js__WEBPACK_IMPORTED_MODULE_38__.default),
/* harmony export */   "tap": () => (/* reexport safe */ _tap_js__WEBPACK_IMPORTED_MODULE_39__.default),
/* harmony export */   "get": () => (/* reexport safe */ _get_js__WEBPACK_IMPORTED_MODULE_40__.default),
/* harmony export */   "has": () => (/* reexport safe */ _has_js__WEBPACK_IMPORTED_MODULE_41__.default),
/* harmony export */   "mapObject": () => (/* reexport safe */ _mapObject_js__WEBPACK_IMPORTED_MODULE_42__.default),
/* harmony export */   "identity": () => (/* reexport safe */ _identity_js__WEBPACK_IMPORTED_MODULE_43__.default),
/* harmony export */   "constant": () => (/* reexport safe */ _constant_js__WEBPACK_IMPORTED_MODULE_44__.default),
/* harmony export */   "noop": () => (/* reexport safe */ _noop_js__WEBPACK_IMPORTED_MODULE_45__.default),
/* harmony export */   "toPath": () => (/* reexport safe */ _toPath_js__WEBPACK_IMPORTED_MODULE_46__.default),
/* harmony export */   "property": () => (/* reexport safe */ _property_js__WEBPACK_IMPORTED_MODULE_47__.default),
/* harmony export */   "propertyOf": () => (/* reexport safe */ _propertyOf_js__WEBPACK_IMPORTED_MODULE_48__.default),
/* harmony export */   "matcher": () => (/* reexport safe */ _matcher_js__WEBPACK_IMPORTED_MODULE_49__.default),
/* harmony export */   "matches": () => (/* reexport safe */ _matcher_js__WEBPACK_IMPORTED_MODULE_49__.default),
/* harmony export */   "times": () => (/* reexport safe */ _times_js__WEBPACK_IMPORTED_MODULE_50__.default),
/* harmony export */   "random": () => (/* reexport safe */ _random_js__WEBPACK_IMPORTED_MODULE_51__.default),
/* harmony export */   "now": () => (/* reexport safe */ _now_js__WEBPACK_IMPORTED_MODULE_52__.default),
/* harmony export */   "escape": () => (/* reexport safe */ _escape_js__WEBPACK_IMPORTED_MODULE_53__.default),
/* harmony export */   "unescape": () => (/* reexport safe */ _unescape_js__WEBPACK_IMPORTED_MODULE_54__.default),
/* harmony export */   "templateSettings": () => (/* reexport safe */ _templateSettings_js__WEBPACK_IMPORTED_MODULE_55__.default),
/* harmony export */   "template": () => (/* reexport safe */ _template_js__WEBPACK_IMPORTED_MODULE_56__.default),
/* harmony export */   "result": () => (/* reexport safe */ _result_js__WEBPACK_IMPORTED_MODULE_57__.default),
/* harmony export */   "uniqueId": () => (/* reexport safe */ _uniqueId_js__WEBPACK_IMPORTED_MODULE_58__.default),
/* harmony export */   "chain": () => (/* reexport safe */ _chain_js__WEBPACK_IMPORTED_MODULE_59__.default),
/* harmony export */   "iteratee": () => (/* reexport safe */ _iteratee_js__WEBPACK_IMPORTED_MODULE_60__.default),
/* harmony export */   "partial": () => (/* reexport safe */ _partial_js__WEBPACK_IMPORTED_MODULE_61__.default),
/* harmony export */   "bind": () => (/* reexport safe */ _bind_js__WEBPACK_IMPORTED_MODULE_62__.default),
/* harmony export */   "bindAll": () => (/* reexport safe */ _bindAll_js__WEBPACK_IMPORTED_MODULE_63__.default),
/* harmony export */   "memoize": () => (/* reexport safe */ _memoize_js__WEBPACK_IMPORTED_MODULE_64__.default),
/* harmony export */   "delay": () => (/* reexport safe */ _delay_js__WEBPACK_IMPORTED_MODULE_65__.default),
/* harmony export */   "defer": () => (/* reexport safe */ _defer_js__WEBPACK_IMPORTED_MODULE_66__.default),
/* harmony export */   "throttle": () => (/* reexport safe */ _throttle_js__WEBPACK_IMPORTED_MODULE_67__.default),
/* harmony export */   "debounce": () => (/* reexport safe */ _debounce_js__WEBPACK_IMPORTED_MODULE_68__.default),
/* harmony export */   "wrap": () => (/* reexport safe */ _wrap_js__WEBPACK_IMPORTED_MODULE_69__.default),
/* harmony export */   "negate": () => (/* reexport safe */ _negate_js__WEBPACK_IMPORTED_MODULE_70__.default),
/* harmony export */   "compose": () => (/* reexport safe */ _compose_js__WEBPACK_IMPORTED_MODULE_71__.default),
/* harmony export */   "after": () => (/* reexport safe */ _after_js__WEBPACK_IMPORTED_MODULE_72__.default),
/* harmony export */   "before": () => (/* reexport safe */ _before_js__WEBPACK_IMPORTED_MODULE_73__.default),
/* harmony export */   "once": () => (/* reexport safe */ _once_js__WEBPACK_IMPORTED_MODULE_74__.default),
/* harmony export */   "findKey": () => (/* reexport safe */ _findKey_js__WEBPACK_IMPORTED_MODULE_75__.default),
/* harmony export */   "findIndex": () => (/* reexport safe */ _findIndex_js__WEBPACK_IMPORTED_MODULE_76__.default),
/* harmony export */   "findLastIndex": () => (/* reexport safe */ _findLastIndex_js__WEBPACK_IMPORTED_MODULE_77__.default),
/* harmony export */   "sortedIndex": () => (/* reexport safe */ _sortedIndex_js__WEBPACK_IMPORTED_MODULE_78__.default),
/* harmony export */   "indexOf": () => (/* reexport safe */ _indexOf_js__WEBPACK_IMPORTED_MODULE_79__.default),
/* harmony export */   "lastIndexOf": () => (/* reexport safe */ _lastIndexOf_js__WEBPACK_IMPORTED_MODULE_80__.default),
/* harmony export */   "find": () => (/* reexport safe */ _find_js__WEBPACK_IMPORTED_MODULE_81__.default),
/* harmony export */   "detect": () => (/* reexport safe */ _find_js__WEBPACK_IMPORTED_MODULE_81__.default),
/* harmony export */   "findWhere": () => (/* reexport safe */ _findWhere_js__WEBPACK_IMPORTED_MODULE_82__.default),
/* harmony export */   "each": () => (/* reexport safe */ _each_js__WEBPACK_IMPORTED_MODULE_83__.default),
/* harmony export */   "forEach": () => (/* reexport safe */ _each_js__WEBPACK_IMPORTED_MODULE_83__.default),
/* harmony export */   "map": () => (/* reexport safe */ _map_js__WEBPACK_IMPORTED_MODULE_84__.default),
/* harmony export */   "collect": () => (/* reexport safe */ _map_js__WEBPACK_IMPORTED_MODULE_84__.default),
/* harmony export */   "reduce": () => (/* reexport safe */ _reduce_js__WEBPACK_IMPORTED_MODULE_85__.default),
/* harmony export */   "foldl": () => (/* reexport safe */ _reduce_js__WEBPACK_IMPORTED_MODULE_85__.default),
/* harmony export */   "inject": () => (/* reexport safe */ _reduce_js__WEBPACK_IMPORTED_MODULE_85__.default),
/* harmony export */   "reduceRight": () => (/* reexport safe */ _reduceRight_js__WEBPACK_IMPORTED_MODULE_86__.default),
/* harmony export */   "foldr": () => (/* reexport safe */ _reduceRight_js__WEBPACK_IMPORTED_MODULE_86__.default),
/* harmony export */   "filter": () => (/* reexport safe */ _filter_js__WEBPACK_IMPORTED_MODULE_87__.default),
/* harmony export */   "select": () => (/* reexport safe */ _filter_js__WEBPACK_IMPORTED_MODULE_87__.default),
/* harmony export */   "reject": () => (/* reexport safe */ _reject_js__WEBPACK_IMPORTED_MODULE_88__.default),
/* harmony export */   "every": () => (/* reexport safe */ _every_js__WEBPACK_IMPORTED_MODULE_89__.default),
/* harmony export */   "all": () => (/* reexport safe */ _every_js__WEBPACK_IMPORTED_MODULE_89__.default),
/* harmony export */   "some": () => (/* reexport safe */ _some_js__WEBPACK_IMPORTED_MODULE_90__.default),
/* harmony export */   "any": () => (/* reexport safe */ _some_js__WEBPACK_IMPORTED_MODULE_90__.default),
/* harmony export */   "contains": () => (/* reexport safe */ _contains_js__WEBPACK_IMPORTED_MODULE_91__.default),
/* harmony export */   "includes": () => (/* reexport safe */ _contains_js__WEBPACK_IMPORTED_MODULE_91__.default),
/* harmony export */   "include": () => (/* reexport safe */ _contains_js__WEBPACK_IMPORTED_MODULE_91__.default),
/* harmony export */   "invoke": () => (/* reexport safe */ _invoke_js__WEBPACK_IMPORTED_MODULE_92__.default),
/* harmony export */   "pluck": () => (/* reexport safe */ _pluck_js__WEBPACK_IMPORTED_MODULE_93__.default),
/* harmony export */   "where": () => (/* reexport safe */ _where_js__WEBPACK_IMPORTED_MODULE_94__.default),
/* harmony export */   "max": () => (/* reexport safe */ _max_js__WEBPACK_IMPORTED_MODULE_95__.default),
/* harmony export */   "min": () => (/* reexport safe */ _min_js__WEBPACK_IMPORTED_MODULE_96__.default),
/* harmony export */   "shuffle": () => (/* reexport safe */ _shuffle_js__WEBPACK_IMPORTED_MODULE_97__.default),
/* harmony export */   "sample": () => (/* reexport safe */ _sample_js__WEBPACK_IMPORTED_MODULE_98__.default),
/* harmony export */   "sortBy": () => (/* reexport safe */ _sortBy_js__WEBPACK_IMPORTED_MODULE_99__.default),
/* harmony export */   "groupBy": () => (/* reexport safe */ _groupBy_js__WEBPACK_IMPORTED_MODULE_100__.default),
/* harmony export */   "indexBy": () => (/* reexport safe */ _indexBy_js__WEBPACK_IMPORTED_MODULE_101__.default),
/* harmony export */   "countBy": () => (/* reexport safe */ _countBy_js__WEBPACK_IMPORTED_MODULE_102__.default),
/* harmony export */   "partition": () => (/* reexport safe */ _partition_js__WEBPACK_IMPORTED_MODULE_103__.default),
/* harmony export */   "toArray": () => (/* reexport safe */ _toArray_js__WEBPACK_IMPORTED_MODULE_104__.default),
/* harmony export */   "size": () => (/* reexport safe */ _size_js__WEBPACK_IMPORTED_MODULE_105__.default),
/* harmony export */   "pick": () => (/* reexport safe */ _pick_js__WEBPACK_IMPORTED_MODULE_106__.default),
/* harmony export */   "omit": () => (/* reexport safe */ _omit_js__WEBPACK_IMPORTED_MODULE_107__.default),
/* harmony export */   "first": () => (/* reexport safe */ _first_js__WEBPACK_IMPORTED_MODULE_108__.default),
/* harmony export */   "head": () => (/* reexport safe */ _first_js__WEBPACK_IMPORTED_MODULE_108__.default),
/* harmony export */   "take": () => (/* reexport safe */ _first_js__WEBPACK_IMPORTED_MODULE_108__.default),
/* harmony export */   "initial": () => (/* reexport safe */ _initial_js__WEBPACK_IMPORTED_MODULE_109__.default),
/* harmony export */   "last": () => (/* reexport safe */ _last_js__WEBPACK_IMPORTED_MODULE_110__.default),
/* harmony export */   "rest": () => (/* reexport safe */ _rest_js__WEBPACK_IMPORTED_MODULE_111__.default),
/* harmony export */   "tail": () => (/* reexport safe */ _rest_js__WEBPACK_IMPORTED_MODULE_111__.default),
/* harmony export */   "drop": () => (/* reexport safe */ _rest_js__WEBPACK_IMPORTED_MODULE_111__.default),
/* harmony export */   "compact": () => (/* reexport safe */ _compact_js__WEBPACK_IMPORTED_MODULE_112__.default),
/* harmony export */   "flatten": () => (/* reexport safe */ _flatten_js__WEBPACK_IMPORTED_MODULE_113__.default),
/* harmony export */   "without": () => (/* reexport safe */ _without_js__WEBPACK_IMPORTED_MODULE_114__.default),
/* harmony export */   "uniq": () => (/* reexport safe */ _uniq_js__WEBPACK_IMPORTED_MODULE_115__.default),
/* harmony export */   "unique": () => (/* reexport safe */ _uniq_js__WEBPACK_IMPORTED_MODULE_115__.default),
/* harmony export */   "union": () => (/* reexport safe */ _union_js__WEBPACK_IMPORTED_MODULE_116__.default),
/* harmony export */   "intersection": () => (/* reexport safe */ _intersection_js__WEBPACK_IMPORTED_MODULE_117__.default),
/* harmony export */   "difference": () => (/* reexport safe */ _difference_js__WEBPACK_IMPORTED_MODULE_118__.default),
/* harmony export */   "unzip": () => (/* reexport safe */ _unzip_js__WEBPACK_IMPORTED_MODULE_119__.default),
/* harmony export */   "transpose": () => (/* reexport safe */ _unzip_js__WEBPACK_IMPORTED_MODULE_119__.default),
/* harmony export */   "zip": () => (/* reexport safe */ _zip_js__WEBPACK_IMPORTED_MODULE_120__.default),
/* harmony export */   "object": () => (/* reexport safe */ _object_js__WEBPACK_IMPORTED_MODULE_121__.default),
/* harmony export */   "range": () => (/* reexport safe */ _range_js__WEBPACK_IMPORTED_MODULE_122__.default),
/* harmony export */   "chunk": () => (/* reexport safe */ _chunk_js__WEBPACK_IMPORTED_MODULE_123__.default),
/* harmony export */   "mixin": () => (/* reexport safe */ _mixin_js__WEBPACK_IMPORTED_MODULE_124__.default),
/* harmony export */   "default": () => (/* reexport safe */ _underscore_array_methods_js__WEBPACK_IMPORTED_MODULE_125__.default)
/* harmony export */ });
/* harmony import */ var _setup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_setup.js */ "./node_modules/underscore/modules/_setup.js");
/* harmony import */ var _restArguments_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./restArguments.js */ "./node_modules/underscore/modules/restArguments.js");
/* harmony import */ var _isObject_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isObject.js */ "./node_modules/underscore/modules/isObject.js");
/* harmony import */ var _isNull_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isNull.js */ "./node_modules/underscore/modules/isNull.js");
/* harmony import */ var _isUndefined_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./isUndefined.js */ "./node_modules/underscore/modules/isUndefined.js");
/* harmony import */ var _isBoolean_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./isBoolean.js */ "./node_modules/underscore/modules/isBoolean.js");
/* harmony import */ var _isElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./isElement.js */ "./node_modules/underscore/modules/isElement.js");
/* harmony import */ var _isString_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./isString.js */ "./node_modules/underscore/modules/isString.js");
/* harmony import */ var _isNumber_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./isNumber.js */ "./node_modules/underscore/modules/isNumber.js");
/* harmony import */ var _isDate_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./isDate.js */ "./node_modules/underscore/modules/isDate.js");
/* harmony import */ var _isRegExp_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./isRegExp.js */ "./node_modules/underscore/modules/isRegExp.js");
/* harmony import */ var _isError_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./isError.js */ "./node_modules/underscore/modules/isError.js");
/* harmony import */ var _isSymbol_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./isSymbol.js */ "./node_modules/underscore/modules/isSymbol.js");
/* harmony import */ var _isArrayBuffer_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./isArrayBuffer.js */ "./node_modules/underscore/modules/isArrayBuffer.js");
/* harmony import */ var _isDataView_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./isDataView.js */ "./node_modules/underscore/modules/isDataView.js");
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./isArray.js */ "./node_modules/underscore/modules/isArray.js");
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./isFunction.js */ "./node_modules/underscore/modules/isFunction.js");
/* harmony import */ var _isArguments_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./isArguments.js */ "./node_modules/underscore/modules/isArguments.js");
/* harmony import */ var _isFinite_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./isFinite.js */ "./node_modules/underscore/modules/isFinite.js");
/* harmony import */ var _isNaN_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./isNaN.js */ "./node_modules/underscore/modules/isNaN.js");
/* harmony import */ var _isTypedArray_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./isTypedArray.js */ "./node_modules/underscore/modules/isTypedArray.js");
/* harmony import */ var _isEmpty_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./isEmpty.js */ "./node_modules/underscore/modules/isEmpty.js");
/* harmony import */ var _isMatch_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./isMatch.js */ "./node_modules/underscore/modules/isMatch.js");
/* harmony import */ var _isEqual_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./isEqual.js */ "./node_modules/underscore/modules/isEqual.js");
/* harmony import */ var _isMap_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./isMap.js */ "./node_modules/underscore/modules/isMap.js");
/* harmony import */ var _isWeakMap_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./isWeakMap.js */ "./node_modules/underscore/modules/isWeakMap.js");
/* harmony import */ var _isSet_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./isSet.js */ "./node_modules/underscore/modules/isSet.js");
/* harmony import */ var _isWeakSet_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./isWeakSet.js */ "./node_modules/underscore/modules/isWeakSet.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./keys.js */ "./node_modules/underscore/modules/keys.js");
/* harmony import */ var _allKeys_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./allKeys.js */ "./node_modules/underscore/modules/allKeys.js");
/* harmony import */ var _values_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./values.js */ "./node_modules/underscore/modules/values.js");
/* harmony import */ var _pairs_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./pairs.js */ "./node_modules/underscore/modules/pairs.js");
/* harmony import */ var _invert_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./invert.js */ "./node_modules/underscore/modules/invert.js");
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./functions.js */ "./node_modules/underscore/modules/functions.js");
/* harmony import */ var _extend_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./extend.js */ "./node_modules/underscore/modules/extend.js");
/* harmony import */ var _extendOwn_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./extendOwn.js */ "./node_modules/underscore/modules/extendOwn.js");
/* harmony import */ var _defaults_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./defaults.js */ "./node_modules/underscore/modules/defaults.js");
/* harmony import */ var _create_js__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./create.js */ "./node_modules/underscore/modules/create.js");
/* harmony import */ var _clone_js__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./clone.js */ "./node_modules/underscore/modules/clone.js");
/* harmony import */ var _tap_js__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./tap.js */ "./node_modules/underscore/modules/tap.js");
/* harmony import */ var _get_js__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./get.js */ "./node_modules/underscore/modules/get.js");
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./has.js */ "./node_modules/underscore/modules/has.js");
/* harmony import */ var _mapObject_js__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./mapObject.js */ "./node_modules/underscore/modules/mapObject.js");
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./identity.js */ "./node_modules/underscore/modules/identity.js");
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./constant.js */ "./node_modules/underscore/modules/constant.js");
/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./noop.js */ "./node_modules/underscore/modules/noop.js");
/* harmony import */ var _toPath_js__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./toPath.js */ "./node_modules/underscore/modules/toPath.js");
/* harmony import */ var _property_js__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./property.js */ "./node_modules/underscore/modules/property.js");
/* harmony import */ var _propertyOf_js__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./propertyOf.js */ "./node_modules/underscore/modules/propertyOf.js");
/* harmony import */ var _matcher_js__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./matcher.js */ "./node_modules/underscore/modules/matcher.js");
/* harmony import */ var _times_js__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./times.js */ "./node_modules/underscore/modules/times.js");
/* harmony import */ var _random_js__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./random.js */ "./node_modules/underscore/modules/random.js");
/* harmony import */ var _now_js__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./now.js */ "./node_modules/underscore/modules/now.js");
/* harmony import */ var _escape_js__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./escape.js */ "./node_modules/underscore/modules/escape.js");
/* harmony import */ var _unescape_js__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./unescape.js */ "./node_modules/underscore/modules/unescape.js");
/* harmony import */ var _templateSettings_js__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./templateSettings.js */ "./node_modules/underscore/modules/templateSettings.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./template.js */ "./node_modules/underscore/modules/template.js");
/* harmony import */ var _result_js__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./result.js */ "./node_modules/underscore/modules/result.js");
/* harmony import */ var _uniqueId_js__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./uniqueId.js */ "./node_modules/underscore/modules/uniqueId.js");
/* harmony import */ var _chain_js__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./chain.js */ "./node_modules/underscore/modules/chain.js");
/* harmony import */ var _iteratee_js__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./iteratee.js */ "./node_modules/underscore/modules/iteratee.js");
/* harmony import */ var _partial_js__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./partial.js */ "./node_modules/underscore/modules/partial.js");
/* harmony import */ var _bind_js__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./bind.js */ "./node_modules/underscore/modules/bind.js");
/* harmony import */ var _bindAll_js__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./bindAll.js */ "./node_modules/underscore/modules/bindAll.js");
/* harmony import */ var _memoize_js__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./memoize.js */ "./node_modules/underscore/modules/memoize.js");
/* harmony import */ var _delay_js__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./delay.js */ "./node_modules/underscore/modules/delay.js");
/* harmony import */ var _defer_js__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./defer.js */ "./node_modules/underscore/modules/defer.js");
/* harmony import */ var _throttle_js__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./throttle.js */ "./node_modules/underscore/modules/throttle.js");
/* harmony import */ var _debounce_js__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./debounce.js */ "./node_modules/underscore/modules/debounce.js");
/* harmony import */ var _wrap_js__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./wrap.js */ "./node_modules/underscore/modules/wrap.js");
/* harmony import */ var _negate_js__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./negate.js */ "./node_modules/underscore/modules/negate.js");
/* harmony import */ var _compose_js__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./compose.js */ "./node_modules/underscore/modules/compose.js");
/* harmony import */ var _after_js__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./after.js */ "./node_modules/underscore/modules/after.js");
/* harmony import */ var _before_js__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./before.js */ "./node_modules/underscore/modules/before.js");
/* harmony import */ var _once_js__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./once.js */ "./node_modules/underscore/modules/once.js");
/* harmony import */ var _findKey_js__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./findKey.js */ "./node_modules/underscore/modules/findKey.js");
/* harmony import */ var _findIndex_js__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./findIndex.js */ "./node_modules/underscore/modules/findIndex.js");
/* harmony import */ var _findLastIndex_js__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./findLastIndex.js */ "./node_modules/underscore/modules/findLastIndex.js");
/* harmony import */ var _sortedIndex_js__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./sortedIndex.js */ "./node_modules/underscore/modules/sortedIndex.js");
/* harmony import */ var _indexOf_js__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ./indexOf.js */ "./node_modules/underscore/modules/indexOf.js");
/* harmony import */ var _lastIndexOf_js__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ./lastIndexOf.js */ "./node_modules/underscore/modules/lastIndexOf.js");
/* harmony import */ var _find_js__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./find.js */ "./node_modules/underscore/modules/find.js");
/* harmony import */ var _findWhere_js__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./findWhere.js */ "./node_modules/underscore/modules/findWhere.js");
/* harmony import */ var _each_js__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ./each.js */ "./node_modules/underscore/modules/each.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(/*! ./map.js */ "./node_modules/underscore/modules/map.js");
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(/*! ./reduce.js */ "./node_modules/underscore/modules/reduce.js");
/* harmony import */ var _reduceRight_js__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(/*! ./reduceRight.js */ "./node_modules/underscore/modules/reduceRight.js");
/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(/*! ./filter.js */ "./node_modules/underscore/modules/filter.js");
/* harmony import */ var _reject_js__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(/*! ./reject.js */ "./node_modules/underscore/modules/reject.js");
/* harmony import */ var _every_js__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__(/*! ./every.js */ "./node_modules/underscore/modules/every.js");
/* harmony import */ var _some_js__WEBPACK_IMPORTED_MODULE_90__ = __webpack_require__(/*! ./some.js */ "./node_modules/underscore/modules/some.js");
/* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_91__ = __webpack_require__(/*! ./contains.js */ "./node_modules/underscore/modules/contains.js");
/* harmony import */ var _invoke_js__WEBPACK_IMPORTED_MODULE_92__ = __webpack_require__(/*! ./invoke.js */ "./node_modules/underscore/modules/invoke.js");
/* harmony import */ var _pluck_js__WEBPACK_IMPORTED_MODULE_93__ = __webpack_require__(/*! ./pluck.js */ "./node_modules/underscore/modules/pluck.js");
/* harmony import */ var _where_js__WEBPACK_IMPORTED_MODULE_94__ = __webpack_require__(/*! ./where.js */ "./node_modules/underscore/modules/where.js");
/* harmony import */ var _max_js__WEBPACK_IMPORTED_MODULE_95__ = __webpack_require__(/*! ./max.js */ "./node_modules/underscore/modules/max.js");
/* harmony import */ var _min_js__WEBPACK_IMPORTED_MODULE_96__ = __webpack_require__(/*! ./min.js */ "./node_modules/underscore/modules/min.js");
/* harmony import */ var _shuffle_js__WEBPACK_IMPORTED_MODULE_97__ = __webpack_require__(/*! ./shuffle.js */ "./node_modules/underscore/modules/shuffle.js");
/* harmony import */ var _sample_js__WEBPACK_IMPORTED_MODULE_98__ = __webpack_require__(/*! ./sample.js */ "./node_modules/underscore/modules/sample.js");
/* harmony import */ var _sortBy_js__WEBPACK_IMPORTED_MODULE_99__ = __webpack_require__(/*! ./sortBy.js */ "./node_modules/underscore/modules/sortBy.js");
/* harmony import */ var _groupBy_js__WEBPACK_IMPORTED_MODULE_100__ = __webpack_require__(/*! ./groupBy.js */ "./node_modules/underscore/modules/groupBy.js");
/* harmony import */ var _indexBy_js__WEBPACK_IMPORTED_MODULE_101__ = __webpack_require__(/*! ./indexBy.js */ "./node_modules/underscore/modules/indexBy.js");
/* harmony import */ var _countBy_js__WEBPACK_IMPORTED_MODULE_102__ = __webpack_require__(/*! ./countBy.js */ "./node_modules/underscore/modules/countBy.js");
/* harmony import */ var _partition_js__WEBPACK_IMPORTED_MODULE_103__ = __webpack_require__(/*! ./partition.js */ "./node_modules/underscore/modules/partition.js");
/* harmony import */ var _toArray_js__WEBPACK_IMPORTED_MODULE_104__ = __webpack_require__(/*! ./toArray.js */ "./node_modules/underscore/modules/toArray.js");
/* harmony import */ var _size_js__WEBPACK_IMPORTED_MODULE_105__ = __webpack_require__(/*! ./size.js */ "./node_modules/underscore/modules/size.js");
/* harmony import */ var _pick_js__WEBPACK_IMPORTED_MODULE_106__ = __webpack_require__(/*! ./pick.js */ "./node_modules/underscore/modules/pick.js");
/* harmony import */ var _omit_js__WEBPACK_IMPORTED_MODULE_107__ = __webpack_require__(/*! ./omit.js */ "./node_modules/underscore/modules/omit.js");
/* harmony import */ var _first_js__WEBPACK_IMPORTED_MODULE_108__ = __webpack_require__(/*! ./first.js */ "./node_modules/underscore/modules/first.js");
/* harmony import */ var _initial_js__WEBPACK_IMPORTED_MODULE_109__ = __webpack_require__(/*! ./initial.js */ "./node_modules/underscore/modules/initial.js");
/* harmony import */ var _last_js__WEBPACK_IMPORTED_MODULE_110__ = __webpack_require__(/*! ./last.js */ "./node_modules/underscore/modules/last.js");
/* harmony import */ var _rest_js__WEBPACK_IMPORTED_MODULE_111__ = __webpack_require__(/*! ./rest.js */ "./node_modules/underscore/modules/rest.js");
/* harmony import */ var _compact_js__WEBPACK_IMPORTED_MODULE_112__ = __webpack_require__(/*! ./compact.js */ "./node_modules/underscore/modules/compact.js");
/* harmony import */ var _flatten_js__WEBPACK_IMPORTED_MODULE_113__ = __webpack_require__(/*! ./flatten.js */ "./node_modules/underscore/modules/flatten.js");
/* harmony import */ var _without_js__WEBPACK_IMPORTED_MODULE_114__ = __webpack_require__(/*! ./without.js */ "./node_modules/underscore/modules/without.js");
/* harmony import */ var _uniq_js__WEBPACK_IMPORTED_MODULE_115__ = __webpack_require__(/*! ./uniq.js */ "./node_modules/underscore/modules/uniq.js");
/* harmony import */ var _union_js__WEBPACK_IMPORTED_MODULE_116__ = __webpack_require__(/*! ./union.js */ "./node_modules/underscore/modules/union.js");
/* harmony import */ var _intersection_js__WEBPACK_IMPORTED_MODULE_117__ = __webpack_require__(/*! ./intersection.js */ "./node_modules/underscore/modules/intersection.js");
/* harmony import */ var _difference_js__WEBPACK_IMPORTED_MODULE_118__ = __webpack_require__(/*! ./difference.js */ "./node_modules/underscore/modules/difference.js");
/* harmony import */ var _unzip_js__WEBPACK_IMPORTED_MODULE_119__ = __webpack_require__(/*! ./unzip.js */ "./node_modules/underscore/modules/unzip.js");
/* harmony import */ var _zip_js__WEBPACK_IMPORTED_MODULE_120__ = __webpack_require__(/*! ./zip.js */ "./node_modules/underscore/modules/zip.js");
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_121__ = __webpack_require__(/*! ./object.js */ "./node_modules/underscore/modules/object.js");
/* harmony import */ var _range_js__WEBPACK_IMPORTED_MODULE_122__ = __webpack_require__(/*! ./range.js */ "./node_modules/underscore/modules/range.js");
/* harmony import */ var _chunk_js__WEBPACK_IMPORTED_MODULE_123__ = __webpack_require__(/*! ./chunk.js */ "./node_modules/underscore/modules/chunk.js");
/* harmony import */ var _mixin_js__WEBPACK_IMPORTED_MODULE_124__ = __webpack_require__(/*! ./mixin.js */ "./node_modules/underscore/modules/mixin.js");
/* harmony import */ var _underscore_array_methods_js__WEBPACK_IMPORTED_MODULE_125__ = __webpack_require__(/*! ./underscore-array-methods.js */ "./node_modules/underscore/modules/underscore-array-methods.js");
// Named Exports
// =============

//     Underscore.js 1.12.0
//     https://underscorejs.org
//     (c) 2009-2020 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

// Baseline setup.



// Object Functions
// ----------------
// Our most fundamental functions operate on any JavaScript object.
// Most functions in Underscore depend on at least one function in this section.

// A group of functions that check the types of core JavaScript values.
// These are often informally referred to as the "isType" functions.



























// Functions that treat an object as a dictionary of key-value pairs.
















// Utility Functions
// -----------------
// A bit of a grab bag: Predicate-generating functions for use with filters and
// loops, string escaping and templating, create random numbers and unique ids,
// and functions that facilitate Underscore's chaining and iteration conventions.



















// Function (ahem) Functions
// -------------------------
// These functions take a function as an argument and return a new function
// as the result. Also known as higher-order functions.















// Finders
// -------
// Functions that extract (the position of) a single element from an object
// or array based on some criterion.









// Collection Functions
// --------------------
// Functions that work on any collection of elements: either an array, or
// an object of key-value pairs.
























// `_.pick` and `_.omit` are actually object functions, but we put
// them here in order to create a more natural reading order in the
// monolithic build as they depend on `_.contains`.



// Array Functions
// ---------------
// Functions that operate on arrays (and array-likes) only, because they’re
// expressed in terms of operations on an ordered list of values.

















// OOP
// ---
// These modules support the "object-oriented" calling style. See also
// `underscore.js` and `index-default.js`.




/***/ }),

/***/ "./node_modules/underscore/modules/indexBy.js":
/*!****************************************************!*\
  !*** ./node_modules/underscore/modules/indexBy.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _group_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_group.js */ "./node_modules/underscore/modules/_group.js");


// Indexes the object's values by a criterion, similar to `_.groupBy`, but for
// when you know that your index values will be unique.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_group_js__WEBPACK_IMPORTED_MODULE_0__.default)(function(result, value, key) {
  result[key] = value;
}));


/***/ }),

/***/ "./node_modules/underscore/modules/indexOf.js":
/*!****************************************************!*\
  !*** ./node_modules/underscore/modules/indexOf.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _sortedIndex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sortedIndex.js */ "./node_modules/underscore/modules/sortedIndex.js");
/* harmony import */ var _findIndex_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./findIndex.js */ "./node_modules/underscore/modules/findIndex.js");
/* harmony import */ var _createIndexFinder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_createIndexFinder.js */ "./node_modules/underscore/modules/_createIndexFinder.js");




// Return the position of the first occurrence of an item in an array,
// or -1 if the item is not included in the array.
// If the array is large and already in sort order, pass `true`
// for **isSorted** to use binary search.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_createIndexFinder_js__WEBPACK_IMPORTED_MODULE_2__.default)(1, _findIndex_js__WEBPACK_IMPORTED_MODULE_1__.default, _sortedIndex_js__WEBPACK_IMPORTED_MODULE_0__.default));


/***/ }),

/***/ "./node_modules/underscore/modules/initial.js":
/*!****************************************************!*\
  !*** ./node_modules/underscore/modules/initial.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initial)
/* harmony export */ });
/* harmony import */ var _setup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_setup.js */ "./node_modules/underscore/modules/_setup.js");


// Returns everything but the last entry of the array. Especially useful on
// the arguments object. Passing **n** will return all the values in
// the array, excluding the last N.
function initial(array, n, guard) {
  return _setup_js__WEBPACK_IMPORTED_MODULE_0__.slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
}


/***/ }),

/***/ "./node_modules/underscore/modules/intersection.js":
/*!*********************************************************!*\
  !*** ./node_modules/underscore/modules/intersection.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ intersection)
/* harmony export */ });
/* harmony import */ var _getLength_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_getLength.js */ "./node_modules/underscore/modules/_getLength.js");
/* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contains.js */ "./node_modules/underscore/modules/contains.js");



// Produce an array that contains every item shared between all the
// passed-in arrays.
function intersection(array) {
  var result = [];
  var argsLength = arguments.length;
  for (var i = 0, length = (0,_getLength_js__WEBPACK_IMPORTED_MODULE_0__.default)(array); i < length; i++) {
    var item = array[i];
    if ((0,_contains_js__WEBPACK_IMPORTED_MODULE_1__.default)(result, item)) continue;
    var j;
    for (j = 1; j < argsLength; j++) {
      if (!(0,_contains_js__WEBPACK_IMPORTED_MODULE_1__.default)(arguments[j], item)) break;
    }
    if (j === argsLength) result.push(item);
  }
  return result;
}


/***/ }),

/***/ "./node_modules/underscore/modules/invert.js":
/*!***************************************************!*\
  !*** ./node_modules/underscore/modules/invert.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ invert)
/* harmony export */ });
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keys.js */ "./node_modules/underscore/modules/keys.js");


// Invert the keys and values of an object. The values must be serializable.
function invert(obj) {
  var result = {};
  var _keys = (0,_keys_js__WEBPACK_IMPORTED_MODULE_0__.default)(obj);
  for (var i = 0, length = _keys.length; i < length; i++) {
    result[obj[_keys[i]]] = _keys[i];
  }
  return result;
}


/***/ }),

/***/ "./node_modules/underscore/modules/invoke.js":
/*!***************************************************!*\
  !*** ./node_modules/underscore/modules/invoke.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _restArguments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./restArguments.js */ "./node_modules/underscore/modules/restArguments.js");
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isFunction.js */ "./node_modules/underscore/modules/isFunction.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map.js */ "./node_modules/underscore/modules/map.js");
/* harmony import */ var _deepGet_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_deepGet.js */ "./node_modules/underscore/modules/_deepGet.js");
/* harmony import */ var _toPath_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_toPath.js */ "./node_modules/underscore/modules/_toPath.js");






// Invoke a method (with arguments) on every item in a collection.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_restArguments_js__WEBPACK_IMPORTED_MODULE_0__.default)(function(obj, path, args) {
  var contextPath, func;
  if ((0,_isFunction_js__WEBPACK_IMPORTED_MODULE_1__.default)(path)) {
    func = path;
  } else {
    path = (0,_toPath_js__WEBPACK_IMPORTED_MODULE_4__.default)(path);
    contextPath = path.slice(0, -1);
    path = path[path.length - 1];
  }
  return (0,_map_js__WEBPACK_IMPORTED_MODULE_2__.default)(obj, function(context) {
    var method = func;
    if (!method) {
      if (contextPath && contextPath.length) {
        context = (0,_deepGet_js__WEBPACK_IMPORTED_MODULE_3__.default)(context, contextPath);
      }
      if (context == null) return void 0;
      method = context[path];
    }
    return method == null ? method : method.apply(context, args);
  });
}));


/***/ }),

/***/ "./node_modules/underscore/modules/isArguments.js":
/*!********************************************************!*\
  !*** ./node_modules/underscore/modules/isArguments.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tagTester_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_tagTester.js */ "./node_modules/underscore/modules/_tagTester.js");
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_has.js */ "./node_modules/underscore/modules/_has.js");



var isArguments = (0,_tagTester_js__WEBPACK_IMPORTED_MODULE_0__.default)('Arguments');

// Define a fallback version of the method in browsers (ahem, IE < 9), where
// there isn't any inspectable "Arguments" type.
(function() {
  if (!isArguments(arguments)) {
    isArguments = function(obj) {
      return (0,_has_js__WEBPACK_IMPORTED_MODULE_1__.default)(obj, 'callee');
    };
  }
}());

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isArguments);


/***/ }),

/***/ "./node_modules/underscore/modules/isArray.js":
/*!****************************************************!*\
  !*** ./node_modules/underscore/modules/isArray.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _setup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_setup.js */ "./node_modules/underscore/modules/_setup.js");
/* harmony import */ var _tagTester_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_tagTester.js */ "./node_modules/underscore/modules/_tagTester.js");



// Is a given value an array?
// Delegates to ECMA5's native `Array.isArray`.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_setup_js__WEBPACK_IMPORTED_MODULE_0__.nativeIsArray || (0,_tagTester_js__WEBPACK_IMPORTED_MODULE_1__.default)('Array'));


/***/ }),

/***/ "./node_modules/underscore/modules/isArrayBuffer.js":
/*!**********************************************************!*\
  !*** ./node_modules/underscore/modules/isArrayBuffer.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tagTester_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_tagTester.js */ "./node_modules/underscore/modules/_tagTester.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_tagTester_js__WEBPACK_IMPORTED_MODULE_0__.default)('ArrayBuffer'));


/***/ }),

/***/ "./node_modules/underscore/modules/isBoolean.js":
/*!******************************************************!*\
  !*** ./node_modules/underscore/modules/isBoolean.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isBoolean)
/* harmony export */ });
/* harmony import */ var _setup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_setup.js */ "./node_modules/underscore/modules/_setup.js");


// Is a given value a boolean?
function isBoolean(obj) {
  return obj === true || obj === false || _setup_js__WEBPACK_IMPORTED_MODULE_0__.toString.call(obj) === '[object Boolean]';
}


/***/ }),

/***/ "./node_modules/underscore/modules/isDataView.js":
/*!*******************************************************!*\
  !*** ./node_modules/underscore/modules/isDataView.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tagTester_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_tagTester.js */ "./node_modules/underscore/modules/_tagTester.js");
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isFunction.js */ "./node_modules/underscore/modules/isFunction.js");
/* harmony import */ var _isArrayBuffer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isArrayBuffer.js */ "./node_modules/underscore/modules/isArrayBuffer.js");
/* harmony import */ var _stringTagBug_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_stringTagBug.js */ "./node_modules/underscore/modules/_stringTagBug.js");





var isDataView = (0,_tagTester_js__WEBPACK_IMPORTED_MODULE_0__.default)('DataView');

// In IE 10 - Edge 13, we need a different heuristic
// to determine whether an object is a `DataView`.
function ie10IsDataView(obj) {
  return obj != null && (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_1__.default)(obj.getInt8) && (0,_isArrayBuffer_js__WEBPACK_IMPORTED_MODULE_2__.default)(obj.buffer);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_stringTagBug_js__WEBPACK_IMPORTED_MODULE_3__.hasStringTagBug ? ie10IsDataView : isDataView);


/***/ }),

/***/ "./node_modules/underscore/modules/isDate.js":
/*!***************************************************!*\
  !*** ./node_modules/underscore/modules/isDate.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tagTester_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_tagTester.js */ "./node_modules/underscore/modules/_tagTester.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_tagTester_js__WEBPACK_IMPORTED_MODULE_0__.default)('Date'));


/***/ }),

/***/ "./node_modules/underscore/modules/isElement.js":
/*!******************************************************!*\
  !*** ./node_modules/underscore/modules/isElement.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isElement)
/* harmony export */ });
// Is a given value a DOM element?
function isElement(obj) {
  return !!(obj && obj.nodeType === 1);
}


/***/ }),

/***/ "./node_modules/underscore/modules/isEmpty.js":
/*!****************************************************!*\
  !*** ./node_modules/underscore/modules/isEmpty.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isEmpty)
/* harmony export */ });
/* harmony import */ var _getLength_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_getLength.js */ "./node_modules/underscore/modules/_getLength.js");
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isArray.js */ "./node_modules/underscore/modules/isArray.js");
/* harmony import */ var _isString_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isString.js */ "./node_modules/underscore/modules/isString.js");
/* harmony import */ var _isArguments_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isArguments.js */ "./node_modules/underscore/modules/isArguments.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./keys.js */ "./node_modules/underscore/modules/keys.js");






// Is a given array, string, or object empty?
// An "empty" object has no enumerable own-properties.
function isEmpty(obj) {
  if (obj == null) return true;
  // Skip the more expensive `toString`-based type checks if `obj` has no
  // `.length`.
  var length = (0,_getLength_js__WEBPACK_IMPORTED_MODULE_0__.default)(obj);
  if (typeof length == 'number' && (
    (0,_isArray_js__WEBPACK_IMPORTED_MODULE_1__.default)(obj) || (0,_isString_js__WEBPACK_IMPORTED_MODULE_2__.default)(obj) || (0,_isArguments_js__WEBPACK_IMPORTED_MODULE_3__.default)(obj)
  )) return length === 0;
  return (0,_getLength_js__WEBPACK_IMPORTED_MODULE_0__.default)((0,_keys_js__WEBPACK_IMPORTED_MODULE_4__.default)(obj)) === 0;
}


/***/ }),

/***/ "./node_modules/underscore/modules/isEqual.js":
/*!****************************************************!*\
  !*** ./node_modules/underscore/modules/isEqual.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isEqual)
/* harmony export */ });
/* harmony import */ var _underscore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./underscore.js */ "./node_modules/underscore/modules/underscore.js");
/* harmony import */ var _setup_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_setup.js */ "./node_modules/underscore/modules/_setup.js");
/* harmony import */ var _getByteLength_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_getByteLength.js */ "./node_modules/underscore/modules/_getByteLength.js");
/* harmony import */ var _isTypedArray_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isTypedArray.js */ "./node_modules/underscore/modules/isTypedArray.js");
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./isFunction.js */ "./node_modules/underscore/modules/isFunction.js");
/* harmony import */ var _stringTagBug_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_stringTagBug.js */ "./node_modules/underscore/modules/_stringTagBug.js");
/* harmony import */ var _isDataView_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./isDataView.js */ "./node_modules/underscore/modules/isDataView.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./keys.js */ "./node_modules/underscore/modules/keys.js");
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./_has.js */ "./node_modules/underscore/modules/_has.js");
/* harmony import */ var _toBufferView_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./_toBufferView.js */ "./node_modules/underscore/modules/_toBufferView.js");











// We use this string twice, so give it a name for minification.
var tagDataView = '[object DataView]';

// Internal recursive comparison function for `_.isEqual`.
function eq(a, b, aStack, bStack) {
  // Identical objects are equal. `0 === -0`, but they aren't identical.
  // See the [Harmony `egal` proposal](https://wiki.ecmascript.org/doku.php?id=harmony:egal).
  if (a === b) return a !== 0 || 1 / a === 1 / b;
  // `null` or `undefined` only equal to itself (strict comparison).
  if (a == null || b == null) return false;
  // `NaN`s are equivalent, but non-reflexive.
  if (a !== a) return b !== b;
  // Exhaust primitive checks
  var type = typeof a;
  if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
  return deepEq(a, b, aStack, bStack);
}

// Internal recursive comparison function for `_.isEqual`.
function deepEq(a, b, aStack, bStack) {
  // Unwrap any wrapped objects.
  if (a instanceof _underscore_js__WEBPACK_IMPORTED_MODULE_0__.default) a = a._wrapped;
  if (b instanceof _underscore_js__WEBPACK_IMPORTED_MODULE_0__.default) b = b._wrapped;
  // Compare `[[Class]]` names.
  var className = _setup_js__WEBPACK_IMPORTED_MODULE_1__.toString.call(a);
  if (className !== _setup_js__WEBPACK_IMPORTED_MODULE_1__.toString.call(b)) return false;
  // Work around a bug in IE 10 - Edge 13.
  if (_stringTagBug_js__WEBPACK_IMPORTED_MODULE_5__.hasStringTagBug && className == '[object Object]' && (0,_isDataView_js__WEBPACK_IMPORTED_MODULE_6__.default)(a)) {
    if (!(0,_isDataView_js__WEBPACK_IMPORTED_MODULE_6__.default)(b)) return false;
    className = tagDataView;
  }
  switch (className) {
    // These types are compared by value.
    case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
    case '[object String]':
      // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
      // equivalent to `new String("5")`.
      return '' + a === '' + b;
    case '[object Number]':
      // `NaN`s are equivalent, but non-reflexive.
      // Object(NaN) is equivalent to NaN.
      if (+a !== +a) return +b !== +b;
      // An `egal` comparison is performed for other numeric values.
      return +a === 0 ? 1 / +a === 1 / b : +a === +b;
    case '[object Date]':
    case '[object Boolean]':
      // Coerce dates and booleans to numeric primitive values. Dates are compared by their
      // millisecond representations. Note that invalid dates with millisecond representations
      // of `NaN` are not equivalent.
      return +a === +b;
    case '[object Symbol]':
      return _setup_js__WEBPACK_IMPORTED_MODULE_1__.SymbolProto.valueOf.call(a) === _setup_js__WEBPACK_IMPORTED_MODULE_1__.SymbolProto.valueOf.call(b);
    case '[object ArrayBuffer]':
    case tagDataView:
      // Coerce to typed array so we can fall through.
      return deepEq((0,_toBufferView_js__WEBPACK_IMPORTED_MODULE_9__.default)(a), (0,_toBufferView_js__WEBPACK_IMPORTED_MODULE_9__.default)(b), aStack, bStack);
  }

  var areArrays = className === '[object Array]';
  if (!areArrays && (0,_isTypedArray_js__WEBPACK_IMPORTED_MODULE_3__.default)(a)) {
      var byteLength = (0,_getByteLength_js__WEBPACK_IMPORTED_MODULE_2__.default)(a);
      if (byteLength !== (0,_getByteLength_js__WEBPACK_IMPORTED_MODULE_2__.default)(b)) return false;
      if (a.buffer === b.buffer && a.byteOffset === b.byteOffset) return true;
      areArrays = true;
  }
  if (!areArrays) {
    if (typeof a != 'object' || typeof b != 'object') return false;

    // Objects with different constructors are not equivalent, but `Object`s or `Array`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !((0,_isFunction_js__WEBPACK_IMPORTED_MODULE_4__.default)(aCtor) && aCtor instanceof aCtor &&
                             (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_4__.default)(bCtor) && bCtor instanceof bCtor)
                        && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
  }
  // Assume equality for cyclic structures. The algorithm for detecting cyclic
  // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

  // Initializing stack of traversed objects.
  // It's done here since we only need them for objects and arrays comparison.
  aStack = aStack || [];
  bStack = bStack || [];
  var length = aStack.length;
  while (length--) {
    // Linear search. Performance is inversely proportional to the number of
    // unique nested structures.
    if (aStack[length] === a) return bStack[length] === b;
  }

  // Add the first object to the stack of traversed objects.
  aStack.push(a);
  bStack.push(b);

  // Recursively compare objects and arrays.
  if (areArrays) {
    // Compare array lengths to determine if a deep comparison is necessary.
    length = a.length;
    if (length !== b.length) return false;
    // Deep compare the contents, ignoring non-numeric properties.
    while (length--) {
      if (!eq(a[length], b[length], aStack, bStack)) return false;
    }
  } else {
    // Deep compare objects.
    var _keys = (0,_keys_js__WEBPACK_IMPORTED_MODULE_7__.default)(a), key;
    length = _keys.length;
    // Ensure that both objects contain the same number of properties before comparing deep equality.
    if ((0,_keys_js__WEBPACK_IMPORTED_MODULE_7__.default)(b).length !== length) return false;
    while (length--) {
      // Deep compare each member
      key = _keys[length];
      if (!((0,_has_js__WEBPACK_IMPORTED_MODULE_8__.default)(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
    }
  }
  // Remove the first object from the stack of traversed objects.
  aStack.pop();
  bStack.pop();
  return true;
}

// Perform a deep comparison to check if two objects are equal.
function isEqual(a, b) {
  return eq(a, b);
}


/***/ }),

/***/ "./node_modules/underscore/modules/isError.js":
/*!****************************************************!*\
  !*** ./node_modules/underscore/modules/isError.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tagTester_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_tagTester.js */ "./node_modules/underscore/modules/_tagTester.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_tagTester_js__WEBPACK_IMPORTED_MODULE_0__.default)('Error'));


/***/ }),

/***/ "./node_modules/underscore/modules/isFinite.js":
/*!*****************************************************!*\
  !*** ./node_modules/underscore/modules/isFinite.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isFinite)
/* harmony export */ });
/* harmony import */ var _setup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_setup.js */ "./node_modules/underscore/modules/_setup.js");
/* harmony import */ var _isSymbol_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isSymbol.js */ "./node_modules/underscore/modules/isSymbol.js");



// Is a given object a finite number?
function isFinite(obj) {
  return !(0,_isSymbol_js__WEBPACK_IMPORTED_MODULE_1__.default)(obj) && (0,_setup_js__WEBPACK_IMPORTED_MODULE_0__._isFinite)(obj) && !isNaN(parseFloat(obj));
}


/***/ }),

/***/ "./node_modules/underscore/modules/isFunction.js":
/*!*******************************************************!*\
  !*** ./node_modules/underscore/modules/isFunction.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tagTester_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_tagTester.js */ "./node_modules/underscore/modules/_tagTester.js");
/* harmony import */ var _setup_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_setup.js */ "./node_modules/underscore/modules/_setup.js");



var isFunction = (0,_tagTester_js__WEBPACK_IMPORTED_MODULE_0__.default)('Function');

// Optimize `isFunction` if appropriate. Work around some `typeof` bugs in old
// v8, IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
var nodelist = _setup_js__WEBPACK_IMPORTED_MODULE_1__.root.document && _setup_js__WEBPACK_IMPORTED_MODULE_1__.root.document.childNodes;
if ( true && typeof Int8Array != 'object' && typeof nodelist != 'function') {
  isFunction = function(obj) {
    return typeof obj == 'function' || false;
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isFunction);


/***/ }),

/***/ "./node_modules/underscore/modules/isMap.js":
/*!**************************************************!*\
  !*** ./node_modules/underscore/modules/isMap.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tagTester_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_tagTester.js */ "./node_modules/underscore/modules/_tagTester.js");
/* harmony import */ var _stringTagBug_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_stringTagBug.js */ "./node_modules/underscore/modules/_stringTagBug.js");
/* harmony import */ var _methodFingerprint_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_methodFingerprint.js */ "./node_modules/underscore/modules/_methodFingerprint.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_stringTagBug_js__WEBPACK_IMPORTED_MODULE_1__.isIE11 ? (0,_methodFingerprint_js__WEBPACK_IMPORTED_MODULE_2__.ie11fingerprint)(_methodFingerprint_js__WEBPACK_IMPORTED_MODULE_2__.mapMethods) : (0,_tagTester_js__WEBPACK_IMPORTED_MODULE_0__.default)('Map'));


/***/ }),

/***/ "./node_modules/underscore/modules/isMatch.js":
/*!****************************************************!*\
  !*** ./node_modules/underscore/modules/isMatch.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isMatch)
/* harmony export */ });
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keys.js */ "./node_modules/underscore/modules/keys.js");


// Returns whether an object has a given set of `key:value` pairs.
function isMatch(object, attrs) {
  var _keys = (0,_keys_js__WEBPACK_IMPORTED_MODULE_0__.default)(attrs), length = _keys.length;
  if (object == null) return !length;
  var obj = Object(object);
  for (var i = 0; i < length; i++) {
    var key = _keys[i];
    if (attrs[key] !== obj[key] || !(key in obj)) return false;
  }
  return true;
}


/***/ }),

/***/ "./node_modules/underscore/modules/isNaN.js":
/*!**************************************************!*\
  !*** ./node_modules/underscore/modules/isNaN.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isNaN)
/* harmony export */ });
/* harmony import */ var _setup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_setup.js */ "./node_modules/underscore/modules/_setup.js");
/* harmony import */ var _isNumber_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isNumber.js */ "./node_modules/underscore/modules/isNumber.js");



// Is the given value `NaN`?
function isNaN(obj) {
  return (0,_isNumber_js__WEBPACK_IMPORTED_MODULE_1__.default)(obj) && (0,_setup_js__WEBPACK_IMPORTED_MODULE_0__._isNaN)(obj);
}


/***/ }),

/***/ "./node_modules/underscore/modules/isNull.js":
/*!***************************************************!*\
  !*** ./node_modules/underscore/modules/isNull.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isNull)
/* harmony export */ });
// Is a given value equal to null?
function isNull(obj) {
  return obj === null;
}


/***/ }),

/***/ "./node_modules/underscore/modules/isNumber.js":
/*!*****************************************************!*\
  !*** ./node_modules/underscore/modules/isNumber.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tagTester_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_tagTester.js */ "./node_modules/underscore/modules/_tagTester.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_tagTester_js__WEBPACK_IMPORTED_MODULE_0__.default)('Number'));


/***/ }),

/***/ "./node_modules/underscore/modules/isObject.js":
/*!*****************************************************!*\
  !*** ./node_modules/underscore/modules/isObject.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isObject)
/* harmony export */ });
// Is a given variable an object?
function isObject(obj) {
  var type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
}


/***/ }),

/***/ "./node_modules/underscore/modules/isRegExp.js":
/*!*****************************************************!*\
  !*** ./node_modules/underscore/modules/isRegExp.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tagTester_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_tagTester.js */ "./node_modules/underscore/modules/_tagTester.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_tagTester_js__WEBPACK_IMPORTED_MODULE_0__.default)('RegExp'));


/***/ }),

/***/ "./node_modules/underscore/modules/isSet.js":
/*!**************************************************!*\
  !*** ./node_modules/underscore/modules/isSet.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tagTester_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_tagTester.js */ "./node_modules/underscore/modules/_tagTester.js");
/* harmony import */ var _stringTagBug_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_stringTagBug.js */ "./node_modules/underscore/modules/_stringTagBug.js");
/* harmony import */ var _methodFingerprint_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_methodFingerprint.js */ "./node_modules/underscore/modules/_methodFingerprint.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_stringTagBug_js__WEBPACK_IMPORTED_MODULE_1__.isIE11 ? (0,_methodFingerprint_js__WEBPACK_IMPORTED_MODULE_2__.ie11fingerprint)(_methodFingerprint_js__WEBPACK_IMPORTED_MODULE_2__.setMethods) : (0,_tagTester_js__WEBPACK_IMPORTED_MODULE_0__.default)('Set'));


/***/ }),

/***/ "./node_modules/underscore/modules/isString.js":
/*!*****************************************************!*\
  !*** ./node_modules/underscore/modules/isString.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tagTester_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_tagTester.js */ "./node_modules/underscore/modules/_tagTester.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_tagTester_js__WEBPACK_IMPORTED_MODULE_0__.default)('String'));


/***/ }),

/***/ "./node_modules/underscore/modules/isSymbol.js":
/*!*****************************************************!*\
  !*** ./node_modules/underscore/modules/isSymbol.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tagTester_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_tagTester.js */ "./node_modules/underscore/modules/_tagTester.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_tagTester_js__WEBPACK_IMPORTED_MODULE_0__.default)('Symbol'));


/***/ }),

/***/ "./node_modules/underscore/modules/isTypedArray.js":
/*!*********************************************************!*\
  !*** ./node_modules/underscore/modules/isTypedArray.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _setup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_setup.js */ "./node_modules/underscore/modules/_setup.js");
/* harmony import */ var _isDataView_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isDataView.js */ "./node_modules/underscore/modules/isDataView.js");
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constant.js */ "./node_modules/underscore/modules/constant.js");
/* harmony import */ var _isBufferLike_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_isBufferLike.js */ "./node_modules/underscore/modules/_isBufferLike.js");





// Is a given value a typed array?
var typedArrayPattern = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
function isTypedArray(obj) {
  // `ArrayBuffer.isView` is the most future-proof, so use it when available.
  // Otherwise, fall back on the above regular expression.
  return _setup_js__WEBPACK_IMPORTED_MODULE_0__.nativeIsView ? ((0,_setup_js__WEBPACK_IMPORTED_MODULE_0__.nativeIsView)(obj) && !(0,_isDataView_js__WEBPACK_IMPORTED_MODULE_1__.default)(obj)) :
                (0,_isBufferLike_js__WEBPACK_IMPORTED_MODULE_3__.default)(obj) && typedArrayPattern.test(_setup_js__WEBPACK_IMPORTED_MODULE_0__.toString.call(obj));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_setup_js__WEBPACK_IMPORTED_MODULE_0__.supportsArrayBuffer ? isTypedArray : (0,_constant_js__WEBPACK_IMPORTED_MODULE_2__.default)(false));


/***/ }),

/***/ "./node_modules/underscore/modules/isUndefined.js":
/*!********************************************************!*\
  !*** ./node_modules/underscore/modules/isUndefined.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isUndefined)
/* harmony export */ });
// Is a given variable undefined?
function isUndefined(obj) {
  return obj === void 0;
}


/***/ }),

/***/ "./node_modules/underscore/modules/isWeakMap.js":
/*!******************************************************!*\
  !*** ./node_modules/underscore/modules/isWeakMap.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tagTester_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_tagTester.js */ "./node_modules/underscore/modules/_tagTester.js");
/* harmony import */ var _stringTagBug_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_stringTagBug.js */ "./node_modules/underscore/modules/_stringTagBug.js");
/* harmony import */ var _methodFingerprint_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_methodFingerprint.js */ "./node_modules/underscore/modules/_methodFingerprint.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_stringTagBug_js__WEBPACK_IMPORTED_MODULE_1__.isIE11 ? (0,_methodFingerprint_js__WEBPACK_IMPORTED_MODULE_2__.ie11fingerprint)(_methodFingerprint_js__WEBPACK_IMPORTED_MODULE_2__.weakMapMethods) : (0,_tagTester_js__WEBPACK_IMPORTED_MODULE_0__.default)('WeakMap'));


/***/ }),

/***/ "./node_modules/underscore/modules/isWeakSet.js":
/*!******************************************************!*\
  !*** ./node_modules/underscore/modules/isWeakSet.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tagTester_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_tagTester.js */ "./node_modules/underscore/modules/_tagTester.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_tagTester_js__WEBPACK_IMPORTED_MODULE_0__.default)('WeakSet'));


/***/ }),

/***/ "./node_modules/underscore/modules/iteratee.js":
/*!*****************************************************!*\
  !*** ./node_modules/underscore/modules/iteratee.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ iteratee)
/* harmony export */ });
/* harmony import */ var _underscore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./underscore.js */ "./node_modules/underscore/modules/underscore.js");
/* harmony import */ var _baseIteratee_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_baseIteratee.js */ "./node_modules/underscore/modules/_baseIteratee.js");



// External wrapper for our callback generator. Users may customize
// `_.iteratee` if they want additional predicate/iteratee shorthand styles.
// This abstraction hides the internal-only `argCount` argument.
function iteratee(value, context) {
  return (0,_baseIteratee_js__WEBPACK_IMPORTED_MODULE_1__.default)(value, context, Infinity);
}
_underscore_js__WEBPACK_IMPORTED_MODULE_0__.default.iteratee = iteratee;


/***/ }),

/***/ "./node_modules/underscore/modules/keys.js":
/*!*************************************************!*\
  !*** ./node_modules/underscore/modules/keys.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ keys)
/* harmony export */ });
/* harmony import */ var _isObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isObject.js */ "./node_modules/underscore/modules/isObject.js");
/* harmony import */ var _setup_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_setup.js */ "./node_modules/underscore/modules/_setup.js");
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_has.js */ "./node_modules/underscore/modules/_has.js");
/* harmony import */ var _collectNonEnumProps_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_collectNonEnumProps.js */ "./node_modules/underscore/modules/_collectNonEnumProps.js");





// Retrieve the names of an object's own properties.
// Delegates to **ECMAScript 5**'s native `Object.keys`.
function keys(obj) {
  if (!(0,_isObject_js__WEBPACK_IMPORTED_MODULE_0__.default)(obj)) return [];
  if (_setup_js__WEBPACK_IMPORTED_MODULE_1__.nativeKeys) return (0,_setup_js__WEBPACK_IMPORTED_MODULE_1__.nativeKeys)(obj);
  var keys = [];
  for (var key in obj) if ((0,_has_js__WEBPACK_IMPORTED_MODULE_2__.default)(obj, key)) keys.push(key);
  // Ahem, IE < 9.
  if (_setup_js__WEBPACK_IMPORTED_MODULE_1__.hasEnumBug) (0,_collectNonEnumProps_js__WEBPACK_IMPORTED_MODULE_3__.default)(obj, keys);
  return keys;
}


/***/ }),

/***/ "./node_modules/underscore/modules/last.js":
/*!*************************************************!*\
  !*** ./node_modules/underscore/modules/last.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ last)
/* harmony export */ });
/* harmony import */ var _rest_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rest.js */ "./node_modules/underscore/modules/rest.js");


// Get the last element of an array. Passing **n** will return the last N
// values in the array.
function last(array, n, guard) {
  if (array == null || array.length < 1) return n == null || guard ? void 0 : [];
  if (n == null || guard) return array[array.length - 1];
  return (0,_rest_js__WEBPACK_IMPORTED_MODULE_0__.default)(array, Math.max(0, array.length - n));
}


/***/ }),

/***/ "./node_modules/underscore/modules/lastIndexOf.js":
/*!********************************************************!*\
  !*** ./node_modules/underscore/modules/lastIndexOf.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _findLastIndex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./findLastIndex.js */ "./node_modules/underscore/modules/findLastIndex.js");
/* harmony import */ var _createIndexFinder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_createIndexFinder.js */ "./node_modules/underscore/modules/_createIndexFinder.js");



// Return the position of the last occurrence of an item in an array,
// or -1 if the item is not included in the array.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_createIndexFinder_js__WEBPACK_IMPORTED_MODULE_1__.default)(-1, _findLastIndex_js__WEBPACK_IMPORTED_MODULE_0__.default));


/***/ }),

/***/ "./node_modules/underscore/modules/map.js":
/*!************************************************!*\
  !*** ./node_modules/underscore/modules/map.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ map)
/* harmony export */ });
/* harmony import */ var _cb_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_cb.js */ "./node_modules/underscore/modules/_cb.js");
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_isArrayLike.js */ "./node_modules/underscore/modules/_isArrayLike.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keys.js */ "./node_modules/underscore/modules/keys.js");




// Return the results of applying the iteratee to each element.
function map(obj, iteratee, context) {
  iteratee = (0,_cb_js__WEBPACK_IMPORTED_MODULE_0__.default)(iteratee, context);
  var _keys = !(0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_1__.default)(obj) && (0,_keys_js__WEBPACK_IMPORTED_MODULE_2__.default)(obj),
      length = (_keys || obj).length,
      results = Array(length);
  for (var index = 0; index < length; index++) {
    var currentKey = _keys ? _keys[index] : index;
    results[index] = iteratee(obj[currentKey], currentKey, obj);
  }
  return results;
}


/***/ }),

/***/ "./node_modules/underscore/modules/mapObject.js":
/*!******************************************************!*\
  !*** ./node_modules/underscore/modules/mapObject.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mapObject)
/* harmony export */ });
/* harmony import */ var _cb_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_cb.js */ "./node_modules/underscore/modules/_cb.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keys.js */ "./node_modules/underscore/modules/keys.js");



// Returns the results of applying the `iteratee` to each element of `obj`.
// In contrast to `_.map` it returns an object.
function mapObject(obj, iteratee, context) {
  iteratee = (0,_cb_js__WEBPACK_IMPORTED_MODULE_0__.default)(iteratee, context);
  var _keys = (0,_keys_js__WEBPACK_IMPORTED_MODULE_1__.default)(obj),
      length = _keys.length,
      results = {};
  for (var index = 0; index < length; index++) {
    var currentKey = _keys[index];
    results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
  }
  return results;
}


/***/ }),

/***/ "./node_modules/underscore/modules/matcher.js":
/*!****************************************************!*\
  !*** ./node_modules/underscore/modules/matcher.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ matcher)
/* harmony export */ });
/* harmony import */ var _extendOwn_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extendOwn.js */ "./node_modules/underscore/modules/extendOwn.js");
/* harmony import */ var _isMatch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isMatch.js */ "./node_modules/underscore/modules/isMatch.js");



// Returns a predicate for checking whether an object has a given set of
// `key:value` pairs.
function matcher(attrs) {
  attrs = (0,_extendOwn_js__WEBPACK_IMPORTED_MODULE_0__.default)({}, attrs);
  return function(obj) {
    return (0,_isMatch_js__WEBPACK_IMPORTED_MODULE_1__.default)(obj, attrs);
  };
}


/***/ }),

/***/ "./node_modules/underscore/modules/max.js":
/*!************************************************!*\
  !*** ./node_modules/underscore/modules/max.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ max)
/* harmony export */ });
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isArrayLike.js */ "./node_modules/underscore/modules/_isArrayLike.js");
/* harmony import */ var _values_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./values.js */ "./node_modules/underscore/modules/values.js");
/* harmony import */ var _cb_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_cb.js */ "./node_modules/underscore/modules/_cb.js");
/* harmony import */ var _each_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./each.js */ "./node_modules/underscore/modules/each.js");





// Return the maximum element (or element-based computation).
function max(obj, iteratee, context) {
  var result = -Infinity, lastComputed = -Infinity,
      value, computed;
  if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
    obj = (0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__.default)(obj) ? obj : (0,_values_js__WEBPACK_IMPORTED_MODULE_1__.default)(obj);
    for (var i = 0, length = obj.length; i < length; i++) {
      value = obj[i];
      if (value != null && value > result) {
        result = value;
      }
    }
  } else {
    iteratee = (0,_cb_js__WEBPACK_IMPORTED_MODULE_2__.default)(iteratee, context);
    (0,_each_js__WEBPACK_IMPORTED_MODULE_3__.default)(obj, function(v, index, list) {
      computed = iteratee(v, index, list);
      if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
        result = v;
        lastComputed = computed;
      }
    });
  }
  return result;
}


/***/ }),

/***/ "./node_modules/underscore/modules/memoize.js":
/*!****************************************************!*\
  !*** ./node_modules/underscore/modules/memoize.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ memoize)
/* harmony export */ });
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_has.js */ "./node_modules/underscore/modules/_has.js");


// Memoize an expensive function by storing its results.
function memoize(func, hasher) {
  var memoize = function(key) {
    var cache = memoize.cache;
    var address = '' + (hasher ? hasher.apply(this, arguments) : key);
    if (!(0,_has_js__WEBPACK_IMPORTED_MODULE_0__.default)(cache, address)) cache[address] = func.apply(this, arguments);
    return cache[address];
  };
  memoize.cache = {};
  return memoize;
}


/***/ }),

/***/ "./node_modules/underscore/modules/min.js":
/*!************************************************!*\
  !*** ./node_modules/underscore/modules/min.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ min)
/* harmony export */ });
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isArrayLike.js */ "./node_modules/underscore/modules/_isArrayLike.js");
/* harmony import */ var _values_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./values.js */ "./node_modules/underscore/modules/values.js");
/* harmony import */ var _cb_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_cb.js */ "./node_modules/underscore/modules/_cb.js");
/* harmony import */ var _each_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./each.js */ "./node_modules/underscore/modules/each.js");





// Return the minimum element (or element-based computation).
function min(obj, iteratee, context) {
  var result = Infinity, lastComputed = Infinity,
      value, computed;
  if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
    obj = (0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__.default)(obj) ? obj : (0,_values_js__WEBPACK_IMPORTED_MODULE_1__.default)(obj);
    for (var i = 0, length = obj.length; i < length; i++) {
      value = obj[i];
      if (value != null && value < result) {
        result = value;
      }
    }
  } else {
    iteratee = (0,_cb_js__WEBPACK_IMPORTED_MODULE_2__.default)(iteratee, context);
    (0,_each_js__WEBPACK_IMPORTED_MODULE_3__.default)(obj, function(v, index, list) {
      computed = iteratee(v, index, list);
      if (computed < lastComputed || computed === Infinity && result === Infinity) {
        result = v;
        lastComputed = computed;
      }
    });
  }
  return result;
}


/***/ }),

/***/ "./node_modules/underscore/modules/mixin.js":
/*!**************************************************!*\
  !*** ./node_modules/underscore/modules/mixin.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mixin)
/* harmony export */ });
/* harmony import */ var _underscore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./underscore.js */ "./node_modules/underscore/modules/underscore.js");
/* harmony import */ var _each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./each.js */ "./node_modules/underscore/modules/each.js");
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./functions.js */ "./node_modules/underscore/modules/functions.js");
/* harmony import */ var _setup_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_setup.js */ "./node_modules/underscore/modules/_setup.js");
/* harmony import */ var _chainResult_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_chainResult.js */ "./node_modules/underscore/modules/_chainResult.js");






// Add your own custom functions to the Underscore object.
function mixin(obj) {
  (0,_each_js__WEBPACK_IMPORTED_MODULE_1__.default)((0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.default)(obj), function(name) {
    var func = _underscore_js__WEBPACK_IMPORTED_MODULE_0__.default[name] = obj[name];
    _underscore_js__WEBPACK_IMPORTED_MODULE_0__.default.prototype[name] = function() {
      var args = [this._wrapped];
      _setup_js__WEBPACK_IMPORTED_MODULE_3__.push.apply(args, arguments);
      return (0,_chainResult_js__WEBPACK_IMPORTED_MODULE_4__.default)(this, func.apply(_underscore_js__WEBPACK_IMPORTED_MODULE_0__.default, args));
    };
  });
  return _underscore_js__WEBPACK_IMPORTED_MODULE_0__.default;
}


/***/ }),

/***/ "./node_modules/underscore/modules/negate.js":
/*!***************************************************!*\
  !*** ./node_modules/underscore/modules/negate.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ negate)
/* harmony export */ });
// Returns a negated version of the passed-in predicate.
function negate(predicate) {
  return function() {
    return !predicate.apply(this, arguments);
  };
}


/***/ }),

/***/ "./node_modules/underscore/modules/noop.js":
/*!*************************************************!*\
  !*** ./node_modules/underscore/modules/noop.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ noop)
/* harmony export */ });
// Predicate-generating function. Often useful outside of Underscore.
function noop(){}


/***/ }),

/***/ "./node_modules/underscore/modules/now.js":
/*!************************************************!*\
  !*** ./node_modules/underscore/modules/now.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// A (possibly faster) way to get the current timestamp as an integer.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Date.now || function() {
  return new Date().getTime();
});


/***/ }),

/***/ "./node_modules/underscore/modules/object.js":
/*!***************************************************!*\
  !*** ./node_modules/underscore/modules/object.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ object)
/* harmony export */ });
/* harmony import */ var _getLength_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_getLength.js */ "./node_modules/underscore/modules/_getLength.js");


// Converts lists into objects. Pass either a single array of `[key, value]`
// pairs, or two parallel arrays of the same length -- one of keys, and one of
// the corresponding values. Passing by pairs is the reverse of `_.pairs`.
function object(list, values) {
  var result = {};
  for (var i = 0, length = (0,_getLength_js__WEBPACK_IMPORTED_MODULE_0__.default)(list); i < length; i++) {
    if (values) {
      result[list[i]] = values[i];
    } else {
      result[list[i][0]] = list[i][1];
    }
  }
  return result;
}


/***/ }),

/***/ "./node_modules/underscore/modules/omit.js":
/*!*************************************************!*\
  !*** ./node_modules/underscore/modules/omit.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _restArguments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./restArguments.js */ "./node_modules/underscore/modules/restArguments.js");
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isFunction.js */ "./node_modules/underscore/modules/isFunction.js");
/* harmony import */ var _negate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./negate.js */ "./node_modules/underscore/modules/negate.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./map.js */ "./node_modules/underscore/modules/map.js");
/* harmony import */ var _flatten_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_flatten.js */ "./node_modules/underscore/modules/_flatten.js");
/* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./contains.js */ "./node_modules/underscore/modules/contains.js");
/* harmony import */ var _pick_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pick.js */ "./node_modules/underscore/modules/pick.js");








// Return a copy of the object without the disallowed properties.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_restArguments_js__WEBPACK_IMPORTED_MODULE_0__.default)(function(obj, keys) {
  var iteratee = keys[0], context;
  if ((0,_isFunction_js__WEBPACK_IMPORTED_MODULE_1__.default)(iteratee)) {
    iteratee = (0,_negate_js__WEBPACK_IMPORTED_MODULE_2__.default)(iteratee);
    if (keys.length > 1) context = keys[1];
  } else {
    keys = (0,_map_js__WEBPACK_IMPORTED_MODULE_3__.default)((0,_flatten_js__WEBPACK_IMPORTED_MODULE_4__.default)(keys, false, false), String);
    iteratee = function(value, key) {
      return !(0,_contains_js__WEBPACK_IMPORTED_MODULE_5__.default)(keys, key);
    };
  }
  return (0,_pick_js__WEBPACK_IMPORTED_MODULE_6__.default)(obj, iteratee, context);
}));


/***/ }),

/***/ "./node_modules/underscore/modules/once.js":
/*!*************************************************!*\
  !*** ./node_modules/underscore/modules/once.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _partial_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./partial.js */ "./node_modules/underscore/modules/partial.js");
/* harmony import */ var _before_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./before.js */ "./node_modules/underscore/modules/before.js");



// Returns a function that will be executed at most one time, no matter how
// often you call it. Useful for lazy initialization.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_partial_js__WEBPACK_IMPORTED_MODULE_0__.default)(_before_js__WEBPACK_IMPORTED_MODULE_1__.default, 2));


/***/ }),

/***/ "./node_modules/underscore/modules/pairs.js":
/*!**************************************************!*\
  !*** ./node_modules/underscore/modules/pairs.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ pairs)
/* harmony export */ });
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keys.js */ "./node_modules/underscore/modules/keys.js");


// Convert an object into a list of `[key, value]` pairs.
// The opposite of `_.object` with one argument.
function pairs(obj) {
  var _keys = (0,_keys_js__WEBPACK_IMPORTED_MODULE_0__.default)(obj);
  var length = _keys.length;
  var pairs = Array(length);
  for (var i = 0; i < length; i++) {
    pairs[i] = [_keys[i], obj[_keys[i]]];
  }
  return pairs;
}


/***/ }),

/***/ "./node_modules/underscore/modules/partial.js":
/*!****************************************************!*\
  !*** ./node_modules/underscore/modules/partial.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _restArguments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./restArguments.js */ "./node_modules/underscore/modules/restArguments.js");
/* harmony import */ var _executeBound_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_executeBound.js */ "./node_modules/underscore/modules/_executeBound.js");
/* harmony import */ var _underscore_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./underscore.js */ "./node_modules/underscore/modules/underscore.js");




// Partially apply a function by creating a version that has had some of its
// arguments pre-filled, without changing its dynamic `this` context. `_` acts
// as a placeholder by default, allowing any combination of arguments to be
// pre-filled. Set `_.partial.placeholder` for a custom placeholder argument.
var partial = (0,_restArguments_js__WEBPACK_IMPORTED_MODULE_0__.default)(function(func, boundArgs) {
  var placeholder = partial.placeholder;
  var bound = function() {
    var position = 0, length = boundArgs.length;
    var args = Array(length);
    for (var i = 0; i < length; i++) {
      args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
    }
    while (position < arguments.length) args.push(arguments[position++]);
    return (0,_executeBound_js__WEBPACK_IMPORTED_MODULE_1__.default)(func, bound, this, this, args);
  };
  return bound;
});

partial.placeholder = _underscore_js__WEBPACK_IMPORTED_MODULE_2__.default;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (partial);


/***/ }),

/***/ "./node_modules/underscore/modules/partition.js":
/*!******************************************************!*\
  !*** ./node_modules/underscore/modules/partition.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _group_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_group.js */ "./node_modules/underscore/modules/_group.js");


// Split a collection into two arrays: one whose elements all pass the given
// truth test, and one whose elements all do not pass the truth test.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_group_js__WEBPACK_IMPORTED_MODULE_0__.default)(function(result, value, pass) {
  result[pass ? 0 : 1].push(value);
}, true));


/***/ }),

/***/ "./node_modules/underscore/modules/pick.js":
/*!*************************************************!*\
  !*** ./node_modules/underscore/modules/pick.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _restArguments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./restArguments.js */ "./node_modules/underscore/modules/restArguments.js");
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isFunction.js */ "./node_modules/underscore/modules/isFunction.js");
/* harmony import */ var _optimizeCb_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_optimizeCb.js */ "./node_modules/underscore/modules/_optimizeCb.js");
/* harmony import */ var _allKeys_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./allKeys.js */ "./node_modules/underscore/modules/allKeys.js");
/* harmony import */ var _keyInObj_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_keyInObj.js */ "./node_modules/underscore/modules/_keyInObj.js");
/* harmony import */ var _flatten_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_flatten.js */ "./node_modules/underscore/modules/_flatten.js");







// Return a copy of the object only containing the allowed properties.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_restArguments_js__WEBPACK_IMPORTED_MODULE_0__.default)(function(obj, keys) {
  var result = {}, iteratee = keys[0];
  if (obj == null) return result;
  if ((0,_isFunction_js__WEBPACK_IMPORTED_MODULE_1__.default)(iteratee)) {
    if (keys.length > 1) iteratee = (0,_optimizeCb_js__WEBPACK_IMPORTED_MODULE_2__.default)(iteratee, keys[1]);
    keys = (0,_allKeys_js__WEBPACK_IMPORTED_MODULE_3__.default)(obj);
  } else {
    iteratee = _keyInObj_js__WEBPACK_IMPORTED_MODULE_4__.default;
    keys = (0,_flatten_js__WEBPACK_IMPORTED_MODULE_5__.default)(keys, false, false);
    obj = Object(obj);
  }
  for (var i = 0, length = keys.length; i < length; i++) {
    var key = keys[i];
    var value = obj[key];
    if (iteratee(value, key, obj)) result[key] = value;
  }
  return result;
}));


/***/ }),

/***/ "./node_modules/underscore/modules/pluck.js":
/*!**************************************************!*\
  !*** ./node_modules/underscore/modules/pluck.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ pluck)
/* harmony export */ });
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.js */ "./node_modules/underscore/modules/map.js");
/* harmony import */ var _property_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./property.js */ "./node_modules/underscore/modules/property.js");



// Convenience version of a common use case of `_.map`: fetching a property.
function pluck(obj, key) {
  return (0,_map_js__WEBPACK_IMPORTED_MODULE_0__.default)(obj, (0,_property_js__WEBPACK_IMPORTED_MODULE_1__.default)(key));
}


/***/ }),

/***/ "./node_modules/underscore/modules/property.js":
/*!*****************************************************!*\
  !*** ./node_modules/underscore/modules/property.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ property)
/* harmony export */ });
/* harmony import */ var _deepGet_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_deepGet.js */ "./node_modules/underscore/modules/_deepGet.js");
/* harmony import */ var _toPath_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_toPath.js */ "./node_modules/underscore/modules/_toPath.js");



// Creates a function that, when passed an object, will traverse that object’s
// properties down the given `path`, specified as an array of keys or indices.
function property(path) {
  path = (0,_toPath_js__WEBPACK_IMPORTED_MODULE_1__.default)(path);
  return function(obj) {
    return (0,_deepGet_js__WEBPACK_IMPORTED_MODULE_0__.default)(obj, path);
  };
}


/***/ }),

/***/ "./node_modules/underscore/modules/propertyOf.js":
/*!*******************************************************!*\
  !*** ./node_modules/underscore/modules/propertyOf.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ propertyOf)
/* harmony export */ });
/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./noop.js */ "./node_modules/underscore/modules/noop.js");
/* harmony import */ var _get_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get.js */ "./node_modules/underscore/modules/get.js");



// Generates a function for a given object that returns a given property.
function propertyOf(obj) {
  if (obj == null) return _noop_js__WEBPACK_IMPORTED_MODULE_0__.default;
  return function(path) {
    return (0,_get_js__WEBPACK_IMPORTED_MODULE_1__.default)(obj, path);
  };
}


/***/ }),

/***/ "./node_modules/underscore/modules/random.js":
/*!***************************************************!*\
  !*** ./node_modules/underscore/modules/random.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ random)
/* harmony export */ });
// Return a random integer between `min` and `max` (inclusive).
function random(min, max) {
  if (max == null) {
    max = min;
    min = 0;
  }
  return min + Math.floor(Math.random() * (max - min + 1));
}


/***/ }),

/***/ "./node_modules/underscore/modules/range.js":
/*!**************************************************!*\
  !*** ./node_modules/underscore/modules/range.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ range)
/* harmony export */ });
// Generate an integer Array containing an arithmetic progression. A port of
// the native Python `range()` function. See
// [the Python documentation](https://docs.python.org/library/functions.html#range).
function range(start, stop, step) {
  if (stop == null) {
    stop = start || 0;
    start = 0;
  }
  if (!step) {
    step = stop < start ? -1 : 1;
  }

  var length = Math.max(Math.ceil((stop - start) / step), 0);
  var range = Array(length);

  for (var idx = 0; idx < length; idx++, start += step) {
    range[idx] = start;
  }

  return range;
}


/***/ }),

/***/ "./node_modules/underscore/modules/reduce.js":
/*!***************************************************!*\
  !*** ./node_modules/underscore/modules/reduce.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createReduce_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_createReduce.js */ "./node_modules/underscore/modules/_createReduce.js");


// **Reduce** builds up a single result from a list of values, aka `inject`,
// or `foldl`.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_createReduce_js__WEBPACK_IMPORTED_MODULE_0__.default)(1));


/***/ }),

/***/ "./node_modules/underscore/modules/reduceRight.js":
/*!********************************************************!*\
  !*** ./node_modules/underscore/modules/reduceRight.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createReduce_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_createReduce.js */ "./node_modules/underscore/modules/_createReduce.js");


// The right-associative version of reduce, also known as `foldr`.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_createReduce_js__WEBPACK_IMPORTED_MODULE_0__.default)(-1));


/***/ }),

/***/ "./node_modules/underscore/modules/reject.js":
/*!***************************************************!*\
  !*** ./node_modules/underscore/modules/reject.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ reject)
/* harmony export */ });
/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filter.js */ "./node_modules/underscore/modules/filter.js");
/* harmony import */ var _negate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./negate.js */ "./node_modules/underscore/modules/negate.js");
/* harmony import */ var _cb_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_cb.js */ "./node_modules/underscore/modules/_cb.js");




// Return all the elements for which a truth test fails.
function reject(obj, predicate, context) {
  return (0,_filter_js__WEBPACK_IMPORTED_MODULE_0__.default)(obj, (0,_negate_js__WEBPACK_IMPORTED_MODULE_1__.default)((0,_cb_js__WEBPACK_IMPORTED_MODULE_2__.default)(predicate)), context);
}


/***/ }),

/***/ "./node_modules/underscore/modules/rest.js":
/*!*************************************************!*\
  !*** ./node_modules/underscore/modules/rest.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rest)
/* harmony export */ });
/* harmony import */ var _setup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_setup.js */ "./node_modules/underscore/modules/_setup.js");


// Returns everything but the first entry of the `array`. Especially useful on
// the `arguments` object. Passing an **n** will return the rest N values in the
// `array`.
function rest(array, n, guard) {
  return _setup_js__WEBPACK_IMPORTED_MODULE_0__.slice.call(array, n == null || guard ? 1 : n);
}


/***/ }),

/***/ "./node_modules/underscore/modules/restArguments.js":
/*!**********************************************************!*\
  !*** ./node_modules/underscore/modules/restArguments.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ restArguments)
/* harmony export */ });
// Some functions take a variable number of arguments, or a few expected
// arguments at the beginning and then a variable number of values to operate
// on. This helper accumulates all remaining arguments past the function’s
// argument length (or an explicit `startIndex`), into an array that becomes
// the last argument. Similar to ES6’s "rest parameter".
function restArguments(func, startIndex) {
  startIndex = startIndex == null ? func.length - 1 : +startIndex;
  return function() {
    var length = Math.max(arguments.length - startIndex, 0),
        rest = Array(length),
        index = 0;
    for (; index < length; index++) {
      rest[index] = arguments[index + startIndex];
    }
    switch (startIndex) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, arguments[0], rest);
      case 2: return func.call(this, arguments[0], arguments[1], rest);
    }
    var args = Array(startIndex + 1);
    for (index = 0; index < startIndex; index++) {
      args[index] = arguments[index];
    }
    args[startIndex] = rest;
    return func.apply(this, args);
  };
}


/***/ }),

/***/ "./node_modules/underscore/modules/result.js":
/*!***************************************************!*\
  !*** ./node_modules/underscore/modules/result.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ result)
/* harmony export */ });
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction.js */ "./node_modules/underscore/modules/isFunction.js");
/* harmony import */ var _toPath_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_toPath.js */ "./node_modules/underscore/modules/_toPath.js");



// Traverses the children of `obj` along `path`. If a child is a function, it
// is invoked with its parent as context. Returns the value of the final
// child, or `fallback` if any child is undefined.
function result(obj, path, fallback) {
  path = (0,_toPath_js__WEBPACK_IMPORTED_MODULE_1__.default)(path);
  var length = path.length;
  if (!length) {
    return (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_0__.default)(fallback) ? fallback.call(obj) : fallback;
  }
  for (var i = 0; i < length; i++) {
    var prop = obj == null ? void 0 : obj[path[i]];
    if (prop === void 0) {
      prop = fallback;
      i = length; // Ensure we don't continue iterating.
    }
    obj = (0,_isFunction_js__WEBPACK_IMPORTED_MODULE_0__.default)(prop) ? prop.call(obj) : prop;
  }
  return obj;
}


/***/ }),

/***/ "./node_modules/underscore/modules/sample.js":
/*!***************************************************!*\
  !*** ./node_modules/underscore/modules/sample.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ sample)
/* harmony export */ });
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isArrayLike.js */ "./node_modules/underscore/modules/_isArrayLike.js");
/* harmony import */ var _clone_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clone.js */ "./node_modules/underscore/modules/clone.js");
/* harmony import */ var _values_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./values.js */ "./node_modules/underscore/modules/values.js");
/* harmony import */ var _getLength_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_getLength.js */ "./node_modules/underscore/modules/_getLength.js");
/* harmony import */ var _random_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./random.js */ "./node_modules/underscore/modules/random.js");






// Sample **n** random values from a collection using the modern version of the
// [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
// If **n** is not specified, returns a single random element.
// The internal `guard` argument allows it to work with `_.map`.
function sample(obj, n, guard) {
  if (n == null || guard) {
    if (!(0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__.default)(obj)) obj = (0,_values_js__WEBPACK_IMPORTED_MODULE_2__.default)(obj);
    return obj[(0,_random_js__WEBPACK_IMPORTED_MODULE_4__.default)(obj.length - 1)];
  }
  var sample = (0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__.default)(obj) ? (0,_clone_js__WEBPACK_IMPORTED_MODULE_1__.default)(obj) : (0,_values_js__WEBPACK_IMPORTED_MODULE_2__.default)(obj);
  var length = (0,_getLength_js__WEBPACK_IMPORTED_MODULE_3__.default)(sample);
  n = Math.max(Math.min(n, length), 0);
  var last = length - 1;
  for (var index = 0; index < n; index++) {
    var rand = (0,_random_js__WEBPACK_IMPORTED_MODULE_4__.default)(index, last);
    var temp = sample[index];
    sample[index] = sample[rand];
    sample[rand] = temp;
  }
  return sample.slice(0, n);
}


/***/ }),

/***/ "./node_modules/underscore/modules/shuffle.js":
/*!****************************************************!*\
  !*** ./node_modules/underscore/modules/shuffle.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ shuffle)
/* harmony export */ });
/* harmony import */ var _sample_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sample.js */ "./node_modules/underscore/modules/sample.js");


// Shuffle a collection.
function shuffle(obj) {
  return (0,_sample_js__WEBPACK_IMPORTED_MODULE_0__.default)(obj, Infinity);
}


/***/ }),

/***/ "./node_modules/underscore/modules/size.js":
/*!*************************************************!*\
  !*** ./node_modules/underscore/modules/size.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ size)
/* harmony export */ });
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isArrayLike.js */ "./node_modules/underscore/modules/_isArrayLike.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keys.js */ "./node_modules/underscore/modules/keys.js");



// Return the number of elements in a collection.
function size(obj) {
  if (obj == null) return 0;
  return (0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__.default)(obj) ? obj.length : (0,_keys_js__WEBPACK_IMPORTED_MODULE_1__.default)(obj).length;
}


/***/ }),

/***/ "./node_modules/underscore/modules/some.js":
/*!*************************************************!*\
  !*** ./node_modules/underscore/modules/some.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ some)
/* harmony export */ });
/* harmony import */ var _cb_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_cb.js */ "./node_modules/underscore/modules/_cb.js");
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_isArrayLike.js */ "./node_modules/underscore/modules/_isArrayLike.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keys.js */ "./node_modules/underscore/modules/keys.js");




// Determine if at least one element in the object passes a truth test.
function some(obj, predicate, context) {
  predicate = (0,_cb_js__WEBPACK_IMPORTED_MODULE_0__.default)(predicate, context);
  var _keys = !(0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_1__.default)(obj) && (0,_keys_js__WEBPACK_IMPORTED_MODULE_2__.default)(obj),
      length = (_keys || obj).length;
  for (var index = 0; index < length; index++) {
    var currentKey = _keys ? _keys[index] : index;
    if (predicate(obj[currentKey], currentKey, obj)) return true;
  }
  return false;
}


/***/ }),

/***/ "./node_modules/underscore/modules/sortBy.js":
/*!***************************************************!*\
  !*** ./node_modules/underscore/modules/sortBy.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ sortBy)
/* harmony export */ });
/* harmony import */ var _cb_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_cb.js */ "./node_modules/underscore/modules/_cb.js");
/* harmony import */ var _pluck_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pluck.js */ "./node_modules/underscore/modules/pluck.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map.js */ "./node_modules/underscore/modules/map.js");




// Sort the object's values by a criterion produced by an iteratee.
function sortBy(obj, iteratee, context) {
  var index = 0;
  iteratee = (0,_cb_js__WEBPACK_IMPORTED_MODULE_0__.default)(iteratee, context);
  return (0,_pluck_js__WEBPACK_IMPORTED_MODULE_1__.default)((0,_map_js__WEBPACK_IMPORTED_MODULE_2__.default)(obj, function(value, key, list) {
    return {
      value: value,
      index: index++,
      criteria: iteratee(value, key, list)
    };
  }).sort(function(left, right) {
    var a = left.criteria;
    var b = right.criteria;
    if (a !== b) {
      if (a > b || a === void 0) return 1;
      if (a < b || b === void 0) return -1;
    }
    return left.index - right.index;
  }), 'value');
}


/***/ }),

/***/ "./node_modules/underscore/modules/sortedIndex.js":
/*!********************************************************!*\
  !*** ./node_modules/underscore/modules/sortedIndex.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ sortedIndex)
/* harmony export */ });
/* harmony import */ var _cb_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_cb.js */ "./node_modules/underscore/modules/_cb.js");
/* harmony import */ var _getLength_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_getLength.js */ "./node_modules/underscore/modules/_getLength.js");



// Use a comparator function to figure out the smallest index at which
// an object should be inserted so as to maintain order. Uses binary search.
function sortedIndex(array, obj, iteratee, context) {
  iteratee = (0,_cb_js__WEBPACK_IMPORTED_MODULE_0__.default)(iteratee, context, 1);
  var value = iteratee(obj);
  var low = 0, high = (0,_getLength_js__WEBPACK_IMPORTED_MODULE_1__.default)(array);
  while (low < high) {
    var mid = Math.floor((low + high) / 2);
    if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
  }
  return low;
}


/***/ }),

/***/ "./node_modules/underscore/modules/tap.js":
/*!************************************************!*\
  !*** ./node_modules/underscore/modules/tap.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ tap)
/* harmony export */ });
// Invokes `interceptor` with the `obj` and then returns `obj`.
// The primary purpose of this method is to "tap into" a method chain, in
// order to perform operations on intermediate results within the chain.
function tap(obj, interceptor) {
  interceptor(obj);
  return obj;
}


/***/ }),

/***/ "./node_modules/underscore/modules/template.js":
/*!*****************************************************!*\
  !*** ./node_modules/underscore/modules/template.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ template)
/* harmony export */ });
/* harmony import */ var _defaults_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaults.js */ "./node_modules/underscore/modules/defaults.js");
/* harmony import */ var _underscore_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./underscore.js */ "./node_modules/underscore/modules/underscore.js");
/* harmony import */ var _templateSettings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./templateSettings.js */ "./node_modules/underscore/modules/templateSettings.js");




// When customizing `_.templateSettings`, if you don't want to define an
// interpolation, evaluation or escaping regex, we need one that is
// guaranteed not to match.
var noMatch = /(.)^/;

// Certain characters need to be escaped so that they can be put into a
// string literal.
var escapes = {
  "'": "'",
  '\\': '\\',
  '\r': 'r',
  '\n': 'n',
  '\u2028': 'u2028',
  '\u2029': 'u2029'
};

var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

function escapeChar(match) {
  return '\\' + escapes[match];
}

// JavaScript micro-templating, similar to John Resig's implementation.
// Underscore templating handles arbitrary delimiters, preserves whitespace,
// and correctly escapes quotes within interpolated code.
// NB: `oldSettings` only exists for backwards compatibility.
function template(text, settings, oldSettings) {
  if (!settings && oldSettings) settings = oldSettings;
  settings = (0,_defaults_js__WEBPACK_IMPORTED_MODULE_0__.default)({}, settings, _underscore_js__WEBPACK_IMPORTED_MODULE_1__.default.templateSettings);

  // Combine delimiters into one regular expression via alternation.
  var matcher = RegExp([
    (settings.escape || noMatch).source,
    (settings.interpolate || noMatch).source,
    (settings.evaluate || noMatch).source
  ].join('|') + '|$', 'g');

  // Compile the template source, escaping string literals appropriately.
  var index = 0;
  var source = "__p+='";
  text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
    source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
    index = offset + match.length;

    if (escape) {
      source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
    } else if (interpolate) {
      source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
    } else if (evaluate) {
      source += "';\n" + evaluate + "\n__p+='";
    }

    // Adobe VMs need the match returned to produce the correct offset.
    return match;
  });
  source += "';\n";

  // If a variable is not specified, place data values in local scope.
  if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

  source = "var __t,__p='',__j=Array.prototype.join," +
    "print=function(){__p+=__j.call(arguments,'');};\n" +
    source + 'return __p;\n';

  var render;
  try {
    render = new Function(settings.variable || 'obj', '_', source);
  } catch (e) {
    e.source = source;
    throw e;
  }

  var template = function(data) {
    return render.call(this, data, _underscore_js__WEBPACK_IMPORTED_MODULE_1__.default);
  };

  // Provide the compiled source as a convenience for precompilation.
  var argument = settings.variable || 'obj';
  template.source = 'function(' + argument + '){\n' + source + '}';

  return template;
}


/***/ }),

/***/ "./node_modules/underscore/modules/templateSettings.js":
/*!*************************************************************!*\
  !*** ./node_modules/underscore/modules/templateSettings.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _underscore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./underscore.js */ "./node_modules/underscore/modules/underscore.js");


// By default, Underscore uses ERB-style template delimiters. Change the
// following template settings to use alternative delimiters.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_underscore_js__WEBPACK_IMPORTED_MODULE_0__.default.templateSettings = {
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  escape: /<%-([\s\S]+?)%>/g
});


/***/ }),

/***/ "./node_modules/underscore/modules/throttle.js":
/*!*****************************************************!*\
  !*** ./node_modules/underscore/modules/throttle.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ throttle)
/* harmony export */ });
/* harmony import */ var _now_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./now.js */ "./node_modules/underscore/modules/now.js");


// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
function throttle(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  var later = function() {
    previous = options.leading === false ? 0 : (0,_now_js__WEBPACK_IMPORTED_MODULE_0__.default)();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function() {
    var _now = (0,_now_js__WEBPACK_IMPORTED_MODULE_0__.default)();
    if (!previous && options.leading === false) previous = _now;
    var remaining = wait - (_now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = _now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
}


/***/ }),

/***/ "./node_modules/underscore/modules/times.js":
/*!**************************************************!*\
  !*** ./node_modules/underscore/modules/times.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ times)
/* harmony export */ });
/* harmony import */ var _optimizeCb_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_optimizeCb.js */ "./node_modules/underscore/modules/_optimizeCb.js");


// Run a function **n** times.
function times(n, iteratee, context) {
  var accum = Array(Math.max(0, n));
  iteratee = (0,_optimizeCb_js__WEBPACK_IMPORTED_MODULE_0__.default)(iteratee, context, 1);
  for (var i = 0; i < n; i++) accum[i] = iteratee(i);
  return accum;
}


/***/ }),

/***/ "./node_modules/underscore/modules/toArray.js":
/*!****************************************************!*\
  !*** ./node_modules/underscore/modules/toArray.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toArray)
/* harmony export */ });
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isArray.js */ "./node_modules/underscore/modules/isArray.js");
/* harmony import */ var _setup_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_setup.js */ "./node_modules/underscore/modules/_setup.js");
/* harmony import */ var _isString_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isString.js */ "./node_modules/underscore/modules/isString.js");
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_isArrayLike.js */ "./node_modules/underscore/modules/_isArrayLike.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./map.js */ "./node_modules/underscore/modules/map.js");
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./identity.js */ "./node_modules/underscore/modules/identity.js");
/* harmony import */ var _values_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./values.js */ "./node_modules/underscore/modules/values.js");








// Safely create a real, live array from anything iterable.
var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
function toArray(obj) {
  if (!obj) return [];
  if ((0,_isArray_js__WEBPACK_IMPORTED_MODULE_0__.default)(obj)) return _setup_js__WEBPACK_IMPORTED_MODULE_1__.slice.call(obj);
  if ((0,_isString_js__WEBPACK_IMPORTED_MODULE_2__.default)(obj)) {
    // Keep surrogate pair characters together.
    return obj.match(reStrSymbol);
  }
  if ((0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_3__.default)(obj)) return (0,_map_js__WEBPACK_IMPORTED_MODULE_4__.default)(obj, _identity_js__WEBPACK_IMPORTED_MODULE_5__.default);
  return (0,_values_js__WEBPACK_IMPORTED_MODULE_6__.default)(obj);
}


/***/ }),

/***/ "./node_modules/underscore/modules/toPath.js":
/*!***************************************************!*\
  !*** ./node_modules/underscore/modules/toPath.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toPath)
/* harmony export */ });
/* harmony import */ var _underscore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./underscore.js */ "./node_modules/underscore/modules/underscore.js");
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isArray.js */ "./node_modules/underscore/modules/isArray.js");



// Normalize a (deep) property `path` to array.
// Like `_.iteratee`, this function can be customized.
function toPath(path) {
  return (0,_isArray_js__WEBPACK_IMPORTED_MODULE_1__.default)(path) ? path : [path];
}
_underscore_js__WEBPACK_IMPORTED_MODULE_0__.default.toPath = toPath;


/***/ }),

/***/ "./node_modules/underscore/modules/underscore-array-methods.js":
/*!*********************************************************************!*\
  !*** ./node_modules/underscore/modules/underscore-array-methods.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _underscore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./underscore.js */ "./node_modules/underscore/modules/underscore.js");
/* harmony import */ var _each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./each.js */ "./node_modules/underscore/modules/each.js");
/* harmony import */ var _setup_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_setup.js */ "./node_modules/underscore/modules/_setup.js");
/* harmony import */ var _chainResult_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_chainResult.js */ "./node_modules/underscore/modules/_chainResult.js");





// Add all mutator `Array` functions to the wrapper.
(0,_each_js__WEBPACK_IMPORTED_MODULE_1__.default)(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
  var method = _setup_js__WEBPACK_IMPORTED_MODULE_2__.ArrayProto[name];
  _underscore_js__WEBPACK_IMPORTED_MODULE_0__.default.prototype[name] = function() {
    var obj = this._wrapped;
    if (obj != null) {
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) {
        delete obj[0];
      }
    }
    return (0,_chainResult_js__WEBPACK_IMPORTED_MODULE_3__.default)(this, obj);
  };
});

// Add all accessor `Array` functions to the wrapper.
(0,_each_js__WEBPACK_IMPORTED_MODULE_1__.default)(['concat', 'join', 'slice'], function(name) {
  var method = _setup_js__WEBPACK_IMPORTED_MODULE_2__.ArrayProto[name];
  _underscore_js__WEBPACK_IMPORTED_MODULE_0__.default.prototype[name] = function() {
    var obj = this._wrapped;
    if (obj != null) obj = method.apply(obj, arguments);
    return (0,_chainResult_js__WEBPACK_IMPORTED_MODULE_3__.default)(this, obj);
  };
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_underscore_js__WEBPACK_IMPORTED_MODULE_0__.default);


/***/ }),

/***/ "./node_modules/underscore/modules/underscore.js":
/*!*******************************************************!*\
  !*** ./node_modules/underscore/modules/underscore.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _)
/* harmony export */ });
/* harmony import */ var _setup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_setup.js */ "./node_modules/underscore/modules/_setup.js");


// If Underscore is called as a function, it returns a wrapped object that can
// be used OO-style. This wrapper holds altered versions of all functions added
// through `_.mixin`. Wrapped objects may be chained.
function _(obj) {
  if (obj instanceof _) return obj;
  if (!(this instanceof _)) return new _(obj);
  this._wrapped = obj;
}

_.VERSION = _setup_js__WEBPACK_IMPORTED_MODULE_0__.VERSION;

// Extracts the result from a wrapped and chained object.
_.prototype.value = function() {
  return this._wrapped;
};

// Provide unwrapping proxies for some methods used in engine operations
// such as arithmetic and JSON stringification.
_.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

_.prototype.toString = function() {
  return String(this._wrapped);
};


/***/ }),

/***/ "./node_modules/underscore/modules/unescape.js":
/*!*****************************************************!*\
  !*** ./node_modules/underscore/modules/unescape.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createEscaper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_createEscaper.js */ "./node_modules/underscore/modules/_createEscaper.js");
/* harmony import */ var _unescapeMap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_unescapeMap.js */ "./node_modules/underscore/modules/_unescapeMap.js");



// Function for unescaping strings from HTML interpolation.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_createEscaper_js__WEBPACK_IMPORTED_MODULE_0__.default)(_unescapeMap_js__WEBPACK_IMPORTED_MODULE_1__.default));


/***/ }),

/***/ "./node_modules/underscore/modules/union.js":
/*!**************************************************!*\
  !*** ./node_modules/underscore/modules/union.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _restArguments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./restArguments.js */ "./node_modules/underscore/modules/restArguments.js");
/* harmony import */ var _uniq_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uniq.js */ "./node_modules/underscore/modules/uniq.js");
/* harmony import */ var _flatten_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_flatten.js */ "./node_modules/underscore/modules/_flatten.js");




// Produce an array that contains the union: each distinct element from all of
// the passed-in arrays.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_restArguments_js__WEBPACK_IMPORTED_MODULE_0__.default)(function(arrays) {
  return (0,_uniq_js__WEBPACK_IMPORTED_MODULE_1__.default)((0,_flatten_js__WEBPACK_IMPORTED_MODULE_2__.default)(arrays, true, true));
}));


/***/ }),

/***/ "./node_modules/underscore/modules/uniq.js":
/*!*************************************************!*\
  !*** ./node_modules/underscore/modules/uniq.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ uniq)
/* harmony export */ });
/* harmony import */ var _isBoolean_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isBoolean.js */ "./node_modules/underscore/modules/isBoolean.js");
/* harmony import */ var _cb_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_cb.js */ "./node_modules/underscore/modules/_cb.js");
/* harmony import */ var _getLength_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_getLength.js */ "./node_modules/underscore/modules/_getLength.js");
/* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contains.js */ "./node_modules/underscore/modules/contains.js");





// Produce a duplicate-free version of the array. If the array has already
// been sorted, you have the option of using a faster algorithm.
// The faster algorithm will not work with an iteratee if the iteratee
// is not a one-to-one function, so providing an iteratee will disable
// the faster algorithm.
function uniq(array, isSorted, iteratee, context) {
  if (!(0,_isBoolean_js__WEBPACK_IMPORTED_MODULE_0__.default)(isSorted)) {
    context = iteratee;
    iteratee = isSorted;
    isSorted = false;
  }
  if (iteratee != null) iteratee = (0,_cb_js__WEBPACK_IMPORTED_MODULE_1__.default)(iteratee, context);
  var result = [];
  var seen = [];
  for (var i = 0, length = (0,_getLength_js__WEBPACK_IMPORTED_MODULE_2__.default)(array); i < length; i++) {
    var value = array[i],
        computed = iteratee ? iteratee(value, i, array) : value;
    if (isSorted && !iteratee) {
      if (!i || seen !== computed) result.push(value);
      seen = computed;
    } else if (iteratee) {
      if (!(0,_contains_js__WEBPACK_IMPORTED_MODULE_3__.default)(seen, computed)) {
        seen.push(computed);
        result.push(value);
      }
    } else if (!(0,_contains_js__WEBPACK_IMPORTED_MODULE_3__.default)(result, value)) {
      result.push(value);
    }
  }
  return result;
}


/***/ }),

/***/ "./node_modules/underscore/modules/uniqueId.js":
/*!*****************************************************!*\
  !*** ./node_modules/underscore/modules/uniqueId.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ uniqueId)
/* harmony export */ });
// Generate a unique integer id (unique within the entire client session).
// Useful for temporary DOM ids.
var idCounter = 0;
function uniqueId(prefix) {
  var id = ++idCounter + '';
  return prefix ? prefix + id : id;
}


/***/ }),

/***/ "./node_modules/underscore/modules/unzip.js":
/*!**************************************************!*\
  !*** ./node_modules/underscore/modules/unzip.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ unzip)
/* harmony export */ });
/* harmony import */ var _max_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./max.js */ "./node_modules/underscore/modules/max.js");
/* harmony import */ var _getLength_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_getLength.js */ "./node_modules/underscore/modules/_getLength.js");
/* harmony import */ var _pluck_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pluck.js */ "./node_modules/underscore/modules/pluck.js");




// Complement of zip. Unzip accepts an array of arrays and groups
// each array's elements on shared indices.
function unzip(array) {
  var length = array && (0,_max_js__WEBPACK_IMPORTED_MODULE_0__.default)(array, _getLength_js__WEBPACK_IMPORTED_MODULE_1__.default).length || 0;
  var result = Array(length);

  for (var index = 0; index < length; index++) {
    result[index] = (0,_pluck_js__WEBPACK_IMPORTED_MODULE_2__.default)(array, index);
  }
  return result;
}


/***/ }),

/***/ "./node_modules/underscore/modules/values.js":
/*!***************************************************!*\
  !*** ./node_modules/underscore/modules/values.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ values)
/* harmony export */ });
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keys.js */ "./node_modules/underscore/modules/keys.js");


// Retrieve the values of an object's properties.
function values(obj) {
  var _keys = (0,_keys_js__WEBPACK_IMPORTED_MODULE_0__.default)(obj);
  var length = _keys.length;
  var values = Array(length);
  for (var i = 0; i < length; i++) {
    values[i] = obj[_keys[i]];
  }
  return values;
}


/***/ }),

/***/ "./node_modules/underscore/modules/where.js":
/*!**************************************************!*\
  !*** ./node_modules/underscore/modules/where.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ where)
/* harmony export */ });
/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filter.js */ "./node_modules/underscore/modules/filter.js");
/* harmony import */ var _matcher_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./matcher.js */ "./node_modules/underscore/modules/matcher.js");



// Convenience version of a common use case of `_.filter`: selecting only
// objects containing specific `key:value` pairs.
function where(obj, attrs) {
  return (0,_filter_js__WEBPACK_IMPORTED_MODULE_0__.default)(obj, (0,_matcher_js__WEBPACK_IMPORTED_MODULE_1__.default)(attrs));
}


/***/ }),

/***/ "./node_modules/underscore/modules/without.js":
/*!****************************************************!*\
  !*** ./node_modules/underscore/modules/without.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _restArguments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./restArguments.js */ "./node_modules/underscore/modules/restArguments.js");
/* harmony import */ var _difference_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./difference.js */ "./node_modules/underscore/modules/difference.js");



// Return a version of the array that does not contain the specified value(s).
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_restArguments_js__WEBPACK_IMPORTED_MODULE_0__.default)(function(array, otherArrays) {
  return (0,_difference_js__WEBPACK_IMPORTED_MODULE_1__.default)(array, otherArrays);
}));


/***/ }),

/***/ "./node_modules/underscore/modules/wrap.js":
/*!*************************************************!*\
  !*** ./node_modules/underscore/modules/wrap.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ wrap)
/* harmony export */ });
/* harmony import */ var _partial_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./partial.js */ "./node_modules/underscore/modules/partial.js");


// Returns the first function passed as an argument to the second,
// allowing you to adjust arguments, run code before and after, and
// conditionally execute the original function.
function wrap(func, wrapper) {
  return (0,_partial_js__WEBPACK_IMPORTED_MODULE_0__.default)(wrapper, func);
}


/***/ }),

/***/ "./node_modules/underscore/modules/zip.js":
/*!************************************************!*\
  !*** ./node_modules/underscore/modules/zip.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _restArguments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./restArguments.js */ "./node_modules/underscore/modules/restArguments.js");
/* harmony import */ var _unzip_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./unzip.js */ "./node_modules/underscore/modules/unzip.js");



// Zip together multiple lists into a single array -- elements that share
// an index go together.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_restArguments_js__WEBPACK_IMPORTED_MODULE_0__.default)(_unzip_js__WEBPACK_IMPORTED_MODULE_1__.default));


/***/ }),

/***/ "./node_modules/websocket/lib/browser.js":
/*!***********************************************!*\
  !*** ./node_modules/websocket/lib/browser.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _globalThis;
try {
	_globalThis = __webpack_require__(/*! es5-ext/global */ "./node_modules/es5-ext/global.js");
} catch (error) {
} finally {
	if (!_globalThis && typeof window !== 'undefined') { _globalThis = window; }
	if (!_globalThis) { throw new Error('Could not determine global this'); }
}

var NativeWebSocket = _globalThis.WebSocket || _globalThis.MozWebSocket;
var websocket_version = __webpack_require__(/*! ./version */ "./node_modules/websocket/lib/version.js");


/**
 * Expose a W3C WebSocket class with just one or two arguments.
 */
function W3CWebSocket(uri, protocols) {
	var native_instance;

	if (protocols) {
		native_instance = new NativeWebSocket(uri, protocols);
	}
	else {
		native_instance = new NativeWebSocket(uri);
	}

	/**
	 * 'native_instance' is an instance of nativeWebSocket (the browser's WebSocket
	 * class). Since it is an Object it will be returned as it is when creating an
	 * instance of W3CWebSocket via 'new W3CWebSocket()'.
	 *
	 * ECMAScript 5: http://bclary.com/2004/11/07/#a-13.2.2
	 */
	return native_instance;
}
if (NativeWebSocket) {
	['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'].forEach(function(prop) {
		Object.defineProperty(W3CWebSocket, prop, {
			get: function() { return NativeWebSocket[prop]; }
		});
	});
}

/**
 * Module exports.
 */
module.exports = {
    'w3cwebsocket' : NativeWebSocket ? W3CWebSocket : null,
    'version'      : websocket_version
};


/***/ }),

/***/ "./node_modules/websocket/lib/version.js":
/*!***********************************************!*\
  !*** ./node_modules/websocket/lib/version.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ../package.json */ "./node_modules/websocket/package.json").version;


/***/ }),

/***/ "./node_modules/websocket/package.json":
/*!*********************************************!*\
  !*** ./node_modules/websocket/package.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"_args":[["websocket@1.0.33","/home/jamsmendez/Documents/Go/src/github.com/JamsMendez/SION-sw/webpack"]],"_from":"websocket@1.0.33","_id":"websocket@1.0.33","_inBundle":false,"_integrity":"sha512-XwNqM2rN5eh3G2CUQE3OHZj+0xfdH42+OFK6LdC2yqiC0YU8e5UK0nYre220T0IyyN031V/XOvtHvXozvJYFWA==","_location":"/websocket","_phantomChildren":{},"_requested":{"type":"version","registry":true,"raw":"websocket@1.0.33","name":"websocket","escapedName":"websocket","rawSpec":"1.0.33","saveSpec":null,"fetchSpec":"1.0.33"},"_requiredBy":["/"],"_resolved":"https://registry.npmjs.org/websocket/-/websocket-1.0.33.tgz","_spec":"1.0.33","_where":"/home/jamsmendez/Documents/Go/src/github.com/JamsMendez/SION-sw/webpack","author":{"name":"Brian McKelvey","email":"theturtle32@gmail.com","url":"https://github.com/theturtle32"},"browser":"lib/browser.js","bugs":{"url":"https://github.com/theturtle32/WebSocket-Node/issues"},"config":{"verbose":false},"contributors":[{"name":"Iñaki Baz Castillo","email":"ibc@aliax.net","url":"http://dev.sipdoc.net"}],"dependencies":{"bufferutil":"^4.0.1","debug":"^2.2.0","es5-ext":"^0.10.50","typedarray-to-buffer":"^3.1.5","utf-8-validate":"^5.0.2","yaeti":"^0.0.6"},"description":"Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.","devDependencies":{"buffer-equal":"^1.0.0","gulp":"^4.0.2","gulp-jshint":"^2.0.4","jshint":"^2.0.0","jshint-stylish":"^2.2.1","tape":"^4.9.1"},"directories":{"lib":"./lib"},"engines":{"node":">=4.0.0"},"homepage":"https://github.com/theturtle32/WebSocket-Node","keywords":["websocket","websockets","socket","networking","comet","push","RFC-6455","realtime","server","client"],"license":"Apache-2.0","main":"index","name":"websocket","repository":{"type":"git","url":"git+https://github.com/theturtle32/WebSocket-Node.git"},"scripts":{"gulp":"gulp","test":"tape test/unit/*.js"},"version":"1.0.33"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!************************************************!*\
  !*** ./src/matrix_module/content-multiple.jsx ***!
  \************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var async__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! async */ "./node_modules/async/dist/async.mjs");
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! underscore */ "./node_modules/underscore/modules/index-all.js");
/* harmony import */ var websocket__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! websocket */ "./node_modules/websocket/lib/browser.js");
/* harmony import */ var websocket__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(websocket__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _list_view_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./list-view.jsx */ "./src/matrix_module/list-view.jsx");
/* harmony import */ var _list_view_min_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./list-view-min.jsx */ "./src/matrix_module/list-view-min.jsx");
/* harmony import */ var _table_view_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./table-view.jsx */ "./src/matrix_module/table-view.jsx");
/* harmony import */ var _table_view_col_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./table-view-col.jsx */ "./src/matrix_module/table-view-col.jsx");
/* harmony import */ var _chart_view_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./chart-view.jsx */ "./src/matrix_module/chart-view.jsx");
/* harmony import */ var _header_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../header.jsx */ "./src/header.jsx");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./../constants.js */ "./src/constants.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }












var wsURL = "ws://".concat(URLWS, "/ws");
var wsaURL = "ws://".concat(URLWSA, "/ws");
var LIST_VIEW = 1;
var LIST_VIEW_MIN = 2;
var TABLE_VIEW = 3;
var CHART_VIEW = 4;
var TABLE_VIEW_COL = 5;

var Content = /*#__PURE__*/function (_Component) {
  _inherits(Content, _Component);

  var _super = _createSuper(Content);

  function Content(props) {
    var _this;

    _classCallCheck(this, Content);

    _this = _super.call(this, props);
    _this.state = {
      matrices_: [],
      notifications_: [],
      structures: [],
      view: TABLE_VIEW_COL,
      matrix: false,
      comment: false,
      log_alarms_view: false,
      logAlarm: false,
      variables_: [],
      footer_variables: [],
      log_alarms: [],
      matrix_sounds: [],
      active_vars: [],
      connection_errors_ws: 0,
      connection_errors_wsa: 0
    };
    return _this;
  }

  _createClass(Content, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var self = this;
      $('.modal').modal({
        dismissible: false
      });
      $('.collapsible').collapsible();
      setTimeout(function () {
        (0,async__WEBPACK_IMPORTED_MODULE_1__.parallel)({
          configuration: function configuration(fn) {
            self.getConfiguration(fn);
          },
          notifications: function notifications(fn) {
            self.getNotifications(fn);
          },
          footer_variables: function footer_variables(fn) {
            self.getFooterVariables(fn);
          },
          log_alarms: function log_alarms(fn) {
            if (SYSTEM_HOST === 'sepec.technotex.com') {
              fn();
              return;
            }

            self.getLogAlarms(fn);
          }
        }, function (err, res) {
          if (err) {
            Materialize.toast(err, 2500);
            ;
            return;
          }

          var footer_variables = res.footer_variables;
          var notifications = res.notifications;
          var configuration = res.configuration;
          var log_alarms = res.log_alarms;
          footer_variables = self.orderByOS(footer_variables, 'position', true);
          if (!configuration) configuration = [];
          self.state.matrix_sounds = configuration;
          self.getMatrices();
          if (!footer_variables) footer_variables = [];
          if (!notifications) notifications = [];
          if (!log_alarms) log_alarms = [];
          self.setState({
            footer_variables: footer_variables,
            log_alarms: log_alarms,
            notifications_: res.docs
          });
        });

        _this2.setUpCharts();

        if (window.RT === _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.RT_WS) {
          _this2.serviceWS();

          _this2.serviceWSA();
        } else if (window.RT === _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.RT_HTTP) {
          setInterval(function () {
            self.getVariableLastRecords();
            self.getComments();
            self.getNotifications();
          }, 1000 * 15);
        }
      }, 1500);

      if (SYSTEM_HOST === 'sepec.technotex.com') {
        return;
      }

      setInterval(function () {
        self.getLogAlarms();
      }, 1000 * 60 * 3);
    }
  }, {
    key: "setUpCharts",
    value: function setUpCharts() {
      Highcharts.createElement('link', {
        href: 'https://fonts.googleapis.com/css?family=Unica+One',
        rel: 'stylesheet',
        type: 'text/css'
      }, null, document.getElementsByTagName('head')[0]);

      if (CHART_THEME === _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.DARK_THEME) {
        Highcharts.theme = {
          colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
          chart: {
            backgroundColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 1,
                y2: 1
              },
              stops: [[0, '#2a2a2b'], [1, '#3e3e40']]
            },
            style: {
              fontFamily: '\'Unica One\', sans-serif'
            },
            plotBorderColor: '#606063'
          },
          title: {
            style: {
              color: '#E0E0E3',
              textTransform: 'uppercase',
              fontSize: '20px'
            }
          },
          subtitle: {
            style: {
              color: '#E0E0E3',
              textTransform: 'uppercase'
            }
          },
          xAxis: {
            gridLineColor: '#707073',
            labels: {
              style: {
                color: '#E0E0E3'
              }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            title: {
              style: {
                color: '#A0A0A3'
              }
            }
          },
          yAxis: {
            gridLineColor: '#707073',
            labels: {
              style: {
                color: '#E0E0E3'
              }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            tickWidth: 1,
            title: {
              style: {
                color: '#A0A0A3'
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            style: {
              color: '#F0F0F0'
            }
          },
          plotOptions: {
            series: {
              dataLabels: {
                color: '#B0B0B3'
              },
              marker: {
                lineColor: '#333'
              }
            },
            boxplot: {
              fillColor: '#505053'
            },
            candlestick: {
              lineColor: 'white'
            },
            errorbar: {
              color: 'white'
            }
          },
          legend: {
            itemStyle: {
              color: '#E0E0E3'
            },
            itemHoverStyle: {
              color: '#FFF'
            },
            itemHiddenStyle: {
              color: '#606063'
            }
          },
          credits: {
            style: {
              color: '#666'
            }
          },
          labels: {
            style: {
              color: '#707073'
            }
          },
          drilldown: {
            activeAxisLabelStyle: {
              color: '#F0F0F3'
            },
            activeDataLabelStyle: {
              color: '#F0F0F3'
            }
          },
          navigation: {
            buttonOptions: {
              symbolStroke: '#DDDDDD',
              theme: {
                fill: '#505053'
              }
            }
          },
          // scroll charts
          rangeSelector: {
            buttonTheme: {
              fill: '#505053',
              stroke: '#000000',
              style: {
                color: '#CCC'
              },
              states: {
                hover: {
                  fill: '#707073',
                  stroke: '#000000',
                  style: {
                    color: 'white'
                  }
                },
                select: {
                  fill: '#000003',
                  stroke: '#000000',
                  style: {
                    color: 'white'
                  }
                }
              }
            },
            inputBoxBorderColor: '#505053',
            inputStyle: {
              backgroundColor: '#333',
              color: 'silver'
            },
            labelStyle: {
              color: 'silver'
            }
          },
          navigator: {
            handles: {
              backgroundColor: '#666',
              borderColor: '#AAA'
            },
            outlineColor: '#CCC',
            maskFill: 'rgba(255,255,255,0.1)',
            series: {
              color: '#7798BF',
              lineColor: '#A6C7ED'
            },
            xAxis: {
              gridLineColor: '#505053'
            }
          },
          scrollbar: {
            barBackgroundColor: '#808083',
            barBorderColor: '#808083',
            buttonArrowColor: '#CCC',
            buttonBackgroundColor: '#606063',
            buttonBorderColor: '#606063',
            rifleColor: '#FFF',
            trackBackgroundColor: '#404043',
            trackBorderColor: '#404043'
          },
          // special colors for some of the
          legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
          background2: '#505053',
          dataLabelsColor: '#B0B0B3',
          textColor: '#C0C0C0',
          contrastTextColor: '#F0F0F3',
          maskColor: 'rgba(255,255,255,0.3)'
        }; // Apply the theme

        Highcharts.setOptions(Highcharts.theme);
      }
      /*Highcharts.setOptions({
        global: {
          useUTC: true
        }
      });*/


      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      Highcharts.setOptions({
        time: {
          timezone: tz
        }
      });
    }
    /* WS */

  }, {
    key: "serviceWS",
    value: function serviceWS() {
      var self = this;
      var v = window.sessionStorage.getItem(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.ACCESS_TOKEN_WS);
      var url = "".concat(wsURL, "?").concat(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.ACCESS_TOKEN_WS, "=").concat(v);
      this.ws = new websocket__WEBPACK_IMPORTED_MODULE_3__.w3cwebsocket(url, _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.TTX_PROTOCOOL);

      this.ws.onerror = function () {
        console.log('WS: connection Error');
      };

      this.ws.onopen = function (evt) {
        console.log('WS connected');
      };

      this.ws.onclose = function (evt) {
        console.log('WS closed');
        setTimeout(function () {
          var connection_errors = self.state.connection_errors_ws;

          if (connection_errors >= _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.LIMIT_FOR_RECONNECTION) {
            connection_errors = 0;
            self.getTokenWS();
          }

          connection_errors = connection_errors + 1;
          self.state.connection_errors_ws = connection_errors;
          self.serviceWS();
        }, 1000);
      };

      this.ws.onmessage = function (evt) {
        var s = evt.data;
        var o = {};

        try {
          o = JSON.parse(s);

          if (o.err) {
            return;
          }
        } catch (e) {
          console.log('WS.ERROR: JSON.parse: ', s);
          return;
        }

        if (!o.content) {
          console.log('WS.ERROR: Content Empty');
          return;
        }

        if (o.evt == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.EVENT_UDAPTE_VARIABLES_VALUE) {
          self.updateVariablesValueInMatrix(o.content);
          self.updateVariablesValueInFooter(o.content);
        } else if (o.evt == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.EVENT_UPDATE_VARIABLE_COMMENT) {
          self.updateVariableCommentInMatrix(o.content);
        } else if (o.evt == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.EVENT_EMPTY_UDAPTE_VARIABLES_VALUE) {
          self.emptyUpdateVariablesValueInMatrix(o.content);
        } else if (o.evt == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.EVENT_UPDATE_COMMENT_GROUP) {
          var content = [];
          if (!(0,underscore__WEBPACK_IMPORTED_MODULE_2__.isArray)(o.content)) content.push(o.content);
          self.updateGroupCommentInMatrix(content);
        }
      };
    }
  }, {
    key: "serviceWSA",
    value: function serviceWSA() {
      var self = this;
      var v = window.sessionStorage.getItem(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.ACCESS_TOKEN_WSA);
      var url = "".concat(wsaURL, "?").concat(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.ACCESS_TOKEN_WSA, "=").concat(v);
      this.wsa = new websocket__WEBPACK_IMPORTED_MODULE_3__.w3cwebsocket(url, _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.TTX_PROTOCOOL);

      this.wsa.onerror = function () {
        console.log('WSA: connection Error');
      };

      this.wsa.onopen = function (evt) {
        console.log('WSA connected');
      };

      this.wsa.onclose = function (evt) {
        console.log('WSA closed');
        setTimeout(function () {
          var connection_errors = self.state.connection_errors_wsa;

          if (connection_errors == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.LIMIT_FOR_RECONNECTION) {
            connection_errors = 0;
            self.getTokenWSA();
          }

          connection_errors = connection_errors + 1;
          self.state.connection_errors_wsa = connection_errors;
          self.serviceWSA();
        }, 1000);
      };

      this.wsa.onmessage = function (evt) {
        var s = evt.data;
        var o = {};

        try {
          o = JSON.parse(s);

          if (o.err) {
            return;
          }
        } catch (e) {
          console.log('WSA.ERROR: JSON.parse: ', s);
        }

        if (o.evt == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.EVENT_UDAPTE_VARIABLES_ALARM) {
          // Insertar in Notifications console.log(o.content);
          self.getNotifications();
        } else if (o.evt == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.EVENT_UDAPTE_ALARMS_ACTIVE) {
          self.getVariablesWithAlarms();
        } else if (o.evt == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.EVENT_UDAPTE_VARIABLES_TIMEOUT) {
          // Insertar in Notifications console.log(o.content);
          self.getNotifications();
          self.getVariablesWithAlarms();
        }
      };
    }
    /* WS */

    /* HTTP Requests */

  }, {
    key: "getTokenWS",
    value: function getTokenWS() {
      var self = this;
      var url = "".concat(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.URL_SERVER_USERS, "/tokens?").concat(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.ACCESS_TOKEN_WS, "=true");
      var xhr = $.ajax({
        url: url,
        type: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.METHOD_GET
      });
      xhr.done(function (res, status, response) {
        if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_OK) {
          var doc = res.doc;
          var token_ws = doc.access_token_ws;
          if (token_ws) window.sessionStorage.setItem(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.ACCESS_TOKEN_WS, token_ws); //let sixtySeconds = new Date(new Date().getTime() + 60 * 1000);
          //if (token_ws) Cookies.set(constants.ACCESS_TOKEN_WS, token_ws, { expires: sixtySeconds });

          console.log('Reconnection WS Ok');
        } else if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_ACCEPTED) {
          console.log(res.message);
        }
      });
      xhr.fail(function (res, status, respose) {
        console.log(res, status);

        if (res.responseJSON) {
          var json = res.responseJSON;
          console.log(json.message);
        } else {
          console.log(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.MESSAGE_ERROR);
        }
      });
    }
  }, {
    key: "getTokenWSA",
    value: function getTokenWSA() {
      var self = this;
      var url = "".concat(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.URL_SERVER_USERS, "/tokens?").concat(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.ACCESS_TOKEN_WSA, "=true");
      var xhr = $.ajax({
        url: url,
        type: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.METHOD_GET
      });
      xhr.done(function (res, status, response) {
        if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_OK) {
          var doc = res.doc;
          var token_wsa = doc.access_token_wsa;
          if (token_wsa) window.sessionStorage.setItem(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.ACCESS_TOKEN_WSA, token_wsa); //let sixtySeconds = new Date(new Date().getTime() + 60 * 1000);
          //if (token_wsa) Cookies.set(constants.ACCESS_TOKEN_WSA, token_wsa, { expires: sixtySeconds });

          console.log('Reconnection WSA Ok');
        } else if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_ACCEPTED) {
          console.log(res.message);
        }
      });
      xhr.fail(function (res, status, respose) {
        console.log(res, status);

        if (res.responseJSON) {
          var json = res.responseJSON;
          console.log(json.message);
        } else {
          console.log(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.MESSAGE_ERROR);
        }
      });
    }
  }, {
    key: "getConfiguration",
    value: function getConfiguration(fn) {
      var self = this;
      var url = "".concat(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.URL_SERVER_USERS, "/sounds/matrix");
      var xhr = $.ajax({
        url: url,
        type: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.METHOD_GET,
        dataType: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.JSON
      });
      xhr.done(function (res, status, response) {
        if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_OK) {
          if (fn) {
            fn(null, res.docs);
            return;
          }

          if (!res.docs) res.docs = [];
          self.state.matrix_sounds = res.docs;
          self.getMatrices();
        } else if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_ACCEPTED) {
          Materialize.toast(res.message, 2500);

          if (fn) {
            fn(null, []);
            return;
          }
        }
      });
      xhr.fail(function (res, status, respose) {
        if (res.responseJSON) {
          var json = res.responseJSON;
          Materialize.toast(json.message, 2500);

          if (fn) {
            fn(null, []);
            return;
          }
        } else {
          Materialize.toast(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.MESSAGE_ERROR, 2500);

          if (fn) {
            fn(null, []);
            return;
          }
        }
      });
    }
  }, {
    key: "getNotifications",
    value: function getNotifications(fn) {
      var self = this;
      var url = "".concat(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.URL_SERVER_LOG_EVENTS, "/notifications?is_seen=false");
      var xhr = $.ajax({
        url: url,
        type: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.METHOD_GET,
        dataType: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.JSON
      });
      xhr.done(function (res, status, response) {
        if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_OK) {
          if (fn) {
            fn(null, res.docs);
            return;
          }

          self.setState({
            notifications_: res.docs
          });
        } else if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_ACCEPTED) {
          Materialize.toast(res.message, 2500);

          if (fn) {
            fn(null, []);
            return;
          }
        }
      });
      xhr.fail(function (res, status, respose) {
        if (res.responseJSON) {
          var json = res.responseJSON;
          Materialize.toast(json.message, 2500);

          if (fn) {
            fn(null, []);
            return;
          }
        } else {
          Materialize.toast(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.MESSAGE_ERROR, 2500);

          if (fn) {
            fn(null, []);
            return;
          }
        }
      });
    }
  }, {
    key: "getMatrices",
    value: function getMatrices() {
      var self = this;
      var url = "".concat(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.URL_SERVER_MATRICES, "/list?with_structure=true&with_structure_json=false");
      var xhr = $.ajax({
        url: url,
        type: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.METHOD_GET,
        dataType: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.JSON
      });
      xhr.done(function (res, status, response) {
        if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_OK) {
          self.setState({
            matrices_: res.docs
          }, function () {
            $('select').material_select();

            if (self.state.matrices_.length > 0) {
              // INSERT_CONVERSION
              var matricesIn = self.state.matrices_;

              for (var i = 0; i < matricesIn.length; i++) {
                var m = matricesIn[i];

                if (window.SYSTEM_HOST == 'diavaz.technotex.com') {
                  if (m.id == 2) {
                    window.INSERT_CONVERSION = true;
                    break;
                  }
                }
              }

              if ((0,underscore__WEBPACK_IMPORTED_MODULE_2__.isNumber)(window.MatrixID)) {
                var positions = [];

                if (window.MatrixID > 0) {
                  var _matricesIn = self.state.matrices_;

                  for (var _i = 0; _i < _matricesIn.length; _i++) {
                    var matrix = _matricesIn[_i];

                    if (matrix.id == window.MatrixID) {
                      positions.push(_i);
                      break;
                    }
                  }

                  var matrices = [];
                  var structures = [];

                  for (var _i2 = 0; _i2 < positions.length; _i2++) {
                    var position = positions[_i2];
                    var _m = self.state.matrices_[position];
                    var s = _m.structure;
                    matrices.push(_m);
                    structures.push(s);
                  }

                  self.setState({
                    matrices: matrices,
                    structures: structures
                  }, function () {
                    self.updateActiveVarsInMatrix();
                    self.getVariableLastRecords();
                  });
                } else {
                  var _matricesIn2 = self.state.matrices_;

                  if (_matricesIn2.length > 0) {
                    positions.push(0);
                  }

                  var _matrices = [];
                  var _structures = [];

                  for (var _i3 = 0; _i3 < positions.length; _i3++) {
                    var _position = positions[_i3];
                    var _m2 = self.state.matrices_[_position];
                    var _s = _m2.structure;

                    _matrices.push(_m2);

                    _structures.push(_s);
                  }

                  self.setState({
                    matrices: _matrices,
                    structures: _structures
                  }, function () {
                    self.updateActiveVarsInMatrix();
                    self.getVariableLastRecords();
                  });
                }
              } else if ((0,underscore__WEBPACK_IMPORTED_MODULE_2__.isString)(window.MatrixID)) {
                var sJSON = window.MatrixID;
                var _positions = [];

                try {
                  var aJSON = JSON.parse(sJSON);
                  var _matrices3 = self.state.matrices_;

                  for (var _i4 = 0; _i4 < aJSON.length; _i4++) {
                    var id = aJSON[_i4];

                    for (var j = 0; j < _matrices3.length; j++) {
                      var _matrix = _matrices3[j];

                      if (_matrix.id == id) {
                        _positions.push(j);

                        break;
                      }
                    }
                  }
                } catch (e) {
                  console.log("MatrixID isn't JSON", e);
                }

                var _matrices2 = [];
                var _structures2 = [];

                for (var _i5 = 0; _i5 < _positions.length; _i5++) {
                  var _position2 = _positions[_i5];
                  var _m3 = self.state.matrices_[_position2];
                  var _s2 = _m3.structure;

                  _matrices2.push(_m3);

                  _structures2.push(_s2);
                }

                self.setState({
                  matrices: _matrices2,
                  structures: _structures2
                }, function () {
                  self.updateActiveVarsInMatrix();
                  self.getVariableLastRecords();
                });
              }
            }
          });
        } else if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_ACCEPTED) {
          Materialize.toast(res.message, 2500);
        }
      });
      xhr.fail(function (res, status, respose) {
        if (res.responseJSON) {
          var json = res.responseJSON;
          Materialize.toast(json.message, 2500);
        } else {
          Materialize.toast(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.MESSAGE_ERROR, 2500);
        }
      });
    }
  }, {
    key: "getVariableLastRecords",
    value: function getVariableLastRecords() {
      var self = this;
      (0,async__WEBPACK_IMPORTED_MODULE_1__.parallel)({
        variables: function variables(fn) {
          var url = "".concat(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.URL_SERVER_VARIABLES, "/list/last_record");
          var xhr = $.ajax({
            url: url,
            type: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.METHOD_GET,
            dataType: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.JSON
          });
          xhr.done(function (res, status, response) {
            if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_OK) {
              var content = [];
              var docs = res.docs;

              for (var i = 0; i < docs.length; i++) {
                var doc = docs[i];
                var o = {
                  variable_id: doc.id,
                  value: doc.value,
                  timestamp: doc.timestamp,
                  is_custom: false
                };
                content.push(o);
              }

              fn(null, content);
            } else if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_ACCEPTED) {
              fn(res.message);
            }
          });
          xhr.fail(function (res, status, respose) {
            if (res.responseJSON) {
              var json = res.responseJSON;
              fn(json.message);
            } else {
              fn(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.MESSAGE_ERROR);
            }
          });
        },
        custom_variables: function custom_variables(fn) {
          var url = "".concat(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.URL_SERVER_CUSTOM_VARIABLES, "/list/last_record");
          var xhr = $.ajax({
            url: url,
            type: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.METHOD_GET,
            dataType: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.JSON
          });
          xhr.done(function (res, status, response) {
            if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_OK) {
              var content = [];
              var docs = res.docs;

              for (var i = 0; i < docs.length; i++) {
                var doc = docs[i];
                var o = {
                  variable_id: doc.id,
                  value: doc.value,
                  timestamp: doc.timestamp,
                  is_custom: true,
                  name: doc.name
                };
                content.push(o);
              }

              fn(null, content);
            } else if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_ACCEPTED) {
              fn(res.message);
            }
          });
          xhr.fail(function (res, status, respose) {
            if (res.responseJSON) {
              var json = res.responseJSON;
              fn(json.message);
            } else {
              fn(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.MESSAGE_ERROR);
            }
          });
        }
      }, function (err, res) {
        if (err) {
          Materialize.toast(err, 2500);
          return;
        }

        var variables = res.variables;
        var custom_variables = res.custom_variables;

        for (var i = 0; i < custom_variables.length; i++) {
          var variable = custom_variables[i];
          variables.push(variable);
        }

        self.updateVariablesValueInMatrix(variables);
        self.updateVariablesValueInFooter(variables);
        self.getVariablesWithAlarms();
      });
    }
  }, {
    key: "getVariablesWithAlarms",
    value: function getVariablesWithAlarms() {
      var self = this;
      (0,async__WEBPACK_IMPORTED_MODULE_1__.parallel)({
        variables: function variables(fn) {
          var url = "".concat(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.URL_SERVER_VARIABLES, "/list/alarms");
          var xhr = $.ajax({
            url: url,
            type: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.METHOD_GET,
            dataType: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.JSON
          });
          xhr.done(function (res, status, response) {
            if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_OK) {
              fn(null, res.docs);
            } else if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_ACCEPTED) {
              fn(res.message);
            }
          });
          xhr.fail(function (res, status, respose) {
            if (res.responseJSON) {
              var json = res.responseJSON;
              fn(json.message);
            } else {
              fn(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.MESSAGE_ERROR);
            }
          });
        },
        custom_variables: function custom_variables(fn) {
          var url = "".concat(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.URL_SERVER_CUSTOM_VARIABLES, "/list/alarms");
          var xhr = $.ajax({
            url: url,
            type: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.METHOD_GET,
            dataType: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.JSON
          });
          xhr.done(function (res, status, response) {
            if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_OK) {
              fn(null, res.docs);
            } else if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_ACCEPTED) {
              fn(res.message);
            }
          });
          xhr.fail(function (res, status, respose) {
            if (res.responseJSON) {
              var json = res.responseJSON;
              fn(json.message);
            } else {
              fn(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.MESSAGE_ERROR);
            }
          });
        }
      }, function (err, res) {
        if (err) {
          Materialize.toast(err, 2500);
          return;
        }

        var variables = res.variables;
        var custom_variables = res.custom_variables;

        for (var i = 0; i < custom_variables.length; i++) {
          var variable = custom_variables[i];
          variables.push(variable);
        }

        self.updateVariablesAlarmInMatrix(variables);
      });
    }
  }, {
    key: "updateVariableSoundsConfig",
    value: function updateVariableSoundsConfig(json) {
      var self = this;
      var xhr = $.ajax({
        url: "".concat(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.URL_SERVER_USERS, "/sounds"),
        type: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.METHOD_PUT,
        contentType: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.APPLICATION_JSON,
        data: JSON.stringify(json)
      });
      xhr.done(function (res, status, response) {
        if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_OK) {
          var message = 'Configuración de sonidos de variables, Ok';
          console.log(message);
          console.log(res.doc);
        } else if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_ACCEPTED) {
          Materialize.toast(res.message, 2500);
        }
      });
      xhr.fail(function (res, status, respose) {
        if (res.responseJSON) {
          var _json = res.responseJSON;
          Materialize.toast(_json.message, 2500);
        } else {
          Materialize.toast(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.MESSAGE_ERROR, 2500);
        }
      });
    }
  }, {
    key: "getComments",
    value: function getComments(fn) {
      var self = this;
      var url = "".concat(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.URL_SERVER_GROUPS, "/list/comment");
      var xhr = $.ajax({
        url: url,
        type: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.METHOD_GET,
        dataType: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.JSON
      });
      xhr.done(function (res, status, response) {
        if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_OK) {
          if (fn) {
            fn(null, res.docs);
            return;
          }

          var content = [];
          var size = res.docs.length;

          for (var i = 0; i < size; i++) {
            var group = res.docs[i];
            if (!group.comment) group.comment = 'N/A';
            var o = {
              group_id: group.id,
              comment: group.comment
            };
            content.push(o);
          }

          self.updateGroupCommentInMatrix(content);
        } else if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_ACCEPTED) {
          Materialize.toast(res.message, 2500);

          if (fn) {
            fn(null, []);
            return;
          }
        }
      });
      xhr.fail(function (res, status, respose) {
        if (res.responseJSON) {
          var json = res.responseJSON;
          Materialize.toast(json.message, 2500);

          if (fn) {
            fn(null, []);
            return;
          }
        } else {
          Materialize.toast(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.MESSAGE_ERROR, 2500);

          if (fn) {
            fn(null, []);
            return;
          }
        }
      });
    }
  }, {
    key: "getFooterVariables",
    value: function getFooterVariables(fn) {
      var self = this;
      var url = "".concat(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.URL_SERVER_FOOTER_VARIABLES, "/list");
      var xhr = $.ajax({
        url: url,
        type: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.METHOD_GET,
        dataType: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.JSON
      });
      xhr.done(function (res, status, response) {
        if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_OK) {
          if (fn) {
            fn(null, res.docs);
            return;
          }

          self.setState({
            footer_variables: res.docs
          });
        } else if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_ACCEPTED) {
          Materialize.toast(res.message, 2500);

          if (fn) {
            fn(null, []);
            return;
          }
        }
      });
      xhr.fail(function (res, status, respose) {
        if (res.responseJSON) {
          var json = res.responseJSON;
          Materialize.toast(json.message, 2500);

          if (fn) {
            fn(null, []);
            return;
          }
        } else {
          Materialize.toast(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.MESSAGE_ERROR, 2500);

          if (fn) {
            fn(null, []);
            return;
          }
        }
      });
    }
  }, {
    key: "getLogAlarms",
    value: function getLogAlarms(fn) {
      var self = this;
      var url = "".concat(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.URL_SERVER_LOG_ALARMS, "/list?checked=false");
      var xhr = $.ajax({
        url: url,
        type: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.METHOD_GET,
        dataType: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.JSON
      });
      xhr.done(function (res, status, response) {
        if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_OK) {
          if (fn) {
            fn(null, res.docs);
            return;
          }

          self.setState({
            log_alarms: res.docs
          });
        } else if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_ACCEPTED) {
          Materialize.toast(res.message, 2500);

          if (fn) {
            fn(null, []);
            return;
          }
        }
      });
      xhr.fail(function (res, status, respose) {
        if (res.responseJSON) {
          var json = res.responseJSON;
          Materialize.toast(json.message, 2500);

          if (fn) {
            fn(null, []);
            return;
          }
        } else {
          Materialize.toast(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.MESSAGE_ERROR, 2500);

          if (fn) {
            fn(null, []);
            return;
          }
        }
      });
    }
  }, {
    key: "updateCommentGroup",
    value: function updateCommentGroup(id, json) {
      var self = this;
      var xhr = $.ajax({
        url: "".concat(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.URL_SERVER_GROUPS, "/").concat(id, "/comment"),
        type: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.METHOD_PUT,
        contentType: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.APPLICATION_JSON,
        data: JSON.stringify(json)
      });
      xhr.done(function (res, status, response) {
        if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_OK) {
          json.group_id = id;
          var content = [json];
          self.updateGroupCommentInMatrix(content);

          if (self.ws) {
            var o = {
              evt: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.EVENT_UPDATE_COMMENT_GROUP,
              content: json
            };
            var s = JSON.stringify(o);
            self.ws.send(s);
          }
        } else if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_ACCEPTED) {
          Materialize.toast(res.message, 2500);
        }
      });
      xhr.fail(function (res, status, respose) {
        if (res.responseJSON) {
          var _json2 = res.responseJSON;
          Materialize.toast(_json2.message, 2500);
        } else {
          Materialize.toast(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.MESSAGE_ERROR, 2500);
        }
      });
    }
  }, {
    key: "updateEventAsSeen",
    value: function updateEventAsSeen(id) {
      var self = this;
      var xhr = $.ajax({
        url: "".concat(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.URL_SERVER_LOG_EVENTS, "/notifications/").concat(id),
        type: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.METHOD_PUT,
        contentType: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.APPLICATION_JSON
      });
      xhr.done(function (res, status, response) {
        if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_OK) {
          console.log('Notificación Ok');
        } else if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_ACCEPTED) {
          Materialize.toast(res.message, 2500);
        }
      });
      xhr.fail(function (res, status, respose) {
        if (res.responseJSON) {
          var json = res.responseJSON;
          Materialize.toast(json.message, 2500);
        } else {
          Materialize.toast(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.MESSAGE_ERROR, 2500);
        }
      });
    }
  }, {
    key: "updateCommentVariable",
    value: function updateCommentVariable(id, json) {
      var self = this;
      var xhr = $.ajax({
        url: "".concat(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.URL_SERVER_VARIABLES, "/").concat(id, "/comment"),
        type: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.METHOD_PUT,
        contentType: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.APPLICATION_JSON,
        data: JSON.stringify(json)
      });
      xhr.done(function (res, status, response) {
        if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_OK) {
          json.variable_id = id;
          json.is_custom = false;
          var content = [json];
          self.updateVariableCommentInMatrix(content);
        } else if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_ACCEPTED) {
          Materialize.toast(res.message, 2500);
        }
      });
      xhr.fail(function (res, status, respose) {
        if (res.responseJSON) {
          var _json3 = res.responseJSON;
          Materialize.toast(_json3.message, 2500);
        } else {
          Materialize.toast(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.MESSAGE_ERROR, 2500);
        }
      });
    }
  }, {
    key: "updateCommentCustomVariable",
    value: function updateCommentCustomVariable(id, json) {
      var self = this;
      var xhr = $.ajax({
        url: "".concat(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.URL_SERVER_CUSTOM_VARIABLES, "/").concat(id, "/comment"),
        type: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.METHOD_PUT,
        contentType: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.APPLICATION_JSON,
        data: JSON.stringify(json)
      });
      xhr.done(function (res, status, response) {
        if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_OK) {
          json.variable_id = id;
          json.is_custom = true;
          var content = [json];
          self.updateVariableCommentInMatrix(content);
        } else if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_ACCEPTED) {
          Materialize.toast(res.message, 2500);
        }
      });
      xhr.fail(function (res, status, respose) {
        if (res.responseJSON) {
          var _json4 = res.responseJSON;
          Materialize.toast(_json4.message, 2500);
        } else {
          Materialize.toast(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.MESSAGE_ERROR, 2500);
        }
      });
    }
  }, {
    key: "updateLogAlarm",
    value: function updateLogAlarm(id, json) {
      var self = this;
      var xhr = $.ajax({
        url: "".concat(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.URL_SERVER_LOG_ALARMS, "/").concat(id, "/comment"),
        type: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.METHOD_PUT,
        contentType: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.APPLICATION_JSON,
        data: JSON.stringify(json)
      });
      xhr.done(function (res, status, response) {
        if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_OK) {
          var logAlarmIn = res.doc;

          if (logAlarmIn) {
            var log_alarms = self.state.log_alarms;
            var size = log_alarms.length;

            for (var i = 0; i < size; i++) {
              var logAlarm = log_alarms[i];

              if (logAlarm.id === logAlarmIn.id) {
                log_alarms[i] = logAlarmIn;
                break;
              }
            }

            self.setState({
              log_alarms: log_alarms
            });
          }
        } else if (response.status == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.STATUS_ACCEPTED) {
          Materialize.toast(res.message, 2500);
        }
      });
      xhr.fail(function (res, status, respose) {
        if (res.responseJSON) {
          var _json5 = res.responseJSON;
          Materialize.toast(_json5.message, 2500);
        } else {
          Materialize.toast(_constants_js__WEBPACK_IMPORTED_MODULE_10__.default.MESSAGE_ERROR, 2500);
        }
      });
    }
    /* HTTP Requests */

  }, {
    key: "updateVariablesValueInFooter",
    value: function updateVariablesValueInFooter(content) {
      var self = this;

      if ((0,underscore__WEBPACK_IMPORTED_MODULE_2__.isArray)(content)) {
        var footer_variables = self.state.footer_variables;

        for (var i = 0; i < footer_variables.length; i++) {
          var footer_variable = footer_variables[i];

          for (var j = 0; j < content.length; j++) {
            var variable = content[j];
            var id = variable.variable_id;
            var is_custom = variable.is_custom;
            var value = variable.value;
            var timestamp = variable.timestamp;
            var name = variable.name;
            if (!is_custom) is_custom = false;

            if (footer_variable.variable_id === id) {
              if (footer_variable.is_custom === is_custom) {
                footer_variables[i].value = value;
                footer_variables[i].timestamp = timestamp;
                if (name) footer_variables[i].name = name;
                break;
              }
            }
          }
        }

        self.setState({
          footer_variables: footer_variables
        });
      }
    }
  }, {
    key: "updateVariablesValueInMatrix",
    value: function updateVariablesValueInMatrix(content) {
      var self = this;

      if ((0,underscore__WEBPACK_IMPORTED_MODULE_2__.isArray)(content)) {
        var structures = self.state.structures;

        for (var j = 0; j < structures.length; j++) {
          var structure = structures[j];

          for (var i = 0; i < content.length; i++) {
            var variable = content[i];
            var id = variable.variable_id;
            var is_custom = variable.is_custom;
            var value = variable.value;
            var timestamp = variable.timestamp;
            if (!is_custom) is_custom = false;
            structure = self.updateVariablesValue(structure, id, is_custom, value, timestamp);
          }

          structures[j] = structure;
        }

        self.setState({
          structures: structures
        });
      }
    }
  }, {
    key: "emptyUpdateVariablesValueInMatrix",
    value: function emptyUpdateVariablesValueInMatrix(content) {
      var self = this;

      if ((0,underscore__WEBPACK_IMPORTED_MODULE_2__.isArray)(content)) {
        var structures = self.state.structures;

        for (var j = 0; j < structures.length; j++) {
          var structure = structures[j];

          for (var i = 0; i < content.length; i++) {
            var variable = content[i];
            var id = variable.variable_id;
            var is_custom = variable.is_custom;
            var value = variable.value;
            if (value !== ' ') value = ' ';
            var timestamp = variable.timestamp;
            if (!is_custom) is_custom = false;
            structure = self.emptyUpdateVariablesValue(structure, id, is_custom, value, timestamp);
          }

          structures[j] = structure;
        }

        self.setState({
          structures: structures
        });
      }
    }
  }, {
    key: "updateVariablesAlarmInMatrix",
    value: function updateVariablesAlarmInMatrix(content) {
      var self = this;

      if ((0,underscore__WEBPACK_IMPORTED_MODULE_2__.isArray)(content)) {
        var structures = self.state.structures;

        for (var j = 0; j < structures.length; j++) {
          var structure = structures[j];

          for (var i = 0; i < content.length; i++) {
            var o = content[i];
            var variable_id = o.variable_id;
            var is_custom = o.is_custom;
            var color = o.color;
            var is_timeout = o.is_timeout;
            if (!is_custom) is_custom = false;
            if (!color) color = false;
            if (!is_timeout) is_timeout = false;

            if (self.state.view === CHART_VIEW) {
              // EXPERIMENTAL alarm_id
              if (is_timeout) {
                structure = self.updateVariablesTimeout(structure, variable_id, is_custom, color);
              } else {
                var alarm_id = o.alarm_id;
                var alarm_setpoint = o.setpoint;
                var alarm_alias = o.alias;
                structure = self.updateVariablesAlarm(structure, variable_id, is_custom, color, alarm_id, alarm_alias, alarm_setpoint);
              }
            } else {
              if (is_timeout) {
                structure = self.updateVariablesTimeout(structure, variable_id, is_custom, color);
              } else {
                structure = self.updateVariablesAlarm(structure, variable_id, is_custom, color);
              }
            }

            var sound = self.updateActiveVariables(o);
            structure = self.updateVariablesSound(structure, variable_id, is_custom, sound);
          }

          structures[j] = structure;
        }

        self.updateSoundStatus();
        self.setState({
          structures: structures
        });
      }
    }
  }, {
    key: "updateActiveVarsInMatrix",
    value: function updateActiveVarsInMatrix() {
      var matrices = this.state.matrices;
      var active_vars = [];
      var variablesIn = [];

      for (var _h = 0; _h < matrices.length; _h++) {
        var matrix = matrices[_h];

        if (matrix) {
          var s = matrix.structure;

          if (s) {
            var variables = this.getVariablesInMatrix(s);
            var matrix_sounds = this.state.matrix_sounds;

            for (var i = 0; i < matrix_sounds.length; i++) {
              var matrix_sound = matrix_sounds[i];

              if (matrix_sound) {
                var matrix_id = matrix_sound.matrix_id;

                if (matrix_id == matrix.id) {
                  var active_variables = matrix_sound.active_vars;

                  for (var j = 0; j < active_variables.length; j++) {
                    var active_variable = active_variables[j];

                    for (var k = 0; k < variables.length; k++) {
                      var variable = variables[k];

                      if (active_variable.id == variable.id) {
                        if (active_variable.is_custom == variable.is_custom) {
                          active_vars.push(active_variable);
                          break;
                        }
                      }
                    }
                  }
                }
              }
            }

            for (var _i6 = 0; _i6 < variables.length; _i6++) {
              var isNew = true;
              var _variable = variables[_i6];

              for (var _j = 0; _j < variablesIn.length; _j++) {
                var variableIn = variablesIn[_j];

                if (_variable.id == variableIn.id) {
                  if (_variable.is_custom == variableIn.is_custom) {
                    isNew = false;
                    break;
                  }
                }
              }

              if (isNew) variablesIn.push(_variable);
            }
          }
        }
      }

      this.state.variables_ = variablesIn;
      this.state.active_vars = active_vars;
    }
  }, {
    key: "updateActiveVariables",
    value: function updateActiveVariables(o) {
      var self = this;
      var sound = {
        is_ringing: false,
        mute: false
      };
      var active_vars = self.state.active_vars;

      for (var i = 0; i < active_vars.length; i++) {
        var variable = active_vars[i];

        if (variable.id == o.variable_id) {
          if (variable.is_custom == o.is_custom) {
            if (!o.alarm_id) {
              active_vars.splice(i, 1);
              self.state.active_vars = active_vars;
              return sound;
            }

            active_vars[i].sound = o.sound;
            active_vars[i].priority_level = o.priority_level;
            var mute = active_vars[i].mute;
            sound.is_ringing = true;
            sound.mute = mute;
            return sound;
          }
        }
      }

      if (!o.alarm_id) return sound;
      var insert = false;
      var variables = self.state.variables_;

      for (var _i7 = 0; _i7 < variables.length; _i7++) {
        var _variable2 = variables[_i7];

        if (_variable2.id == o.variable_id) {
          if (_variable2.is_custom == o.is_custom) {
            insert = true;
          }
        }
      }

      if (!insert) return sound;
      var active = {
        id: o.variable_id,
        is_custom: o.is_custom,
        sound: o.sound,
        priority_level: o.priority_level,
        mute: false
      };
      active_vars.push(active);
      self.state.active_vars = active_vars;
      sound.is_ringing = true;
      sound.mute = false;
      return sound;
    }
  }, {
    key: "updateSoundStatus",
    value: function updateSoundStatus() {
      var self = this;
      var active_vars = self.state.active_vars;
      var size = active_vars.length;

      if (size == 0) {
        for (var _key in window.AUDIO) {
          window.AUDIO[_key].pause();

          if (window.AUDIO_PAUSED) window.AUDIO_PAUSED[_key] = true;
        }

        return;
      }

      var key = 'priority_level';
      active_vars = (0,underscore__WEBPACK_IMPORTED_MODULE_2__.sortBy)(active_vars, key);
      var active = false;

      for (var i = size - 1; i >= 0; i--) {
        var active_variable = active_vars[i];

        if (active_variable.sound) {
          if (!active_variable.mute) {
            active = active_variable;
            break;
          }
        }
      }

      if (active) {
        for (var _key3 in window.AUDIO) {
          if (!window.AUDIO[_key3].paused) {
            window.AUDIO[_key3].pause();

            if (window.AUDIO_PAUSED) window.AUDIO_PAUSED[_key3] = true;
          }
        }

        var _key2 = '';

        if (active.sound == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.DANGER_VALUE) {
          _key2 = _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.DANGER_SOUND;
        } else if (active.sound == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.WARNING_VALUE) {
          _key2 = _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.WARNING_SOUND;
        } else if (active.sound == _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.TIMEOUT_VALUE) {
          _key2 = _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.TIMEOUT_SOUND;
        }

        if (window.AUDIO[_key2]) {
          if (window.AUDIO_PAUSED) {
            if (window.AUDIO_PAUSED[_key2]) {
              if (window.AUDIO[_key2].paused) {
                var wAudio = window.AUDIO[_key2].play();

                if (wAudio !== undefined) {
                  wAudio.then(function (_) {
                    //console.log(window.AUDIO[key], ' PLAY OK');
                    if (window.AUDIO_PAUSED) window.AUDIO_PAUSED[_key2] = false;
                  })["catch"](function (error) {
                    console.error(window.AUDIO[_key2], ' ERROR PLAY');
                  });
                }
              }
            }
          } else {
            if (window.AUDIO[_key2].paused) {
              var _wAudio = window.AUDIO[_key2].play();

              if (_wAudio !== undefined) {
                _wAudio.then(function (_) {
                  //console.log(window.AUDIO[key], ' PLAY OK');
                  if (window.AUDIO_PAUSED) window.AUDIO_PAUSED[_key2] = false;
                })["catch"](function (error) {
                  console.error(window.AUDIO[_key2], ' BEFORE ERROR PLAY');
                });
              }
            }
          }
        }

        return;
      }

      for (var _key4 in window.AUDIO) {
        window.AUDIO[_key4].pause();

        if (window.AUDIO_PAUSED) window.AUDIO_PAUSED[_key4] = true;
      }
    }
    /*updateSoundStatus() {
      let self = this;
       let active_vars = self.state.active_vars;
      let size = active_vars.length;
      if (size == 0) {
        for (const key in window.AUDIO) {
          window.AUDIO[key].pause();
        }
         return;
      }
       let key = 'priority_level';
      active_vars = sortBy(active_vars, key);
       let active = false;
      for (let i = size - 1; i >= 0; i--) {
        const active_variable = active_vars[i];
        if (active_variable.sound) {
          if (!active_variable.mute) {
            active = active_variable;
            break;
          }
        }
      }
       if (active) {
        for (const key in window.AUDIO) {
          if (!window.AUDIO[key].paused) window.AUDIO[key].pause();
        }
         let key = '';
        if (active.sound == constants.DANGER_VALUE) {
          key = constants.DANGER_SOUND;
         } else if (active.sound == constants.WARNING_VALUE) {
          key = constants.WARNING_SOUND;
         } else if (active.sound == constants.TIMEOUT_VALUE) {
          key = constants.TIMEOUT_SOUND;
        }
         if (window.AUDIO[key]) {
          if (window.AUDIO[key].paused) {
            let wAudio =  window.AUDIO[key].play();
            if (wAudio !== undefined) {
              wAudio.then(_ => {
                //console.log(window.AUDIO[key], ' PLAY OK');
               }).catch(error => {
                console.error(window.AUDIO[key], ' ERROR PLAY');
              });
            }
          }
        }
         return;
      }
       for (const key in window.AUDIO) {
        window.AUDIO[key].pause();
      }
    }*/

  }, {
    key: "updateVariableCommentInMatrix",
    value: function updateVariableCommentInMatrix(content) {
      var self = this;

      if ((0,underscore__WEBPACK_IMPORTED_MODULE_2__.isArray)(content)) {
        if (content.length > 0) {
          var variable = content[0];
          var id = variable.variable_id;
          var is_custom = variable.is_custom;
          var comment = variable.comment;
          if (!is_custom) is_custom = false;
          var structures = self.state.structures;

          for (var i = 0; i < structures.length; i++) {
            var structure = structures[i];
            structure = self.updateVariableComment(structure, id, is_custom, comment);
            structures[i] = structure;
          }

          self.setState({
            structures: structures
          }, function () {
            $('.tooltipped').tooltip({
              delay: 20
            });
          });
        }
      }
    }
  }, {
    key: "updateGroupCommentInMatrix",
    value: function updateGroupCommentInMatrix(content) {
      var self = this;

      if ((0,underscore__WEBPACK_IMPORTED_MODULE_2__.isArray)(content)) {
        if (content.length > 0) {
          var group = content[0];
          var id = group.group_id;
          var comment = group.comment;
          var structures = self.state.structures;

          for (var i = 0; i < structures.length; i++) {
            var structure = structures[i];
            structure = self.updateGroupComment(structure, id, comment);
            structures[i] = structure;
          }

          self.setState({
            structures: structures
          }, function () {
            $('.tooltipped').tooltip({
              delay: 20
            });
          });
        }
      }
    }
  }, {
    key: "updateVariablesValue",
    value: function updateVariablesValue(groups, variable_id, is_custom, value, timestamp) {
      if (!groups) groups = [];

      for (var i = 0; i < groups.length; i++) {
        var g = groups[i];
        var variables = g.variables;

        if (variables) {
          for (var j = 0; j < variables.length; j++) {
            var v = variables[j];

            if (v.id == variable_id) {
              if (v.is_custom == is_custom) {
                groups[i].variables[j].value = value;
                groups[i].variables[j].timestamp = timestamp;

                if (groups[i].variables[j].on_timeout) {
                  groups[i].variables[j].on_timeout = false;
                  groups[i].variables[j].color = false;
                }

                return groups;
              }
            }
          }
        } else {
          if (g.sons) {
            groups[i].sons = this.updateVariablesValue(g.sons, variable_id, is_custom, value, timestamp);
          }
        }
      }

      return groups;
    }
  }, {
    key: "emptyUpdateVariablesValue",
    value: function emptyUpdateVariablesValue(groups, variable_id, is_custom, value, timestamp) {
      if (!groups) groups = [];

      for (var i = 0; i < groups.length; i++) {
        var g = groups[i];
        var variables = g.variables;

        if (variables) {
          for (var j = 0; j < variables.length; j++) {
            var v = variables[j];

            if (v.id == variable_id) {
              if (v.is_custom == is_custom) {
                groups[i].variables[j].value = value;
                groups[i].variables[j].timestamp = timestamp;

                if (groups[i].variables[j].on_timeout) {
                  groups[i].variables[j].on_timeout = false;
                  groups[i].variables[j].color = false;
                }

                return groups;
              }
            }
          }
        } else {
          if (g.sons) {
            groups[i].sons = this.emptyUpdateVariablesValue(g.sons, variable_id, is_custom, value, timestamp);
          }
        }
      }

      return groups;
    } // EXPERIMENTAL alarm_id, setpoint

  }, {
    key: "updateVariablesAlarm",
    value: function updateVariablesAlarm(groups, variable_id, is_custom, color, alarm_id, alarm_alias, alarm_setpoint) {
      for (var i = 0; i < groups.length; i++) {
        var g = groups[i];
        var variables = g.variables;

        if (variables) {
          for (var j = 0; j < variables.length; j++) {
            var v = variables[j];

            if (v.id == variable_id) {
              if (v.is_custom == is_custom) {
                groups[i].variables[j].color = color;
                groups[i].variables[j].on_timeout = false;
                groups[i].variables[j].alarm_id = alarm_id;

                if (alarm_id) {
                  groups[i].variables[j].alarm_alias = alarm_alias;
                  groups[i].variables[j].alarm_setpoint = alarm_setpoint;
                } else {
                  groups[i].variables[j].alarm_alias = false;
                  groups[i].variables[j].alarm_setpoint = false;
                }

                return groups;
              }
            }
          }
        } else {
          if (g.sons) {
            groups[i].sons = this.updateVariablesAlarm(g.sons, variable_id, is_custom, color, alarm_id, alarm_alias, alarm_setpoint);
          }
        }
      }

      return groups;
    }
  }, {
    key: "updateVariablesTimeout",
    value: function updateVariablesTimeout(groups, variable_id, is_custom, color) {
      for (var i = 0; i < groups.length; i++) {
        var g = groups[i];
        var variables = g.variables;

        if (variables) {
          for (var j = 0; j < variables.length; j++) {
            var v = variables[j];

            if (v.id == variable_id) {
              if (v.is_custom == is_custom) {
                groups[i].variables[j].color = color;
                groups[i].variables[j].on_timeout = true;
                return groups;
              }
            }
          }
        } else {
          if (g.sons) {
            groups[i].sons = this.updateVariablesTimeout(g.sons, variable_id, is_custom, color);
          }
        }
      }

      return groups;
    }
  }, {
    key: "updateVariablesSound",
    value: function updateVariablesSound(groups, variable_id, is_custom, sound) {
      for (var i = 0; i < groups.length; i++) {
        var g = groups[i];
        var variables = g.variables;

        if (variables) {
          for (var j = 0; j < variables.length; j++) {
            var v = variables[j];

            if (v.id == variable_id) {
              if (v.is_custom == is_custom) {
                groups[i].variables[j].is_ringing = sound.is_ringing;
                groups[i].variables[j].mute = sound.mute;
                return groups;
              }
            }
          }
        } else {
          if (g.sons) {
            groups[i].sons = this.updateVariablesSound(g.sons, variable_id, is_custom, sound);
          }
        }
      }

      return groups;
    }
  }, {
    key: "updateVariableComment",
    value: function updateVariableComment(groups, variable_id, is_custom, comment) {
      for (var i = 0; i < groups.length; i++) {
        var g = groups[i];
        var variables = g.variables;

        if (variables) {
          for (var j = 0; j < variables.length; j++) {
            var v = variables[j];

            if (v.id == variable_id) {
              if (v.is_custom == is_custom) {
                groups[i].variables[j].comment = comment;
                return groups;
              }
            }
          }
        } else {
          if (g.sons) {
            groups[i].sons = this.updateVariableComment(g.sons, variable_id, is_custom, comment);
          }
        }
      }

      return groups;
    }
  }, {
    key: "updateGroupComment",
    value: function updateGroupComment(groups, group_id, comment) {
      for (var i = 0; i < groups.length; i++) {
        var g = groups[i];

        if (g.id == group_id) {
          groups[i].comment = comment;
          return groups;
        }

        if (g.sons) {
          groups[i].sons = this.updateGroupComment(g.sons, group_id, comment);
        }
      }

      return groups;
    }
  }, {
    key: "getVariablesInMatrix",
    value: function getVariablesInMatrix(s) {
      var variables = [];

      for (var i = 0; i < s.length; i++) {
        var g = s[i];
        var variables_ = [];
        if (g.sons) variables_ = this.getVariablesInMatrix(g.sons);

        if (g.variables) {
          for (var j = 0; j < g.variables.length; j++) {
            var variable = g.variables[j];
            var v = {
              id: variable.id,
              is_custom: variable.is_custom
            };
            variables_.push(v);
          }
        }

        for (var _j2 = 0; _j2 < variables_.length; _j2++) {
          var _variable3 = variables_[_j2];
          variables.push(_variable3);
        }
      }

      return variables;
    }
    /* Other Events */

  }, {
    key: "handleOpenDynamicGraphicsGroup",
    value: function handleOpenDynamicGraphicsGroup(mi) {
      var self = this; // ACTUALIZAR

      var fn = function fn(group_id) {
        var matrices = self.state.matrices;

        if (matrices) {
          var matrix = matrices[mi];

          if (matrix) {
            var url = "/dynamic_graphics/".concat(matrix.id, "/").concat(group_id);
            window.location = url;
            win.focus();
          }
        }
      };

      return fn;
    }
  }, {
    key: "handleOpenCommentGroup",
    value: function handleOpenCommentGroup() {
      var self = this;

      var fn = function fn(group) {
        self.setState({
          comment: group
        });
      };

      return fn;
    }
  }, {
    key: "handleOpenCommentVariable",
    value: function handleOpenCommentVariable() {
      var self = this;

      var fn = function fn(variable) {
        if (variable) {
          self.setState({
            comment: variable
          });
        }
      };

      return fn;
    }
  }, {
    key: "handleChangeComment",
    value: function handleChangeComment() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        var comment = self.state.comment;

        if (comment) {
          var inputComment = document.querySelector('#input-comment');
          var value = inputComment.value.trim();

          if (value != '') {
            // Comentario de variable o variable personalizada
            if (comment.variable_id) {
              var o = {
                comment: value
              };

              if (comment.is_custom) {
                self.updateCommentCustomVariable(comment.variable_id, o);
              } else {
                self.updateCommentVariable(comment.variable_id, o);
              }
            } else {
              // Comentario de grupo
              var _o = {
                comment: value
              };
              self.updateCommentGroup(comment.group_id, _o);
            }

            inputComment.value = '';
            $('#comentarios_macro').modal('close');
          }
        }
      };

      return fn;
    }
  }, {
    key: "handleChangeSoundVariable",
    value: function handleChangeSoundVariable(mi) {
      var self = this;

      var fn = function fn(variable) {
        var active_vars = self.state.active_vars;
        var size = active_vars.length;
        if (size == 0) return;
        var variable_id = variable.id;
        var is_custom = variable.is_custom;

        for (var i = 0; i < active_vars.length; i++) {
          var active_variable = active_vars[i];

          if (active_variable.id == variable_id) {
            if (active_variable.is_custom == is_custom) {
              var mute = active_variable.mute;
              self.state.active_vars[i].mute = !mute;
              var structures = self.state.structures;

              for (var j = 0; j < structures.length; j++) {
                var structure = structures[j];
                var sound = {
                  is_ringing: variable.is_ringing,
                  mute: !mute
                };
                structure = self.updateVariablesSound(structure, variable_id, is_custom, sound);
                structures[j] = structure;
              }

              self.setState({
                structures: structures
              }, function () {
                self.updateSoundStatus(); // ACTUALIZAR
                // Actualización en la configuración del usuario

                var matrices = self.state.matrices;

                if (matrices) {
                  var matrix = matrices[mi];

                  if (matrix) {
                    var _active_vars = (0,underscore__WEBPACK_IMPORTED_MODULE_2__.clone)(self.state.active_vars);

                    var variables = self.getVariables(matrix.structure);

                    var _size = _active_vars.length - 1;

                    for (var _i8 = _size; _i8 >= 0; _i8--) {
                      var active_var = _active_vars[_i8];
                      var remove = true;

                      for (var _j3 = 0; _j3 < variables.length; _j3++) {
                        var _variable4 = variables[_j3];

                        if (_variable4.id == active_var.id) {
                          if (_variable4.is_custom == active_var.is_custom) {
                            remove = false;
                            break;
                          }
                        }
                      }

                      if (remove) {
                        _active_vars.splice(_i8, 1);
                      }
                    }

                    var o = {
                      matrix_id: matrix.id,
                      active_vars: _active_vars
                    };
                    var s = JSON.stringify(o);
                    var json = {
                      json_matrix_sounds_in: s
                    };
                    self.updateVariableSoundsConfig(json);
                  }
                }
              });
              return;
            }
          }
        }
      };

      return fn;
    }
  }, {
    key: "handleChangeLogAlarm",
    value: function handleChangeLogAlarm(id) {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        var log_alarms = self.state.log_alarms;
        var size = log_alarms.length;
        var logAlarm = false;

        for (var i = 0; i < size; i++) {
          var logOne = log_alarms[i];

          if (logOne.id === id) {
            var checked = log_alarms[i].checked;

            if (!checked) {
              logAlarm = log_alarms[i];
              $('#comentarios_log_alarm').modal('open');
              $('#input-comment-log-alarm').val(logOne.comment);
            }

            break;
          }
        }

        self.setState({
          logAlarm: logAlarm
        });
      };

      return fn;
    }
  }, {
    key: "handleCommentLogAlarm",
    value: function handleCommentLogAlarm() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        if (SYSTEM_HOST === 'sepec.technotex.com') return;
        var comment = $('#input-comment-log-alarm').val();
        if (!comment || comment == '') return;
        var logAlarm = self.state.logAlarm;
        if (!logAlarm) return;
        var id = logAlarm.id;
        var json = {
          comment: comment,
          checked: true
        };
        self.updateLogAlarm(id, json);
      };

      return fn;
    }
  }, {
    key: "handleLogAlarmClose",
    value: function handleLogAlarmClose() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        self.setState({
          logAlarm: false
        });
      };

      return fn;
    }
    /* View Events */

  }, {
    key: "handleListView",
    value: function handleListView() {
      var self = this;

      var fn = function fn() {
        var value = LIST_VIEW;

        if (value != self.state.view) {
          self.setState({
            view: value
          });
        }
      };

      return fn;
    }
  }, {
    key: "handleListViewMin",
    value: function handleListViewMin() {
      var self = this;

      var fn = function fn() {
        var value = LIST_VIEW_MIN;

        if (value != self.state.view) {
          self.setState({
            view: value
          });
        }
      };

      return fn;
    }
  }, {
    key: "handleChartView",
    value: function handleChartView() {
      var self = this;

      var fn = function fn() {
        var num = 0;
        var structures = self.state.structures;
        if (structures.length == 0) return;

        for (var i = 0; i < structures.length; i++) {
          var s = structures[i];
          var variables = self.getVariables(s);
          num = num + variables.length;
        }

        if (num > 30) {
          window.location.href = '/charts';
          return;
        }

        var value = CHART_VIEW;

        if (value != self.state.view) {
          self.setState({
            view: value
          });
        }
      };

      return fn;
    }
  }, {
    key: "handleTableView",
    value: function handleTableView() {
      var self = this;

      var fn = function fn() {
        var value = TABLE_VIEW;

        if (value != self.state.view) {
          self.setState({
            view: value
          });
        }
      };

      return fn;
    }
  }, {
    key: "handleTableViewCol",
    value: function handleTableViewCol() {
      var self = this;

      var fn = function fn() {
        var value = TABLE_VIEW_COL;

        if (value != self.state.view) {
          self.setState({
            view: value
          });
        }
      };

      return fn;
    }
  }, {
    key: "handlePanelView",
    value: function handlePanelView() {
      var self = this;

      var fn = function fn() {
        var value = 4;

        if (value != self.state.view) {
          self.setState({
            view: value
          });
        }
      };

      return fn;
    }
  }, {
    key: "handleLogAlarmsView",
    value: function handleLogAlarmsView() {
      var self = this;

      var fn = function fn() {
        var status = self.state.log_alarms_view;
        self.setState({
          log_alarms_view: !status
        });
      };

      return fn;
    }
    /* View Events */

    /* Header: Matriz */

  }, {
    key: "handleRestoreMatrix",
    value: function handleRestoreMatrix() {
      var _this3 = this;

      var self = this;

      var fn = function fn(s, index) {
        var structures = _this3.state.structures;

        if (structures[index]) {
          structures[index] = s;
          self.setState({
            structures: structures
          });
        }
      };

      return fn;
    }
  }, {
    key: "handleItemGroup",
    value: function handleItemGroup() {
      var _this4 = this;

      var self = this;

      var fn = function fn(s, index) {
        var structures = _this4.state.structures;

        if (structures[index]) {
          structures[index] = s;
          self.setState({
            structures: structures
          });
        }
      };

      return fn;
    }
  }, {
    key: "handleChangeMatrix",
    value: function handleChangeMatrix() {
      var _this5 = this;

      var self = this;

      var fn = function fn(m, s, mi, si) {
        var o = {};
        var matrices = _this5.state.matrices;
        var structures = _this5.state.structures;

        if (matrices[mi]) {
          matrices[mi] = m;
          o.matrices = matrices;
        }

        if (structures[si]) {
          structures[si] = s;
          o.structures = structures;
        }

        self.setState(o, function () {
          self.updateActiveVarsInMatrix();
          self.getVariableLastRecords();
        });
      };

      return fn;
    }
  }, {
    key: "handleRemoveNotification",
    value: function handleRemoveNotification() {
      var self = this;

      var fn = function fn(id) {
        var notifications = self.state.notifications_;

        for (var i = 0; i < notifications.length; i++) {
          var notification = notifications[i];

          if (id == notification.id) {
            self.updateEventAsSeen(id);
            notifications.splice(i, 1);
            self.setState({
              notifications_: notifications
            });
            return;
          }
        }
      };

      return fn;
    }
  }, {
    key: "orderByOS",
    value: function orderByOS(os, field, asc) {
      os.sort(function (a, b) {
        var hasA = a.hasOwnProperty(field);
        var hasB = b.hasOwnProperty(field);

        if (hasA && hasB) {
          var vA = a[field];
          var vB = b[field];
          if ((0,underscore__WEBPACK_IMPORTED_MODULE_2__.isString)(vA)) vA = vA.toLowerCase();
          if ((0,underscore__WEBPACK_IMPORTED_MODULE_2__.isString)(vB)) vB = vB.toLowerCase();

          if (asc) {
            if (vA < vB) return -1;
            if (vA > vB) return 1;
          } else {
            if (vA < vB) return 1;
            if (vA > vB) return -1;
          }
        }

        return 0;
      });
      return os;
    }
    /* Header: Matriz */

  }, {
    key: "createTitleFV",
    value: function createTitleFV() {
      var self = this;

      var fn = function fn(variable, index) {
        var unit = false;
        if (variable.unit) unit = "(".concat(variable.unit, ")");
        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("th", {
          key: index
        }, variable.name, " ", unit);
      };

      return fn;
    }
  }, {
    key: "createItemFV",
    value: function createItemFV() {
      var self = this;

      var fn = function fn(variable, index) {
        var variable_color = variable.color;
        if (!variable_color) variable_color = '';
        var variable_id = variable.variable_id;
        var variable_is_custom = variable.is_custom;
        var variable_value = variable.value;
        var variable_timestamp = variable.timestamp;
        if (variable_color === '') variable_color = 'white';

        if (variable_value === '0' || variable_value === 0) {
          variable_value = (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
            style: "color: #F2ED0A !important;"
          }, variable_value);
        }

        var urlQuick = "/charts/".concat(variable_id);

        if (variable_is_custom) {
          urlQuick = "/charts/".concat(variable_id, "/true");
        }

        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("td", {
          key: index
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
          className: "Flex center"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("strong", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
          href: urlQuick,
          title: variable_timestamp,
          style: "font-weight bolder; color: ".concat(variable_color, " !important;")
        }, variable_value))));
      };

      return fn;
    }
  }, {
    key: "createLogAlarm",
    value: function createLogAlarm() {
      var self = this;

      var fn = function fn(item, index) {
        if (item.checked) return;
        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("tr", {
          key: index
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("td", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("strong", null, item.created_at_out)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("td", null, item.variable_device), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("td", null, item.variable_name), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("td", null, item.is_timeout ? _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.NA : item.value), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("td", null, item.message), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("td", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
          className: "switch"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
          type: "checkbox",
          checked: item.checked
        }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
          className: "lever",
          onClick: self.handleChangeLogAlarm(item.id)
        }), "Aprobar"))));
      };

      return fn;
    }
  }, {
    key: "createOptMatrix",
    value: function createOptMatrix() {
      var fn = function fn(item, index) {
        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("option", {
          key: index,
          value: item.id
        }, item.name);
      };

      return fn;
    }
  }, {
    key: "getVariables",
    value: function getVariables(sons) {
      var variables = [];

      for (var i = 0; i < sons.length; i++) {
        var son = sons[i];

        if (son.sons) {
          if (son.sons[0]) {
            son.sons[0]._group = {
              id: son.id,
              name: son.name,
              type: son.type,
              comment: son.comment
            };
          }

          var variablesOut = this.getVariables(son.sons);

          for (var j = 0; j < variablesOut.length; j++) {
            var variableOut = variablesOut[j];
            variables.push(variableOut);
          }
        }

        if (son.variables) {
          for (var _j4 = 0; _j4 < son.variables.length; _j4++) {
            var variable = son.variables[_j4];

            if (_j4 == 0) {
              variable._group = {
                id: son.id,
                name: son.name,
                type: son.type,
                comment: son.comment
              };

              if (son._group) {
                var group = son._group;
                variable._group._group = {
                  id: group.id,
                  name: group.name,
                  type: group.type,
                  comment: group.comment
                };
              }
            }

            variable.is_variable = true;
            variables.push(variable);
          }
        }
      }

      return variables;
    }
  }, {
    key: "createMatrix",
    value: function createMatrix() {
      var self = this;

      var fn = function fn(s, mi) {
        var view = false;

        if (self.state.view == LIST_VIEW) {
          view = (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_list_view_jsx__WEBPACK_IMPORTED_MODULE_4__.default, {
            structure: s,
            first: mi,
            onListViewMin: self.handleListViewMin(),
            onTableView: self.handleTableView(),
            onTableViewCol: self.handleTableViewCol(),
            onChartView: self.handleChartView(),
            onOpenDynamicGraphicsGroup: self.handleOpenDynamicGraphicsGroup(mi),
            onOpenCommentGroup: self.handleOpenCommentGroup(),
            onOpenCommentVariable: self.handleOpenCommentVariable(),
            onChangeSoundVariable: self.handleChangeSoundVariable(mi)
          });
        } else if (self.state.view == LIST_VIEW_MIN) {
          view = (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_list_view_min_jsx__WEBPACK_IMPORTED_MODULE_5__.default, {
            structure: s,
            first: mi,
            onListView: self.handleListView(),
            onTableView: self.handleTableView(),
            onTableViewCol: self.handleTableViewCol(),
            onChartView: self.handleChartView(),
            onOpenDynamicGraphicsGroup: self.handleOpenDynamicGraphicsGroup(mi),
            onOpenCommentGroup: self.handleOpenCommentGroup(),
            onOpenCommentVariable: self.handleOpenCommentVariable(),
            onChangeSoundVariable: self.handleChangeSoundVariable(mi)
          });
        } else if (self.state.view == TABLE_VIEW) {
          view = (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_table_view_jsx__WEBPACK_IMPORTED_MODULE_6__.default, {
            structure: s,
            first: mi,
            onListView: self.handleListView(),
            onListViewMin: self.handleListViewMin(),
            onTableViewCol: self.handleTableViewCol(),
            onChartView: self.handleChartView(),
            onOpenCommentGroup: self.handleOpenCommentGroup(),
            onOpenCommentVariable: self.handleOpenCommentVariable(),
            onChangeSoundVariable: self.handleChangeSoundVariable(mi)
          });
        } else if (self.state.view == TABLE_VIEW_COL) {
          view = (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_table_view_col_jsx__WEBPACK_IMPORTED_MODULE_7__.default, {
            structure: s,
            first: mi,
            onListView: self.handleListView(),
            onListViewMin: self.handleListViewMin(),
            onTableView: self.handleTableView(),
            onChartView: self.handleChartView(),
            onLogAlarmsView: self.handleLogAlarmsView(),
            onOpenCommentGroup: self.handleOpenCommentGroup(),
            onOpenCommentVariable: self.handleOpenCommentVariable(),
            onChangeSoundVariable: self.handleChangeSoundVariable(mi)
          });
        } else if (self.state.view == CHART_VIEW) {
          view = (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_chart_view_jsx__WEBPACK_IMPORTED_MODULE_8__.default, {
            structure: s,
            first: mi,
            onListView: self.handleListView(),
            onListViewMin: self.handleListViewMin(),
            onTableView: self.handleTableView(),
            onTableViewCol: self.handleTableViewCol(),
            onOpenCommentGroup: self.handleOpenCommentGroup(),
            onOpenCommentVariable: self.handleOpenCommentVariable(),
            onChangeSoundVariable: self.handleChangeSoundVariable(mi)
          });
        }

        return view;
      };

      return fn;
    }
  }, {
    key: "render",
    value: function render(props, state) {
      var self = this;
      var structures = state.structures;
      var matrices = state.matrices;
      var notifications = state.notifications_;
      var comment_name = false;
      var comment = this.state.comment;

      if (comment) {
        if (comment.variable_id) {
          comment_name = "".concat(comment.device, ".").concat(comment.name);
        } else {
          comment_name = "".concat(comment.name);
        }
      }

      if (!matrices) matrices = [];
      if (!structures) structures = [];
      var o = {
        matrices_: state.matrices_,
        matrices: matrices
      };
      var contentClass = "contenedor_root animated fadeIn"; // SOLO PARA V2

      if (state.view == TABLE_VIEW_COL) {
        contentClass = "MatrizUpdateDVZ animated fadeIn";
      }

      var log_alarms_view = state.log_alarms_view;
      var log_alarms = state.log_alarms;
      if (!log_alarms) log_alarms = [];
      var footer_alarms = false;

      if (log_alarms.length > 0 && log_alarms_view) {
        footer_alarms = function () {
          return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("section", {
            className: "LogAlarms"
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
            className: "row"
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
            className: "col s12 m12"
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("table", {
            className: "responsive-table table-static-2",
            style: "border-collapse: collapse;"
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("thead", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("tr", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("th", null, "FECHA/HORA"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("th", null, "INSTALACI\xD3N"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("th", null, "VARIABLE"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("th", null, "VALOR"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("th", null, "MENSAJE"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("th", null))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("tbody", null, log_alarms.map(self.createLogAlarm()))))));
        }();
      }

      var footerVariables = false;
      var footer_variables = state.footer_variables;

      if (footer_variables.length > 0) {
        footerVariables = function () {
          return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("section", {
            className: "FooterDVZ"
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
            className: "row"
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
            className: "col s12 m12"
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("table", {
            className: "responsive-table",
            style: "border-collapse: collapse;"
          }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("thead", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("tr", null, footer_variables.map(self.createTitleFV()))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("tbody", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("tr", null, footer_variables.map(self.createItemFV())))))), footer_alarms);
        }();
      }

      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_header_jsx__WEBPACK_IMPORTED_MODULE_9__.default, {
        o: o,
        module: _constants_js__WEBPACK_IMPORTED_MODULE_10__.default.MATRIX_MODULE,
        notifications: notifications,
        onRestoreMatrix: this.handleRestoreMatrix(),
        onItemGroup: this.handleItemGroup(),
        onChangeMatrix: this.handleChangeMatrix(),
        onRemoveNotification: this.handleRemoveNotification()
      }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("section", {
        className: contentClass
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "matriz_clasica"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "row"
      }, structures.map(this.createMatrix()))), footerVariables), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "background"
      }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        id: "comentarios_macro",
        className: "modal modal_sesion"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "modal-content"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons animated fadeInDown"
      }, "announcement"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "modal_box animated fadeIn"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("h5", null, "Agregar un comentario a ", comment_name), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("form", {
        className: "formulario",
        onSubmit: this.handleChangeComment()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "input-field col s6"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
        placeholder: "Agrega un comentario",
        id: "input-comment",
        type: "text",
        className: "validate"
      })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
        type: "button",
        className: "modal-action modal-close btn btn_ttx_error darken-3"
      }, "Cancelar"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
        type: "submit",
        className: "modal-action modal-close btn btn_ttx_success"
      }, "Aceptar"))))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        id: "comentarios_log_alarm",
        className: "modal modal_sesion"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "modal-content"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons animated fadeInDown"
      }, "announcement"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "modal_box animated fadeIn"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("h5", null, "Agregar un comentario"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("form", {
        className: "formulario",
        onSubmit: this.handleCommentLogAlarm()
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "input-field col s6"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
        placeholder: "Agrega un comentario",
        id: "input-comment-log-alarm",
        type: "text",
        className: "validate"
      })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
        type: "button",
        className: "modal-action modal-close btn btn_ttx_error darken-3",
        onClick: this.handleLogAlarmClose()
      }, "Cancelar"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
        type: "submit",
        className: "modal-action modal-close btn btn_ttx_success"
      }, "Aceptar"))))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        id: "paro_remoto",
        className: "modal modal_sesion"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "modal-content"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "material-icons animated fadeInDown"
      }, "warning"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "modal_box animated fadeIn"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("h4", null, "PARO REMOTO"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("br", null), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("h5", null, "\xBFEst\xE1 seguro de que quieres realizar esta acci\xF3n?"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("br", null), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        href: "#!",
        className: "modal-action modal-close btn btn_ttx_error darken-3"
      }, "Cancelar"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
        href: "#!",
        className: "modal-action modal-close btn btn_ttx_success"
      }, "Aceptar")))));
    }
  }]);

  return Content;
}(preact__WEBPACK_IMPORTED_MODULE_0__.Component);

(0,preact__WEBPACK_IMPORTED_MODULE_0__.render)((0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(Content, null), document.getElementById('content-main'));
})();

/******/ })()
;
//# sourceMappingURL=matrices_module_m_sepec.js.map