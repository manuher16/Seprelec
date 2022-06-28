"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _validateJWT = _interopRequireDefault(require("../middlewares/validateJWT"));

var _authRoute = _interopRequireDefault(require("../middlewares/authRoute"));

var router = _express["default"].Router();

router.get('/validate-jwt', _validateJWT["default"], _authRoute["default"], function (req, res) {
  res.status(200).json({
    user: req.user,
    isAuthenticated: true,
    message: "JWT is valid"
  });
});
var _default = router;
exports["default"] = _default;