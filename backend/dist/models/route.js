"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var routeLinkSchema = new _mongoose["default"].Schema({
  path: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  fullPath: {
    type: String,
    required: true,
    unique: true
  },
  roles: [{
    type: _mongoose["default"].Types.ObjectId,
    ref: "Role"
  }],
  description: {
    type: String
  },
  type: {
    type: String,
    required: true,
    "enum": ["SERVER", "CLIENT"]
  }
}, {
  timestamps: true
});

var _default = _mongoose["default"].model("route", routeLinkSchema);

exports["default"] = _default;