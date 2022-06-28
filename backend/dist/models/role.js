"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var roleSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  permissions: {
    type: Array,
    required: true,
    "default": []
  },
  code: {
    type: String,
    "default": '',
    required: true
  }
}, {
  timestamps: true
});

var _default = _mongoose["default"].model('Role', roleSchema);

exports["default"] = _default;