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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/units/content.jsx");
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
var constants = {
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

  EVENT_UDAPTE_VARIABLES: 'update-variables',
  EVENT_ALARMS_VARIABLES: 'alarms-variables',
  EVENT_COMMENT_VARIABLE: 'comment-variable',

  EVENT_UDAPTE_ALARMS_ACTIVE: 'update-alarms-active',
  EVENT_UDAPTE_VARIABLES_VALUE: 'update-variables-value',
  EVENT_UDAPTE_VARIABLES_ALARM: 'update-variables-alarm',

  EVENT_REQUEST_REPORT: 'request-report',
  EVENT_RESPONSE_REPORT: 'response-report',

  EVENT_CREATE_FILE: 'create-file',
  EVENT_COPY_FILE: 'copy-file',
  EVENT_MOVE_FILE: 'move-file',
  EVENT_RENAME_FILE: 'rename-file',
  EVENT_DELETE_FILE: 'delete-file',
  EVENT_GET_CONTENT: 'get-content',

  EXT_DOC: 'doc',
  EXT_DOCX: 'docx',
  EXT_GIF: 'gif',
  EXT_JPEG: 'jpeg',
  EXT_JPG: 'jpg',
  EXT_MIDI: 'midi',
  EXT_MP3: 'mp3',
  EXT_MP4: 'mp4',
  EXT_PDF: 'pdf',
  EXT_PNG: 'png',
  EXT_PPT: 'ppt',
  EXT_PPTX: 'pptx',
  EXT_PUB: 'pub',
  EXT_RAR: 'rar',
  EXT_TXT: 'txt',
  EXT_VSD: 'vsd',
  EXT_WAV: 'wav',
  EXT_XLS: 'xls',
  EXT_XLSX: 'xlsx',
  EXT_ZIP: 'zip',

  STATUS_OK: 200,
  STATUS_CREATED: 201,
  STATUS_ACCEPTED: 202,

  METHOD_GET: 'GET',
  METHOD_POST: 'POST',
  METHOD_PUT: 'PUT',
  METHOD_DELETE: 'DELETE',

  JSON: 'json',
  APPLICATION_JSON: 'application/json',

  TTX_PROTOCOOL: 'ttx-protocol',

  MARKER_ICON: 'marker_icon',

  NA: 'N/A',

  MESSAGE_ERROR: 'Ocurrió un error al solicitar la información'
};

exports.default = constants;

/***/ }),

/***/ "./src/units/content.jsx":
/*!*******************************!*\
  !*** ./src/units/content.jsx ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.esm.js");

var _constants = __webpack_require__(/*! ./../constants.js */ "./src/constants.js");

var _constants2 = _interopRequireDefault(_constants);

var _table = __webpack_require__(/*! ./table.jsx */ "./src/units/table.jsx");

var _table2 = _interopRequireDefault(_table);

var _createForm = __webpack_require__(/*! ./create-form.jsx */ "./src/units/create-form.jsx");

var _createForm2 = _interopRequireDefault(_createForm);

var _updateForm = __webpack_require__(/*! ./update-form.jsx */ "./src/units/update-form.jsx");

var _updateForm2 = _interopRequireDefault(_updateForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ENTER = 13;

var Content = function (_Component) {
  _inherits(Content, _Component);

  function Content() {
    _classCallCheck(this, Content);

    var _this = _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this));

    _this.state = {
      items: [],
      item: false,
      updateForm: false,
      search: ''
    };
    return _this;
  }

  _createClass(Content, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getUnits();
    }
  }, {
    key: 'getUnits',
    value: function getUnits() {
      var self = this;

      var url = _constants2.default.URL_SERVER_UNITS + '/list';

      var xhr = $.ajax({
        url: url,
        type: _constants2.default.METHOD_GET,
        dataType: _constants2.default.JSON
      });

      xhr.done(function (res, status, response) {
        if (response.status == _constants2.default.STATUS_OK) {
          self.setState({ items: res.docs });
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
    key: 'getUnitsForSearch',
    value: function getUnitsForSearch(value) {
      var self = this;

      var url = _constants2.default.URL_SERVER_UNITS + '/list?search=' + value;

      var xhr = $.ajax({
        url: url,
        type: _constants2.default.METHOD_GET,
        dataType: _constants2.default.JSON
      });

      xhr.done(function (res, status, response) {
        if (response.status == _constants2.default.STATUS_OK) {
          self.setState({ items: res.docs });
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
    key: 'getUnit',
    value: function getUnit() {
      var self = this;

      var fn = function fn(json) {
        var xhr = $.ajax({
          url: _constants2.default.URL_SERVER_UNITS + '/' + json.id,
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
            alert(_json.message);
          } else {
            alert(_constants2.default.MESSAGE_ERROR);
          }
        });
      };

      return fn;
    }
  }, {
    key: 'addUnit',
    value: function addUnit() {
      var self = this;

      var fn = function fn(json) {
        var xhr = $.ajax({
          url: _constants2.default.URL_SERVER_UNITS,
          type: _constants2.default.METHOD_POST,
          contentType: _constants2.default.APPLICATION_JSON,
          data: JSON.stringify(json)
        });

        xhr.done(function (res, status, response) {
          if (response.status == _constants2.default.STATUS_CREATED) {
            self.addItem(null, res.doc);
          } else if (response.status == _constants2.default.STATUS_ACCEPTED) {
            self.addItem(res.message);
          }
        });

        xhr.fail(function (res, status, respose) {
          $('#create-form').modal('hide');

          if (res.responseJSON) {
            var _json2 = res.responseJSON;
            alert(_json2.message);
          } else {
            alert(_constants2.default.MESSAGE_ERROR);
          }
        });
      };

      return fn;
    }
  }, {
    key: 'updateUnit',
    value: function updateUnit() {
      var self = this;

      var fn = function fn(json, id) {

        var xhr = $.ajax({
          url: _constants2.default.URL_SERVER_UNITS + '/' + id,
          type: _constants2.default.METHOD_PUT,
          contentType: _constants2.default.APPLICATION_JSON,
          data: JSON.stringify(json)
        });

        xhr.done(function (res, status, response) {
          if (response.status == _constants2.default.STATUS_OK) {
            self.updateItem(null, res.doc);
          } else if (response.status == _constants2.default.STATUS_ACCEPTED) {
            self.updateItem(res.message);
          }
        });

        xhr.fail(function (res, status, respose) {
          $('#update-form').modal('hide');

          if (res.responseJSON) {
            var _json3 = res.responseJSON;
            alert(_json3.message);
          } else {
            alert(_constants2.default.MESSAGE_ERROR);
          }
        });
      };

      return fn;
    }
  }, {
    key: 'deleteUnit',
    value: function deleteUnit() {
      var self = this;

      var fn = function fn(json) {
        var xhr = $.ajax({
          url: _constants2.default.URL_SERVER_UNITS + '/' + json.id,
          type: _constants2.default.METHOD_DELETE
        });

        xhr.done(function (res, status, response) {
          if (response.status == _constants2.default.STATUS_OK) {
            self.removeItem(null, json);
          } else if (response.status == _constants2.default.STATUS_ACCEPTED) {
            self.removeItem(res.message);
          }
        });

        xhr.fail(function (res, status, respose) {
          if (res.responseJSON) {
            var _json4 = res.responseJSON;
            alert(_json4.message);
          } else {
            alert(_constants2.default.MESSAGE_ERROR);
          }
        });
      };

      return fn;
    }
  }, {
    key: 'getItem',
    value: function getItem(err, item) {
      var _this2 = this;

      var self = this;

      if (err) {
        alert(err);
        return;
      }

      var form = (0, _preact.h)(_updateForm2.default, { item: item, onUpdate: this.updateUnit(), onCancel: this.handleBack() });

      this.setState({ updateForm: false }, function () {
        _this2.setState({ updateForm: form }, function () {
          $('#update-form').modal('show');
        });
      });
    }
  }, {
    key: 'addItem',
    value: function addItem(err, item) {
      $('#create-form').modal('hide');

      if (err) {
        alert(err);
        return;
      }

      var items = this.state.items;
      items.push(item);
      this.setState({ items: items });
    }
  }, {
    key: 'updateItem',
    value: function updateItem(err, item) {
      $('#update-form').modal('hide');

      if (err) {
        alert(err);
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

      this.setState({ items: items });
    }
  }, {
    key: 'removeItem',
    value: function removeItem(err, item) {
      var self = this;

      if (!err) {
        var items = self.state.items;
        for (var i = 0; i < items.length; i++) {
          var id = items[i].id;
          if (item.id == id) {
            items.splice(i, 1);
            break;
          }
        }

        self.setState({ items: items });
      } else {
        alert(err);
      }
    }
  }, {
    key: 'handleCreate',
    value: function handleCreate() {
      var self = this;

      var fn = function fn() {
        var inputName = document.querySelector('#input-c-name');
        var inputExpression = document.querySelector('#input-c-expression');
        var inputDisplay = document.querySelector('#input-c-display');

        inputName.value = '';
        inputExpression.value = '';
        inputDisplay = '';

        $('#create-form').modal('toggle');
      };

      return fn;
    }
  }, {
    key: 'handleChange',
    value: function handleChange() {
      var self = this;

      var fn = function fn(evt) {
        var value = evt.target.value;
        var space = ' ';
        var re = new RegExp(space, 'g');
        var nil = '';

        value = value.replace(re, nil);
        if (value == '') {
          self.getUnits();
        }
      };

      return fn;
    }
  }, {
    key: 'handleSearch',
    value: function handleSearch() {
      var self = this;

      var fn = function fn(evt) {
        if (evt.which == ENTER) {
          evt.preventDefault();
          var search = evt.target.value;
          if (search) {
            if (search !== '') {
              search = search.toLowerCase();
              self.getUnitsForSearch(search);
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

      var fn = function fn() {
        $('#create-form').modal('hide');
        $('#update-form').modal('hide');
      };

      return fn;
    }
  }, {
    key: 'render',
    value: function render(props, state) {
      return (0, _preact.h)(
        'div',
        null,
        (0, _preact.h)(
          'div',
          { className: 'row' },
          (0, _preact.h)(
            'div',
            { className: 'col-md-3' },
            (0, _preact.h)(
              'h4',
              null,
              'Unidades'
            )
          ),
          (0, _preact.h)(
            'div',
            { className: 'col-md-6' },
            (0, _preact.h)(
              'div',
              { className: 'form-group col-md-12' },
              (0, _preact.h)('input', { placeholder: 'Buscar...', type: 'text', className: 'form-control', onInput: this.handleChange(), onKeyPress: this.handleSearch() })
            )
          ),
          (0, _preact.h)(
            'div',
            { className: 'col-md-3' },
            (0, _preact.h)(
              'button',
              { type: 'button', className: 'btn btn-success', onClick: this.handleCreate() },
              (0, _preact.h)('span', { className: 'glyphicon glyphicon-plus', 'aria-hidden': 'true' }),
              ' Nuevo'
            )
          )
        ),
        (0, _preact.h)(_table2.default, { items: state.items, onGet: this.getUnit(), onDelete: this.deleteUnit() }),
        (0, _preact.h)(
          'div',
          { className: 'modal fade', id: 'create-form', tabindex: '-1' },
          (0, _preact.h)(
            'div',
            { className: 'modal-dialog modal-dialog-centered', role: 'document' },
            (0, _preact.h)(
              'div',
              { className: 'modal-content' },
              (0, _preact.h)(
                'div',
                { className: 'modal-header' },
                (0, _preact.h)(
                  'h4',
                  null,
                  'Registro de Unidad'
                ),
                (0, _preact.h)(
                  'button',
                  { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
                  (0, _preact.h)(
                    'span',
                    { 'aria-hidden': 'true' },
                    '\xD7'
                  )
                )
              ),
              (0, _preact.h)(
                'div',
                { className: 'modal-body' },
                (0, _preact.h)(_createForm2.default, { onCreate: this.addUnit(), onCancel: this.handleBack() })
              )
            )
          )
        ),
        (0, _preact.h)(
          'div',
          { className: 'modal fade', id: 'update-form', tabindex: '-1' },
          (0, _preact.h)(
            'div',
            { className: 'modal-dialog modal-dialog-centered', role: 'document' },
            (0, _preact.h)(
              'div',
              { className: 'modal-content' },
              (0, _preact.h)(
                'div',
                { className: 'modal-header' },
                (0, _preact.h)(
                  'h4',
                  null,
                  'Editar Unidad'
                ),
                (0, _preact.h)(
                  'button',
                  { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
                  (0, _preact.h)(
                    'span',
                    { 'aria-hidden': 'true' },
                    '\xD7'
                  )
                )
              ),
              (0, _preact.h)(
                'div',
                { className: 'modal-body' },
                state.updateForm
              )
            )
          )
        )
      );
    }
  }]);

  return Content;
}(_preact.Component);

(0, _preact.render)((0, _preact.h)(Content, null), document.getElementById('content-main'));

/***/ }),

/***/ "./src/units/create-form.jsx":
/*!***********************************!*\
  !*** ./src/units/create-form.jsx ***!
  \***********************************/
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

var CreateForm = function (_Component) {
  _inherits(CreateForm, _Component);

  function CreateForm(props) {
    _classCallCheck(this, CreateForm);

    var _this = _possibleConstructorReturn(this, (CreateForm.__proto__ || Object.getPrototypeOf(CreateForm)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(CreateForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var inputName = document.querySelector('#input-c-name');
      var inputExpression = document.querySelector('#input-c-expression');
      var inputDisplay = document.querySelector('#input-c-display');

      inputName.value = '';
      inputExpression.value = '';
      inputDisplay.value = '';
    }
  }, {
    key: 'handleCreate',
    value: function handleCreate() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();

        var inputName = document.querySelector('#input-c-name');
        var inputExpression = document.querySelector('#input-c-expression');
        var inputDisplay = document.querySelector('#input-c-display');

        var name = inputName.value.trim();
        var expression = inputExpression.value.trim();
        var display = inputDisplay.value.trim();

        var json = {};

        json.name = name;
        json.expression = expression;
        json.display = display;

        self.props.onCreate(json);
      };

      return fn;
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel() {
      var _this2 = this;

      var self = this;

      var fn = function fn() {
        if (_this2.props.onCancel) {
          _this2.props.onCancel();
        }
      };

      return fn;
    }
  }, {
    key: 'render',
    value: function render(props, state) {
      return (0, _preact.h)(
        'section',
        null,
        (0, _preact.h)(
          'div',
          { className: 'row' },
          (0, _preact.h)(
            'div',
            { className: 'col-md-12' },
            (0, _preact.h)(
              'form',
              { onSubmit: this.handleCreate() },
              (0, _preact.h)(
                'div',
                { className: 'form-group' },
                (0, _preact.h)(
                  'label',
                  { htmlFor: 'input-c-name' },
                  'Nombre'
                ),
                (0, _preact.h)('input', { type: 'text', className: 'form-control', id: 'input-c-name', placeholder: 'Nombre' })
              ),
              (0, _preact.h)(
                'div',
                { className: 'form-group' },
                (0, _preact.h)(
                  'label',
                  { htmlFor: 'input-c-expression' },
                  'Expresi\xF3n Matematica',
                  (0, _preact.h)('br', null),
                  '${value}: Valor de la Variable'
                ),
                (0, _preact.h)('textarea', { type: 'text', className: 'form-control', id: 'input-c-expression', placeholder: 'Expresi\xF3n' })
              ),
              (0, _preact.h)(
                'div',
                { className: 'form-group' },
                (0, _preact.h)(
                  'label',
                  { htmlFor: 'input-c-display' },
                  'Unidad a Mostrar'
                ),
                (0, _preact.h)('input', { type: 'text', className: 'form-control', id: 'input-c-display', placeholder: 'Unidad' })
              ),
              (0, _preact.h)(
                'div',
                { className: 'form-group col-md-12' },
                (0, _preact.h)('br', null),
                (0, _preact.h)('br', null),
                (0, _preact.h)(
                  'button',
                  { type: 'button', className: 'btn btn-warning', onClick: this.handleCancel() },
                  'Cancelar'
                ),
                (0, _preact.h)(
                  'button',
                  { type: 'submit', className: 'btn btn-success' },
                  'Guardar'
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

/***/ "./src/units/table.jsx":
/*!*****************************!*\
  !*** ./src/units/table.jsx ***!
  \*****************************/
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
        var name = json.name;

        var message = '\xBFDesea eliminar la unidad: ' + name + '?';
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
          row.name
        ),
        (0, _preact.h)(
          'td',
          null,
          row.expression
        ),
        (0, _preact.h)(
          'td',
          null,
          row.display
        ),
        (0, _preact.h)(
          'td',
          null,
          (0, _preact.h)(
            'button',
            { type: 'button', className: 'btn btn-info', onClick: this.handleGet() },
            (0, _preact.h)(
              'i',
              { className: 'material-icons' },
              'mode_edit'
            )
          ),
          (0, _preact.h)(
            'button',
            { type: 'button', className: 'btn btn-danger', onClick: this.handleDelete() },
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
    key: 'createRow',
    value: function createRow() {
      var self = this;

      var fn = function fn(item, index) {
        item.index = index + 1;
        return (0, _preact.h)(RowTable, { key: item.id, row: item, onGet: self.handleGet(), onDelete: self.handleDelete() });
      };

      return fn;
    }
  }, {
    key: 'render',
    value: function render() {
      var items = this.props.items;
      var rows = this.state.rows;

      if (items.length > 0) {
        rows = items.map(this.createRow());
      }

      if (!rows) {
        rows = (0, _preact.h)(
          'tr',
          null,
          (0, _preact.h)(
            'td',
            { className: 'center', colSpan: '5' },
            'Sin unidades registradas'
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
            { className: 'table table-hover' },
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
                  'Nombre'
                ),
                (0, _preact.h)(
                  'th',
                  null,
                  'Expresi\xF3n'
                ),
                (0, _preact.h)(
                  'th',
                  null,
                  'Unidad'
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
        )
      );
    }
  }]);

  return Table;
}(_preact.Component);

exports.default = Table;

/***/ }),

/***/ "./src/units/update-form.jsx":
/*!***********************************!*\
  !*** ./src/units/update-form.jsx ***!
  \***********************************/
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

var UpdateForm = function (_Component) {
  _inherits(UpdateForm, _Component);

  function UpdateForm(props) {
    _classCallCheck(this, UpdateForm);

    var _this = _possibleConstructorReturn(this, (UpdateForm.__proto__ || Object.getPrototypeOf(UpdateForm)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(UpdateForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var o = this.props.item;
      if (o) {
        var inputName = document.querySelector('#input-u-name');
        var inputExpression = document.querySelector('#input-u-expression');
        var inputDisplay = document.querySelector('#input-u-display');

        inputName.value = o.name;
        inputExpression.value = o.expression;
        inputDisplay.value = o.display;
      }
    }
  }, {
    key: 'handleUpdate',
    value: function handleUpdate() {
      var _this2 = this;

      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();

        var inputName = document.querySelector('#input-u-name');
        var inputExpression = document.querySelector('#input-u-expression');
        var inputDisplay = document.querySelector('#input-u-display');

        var name = inputName.value.trim();
        var expression = inputExpression.value.trim();
        var display = inputDisplay.value.trim();

        var json = {};

        json.name = name;
        json.expression = expression;
        json.display = display;

        var o = _this2.props.item;
        if (o) {
          self.props.onUpdate(json, o.id);
        }
      };

      return fn;
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel() {
      var _this3 = this;

      var self = this;

      var fn = function fn() {
        if (_this3.props.onCancel) {
          _this3.props.onCancel();
        }
      };

      return fn;
    }
  }, {
    key: 'render',
    value: function render(props, state) {
      return (0, _preact.h)(
        'section',
        null,
        (0, _preact.h)(
          'div',
          { className: 'row' },
          (0, _preact.h)(
            'div',
            { className: 'col-md-12' },
            (0, _preact.h)(
              'form',
              { onSubmit: this.handleUpdate() },
              (0, _preact.h)(
                'div',
                { className: 'form-group' },
                (0, _preact.h)(
                  'label',
                  { htmlFor: 'input-u-name' },
                  'Nombre'
                ),
                (0, _preact.h)('input', { type: 'text', className: 'form-control', id: 'input-u-name', placeholder: 'Nombre' })
              ),
              (0, _preact.h)(
                'div',
                { className: 'form-group' },
                (0, _preact.h)(
                  'label',
                  { htmlFor: 'input-u-expression' },
                  'Expresi\xF3n Matematica',
                  (0, _preact.h)('br', null),
                  '${value}: Valor de la Variable'
                ),
                (0, _preact.h)('textarea', { type: 'text', className: 'form-control', id: 'input-u-expression', placeholder: 'Expresi\xF3n' })
              ),
              (0, _preact.h)(
                'div',
                { className: 'form-group' },
                (0, _preact.h)(
                  'label',
                  { htmlFor: 'input-u-display' },
                  'Unidad a Mostrar'
                ),
                (0, _preact.h)('input', { type: 'text', className: 'form-control', id: 'input-u-display', placeholder: 'Unidad' })
              ),
              (0, _preact.h)(
                'div',
                { className: 'form-group col-md-12' },
                (0, _preact.h)('br', null),
                (0, _preact.h)('br', null),
                (0, _preact.h)(
                  'button',
                  { type: 'button', className: 'btn btn-warning', onClick: this.handleCancel() },
                  'Cancelar'
                ),
                (0, _preact.h)(
                  'button',
                  { type: 'submit', className: 'btn btn-success' },
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

/***/ })

/******/ });
//# sourceMappingURL=units.js.map