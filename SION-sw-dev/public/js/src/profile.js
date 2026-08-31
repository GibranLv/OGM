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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/profile/content.jsx");
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

/***/ "./src/profile/content.jsx":
/*!*********************************!*\
  !*** ./src/profile/content.jsx ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.esm.js");

var _header = __webpack_require__(/*! ./../header.jsx */ "./src/header.jsx");

var _header2 = _interopRequireDefault(_header);

var _constants = __webpack_require__(/*! ./../constants.js */ "./src/constants.js");

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MODULES = [{ id: _constants2.default.MATRIX_MODULE, name: 'Matriz de Variable' }, { id: _constants2.default.GRAPHIC_MODULE, name: 'Gráficas' }, { id: _constants2.default.REPORTS_MODULE, name: 'Reportes' }, { id: _constants2.default.OPERATIONS_MODULE, name: 'Operaciones' }, { id: _constants2.default.EVENTS_MODULE, name: 'Eventos' }, { id: _constants2.default.LOCATION_MODULE, name: 'Ubicación' }, { id: _constants2.default.LOCATOR_MODULE, name: 'Localización' }, { id: _constants2.default.EXPLORER_MODULE, name: 'Explorador' }, { id: _constants2.default.CONFIGURATION_MODULE, name: 'Configuración' }, { id: _constants2.default.PROFILE_MODULE, name: 'Perfil' }];

var RTS = [{ id: _constants2.default.RT_WS, name: 'WS' }, { id: _constants2.default.RT_HTTP, name: 'HTTP' }];

var ProfileContent = function (_Component) {
  _inherits(ProfileContent, _Component);

  function ProfileContent(props) {
    _classCallCheck(this, ProfileContent);

    var _this = _possibleConstructorReturn(this, (ProfileContent.__proto__ || Object.getPrototypeOf(ProfileContent)).call(this, props));

    _this.state = {
      notifications_: [],

      matrices_: [],

      file: false,
      avatar: false
    };
    return _this;
  }

  _createClass(ProfileContent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var self = this;

      this.getNotifications();

      this.getMatrices(function (message, matrices) {
        if (message) {
          Materialize.toast(message, 4000);

          _this2.getProfile();
          return;
        }

        self.setState({ matrices_: matrices }, function () {
          self.getProfile();
          self.getConfiguration();
        });
      });
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
    key: 'getMatrices',
    value: function getMatrices(fn) {
      var self = this;

      var url = _constants2.default.URL_SERVER_MATRICES + '/list?with_structure=false&with_structure_json=false';

      var xhr = $.ajax({
        url: url,
        type: _constants2.default.METHOD_GET,
        dataType: _constants2.default.JSON
      });

      xhr.done(function (res, status, response) {
        if (response.status == _constants2.default.STATUS_OK) {
          fn(null, res.docs);
        } else if (response.status == _constants2.default.STATUS_ACCEPTED) {
          fn(res.message);
        }
      });

      xhr.fail(function (res, status, respose) {
        if (res.responseJSON) {
          var json = res.responseJSON;
          fn(json.message);
        } else {
          fn(_constants2.default.MESSAGE_ERROR);
        }
      });
    }
  }, {
    key: 'getProfile',
    value: function getProfile() {
      var self = this;

      var xhr = $.ajax({
        url: _constants2.default.URL_SERVER_USERS + '/profile',
        type: _constants2.default.METHOD_GET,
        dataType: _constants2.default.JSON
      });

      xhr.done(function (res, status, response) {
        if (response.status == _constants2.default.STATUS_OK) {
          self.updateUserView(res.doc);
        } else if (response.status == _constants2.default.STATUS_ACCEPTED) {
          Materialize.toast(res.message, 4000);
        } else {
          Materialize.toast(_constants2.default.MESSAGE_ERROR, 4000);
        }
      });

      xhr.fail(function (res, status, respose) {
        if (res.responseJSON) {
          var json = res.responseJSON;
          Materialize.toast(json.message, 4000);
        } else {
          Materialize.toast(_constants2.default.MESSAGE_ERROR, 4000);
        }
      });
    }
  }, {
    key: 'getConfiguration',
    value: function getConfiguration() {
      var self = this;

      var xhr = $.ajax({
        url: _constants2.default.URL_SERVER_USERS + '/configuration',
        type: _constants2.default.METHOD_GET,
        dataType: _constants2.default.JSON
      });

      xhr.done(function (res, status, response) {
        if (response.status == _constants2.default.STATUS_OK) {
          self.updateConfigView(res.doc);
        } else if (response.status == _constants2.default.STATUS_ACCEPTED) {
          Materialize.toast(res.message, 4000);
        } else {
          Materialize.toast(_constants2.default.MESSAGE_ERROR, 4000);
        }
      });

      xhr.fail(function (res, status, respose) {
        if (res.responseJSON) {
          var json = res.responseJSON;
          Materialize.toast(json.message, 4000);
        } else {
          Materialize.toast(_constants2.default.MESSAGE_ERROR, 4000);
        }
      });
    }
  }, {
    key: 'updateProfile',
    value: function updateProfile(formData) {
      var self = this;

      var xhr = $.ajax({
        url: _constants2.default.URL_SERVER_USERS + '/profile',
        type: _constants2.default.METHOD_PUT,
        processData: false,
        contentType: false,
        data: formData
      });

      xhr.done(function (res, status, response) {
        if (response.status == _constants2.default.STATUS_OK) {
          Materialize.toast(_constants2.default.MESSAGE_SAVED_OK, 2500);

          var profile = res.doc;
          if (profile) {
            self.setState({ avatar: profile.avatar }, function () {
              var image = document.querySelector('#image-avatar');
              image.src = '/static/images/avatars/' + profile.avatar;

              $('#btn-update-avatar').css({ border: '2px solid #8c8c8c' });
            });
          }
        } else if (response.status == _constants2.default.STATUS_ACCEPTED) {
          Materialize.toast(res.message, 4000);
        } else {
          Materialize.toast(_constants2.default.MESSAGE_ERROR, 4000);
        }
      });

      xhr.fail(function (res, status, respose) {
        if (res.responseJSON) {
          var json = res.responseJSON;
          Materialize.toast(json.message, 4000);
        } else {
          Materialize.toast(_constants2.default.MESSAGE_ERROR, 4000);
        }
      });
    }
  }, {
    key: 'updateConfiguration',
    value: function updateConfiguration(json) {
      var self = this;

      var xhr = $.ajax({
        url: _constants2.default.URL_SERVER_USERS + '/configuration',
        type: _constants2.default.METHOD_PUT,
        contentType: _constants2.default.APPLICATION_JSON,
        data: JSON.stringify(json)
      });

      xhr.done(function (res, status, response) {
        if (response.status == _constants2.default.STATUS_OK) {
          Materialize.toast(_constants2.default.MESSAGE_SAVED_OK, 2500);
        } else if (response.status == _constants2.default.STATUS_ACCEPTED) {
          Materialize.toast(res.message, 4000);
        } else {
          Materialize.toast(_constants2.default.MESSAGE_ERROR, 4000);
        }
      });

      xhr.fail(function (res, status, respose) {
        if (res.responseJSON) {
          var _json = res.responseJSON;
          Materialize.toast(_json.message, 4000);
        } else {
          Materialize.toast(_constants2.default.MESSAGE_ERROR, 4000);
        }
      });
    }
  }, {
    key: 'handleUploadAvatar',
    value: function handleUploadAvatar() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();

        var file = self.state.file;
        if (file) {
          var formData = new FormData();
          formData.append('avatar', file);

          self.updateProfile(formData);
        }
      };

      return fn;
    }
  }, {
    key: 'handleChangeFile',
    value: function handleChangeFile() {
      var self = this;

      var fn = function fn(evt) {
        var file = evt.target.files[0];
        if (file) {
          self.setState({ file: file }, function () {
            var image = document.querySelector('#image-avatar');
            image.src = window.URL.createObjectURL(file);
            $('#btn-update-avatar').css({ border: '2px solid green' });
          });
        }
      };

      return fn;
    }
  }, {
    key: 'handleUpdateUser',
    value: function handleUpdateUser() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();

        var inputName = document.querySelector('#input-u-name');
        var inputJob = document.querySelector('#input-u-job');
        var inputEmail = document.querySelector('#input-u-email');
        var inputCompany = document.querySelector('#input-u-company');
        var inputPhone = document.querySelector('#input-u-phone');

        var o = {};

        var name = inputName.value.trim();
        if (name != '') o.name = name;

        var job = inputJob.value.trim();
        if (job != '') o.job = job;

        var email = inputEmail.value.trim();
        if (email != '') o.email = email;

        var company = inputCompany.value.trim();
        if (company != '') o.company = company;

        var phone = inputPhone.value.trim();
        if (phone != '') o.phone = phone;

        var formData = new FormData();
        formData.append('json', JSON.stringify(o));

        self.updateProfile(formData);
      };

      return fn;
    }
  }, {
    key: 'handleUpdateConfiguration',
    value: function handleUpdateConfiguration() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();

        var inputModule = document.querySelector('#input-u-module');
        var inputMatrix = document.querySelector('#input-u-matrix');
        var inputRT = document.querySelector('#input-u-rt');
        var inputCommentColumn = document.querySelector('#input-u-comment-column');

        var main_module = inputModule.value.trim();
        var main_matrix = inputMatrix.value.trim();
        var rt = inputRT.value.trim();
        var comment_column = inputCommentColumn.value.trim();

        main_module = parseInt(main_module);
        main_matrix = parseInt(main_matrix);
        rt = parseInt(rt);

        if (comment_column === '1') {
          comment_column = true;
        } else {
          comment_column = false;
        }

        var o = {
          main_module: main_module,
          main_matrix: main_matrix,
          rt: rt,
          comment_column: comment_column
        };

        self.updateConfiguration(o);
      };

      return fn;
    }
  }, {
    key: 'updateUserView',
    value: function updateUserView(user) {
      var inputUsername = document.querySelector('#input-u-username');
      var inputRole = document.querySelector('#input-u-role');
      var inputName = document.querySelector('#input-u-name');
      var inputJob = document.querySelector('#input-u-job');
      var inputEmail = document.querySelector('#input-u-email');
      var inputCompany = document.querySelector('#input-u-company');
      var inputPhone = document.querySelector('#input-u-phone');

      if (!user.job) user.job = '';
      if (!user.company) user.company = '';
      if (!user.phone) user.phone = '';

      if (inputUsername) inputUsername.value = user.username;
      if (inputRole) inputRole.value = user.role;
      if (inputName) inputName.value = user.name;
      if (inputJob) inputJob.value = user.job;
      if (inputEmail) inputEmail.value = user.email;
      if (inputCompany) inputCompany.value = user.company;
      if (inputPhone) inputPhone.value = user.phone;

      this.setState({ avatar: user.avatar });
    }
  }, {
    key: 'updateConfigView',
    value: function updateConfigView(config) {
      var inputModule = document.querySelector('#input-u-module');
      var inputMatrix = document.querySelector('#input-u-matrix');
      var inputRT = document.querySelector('#input-u-rt');
      var inputCommentColumn = document.querySelector('#input-u-comment-column');

      if (config.main_module == 0) config.main_module = '';
      if (config.main_matrix == 0) config.main_matrix = '';
      if (config.rt == 0) config.rt = '';

      inputModule.value = config.main_module;
      inputMatrix.value = config.main_matrix;
      inputRT.value = config.rt;

      if (config.comment_column) {
        inputCommentColumn.value = 1;
      } else {
        inputCommentColumn.value = 0;
      }
    }
  }, {
    key: 'createOpt',
    value: function createOpt() {
      var self = this;

      var fn = function fn(item, index) {
        return (0, _preact.h)(
          'option',
          { key: index, value: item.id },
          item.name
        );
      };

      return fn;
    }
  }, {
    key: 'render',
    value: function render(props, state) {
      var o = false;
      var notifications = state.notifications_;

      var srcAvatar = '/static/images/avatar.png';

      if (state.avatar) srcAvatar = '/static/images/avatars/' + state.avatar;

      return (0, _preact.h)(
        'div',
        null,
        (0, _preact.h)(_header2.default, { o: o, module: _constants2.default.PROFILE_MODULE,
          notifications: notifications,
          onRemoveNotification: this.handleRemoveNotification() }),
        (0, _preact.h)(
          'section',
          { className: 'contenedor_root animated fadeIn' },
          (0, _preact.h)(
            'div',
            { className: 'container' },
            (0, _preact.h)(
              'div',
              { className: 'profiles' },
              (0, _preact.h)(
                'div',
                { className: 'row' },
                (0, _preact.h)(
                  'div',
                  { className: 'col s12 m4 avatar' },
                  (0, _preact.h)(
                    'div',
                    { className: 'img_avat' },
                    (0, _preact.h)(
                      'figure',
                      null,
                      (0, _preact.h)('img', { id: 'image-avatar', src: srcAvatar, alt: 'Image de perfil' })
                    )
                  ),
                  (0, _preact.h)(
                    'div',
                    { className: 'content' },
                    (0, _preact.h)(
                      'h5',
                      null,
                      USER_NAME
                    ),
                    (0, _preact.h)(
                      'p',
                      null,
                      USER_JOB
                    )
                  ),
                  (0, _preact.h)(
                    'div',
                    { className: 'footer' },
                    (0, _preact.h)(
                      'form',
                      { onSubmit: this.handleUploadAvatar() },
                      (0, _preact.h)(
                        'div',
                        { className: 'file-field input-field col s12' },
                        (0, _preact.h)(
                          'div',
                          { className: 'btn indigo darken-4', style: 'float: none; margin-bottom: 15px;' },
                          (0, _preact.h)(
                            'span',
                            { htmlFor: 'input-file' },
                            'Imagen de perfil'
                          ),
                          (0, _preact.h)('input', { id: 'input-file', type: 'file', accept: 'image/*', onChange: this.handleChangeFile() })
                        )
                      ),
                      (0, _preact.h)('br', null),
                      (0, _preact.h)('br', null),
                      (0, _preact.h)(
                        'div',
                        { className: 'input-field col s12' },
                        (0, _preact.h)(
                          'button',
                          { id: 'btn-update-avatar', type: 'submit', className: 'btn btn_ttx_success center' },
                          'GUARDAR'
                        ),
                        (0, _preact.h)('br', null),
                        (0, _preact.h)('br', null)
                      )
                    )
                  )
                ),
                (0, _preact.h)(
                  'div',
                  { className: 'col s12 m8 profile' },
                  (0, _preact.h)(
                    'div',
                    { className: 'body_info animated fadeIn' },
                    (0, _preact.h)('br', null),
                    (0, _preact.h)(
                      'form',
                      { onSubmit: this.handleUpdateUser() },
                      (0, _preact.h)(
                        'div',
                        { className: 'row' },
                        (0, _preact.h)(
                          'div',
                          { className: 'input-field col s6' },
                          (0, _preact.h)('input', { type: 'text', id: 'input-u-username', placeholder: 'Usuario', disabled: 'true', style: 'color: #FFF; border: solid 1px;' })
                        ),
                        (0, _preact.h)(
                          'div',
                          { className: 'input-field col s6' },
                          (0, _preact.h)('input', { type: 'text', id: 'input-u-role', placeholder: 'Rol' })
                        ),
                        (0, _preact.h)(
                          'div',
                          { className: 'input-field col s6' },
                          (0, _preact.h)('input', { type: 'text', id: 'input-u-name', placeholder: 'Nombre' })
                        ),
                        (0, _preact.h)(
                          'div',
                          { className: 'input-field col s6' },
                          (0, _preact.h)('input', { type: 'email', id: 'input-u-email', placeholder: 'Correo Electr\xF3nico' })
                        ),
                        (0, _preact.h)(
                          'div',
                          { className: 'input-field col s6' },
                          (0, _preact.h)('input', { type: 'text', id: 'input-u-company', placeholder: 'Empresa' })
                        ),
                        (0, _preact.h)(
                          'div',
                          { className: 'input-field col s6' },
                          (0, _preact.h)('input', { type: 'text', id: 'input-u-job', placeholder: 'Puesto' })
                        ),
                        (0, _preact.h)(
                          'div',
                          { className: 'input-field col s6' },
                          (0, _preact.h)('input', { type: 'text', id: 'input-u-phone', placeholder: 'Tel\xE9fono' })
                        ),
                        (0, _preact.h)('div', { className: 'input-field col s6' }),
                        (0, _preact.h)('br', null),
                        (0, _preact.h)('br', null),
                        (0, _preact.h)(
                          'div',
                          { className: 'input-field col s12' },
                          (0, _preact.h)(
                            'button',
                            { type: 'submit', className: 'btn btn_ttx_success center' },
                            'GUARDAR'
                          ),
                          (0, _preact.h)('br', null),
                          (0, _preact.h)('br', null)
                        )
                      )
                    )
                  ),
                  (0, _preact.h)(
                    'div',
                    { className: 'body_info animated fadeIn' },
                    (0, _preact.h)('br', null),
                    (0, _preact.h)(
                      'form',
                      { onSubmit: this.handleUpdateConfiguration() },
                      (0, _preact.h)(
                        'div',
                        { className: 'row' },
                        (0, _preact.h)(
                          'div',
                          { className: 'col s4 m4' },
                          (0, _preact.h)(
                            'select',
                            { className: 'browser-default sion-select', id: 'input-u-module' },
                            (0, _preact.h)(
                              'option',
                              { value: '', selected: true },
                              'M\xF3dulo Principal'
                            ),
                            MODULES.map(this.createOpt())
                          )
                        ),
                        (0, _preact.h)(
                          'div',
                          { className: 'col s4 m4' },
                          (0, _preact.h)(
                            'select',
                            { className: 'browser-default sion-select', id: 'input-u-matrix' },
                            (0, _preact.h)(
                              'option',
                              { value: '', selected: true },
                              'Matriz de Variables Principal'
                            ),
                            state.matrices_.map(this.createOpt())
                          )
                        ),
                        (0, _preact.h)(
                          'div',
                          { className: 'col s4 m4' },
                          (0, _preact.h)(
                            'select',
                            { className: 'browser-default sion-select', id: 'input-u-rt' },
                            (0, _preact.h)(
                              'option',
                              { value: '', selected: true },
                              'Real Time'
                            ),
                            RTS.map(this.createOpt())
                          )
                        )
                      ),
                      (0, _preact.h)(
                        'div',
                        { className: 'row', style: 'margin-top: 16px' },
                        (0, _preact.h)(
                          'div',
                          { className: 'col s4 m4' },
                          (0, _preact.h)(
                            'select',
                            { className: 'browser-default sion-select', id: 'input-u-comment-column' },
                            (0, _preact.h)(
                              'option',
                              { value: '1', selected: true },
                              'Columna de Comentario Activo'
                            ),
                            (0, _preact.h)(
                              'option',
                              { value: '0', selected: true },
                              'Columna de Comentario Inactivo'
                            )
                          )
                        ),
                        (0, _preact.h)('div', { className: 'col s4 m4' }),
                        (0, _preact.h)('div', { className: 'col s4 m4' }),
                        (0, _preact.h)('br', null),
                        (0, _preact.h)('br', null),
                        (0, _preact.h)(
                          'div',
                          { className: 'input-field col s12', style: 'margin: 15px 0px;' },
                          (0, _preact.h)(
                            'button',
                            { type: 'submit', className: 'btn btn_ttx_success center' },
                            'GUARDAR'
                          ),
                          (0, _preact.h)('br', null),
                          (0, _preact.h)('br', null)
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return ProfileContent;
}(_preact.Component);

(0, _preact.render)((0, _preact.h)(ProfileContent, null), document.getElementById('content-main'));

/***/ })

/******/ });
//# sourceMappingURL=profile.js.map