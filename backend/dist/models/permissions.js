"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var permissionShema = new _mongoose["default"].Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    "default": ''
  },
  write: {
    type: Boolean,
    "default": false
  },
  read: {
    type: Boolean,
    "default": false
  },
  "delete": {
    type: Boolean,
    "default": false
  },
  me: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true
});

var _default = _mongoose["default"].model('permission', permissionShema);

exports["default"] = _default;