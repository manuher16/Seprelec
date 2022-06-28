"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _login = _interopRequireDefault(require("../controller/user/login"));

var _register = _interopRequireDefault(require("../controller/user/register"));

var router = _express["default"].Router(); //Controllers


//Routes
router.post('/login-admin', _login["default"]);
router.post('/register', _register["default"]);
var _default = router;
exports["default"] = _default;