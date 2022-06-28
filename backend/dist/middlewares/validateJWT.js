"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var validateJWT = function validateJWT(req, res, next) {
  try {
    var token = req.headers.authorization;

    if (!token) {
      token = req.body.authorization;
    }

    if (token.split(' ')[0] == 'Bearer') {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      _jsonwebtoken["default"].verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
          res.status(401).json({
            message: 'Invalid Token'
          });
        } else {
          req.user = decoded;
          next();
        }
      });
    } else {
      res.status(401).json({
        message: 'No Token'
      });
    }
  } catch (error) {
    console.log("error token");
    res.status(500).json({
      message: "token error"
    });
  }
};

var _default = validateJWT;
exports["default"] = _default;