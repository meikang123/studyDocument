"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.promise.finally");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _index = _interopRequireDefault(require("./src/utils/index"));

var _utils = require("./utils");

console.log(_index.default);
var a = [1, 2, 3];
var b = (0, _map.default)(a).call(a, function (item) {
  return item + 1;
});
console.log(b);
var name = (0, _utils.getName)();
console.log(name);

var Pro = /*#__PURE__*/function () {
  function Pro(age) {
    (0, _classCallCheck2.default)(this, Pro);
    this.age = age;
  }

  (0, _createClass2.default)(Pro, [{
    key: "getAge",
    value: function getAge() {
      return this.age;
    }
  }]);
  return Pro;
}();

var pro = new Pro(26);
console.log(pro.getAge());

var p = function p() {
  return new _promise.default(function (resolve) {
    resolve(true);
  });
};

p.then(function (res) {
  console.log(res);
}).finally(function () {
  console.log(2222);
});
var _default = {
  version: '1.0.0'
};
exports.default = _default;
