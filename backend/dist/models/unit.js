"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var unitSchema = _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  abbreviation: {
    type: String,
    unique: true,
    required: true
  }
}, {
  timestamp: true
});

var _default = _mongoose["default"].model('Unit', unitSchema);

exports["default"] = _default;