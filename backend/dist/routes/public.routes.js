"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _getUnits = _interopRequireDefault(require("../controller/unit/getUnits"));

var router = _express["default"].Router(); //Routes units


router.get('/units', _getUnits["default"]);
router.get('/', function (req, res) {
  res.send('Hello World!');
});
var _default = router;
exports["default"] = _default;