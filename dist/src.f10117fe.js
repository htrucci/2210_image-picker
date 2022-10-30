// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/extract-colors/dist/extract-colors.umd.js":[function(require,module,exports) {
var define;
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).extractColors={})}(this,(function(t){"use strict";class e{constructor(t,e,r,o=t<<16|e<<8|r){this.isColor=!0,this.red=t,this.green=e,this.blue=r,this.hex=o,this.count=1}distance(t){return(Math.abs(t.red-this.red)+Math.abs(t.green-this.green)+Math.abs(t.blue-this.blue))/765}getWeight(t,e){return this.count/e*(1-t)+this.getSaturation()*t}getSaturation(){return void 0===this._saturation&&(this._saturation=Math.max(Math.abs(this.red-this.green)/255,Math.abs(this.red-this.blue)/255,Math.abs(this.green-this.blue)/255)),this._saturation}}class r{constructor(){this.count=1,this.children={}}addGroup(t){return this.children[t]?this.children[t].count++:this.children[t]=new r,this.children[t]}addColor(t,r,o,i){return this.children[t]?this.children[t].count++:this.children[t]=new e(r,o,i,t),this.children[t]}getList(){return Object.keys(this.children).map((t=>this.children[t]))}getMaxWeight(t,e){if(void 0===this.maxWeight){const r=this.getList().map((r=>r.isColor?r.getWeight(t,e):r.getMaxWeight(t,e)));r.sort(((t,e)=>e-t)),this.maxWeight=r[0]||0}return this.maxWeight}getMaxWeightColor(t,e){const r=this.getList();return r.sort(((r,o)=>r.isColor?o.getWeight(t,e)-r.getWeight(t,e):o.getMaxWeight(t,e)-r.getMaxWeight(t,e))),r[0].isColor?r[0]:r[0].getMaxWeightColor(t,e)}getMaxCountColor(){const t=this.getList();return t.sort(((t,e)=>t.isColor?e.count-t.count:e.getMaxCountColor()-t.getMaxCountColor())),t[0].isColor?t[0]:t[0].getMaxCountColor()}getColors(t,e,r){const o=this.getList().map((t=>{const{count:e}=t,r=t.getMaxCountColor();return r.count=e,r}));o.sort(((t,o)=>o.getWeight(e,r)-t.getWeight(e,r)));const i=[];return o.forEach((e=>{const r=i.find((r=>r.distance(e)<t));r?r.count+=e.count:i.push(e)})),i}}const o=(t,e,r=0,o=Number.MAX_VALUE)=>{if(Number(e)!==e||e<r||e>o)throw new Error(t+" is invalid");return Number(e)};class i{constructor({pixels:t=i.pixelsDefault,distance:e=i.distanceDefault,saturationImportance:r=i.saturationImportanceDefault,splitPower:s=i.splitPowerDefault,colorValidator:n=i.colorValidatorDefault}={}){this.pixels=((t,e,r=0,o=Number.MAX_SAFE_INTEGER)=>{if(!Number.isInteger(e)||e<r||e>o)throw new Error(t+" is invalid");return parseInt(e)})("pixels",t,1),this.splitPower=o("splitPower",s,2,16),this.distance=o("distance",e,0,1),this.saturationImportance=o("saturationImportance",r,0,1),this.colorValidator=((t,e)=>{if(!e||"[object Function]"!=={}.toString.call(e))throw new Error(t+" is invalid");return e})("colorValidator",n)}process(t){const e=new r,o=this.splitPower;for(let r=0;r<t.length;r+=4){const i=t[r],s=t[r+1],n=t[r+2],a=t[r+3];if(this.colorValidator(i,s,n,a)){const t=i<<16|s<<8|n,r=(i>>4&15)<<2|(s>>4&15)<<1|n>>4&15,a=Math.round(i*(o-1)/255)*(o*o)+Math.round(s*(o-1)/255)*o+Math.round(n*(o-1)/255);e.addGroup(a).addGroup(r).addColor(t,i,s,n)}}return e.getColors(this.distance,this.saturationImportance,this.pixels)}extract(t){return this.process(t).map((t=>({hex:`#${"0".repeat(6-t.hex.toString(16).length)}${t.hex.toString(16)}`,red:t.red,green:t.green,blue:t.blue,area:t.count/this.pixels,saturation:t.getSaturation()})))}}i.pixelsDefault=1e4,i.distanceDefault=.2,i.saturationImportanceDefault=.2,i.splitPowerDefault=10,i.colorValidatorDefault=(t,e,r,o=255)=>o>250;const s=(t,e)=>new i(e).extract(t.data),n=(t,e)=>(t.crossOrigin=e&&e.crossOrigin||null,new Promise((r=>{const o=(t,e)=>{const o=new i(e),s=((t,e)=>{const r=t.width*t.height,o=r<e?t.width:Math.round(t.width*Math.sqrt(e/r)),i=r<e?t.height:Math.round(t.height*Math.sqrt(e/r)),s=document.createElement("canvas");s.width=o,s.height=i;const n=s.getContext("2d");return n.drawImage(t,0,0,t.width,t.height,0,0,o,i),n.getImageData(0,0,o,i)})(t,o.pixels);r(o.extract(s.data))};if(t.complete)o(t,e);else{const r=()=>{t.removeEventListener("load",r),o(t,e)};t.addEventListener("load",r)}}))),a=(t,e)=>{const r=new Image;return r.src=t,n(r,e)};t.default=(t,e)=>t instanceof ImageData?new Promise((r=>{r(s(t,e))})):t instanceof Image?n(t,e):a(t,e),t.extractColorsFromImage=n,t.extractColorsFromImageData=s,t.extractColorsFromSrc=a,Object.defineProperty(t,"__esModule",{value:!0})}));

},{}],"src/colorUtil.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rgbValueToHex = exports.rgbToHex = void 0;
var componentToHex = function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};
var rgbToHex = function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};
exports.rgbToHex = rgbToHex;
var rgbValueToHex = function rgbValueToHex(v) {
  return (0, exports.rgbToHex)(v.r, v.g, v.b);
};
exports.rgbValueToHex = rgbValueToHex;
},{}],"src/Circle.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Circle = void 0;
var colorUtil_1 = require("./colorUtil");
var _x = /*#__PURE__*/new WeakMap();
var _y = /*#__PURE__*/new WeakMap();
var _color = /*#__PURE__*/new WeakMap();
var Circle = /*#__PURE__*/function () {
  function Circle(x, y, color) {
    _classCallCheck(this, Circle);
    _classPrivateFieldInitSpec(this, _x, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _y, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _color, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(this, _x, x);
    _classPrivateFieldSet(this, _y, y);
    _classPrivateFieldSet(this, _color, color);
  }
  _createClass(Circle, [{
    key: "x",
    get: function get() {
      return _classPrivateFieldGet(this, _x);
    }
  }, {
    key: "y",
    get: function get() {
      return _classPrivateFieldGet(this, _y);
    }
  }, {
    key: "color",
    get: function get() {
      return _classPrivateFieldGet(this, _color);
    }
  }], [{
    key: "createByPosition",
    value: function createByPosition(position, color) {
      return new Circle(position.x, position.y, typeof color === "string" ? color : (0, colorUtil_1.rgbValueToHex)(color));
    }
  }]);
  return Circle;
}();
exports.Circle = Circle;
},{"./colorUtil":"src/colorUtil.ts"}],"src/Position.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Position = void 0;
var _x = /*#__PURE__*/new WeakMap();
var _y = /*#__PURE__*/new WeakMap();
var Position = /*#__PURE__*/function () {
  function Position(x, y) {
    _classCallCheck(this, Position);
    _classPrivateFieldInitSpec(this, _x, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _y, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(this, _x, x);
    _classPrivateFieldSet(this, _y, y);
  }
  _createClass(Position, [{
    key: "x",
    get: function get() {
      return _classPrivateFieldGet(this, _x);
    }
  }, {
    key: "y",
    get: function get() {
      return _classPrivateFieldGet(this, _y);
    }
  }]);
  return Position;
}();
exports.Position = Position;
},{}],"src/Line.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Line = void 0;
var Position_1 = require("./Position");
var _p = /*#__PURE__*/new WeakMap();
var _p2 = /*#__PURE__*/new WeakMap();
var Line = /*#__PURE__*/function () {
  function Line(p1, p2) {
    _classCallCheck(this, Line);
    _classPrivateFieldInitSpec(this, _p, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _p2, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(this, _p, p1);
    _classPrivateFieldSet(this, _p2, p2);
  }
  _createClass(Line, [{
    key: "p1",
    get: function get() {
      return _classPrivateFieldGet(this, _p);
    }
  }, {
    key: "p2",
    get: function get() {
      return _classPrivateFieldGet(this, _p2);
    }
  }], [{
    key: "createByCircle",
    value: function createByCircle(c1, c2) {
      return new Line(new Position_1.Position(c1.x, c1.y), new Position_1.Position(c2.x, c2.y));
    }
  }]);
  return Line;
}();
exports.Line = Line;
},{"./Position":"src/Position.ts"}],"src/drawUtil.ts":[function(require,module,exports) {
"use strict";

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScopeGroup = void 0;
var Circle_1 = require("./Circle");
var colorUtil_1 = require("./colorUtil");
var Line_1 = require("./Line");
var Position_1 = require("./Position");
var ScopeGroup = /*#__PURE__*/function () {
  function ScopeGroup($$wrap, image, width, height, mainColors, callback, opt) {
    _classCallCheck(this, ScopeGroup);
    _defineProperty(this, "ctx", void 0);
    _defineProperty(this, "image", void 0);
    _defineProperty(this, "circles", void 0);
    _defineProperty(this, "areaInfo", void 0);
    _defineProperty(this, "imageData", void 0);
    _defineProperty(this, "callback", void 0);
    _defineProperty(this, "drawOpt", void 0);
    this.drawOpt = Object.assign({
      circle_size: 32,
      circle_line_wid: 5,
      circle_line_color: '#ffffff',
      line_wid: 5,
      line_color: '#ffffff'
    }, opt);
    this._initHTML($$wrap, width, height);
    var $$imgDraw = document.getElementById("img-draw");
    this.ctx = $$imgDraw.getContext('2d');
    this.image = image;
    this.areaInfo = this.ctx.canvas.getBoundingClientRect();
    this.callback = callback;
    ////////////////////////////////////////////////////////////////
    this.ctx.drawImage(image, 0, 0, width, height);
    var imageData = this.ctx.getImageData(0, 0, width, height);
    this.imageData = imageData.data;
    var circles = [];
    var _iterator = _createForOfIteratorHelper(mainColors),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var color = _step.value;
        var position = this._findPositionOfColor(color);
        if (position) {
          circles.push(Circle_1.Circle.createByPosition(position, color));
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    circles.sort(function (a, b) {
      return a.y - b.y;
    });
    this.circles = circles;
    //////////////////////////////////
    this.callback(this.circles.map(function (e) {
      return e.color;
    }));
    this._draw();
    this._event();
  }
  _createClass(ScopeGroup, [{
    key: "_initHTML",
    value: function _initHTML($$wrap, width, height) {
      $$wrap.innerHTML = "\n            <div style=\"\n                position: relative;\n                width: ".concat(width, "px;\n                height: ").concat(height, "px;\n            \">\n                <canvas \n                    id=\"img-draw\" \n                    width=\"").concat(width, "\" \n                    height=\"").concat(height, "\"></canvas>\n            </div>\n        ");
    }
  }, {
    key: "_draw",
    value: function _draw() {
      var _this$ctx$canvas = this.ctx.canvas,
        width = _this$ctx$canvas.width,
        height = _this$ctx$canvas.height;
      this.ctx.clearRect(0, 0, width, height);
      this.ctx.drawImage(this.image, 0, 0, width, height);
      // finding`
      for (var i = 0, len = this.circles.length; i < len; i++) {
        // 마지막 루프는 제외
        if (i < len - 1) {
          this._drawLine(Line_1.Line.createByCircle(this.circles[i], this.circles[i + 1]));
        }
        this._drawCircle(this.circles[i]);
      }
    }
  }, {
    key: "_drawCircle",
    value: function _drawCircle(circle) {
      this.ctx.beginPath();
      this.ctx.arc(circle.x, circle.y, this.drawOpt.circle_size, 0, 2 * Math.PI);
      this.ctx.fillStyle = circle.color;
      this.ctx.fill();
      this.ctx.lineWidth = this.drawOpt.circle_line_wid;
      this.ctx.strokeStyle = this.drawOpt.circle_line_color;
      this.ctx.stroke();
    }
  }, {
    key: "_drawLine",
    value: function _drawLine(l) {
      this.ctx.beginPath();
      this.ctx.moveTo(l.p1.x, l.p1.y);
      this.ctx.lineTo(l.p2.x, l.p2.y);
      this.ctx.lineWidth = this.drawOpt.line_wid;
      this.ctx.strokeStyle = this.drawOpt.line_color;
      this.ctx.stroke();
    }
  }, {
    key: "_event",
    value: function _event() {
      this.ctx.canvas.addEventListener('mousedown', this._onMouseDown.bind(this));
      this.ctx.canvas.addEventListener('touchstart', this._onMouseDown.bind(this));
    }
  }, {
    key: "_onMouseDown",
    value: function _onMouseDown(e) {
      var _this = this;
      e.preventDefault();
      var mouseDownPos = this._getRealPosition(e);
      var clickIdx = this._idxOfCircles(mouseDownPos);
      if (clickIdx > -1) {
        var clickCircle = this.circles[clickIdx];
        var x_gap = clickCircle.x - mouseDownPos.x;
        var y_gap = clickCircle.y - mouseDownPos.y;
        var onMouseMove = function onMouseMove(e) {
          e.preventDefault();
          var mouseMovePos = _this._getRealPosition(e);
          var revPosition = new Position_1.Position(mouseMovePos.x + x_gap, mouseMovePos.y + y_gap);
          if (revPosition.x < 0 || revPosition.x > _this.ctx.canvas.width || revPosition.y < 0 || revPosition.y > _this.ctx.canvas.height) {
            return;
          }
          var overColor = _this._colorOfPoint(revPosition);
          if (overColor) {
            var newCircle = new Circle_1.Circle(revPosition.x, revPosition.y, overColor);
            _this.circles[clickIdx] = newCircle;
            _this._draw();
            _this.callback(_this.circles.map(function (e) {
              return e.color;
            }));
          }
        };
        var onMouseUp = function onMouseUp() {
          _this.ctx.canvas.removeEventListener('mousemove', onMouseMove);
          _this.ctx.canvas.removeEventListener('touchmove', onMouseMove);
          _this.ctx.canvas.removeEventListener('mouseup', onMouseUp);
          _this.ctx.canvas.removeEventListener('mouseleave', onMouseUp);
          _this.ctx.canvas.removeEventListener('touchend', onMouseUp);
          _this.ctx.canvas.removeEventListener('touchcancel', onMouseUp);
        };
        this.ctx.canvas.addEventListener('mousemove', onMouseMove);
        this.ctx.canvas.addEventListener('touchmove', onMouseMove);
        this.ctx.canvas.addEventListener('mouseup', onMouseUp);
        this.ctx.canvas.addEventListener('mouseleave', onMouseUp);
        this.ctx.canvas.addEventListener('touchend', onMouseUp);
        this.ctx.canvas.addEventListener('touchcancel', onMouseUp);
      }
    }
  }, {
    key: "_getRealPosition",
    value: function _getRealPosition(e) {
      var _e$changedTouches, _e$changedTouches2;
      var x = 0;
      var y = 0;
      if (e.clientX) {
        x = e.clientX;
      } else if (((_e$changedTouches = e.changedTouches) === null || _e$changedTouches === void 0 ? void 0 : _e$changedTouches.length) > 0) {
        x = e.changedTouches[0].clientX;
      }
      if (e.clientY) {
        y = e.clientY;
      } else if (((_e$changedTouches2 = e.changedTouches) === null || _e$changedTouches2 === void 0 ? void 0 : _e$changedTouches2.length) > 0) {
        y = e.changedTouches[0].clientY;
      }
      x = Math.ceil(x);
      y = Math.ceil(y);
      x -= this.areaInfo.x;
      y -= this.areaInfo.y;
      return new Position_1.Position(x, y);
    }
  }, {
    key: "_findPositionOfColor",
    value: function _findPositionOfColor(rgbValue) {
      var width = this.ctx.canvas.width;
      for (var i = 0; i < this.imageData.length; i += 4) {
        var r = this.imageData[i];
        var g = this.imageData[i + 1];
        var b = this.imageData[i + 2];
        if (r <= rgbValue.r + 5 && r >= rgbValue.r - 5 && g <= rgbValue.g + 5 && g >= rgbValue.g - 5 && b <= rgbValue.b + 5 && b >= rgbValue.b - 5) {
          var x = i / 4 % width;
          var y = Math.floor(i / 4 / width);
          return new Position_1.Position(x, y);
        }
      }
    }
  }, {
    key: "_idxOfCircles",
    value: function _idxOfCircles(p) {
      var _this2 = this;
      return this.circles.findIndex(function (circle) {
        // 방향
        var dy = Math.abs(circle.y - p.y);
        var dx = Math.abs(circle.x - p.x);
        var theta = Math.atan2(dy, dx);
        // 방향으로 원의 최대 위치
        var maxX = circle.x + _this2.drawOpt.circle_size * Math.cos(theta);
        var maxY = circle.y + _this2.drawOpt.circle_size * Math.sin(theta);
        var minX = circle.x - _this2.drawOpt.circle_size * Math.cos(theta);
        var minY = circle.y - _this2.drawOpt.circle_size * Math.sin(theta);
        return p.x >= minX && p.x <= maxX && p.y >= minY && p.y <= maxY;
      });
    }
  }, {
    key: "_colorOfPoint",
    value: function _colorOfPoint(p) {
      var width = this.ctx.canvas.width;
      var x = p.x * 4;
      var y = p.y * width * 4;
      var r = this.imageData[x + y];
      var g = this.imageData[x + y + 1];
      var b = this.imageData[x + y + 2];
      return r && g && b ? (0, colorUtil_1.rgbToHex)(r, g, b) : undefined;
    }
  }], [{
    key: "create",
    value: function create() {
      for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }
      return _construct(ScopeGroup, params);
    }
  }]);
  return ScopeGroup;
}();
exports.ScopeGroup = ScopeGroup;
},{"./Circle":"src/Circle.ts","./colorUtil":"src/colorUtil.ts","./Line":"src/Line.ts","./Position":"src/Position.ts"}],"src/imageUtil.ts":[function(require,module,exports) {
"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resizeImg = exports.RGBValue = void 0;
var RGBValue = /*#__PURE__*/_createClass(function RGBValue(r, g, b) {
  _classCallCheck(this, RGBValue);
  _defineProperty(this, "r", void 0);
  _defineProperty(this, "g", void 0);
  _defineProperty(this, "b", void 0);
  this.r = r;
  this.g = g;
  this.b = b;
});
exports.RGBValue = RGBValue;
var resizeImg = function resizeImg(max_width, max_height, width, height) {
  if (width > height) {
    if (width > max_width) {
      height = height * (max_width / width);
      width = max_width;
    }
  } else {
    if (height > max_height) {
      width = width * (max_height / height);
      height = max_height;
    }
  }
  return {
    width: width,
    height: height
  };
};
exports.resizeImg = resizeImg;
},{}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var extract_colors_1 = __importDefault(require("extract-colors"));
var drawUtil_1 = require("./drawUtil");
var imageUtil_1 = require("./imageUtil");
var urlParams = new URLSearchParams(window.location.search);
var pointerCount = 3;
if (urlParams.get("pointerCount") != null) {
  pointerCount = urlParams.get("pointerCount");
  // alert(pointerCount);
}
/**
 * ! 이곳이 callback
 *
 * @param color 컬러코드
 */
var callback = function callback(colors) {
  // alert(colors[0]+":"+colors[1]+":"+colors[2]);
  // alert(hexToRgb(colors[0])?.r+":"+hexToRgb(colors[1])?.g+":"+hexToRgb(colors[2])?.b);
  var rgbColors = [];
  rgbColors.push(hexToRgb(colors[0]));
  rgbColors.push(hexToRgb(colors[1]));
  rgbColors.push(hexToRgb(colors[2]));
  // alert(JSON.stringify(rgbColors));
  outLinkSendRgbColors(JSON.stringify(rgbColors));
};
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var RgbColor;
  return result ? RgbColor = {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
// var isMobile = {
//   Android: function () {
//     return navigator.userAgent.match(/Android/i) == null ? false : true;
//   },
//   iOS: function () {
//     return navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true;
//   },
//   any: function () {
//     return (isMobile.Android() || isMobile.iOS());
//   }
// };
// 입력 된 링크를 전달하는 Bridge 함수
function outLinkSendRgbColors(rgbColors) {
  // if (isMobile.any()) {
  //   if (isMobile.Android()) {
  //     // android.bridge.outLink(link);
  //   } else if (isMobile.iOS()) {
  //     alert("OK1");
  //     window.webkit.messageHandlers.test2.postMessage(link);
  //   }
  // }
  try {
    window.webkit.messageHandlers.rgbColors.postMessage(rgbColors);
  } catch (e) {
    console.log(e);
  }
}
var CIRCLE_SIZE = 32;
var CIRCLE_LINE_WID = 6;
var CIRCLE_LINE_COLOR = "#ffffff";
var LINE_WID = 6;
var LINE_COLOR = "#ffffff";
////////////////////////////////////////////////////////////////////////
var $$imgFile = document.getElementById("imgfile");
var $$draw = document.getElementById("draw");
var winWidth = window.innerWidth;
var winHeight = window.innerHeight;
$$imgFile.addEventListener("change", function () {
  var _$$imgFile$files;
  var file = (_$$imgFile$files = $$imgFile.files) === null || _$$imgFile$files === void 0 ? void 0 : _$$imgFile$files[0];
  var fileReader = new FileReader();
  fileReader.onload = function () {
    var image = new Image();
    image.onload = function () {
      var imgWid = image.width;
      var imgHei = image.height;
      var _ref = (0, imageUtil_1.resizeImg)(winWidth, winHeight, imgWid, imgHei),
        width = _ref.width,
        height = _ref.height;
      image.width = width;
      image.height = height;
      (0, extract_colors_1.default)(image.src, {
        distance: 0.2,
        saturationImportance: 0
      }).then(function (e) {
        var mainColors = e.map(function (i) {
          return new imageUtil_1.RGBValue(i.red, i.green, i.blue);
        }).slice(0, pointerCount);
        drawUtil_1.ScopeGroup.create($$draw, image, width, height, mainColors, callback, {
          circle_size: CIRCLE_SIZE,
          circle_line_wid: CIRCLE_LINE_WID,
          circle_line_color: CIRCLE_LINE_COLOR,
          line_wid: LINE_WID,
          line_color: LINE_COLOR
        });
      });
    };
    image.src = fileReader.result;
    if ($$imgFile.parentElement) {
      $$imgFile.parentElement.style.display = 'none';
    }
  };
  if (file) {
    fileReader.readAsDataURL(file);
  }
});
},{"extract-colors":"node_modules/extract-colors/dist/extract-colors.umd.js","./drawUtil":"src/drawUtil.ts","./imageUtil":"src/imageUtil.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56103" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map