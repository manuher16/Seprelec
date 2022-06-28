"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../../models/user"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var login = function login(req, res) {
  try {
    var _req$body = req.body,
        email = _req$body.email,
        password = _req$body.password;

    _user["default"].findOne({
      email: email
    }).then(function (user) {
      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      _bcrypt["default"].compare(password, user.password).then(function (isMatch) {
        if (!isMatch) {
          return res.status(400).json({
            message: "Invalid credentials"
          });
        }

        var payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          idRole: user.idRole
        };

        _jsonwebtoken["default"].sign(payload, process.env.SECRET_KEY, {
          expiresIn: 86400
        }, function (err, token) {
          if (err) {
            res.status(500).json({
              message: "Error signing token"
            });
          } else {
            res.status(200).json({
              message: "Login successful",
              token: token
            });
          }
        });
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

var _default = login;
exports["default"] = _default;