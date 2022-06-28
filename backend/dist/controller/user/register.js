"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../../models/user"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var register = function register(req, res) {
  try {
    console.log(req.body);
    var _req$body = req.body,
        name = _req$body.name,
        email = _req$body.email,
        password = _req$body.password,
        telephone = _req$body.telephone,
        address = _req$body.address;

    _user["default"].findOne({
      email: email
    }).then(function (user) {
      if (user) {
        return res.status(400).json({
          message: "User already exists"
        });
      }

      var hashPassword = _bcrypt["default"].hashSync(password, 10);

      var newUser = new _user["default"]({
        name: name,
        email: email,
        "password": hashPassword,
        telephone: telephone,
        address: address
      });
      newUser.save().then(function (user) {
        res.status(201).json({
          message: "User created",
          user: user
        });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

var _default = register;
exports["default"] = _default;