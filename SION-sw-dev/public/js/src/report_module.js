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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/report_module/content.jsx");
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

/***/ "./node_modules/websocket/lib/browser.js":
/*!***********************************************!*\
  !*** ./node_modules/websocket/lib/browser.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _global = (function() { return this; })();
var NativeWebSocket = _global.WebSocket || _global.MozWebSocket;
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ../package.json */ "./node_modules/websocket/package.json").version;


/***/ }),

/***/ "./node_modules/websocket/package.json":
/*!*********************************************!*\
  !*** ./node_modules/websocket/package.json ***!
  \*********************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, browser, bugs, bundleDependencies, config, contributors, dependencies, deprecated, description, devDependencies, directories, engines, homepage, keywords, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"websocket@^1.0.25","_id":"websocket@1.0.25","_inBundle":false,"_integrity":"sha512-M58njvi6ZxVb5k7kpnHh2BvNKuBWiwIYvsToErBzWhvBZYwlEiLcyLrG41T1jRcrY9ettqPYEqduLI7ul54CVQ==","_location":"/websocket","_phantomChildren":{},"_requested":{"type":"range","registry":true,"raw":"websocket@^1.0.25","name":"websocket","escapedName":"websocket","rawSpec":"^1.0.25","saveSpec":null,"fetchSpec":"^1.0.25"},"_requiredBy":["#USER","/"],"_resolved":"https://registry.npmjs.org/websocket/-/websocket-1.0.25.tgz","_shasum":"998ec790f0a3eacb8b08b50a4350026692a11958","_spec":"websocket@^1.0.25","_where":"/Users/JamsMendez/Documents/Go/src/github.com/JamsMendez/SION-sw/webpack","author":{"name":"Brian McKelvey","email":"brian@worlize.com","url":"https://www.worlize.com/"},"browser":"lib/browser.js","bugs":{"url":"https://github.com/theturtle32/WebSocket-Node/issues"},"bundleDependencies":false,"config":{"verbose":false},"contributors":[{"name":"Iñaki Baz Castillo","email":"ibc@aliax.net","url":"http://dev.sipdoc.net"}],"dependencies":{"debug":"^2.2.0","nan":"^2.3.3","typedarray-to-buffer":"^3.1.2","yaeti":"^0.0.6"},"deprecated":false,"description":"Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.","devDependencies":{"buffer-equal":"^1.0.0","faucet":"^0.0.1","gulp":"git+https://github.com/gulpjs/gulp.git#4.0","gulp-jshint":"^2.0.4","jshint":"^2.0.0","jshint-stylish":"^2.2.1","tape":"^4.0.1"},"directories":{"lib":"./lib"},"engines":{"node":">=0.10.0"},"homepage":"https://github.com/theturtle32/WebSocket-Node","keywords":["websocket","websockets","socket","networking","comet","push","RFC-6455","realtime","server","client"],"license":"Apache-2.0","main":"index","name":"websocket","repository":{"type":"git","url":"git+https://github.com/theturtle32/WebSocket-Node.git"},"scripts":{"gulp":"gulp","install":"(node-gyp rebuild 2> builderror.log) || (exit 0)","test":"faucet test/unit"},"version":"1.0.25"};

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
  URL_SERVER_EVENTS: '/server/events',
  URL_SERVER_CHARTS: '/server/charts',
  URL_SERVER_GRAPHICS: '/server/graphics',
  URL_SERVER_CHART_EVENTS: '/server/chart_events',
  URL_SERVER_OPERATIONS: '/server/operations',
  URL_SERVER_LOG_EVENTS: '/server/log/events',

  EVENT_UDAPTE_VARIABLES: 'update-variables',
  EVENT_ALARMS_VARIABLES: 'alarms-variables',
  EVENT_COMMENT_VARIABLE: 'comment-variable',

  EVENT_UDAPTE_ALARMS_ACTIVE: 'update-alarms-active',
  EVENT_UDAPTE_VARIABLES_VALUE: 'update-variables-value',
  EVENT_UDAPTE_VARIABLES_ALARM: 'update-variables-alarm',
  EVENT_UDAPTE_VARIABLES_TIMEOUT: 'update-variables-timeout',

  EVENT_REQUEST_REPORT: 'request-report',
  EVENT_RESPONSE_REPORT: 'response-report',

  EVENT_REQUEST_REPORT_LOCATOR: 'request-report-locator',
  EVENT_RESPONSE_REPORT_LOCATOR: 'response-report-locator',

  EVENT_CREATE_FILE: 'create-file',
  EVENT_COPY_FILE: 'copy-file',
  EVENT_MOVE_FILE: 'move-file',
  EVENT_RENAME_FILE: 'rename-file',
  EVENT_DELETE_FILE: 'delete-file',
  EVENT_GET_CONTENT: 'get-content',

  MATRIX_MODULE: 1,
  GRAPHIC_MODULE: 2,
  REPORTS_MODULE: 3,
  EVENTS_MODULE: 4,
  LOCATION_MODULE: 5,
  LOCATOR_MODULE: 6,
  EXPLORER_MODULE: 7,
  CONFIGURATION_MODULE: 8,
  OPERATIONS_MODULE: 9,

  WARNING_SOUND: 1,
  DANGER_SOUND: 2,

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
      notifications_: []
    };
    return _this;
  }

  _createClass(Header, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $('.button_menu').sideNav({
        menuWidth: 265,
        edge: 'left',
        closeOnClick: true,
        draggable: true
      });

      $('.button-notifications').sideNav({
        menuWidth: 300,
        edge: 'right',
        closeOnClick: true,
        draggable: true
      });
    }
  }, {
    key: 'handleRedirect',
    value: function handleRedirect(value) {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();

        if (value == PROFILE) {
          location.href = '/';
        } else if (value == CONFIGURATION) {
          location.href = '/configuration';
        } else if (value == LOGOUT) {
          location.href = _constants2.default.URL_SERVER_AUTH + '/logout';
        }
      };

      return fn;
    }
  }, {
    key: 'handleRemoveNotification',
    value: function handleRemoveNotification() {
      var self = this;

      var fn = function fn(id) {
        var notifications_ = self.state.notifications_;
        for (var i = 0; i < notifications_.length; i++) {
          var n = notifications_[i];
          if (n) {
            var n_id = n.id;
            if (n_id == id) {
              notifications_.splice(i, 1);
              self.setState({ notifications: notifications_ });

              break;
            }
          }
        }
      };

      return fn;
    }
  }, {
    key: 'createItemNotification',
    value: function createItemNotification() {
      var _this2 = this;

      var self = this;

      var fn = function fn(item, index) {
        return (0, _preact.h)(NotificationItem, { notifation: item, onRemove: _this2.handleRemoveNotification() });
      };

      return fn;
    }

    /* Header: Matriz */

  }, {
    key: 'handleRestoreMatrix',
    value: function handleRestoreMatrix() {
      var self = this;

      var fn = function fn(structure) {
        self.setState({ structure: structure });
      };

      return fn;
    }
  }, {
    key: 'handleItemGroup',
    value: function handleItemGroup() {
      var self = this;

      var fn = function fn(structure) {
        self.setState({ structure: structure }, function () {
          $('.button_menu').sideNav('hide');
        });
      };

      return fn;
    }
  }, {
    key: 'handleChangeMatrix',
    value: function handleChangeMatrix() {
      var self = this;

      var fn = function fn(m, s) {
        self.setState({ matrix: m, structure: s }, function () {
          $('.button_menu').sideNav('hide');
          var f = self.props.onChangeMatrix;
          if (f) {
            f(m, s);
          }
        });
      };

      return fn;
    }
    /* Header: Matriz */

  }, {
    key: 'render',
    value: function render(props, state) {
      var user = {
        email: _constants2.default.NA,
        name: _constants2.default.NA,
        role_out: _constants2.default.NA
      };

      if (props.user) {
        user = props.user;
      }

      var module = this.props.module;
      var menuLateral = false;

      if (module == _constants2.default.MATRIX_MODULE) {
        var o = props.o;

        menuLateral = (0, _preact.h)(_menuLateral2.default, { o: o,
          onRestoreMatrix: this.handleRestoreMatrix(),
          onItemGroup: this.handleItemGroup(),
          onChangeMatrix: this.handleChangeMatrix() });
      }

      return (0, _preact.h)(
        'header',
        null,
        (0, _preact.h)(
          'div',
          { className: 'topmenu' },
          (0, _preact.h)(
            'div',
            { className: 'row' },
            (0, _preact.h)(
              'div',
              { className: 'pemex_contrato' },
              (0, _preact.h)(
                'ul',
                null,
                (0, _preact.h)(
                  'li',
                  null,
                  (0, _preact.h)('img', { src: '/static/images/logo_pemex.svg', alt: '' })
                ),
                (0, _preact.h)(
                  'li',
                  null,
                  (0, _preact.h)(
                    'a',
                    { href: '#' },
                    (0, _preact.h)(
                      'p',
                      null,
                      'Grupo Multidisciplinario de Mantenimiento a Equipo Din\xE1mico.',
                      (0, _preact.h)('br', null),
                      'Activo de Producci\xF3n Samaria - Luna',
                      (0, _preact.h)('br', null),
                      (0, _preact.h)(
                        'span',
                        null,
                        'Contrato: 425014831',
                        (0, _preact.h)(
                          'i',
                          { className: 'material-icons left' },
                          'keyboard_arrow_down'
                        )
                      )
                    )
                  )
                )
              )
            ),
            (0, _preact.h)(
              'div',
              { className: 'avatar' },
              (0, _preact.h)(
                'ul',
                null,
                (0, _preact.h)(
                  'li',
                  null,
                  (0, _preact.h)(
                    'div',
                    { className: 'avatar_info' },
                    (0, _preact.h)(
                      'a',
                      { 'data-activates': 'bar_config_menu', className: 'bar_config', href: '#' },
                      (0, _preact.h)('img', { src: '/static/images/avatar.png', alt: '' }),
                      (0, _preact.h)(
                        'p',
                        null,
                        user.name,
                        (0, _preact.h)('br', null),
                        (0, _preact.h)(
                          'span',
                          null,
                          user.role_out
                        )
                      ),
                      (0, _preact.h)(
                        'i',
                        { className: 'material-icons' },
                        'keyboard_arrow_down'
                      )
                    )
                  )
                ),
                (0, _preact.h)(
                  'li',
                  null,
                  (0, _preact.h)('img', { className: 'ttx_logo', src: '/static/images/logo_ttx_black.svg', alt: '' })
                )
              )
            )
          )
        ),
        (0, _preact.h)(
          'nav',
          null,
          (0, _preact.h)(
            'ul',
            { id: 'nav-mobile', className: 'left hide-on-med-and-down' },
            (0, _preact.h)(
              'li',
              null,
              (0, _preact.h)(
                'a',
                { 'data-activates': 'barra_macrop', className: 'side_macrop button_menu', href: '#' },
                (0, _preact.h)(
                  'i',
                  { className: 'material-icons left' },
                  'menu'
                )
              )
            ),
            (0, _preact.h)(
              'li',
              null,
              (0, _preact.h)(
                'a',
                { href: '/matrix' },
                (0, _preact.h)(
                  'i',
                  { className: 'material-icons left' },
                  'dashboard'
                ),
                'Matriz'
              )
            ),
            (0, _preact.h)(
              'li',
              null,
              (0, _preact.h)(
                'a',
                { href: '/graphic' },
                (0, _preact.h)(
                  'i',
                  { className: 'material-icons left' },
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
                  { className: 'material-icons left' },
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
                { href: '/operations' },
                (0, _preact.h)(
                  'i',
                  { className: 'material-icons left' },
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
                  { className: 'material-icons left' },
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
                  { className: 'material-icons left' },
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
                { href: '/locator' },
                (0, _preact.h)(
                  'i',
                  { className: 'material-icons left' },
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
                  { className: 'material-icons left' },
                  'pageview'
                ),
                'Explorador'
              )
            )
          ),
          (0, _preact.h)(
            'ul',
            { id: 'nav-mobile', className: 'right' },
            (0, _preact.h)(
              'li',
              null,
              (0, _preact.h)(
                'a',
                { 'data-activates': 'bar_notific_menu', className: 'bar_notific button-notifications', href: '#' },
                (0, _preact.h)(
                  'i',
                  { className: 'material-icons left' },
                  'chat_bubble'
                ),
                (0, _preact.h)(
                  'span',
                  null,
                  state.notifications_.length
                )
              )
            ),
            (0, _preact.h)(
              'li',
              null,
              (0, _preact.h)(
                'a',
                { className: 'modal-trigger', href: '#cerrar_sesion' },
                (0, _preact.h)(
                  'i',
                  { className: 'material-icons left' },
                  'power_settings_new'
                )
              )
            )
          ),
          (0, _preact.h)(
            'ul',
            { id: 'slide-out', className: 'side-nav' },
            (0, _preact.h)(
              'li',
              null,
              (0, _preact.h)(
                'div',
                { className: 'user-view' },
                (0, _preact.h)(
                  'div',
                  { className: 'background' },
                  (0, _preact.h)('img', { src: '/static/images/sidebar.jpg' })
                )
              )
            ),
            (0, _preact.h)(
              'li',
              null,
              (0, _preact.h)(
                'a',
                { className: 'subheader' },
                'Menu Principal'
              )
            ),
            (0, _preact.h)(
              'li',
              null,
              (0, _preact.h)(
                'a',
                { className: 'waves-effect', href: '#!' },
                'Menu 1'
              )
            )
          ),
          (0, _preact.h)(
            'a',
            { href: '#', 'data-activates': 'slide-out', className: 'button-collapse' },
            (0, _preact.h)(
              'i',
              { className: 'material-icons' },
              'menu'
            )
          ),
          (0, _preact.h)(
            'ul',
            { id: 'bar_config_menu', className: 'side-nav bar_config' },
            (0, _preact.h)(
              'li',
              null,
              (0, _preact.h)(
                'div',
                { className: 'config' },
                (0, _preact.h)(
                  'div',
                  { className: 'avatar_bar' },
                  (0, _preact.h)('img', { src: '/static/images/avatar.png' })
                ),
                (0, _preact.h)(
                  'h6',
                  null,
                  user.name,
                  (0, _preact.h)('br', null),
                  (0, _preact.h)(
                    'strong',
                    null,
                    user.role_out
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
              { onClick: this.handleRedirect(PROFILE) },
              (0, _preact.h)(
                'a',
                { href: '#' },
                (0, _preact.h)(
                  'i',
                  { className: 'material-icons left' },
                  'edit'
                ),
                'Editar Perfil'
              )
            ),
            (0, _preact.h)(
              'li',
              { onClick: this.handleRedirect(CONFIGURATION) },
              (0, _preact.h)(
                'a',
                { href: '#' },
                (0, _preact.h)(
                  'i',
                  { className: 'material-icons left' },
                  'settings'
                ),
                'Configuraciones'
              )
            ),
            (0, _preact.h)(
              'li',
              { onClick: this.handleRedirect(LOGOUT) },
              (0, _preact.h)(
                'a',
                { href: '#' },
                (0, _preact.h)(
                  'i',
                  { className: 'material-icons left' },
                  'highlight_off'
                ),
                'Cerrar Sesi\xF3n'
              )
            )
          ),
          (0, _preact.h)(
            'ul',
            { id: 'bar_notific_menu', className: 'side-nav bar_notific' },
            state.notifications_.map(this.createItemNotification())
          ),
          menuLateral
        )
      );
    }
  }]);

  return Header;
}(_preact.Component);

exports.default = Header;

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
    key: "componentDidMount",
    value: function componentDidMount() {}
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

              /*self.setState({ matrix: m, structure: s }, () => {
                $('.button_menu').sideNav('hide');
              });*/

              self.props.onChangeMatrix(m, s);

              break;
            }
          }
        }
      };

      return fn;

      /*let fn = (evt) => {
        let value = evt.target.value;
        if (value != '') {
          value = parseInt(value);
           let matrices = self.state.matrices_;
          for (let i = 0; i < matrices.length; i++) {
            let m = matrices[i];
            if (m.id == value) {
              let s = m.structure;
              self.setState({ structure: s });
              
              break;
            }
          }
        }
      };*/
    }
  }, {
    key: "handleItemGroup",
    value: function handleItemGroup(group) {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        /*self.setState({ structure: [group] }, () => {
          $('.button_menu').sideNav('hide');
        });*/

        var structure = [group];
        self.props.onItemGroup(structure);
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
            //self.setState({ structure: structure });

            self.props.onRestoreMatrix(structure);
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
        return (0, _preact.h)(
          "span",
          { key: item.id, style: "color: #888;" },
          (0, _preact.h)(
            "a",
            { href: "#", onClick: self.handleChangeMatrix(item.id) },
            item.name
          )
        );
      };

      return fn;
    }
  }, {
    key: "createItemGroup",
    value: function createItemGroup() {
      var _this2 = this;

      var self = this;

      var fn = function fn(item, index) {
        if (!item.sons) item.sons = [];

        return (0, _preact.h)(
          "li",
          null,
          (0, _preact.h)(
            "div",
            { className: "collapsible-header" },
            (0, _preact.h)(
              "div",
              { className: "col s2" },
              (0, _preact.h)("img", { src: "/static/images/macropera.svg", width: "28", alt: "", style: "vertical-align: middle;" })
            ),
            (0, _preact.h)(
              "div",
              { className: "col s10 txt",
                style: "font-size: 1.4em; margin-left: 0.4em;font-weight: 200;",
                onClick: _this2.handleItemGroup(item)
              },
              item.name
            )
          ),
          (0, _preact.h)(
            "div",
            { className: "collapsible-body", style: "display: none;" },
            item.sons.map(_this2.createItemGroup())
          )
        );
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
          matrix: {
            name: 'N/A',
            structure: []
          }
        };
      }

      return (0, _preact.h)(
        "ul",
        { id: "barra_macrop", className: "side-nav side_macrop" },
        (0, _preact.h)(
          "li",
          null,
          (0, _preact.h)(
            "div",
            { className: "user-view" },
            (0, _preact.h)(
              "div",
              { className: "background" },
              (0, _preact.h)("img", { src: "/static/images/sidebar.jpg" })
            )
          )
        ),
        (0, _preact.h)(
          "li",
          null,
          (0, _preact.h)(
            "ul",
            { className: "collapsible collapsible-accordion", "data-collapsible": "accordion" },
            (0, _preact.h)(
              "li",
              null,
              (0, _preact.h)(
                "div",
                { className: "collapsible-header" },
                (0, _preact.h)(
                  "div",
                  { className: "col s12 txt", style: "font-size: 1.4em; margin-left: 0.4em;font-weight: 200;" },
                  "Matrices"
                )
              ),
              (0, _preact.h)(
                "div",
                { className: "collapsible-body", style: "display: none;" },
                o.matrices_.map(this.createItemMatrix())
              )
            )
          )
        ),
        (0, _preact.h)(
          "li",
          null,
          (0, _preact.h)("br", null)
        ),
        (0, _preact.h)(
          "li",
          { onClick: this.handleRestoreMatrix() },
          o.matrix.name
        ),
        (0, _preact.h)(
          "li",
          null,
          (0, _preact.h)(
            "ul",
            { className: "collapsible collapsible-accordion", "data-collapsible": "accordion" },
            o.matrix.structure.map(this.createItemGroup())
          )
        )
      );
    }
  }]);

  return MenuLateral;
}(_preact.Component);

exports.default = MenuLateral;

/***/ }),

/***/ "./src/report_module/content.jsx":
/*!***************************************!*\
  !*** ./src/report_module/content.jsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.esm.js");

var _websocket = __webpack_require__(/*! websocket */ "./node_modules/websocket/lib/browser.js");

var _underscore = __webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js");

var _header = __webpack_require__(/*! ./../header.jsx */ "./src/header.jsx");

var _header2 = _interopRequireDefault(_header);

var _constants = __webpack_require__(/*! ./../constants.js */ "./src/constants.js");

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var wsURL = 'ws://' + URLWSR + '/ws';

var DIARY = 'diary';
var MONTHLY = 'monthly';
var ANNUAL = 'annual';
var CUSTOM = 'custom';

var MINUTE = 'minute';
var HOUR = 'hour';
var DAY = 'day';

var Content = function (_Component) {
  _inherits(Content, _Component);

  function Content() {
    _classCallCheck(this, Content);

    var _this = _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this));

    _this.state = {
      reports_: []
    };
    return _this;
  }

  _createClass(Content, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getReports();

      this.serviceWSR();
    }
  }, {
    key: 'initializePickers',
    value: function initializePickers() {
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
        selectMonths: true,
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
    key: 'getReports',
    value: function getReports() {
      var self = this;

      var url = _constants2.default.URL_SERVER_REPORTS + '/list';

      var xhr = $.ajax({
        url: url,
        type: _constants2.default.METHOD_GET,
        dataType: _constants2.default.JSON
      });

      xhr.done(function (res, status, response) {
        if (response.status == _constants2.default.STATUS_OK) {
          self.setState({ reports_: res.docs }, function () {
            $('select').material_select();
            self.initializePickers();
          });
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
    key: 'serviceWSR',
    value: function serviceWSR() {
      var self = this;

      this.ws = new _websocket.w3cwebsocket(wsURL, _constants2.default.TTX_PROTOCOOL);

      this.ws.onerror = function () {
        console.log('WSR: connection Error');
      };

      this.ws.onopen = function (evt) {
        console.log('WSR connected');
      };

      this.ws.onclose = function (evt) {
        console.log('WSR closed');

        setTimeout(function () {
          self.serviceWSR();
        }, 1000);
      };

      this.ws.onmessage = function (evt) {
        var s = evt.data;
        try {
          var o = JSON.parse(s);
          if (o.err) {
            alert(o.message);

            return;
          }

          console.log(o);

          if (o.EVENT_RESPONSE_REPORT) {
            console.log(o.content);
          }
        } catch (e) {
          console.log('WSR.ERROR: JSON.parse', s);
        }
      };
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
    key: 'handleGoConfigurations',
    value: function handleGoConfigurations() {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        location.href = '/configuration/matrices';
      };

      return fn;
    }
  }, {
    key: 'handleCreate',
    value: function handleCreate(value) {
      var self = this;

      var fn = function fn(evt) {
        evt.preventDefault();

        if (value == DIARY) {
          var linkDiary = document.querySelector('#link-report-diary');
          var inputReport = document.querySelector('#input-d-report');
          var inputDate = document.querySelector('#input-d-date');

          linkDiary.style.display = 'none';

          var sId = inputReport.value.trim();
          if (sId == '') return;

          var date = inputDate.value.trim();
          if (date == '') return;

          var report_id = parseInt(sId);
          if (!(0, _underscore.isNumber)(report_id)) return;

          date = self.parseDate(date);

          var content = {
            report_id: report_id,
            date_of: date,
            report: DIARY
          };

          var o = {
            evt: _constants2.default.EVENT_REQUEST_REPORT,
            content: content
          };

          console.log("REQ: ", o);

          if (self.ws) {
            var msg = JSON.stringify(o);
            self.ws.send(msg);
          }
        } else if (value == MONTHLY) {
          var linkMonthly = document.querySelector('#link-report-monthly');
          var _inputReport = document.querySelector('#input-m-report');
          var inputDateOf = document.querySelector('#input-m-date-of');
          var inputDateTo = document.querySelector('#input-m-date-to');

          linkMonthly.style.display = 'none';

          var _sId = _inputReport.value.trim();
          if (_sId == '') return;

          var dateOf = inputDateOf.value.trim();
          if (dateOf == '') return;

          var dateTo = inputDateTo.value.trim();
          if (dateTo == '') return;

          var _report_id = parseInt(_sId);
          if (!(0, _underscore.isNumber)(_report_id)) return;

          dateOf = self.parseDate(dateOf);
          dateTo = self.parseDate(dateTo);

          var _content = {
            report_id: _report_id,
            date_of: dateOf,
            date_to: dateTo,
            report: MONTHLY
          };

          var _o = {
            evt: _constants2.default.EVENT_REQUEST_REPORT,
            content: _content
          };

          console.log("REQ: ", _o);

          if (self.ws) {
            var _msg = JSON.stringify(_o);
            self.ws.send(_msg);
          }
        } else if (value == ANNUAL) {
          var linkAnnual = document.querySelector('#link-report-monthly');
          var _inputReport2 = document.querySelector('#input-a-report');
          var inputYear = document.querySelector('#input-a-year');

          linkAnnual.style.display = 'none';

          var _sId2 = _inputReport2.value.trim();
          if (_sId2 == '') return;

          var sYear = inputYear.value.trim();
          if (sYear == '') return;

          var _report_id2 = parseInt(_sId2);
          if (!(0, _underscore.isNumber)(_report_id2)) return;

          var year = parseInt(sYear);
          if (!(0, _underscore.isNumber)(year)) return;

          var _content2 = {
            report_id: _report_id2,
            year: year,
            report: ANNUAL
          };

          var _o2 = {
            evt: _constants2.default.EVENT_REQUEST_REPORT,
            content: _content2
          };

          console.log("REQ: ", _o2);

          if (self.ws) {
            var _msg2 = JSON.stringify(_o2);
            self.ws.send(_msg2);
          }
        } else if (value == CUSTOM) {
          var linkCustom = document.querySelector('#link-report-custom');
          var _inputReport3 = document.querySelector('#input-c-report');
          var _inputDateOf = document.querySelector('#input-c-date-of');
          var _inputDateTo = document.querySelector('#input-c-date-to');
          var inputTimeOf = document.querySelector('#input-c-time-of');
          var inputTimeTo = document.querySelector('#input-c-time-to');
          var inputType = document.querySelector('#input-c-type');

          linkCustom.style.display = 'none';

          var _sId3 = _inputReport3.value.trim();
          if (_sId3 == '') return;

          var _dateOf = _inputDateOf.value.trim();
          if (_dateOf == '') return;

          var _dateTo = _inputDateTo.value.trim();
          if (_dateTo == '') return;

          var timeOf = inputTimeOf.value.trim();
          if (timeOf == '') return;

          var timeTo = inputTimeTo.value.trim();
          if (timeTo == '') return;

          var type = inputType.value.trim();
          if (type == '') return;

          var _report_id3 = parseInt(_sId3);
          if (!(0, _underscore.isNumber)(_report_id3)) return;

          _dateOf = self.parseDate(_dateOf);
          _dateTo = self.parseDate(_dateTo);

          var _content3 = {
            report_id: _report_id3,
            date_of: _dateOf + ' ' + timeOf + ':00',
            date_to: _dateTo + ' ' + timeTo + ':00',
            type: type,
            report: CUSTOM
          };

          var _o3 = {
            evt: _constants2.default.EVENT_REQUEST_REPORT,
            content: _content3
          };

          console.log("REQ: ", _o3);

          if (self.ws) {
            var _msg3 = JSON.stringify(_o3);
            self.ws.send(_msg3);
          }
        }
      };

      return fn;
    }
  }, {
    key: 'createOptReport',
    value: function createOptReport() {
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
      return (0, _preact.h)(
        'div',
        null,
        (0, _preact.h)(_header2.default, { module: _constants2.default.REPORTS_MODULE }),
        (0, _preact.h)(
          'section',
          { className: 'matriz_simplificada' },
          (0, _preact.h)(
            'div',
            { className: 'row' },
            (0, _preact.h)(
              'div',
              { className: 'col s12 m12 body_int' },
              (0, _preact.h)(
                'div',
                { className: 'thumb_matriz' },
                (0, _preact.h)(
                  'ul',
                  { className: 'collapsible', 'data-collapsible': 'accordion' },
                  (0, _preact.h)(
                    'li',
                    null,
                    (0, _preact.h)(
                      'div',
                      { className: 'collapsible-header' },
                      'Reporte Diario'
                    ),
                    (0, _preact.h)(
                      'div',
                      { className: 'collapsible-body' },
                      (0, _preact.h)(
                        'div',
                        { className: 'row' },
                        (0, _preact.h)('div', { className: 'col s3' }),
                        (0, _preact.h)(
                          'div',
                          { className: 'col s6' },
                          (0, _preact.h)(
                            'form',
                            { onSubmit: this.handleCreate(DIARY) },
                            (0, _preact.h)(
                              'div',
                              { className: 'input-field col s12' },
                              (0, _preact.h)(
                                'select',
                                { id: 'input-d-report' },
                                (0, _preact.h)(
                                  'option',
                                  { value: '', disabled: true, selected: true },
                                  'Reporte'
                                ),
                                state.reports_.map(this.createOptReport())
                              ),
                              (0, _preact.h)(
                                'label',
                                { htmlFor: 'input-d-report' },
                                'Reporte'
                              )
                            ),
                            (0, _preact.h)(
                              'div',
                              { className: 'input-field col s12' },
                              (0, _preact.h)(
                                'label',
                                { htmlFor: 'input-d-date' },
                                'Fecha'
                              ),
                              (0, _preact.h)('input', { type: 'text', id: 'input-d-date', className: 'datepicker' })
                            ),
                            (0, _preact.h)(
                              'div',
                              { className: 'col s6' },
                              (0, _preact.h)(
                                'button',
                                { className: 'btn waves-effect waves-light green', type: 'submit' },
                                'Generar ',
                                (0, _preact.h)(
                                  'i',
                                  { className: 'material-icons right' },
                                  'send'
                                )
                              )
                            ),
                            (0, _preact.h)(
                              'div',
                              { className: 'col s6' },
                              (0, _preact.h)(
                                'a',
                                { id: 'link-report-diary', className: 'waves-effect waves-light blue btn', href: '#' },
                                'Descargar',
                                (0, _preact.h)(
                                  'i',
                                  { className: 'material-icons right' },
                                  'file_download'
                                )
                              )
                            )
                          )
                        ),
                        (0, _preact.h)('div', { className: 'col s3' })
                      )
                    )
                  ),
                  (0, _preact.h)(
                    'li',
                    null,
                    (0, _preact.h)(
                      'div',
                      { className: 'collapsible-header' },
                      'Reporte Personalizado'
                    ),
                    (0, _preact.h)(
                      'div',
                      { className: 'collapsible-body' },
                      (0, _preact.h)(
                        'div',
                        { className: 'row' },
                        (0, _preact.h)('div', { className: 'col s3' }),
                        (0, _preact.h)(
                          'div',
                          { className: 'col s6' },
                          (0, _preact.h)(
                            'form',
                            { onSubmit: this.handleCreate(CUSTOM) },
                            (0, _preact.h)(
                              'div',
                              { className: 'input-field col s12' },
                              (0, _preact.h)(
                                'select',
                                { id: 'input-c-report' },
                                (0, _preact.h)(
                                  'option',
                                  { value: '', disabled: true, selected: true },
                                  'Reporte'
                                ),
                                state.reports_.map(this.createOptReport())
                              ),
                              (0, _preact.h)(
                                'label',
                                { htmlFor: 'input-c-report' },
                                'Reporte'
                              )
                            ),
                            (0, _preact.h)(
                              'div',
                              { className: 'input-field col s6' },
                              (0, _preact.h)(
                                'label',
                                { htmlFor: 'input-c-date-of' },
                                'Fecha de'
                              ),
                              (0, _preact.h)('input', { type: 'text', id: 'input-c-date-of', className: 'datepicker' })
                            ),
                            (0, _preact.h)(
                              'div',
                              { className: 'input-field col s6' },
                              (0, _preact.h)(
                                'label',
                                { htmlFor: 'input-c-time-of' },
                                'Hora de'
                              ),
                              (0, _preact.h)('input', { type: 'text', id: 'input-c-time-of', className: 'timepicker' })
                            ),
                            (0, _preact.h)(
                              'div',
                              { className: 'input-field col s6' },
                              (0, _preact.h)(
                                'label',
                                { htmlFor: 'input-c-date-to' },
                                'A'
                              ),
                              (0, _preact.h)('input', { type: 'text', id: 'input-c-date-to', className: 'datepicker' })
                            ),
                            (0, _preact.h)(
                              'div',
                              { className: 'input-field col s6' },
                              (0, _preact.h)(
                                'label',
                                { htmlFor: 'input-c-time-to' },
                                'Hora de'
                              ),
                              (0, _preact.h)('input', { type: 'text', id: 'input-c-time-to', className: 'timepicker' })
                            ),
                            (0, _preact.h)(
                              'div',
                              { className: 'input-field col s12' },
                              (0, _preact.h)(
                                'select',
                                { id: 'input-c-type' },
                                (0, _preact.h)(
                                  'option',
                                  { value: '', disabled: true, selected: true },
                                  'Tipo'
                                ),
                                (0, _preact.h)(
                                  'option',
                                  { value: MINUTE },
                                  'Minuto'
                                ),
                                (0, _preact.h)(
                                  'option',
                                  { value: HOUR },
                                  'Hora'
                                ),
                                (0, _preact.h)(
                                  'option',
                                  { value: DAY },
                                  'D\xEDa'
                                )
                              ),
                              (0, _preact.h)(
                                'label',
                                { htmlFor: 'input-c-type' },
                                'Tipo'
                              )
                            ),
                            (0, _preact.h)(
                              'div',
                              { className: 'col s6' },
                              (0, _preact.h)(
                                'button',
                                { className: 'btn waves-effect waves-light green', type: 'submit' },
                                'Generar ',
                                (0, _preact.h)(
                                  'i',
                                  { className: 'material-icons right' },
                                  'send'
                                )
                              )
                            ),
                            (0, _preact.h)(
                              'div',
                              { className: 'col s6' },
                              (0, _preact.h)(
                                'a',
                                { id: 'link-report-custom', className: 'waves-effect waves-light blue btn', href: '#' },
                                'Descargar',
                                (0, _preact.h)(
                                  'i',
                                  { className: 'material-icons right' },
                                  'file_download'
                                )
                              )
                            )
                          )
                        ),
                        (0, _preact.h)('div', { className: 'col s3' })
                      )
                    )
                  ),
                  (0, _preact.h)(
                    'li',
                    null,
                    (0, _preact.h)(
                      'div',
                      { className: 'collapsible-header' },
                      'Reporte Mensual'
                    ),
                    (0, _preact.h)(
                      'div',
                      { className: 'collapsible-body' },
                      (0, _preact.h)(
                        'div',
                        { className: 'row' },
                        (0, _preact.h)('div', { className: 'col s3' }),
                        (0, _preact.h)(
                          'div',
                          { className: 'col s6' },
                          (0, _preact.h)(
                            'form',
                            { onSubmit: this.handleCreate(MONTHLY) },
                            (0, _preact.h)(
                              'div',
                              { className: 'input-field col s12' },
                              (0, _preact.h)(
                                'select',
                                { id: 'input-m-report' },
                                (0, _preact.h)(
                                  'option',
                                  { value: '', disabled: true, selected: true },
                                  'Reporte'
                                ),
                                state.reports_.map(this.createOptReport())
                              ),
                              (0, _preact.h)(
                                'label',
                                { htmlFor: 'input-m-report' },
                                'Reporte'
                              )
                            ),
                            (0, _preact.h)(
                              'div',
                              { className: 'input-field col s12' },
                              (0, _preact.h)(
                                'label',
                                { htmlFor: 'input-m-date' },
                                'Fecha de'
                              ),
                              (0, _preact.h)('input', { id: 'input-m-date-of', className: 'datepicker', type: 'text' })
                            ),
                            (0, _preact.h)(
                              'div',
                              { className: 'input-field col s12' },
                              (0, _preact.h)(
                                'label',
                                { htmlFor: 'input-m-date' },
                                'A'
                              ),
                              (0, _preact.h)('input', { id: 'input-m-date-to', className: 'datepicker', type: 'text' })
                            ),
                            (0, _preact.h)(
                              'div',
                              { className: 'col s6' },
                              (0, _preact.h)(
                                'button',
                                { className: 'btn waves-effect waves-light green', type: 'submit' },
                                'Generar ',
                                (0, _preact.h)(
                                  'i',
                                  { className: 'material-icons right' },
                                  'send'
                                )
                              )
                            ),
                            (0, _preact.h)(
                              'div',
                              { className: 'col s6' },
                              (0, _preact.h)(
                                'a',
                                { id: 'link-report-monthly', className: 'waves-effect waves-light blue btn', href: '#' },
                                'Descargar',
                                (0, _preact.h)(
                                  'i',
                                  { className: 'material-icons right' },
                                  'file_download'
                                )
                              )
                            )
                          )
                        ),
                        (0, _preact.h)('div', { className: 'col s3' })
                      )
                    )
                  ),
                  (0, _preact.h)(
                    'li',
                    null,
                    (0, _preact.h)(
                      'div',
                      { className: 'collapsible-header' },
                      'Reporte Anual'
                    ),
                    (0, _preact.h)(
                      'div',
                      { className: 'collapsible-body' },
                      (0, _preact.h)(
                        'div',
                        { className: 'row' },
                        (0, _preact.h)('div', { className: 'col s3' }),
                        (0, _preact.h)(
                          'div',
                          { className: 'col s6' },
                          (0, _preact.h)(
                            'form',
                            { onSubmit: this.handleCreate(ANNUAL) },
                            (0, _preact.h)(
                              'div',
                              { className: 'input-field col s12' },
                              (0, _preact.h)(
                                'select',
                                { id: 'input-a-report' },
                                (0, _preact.h)(
                                  'option',
                                  { value: '', disabled: true, selected: true },
                                  'Reporte'
                                ),
                                state.reports_.map(this.createOptReport())
                              ),
                              (0, _preact.h)(
                                'label',
                                { htmlFor: 'input-a-report' },
                                'Reporte'
                              )
                            ),
                            (0, _preact.h)(
                              'div',
                              { className: 'input-field col s12' },
                              (0, _preact.h)(
                                'select',
                                { id: 'input-a-year' },
                                (0, _preact.h)(
                                  'option',
                                  { value: '', disabled: true, selected: true },
                                  'A\xF1o'
                                ),
                                (0, _preact.h)(
                                  'option',
                                  null,
                                  '2017'
                                ),
                                (0, _preact.h)(
                                  'option',
                                  null,
                                  '2018'
                                ),
                                (0, _preact.h)(
                                  'option',
                                  null,
                                  '2019'
                                ),
                                (0, _preact.h)(
                                  'option',
                                  null,
                                  '2020'
                                )
                              ),
                              (0, _preact.h)(
                                'label',
                                { htmlFor: 'input-a-year' },
                                'A\xF1o'
                              )
                            ),
                            (0, _preact.h)(
                              'div',
                              { className: 'col s6' },
                              (0, _preact.h)(
                                'button',
                                { className: 'btn waves-effect waves-light green', type: 'submit' },
                                'Generar ',
                                (0, _preact.h)(
                                  'i',
                                  { className: 'material-icons right' },
                                  'send'
                                )
                              )
                            ),
                            (0, _preact.h)(
                              'div',
                              { className: 'col s6' },
                              (0, _preact.h)(
                                'a',
                                { id: 'link-report-annual', className: 'waves-effect waves-light blue btn', href: '#' },
                                'Descargar',
                                (0, _preact.h)(
                                  'i',
                                  { className: 'material-icons right' },
                                  'file_download'
                                )
                              )
                            )
                          )
                        ),
                        (0, _preact.h)('div', { className: 'col s3' })
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

  return Content;
}(_preact.Component);

(0, _preact.render)((0, _preact.h)(Content, null), document.getElementById('content-main'));

/***/ })

/******/ });
//# sourceMappingURL=report_module.js.map