"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _role = _interopRequireDefault(require("../../models/role"));

var createRole = function createRole(req, res) {
  try {
    console.log(req.body);
    var _req$body = req.body,
        name = _req$body.name,
        description = _req$body.description,
        permissions = _req$body.permissions,
        code = _req$body.code;
    var newRole = new _role["default"]({
      name: name,
      description: description,
      permissions: permissions,
      code: code
    });
    newRole.save().then(function (role) {
      res.status(201).json({
        message: "Role created",
        role: role
      });
    })["catch"](function (err) {
      console.log(err);
      res.status(500).json({
        message: err.message
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};

var _default = createRole;
exports["default"] = _default;