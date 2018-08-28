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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Button.vue?vue&type=template&id=0a438dd0&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"c-Button",class:_vm.classObject,on:{"click":_vm.openLink}},[_vm._t("default",[_vm._v("Click me")])],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Button.vue?vue&type=template&id=0a438dd0&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/components/Button.vue?vue&type=script&lang=js&
//
//
//
//
//
//

/* harmony default export */ var Buttonvue_type_script_lang_js_ = ({
	props: {
		kind: {
			type: String,
			required: false,
			default: 'secondary',
			validator(kind) {
				return [
					'primary',
					'secondary',
					'cta',
					'ctaAlt',
				].includes(kind);
			},
		},
		link: {
			type: String,
			required: false,
			default: '',
		},
		clickHandler: {
			required: false,
			// eslint-disable-next-line
			default: () => () => null,
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	methods: {
		openLink(event) {
			if (this.clickHandler) {
				this.clickHandler(event);
			}

			if (this.link.length) {
				window.open(this.link, '_blank');
			}
		},
	},
	computed: {
		classObject() {
			return {
				'is-disabled': this.disabled,
				[`c-Button--${this.kind}`]: true,
			};
		},
	},
});

// CONCATENATED MODULE: ./src/components/Button.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Buttonvue_type_script_lang_js_ = (Buttonvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Button.vue?vue&type=style&index=0&lang=scss&
var Buttonvue_type_style_index_0_lang_scss_ = __webpack_require__(15);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/components/Button.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Buttonvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "Button.vue"
/* harmony default export */ var Button = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33);
__webpack_require__(11);
__webpack_require__(34);
__webpack_require__(35);
__webpack_require__(36);
__webpack_require__(37);
__webpack_require__(38);
__webpack_require__(39);
module.exports = __webpack_require__(40);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseCard_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseCard_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseCard_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseCard_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Button_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Button_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Button_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Button_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 16 */,
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LoadingScreen_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LoadingScreen_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LoadingScreen_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LoadingScreen_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 18 */,
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 20 */,
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 22 */,
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Sidebar_vue_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 24 */,
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_StarGroup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_StarGroup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_StarGroup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_StarGroup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 26 */,
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Timer_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Timer_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Timer_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Timer_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 28 */,
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ToggleGroup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ToggleGroup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ToggleGroup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ToggleGroup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 30 */,
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_TopBar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_TopBar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_TopBar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_node_modules_sass_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_TopBar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 32 */,
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BaseCard.vue?vue&type=template&id=1405a85c&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-BaseCard"},[_vm._t("main",[_c('div',{staticClass:"c-BaseCard__main"},[_vm._t("top",[_vm._m(0)]),_vm._v(" "),_vm._t("middle",[_vm._m(1)]),_vm._v(" "),_vm._t("bottom",[_c('div',{staticClass:"c-BaseCard__bottom"},[_vm._v("\n\t\t\t\t\tbottom\n\t\t\t\t")])]),_vm._v(" "),_vm._t("feedback",[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.feedback.length),expression:"feedback.length"}],staticClass:"c-BaseCard__feedback",domProps:{"innerHTML":_vm._s(_vm.feedback)}},[_vm._v("\n\t\t\t\t\tThis is feedback!\n\t\t\t\t")])])],2)]),_vm._v(" "),_vm._t("sidebar",[_c('div',{staticClass:"c-BaseCard__sidebar"},[_vm._v("\n\t\t\tsidebar\n\t\t")])])],2)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-BaseCard__top"},[_c('span',[_vm._v("logo")]),_vm._v(" "),_c('span',{staticClass:"c-BaseCard__stepNumber"},[_vm._v("3 / 4")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-BaseCard__middle"},[_c('h2',{staticClass:"c-BaseCard__subtitle"},[_vm._v("This is a title")]),_vm._v(" "),_c('p',{staticClass:"c-BaseCard__text"},[_vm._v("\n\t\t\t\t\t\tLorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam, sint!\n\t\t\t\t\t\tSed consequuntur, quidem perferendis cupiditate laborum suscipit esse necessita\n\t\t\t\t\t\ttibus harum voluptate "),_c('a',{attrs:{"href":"#"}},[_vm._v("maiores")]),_vm._v(" consequatur asperiores.\n\t\t\t\t\t\tRepudiandae delectus excepturi aperiam. Quod.\n\t\t\t\t\t")]),_vm._v(" "),_c('h2',{staticClass:"c-BaseCard__sectionTitle"},[_vm._v("This is a title")]),_vm._v(" "),_c('p',{staticClass:"c-BaseCard__text"},[_vm._v("\n\t\t\t\t\t\tLorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam, sint!\n\t\t\t\t\t\tSed consequuntur, quidem perferendis cupiditate laborum suscipit esse necessita\n\t\t\t\t\t\ttibus harum voluptate "),_c('a',{attrs:{"href":"#"}},[_vm._v("maiores")]),_vm._v(" consequatur asperiores.\n\t\t\t\t\t\tRepudiandae delectus excepturi aperiam. Quod.\n\t\t\t\t\t")])])}]


// CONCATENATED MODULE: ./src/components/BaseCard.vue?vue&type=template&id=1405a85c&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/components/BaseCard.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var BaseCardvue_type_script_lang_js_ = ({
	name: 'BaseCard',
	data() {
		return {};
	},
	props: {
		isSidebarVisible: {
			type: Boolean,
			required: false,
			default: false,
		},
		feedback: {
			type: String,
			required: false,
			default: '',
		},
	},
	computed: {
		sidebarClasses() {
			return {
				'is-active': this.isSidebarVisible,
			};
		},
	},
});

// CONCATENATED MODULE: ./src/components/BaseCard.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_BaseCardvue_type_script_lang_js_ = (BaseCardvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/BaseCard.vue?vue&type=style&index=0&lang=scss&
var BaseCardvue_type_style_index_0_lang_scss_ = __webpack_require__(13);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/components/BaseCard.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_BaseCardvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "BaseCard.vue"
/* harmony default export */ var BaseCard = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LoadingScreen.vue?vue&type=template&id=2eac4130&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-LoadingScreen__overlay",class:{'is-active': _vm.active}},[_c('div',{staticClass:"c-LoadingScreen"},[_c('p',{directives:[{name:"show",rawName:"v-show",value:(_vm.message.length),expression:"message.length"}],staticClass:"c-LoadingScreen__message"},[_vm._v(_vm._s(_vm.message))]),_vm._v(" "),_c('svg',{attrs:{"width":"34px","height":"34px","viewBox":"0 0 34 34","version":"1.1","xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}},[_c('g',{attrs:{"id":"Instructions-Open-Copy-4","stroke":"none","stroke-width":"1","fill":"none","fill-rule":"evenodd","transform":"translate(-666.000000, -367.000000)"}},[_c('g',{attrs:{"id":"Group-2","transform":"translate(668.000000, 369.000000)","stroke-width":"4"}},[_c('circle',{attrs:{"id":"Oval-2","stroke":"#E7E9EC","cx":"15","cy":"15","r":"15"}}),_vm._v(" "),_c('path',{attrs:{"d":"M15,0 C6.71572875,0 0,6.71572875 0,15 C0,23.2842712 6.71572875,30\n\t\t\t\t\t15,30 C23.2842712,30 30,23.2842712 30,15","id":"Oval-5","stroke":"#3953BF","stroke-linecap":"round"}})])])])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/LoadingScreen.vue?vue&type=template&id=2eac4130&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/components/LoadingScreen.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var LoadingScreenvue_type_script_lang_js_ = ({
	props: {
		message: {
			type: String,
			required: false,
			default: 'Please wait',
		},
		active: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
});

// CONCATENATED MODULE: ./src/components/LoadingScreen.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_LoadingScreenvue_type_script_lang_js_ = (LoadingScreenvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/LoadingScreen.vue?vue&type=style&index=0&lang=scss&
var LoadingScreenvue_type_style_index_0_lang_scss_ = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/components/LoadingScreen.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_LoadingScreenvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "LoadingScreen.vue"
/* harmony default export */ var LoadingScreen = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Modal.vue?vue&type=template&id=19590c05&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-Modal",class:_vm.cssClasses},[_c('div',{staticClass:"c-Modal__overlay",class:{'is-transparent': !_vm.showOverlay},on:{"click":_vm.clickedOnOutside}}),_vm._v(" "),_c('div',{staticClass:"c-Modal__main",attrs:{"role":_vm.modalRole,"aria-label":_vm.title}},[_c('div',{staticClass:"c-Modal__top"},[_c('btn',{directives:[{name:"show",rawName:"v-show",value:(_vm.closeIcon),expression:"closeIcon"}],staticClass:"c-Modal__closeIcon",attrs:{"id":"js-modal-close","role":"secondary","click-handler":_vm.clickedOnClose,"aria-label":"Close"}},[_c('svg',{attrs:{"width":"192px","height":"192px","viewBox":"0 0 192 192","version":"1.1","xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}},[_c('g',{attrs:{"id":"Elements","stroke":"none","stroke-width":"1","fill":"none","fill-rule":"evenodd"}},[_c('g',{attrs:{"id":"close-icon","fill-rule":"nonzero"}},[_c('polygon',{attrs:{"id":"Shape","points":"180.2 0 95.8 84.3 11.8 0.4 0 12.2 84 96 0\n\t\t\t\t\t\t\t179.9 11.8 191.6 95.8 107.8 180.2 192 192 180.3 107.6 96 192 11.8"}})])])])]),_vm._v(" "),_vm._t("title",[_c('h1',{staticClass:"c-Modal__title"},[_vm._v(_vm._s(_vm.title))])])],2),_vm._v(" "),_c('div',{staticClass:"c-Modal__middle"},[_vm._t("content",[_c('p',{staticClass:"c-Modal__text"},[_vm._v(_vm._s(_vm.content))])])],2),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.hasFooter),expression:"hasFooter"}],staticClass:"c-Modal__bottom",attrs:{"id":"js-modal-footer"}},[_vm._t("footer")],2)])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Modal.vue?vue&type=template&id=19590c05&

// EXTERNAL MODULE: ./src/components/Button.vue + 4 modules
var Button = __webpack_require__(11);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/components/Modal.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var Modalvue_type_script_lang_js_ = ({
	name: 'Modal',
	components: {
		btn: Button["default"],
	},
	props: {
		active: {
			type: Boolean,
			required: false,
			default: false,
		},
		content: {
			type: String,
			required: false,
			default: 'Default Modal content',
		},
		title: {
			type: String,
			// title is required for the aria-label
			required: true,
			default: 'Default Modal Title',
		},
		closeIcon: {
			type: Boolean,
			required: false,
			default: false,
		},
		closeOnOutsideClick: {
			type: Boolean,
			required: false,
			default: false,
		},
		closeOnEscapePress: {
			type: Boolean,
			required: false,
			default: false,
		},
		showOverlay: {
			type: Boolean,
			required: false,
			default: true,
		},
	},
	methods: {
		clickedOnClose() {
			this.$emit('closed', this);
		},
		clickedOnOutside() {
			if (this.closeOnOutsideClick) {
				this.$emit('closed', this);
			}
		},
		pressedKey(event) {
			if (event.keyCode === 27 && this.closeOnEscapePress) {
				this.$emit('closed', this);
			}
		},
	},
	computed: {
		// Hide the footer if nothing is passed to the slot
		hasFooter() {
			if (this.$slots.footer) {
				return true;
			}

			return false;
		},
		modalRole() {
			if (this.hasFooter) {
				return 'alertdialog';
			}

			return 'dialog';
		},
		cssClasses() {
			let result = '';

			if (this.active) {
				result += ' is-active';
			}
			if (!this.hasFooter) {
				result += ' is-footerless';
			}

			return result;
		},
	},
	watch: {
		// this function can't be an arrow function
		// eslint-disable-next-line
		active: function () {
			if (this.active) {
				// Listen to keypresses
				document.addEventListener('keydown', this.pressedKey);

				// Focus on the first button or the close button
				if (this.hasFooter) {
					const buttons = document.getElementById('js-modal-footer').getElementsByClassName('c-Button');

					if (buttons.length) {
						buttons[0].focus();
					}
				}
				else {
					document.getElementById('js-modal-close').focus();
				}
			}
			else {
				// Stop listening to keypresses
				document.removeEventListener('keydown', this.pressedKey);
			}
		},
	},
});

// CONCATENATED MODULE: ./src/components/Modal.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Modalvue_type_script_lang_js_ = (Modalvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Modal.vue?vue&type=style&index=0&lang=scss&
var Modalvue_type_style_index_0_lang_scss_ = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/components/Modal.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Modalvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "Modal.vue"
/* harmony default export */ var Modal = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Sidebar.vue?vue&type=template&id=84e9735c&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-Sidebar"},_vm._l((_vm.tabs),function(tab,index){return _c('div',{key:index,staticClass:"c-Sidebar__item",class:{ 'is-active': _vm.activeTab === index}},[_c('div',{staticClass:"c-Sidebar__tab",on:{"click":function($event){_vm.clickedOnTab(index)}}},[_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.activeTab === index),expression:"activeTab === index"}],staticClass:"c-Sidebar__tab__icon"},[_vm._v("-")]),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.activeTab !== index),expression:"activeTab !== index"}],staticClass:"c-Sidebar__tab__icon"},[_vm._v("+")]),_vm._v(" "+_vm._s(tab)+"\n\t\t")]),_vm._v(" "),_c('div',{staticClass:"c-Sidebar__panel"},[_vm._t(tab)],2)])}))}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Sidebar.vue?vue&type=template&id=84e9735c&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/components/Sidebar.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var Sidebarvue_type_script_lang_js_ = ({
	props: {
		tabs: {
			type: Array,
			default: () => {
				return [];
			},
		},
		activeTab: {
			type: Number,
			required: false,
			default: 0,
		},
		side: {
			type: String,
			required: false,
			default: 'left',
		},
	},
	methods: {
		clickedOnTab(index) {
			// eslint-disable-next-line
			console.log('fire an event! clicked on a tab!');
			this.$emit('clicked-on-tab', index, this.side);
		},
	},
});

// CONCATENATED MODULE: ./src/components/Sidebar.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Sidebarvue_type_script_lang_js_ = (Sidebarvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Sidebar.vue?vue&type=style&index=0&lang=scss&
var Sidebarvue_type_style_index_0_lang_scss_ = __webpack_require__(21);

// EXTERNAL MODULE: ./src/components/Sidebar.vue?vue&type=style&index=1&lang=scss&
var Sidebarvue_type_style_index_1_lang_scss_ = __webpack_require__(23);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/components/Sidebar.vue







/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Sidebarvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "Sidebar.vue"
/* harmony default export */ var Sidebar = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/StarGroup.vue?vue&type=template&id=8388b3d4&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-StarGroup"},_vm._l((_vm.stars),function(star,index){return _c('svg',{key:star,staticClass:"c-StarGroup__star",class:{'is-active': (index + 1) <= _vm.value},attrs:{"viewBox":"0 0 22 20","version":"1.1","xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},on:{"click":function($event){_vm.clickedOnStar(index)}}},[_c('g',{attrs:{"id":"Main-Copy-11","stroke":"none","stroke-width":"1","fill":"none","fill-rule":"evenodd","transform":"translate(-1221.000000, -143.000000)"}},[_c('path',{attrs:{"d":"M1226.50738,162.322754 L1232,159.435112 L1237.49262,162.322754\n\t\t\tC1237.58995,162.373924 1237.70144,162.391581 1237.80981,162.372993\n\t\t\tC1238.08198,162.326312 1238.26478,162.067834 1238.2181,161.795666\n\t\t\tL1237.1691,155.679542 L1241.61272,151.348079 C1241.69146,151.271325\n\t\t\t1241.74271,151.170754 1241.75852,151.061935 C1241.79823,150.788663\n\t\t\t1241.60889,150.534941 1241.33562,150.495232 L1235.19468,149.602902\n\t\t\tL1232.44837,144.038269 C1232.3997,143.939662 1232.31989,143.859849\n\t\t\t1232.22128,143.811183 C1231.97366,143.688972 1231.67384,143.790642\n\t\t\t1231.55163,144.038269 L1228.80532,149.602902 L1222.66438,150.495232\n\t\t\tC1222.55557,150.511045 1222.45499,150.562288 1222.37824,150.64103\n\t\t\tC1222.18549,150.838772 1222.18954,151.155328\n\t\t\t1222.38728,151.348079 L1226.8309,155.679542 L1225.7819,161.795666 C1225.76332,161.904045\n\t\t\t1225.78097,162.015529 1225.83214,162.112859 C1225.96064,162.357281 1226.26296,162.451255\n\t\t\t1226.50738,162.322754 Z","id":"Star-Copy-6"}})])])}))}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/StarGroup.vue?vue&type=template&id=8388b3d4&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/components/StarGroup.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var StarGroupvue_type_script_lang_js_ = ({
	props: {
		value: {
			type: Number,
			required: false,
		},
		stars: {
			type: Number,
			required: true,
			default: 5,
		},
		clickToRemove: {
			type: Boolean,
			required: false,
			default: false,
		},
		minValue: {
			type: Number,
			required: true,
			default: 1,
		},
	},
	methods: {
		clickedOnStar(index) {
			let newValue = index + 1;

			if (newValue > this.minValue) {
				// remove the star if you click on it again (if the option is on)
				if (this.clickToRemove) {
					if (this.value === newValue) {
						newValue -= 1;
					}
				}
			}
			else {
				newValue = this.minValue;
			}

			this.$emit('changed-value', newValue);
		},
	},
});

// CONCATENATED MODULE: ./src/components/StarGroup.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_StarGroupvue_type_script_lang_js_ = (StarGroupvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/StarGroup.vue?vue&type=style&index=0&lang=scss&
var StarGroupvue_type_style_index_0_lang_scss_ = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/components/StarGroup.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_StarGroupvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "StarGroup.vue"
/* harmony default export */ var StarGroup = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Timer.vue?vue&type=template&id=7ca3e48c&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(!_vm.invisible),expression:"!invisible"}],staticClass:"c-Timer"},[_vm._v("\n\t"+_vm._s(_vm.formatedTime)+"\n")])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Timer.vue?vue&type=template&id=7ca3e48c&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/components/Timer.vue?vue&type=script&lang=js&
//
//
//
//
//
//

/**
 * Tracks time and if a given limit has been passed
 * Supports pause, reset and continue
 */
/* harmony default export */ var Timervue_type_script_lang_js_ = ({
	name: 'Timer',
	data() {
		return {
			elapsedTime: 0,
			interval: undefined,
		};
	},
	props: {
		// Number of miliseconds the Timer will wait before incrementing the elapsedTime
		tick: {
			type: Number,
			required: false,
			default: 1000,
		},
		// If the Timer starts counting as soon as it's mounted
		autoStart: {
			type: Boolean,
			required: false,
			default: false,
		},
		// Time that the Timer starts counting from
		startingTime: {
			type: Number,
			required: false,
			default: 0,
		},
		// Number of seconds the Timer will wait before emitting an event
		limit: {
			type: Number,
			required: false,
			default: null,
		},
		// If the hours should always be shown in the Timer
		alwaysShowHours: {
			type: Boolean,
			required: false,
			default: false,
		},
		// If the Timer should not be shown
		invisible: {
			type: Boolean,
			required: false,
			default: false,
		},
		// If the Timer should not show seconds (if this is true, set the alwaysShowHours to true
		// as well so it doesn't look weird)
		hideSeconds: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	methods: {
		// Start the Timer
		start() {
			window.clearInterval(this.interval);
			this.interval = undefined;

			this.interval = window.setInterval(() => {
				this.elapsedTime += 1;

				if (this.limit) {
					if (this.limit === this.elapsedTime) {
						this.warnPassingOfLimit();
					}
				}
			}, this.tick);
		},
		// Pause the Timer
		pause() {
			window.clearInterval(this.interval);
			this.interval = undefined;
		},
		// Starts the timer again from 0
		reset() {
			this.stop();
			this.start();
		},
		// Pauses the Timer and puts it at 0
		stop() {
			this.pause();
			this.elapsedTime = 0;
		},
		// In case you need to change the elapsedTime value
		setElapsedTime(time) {
			this.elapsedTime = time;
		},
		warnPassingOfLimit() {
			// also sends the value of the limit
			this.$emit('passed-limit', this.limit);
		},
	},
	computed: {
		// This is the description for the formatedTime
		formatedTime() {
			let hours = Math.floor(this.elapsedTime / 3600);
			let minutes = Math.floor((this.elapsedTime - (hours * 3600)) / 60);
			let seconds = this.elapsedTime - (hours * 3600) - (minutes * 60);

			if (hours < 10) {
				hours = `0${hours}`;
			}
			if (minutes < 10) {
				minutes = `0${minutes}`;
			}
			if (seconds < 10) {
				seconds = `0${seconds}`;
			}

			// Only show the hours when you have to
			if (!this.alwaysShowHours && hours === '00') {
				if (this.hideSeconds) {
					return `${minutes}`;
				}

				return `${minutes}:${seconds}`;
			}

			if (this.hideSeconds) {
				return `${hours}:${minutes}`;
			}

			return `${hours}:${minutes}:${seconds}`;
		},
	},
	mounted() {
		if (this.startingTime) {
			this.elapsedTime = this.startingTime;
		}

		if (this.autoStart) {
			this.start();
		}
	},
});

// CONCATENATED MODULE: ./src/components/Timer.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Timervue_type_script_lang_js_ = (Timervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Timer.vue?vue&type=style&index=0&lang=scss&
var Timervue_type_style_index_0_lang_scss_ = __webpack_require__(27);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/components/Timer.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Timervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "Timer.vue"
/* harmony default export */ var Timer = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ToggleGroup.vue?vue&type=template&id=468a5688&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-ToggleGroup"},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.hasToggleAll),expression:"hasToggleAll"}],staticClass:"c-ToggleGroup__item",class:{'is-active': _vm.all},on:{"click":function($event){_vm.clickedOnAll(_vm.all)}}},[_vm._v("\n\t\tAll\n\t")]),_vm._v(" "),_vm._l((_vm.toggles),function(item){return _c('div',{directives:[{name:"show",rawName:"v-show",value:(!item.hidden),expression:"!item.hidden"}],key:item.id,staticClass:"c-ToggleGroup__item",class:{'is-active': item.isActive},on:{"click":function($event){_vm.clickedOnItem(item)}}},[_vm._v("\n\t\t"+_vm._s(item.label)+"\n\t\t"),_c('span',{directives:[{name:"show",rawName:"v-show",value:(item.name.length),expression:"item.name.length"}],staticClass:"c-ToggleGroup__tooltip",class:{'is-right-side': _vm.tooltipSide === 'right'}},[_vm._v("\n\t\t\t"+_vm._s(item.name)+"\n\t\t")])])})],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/ToggleGroup.vue?vue&type=template&id=468a5688&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/components/ToggleGroup.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ToggleGroupvue_type_script_lang_js_ = ({
	name: 'ToggleGroup',
	data() {
		return {};
	},
	props: {
		toggles: {
			type: Array,
			required: false,
			default: () => {
				return [
					/*
					{
						id: 'test',
						name: 'Test',
						label: 'T',
						isActive: true,
						hidden: false,
					},
					*/
				];
			},
		},
		tooltipSide: {
			type: String,
			required: false,
			default: 'left',
		},
		hasToggleAll: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	methods: {
		clickedOnItem(item) {
			// eslint-disable-next-line
			// console.log('fire an event! clicked on toggle!', item);
			this.$emit('clicked-on-item', item);
		},
		clickedOnAll(state) {
			// eslint-disable-next-line
			// console.log('fire an event! clicked on toggle all!', state);
			this.$emit('clicked-on-all', state);
		},
	},
	computed: {
		all() {
			// return true only if all toggles are active
			return this.toggles.reduce((result, item) => {
				return result && item.isActive;
			}, true);
		},
	},
});

// CONCATENATED MODULE: ./src/components/ToggleGroup.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ToggleGroupvue_type_script_lang_js_ = (ToggleGroupvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/ToggleGroup.vue?vue&type=style&index=0&lang=scss&
var ToggleGroupvue_type_style_index_0_lang_scss_ = __webpack_require__(29);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/components/ToggleGroup.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_ToggleGroupvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "ToggleGroup.vue"
/* harmony default export */ var ToggleGroup = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/TopBar.vue?vue&type=template&id=1cc4b648&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('header',{staticClass:"c-TopBar"},[_c('div',{staticClass:"c-TopBar__container",style:('max-width: ' + _vm.containerWidth + 'px')},[_c('div',{staticClass:"c-TopBar__left"},[_vm._t("left")],2),_vm._v(" "),_c('div',{staticClass:"c-TopBar__middle"},[_vm._t("middle")],2),_vm._v(" "),_c('div',{staticClass:"c-TopBar__right"},[_vm._t("right")],2)])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/TopBar.vue?vue&type=template&id=1cc4b648&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./src/components/TopBar.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var TopBarvue_type_script_lang_js_ = ({
	props: {
		containerWidth: {
			type: String,
			required: false,
			default: 'nope',
		},
	},
});

// CONCATENATED MODULE: ./src/components/TopBar.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_TopBarvue_type_script_lang_js_ = (TopBarvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/TopBar.vue?vue&type=style&index=0&lang=scss&
var TopBarvue_type_style_index_0_lang_scss_ = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/components/TopBar.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_TopBarvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "TopBar.vue"
/* harmony default export */ var TopBar = __webpack_exports__["default"] = (component.exports);

/***/ })
/******/ ]);