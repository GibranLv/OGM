/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/operations_module/content.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/preact/dist/preact.esm.js":
/*!************************************************!*\
  !*** ./node_modules/preact/dist/preact.esm.js ***!
  \************************************************/
/*! exports provided: h, createElement, cloneElement, Component, render, rerender, options, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return cloneElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rerender", function() { return rerender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
/** Virtual DOM Node */
function VNode() {}

/** Global options
 *	@public
 *	@namespace options {Object}
 */
var options = {

	/** If `true`, `prop` changes trigger synchronous component updates.
  *	@name syncComponentUpdates
  *	@type Boolean
  *	@default true
  */
	//syncComponentUpdates: true,

	/** Processes all created VNodes.
  *	@param {VNode} vnode	A newly-created VNode to normalize/process
  */
	//vnode(vnode) { }

	/** Hook invoked after a component is mounted. */
	// afterMount(component) { }

	/** Hook invoked after the DOM is updated with a component's latest render. */
	// afterUpdate(component) { }

	/** Hook invoked immediately before a component is unmounted. */
	// beforeUnmount(component) { }
};

var stack = [];

var EMPTY_CHILDREN = [];

/**
 * JSX/hyperscript reviver.
 * @see http://jasonformat.com/wtf-is-jsx
 * Benchmarks: https://esbench.com/bench/57ee8f8e330ab09900a1a1a0
 *
 * Note: this is exported as both `h()` and `createElement()` for compatibility reasons.
 *
 * Creates a VNode (virtual DOM element). A tree of VNodes can be used as a lightweight representation
 * of the structure of a DOM tree. This structure can be realized by recursively comparing it against
 * the current _actual_ DOM structure, and applying only the differences.
 *
 * `h()`/`createElement()` accepts an element name, a list of attributes/props,
 * and optionally children to append to the element.
 *
 * @example The following DOM tree
 *
 * `<div id="foo" name="bar">Hello!</div>`
 *
 * can be constructed using this function as:
 *
 * `h('div', { id: 'foo', name : 'bar' }, 'Hello!');`
 *
 * @param {string} nodeName	An element name. Ex: `div`, `a`, `span`, etc.
 * @param {Object} attributes	Any attributes/props to set on the created element.
 * @param rest			Additional arguments are taken to be children to append. Can be infinitely nested Arrays.
 *
 * @public
 */
function h(nodeName, attributes) {
	var children = EMPTY_CHILDREN,
	    lastSimple,
	    child,
	    simple,
	    i;
	for (i = arguments.length; i-- > 2;) {
		stack.push(arguments[i]);
	}
	if (attributes && attributes.children != null) {
		if (!stack.length) stack.push(attributes.children);
		delete attributes.children;
	}
	while (stack.length) {
		if ((child = stack.pop()) && child.pop !== undefined) {
			for (i = child.length; i--;) {
				stack.push(child[i]);
			}
		} else {
			if (typeof child === 'boolean') child = null;

			if (simple = typeof nodeName !== 'function') {
				if (child == null) child = '';else if (typeof child === 'number') child = String(child);else if (typeof child !== 'string') simple = false;
			}

			if (simple && lastSimple) {
				children[children.length - 1] += child;
			} else if (children === EMPTY_CHILDREN) {
				children = [child];
			} else {
				children.push(child);
			}

			lastSimple = simple;
		}
	}

	var p = new VNode();
	p.nodeName = nodeName;
	p.children = children;
	p.attributes = attributes == null ? undefined : attributes;
	p.key = attributes == null ? undefined : attributes.key;

	// if a "vnode hook" is defined, pass every created VNode to it
	if (options.vnode !== undefined) options.vnode(p);

	return p;
}

/**
 *  Copy all properties from `props` onto `obj`.
 *  @param {Object} obj		Object onto which properties should be copied.
 *  @param {Object} props	Object from which to copy properties.
 *  @returns obj
 *  @private
 */
function extend(obj, props) {
  for (var i in props) {
    obj[i] = props[i];
  }return obj;
}

/**
 * Call a function asynchronously, as soon as possible. Makes
 * use of HTML Promise to schedule the callback if available,
 * otherwise falling back to `setTimeout` (mainly for IE<11).
 *
 * @param {Function} callback
 */
var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

/**
 * Clones the given VNode, optionally adding attributes/props and replacing its children.
 * @param {VNode} vnode		The virutal DOM element to clone
 * @param {Object} props	Attributes/props to add when cloning
 * @param {VNode} rest		Any additional arguments will be used as replacement children.
 */
function cloneElement(vnode, props) {
  return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
}

// DOM properties that should NOT have "px" added when numeric
var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

/** Managed queue of dirty components to be re-rendered */

var items = [];

function enqueueRender(component) {
	if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
		(options.debounceRendering || defer)(rerender);
	}
}

function rerender() {
	var p,
	    list = items;
	items = [];
	while (p = list.pop()) {
		if (p._dirty) renderComponent(p);
	}
}

/**
 * Check if two nodes are equivalent.
 *
 * @param {Node} node			DOM Node to compare
 * @param {VNode} vnode			Virtual DOM node to compare
 * @param {boolean} [hyrdating=false]	If true, ignores component constructors when comparing.
 * @private
 */
function isSameNodeType(node, vnode, hydrating) {
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return node.splitText !== undefined;
  }
  if (typeof vnode.nodeName === 'string') {
    return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
  }
  return hydrating || node._componentConstructor === vnode.nodeName;
}

/**
 * Check if an Element has a given nodeName, case-insensitively.
 *
 * @param {Element} node	A DOM Element to inspect the name of.
 * @param {String} nodeName	Unnormalized name to compare against.
 */
function isNamedNode(node, nodeName) {
  return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
}

/**
 * Reconstruct Component-style `props` from a VNode.
 * Ensures default/fallback values from `defaultProps`:
 * Own-properties of `defaultProps` not present in `vnode.attributes` are added.
 *
 * @param {VNode} vnode
 * @returns {Object} props
 */
function getNodeProps(vnode) {
  var props = extend({}, vnode.attributes);
  props.children = vnode.children;

  var defaultProps = vnode.nodeName.defaultProps;
  if (defaultProps !== undefined) {
    for (var i in defaultProps) {
      if (props[i] === undefined) {
        props[i] = defaultProps[i];
      }
    }
  }

  return props;
}

/** Create an element with the given nodeName.
 *	@param {String} nodeName
 *	@param {Boolean} [isSvg=false]	If `true`, creates an element within the SVG namespace.
 *	@returns {Element} node
 */
function createNode(nodeName, isSvg) {
	var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
	node.normalizedNodeName = nodeName;
	return node;
}

/** Remove a child node from its parent if attached.
 *	@param {Element} node		The node to remove
 */
function removeNode(node) {
	var parentNode = node.parentNode;
	if (parentNode) parentNode.removeChild(node);
}

/** Set a named attribute on the given Node, with special behavior for some names and event handlers.
 *	If `value` is `null`, the attribute/handler will be removed.
 *	@param {Element} node	An element to mutate
 *	@param {string} name	The name/key to set, such as an event or attribute name
 *	@param {any} old	The last value that was set for this name/node pair
 *	@param {any} value	An attribute value, such as a function to be used as an event handler
 *	@param {Boolean} isSvg	Are we currently diffing inside an svg?
 *	@private
 */
function setAccessor(node, name, old, value, isSvg) {
	if (name === 'className') name = 'class';

	if (name === 'key') {
		// ignore
	} else if (name === 'ref') {
		if (old) old(null);
		if (value) value(node);
	} else if (name === 'class' && !isSvg) {
		node.className = value || '';
	} else if (name === 'style') {
		if (!value || typeof value === 'string' || typeof old === 'string') {
			node.style.cssText = value || '';
		}
		if (value && typeof value === 'object') {
			if (typeof old !== 'string') {
				for (var i in old) {
					if (!(i in value)) node.style[i] = '';
				}
			}
			for (var i in value) {
				node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
			}
		}
	} else if (name === 'dangerouslySetInnerHTML') {
		if (value) node.innerHTML = value.__html || '';
	} else if (name[0] == 'o' && name[1] == 'n') {
		var useCapture = name !== (name = name.replace(/Capture$/, ''));
		name = name.toLowerCase().substring(2);
		if (value) {
			if (!old) node.addEventListener(name, eventProxy, useCapture);
		} else {
			node.removeEventListener(name, eventProxy, useCapture);
		}
		(node._listeners || (node._listeners = {}))[name] = value;
	} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
		setProperty(node, name, value == null ? '' : value);
		if (value == null || value === false) node.removeAttribute(name);
	} else {
		var ns = isSvg && name !== (name = name.replace(/^xlink\:?/, ''));
		if (value == null || value === false) {
			if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
		} else if (typeof value !== 'function') {
			if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
		}
	}
}

/** Attempt to set a DOM property to the given value.
 *	IE & FF throw for certain property-value combinations.
 */
function setProperty(node, name, value) {
	try {
		node[name] = value;
	} catch (e) {}
}

/** Proxy an event to hooked event handlers
 *	@private
 */
function eventProxy(e) {
	return this._listeners[e.type](options.event && options.event(e) || e);
}

/** Queue of components that have been mounted and are awaiting componentDidMount */
var mounts = [];

/** Diff recursion count, used to track the end of the diff cycle. */
var diffLevel = 0;

/** Global flag indicating if the diff is currently within an SVG */
var isSvgMode = false;

/** Global flag indicating if the diff is performing hydration */
var hydrating = false;

/** Invoke queued componentDidMount lifecycle methods */
function flushMounts() {
	var c;
	while (c = mounts.pop()) {
		if (options.afterMount) options.afterMount(c);
		if (c.componentDidMount) c.componentDidMount();
	}
}

/** Apply differences in a given vnode (and it's deep children) to a real DOM Node.
 *	@param {Element} [dom=null]		A DOM node to mutate into the shape of the `vnode`
 *	@param {VNode} vnode			A VNode (with descendants forming a tree) representing the desired DOM structure
 *	@returns {Element} dom			The created/mutated element
 *	@private
 */
function diff(dom, vnode, context, mountAll, parent, componentRoot) {
	// diffLevel having been 0 here indicates initial entry into the diff (not a subdiff)
	if (!diffLevel++) {
		// when first starting the diff, check if we're diffing an SVG or within an SVG
		isSvgMode = parent != null && parent.ownerSVGElement !== undefined;

		// hydration is indicated by the existing element to be diffed not having a prop cache
		hydrating = dom != null && !('__preactattr_' in dom);
	}

	var ret = idiff(dom, vnode, context, mountAll, componentRoot);

	// append the element if its a new parent
	if (parent && ret.parentNode !== parent) parent.appendChild(ret);

	// diffLevel being reduced to 0 means we're exiting the diff
	if (! --diffLevel) {
		hydrating = false;
		// invoke queued componentDidMount lifecycle methods
		if (!componentRoot) flushMounts();
	}

	return ret;
}

/** Internals of `diff()`, separated to allow bypassing diffLevel / mount flushing. */
function idiff(dom, vnode, context, mountAll, componentRoot) {
	var out = dom,
	    prevSvgMode = isSvgMode;

	// empty values (null, undefined, booleans) render as empty Text nodes
	if (vnode == null || typeof vnode === 'boolean') vnode = '';

	// Fast case: Strings & Numbers create/update Text nodes.
	if (typeof vnode === 'string' || typeof vnode === 'number') {

		// update if it's already a Text node:
		if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
			/* istanbul ignore if */ /* Browser quirk that can't be covered: https://github.com/developit/preact/commit/fd4f21f5c45dfd75151bd27b4c217d8003aa5eb9 */
			if (dom.nodeValue != vnode) {
				dom.nodeValue = vnode;
			}
		} else {
			// it wasn't a Text node: replace it with one and recycle the old Element
			out = document.createTextNode(vnode);
			if (dom) {
				if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
				recollectNodeTree(dom, true);
			}
		}

		out['__preactattr_'] = true;

		return out;
	}

	// If the VNode represents a Component, perform a component diff:
	var vnodeName = vnode.nodeName;
	if (typeof vnodeName === 'function') {
		return buildComponentFromVNode(dom, vnode, context, mountAll);
	}

	// Tracks entering and exiting SVG namespace when descending through the tree.
	isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;

	// If there's no existing element or it's the wrong type, create a new one:
	vnodeName = String(vnodeName);
	if (!dom || !isNamedNode(dom, vnodeName)) {
		out = createNode(vnodeName, isSvgMode);

		if (dom) {
			// move children into the replacement node
			while (dom.firstChild) {
				out.appendChild(dom.firstChild);
			} // if the previous Element was mounted into the DOM, replace it inline
			if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

			// recycle the old element (skips non-Element node types)
			recollectNodeTree(dom, true);
		}
	}

	var fc = out.firstChild,
	    props = out['__preactattr_'],
	    vchildren = vnode.children;

	if (props == null) {
		props = out['__preactattr_'] = {};
		for (var a = out.attributes, i = a.length; i--;) {
			props[a[i].name] = a[i].value;
		}
	}

	// Optimization: fast-path for elements containing a single TextNode:
	if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
		if (fc.nodeValue != vchildren[0]) {
			fc.nodeValue = vchildren[0];
		}
	}
	// otherwise, if there are existing or new children, diff them:
	else if (vchildren && vchildren.length || fc != null) {
			innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
		}

	// Apply attributes/props from VNode to the DOM Element:
	diffAttributes(out, vnode.attributes, props);

	// restore previous SVG mode: (in case we're exiting an SVG namespace)
	isSvgMode = prevSvgMode;

	return out;
}

/** Apply child and attribute changes between a VNode and a DOM Node to the DOM.
 *	@param {Element} dom			Element whose children should be compared & mutated
 *	@param {Array} vchildren		Array of VNodes to compare to `dom.childNodes`
 *	@param {Object} context			Implicitly descendant context object (from most recent `getChildContext()`)
 *	@param {Boolean} mountAll
 *	@param {Boolean} isHydrating	If `true`, consumes externally created elements similar to hydration
 */
function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
	var originalChildren = dom.childNodes,
	    children = [],
	    keyed = {},
	    keyedLen = 0,
	    min = 0,
	    len = originalChildren.length,
	    childrenLen = 0,
	    vlen = vchildren ? vchildren.length : 0,
	    j,
	    c,
	    f,
	    vchild,
	    child;

	// Build up a map of keyed children and an Array of unkeyed children:
	if (len !== 0) {
		for (var i = 0; i < len; i++) {
			var _child = originalChildren[i],
			    props = _child['__preactattr_'],
			    key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
			if (key != null) {
				keyedLen++;
				keyed[key] = _child;
			} else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
				children[childrenLen++] = _child;
			}
		}
	}

	if (vlen !== 0) {
		for (var i = 0; i < vlen; i++) {
			vchild = vchildren[i];
			child = null;

			// attempt to find a node based on key matching
			var key = vchild.key;
			if (key != null) {
				if (keyedLen && keyed[key] !== undefined) {
					child = keyed[key];
					keyed[key] = undefined;
					keyedLen--;
				}
			}
			// attempt to pluck a node of the same type from the existing children
			else if (!child && min < childrenLen) {
					for (j = min; j < childrenLen; j++) {
						if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
							child = c;
							children[j] = undefined;
							if (j === childrenLen - 1) childrenLen--;
							if (j === min) min++;
							break;
						}
					}
				}

			// morph the matched/found/created DOM child to match vchild (deep)
			child = idiff(child, vchild, context, mountAll);

			f = originalChildren[i];
			if (child && child !== dom && child !== f) {
				if (f == null) {
					dom.appendChild(child);
				} else if (child === f.nextSibling) {
					removeNode(f);
				} else {
					dom.insertBefore(child, f);
				}
			}
		}
	}

	// remove unused keyed children:
	if (keyedLen) {
		for (var i in keyed) {
			if (keyed[i] !== undefined) recollectNodeTree(keyed[i], false);
		}
	}

	// remove orphaned unkeyed children:
	while (min <= childrenLen) {
		if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false);
	}
}

/** Recursively recycle (or just unmount) a node and its descendants.
 *	@param {Node} node						DOM node to start unmount/removal from
 *	@param {Boolean} [unmountOnly=false]	If `true`, only triggers unmount lifecycle, skips removal
 */
function recollectNodeTree(node, unmountOnly) {
	var component = node._component;
	if (component) {
		// if node is owned by a Component, unmount that component (ends up recursing back here)
		unmountComponent(component);
	} else {
		// If the node's VNode had a ref function, invoke it with null here.
		// (this is part of the React spec, and smart for unsetting references)
		if (node['__preactattr_'] != null && node['__preactattr_'].ref) node['__preactattr_'].ref(null);

		if (unmountOnly === false || node['__preactattr_'] == null) {
			removeNode(node);
		}

		removeChildren(node);
	}
}

/** Recollect/unmount all children.
 *	- we use .lastChild here because it causes less reflow than .firstChild
 *	- it's also cheaper than accessing the .childNodes Live NodeList
 */
function removeChildren(node) {
	node = node.lastChild;
	while (node) {
		var next = node.previousSibling;
		recollectNodeTree(node, true);
		node = next;
	}
}

/** Apply differences in attributes from a VNode to the given DOM Element.
 *	@param {Element} dom		Element with attributes to diff `attrs` against
 *	@param {Object} attrs		The desired end-state key-value attribute pairs
 *	@param {Object} old			Current/previous attributes (from previous VNode or element's prop cache)
 */
function diffAttributes(dom, attrs, old) {
	var name;

	// remove attributes no longer present on the vnode by setting them to undefined
	for (name in old) {
		if (!(attrs && attrs[name] != null) && old[name] != null) {
			setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
		}
	}

	// add new & update changed attributes
	for (name in attrs) {
		if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
			setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
		}
	}
}

/** Retains a pool of Components for re-use, keyed on component name.
 *	Note: since component names are not unique or even necessarily available, these are primarily a form of sharding.
 *	@private
 */
var components = {};

/** Reclaim a component for later re-use by the recycler. */
function collectComponent(component) {
	var name = component.constructor.name;
	(components[name] || (components[name] = [])).push(component);
}

/** Create a component. Normalizes differences between PFC's and classful Components. */
function createComponent(Ctor, props, context) {
	var list = components[Ctor.name],
	    inst;

	if (Ctor.prototype && Ctor.prototype.render) {
		inst = new Ctor(props, context);
		Component.call(inst, props, context);
	} else {
		inst = new Component(props, context);
		inst.constructor = Ctor;
		inst.render = doRender;
	}

	if (list) {
		for (var i = list.length; i--;) {
			if (list[i].constructor === Ctor) {
				inst.nextBase = list[i].nextBase;
				list.splice(i, 1);
				break;
			}
		}
	}
	return inst;
}

/** The `.render()` method for a PFC backing instance. */
function doRender(props, state, context) {
	return this.constructor(props, context);
}

/** Set a component's `props` (generally derived from JSX attributes).
 *	@param {Object} props
 *	@param {Object} [opts]
 *	@param {boolean} [opts.renderSync=false]	If `true` and {@link options.syncComponentUpdates} is `true`, triggers synchronous rendering.
 *	@param {boolean} [opts.render=true]			If `false`, no render will be triggered.
 */
function setComponentProps(component, props, opts, context, mountAll) {
	if (component._disable) return;
	component._disable = true;

	if (component.__ref = props.ref) delete props.ref;
	if (component.__key = props.key) delete props.key;

	if (!component.base || mountAll) {
		if (component.componentWillMount) component.componentWillMount();
	} else if (component.componentWillReceiveProps) {
		component.componentWillReceiveProps(props, context);
	}

	if (context && context !== component.context) {
		if (!component.prevContext) component.prevContext = component.context;
		component.context = context;
	}

	if (!component.prevProps) component.prevProps = component.props;
	component.props = props;

	component._disable = false;

	if (opts !== 0) {
		if (opts === 1 || options.syncComponentUpdates !== false || !component.base) {
			renderComponent(component, 1, mountAll);
		} else {
			enqueueRender(component);
		}
	}

	if (component.__ref) component.__ref(component);
}

/** Render a Component, triggering necessary lifecycle events and taking High-Order Components into account.
 *	@param {Component} component
 *	@param {Object} [opts]
 *	@param {boolean} [opts.build=false]		If `true`, component will build and store a DOM node if not already associated with one.
 *	@private
 */
function renderComponent(component, opts, mountAll, isChild) {
	if (component._disable) return;

	var props = component.props,
	    state = component.state,
	    context = component.context,
	    previousProps = component.prevProps || props,
	    previousState = component.prevState || state,
	    previousContext = component.prevContext || context,
	    isUpdate = component.base,
	    nextBase = component.nextBase,
	    initialBase = isUpdate || nextBase,
	    initialChildComponent = component._component,
	    skip = false,
	    rendered,
	    inst,
	    cbase;

	// if updating
	if (isUpdate) {
		component.props = previousProps;
		component.state = previousState;
		component.context = previousContext;
		if (opts !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
			skip = true;
		} else if (component.componentWillUpdate) {
			component.componentWillUpdate(props, state, context);
		}
		component.props = props;
		component.state = state;
		component.context = context;
	}

	component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
	component._dirty = false;

	if (!skip) {
		rendered = component.render(props, state, context);

		// context to pass to the child, can be updated via (grand-)parent component
		if (component.getChildContext) {
			context = extend(extend({}, context), component.getChildContext());
		}

		var childComponent = rendered && rendered.nodeName,
		    toUnmount,
		    base;

		if (typeof childComponent === 'function') {
			// set up high order component link

			var childProps = getNodeProps(rendered);
			inst = initialChildComponent;

			if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
				setComponentProps(inst, childProps, 1, context, false);
			} else {
				toUnmount = inst;

				component._component = inst = createComponent(childComponent, childProps, context);
				inst.nextBase = inst.nextBase || nextBase;
				inst._parentComponent = component;
				setComponentProps(inst, childProps, 0, context, false);
				renderComponent(inst, 1, mountAll, true);
			}

			base = inst.base;
		} else {
			cbase = initialBase;

			// destroy high order component link
			toUnmount = initialChildComponent;
			if (toUnmount) {
				cbase = component._component = null;
			}

			if (initialBase || opts === 1) {
				if (cbase) cbase._component = null;
				base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
			}
		}

		if (initialBase && base !== initialBase && inst !== initialChildComponent) {
			var baseParent = initialBase.parentNode;
			if (baseParent && base !== baseParent) {
				baseParent.replaceChild(base, initialBase);

				if (!toUnmount) {
					initialBase._component = null;
					recollectNodeTree(initialBase, false);
				}
			}
		}

		if (toUnmount) {
			unmountComponent(toUnmount);
		}

		component.base = base;
		if (base && !isChild) {
			var componentRef = component,
			    t = component;
			while (t = t._parentComponent) {
				(componentRef = t).base = base;
			}
			base._component = componentRef;
			base._componentConstructor = componentRef.constructor;
		}
	}

	if (!isUpdate || mountAll) {
		mounts.unshift(component);
	} else if (!skip) {
		// Ensure that pending componentDidMount() hooks of child components
		// are called before the componentDidUpdate() hook in the parent.
		// Note: disabled as it causes duplicate hooks, see https://github.com/developit/preact/issues/750
		// flushMounts();

		if (component.componentDidUpdate) {
			component.componentDidUpdate(previousProps, previousState, previousContext);
		}
		if (options.afterUpdate) options.afterUpdate(component);
	}

	if (component._renderCallbacks != null) {
		while (component._renderCallbacks.length) {
			component._renderCallbacks.pop().call(component);
		}
	}

	if (!diffLevel && !isChild) flushMounts();
}

/** Apply the Component referenced by a VNode to the DOM.
 *	@param {Element} dom	The DOM node to mutate
 *	@param {VNode} vnode	A Component-referencing VNode
 *	@returns {Element} dom	The created/mutated element
 *	@private
 */
function buildComponentFromVNode(dom, vnode, context, mountAll) {
	var c = dom && dom._component,
	    originalComponent = c,
	    oldDom = dom,
	    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
	    isOwner = isDirectOwner,
	    props = getNodeProps(vnode);
	while (c && !isOwner && (c = c._parentComponent)) {
		isOwner = c.constructor === vnode.nodeName;
	}

	if (c && isOwner && (!mountAll || c._component)) {
		setComponentProps(c, props, 3, context, mountAll);
		dom = c.base;
	} else {
		if (originalComponent && !isDirectOwner) {
			unmountComponent(originalComponent);
			dom = oldDom = null;
		}

		c = createComponent(vnode.nodeName, props, context);
		if (dom && !c.nextBase) {
			c.nextBase = dom;
			// passing dom/oldDom as nextBase will recycle it if unused, so bypass recycling on L229:
			oldDom = null;
		}
		setComponentProps(c, props, 1, context, mountAll);
		dom = c.base;

		if (oldDom && dom !== oldDom) {
			oldDom._component = null;
			recollectNodeTree(oldDom, false);
		}
	}

	return dom;
}

/** Remove a component from the DOM and recycle it.
 *	@param {Component} component	The Component instance to unmount
 *	@private
 */
function unmountComponent(component) {
	if (options.beforeUnmount) options.beforeUnmount(component);

	var base = component.base;

	component._disable = true;

	if (component.componentWillUnmount) component.componentWillUnmount();

	component.base = null;

	// recursively tear down & recollect high-order component children:
	var inner = component._component;
	if (inner) {
		unmountComponent(inner);
	} else if (base) {
		if (base['__preactattr_'] && base['__preactattr_'].ref) base['__preactattr_'].ref(null);

		component.nextBase = base;

		removeNode(base);
		collectComponent(component);

		removeChildren(base);
	}

	if (component.__ref) component.__ref(null);
}

/** Base Component class.
 *	Provides `setState()` and `forceUpdate()`, which trigger rendering.
 *	@public
 *
 *	@example
 *	class MyFoo extends Component {
 *		render(props, state) {
 *			return <div />;
 *		}
 *	}
 */
function Component(props, context) {
	this._dirty = true;

	/** @public
  *	@type {object}
  */
	this.context = context;

	/** @public
  *	@type {object}
  */
	this.props = props;

	/** @public
  *	@type {object}
  */
	this.state = this.state || {};
}

extend(Component.prototype, {

	/** Returns a `boolean` indicating if the component should re-render when receiving the given `props` and `state`.
  *	@param {object} nextProps
  *	@param {object} nextState
  *	@param {object} nextContext
  *	@returns {Boolean} should the component re-render
  *	@name shouldComponentUpdate
  *	@function
  */

	/** Update component state by copying properties from `state` to `this.state`.
  *	@param {object} state		A hash of state properties to update with new values
  *	@param {function} callback	A function to be called once component state is updated
  */
	setState: function setState(state, callback) {
		var s = this.state;
		if (!this.prevState) this.prevState = extend({}, s);
		extend(s, typeof state === 'function' ? state(s, this.props) : state);
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		enqueueRender(this);
	},


	/** Immediately perform a synchronous re-render of the component.
  *	@param {function} callback		A function to be called after component is re-rendered.
  *	@private
  */
	forceUpdate: function forceUpdate(callback) {
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		renderComponent(this, 2);
	},


	/** Accepts `props` and `state`, and returns a new Virtual DOM tree to build.
  *	Virtual DOM is generally constructed via [JSX](http://jasonformat.com/wtf-is-jsx).
  *	@param {object} props		Props (eg: JSX attributes) received from parent element/component
  *	@param {object} state		The component's current state
  *	@param {object} context		Context object (if a parent component has provided context)
  *	@returns VNode
  */
	render: function render() {}
});

/** Render JSX into a `parent` Element.
 *	@param {VNode} vnode		A (JSX) VNode to render
 *	@param {Element} parent		DOM element to render into
 *	@param {Element} [merge]	Attempt to re-use an existing DOM tree rooted at `merge`
 *	@public
 *
 *	@example
 *	// render a div into <body>:
 *	render(<div id="hello">hello!</div>, document.body);
 *
 *	@example
 *	// render a "Thing" component into #foo:
 *	const Thing = ({ name }) => <span>{ name }</span>;
 *	render(<Thing name="one" />, document.querySelector('#foo'));
 */
function render(vnode, parent, merge) {
  return diff(merge, vnode, {}, false, parent, false);
}

var preact = {
	h: h,
	createElement: h,
	cloneElement: cloneElement,
	Component: Component,
	render: render,
	rerender: rerender,
	options: options
};


/* harmony default export */ __webpack_exports__["default"] = (preact);
//# sourceMappingURL=preact.esm.js.map


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/underscore/underscore.js":
/*!***********************************************!*\
  !*** ./node_modules/underscore/underscore.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (true) {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {}

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
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
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
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
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
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
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
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
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

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
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
      return _;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}.call(this));


/***/ }),

/***/ "./node_modules/util/node_modules/inherits/inherits_browser.js":
/*!*********************************************************************!*\
  !*** ./node_modules/util/node_modules/inherits/inherits_browser.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ "./node_modules/util/support/isBufferBrowser.js":
/*!******************************************************!*\
  !*** ./node_modules/util/support/isBufferBrowser.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "./node_modules/util/util.js":
/*!***********************************!*\
  !*** ./node_modules/util/util.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
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

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "./node_modules/util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(/*! inherits */ "./node_modules/util/node_modules/inherits/inherits_browser.js");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

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

}, _defineProperty(_constants, 'TYPE_VALUE_ALARM', 1), _defineProperty(_constants, 'WARNING_SOUND', '/static/media/warning.mp3'), _defineProperty(_constants, 'DANGER_SOUND', '/static/media/danger.mp3'), _defineProperty(_constants, 'TIMEOUT_SOUND', '/static/media/timeout.mp3'), _defineProperty(_constants, 'EXT_DOC', 'doc'), _defineProperty(_constants, 'EXT_DOCX', 'docx'), _defineProperty(_constants, 'EXT_GIF', 'gif'), _defineProperty(_constants, 'EXT_JPEG', 'jpeg'), _defineProperty(_constants, 'EXT_JPG', 'jpg'), _defineProperty(_constants, 'EXT_MIDI', 'midi'), _defineProperty(_constants, 'EXT_MP3', 'mp3'), _defineProperty(_constants, 'EXT_MP4', 'mp4'), _defineProperty(_constants, 'EXT_PDF', 'pdf'), _defineProperty(_constants, 'EXT_PNG', 'png'), _defineProperty(_constants, 'EXT_PPT', 'ppt'), _defineProperty(_constants, 'EXT_PPTX', 'pptx'), _defineProperty(_constants, 'EXT_PUB', 'pub'), _defineProperty(_constants, 'EXT_RAR', 'rar'), _defineProperty(_constants, 'EXT_TXT', 'txt'), _defineProperty(_constants, 'EXT_VSD', 'vsd'), _defineProperty(_constants, 'EXT_WAV', 'wav'), _defineProperty(_constants, 'EXT_XLS', 'xls'), _defineProperty(_constants, 'EXT_XLSX', 'xlsx'), _defineProperty(_constants, 'EXT_ZIP', 'zip'), _defineProperty(_constants, 'STATUS_OK', 200), _defineProperty(_constants, 'STATUS_CREATED', 201), _defineProperty(_constants, 'STATUS_ACCEPTED', 202), _defineProperty(_constants, 'METHOD_GET', 'GET'), _defineProperty(_constants, 'METHOD_POST', 'POST'), _defineProperty(_constants, 'METHOD_PUT', 'PUT'), _defineProperty(_constants, 'METHOD_DELETE', 'DELETE'), _defineProperty(_constants, 'JSON', 'json'), _defineProperty(_constants, 'APPLICATION_JSON', 'application/json'), _defineProperty(_constants, 'ACCESS_TOKEN_WS', 'access_token_ws'), _defineProperty(_constants, 'ACCESS_TOKEN_WSA', 'access_token_wsa'), _defineProperty(_constants, 'ACCESS_TOKEN_WSE', 'access_token_wse'), _defineProperty(_constants, 'TTX_PROTOCOOL', 'ttx-protocol'), _defineProperty(_constants, 'MARKER_ICON', 'marker_icon'), _defineProperty(_constants, 'TEMPLATE', 'template'), _defineProperty(_constants, 'NA', 'N/A'), _defineProperty(_constants, 'MESSAGE_SAVED_OK', 'Los cambios se guardaron correctamente'), _defineProperty(_constants, 'MESSAGE_ERROR', 'Ocurrió un error al solicitar la información'), _defineProperty(_constants, 'LIMIT_FOR_RECONNECTION', 3), _defineProperty(_constants, 'ROLES', ["Administrador General", "Administrador de Sistema", "Administrador", "Operador", "Invitado"]), _constants);

exports.default = constants;

/***/ }),

/***/ "./src/header.jsx":
/*!************************!*\
  !*** ./src/header.jsx ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.esm.js");

var _menuLateral = __webpack_require__(/*! ./matrix_module/menu-lateral.jsx */ "./src/matrix_module/menu-lateral.jsx");

var _menuLateral2 = _interopRequireDefault(_menuLateral);

var _menuLateral3 = __webpack_require__(/*! ./location_module/menu-lateral.jsx */ "./src/location_module/menu-lateral.jsx");

var _menuLateral4 = _interopRequireDefault(_menuLateral3);

var _menuLateral5 = __webpack_require__(/*! ./locator_module/menu-lateral.jsx */ "./src/locator_module/menu-lateral.jsx");

var _menuLateral6 = _interopRequireDefault(_menuLateral5);

var _notificationItem = __webpack_require__(/*! ./matrix_module/notification-item.jsx */ "./src/matrix_module/notification-item.jsx");

var _notificationItem2 = _interopRequireDefault(_notificationItem);

var _constants = __webpack_require__(/*! ./constants */ "./src/constants.js");

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PROFILE = 1;
var CONFIGURATION = 2;
var LOGOUT = 3;

var Header = function (_Component) {
  _inherits(Header, _Component);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

    _this.state = {
      isOpenNotifications: false
    };
    return _this;
  }

  _createClass(Header, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'handleOpenMenu',
    value: function handleOpenMenu() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();

        $('#bar_notific').animate({ marginRight: '-300px' }, 100);
        $('#sbar_config').animate({ marginRight: '-300px' }, 100);
      };

      return fn;
    }
  }, {
    key: 'handleOpenConfigMenu',
    value: function handleOpenConfigMenu() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();

        $('#sbar_config').animate({ marginRight: '0px' }, 100);
      };

      return fn;
    }
  }, {
    key: 'handleCloseConfigMenu',
    value: function handleCloseConfigMenu() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        $('#sbar_config').animate({ marginRight: '-300px' }, 100);
      };

      return fn;
    }
  }, {
    key: 'handleOpenNotifications',
    value: function handleOpenNotifications() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();

        $('#bar_notific').animate({ marginRight: '0px' }, 100);
      };

      return fn;
    }
  }, {
    key: 'handleCloseNotifications',
    value: function handleCloseNotifications() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        $('#bar_notific').animate({ marginRight: '-300px' }, 100);
      };

      return fn;
    }
  }, {
    key: 'handleRemoveNotification',
    value: function handleRemoveNotification() {
      var self = this;

      var fn = function fn(id) {
        var f = self.props.onRemoveNotification;
        if (f) f(id);
      };

      return fn;
    }
  }, {
    key: 'createItemNotification',
    value: function createItemNotification() {
      var _this2 = this;

      var self = this;

      var fn = function fn(item) {
        return (0, _preact.h)(_notificationItem2.default, { notification: item, onRemove: _this2.handleRemoveNotification() });
      };

      return fn;
    }

    /* Header: Matriz */

  }, {
    key: 'handleRestoreMatrix',
    value: function handleRestoreMatrix() {
      var self = this;

      var fn = function fn(structure, mi) {
        var f = self.props.onRestoreMatrix;
        if (f) f(structure, mi);
      };

      return fn;
    }
  }, {
    key: 'handleItemGroup',
    value: function handleItemGroup() {
      var self = this;

      var fn = function fn(structure, mi) {
        var f = self.props.onItemGroup;
        if (f) f(structure, mi);
      };

      return fn;
    }
  }, {
    key: 'handleChangeMatrix',
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
    key: 'handleRestoreMatrixLocation',
    value: function handleRestoreMatrixLocation() {
      var self = this;

      var fn = function fn(structure) {
        var f = self.props.onRestoreMatrix;
        if (f) f(structure);
      };

      return fn;
    }
  }, {
    key: 'handleItemGroupLocation',
    value: function handleItemGroupLocation() {
      var self = this;

      var fn = function fn(structure) {
        var f = self.props.onItemGroup;
        if (f) f(structure);
      };

      return fn;
    }
  }, {
    key: 'handleChangeMatrixLocation',
    value: function handleChangeMatrixLocation() {
      var self = this;

      var fn = function fn(m, s) {
        self.setState({ matrix: m, structure: s }, function () {
          var f = self.props.onChangeMatrix;
          if (f) f(m, s);
        });
      };

      return fn;
    }
    /* Header: Ubicación */

    /* Header: Localización de Pozos */

  }, {
    key: 'handleItemVehicle',
    value: function handleItemVehicle() {
      var self = this;

      var fn = function fn(vehicle) {
        var f = self.props.onItemVehicle(vehicle);
        if (f) f();
      };

      return fn;
    }
  }, {
    key: 'handleItemVehicleReport',
    value: function handleItemVehicleReport() {
      var self = this;

      var fn = function fn(vehicle) {
        var f = self.props.onItemVehicleReport(vehicle);
        if (f) f();
      };

      return fn;
    }
  }, {
    key: 'updateVisibilityVehicle',
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
    key: 'render',
    value: function render(props, state) {
      var srcAvatar = '/static/images/avatars/default.png';
      if (USER_AVATAR != '') srcAvatar = '/static/images/avatars/' + USER_AVATAR;

      var module = this.props.module;
      var menuLateral = false;
      var notifications = [];

      var itemMenuDashboard = false;
      if (window.SYSTEM_HOST === "diavaz.technotex.com") {
        itemMenuDashboard = function () {
          return (0, _preact.h)(
            'li',
            null,
            (0, _preact.h)(
              'a',
              { href: '/dashboard' },
              (0, _preact.h)(
                'i',
                { className: 'material-icons' },
                'dashboard'
              ),
              ' Dashboard'
            )
          );
        }();
      }

      if (module == _constants2.default.MATRIX_MODULE) {
        var o = props.o;

        menuLateral = (0, _preact.h)(_menuLateral2.default, { o: o,
          onRestoreMatrix: this.handleRestoreMatrix(),
          onItemGroup: this.handleItemGroup(),
          onChangeMatrix: this.handleChangeMatrix() });
      } else if (module == _constants2.default.LOCATION_MODULE) {
        var _o = props.o;

        menuLateral = (0, _preact.h)(_menuLateral4.default, { o: _o,
          onRestoreMatrix: this.handleRestoreMatrixLocation(),
          onItemGroup: this.handleItemGroupLocation(),
          onChangeMatrix: this.handleChangeMatrixLocation() });
      } else if (module == _constants2.default.LOCATOR_MODULE) {
        var _o2 = props.o;

        menuLateral = (0, _preact.h)(_menuLateral6.default, { o: _o2,
          onItemVehicle: this.handleItemVehicle(),
          onItemVehicleReport: this.handleItemVehicleReport(),
          onUpdateVisibilityVehicle: this.updateVisibilityVehicle() });
      }

      if (props.notifications) {
        notifications = props.notifications;
      }

      return (0, _preact.h)(
        'div',
        null,
        (0, _preact.h)(
          'section',
          { className: 'menu_top' },
          (0, _preact.h)(
            'div',
            { className: 'row' },
            (0, _preact.h)(
              'div',
              { className: 'col s12 m5 contrato_px' },
              (0, _preact.h)(
                'ul',
                null,
                (0, _preact.h)(
                  'li',
                  null,
                  (0, _preact.h)(
                    'a',
                    { className: 'logo_pemex animated fadeInLeft', href: '#' },
                    (0, _preact.h)('img', { src: LOGO_LEFT, alt: 'Logo' })
                  )
                ),
                (0, _preact.h)(
                  'li',
                  null,
                  (0, _preact.h)(
                    'div',
                    { className: 'contrato' },
                    (0, _preact.h)(
                      'p',
                      null,
                      TITLE_ONE_LEFT,
                      (0, _preact.h)('br', null),
                      TITLE_TWO_LEFT
                    )
                  )
                )
              )
            ),
            (0, _preact.h)(
              'div',
              { className: 'col s12 m3 sion-contrato-client' },
              (0, _preact.h)(
                'p',
                null,
                TITLE_ONE,
                (0, _preact.h)('br', null),
                TITLE_TWO
              )
            ),
            (0, _preact.h)(
              'div',
              { className: 'col s12 m4 avatar_logo' },
              (0, _preact.h)(
                'ul',
                null,
                (0, _preact.h)(
                  'li',
                  null,
                  (0, _preact.h)(
                    'div',
                    { className: 'avat' },
                    (0, _preact.h)(
                      'a',
                      { className: 'img_redondo bar_config', href: '#', onClick: this.handleOpenConfigMenu() },
                      (0, _preact.h)(
                        'p',
                        null,
                        USER_NAME,
                        (0, _preact.h)(
                          'span',
                          null,
                          USER_JOB
                        )
                      ),
                      (0, _preact.h)('img', { src: srcAvatar }),
                      (0, _preact.h)(
                        'i',
                        { className: 'material-icons right' },
                        'arrow_drop_down'
                      )
                    )
                  )
                ),
                (0, _preact.h)(
                  'li',
                  null,
                  (0, _preact.h)(
                    'a',
                    { className: 'logo_ttx animated fadeIn', href: '#' },
                    (0, _preact.h)('img', { src: window.LOGO_TTX_DEFAULT, alt: 'Logo' })
                  )
                )
              )
            )
          )
        ),
        (0, _preact.h)(
          'nav',
          null,
          (0, _preact.h)(
            'div',
            { className: 'row' },
            (0, _preact.h)(
              'ul',
              { id: 'nav-mobile', className: 'nav_menu ' },
              (0, _preact.h)(
                'li',
                null,
                (0, _preact.h)(
                  'a',
                  { id: 'mostrar_menu', className: 'button-collapse bar_matrices', 'data-activates': 'slide-out', href: '#', onClick: this.handleOpenMenu() },
                  (0, _preact.h)(
                    'i',
                    { className: 'material-icons' },
                    'menu'
                  )
                )
              ),
              itemMenuDashboard,
              (0, _preact.h)(
                'li',
                null,
                (0, _preact.h)(
                  'a',
                  { href: '/matrices' },
                  (0, _preact.h)(
                    'i',
                    { className: 'material-icons' },
                    'developer_board'
                  ),
                  'Matriz'
                )
              ),
              (0, _preact.h)(
                'li',
                null,
                (0, _preact.h)(
                  'a',
                  { href: '/charts' },
                  (0, _preact.h)(
                    'i',
                    { className: 'material-icons' },
                    'timeline'
                  ),
                  'Gr\xE1fica'
                )
              ),
              (0, _preact.h)(
                'li',
                null,
                (0, _preact.h)(
                  'a',
                  { href: '/reports' },
                  (0, _preact.h)(
                    'i',
                    { className: 'material-icons' },
                    'assessment'
                  ),
                  'Reportes'
                )
              ),
              (0, _preact.h)(
                'li',
                null,
                (0, _preact.h)(
                  'a',
                  { href: '/dynamic_graphics' },
                  (0, _preact.h)(
                    'i',
                    { className: 'material-icons' },
                    'filter_b_and_w'
                  ),
                  'Gr\xE1ficos Din\xE1micos'
                )
              ),
              (0, _preact.h)(
                'li',
                null,
                (0, _preact.h)(
                  'a',
                  { href: '/operations' },
                  (0, _preact.h)(
                    'i',
                    { className: 'material-icons' },
                    'assignment'
                  ),
                  'Operaciones'
                )
              ),
              (0, _preact.h)(
                'li',
                null,
                (0, _preact.h)(
                  'a',
                  { href: '/events' },
                  (0, _preact.h)(
                    'i',
                    { className: 'material-icons' },
                    'date_range'
                  ),
                  'Eventos'
                )
              ),
              (0, _preact.h)(
                'li',
                null,
                (0, _preact.h)(
                  'a',
                  { href: '/location' },
                  (0, _preact.h)(
                    'i',
                    { className: 'material-icons' },
                    'room'
                  ),
                  'Ubicaci\xF3n'
                )
              ),
              (0, _preact.h)(
                'li',
                null,
                (0, _preact.h)(
                  'a',
                  { href: 'http://138.68.224.153:5000', target: '_blank' },
                  (0, _preact.h)(
                    'i',
                    { className: 'material-icons' },
                    'gps_fixed'
                  ),
                  'Localizador'
                )
              ),
              (0, _preact.h)(
                'li',
                null,
                (0, _preact.h)(
                  'a',
                  { href: '/explorer' },
                  (0, _preact.h)(
                    'i',
                    { className: 'material-icons' },
                    'pageview'
                  ),
                  'Explorador'
                )
              ),
              (0, _preact.h)(
                'li',
                { className: 'float_right' },
                (0, _preact.h)(
                  'a',
                  { href: '#', className: 'bar_notific', onClick: this.handleOpenNotifications() },
                  (0, _preact.h)(
                    'i',
                    { className: 'material-icons' },
                    'chat_bubble'
                  ),
                  (0, _preact.h)(
                    'span',
                    null,
                    notifications.length
                  )
                )
              )
            ),
            menuLateral,
            (0, _preact.h)(
              'ul',
              { id: 'sbar_config', className: 'sidebar_config', style: 'margin-right: -300px;' },
              (0, _preact.h)(
                'li',
                null,
                (0, _preact.h)(
                  'div',
                  { className: 'config' },
                  (0, _preact.h)(
                    'div',
                    { className: 'avatar_bar' },
                    (0, _preact.h)('img', { src: srcAvatar, alt: 'Imagen' })
                  ),
                  (0, _preact.h)(
                    'h6',
                    null,
                    USER_NAME,
                    (0, _preact.h)('br', null),
                    (0, _preact.h)(
                      'strong',
                      null,
                      USER_JOB
                    )
                  )
                )
              ),
              (0, _preact.h)(
                'li',
                null,
                (0, _preact.h)('br', null)
              ),
              (0, _preact.h)(
                'li',
                null,
                (0, _preact.h)(
                  'div',
                  { className: 'menu' },
                  (0, _preact.h)(
                    'a',
                    { href: '/profile' },
                    (0, _preact.h)(
                      'i',
                      { className: 'material-icons' },
                      'edit'
                    ),
                    ' Editar Perfil'
                  )
                )
              ),
              (0, _preact.h)(
                'li',
                null,
                (0, _preact.h)(
                  'div',
                  { className: 'menu' },
                  (0, _preact.h)(
                    'a',
                    { href: '/configuration' },
                    (0, _preact.h)(
                      'i',
                      { className: 'material-icons' },
                      'settings'
                    ),
                    ' Configuraciones'
                  )
                )
              ),
              (0, _preact.h)(
                'li',
                null,
                (0, _preact.h)(
                  'div',
                  { className: 'menu' },
                  (0, _preact.h)(
                    'a',
                    { href: _constants2.default.URL_SERVER_AUTH + '/logout' },
                    (0, _preact.h)(
                      'i',
                      { className: 'material-icons' },
                      'highlight_off'
                    ),
                    ' Cerrar Sesi\xF3n'
                  )
                )
              ),
              (0, _preact.h)(
                'li',
                null,
                (0, _preact.h)(
                  'a',
                  { id: 'btn_cerrar_sidebar', href: '#', className: 'btn bottm_left sidenav-close', onClick: this.handleCloseConfigMenu() },
                  (0, _preact.h)(
                    'i',
                    { className: 'material-icons left' },
                    'keyboard_arrow_left'
                  )
                )
              ),
              (0, _preact.h)('br', null)
            ),
            (0, _preact.h)(
              'ul',
              { id: 'bar_notific', 'class': 'sidebar_notif', style: 'margin-right: -300px;' },
              (0, _preact.h)('li', { className: 'space' }),
              notifications.map(this.createItemNotification()),
              (0, _preact.h)(
                'li',
                null,
                (0, _preact.h)(
                  'a',
                  { href: '#', className: 'btn bottm_left sidenav-close', onClick: this.handleCloseNotifications() },
                  (0, _preact.h)(
                    'i',
                    { className: 'material-icons left' },
                    'keyboard_arrow_left'
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return Header;
}(_preact.Component);

exports.default = Header;

/***/ }),

/***/ "./src/location_module/menu-lateral.jsx":
/*!**********************************************!*\
  !*** ./src/location_module/menu-lateral.jsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.esm.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuLateral = function (_Component) {
  _inherits(MenuLateral, _Component);

  function MenuLateral(props) {
    _classCallCheck(this, MenuLateral);

    return _possibleConstructorReturn(this, (MenuLateral.__proto__ || Object.getPrototypeOf(MenuLateral)).call(this, props));
  }

  _createClass(MenuLateral, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $(".button-collapse").sideNav();
    }
  }, {
    key: 'handleCloseMenuLateral',
    value: function handleCloseMenuLateral() {
      var self = this;

      var fn = function fn(evt) {
        $('.button-collapse').sideNav('hide');
      };

      return fn;
    }
  }, {
    key: 'handleChangeMatrix',
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
    key: 'handleItemGroup',
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
    key: 'handleRestoreMatrix',
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
    key: 'createItemMatrix',
    value: function createItemMatrix() {
      var self = this;

      var fn = function fn(item, index) {
        var key = index = index + 1;

        return (0, _preact.h)(
          'li',
          { key: key },
          (0, _preact.h)(
            'span',
            { style: 'color: #888; margin-left: 20px;' },
            (0, _preact.h)(
              'a',
              { href: '#', onClick: self.handleChangeMatrix(item.id) },
              item.name
            )
          )
        );
      };

      return fn;
    }
  }, {
    key: 'createItemGroup',
    value: function createItemGroup() {
      var _this2 = this;

      var self = this;

      var fn = function fn(item, index) {
        if (!item.sons) item.sons = [];

        var key = index = index + 1;
        var image = 'macropera.png';
        var type = item.type;

        if (type == 'Pozo') image = 'pozo.svg';

        return (0, _preact.h)(
          'li',
          { key: key },
          (0, _preact.h)(
            'div',
            { className: 'collapsible-header' },
            (0, _preact.h)(
              'div',
              { className: 'col s2' },
              (0, _preact.h)('img', { src: '/static/images/' + image,
                width: '24', height: '24', alt: 'Icono de Grupo',
                style: 'vertical-align: middle;' })
            ),
            (0, _preact.h)(
              'div',
              { className: 'col s10', onClick: _this2.handleItemGroup(item) },
              (0, _preact.h)(
                'span',
                null,
                item.name
              )
            )
          ),
          (0, _preact.h)(
            'div',
            { className: 'collapsible-body' },
            (0, _preact.h)(
              'ul',
              { className: 'collapsible', 'data-collapsible': 'expandable' },
              item.sons.map(_this2.createItemGroup())
            )
          )
        );
      };

      return fn;
    }
  }, {
    key: 'getViewMatrix',
    value: function getViewMatrix(o) {
      if (!o) return;

      if (!o.matrix) return;

      if (!o.matrix.structure) o.matrix.structure = [];

      return (0, _preact.h)(
        'li',
        null,
        (0, _preact.h)(
          'div',
          { className: 'collapsible-header' },
          (0, _preact.h)(
            'i',
            { className: 'material-icons', onClick: this.handleRestoreMatrix() },
            'developer_board'
          ),
          o.matrix.name
        ),
        (0, _preact.h)(
          'div',
          { className: 'collapsible-body' },
          (0, _preact.h)(
            'ul',
            { className: 'collapsible', 'data-collapsible': 'expandable' },
            o.matrix.structure.map(this.createItemGroup())
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render(props, state) {
      var o = props.o;

      if (!o) {
        o = {
          matrices_: []
        };
      }

      if (!o.matrices_) o.matrices_ = [];

      return (0, _preact.h)(
        'ul',
        { id: 'slide-out', className: 'side-nav collapsible', 'data-collapsible': 'expandable' },
        (0, _preact.h)(
          'li',
          null,
          (0, _preact.h)(
            'div',
            { className: 'user-view' },
            (0, _preact.h)(
              'div',
              { className: 'background' },
              (0, _preact.h)('img', { src: '/static/images/sidebar.jpg', alt: 'Imagen' })
            )
          )
        ),
        (0, _preact.h)(
          'li',
          null,
          (0, _preact.h)(
            'div',
            { className: 'collapsible-header' },
            (0, _preact.h)(
              'i',
              { className: 'material-icons' },
              'developer_board'
            ),
            ' Matrices'
          ),
          (0, _preact.h)(
            'div',
            { className: 'collapsible-body' },
            (0, _preact.h)(
              'ul',
              { className: 'collapsible', 'data-collapsible': 'expandable' },
              o.matrices_.map(this.createItemMatrix())
            )
          )
        ),
        (0, _preact.h)(
          'li',
          null,
          (0, _preact.h)('br', null)
        ),
        this.getViewMatrix(),
        (0, _preact.h)(
          'li',
          null,
          (0, _preact.h)(
            'a',
            { href: '#', className: 'btn bottm_right', id: 'close_side', onClick: this.handleCloseMenuLateral() },
            (0, _preact.h)(
              'i',
              { className: 'material-icons left' },
              'keyboard_arrow_left'
            )
          )
        )
      );
    }
  }]);

  return MenuLateral;
}(_preact.Component);

exports.default = MenuLateral;

/***/ }),

/***/ "./src/locator_module/menu-lateral.jsx":
/*!*********************************************!*\
  !*** ./src/locator_module/menu-lateral.jsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.esm.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuLateral = function (_Component) {
  _inherits(MenuLateral, _Component);

  function MenuLateral(props) {
    _classCallCheck(this, MenuLateral);

    return _possibleConstructorReturn(this, (MenuLateral.__proto__ || Object.getPrototypeOf(MenuLateral)).call(this, props));
  }

  _createClass(MenuLateral, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $(".button-collapse").sideNav();
      $('.collapsible').collapsible();
    }
  }, {
    key: 'handleCloseMenuLateral',
    value: function handleCloseMenuLateral() {
      var self = this;

      var fn = function fn(evt) {
        $('.button-collapse').sideNav('hide');
      };

      return fn;
    }
  }, {
    key: 'handleItemVehicle',
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
    key: 'handleItemVehicleReport',
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
    key: 'handleChecked',
    value: function handleChecked(item) {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();

        var id = item.id;
        if (id) {
          var element = '#input-visible-' + id;
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
    key: 'createItemVehicle',
    value: function createItemVehicle() {
      var self = this;

      var fn = function fn(item, index) {
        return (0, _preact.h)(
          'li',
          null,
          (0, _preact.h)(
            'div',
            { className: 'collapsible-header' },
            (0, _preact.h)(
              'div',
              { className: 'col s2' },
              (0, _preact.h)(
                'i',
                { className: 'material-icons' },
                'directions_car'
              )
            ),
            (0, _preact.h)(
              'div',
              { className: 'col s10 txt',
                style: 'font-size: 1.4em; margin-left: 0.4em;font-weight: 200;',
                onClick: self.handleItemVehicle(item) },
              item.alias
            )
          ),
          (0, _preact.h)(
            'div',
            { className: 'collapsible-body', style: 'display: none;' },
            (0, _preact.h)(
              'li',
              { style: 'text-align: center;' },
              (0, _preact.h)(
                'div',
                { 'class': 'switch' },
                (0, _preact.h)(
                  'label',
                  { onClick: self.handleChecked(item) },
                  'Off',
                  (0, _preact.h)('input', { id: 'input-visible-' + item.id, checked: item.visible, type: 'checkbox' }),
                  (0, _preact.h)('span', { 'class': 'lever' }),
                  'On'
                )
              )
            ),
            (0, _preact.h)(
              'li',
              { style: 'text-align: center;', onClick: self.handleItemVehicleReport(item) },
              (0, _preact.h)(
                'i',
                { className: 'material-icons', style: 'font-size: 2em; color: #d4d4d4; cursor: pointer;' },
                'insert_drive_file'
              )
            )
          )
        );
      };

      return fn;
    }
  }, {
    key: 'render',
    value: function render(props, state) {
      var o = props.o;

      if (!o) {
        o = { vehicles: [] };
      } else {
        if (!o.vehicles) o.vehicles = [];
      }

      return (0, _preact.h)(
        'ul',
        { id: 'slide-out', className: 'side-nav collapsible', 'data-collapsible': 'expandable' },
        (0, _preact.h)(
          'li',
          null,
          (0, _preact.h)(
            'div',
            { className: 'user-view' },
            (0, _preact.h)(
              'div',
              { className: 'background' },
              (0, _preact.h)('img', { src: '/static/images/sidebar.jpg', alt: 'Imagen' })
            )
          )
        ),
        (0, _preact.h)(
          'li',
          null,
          (0, _preact.h)(
            'div',
            { className: 'collapsible-header' },
            (0, _preact.h)(
              'i',
              { className: 'material-icons' },
              'directions_car'
            ),
            ' Vehiculos'
          ),
          (0, _preact.h)(
            'div',
            { className: 'collapsible-body' },
            (0, _preact.h)(
              'ul',
              { className: 'collapsible', 'data-collapsible': 'expandable' },
              o.vehicles.map(this.createItemVehicle())
            )
          )
        ),
        (0, _preact.h)(
          'li',
          null,
          (0, _preact.h)(
            'a',
            { href: '#', className: 'btn bottm_right', onClick: this.handleCloseMenuLateral() },
            (0, _preact.h)(
              'i',
              { className: 'material-icons left' },
              'keyboard_arrow_left'
            )
          )
        )
      );
    }
  }]);

  return MenuLateral;
}(_preact.Component);

exports.default = MenuLateral;

/***/ }),

/***/ "./src/matrix_module/menu-lateral.jsx":
/*!********************************************!*\
  !*** ./src/matrix_module/menu-lateral.jsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.esm.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuLateral = function (_Component) {
  _inherits(MenuLateral, _Component);

  function MenuLateral(props) {
    _classCallCheck(this, MenuLateral);

    return _possibleConstructorReturn(this, (MenuLateral.__proto__ || Object.getPrototypeOf(MenuLateral)).call(this, props));
  }

  _createClass(MenuLateral, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $(".button-collapse").sideNav();
    }
  }, {
    key: 'handleCloseMenuLateral',
    value: function handleCloseMenuLateral() {
      var self = this;

      var fn = function fn(evt) {
        $('.button-collapse').sideNav('hide');
      };

      return fn;
    }
  }, {
    key: 'handleMatrices',
    value: function handleMatrices() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        evt.stopPropagation();
      };

      return fn;
    }
  }, {
    key: 'handleChangeMatrix',
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
    key: 'handleItemGroup',
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
    key: 'handleRestoreMatrix',
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
    key: 'createItemMatrix',
    value: function createItemMatrix() {
      var self = this;

      var fn = function fn(item, index) {
        var key = index = index + 1;

        return (0, _preact.h)(
          'li',
          { key: key },
          (0, _preact.h)(
            'span',
            { style: 'color: #888; margin-left: 20px;' },
            (0, _preact.h)(
              'a',
              { href: '#', onClick: self.handleChangeMatrix(item.id) },
              item.name
            )
          )
        );
      };

      return fn;
    }
  }, {
    key: 'createItemGroup',
    value: function createItemGroup(mi) {
      var _this2 = this;

      var self = this;

      var fn = function fn(item, index) {
        if (!item.sons) item.sons = [];

        var key = index = index + 1;
        var image = 'macropera.png';
        var type = item.type;

        if (type == 'Pozo') image = 'pozo.svg';

        return (0, _preact.h)(
          'li',
          { key: key },
          (0, _preact.h)(
            'div',
            { className: 'collapsible-header' },
            (0, _preact.h)(
              'div',
              { className: 'col s2' },
              (0, _preact.h)('img', { src: '/static/images/' + image,
                width: '24', height: '24', alt: 'Icono de Grupo',
                style: 'vertical-align: middle;' })
            ),
            (0, _preact.h)(
              'div',
              { className: 'col s10', onClick: _this2.handleItemGroup(mi, item) },
              (0, _preact.h)(
                'span',
                null,
                item.name
              )
            )
          ),
          (0, _preact.h)(
            'div',
            { className: 'collapsible-body' },
            (0, _preact.h)(
              'ul',
              { className: 'collapsible', 'data-collapsible': 'expandable' },
              item.sons.map(_this2.createItemGroup(mi))
            )
          )
        );
      };

      return fn;
    }
  }, {
    key: 'createViewMatrix',
    value: function createViewMatrix() {
      var _this3 = this;

      var self = this;

      var fn = function fn(matrix, index) {
        if (!matrix.name) matrix.name = 'N/A';
        if (!matrix.structure) matrix.structure = [];

        return (0, _preact.h)(
          'li',
          null,
          (0, _preact.h)(
            'div',
            { className: 'collapsible-header' },
            (0, _preact.h)(
              'i',
              { className: 'material-icons', onClick: _this3.handleRestoreMatrix(index) },
              'developer_board'
            ),
            matrix.name
          ),
          (0, _preact.h)(
            'div',
            { className: 'collapsible-body' },
            (0, _preact.h)(
              'ul',
              { className: 'collapsible', 'data-collapsible': 'expandable' },
              matrix.structure.map(_this3.createItemGroup(index))
            )
          )
        );
      };

      return fn;
    }
  }, {
    key: 'render',
    value: function render(props, state) {
      var o = props.o;

      if (!o) {
        o = {
          matrices_: [],
          matrices: []
        };
      }

      return (0, _preact.h)(
        'div',
        { id: 'slide-out', className: 'side-nav bar_matrices' },
        (0, _preact.h)(
          'ul',
          { className: 'collapsible', 'data-collapsible': 'expandable' },
          (0, _preact.h)(
            'li',
            null,
            (0, _preact.h)(
              'div',
              { className: 'user-view' },
              (0, _preact.h)(
                'div',
                { className: 'background' },
                (0, _preact.h)('img', { src: '/static/images/sidebar.jpg', alt: 'Imagen' })
              )
            )
          ),
          (0, _preact.h)(
            'li',
            null,
            (0, _preact.h)(
              'div',
              { className: 'collapsible-header' },
              (0, _preact.h)(
                'i',
                { className: 'material-icons' },
                'developer_board'
              ),
              ' Matrices'
            ),
            (0, _preact.h)(
              'div',
              { className: 'collapsible-body' },
              (0, _preact.h)(
                'ul',
                { className: 'collapsible', 'data-collapsible': 'expandable' },
                o.matrices_.map(this.createItemMatrix())
              )
            )
          ),
          (0, _preact.h)(
            'li',
            null,
            (0, _preact.h)('br', null)
          ),
          o.matrices.map(this.createViewMatrix()),
          (0, _preact.h)(
            'li',
            null,
            (0, _preact.h)(
              'a',
              { href: '#', className: 'btn bottm_right', onClick: this.handleCloseMenuLateral() },
              (0, _preact.h)(
                'i',
                { className: 'material-icons left' },
                'keyboard_arrow_left'
              )
            )
          )
        )
      );
    }
  }]);

  return MenuLateral;
}(_preact.Component);

exports.default = MenuLateral;

/***/ }),

/***/ "./src/matrix_module/notification-item.jsx":
/*!*************************************************!*\
  !*** ./src/matrix_module/notification-item.jsx ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.esm.js");

var _constants = __webpack_require__(/*! ./../constants */ "./src/constants.js");

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotificationItem = function (_Component) {
  _inherits(NotificationItem, _Component);

  function NotificationItem(props) {
    _classCallCheck(this, NotificationItem);

    return _possibleConstructorReturn(this, (NotificationItem.__proto__ || Object.getPrototypeOf(NotificationItem)).call(this, props));
  }

  _createClass(NotificationItem, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'handleRemove',
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
    key: 'render',
    value: function render(props, state) {
      var notification = props.notification;
      var type = notification.type;

      var icon = 'notifications';

      if (type == _constants2.default.TYPE_VALUE_ALARM) {
        icon = 'warning';
      } else if (type == _constants2.default.TYPE_TIMEOUT_ALARM) {
        icon = 'alarm';
      }

      // warning
      // message comentario
      // volume_off silenciar alarma
      // portable_wifi_off perdida de conexion

      return (0, _preact.h)(
        'li',
        null,
        (0, _preact.h)(
          'div',
          { className: 'notifica' },
          (0, _preact.h)(
            'div',
            { className: 'row thumb' },
            (0, _preact.h)(
              'div',
              { className: 'flexi' },
              (0, _preact.h)(
                'div',
                { className: 'col s2' },
                (0, _preact.h)(
                  'i',
                  { className: 'material-icons' },
                  icon
                )
              ),
              (0, _preact.h)(
                'div',
                { className: 'col s10' },
                (0, _preact.h)(
                  'p',
                  null,
                  notification.description
                )
              ),
              (0, _preact.h)(
                'div',
                { className: 'borrar_notif' },
                (0, _preact.h)(
                  'a',
                  { className: 'btn_noti ', href: '#', onClick: this.handleRemove() },
                  (0, _preact.h)('i', { className: 'fa fa-times' })
                )
              )
            )
          )
        )
      );
    }
  }]);

  return NotificationItem;
}(_preact.Component);

exports.default = NotificationItem;

/***/ }),

/***/ "./src/operations_module/content.jsx":
/*!*******************************************!*\
  !*** ./src/operations_module/content.jsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.esm.js");

var _header = __webpack_require__(/*! ./../header.jsx */ "./src/header.jsx");

var _header2 = _interopRequireDefault(_header);

var _pagination = __webpack_require__(/*! ./../pagination.jsx */ "./src/pagination.jsx");

var _pagination2 = _interopRequireDefault(_pagination);

var _constants = __webpack_require__(/*! ./../constants.js */ "./src/constants.js");

var _constants2 = _interopRequireDefault(_constants);

var _table = __webpack_require__(/*! ./table.jsx */ "./src/operations_module/table.jsx");

var _table2 = _interopRequireDefault(_table);

var _searchForm = __webpack_require__(/*! ./search-form.jsx */ "./src/operations_module/search-form.jsx");

var _searchForm2 = _interopRequireDefault(_searchForm);

var _createForm = __webpack_require__(/*! ./create-form.jsx */ "./src/operations_module/create-form.jsx");

var _createForm2 = _interopRequireDefault(_createForm);

var _updateForm = __webpack_require__(/*! ./update-form.jsx */ "./src/operations_module/update-form.jsx");

var _updateForm2 = _interopRequireDefault(_updateForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SEARCH = 1;
var CREATE_FORM = 2;
var UPDATE_FORM = 3;

var Content = function (_Component) {
  _inherits(Content, _Component);

  function Content(props) {
    _classCallCheck(this, Content);

    var _this = _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this, props));

    _this.state = {
      notifications_: [],
      matrices_: [],
      groups_: [],

      items: [],
      item: false,

      items_: [],
      page_: 1
    };
    return _this;
  }

  _createClass(Content, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getOperations();

      this.getNotifications();
    }

    /* Notificaciones */

  }, {
    key: 'getNotifications',
    value: function getNotifications() {
      var self = this;

      var url = _constants2.default.URL_SERVER_LOG_EVENTS + '/notifications?is_seen=false';

      var xhr = $.ajax({
        url: url,
        type: _constants2.default.METHOD_GET,
        dataType: _constants2.default.JSON
      });

      xhr.done(function (res, status, response) {
        if (response.status == _constants2.default.STATUS_OK) {
          self.setState({ notifications_: res.docs });
        } else if (response.status == _constants2.default.STATUS_ACCEPTED) {
          Materialize.toast(res.message, 2500);
        }
      });

      xhr.fail(function (res, status, respose) {
        if (res.responseJSON) {
          var json = res.responseJSON;
          Materialize.toast(json.message, 2500);
        } else {
          Materialize.toast(_constants2.default.MESSAGE_ERROR, 2500);
        }
      });
    }
  }, {
    key: 'updateEventAsSeen',
    value: function updateEventAsSeen(id) {
      var self = this;

      var xhr = $.ajax({
        url: _constants2.default.URL_SERVER_LOG_EVENTS + '/notifications/' + id,
        type: _constants2.default.METHOD_PUT,
        contentType: _constants2.default.APPLICATION_JSON
      });

      xhr.done(function (res, status, response) {
        if (response.status == _constants2.default.STATUS_OK) {
          console.log('Notificación Ok');
        } else if (response.status == _constants2.default.STATUS_ACCEPTED) {
          Materialize.toast(res.message, 2500);
        }
      });

      xhr.fail(function (res, status, respose) {
        if (res.responseJSON) {
          var json = res.responseJSON;
          Materialize.toast(json.message, 2500);
        } else {
          Materialize.toast(_constants2.default.MESSAGE_ERROR, 2500);
        }
      });
    }
  }, {
    key: 'handleRemoveNotification',
    value: function handleRemoveNotification() {
      var self = this;

      var fn = function fn(id) {
        var notifications = self.state.notifications_;
        for (var i = 0; i < notifications.length; i++) {
          var notification = notifications[i];
          if (id == notification.id) {
            self.updateEventAsSeen(id);

            notifications.splice(i, 1);

            self.setState({ notifications_: notifications });
            return;
          }
        }
      };

      return fn;
    }

    /* Notificaciones */

  }, {
    key: 'getOperations',
    value: function getOperations() {
      var self = this;

      var url = _constants2.default.URL_SERVER_OPERATIONS + '/list';

      var xhr = $.ajax({
        url: url,
        type: _constants2.default.METHOD_GET,
        dataType: _constants2.default.JSON
      });

      xhr.done(function (res, status, response) {
        if (response.status == _constants2.default.STATUS_OK) {
          var page = self.state.page_;

          self.updateItemsPerPage(res.docs, page);
        } else if (response.status == _constants2.default.STATUS_ACCEPTED) {
          Materialize.toast(res.message, 2500);
        }
      });

      xhr.fail(function (res, status, respose) {
        if (res.responseJSON) {
          var json = res.responseJSON;
          Materialize.toast(json.message, 2500);
        } else {
          Materialize.toast(_constants2.default.MESSAGE_ERROR, 2500);
        }
      });
    }
  }, {
    key: 'getOperationsForSearch',
    value: function getOperationsForSearch(value) {
      var self = this;

      var url = _constants2.default.URL_SERVER_OPERATIONS + '/list?search=' + value;

      var xhr = $.ajax({
        url: url,
        type: _constants2.default.METHOD_GET,
        dataType: _constants2.default.JSON
      });

      xhr.done(function (res, status, response) {
        if (response.status == _constants2.default.STATUS_OK) {
          var page = self.state.page_;

          self.updateItemsPerPage(res.docs, page);
        } else if (response.status == _constants2.default.STATUS_ACCEPTED) {
          Materialize.toast(res.message, 2500);
        }
      });

      xhr.fail(function (res, status, respose) {
        if (res.responseJSON) {
          var json = res.responseJSON;
          Materialize.toast(json.message, 2500);
        } else {
          Materialize.toast(_constants2.default.MESSAGE_ERROR, 2500);
        }
      });
    }
  }, {
    key: 'getOperation',
    value: function getOperation() {
      var self = this;

      var fn = function fn(json) {
        var xhr = $.ajax({
          url: _constants2.default.URL_SERVER_OPERATIONS + '/' + json.id,
          type: _constants2.default.METHOD_GET,
          dataType: _constants2.default.JSON
        });

        xhr.done(function (res, status, response) {
          if (response.status == _constants2.default.STATUS_OK) {
            self.getItem(null, res.doc);
          } else if (response.status == _constants2.default.STATUS_ACCEPTED) {
            self.getItem(res.message);
          }
        });

        xhr.fail(function (res, status, respose) {
          if (res.responseJSON) {
            var _json = res.responseJSON;
            Materialize.toast(_json.message, 2500);
          } else {
            Materialize.toast(_constants2.default.MESSAGE_ERROR, 2500);
          }
        });
      };

      return fn;
    }
  }, {
    key: 'addOperation',
    value: function addOperation() {
      var self = this;

      var fn = function fn(json) {
        var xhr = $.ajax({
          url: _constants2.default.URL_SERVER_OPERATIONS,
          type: _constants2.default.METHOD_POST,
          contentType: _constants2.default.APPLICATION_JSON,
          data: JSON.stringify(json)
        });
        /*let xhr = $.ajax({
          url: constants.URL_SERVER_OPERATIONS,
          type: constants.METHOD_POST,
          processData: false,
          contentType: false,
          data: formData,
        });*/

        xhr.done(function (res, status, response) {
          if (response.status == _constants2.default.STATUS_CREATED) {
            var message = 'La operación se creó correctamente';
            Materialize.toast(message, 2500);

            self.addItem(null, res.doc);
          } else if (response.status == _constants2.default.STATUS_ACCEPTED) {
            self.addItem(res.message);
          }
        });

        xhr.fail(function (res, status, respose) {
          if (res.responseJSON) {
            var _json2 = res.responseJSON;
            Materialize.toast(_json2.message, 2500);
          } else {
            Materialize.toast(_constants2.default.MESSAGE_ERROR, 2500);
          }
        });
      };

      return fn;
    }
  }, {
    key: 'updateOperation',
    value: function updateOperation() {
      var self = this;

      var fn = function fn(json, id) {
        var xhr = $.ajax({
          url: _constants2.default.URL_SERVER_OPERATIONS + '/' + id,
          type: _constants2.default.METHOD_PUT,
          contentType: _constants2.default.APPLICATION_JSON,
          data: JSON.stringify(json)
        });

        /*let xhr = $.ajax({
          url: `${constants.URL_SERVER_OPERATIONS}/${id}`,
          type: constants.METHOD_PUT,
          processData: false,
          contentType: false,
          data: formData,
        });*/

        xhr.done(function (res, status, response) {
          if (response.status == _constants2.default.STATUS_OK) {
            var message = 'La operación se actualizo correctamente';
            Materialize.toast(message, 2500);

            self.updateItem(null, res.doc);
          } else if (response.status == _constants2.default.STATUS_ACCEPTED) {
            self.updateItem(res.message);
          }
        });

        xhr.fail(function (res, status, respose) {
          if (res.responseJSON) {
            var _json3 = res.responseJSON;
            Materialize.toast(_json3.message, 2500);
          } else {
            Materialize.toast(_constants2.default.MESSAGE_ERROR, 2500);
          }
        });
      };

      return fn;
    }
  }, {
    key: 'deleteOperation',
    value: function deleteOperation() {
      var self = this;

      var fn = function fn(json) {
        var xhr = $.ajax({
          url: _constants2.default.URL_SERVER_OPERATIONS + '/' + json.id,
          type: _constants2.default.METHOD_DELETE
        });

        xhr.done(function (res, status, response) {
          if (response.status == _constants2.default.STATUS_OK) {
            var message = 'La operación se elimino correctamente';
            Materialize.toast(message, 2500);

            self.removeItem(null, json);
          } else if (response.status == _constants2.default.STATUS_ACCEPTED) {
            self.removeItem(res.message);
          }
        });

        xhr.fail(function (res, status, respose) {
          if (res.responseJSON) {
            var _json4 = res.responseJSON;
            Materialize.toast(_json4.message, 2500);
          } else {
            Materialize.toast(_constants2.default.MESSAGE_ERROR, 2500);
          }
        });
      };

      return fn;
    }
  }, {
    key: 'handleOpenCreate',
    value: function handleOpenCreate() {
      var self = this;

      var fn = function fn() {
        self.setState({ form: CREATE_FORM });
      };

      return fn;
    }
  }, {
    key: 'handleSearch',
    value: function handleSearch() {
      var _this2 = this;

      var self = this;

      var fn = function fn(json) {
        var self = _this2;

        var withQuery = false;
        var url = _constants2.default.URL_SERVER_OPERATIONS + '/list';

        if (json.matrix_id) {
          if (!withQuery) {
            withQuery = true;
            url = url + '?matrix_id=' + json.matrix_id;
          } else {
            url = url + '&matrix_id=' + json.matrix_id;
          }
        }

        if (json.group_id) {
          if (!withQuery) {
            withQuery = true;
            url = url + '?group_id=' + json.group_id;
          } else {
            url = url + '&group_id=' + json.group_id;
          }
        }

        if (json.start_date) {
          if (!withQuery) {
            withQuery = true;
            url = url + '?start_date=' + json.start_date;
          } else {
            url = url + '&start_date=' + json.start_date;
          }
        }

        if (json.final_date) {
          if (!withQuery) {
            withQuery = true;
            url = url + '?final_date=' + json.final_date;
          } else {
            url = url + '&final_date=' + json.final_date;
          }
        }

        var xhr = $.ajax({
          url: url,
          type: _constants2.default.METHOD_GET,
          dataType: _constants2.default.JSON
        });

        xhr.done(function (res, status, response) {
          if (response.status == _constants2.default.STATUS_OK) {
            var page = self.state.page_;

            self.updateItemsPerPage(res.docs, page);
          } else if (response.status == _constants2.default.STATUS_ACCEPTED) {
            Materialize.toast(res.message, 2500);
          }
        });

        xhr.fail(function (res, status, respose) {
          if (res.responseJSON) {
            var _json5 = res.responseJSON;
            Materialize.toast(_json5.message, 2500);
          } else {
            Materialize.toast(_constants2.default.MESSAGE_ERROR, 2500);
          }
        });
      };

      return fn;
    }
  }, {
    key: 'handleBack',
    value: function handleBack() {
      var self = this;

      var fn = function fn() {
        self.setState({ form: SEARCH });
      };

      return fn;
    }
  }, {
    key: 'handleUpdateItems',
    value: function handleUpdateItems() {
      var self = this;

      var fn = function fn(page) {
        var items = self.state.items;
        self.updateItemsPerPage(items, page);
      };

      return fn;
    }
  }, {
    key: 'getItem',
    value: function getItem(err, item) {
      var self = this;

      if (err) {
        Materialize.toast(err, 2500);
        return;
      }

      self.setState({ item: item, form: UPDATE_FORM });
    }
  }, {
    key: 'addItem',
    value: function addItem(err, item) {
      var self = this;

      if (err) {
        Materialize.toast(err, 2500);
        return;
      }

      var items = this.state.items;
      items.push(item);
      this.setState({ form: SEARCH }, function () {
        var page = self.state.page_;
        self.updateItemsPerPage(items, page);
      });
    }
  }, {
    key: 'updateItem',
    value: function updateItem(err, item) {
      var self = this;

      if (err) {
        Materialize.toast(err, 2500);
        return;
      }

      var items = this.state.items;
      for (var i = 0; i < items.length; i++) {
        var id = items[i].id;
        if (item.id == id) {
          items[i] = item;
          break;
        }
      }

      this.setState({ form: SEARCH }, function () {
        var page = self.state.page_;
        self.updateItemsPerPage(items, page);
      });
    }
  }, {
    key: 'removeItem',
    value: function removeItem(err, item) {
      var self = this;

      if (err) {
        Materialize.toast(err, 2500);
        return;
      }

      var items = self.state.items;
      for (var i = 0; i < items.length; i++) {
        var id = items[i].id;
        if (item.id == id) {
          items.splice(i, 1);
          break;
        }
      }

      var page = self.state.page_;
      self.updateItemsPerPage(items, page);
    }
  }, {
    key: 'updateItemsPerPage',
    value: function updateItemsPerPage(items, page) {
      var content = [];
      var start = _pagination2.default.ROWS_PER_PAGE * (page - 1);;
      var final = _pagination2.default.ROWS_PER_PAGE * page;

      for (var i = start; i < final; i++) {
        var item = items[i];
        if (!item) break;

        item.index = i + 1;

        content.push(item);
      }

      this.setState({ items: items, items_: content, page_: page });
    }
  }, {
    key: 'render',
    value: function render(props, state) {
      var notifications = state.notifications_;

      var form = state.form;

      if (form == CREATE_FORM) {
        form = (0, _preact.h)(_createForm2.default, { onCreate: this.addOperation(), onBack: this.handleBack() });
      } else if (form == UPDATE_FORM) {
        form = (0, _preact.h)(_updateForm2.default, { item: state.item, onUpdate: this.updateOperation(), onBack: this.handleBack() });
      } else {
        form = (0, _preact.h)(_searchForm2.default, { openCreate: this.handleOpenCreate(), onSearch: this.handleSearch() });
      }

      return (0, _preact.h)(
        'div',
        null,
        (0, _preact.h)(_header2.default, { module: _constants2.default.OPERATIONS_MODULE,
          notifications: notifications,
          onRemoveNotification: this.handleRemoveNotification() }),
        (0, _preact.h)(
          'section',
          { className: 'contenedor_root animated fadeIn' },
          (0, _preact.h)(
            'div',
            { className: 'notes' },
            (0, _preact.h)(
              'div',
              { className: 'container' },
              (0, _preact.h)(
                'div',
                { className: 'row' },
                (0, _preact.h)(
                  'div',
                  { className: 'col s12 m4 anotaciones' },
                  form
                ),
                (0, _preact.h)(
                  'div',
                  { className: 'col s12 m8 anotaciones' },
                  (0, _preact.h)(
                    'div',
                    { className: 'all_notes' },
                    (0, _preact.h)(_table2.default, { items: state.items,
                      total_rows: state.items.length,
                      onGet: this.getOperation(),
                      onDelete: this.deleteOperation(),
                      onUpdateItems: this.handleUpdateItems() })
                  )
                )
              )
            )
          )
        ),
        (0, _preact.h)('div', { className: 'background' })
      );
    }
  }]);

  return Content;
}(_preact.Component);

(0, _preact.render)((0, _preact.h)(Content, null), document.getElementById('content-main'));

/***/ }),

/***/ "./src/operations_module/create-form.jsx":
/*!***********************************************!*\
  !*** ./src/operations_module/create-form.jsx ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.esm.js");

var _underscore = __webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js");

var _constants = __webpack_require__(/*! ./../constants.js */ "./src/constants.js");

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreateForm = function (_Component) {
  _inherits(CreateForm, _Component);

  function CreateForm(props) {
    _classCallCheck(this, CreateForm);

    var _this = _possibleConstructorReturn(this, (CreateForm.__proto__ || Object.getPrototypeOf(CreateForm)).call(this, props));

    _this.state = {
      matrices_: [],
      groups_: [],

      created_at_date: ''
    };
    return _this;
  }

  _createClass(CreateForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getMatrices();
    }
  }, {
    key: 'getMatrices',
    value: function getMatrices() {
      var self = this;

      var url = _constants2.default.URL_SERVER_MATRICES + '/list?with_structure=true&with_structure_json=false';

      var xhr = $.ajax({
        url: url,
        type: _constants2.default.METHOD_GET,
        dataType: _constants2.default.JSON
      });

      xhr.done(function (res, status, response) {
        if (response.status == _constants2.default.STATUS_OK) {
          self.parseMatrices(res.docs);
        } else if (response.status == _constants2.default.STATUS_ACCEPTED) {
          alert(res.message);
        }
      });

      xhr.fail(function (res, status, respose) {
        if (res.responseJSON) {
          var json = res.responseJSON;
          alert(json.message);
        } else {
          alert(_constants2.default.MESSAGE_ERROR);
        }
      });
    }
  }, {
    key: 'getGroups',
    value: function getGroups(s) {
      var groups = [];

      if (!(0, _underscore.isArray)(s)) s = [];

      for (var i = 0; i < s.length; i++) {
        var g = s[i];
        var groups_ = [];

        if (g.sons) groups_ = this.getGroups(g.sons);

        var g_ = { id: g.id, name: g.name };
        if (g.variables) g_.variables = g.variables;

        groups.push(g_);

        if (groups_.length > 0) {
          for (var j = 0; j < groups_.length; j++) {
            var _g_ = groups_[j];
            groups.push(_g_);
          }
        }
      }

      return groups;
    }
  }, {
    key: 'parseMatrices',
    value: function parseMatrices(matrices) {
      var self = this;

      var matricesOut = [];

      if (!(0, _underscore.isArray)(matrices)) matrices = [];

      for (var i = 0; i < matrices.length; i++) {
        var matrix = matrices[i];
        if (matrix) {
          var o = {
            id: matrix.id,
            name: matrix.name
          };

          var structure = matrix.structure;
          var groups = this.getGroups(structure);

          o.groups = groups;

          matricesOut.push(o);
        }
      }

      this.setState({ matrices_: matricesOut }, function () {
        self.initializePickers();
      });
    }
  }, {
    key: 'initializePickers',
    value: function initializePickers() {
      var self = this;

      var created_at_date = this.state.created_at_date;
      if (!created_at_date) created_at_date = '';

      $('#content-created-at-c-date').html('');
      $('#content-created-at-c-date').append('<input type="text" id="input-created-at-c-date" class="datepicker" placeholder="Fecha"  value="' + created_at_date + '" />');

      $('#input-created-at-c-date').on('change', function (evt) {
        self.state.created_at_date = evt.target.value;
      });

      $('.timepicker').pickatime({
        default: 'now',
        fromnow: 0,
        twelvehour: false,
        donetext: 'OK',
        cleartext: 'Limpiar',
        canceltext: 'Cancelar',
        autoclose: false,
        ampmclickable: true
      });

      $('.datepicker').pickadate({
        selectMonths: false,
        selectYears: 15,
        format: 'dd-mm-yyyy',
        today: 'Hoy',
        clear: 'Limpiar',
        close: 'Ok',
        closeOnSelect: true,
        monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'],
        weekdaysLetter: ['D', 'L', 'M', 'M', 'J', 'V', 'S']
      });
    }
  }, {
    key: 'handleCreate',
    value: function handleCreate() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();

        var f = self.props.onCreate;
        if (f) {
          var inputMatrix = document.querySelector('#input-c-matrix');
          var inputGroup = document.querySelector('#input-c-group');
          var inputTitle = document.querySelector('#input-c-title');
          var inputDescription = document.querySelector('#input-c-description');

          var inputCreatedAtDate = document.querySelector('#input-created-at-c-date');
          var inputCreatedAtTime = document.querySelector('#input-created-at-c-time');

          var date = inputCreatedAtDate.value.trim();
          var time = inputCreatedAtTime.value.trim();

          date = self.parseDate(date);

          var created_at = date + ' ' + time + ':00';

          var matrix_id = inputMatrix.value.trim();
          var group_id = inputGroup.value.trim();
          var title = inputTitle.value.trim();
          var description = inputDescription.value.trim();

          matrix_id = parseInt(matrix_id);
          group_id = parseInt(group_id);

          var json = {
            matrix_id: matrix_id,
            group_id: group_id,
            title: title,
            description: description,
            created_at_in: created_at
          };

          f(json);
        }
      };

      return fn;
    }
  }, {
    key: 'handleChangeMatrix',
    value: function handleChangeMatrix() {
      var self = this;

      var fn = function fn(evt) {
        var value = evt.target.value;
        var id = parseInt(value);
        if (!id) {
          self.setState({ groups_: [] });
          return;
        }

        var matrices = self.state.matrices_;
        for (var i = 0; i < matrices.length; i++) {
          var matrix = matrices[i];
          if (matrix) {
            if (matrix.id == id) {
              var groups_ = matrix.groups;

              self.setState({ groups_: groups_ }, function () {
                self.initializePickers();
              });

              return;
            }
          }
        }
      };

      return fn;
    }
  }, {
    key: 'handleBack',
    value: function handleBack() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();

        var f = self.props.onBack;
        if (f) f();
      };

      return fn;
    }
  }, {
    key: 'parseDate',
    value: function parseDate(s) {
      if (s) {
        if ((0, _underscore.isString)(s)) {
          var elements = s.split('-');
          elements = elements.reverse();

          var value = '';
          for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (i == 0) {
              value = '' + element;
            } else {
              value = value + '-' + element;
            }
          }

          return value;
        }
      }

      return s;
    }
  }, {
    key: 'createOptMG',
    value: function createOptMG() {
      var self = this;

      var fn = function fn(item, index) {
        var key = index + 1;

        return (0, _preact.h)(
          'option',
          { key: key, value: item.id },
          item.name
        );
      };

      return fn;
    }
  }, {
    key: 'render',
    value: function render(props, state) {
      return (0, _preact.h)(
        'form',
        { className: 'formulario', onSubmit: this.handleCreate() },
        (0, _preact.h)(
          'div',
          { className: 'all_notes' },
          (0, _preact.h)(
            'div',
            { className: 'variable' },
            (0, _preact.h)(
              'div',
              { className: 'col m12' },
              (0, _preact.h)(
                'select',
                { className: 'browser-default sion-select', id: 'input-c-matrix', onChange: this.handleChangeMatrix() },
                (0, _preact.h)(
                  'option',
                  { value: '' },
                  'Matrices'
                ),
                state.matrices_.map(this.createOptMG())
              ),
              (0, _preact.h)('br', null)
            ),
            (0, _preact.h)(
              'div',
              { className: 'col m12' },
              (0, _preact.h)(
                'select',
                { className: 'browser-default sion-select', id: 'input-c-group' },
                (0, _preact.h)(
                  'option',
                  { value: '' },
                  'Grupos'
                ),
                state.groups_.map(this.createOptMG())
              ),
              (0, _preact.h)('br', null)
            ),
            (0, _preact.h)(
              'div',
              { className: 'col m12' },
              (0, _preact.h)('input', { type: 'text', id: 'input-c-title', placeholder: 'Titulo' })
            ),
            (0, _preact.h)(
              'div',
              { className: 'col m12' },
              (0, _preact.h)('input', { type: 'text', id: 'input-c-description', placeholder: 'Descripci\xF3n' })
            ),
            (0, _preact.h)(
              'div',
              { className: 'col m12' },
              (0, _preact.h)('div', { id: 'content-created-at-c-date', className: 'dates col s6 m6' }),
              (0, _preact.h)(
                'div',
                { className: 'dates col s6 m6' },
                (0, _preact.h)('input', { id: 'input-created-at-c-time', placeholder: 'Hora', type: 'text', className: 'timepicker' })
              )
            ),
            (0, _preact.h)(
              'div',
              { className: 'row' },
              (0, _preact.h)(
                'div',
                { className: 'col m12' },
                (0, _preact.h)(
                  'div',
                  { className: 'col m6' },
                  (0, _preact.h)(
                    'button',
                    { type: 'button', className: 'btn gray', onClick: this.handleBack() },
                    (0, _preact.h)(
                      'i',
                      { className: 'material-icons prefix left' },
                      'keyboard_backspace'
                    )
                  )
                ),
                (0, _preact.h)(
                  'div',
                  { className: 'col m6' },
                  (0, _preact.h)(
                    'button',
                    { type: 'submit', className: 'btn red' },
                    'Guardar'
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return CreateForm;
}(_preact.Component);

exports.default = CreateForm;

/***/ }),

/***/ "./src/operations_module/search-form.jsx":
/*!***********************************************!*\
  !*** ./src/operations_module/search-form.jsx ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.esm.js");

var _underscore = __webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js");

var _constants = __webpack_require__(/*! ./../constants.js */ "./src/constants.js");

var _constants2 = _interopRequireDefault(_constants);

var _util = __webpack_require__(/*! util */ "./node_modules/util/util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchForm = function (_Component) {
  _inherits(SearchForm, _Component);

  function SearchForm(props) {
    _classCallCheck(this, SearchForm);

    var _this = _possibleConstructorReturn(this, (SearchForm.__proto__ || Object.getPrototypeOf(SearchForm)).call(this, props));

    _this.state = {
      matrices_: [],
      groups_: [],

      created_at_date: ''
    };
    return _this;
  }

  _createClass(SearchForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getMatrices();
    }
  }, {
    key: 'getMatrices',
    value: function getMatrices() {
      var self = this;

      var url = _constants2.default.URL_SERVER_MATRICES + '/list?with_structure=true&with_structure_json=false';

      var xhr = $.ajax({
        url: url,
        type: _constants2.default.METHOD_GET,
        dataType: _constants2.default.JSON
      });

      xhr.done(function (res, status, response) {
        if (response.status == _constants2.default.STATUS_OK) {
          self.parseMatrices(res.docs);
        } else if (response.status == _constants2.default.STATUS_ACCEPTED) {
          alert(res.message);
        }
      });

      xhr.fail(function (res, status, respose) {
        if (res.responseJSON) {
          var json = res.responseJSON;
          alert(json.message);
        } else {
          alert(_constants2.default.MESSAGE_ERROR);
        }
      });
    }
  }, {
    key: 'getGroups',
    value: function getGroups(s) {
      var groups = [];

      if (!(0, _util.isArray)(s)) return groups;

      for (var i = 0; i < s.length; i++) {
        var g = s[i];
        var groups_ = [];

        if (g.sons) groups_ = this.getGroups(g.sons);

        var g_ = { id: g.id, name: g.name };
        if (g.variables) g_.variables = g.variables;

        groups.push(g_);

        if (groups_.length > 0) {
          for (var j = 0; j < groups_.length; j++) {
            var _g_ = groups_[j];
            groups.push(_g_);
          }
        }
      }

      return groups;
    }
  }, {
    key: 'parseMatrices',
    value: function parseMatrices(matrices) {
      var self = this;

      var matricesOut = [];

      for (var i = 0; i < matrices.length; i++) {
        var matrix = matrices[i];
        if (matrix) {
          var o = {
            id: matrix.id,
            name: matrix.name
          };

          var structure = matrix.structure;
          var groups = this.getGroups(structure);

          o.groups = groups;

          matricesOut.push(o);
        }
      }

      this.setState({ matrices_: matricesOut }, function () {
        self.initializePickers();
      });
    }
  }, {
    key: 'initializePickers',
    value: function initializePickers() {
      var self = this;

      var created_at_date_of = this.state.created_at_date_of;
      if (!created_at_date_of) created_at_date_of = '';

      var created_at_date_to = this.state.created_at_date_to;
      if (!created_at_date_to) created_at_date_to = '';

      $('#content-created-at-date-of').html('');
      $('#content-created-at-date-of').append('<input type="text" id="input-created-at-date-of" class="datepicker" placeholder="De: "  value="' + created_at_date_of + '" />');

      $('#content-created-at-date-to').html('');
      $('#content-created-at-date-to').append('<input type="text" id="input-created-at-date-to" class="datepicker" placeholder="Hasta: "  value="' + created_at_date_to + '" />');

      $('#input-created-at-date-of').on('change', function (evt) {
        self.state.created_at_date_of = evt.target.value;
      });

      $('#input-created-at-date-to').on('change', function (evt) {
        self.state.created_at_date_to = evt.target.value;
      });

      $('.timepicker').pickatime({
        default: 'now',
        fromnow: 0,
        twelvehour: false,
        donetext: 'OK',
        cleartext: 'Limpiar',
        canceltext: 'Cancelar',
        autoclose: false,
        ampmclickable: true
      });

      $('.datepicker').pickadate({
        selectMonths: false,
        selectYears: 15,
        format: 'dd-mm-yyyy',
        today: 'Hoy',
        clear: 'Limpiar',
        close: 'Ok',
        closeOnSelect: true,
        monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'],
        weekdaysLetter: ['D', 'L', 'M', 'M', 'J', 'V', 'S']
      });
    }
  }, {
    key: 'handleSearch',
    value: function handleSearch() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();

        var f = self.props.onSearch;
        if (f) {
          var inputMatrix = document.querySelector('#input-s-matrix');
          var inputGroup = document.querySelector('#input-s-group');

          var inputSearchdAtDateOf = document.querySelector('#input-created-at-date-of');
          var inputSearchdAtTimeOf = document.querySelector('#content-created-at-time-of');

          var inputSearchdAtDateTo = document.querySelector('#input-created-at-date-to');
          var inputSearchdAtTimeTo = document.querySelector('#content-created-at-time-to');

          var dateOf = inputSearchdAtDateOf.value.trim();
          var timeOf = inputSearchdAtTimeOf.value.trim();

          var dateTo = inputSearchdAtDateTo.value.trim();
          var timeTo = inputSearchdAtTimeTo.value.trim();

          dateOf = self.parseDate(dateOf);
          dateTo = self.parseDate(dateTo);

          var start_date = false;
          var final_date = false;

          if (dateOf != '' && dateTo != '') {
            start_date = dateOf + ' ' + timeOf + ':00';
            final_date = dateTo + ' ' + timeTo + ':00';
          }

          var matrix_id = inputMatrix.value.trim();
          var group_id = inputGroup.value.trim();

          matrix_id = parseInt(matrix_id);
          group_id = parseInt(group_id);

          var json = {
            matrix_id: matrix_id,
            group_id: group_id,
            start_date: start_date,
            final_date: final_date
          };

          f(json);
        }
      };

      return fn;
    }
  }, {
    key: 'handleCreate',
    value: function handleCreate() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();

        var fn = self.props.openCreate;
        if (fn) fn();
      };

      return fn;
    }
  }, {
    key: 'handleChangeMatrix',
    value: function handleChangeMatrix() {
      var self = this;

      var fn = function fn(evt) {
        var value = evt.target.value;
        var id = parseInt(value);
        if (!id) {
          self.setState({ groups_: [] });
          return;
        }

        var matrices = self.state.matrices_;
        for (var i = 0; i < matrices.length; i++) {
          var matrix = matrices[i];
          if (matrix) {
            if (matrix.id == id) {
              var groups_ = matrix.groups;

              self.setState({ groups_: groups_ }, function () {
                self.initializePickers();
              });

              return;
            }
          }
        }
      };

      return fn;
    }
  }, {
    key: 'parseDate',
    value: function parseDate(s) {
      if (s) {
        if ((0, _underscore.isString)(s)) {
          var elements = s.split('-');
          elements = elements.reverse();

          var value = '';
          for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (i == 0) {
              value = '' + element;
            } else {
              value = value + '-' + element;
            }
          }

          return value;
        }
      }

      return s;
    }
  }, {
    key: 'createOptMG',
    value: function createOptMG() {
      var self = this;

      var fn = function fn(item, index) {
        var key = index + 1;

        return (0, _preact.h)(
          'option',
          { key: key, value: item.id },
          item.name
        );
      };

      return fn;
    }
  }, {
    key: 'render',
    value: function render(props, state) {
      return (0, _preact.h)(
        'form',
        { className: 'formulario', onSubmit: this.handleSearch() },
        (0, _preact.h)(
          'div',
          { className: 'all_notes' },
          (0, _preact.h)(
            'div',
            { className: 'variable' },
            (0, _preact.h)(
              'div',
              { className: 'col m12' },
              (0, _preact.h)(
                'select',
                { className: 'browser-default sion-select', id: 'input-s-matrix', onChange: this.handleChangeMatrix() },
                (0, _preact.h)(
                  'option',
                  null,
                  'Matrices'
                ),
                state.matrices_.map(this.createOptMG())
              ),
              (0, _preact.h)('br', null)
            ),
            (0, _preact.h)(
              'div',
              { className: 'col m12' },
              (0, _preact.h)(
                'select',
                { className: 'browser-default sion-select', id: 'input-s-group' },
                (0, _preact.h)(
                  'option',
                  null,
                  'Grupos'
                ),
                state.groups_.map(this.createOptMG())
              ),
              (0, _preact.h)('br', null)
            ),
            (0, _preact.h)(
              'div',
              { className: 'col m12' },
              (0, _preact.h)('div', { id: 'content-created-at-date-of', className: 'dates col s6 m6' }),
              (0, _preact.h)(
                'div',
                { className: 'dates col s6 m6' },
                (0, _preact.h)('input', { id: 'content-created-at-time-of', placeholder: 'Hora', type: 'text', className: 'timepicker' })
              )
            ),
            (0, _preact.h)(
              'div',
              { className: 'col m12' },
              (0, _preact.h)('div', { id: 'content-created-at-date-to', className: 'dates col s6 m6' }),
              (0, _preact.h)(
                'div',
                { className: 'dates col s6 m6' },
                (0, _preact.h)('input', { id: 'content-created-at-time-to', placeholder: 'Hora', type: 'text', className: 'timepicker' })
              )
            ),
            (0, _preact.h)(
              'div',
              { className: 'row' },
              (0, _preact.h)(
                'div',
                { className: 'col m6' },
                (0, _preact.h)(
                  'button',
                  { type: 'submit', className: 'btn red' },
                  (0, _preact.h)(
                    'i',
                    { className: 'material-icons prefix left' },
                    'search'
                  ),
                  'Buscar'
                )
              ),
              (0, _preact.h)(
                'div',
                { className: 'col m6' },
                (0, _preact.h)(
                  'button',
                  { type: 'button', className: 'btn green', onClick: this.handleCreate() },
                  (0, _preact.h)(
                    'i',
                    { className: 'material-icons prefix left' },
                    'add'
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return SearchForm;
}(_preact.Component);

exports.default = SearchForm;

/***/ }),

/***/ "./src/operations_module/table.jsx":
/*!*****************************************!*\
  !*** ./src/operations_module/table.jsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.esm.js");

var _pagination = __webpack_require__(/*! ./../pagination.jsx */ "./src/pagination.jsx");

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RowTable = function (_Component) {
  _inherits(RowTable, _Component);

  function RowTable(props) {
    _classCallCheck(this, RowTable);

    return _possibleConstructorReturn(this, (RowTable.__proto__ || Object.getPrototypeOf(RowTable)).call(this, props));
  }

  _createClass(RowTable, [{
    key: 'handleGet',
    value: function handleGet() {
      var self = this;

      var fn = function fn() {
        var json = self.props.row;
        self.props.onGet(json);
      };

      return fn;
    }
  }, {
    key: 'handleDelete',
    value: function handleDelete() {
      var self = this;

      var fn = function fn() {
        var json = self.props.row;
        var title = json.title;

        var message = '\xBFDesea eliminar la operaci\xF3n: ' + title + '?';
        var result = window.confirm(message);
        if (result) {
          self.props.onDelete(json);
        }
      };

      return fn;
    }
  }, {
    key: 'render',
    value: function render() {
      var row = this.props.row;

      return (0, _preact.h)(
        'tr',
        null,
        (0, _preact.h)(
          'td',
          null,
          row.index
        ),
        (0, _preact.h)(
          'td',
          null,
          row.group
        ),
        (0, _preact.h)(
          'td',
          null,
          row.title
        ),
        (0, _preact.h)(
          'td',
          null,
          row.description
        ),
        (0, _preact.h)(
          'td',
          null,
          row.created_at_out
        ),
        (0, _preact.h)(
          'td',
          null,
          (0, _preact.h)(
            'a',
            { title: 'Editar', className: 'btn-floating green', href: '#', onClick: this.handleGet() },
            (0, _preact.h)(
              'i',
              { className: 'material-icons' },
              'edit'
            )
          ),
          (0, _preact.h)(
            'a',
            { title: 'Borrar', className: 'btn-floating red', href: '#', onClick: this.handleDelete() },
            (0, _preact.h)(
              'i',
              { className: 'material-icons' },
              'delete'
            )
          )
        )
      );
    }
  }]);

  return RowTable;
}(_preact.Component);

var Table = function (_Component2) {
  _inherits(Table, _Component2);

  function Table(props) {
    _classCallCheck(this, Table);

    var _this2 = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

    _this2.state = { rows: false };
    return _this2;
  }

  _createClass(Table, [{
    key: 'handleGet',
    value: function handleGet() {
      var self = this;

      var fn = function fn(json) {
        self.props.onGet(json);
      };

      return fn;
    }
  }, {
    key: 'handleDelete',
    value: function handleDelete() {
      var self = this;

      var fn = function fn(json) {
        self.props.onDelete(json);
      };

      return fn;
    }
  }, {
    key: 'handleUpdateItems',
    value: function handleUpdateItems() {
      var self = this;

      var fn = function fn(page) {
        var f = self.props.onUpdateItems;
        if (f) f(page);
      };

      return fn;
    }
  }, {
    key: 'createRow',
    value: function createRow() {
      var self = this;

      var fn = function fn(item) {
        return (0, _preact.h)(RowTable, { key: item.id, row: item, onGet: self.handleGet(), onDelete: self.handleDelete() });
      };

      return fn;
    }
  }, {
    key: 'render',
    value: function render() {
      var items = this.props.items;
      var total_rows = this.props.total_rows;

      var rows = false;
      var pagination = false;

      if (items.length > 0) {
        rows = items.map(this.createRow());
        pagination = (0, _preact.h)(_pagination2.default, { total_rows: total_rows, onUpdateItems: this.handleUpdateItems() });
      }

      if (!rows) {
        rows = (0, _preact.h)(
          'tr',
          null,
          (0, _preact.h)(
            'td',
            { className: 'center', colSpan: '6' },
            'Sin operaciones registradas'
          )
        );
      }

      return (0, _preact.h)(
        'section',
        null,
        (0, _preact.h)(
          'div',
          { className: 'row' },
          (0, _preact.h)(
            'table',
            { className: 'responsive-table centered' },
            (0, _preact.h)(
              'thead',
              null,
              (0, _preact.h)(
                'tr',
                null,
                (0, _preact.h)(
                  'th',
                  null,
                  'N\xBA'
                ),
                (0, _preact.h)(
                  'th',
                  null,
                  'Pozo'
                ),
                (0, _preact.h)(
                  'th',
                  null,
                  'T\xEDtulo'
                ),
                (0, _preact.h)(
                  'th',
                  null,
                  'Descripci\xF3n'
                ),
                (0, _preact.h)(
                  'th',
                  null,
                  'Fecha'
                ),
                (0, _preact.h)('th', null)
              )
            ),
            (0, _preact.h)(
              'tbody',
              null,
              rows
            )
          )
        ),
        pagination
      );
    }
  }]);

  return Table;
}(_preact.Component);

exports.default = Table;

/***/ }),

/***/ "./src/operations_module/update-form.jsx":
/*!***********************************************!*\
  !*** ./src/operations_module/update-form.jsx ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.esm.js");

var _underscore = __webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js");

var _constants = __webpack_require__(/*! ./../constants.js */ "./src/constants.js");

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UpdateForm = function (_Component) {
  _inherits(UpdateForm, _Component);

  function UpdateForm(props) {
    _classCallCheck(this, UpdateForm);

    var _this = _possibleConstructorReturn(this, (UpdateForm.__proto__ || Object.getPrototypeOf(UpdateForm)).call(this, props));

    _this.state = {
      matrices_: [],
      groups_: [],

      created_at_date: ''
    };
    return _this;
  }

  _createClass(UpdateForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var o = this.props.item;
      if (o) {
        var inputTitle = document.querySelector('#input-u-title');
        var inputDescription = document.querySelector('#input-u-description');

        inputTitle.value = o.title;
        inputDescription.value = o.description;
      }

      this.getMatrices();
    }
  }, {
    key: 'getMatrices',
    value: function getMatrices() {
      var self = this;

      var url = _constants2.default.URL_SERVER_MATRICES + '/list?with_structure=true&with_structure_json=false';

      var xhr = $.ajax({
        url: url,
        type: _constants2.default.METHOD_GET,
        dataType: _constants2.default.JSON
      });

      xhr.done(function (res, status, response) {
        if (response.status == _constants2.default.STATUS_OK) {
          self.parseMatrices(res.docs);
        } else if (response.status == _constants2.default.STATUS_ACCEPTED) {
          alert(res.message);
        }
      });

      xhr.fail(function (res, status, respose) {
        if (res.responseJSON) {
          var json = res.responseJSON;
          alert(json.message);
        } else {
          alert(_constants2.default.MESSAGE_ERROR);
        }
      });
    }
  }, {
    key: 'getGroups',
    value: function getGroups(s) {
      var groups = [];

      if (!(0, _underscore.isArray)(s)) s = [];

      for (var i = 0; i < s.length; i++) {
        var g = s[i];
        var groups_ = [];

        if (g.sons) groups_ = this.getGroups(g.sons);

        var g_ = { id: g.id, name: g.name };
        if (g.variables) g_.variables = g.variables;

        groups.push(g_);

        if (groups_.length > 0) {
          for (var j = 0; j < groups_.length; j++) {
            var _g_ = groups_[j];
            groups.push(_g_);
          }
        }
      }

      return groups;
    }
  }, {
    key: 'parseMatrices',
    value: function parseMatrices(matrices) {
      var self = this;

      var matricesOut = [];

      if (!(0, _underscore.isArray)(matrices)) matrices = [];

      for (var i = 0; i < matrices.length; i++) {
        var matrix = matrices[i];
        if (matrix) {
          var _o = {
            id: matrix.id,
            name: matrix.name
          };

          var structure = matrix.structure;
          if (!structure) structure = [];

          var groups = this.getGroups(structure);

          _o.groups = groups;

          matricesOut.push(_o);
        }
      }

      var o = self.props.item;
      if (o) {
        (function () {
          var matrix_id = o.matrix_id;
          var group_id = o.group_id;

          for (var _i = 0; _i < matricesOut.length; _i++) {
            var _matrix = matricesOut[_i];
            if (_matrix.id == matrix_id) {
              var _groups = _matrix.groups;
              for (var j = 0; j < _groups.length; j++) {
                var group = _groups[j];
                if (group.id == group_id) {
                  self.setState({ matrices_: matricesOut, groups_: _groups }, function () {
                    var inputMatrix = document.querySelector('#input-u-matrix');
                    var inputGroup = document.querySelector('#input-u-group');

                    inputMatrix.value = matrix_id;
                    inputGroup.value = group_id;

                    self.initializePickers();

                    var inputCreatedAtDate = document.querySelector('#input-created-at-u-date');
                    var inputCreatedAtTime = document.querySelector('#input-created-at-u-time');

                    var created_at_out = o.created_at_out;
                    var values = created_at_out.split(' ');
                    if (values.length == 2) {
                      var date = values[0];
                      var time = values[1];

                      var times = time.split(':');
                      if (times.length == 3) {
                        var hours = times[0];
                        var mins = times[1];
                        time = hours + ':' + mins;
                      }

                      date = self.parseDate(date);

                      self.state.created_at_date = date;

                      inputCreatedAtDate.value = date;
                      inputCreatedAtTime.value = time;
                    }
                  });

                  break;
                }
              }

              break;
            }
          }
        })();
      }

      /*this.setState({ matrices_: matricesOut }, () => {
        let o = self.props.item;
        if (o) {
          let matrix_id = o.matrix_id;
          let group_id = o.group_id;
           let matrices = self.state.matrices_;
          for (let i = 0; i < matrices.length; i++) {
            const matrix = matrices[i];
            if (matrix.id == matrix_id) {
              let groups = matrix.groups;
              for (let j = 0; j < groups.length; j++) {
                const group = groups[j];
                if (group.id == group_id) {
                  self.setState({ groups_: groups }, () => {
                    let inputMatrix = document.querySelector('#input-u-matrix');
                    let inputGroup = document.querySelector('#input-u-group');
                     inputMatrix.value = matrix_id;
                    inputGroup.value = group_id;
                    
                    self.initializePickers();
                     let inputCreatedAtDate = document.querySelector('#input-created-at-u-date');
                    let inputCreatedAtTime = document.querySelector('#input-created-at-u-time');
                     let created_at_out = o.created_at_out;
                    let values = created_at_out.split(' ');
                    if (values.length == 2) {
                      let date = values[0];
                      let time = values[1];
                       date = self.parseDate(date);
                      
                      self.state.created_at_date = date;
                       inputCreatedAtDate.value = date;
                      inputCreatedAtTime.value = time;
                    }
                  });
                   break;
                }
              }
               break;
            }
          }
        }
      });*/
    }
  }, {
    key: 'initializePickers',
    value: function initializePickers() {
      var self = this;

      var created_at_date = this.state.created_at_date;
      if (!created_at_date) created_at_date = '';

      $('#content-created-at-u-date').html('');
      $('#content-created-at-u-date').append('<input type="text" id="input-created-at-u-date" class="datepicker" placeholder="Fecha"  value="' + created_at_date + '" />');

      $('#input-created-at-u-date').on('change', function (evt) {
        self.state.created_at_date = evt.target.value;
      });

      $('.timepicker').pickatime({
        default: 'now',
        fromnow: 0,
        twelvehour: false,
        donetext: 'OK',
        cleartext: 'Limpiar',
        canceltext: 'Cancelar',
        autoclose: false,
        ampmclickable: true
      });

      $('.datepicker').pickadate({
        selectMonths: false,
        selectYears: 15,
        format: 'dd-mm-yyyy',
        today: 'Hoy',
        clear: 'Limpiar',
        close: 'Ok',
        closeOnSelect: true,
        monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'],
        weekdaysLetter: ['D', 'L', 'M', 'M', 'J', 'V', 'S']
      });
    }
  }, {
    key: 'handleUpdate',
    value: function handleUpdate() {
      var _this2 = this;

      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();

        var o = _this2.props.item;
        if (o) {
          var f = self.props.onUpdate;
          if (f) {
            var inputMatrix = document.querySelector('#input-u-matrix');
            var inputGroup = document.querySelector('#input-u-group');
            var inputTitle = document.querySelector('#input-u-title');
            var inputDescription = document.querySelector('#input-u-description');

            var inputUpdatedAtDate = document.querySelector('#input-created-at-u-date');
            var inputUpdatedAtTime = document.querySelector('#input-created-at-u-time');

            var date = inputUpdatedAtDate.value.trim();
            var time = inputUpdatedAtTime.value.trim();

            date = self.parseDate(date);

            var created_at = date + ' ' + time + ':00';

            var matrix_id = inputMatrix.value.trim();
            var group_id = inputGroup.value.trim();
            var title = inputTitle.value.trim();
            var description = inputDescription.value.trim();

            matrix_id = parseInt(matrix_id);
            group_id = parseInt(group_id);

            var json = {
              matrix_id: matrix_id,
              group_id: group_id,
              title: title,
              description: description,
              created_at_in: created_at
            };

            f(json, o.id);
          }
        }
      };

      return fn;
    }
  }, {
    key: 'handleChangeMatrix',
    value: function handleChangeMatrix() {
      var self = this;

      var fn = function fn(evt) {
        var value = evt.target.value;
        var id = parseInt(value);
        if (!id) {
          self.setState({ groups_: [] });
          return;
        }

        var matrices = self.state.matrices_;
        for (var i = 0; i < matrices.length; i++) {
          var matrix = matrices[i];
          if (matrix) {
            if (matrix.id == id) {
              var groups_ = matrix.groups;
              self.setState({ groups_: groups_ }, function () {
                self.initializePickers();
              });

              return;
            }
          }
        }
      };

      return fn;
    }
  }, {
    key: 'handleBack',
    value: function handleBack() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();

        var f = self.props.onBack;
        if (f) f();
      };

      return fn;
    }
  }, {
    key: 'parseDate',
    value: function parseDate(s) {
      if (s) {
        if ((0, _underscore.isString)(s)) {
          var elements = s.split('-');
          elements = elements.reverse();

          var value = '';
          for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (i == 0) {
              value = '' + element;
            } else {
              value = value + '-' + element;
            }
          }

          return value;
        }
      }

      return s;
    }
  }, {
    key: 'createOptMG',
    value: function createOptMG() {
      var self = this;

      var fn = function fn(item, index) {
        var key = index + 1;

        return (0, _preact.h)(
          'option',
          { key: key, value: item.id },
          item.name
        );
      };

      return fn;
    }
  }, {
    key: 'render',
    value: function render(props, state) {
      return (0, _preact.h)(
        'form',
        { className: 'formulario', onSubmit: this.handleUpdate() },
        (0, _preact.h)(
          'div',
          { className: 'all_notes' },
          (0, _preact.h)(
            'div',
            { className: 'variable' },
            (0, _preact.h)(
              'div',
              { className: 'col m12' },
              (0, _preact.h)(
                'select',
                { className: 'browser-default sion-select', id: 'input-u-matrix', onChange: this.handleChangeMatrix() },
                (0, _preact.h)(
                  'option',
                  null,
                  'Matrices'
                ),
                state.matrices_.map(this.createOptMG())
              ),
              (0, _preact.h)('br', null)
            ),
            (0, _preact.h)(
              'div',
              { className: 'col m12' },
              (0, _preact.h)(
                'select',
                { className: 'browser-default sion-select', id: 'input-u-group' },
                (0, _preact.h)(
                  'option',
                  null,
                  'Grupos'
                ),
                state.groups_.map(this.createOptMG())
              ),
              (0, _preact.h)('br', null)
            ),
            (0, _preact.h)(
              'div',
              { className: 'col m12' },
              (0, _preact.h)('input', { type: 'text', id: 'input-u-title', placeholder: 'Titulo' })
            ),
            (0, _preact.h)(
              'div',
              { className: 'col m12' },
              (0, _preact.h)('input', { type: 'text', id: 'input-u-description', placeholder: 'Descripci\xF3n' })
            ),
            (0, _preact.h)(
              'div',
              { className: 'col m12' },
              (0, _preact.h)('div', { id: 'content-created-at-u-date', className: 'dates col s6 m6' }),
              (0, _preact.h)(
                'div',
                { className: 'dates col s6 m6' },
                (0, _preact.h)('input', { id: 'input-created-at-u-time', placeholder: 'Hora', type: 'text', className: 'timepicker' })
              )
            ),
            (0, _preact.h)(
              'div',
              { className: 'row' },
              (0, _preact.h)(
                'div',
                { className: 'col m6' },
                (0, _preact.h)(
                  'button',
                  { type: 'button', className: 'btn gray', onClick: this.handleBack() },
                  (0, _preact.h)(
                    'i',
                    { className: 'material-icons prefix left' },
                    'keyboard_backspace'
                  )
                )
              ),
              (0, _preact.h)(
                'div',
                { className: 'col m6' },
                (0, _preact.h)(
                  'button',
                  { type: 'submit', className: 'btn blue' },
                  'Guardar'
                )
              )
            )
          )
        )
      );
    }
  }]);

  return UpdateForm;
}(_preact.Component);

exports.default = UpdateForm;

/***/ }),

/***/ "./src/pagination.jsx":
/*!****************************!*\
  !*** ./src/pagination.jsx ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.esm.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pagination = function (_Component) {
  _inherits(Pagination, _Component);

  function Pagination(props) {
    _classCallCheck(this, Pagination);

    return _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, props));
  }

  _createClass(Pagination, [{
    key: "handleBack",
    value: function handleBack() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();

        var f = self.props.onBack;
        if (f) f();
      };

      return fn;
    }
  }, {
    key: "handleNext",
    value: function handleNext() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();

        var f = self.props.onNext;
        if (f) f();
      };

      return fn;
    }
  }, {
    key: "handleItem",
    value: function handleItem(index) {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();

        var f = self.props.onItem;
        if (f) f(index);
      };

      return fn;
    }
  }, {
    key: "createItem",
    value: function createItem() {
      var self = this;

      var fn = function fn(item) {
        var isActive = item.active;
        var className = "waves-effect";
        if (isActive) {
          className = "active";
        }

        return (0, _preact.h)(
          "li",
          { className: className },
          (0, _preact.h)(
            "a",
            { href: "#", onClick: self.handleItem(item.label) },
            item.label
          )
        );
      };

      return fn;
    }
  }, {
    key: "render",
    value: function render(props, state) {
      // disabled waves-effect
      var items = props.items;
      var num_pages = props.num_pages;
      var page = props.page;

      if (!items) items = [];
      if (!page) page = Pagination.FIRST_PAGE;
      if (!num_pages) num_pages = 0;

      var items_back = false;
      var items_next = false;

      if (items.length > 1) {
        var first = items[0];
        if (first.label > 1) {
          items_back = function () {
            return (0, _preact.h)(
              "li",
              { className: "waves-effect" },
              (0, _preact.h)(
                "a",
                { href: "#" },
                "..."
              )
            );
          }();
        }

        var index = items.length - 1;
        var last = items[index];
        if (last.label < num_pages) {
          items_next = function () {
            return (0, _preact.h)(
              "li",
              { className: "waves-effect" },
              (0, _preact.h)(
                "a",
                { href: "#" },
                "..."
              )
            );
          }();
        }
      }

      var nextClass = 'disabled';
      var backClass = 'disabled';

      if (page == 1) backClass = 'waves-effect';
      if (page == items.length) nextClass = 'waves-effect';

      return (0, _preact.h)(
        "ul",
        { className: "pagination" },
        (0, _preact.h)(
          "li",
          { className: backClass, onClick: this.handleBack() },
          (0, _preact.h)(
            "a",
            { href: "#" },
            (0, _preact.h)(
              "i",
              { className: "material-icons" },
              "chevron_left"
            )
          )
        ),
        items_back,
        items.map(this.createItem()),
        items_next,
        (0, _preact.h)(
          "li",
          { className: nextClass },
          (0, _preact.h)(
            "a",
            { href: "#", onClick: this.handleNext() },
            (0, _preact.h)(
              "i",
              { className: "material-icons" },
              "chevron_right"
            )
          )
        )
      );
    }
  }]);

  return Pagination;
}(_preact.Component);

Pagination.ROWS_PER_PAGE = 10;
Pagination.FIRST_PAGE = 1;
Pagination.LIMIT_PAGES = 10;

exports.default = Pagination;

/***/ })

/******/ });
//# sourceMappingURL=operations_module.js.map