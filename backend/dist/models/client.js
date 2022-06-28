"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var clientShcema = new _mongoose["default"].Schema({
  idUser: {
    type: _mongoose["default"].Types.ObjectId,
    required: true,
    ref: "user"
  },
  company: {
    type: String,
    required: true
  },
  projects: {
    type: Array,
    required: true,
    "default": []
  }
}, {
  timestamps: true
});

var _default = _mongoose["default"].model('client', clientShcema);

exports["default"] = _default;