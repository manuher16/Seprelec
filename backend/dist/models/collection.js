"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var collectionSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    "default": ''
  }
}, {
  timestamps: true
});

var _default = _mongoose["default"].model('collection', collectionSchema);

exports["default"] = _default;