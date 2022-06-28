"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var employed = new _mongoose["default"].Schema({
  idUser: {
    type: _mongoose["default"].Types.ObjectId,
    required: true,
    ref: "User",
    unique: true
  },
  skills: {
    type: Array,
    required: true,
    "default": []
  },
  identifier: {
    type: String,
    required: true,
    unique: true
  },
  occupation: {
    type: String,
    required: true
  },
  titles: {
    type: Array,
    required: true,
    "default": []
  }
}, {
  timestamps: true
});

var _default = _mongoose["default"].model('employee', employed);

exports["default"] = _default;