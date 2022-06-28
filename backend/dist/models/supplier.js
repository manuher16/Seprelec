"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var suplierSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    "default": ''
  },
  telephone: {
    type: String,
    "default": '',
    required: true
  },
  email: {
    type: String,
    "default": ''
  },
  heading: {
    type: String,
    "default": ''
  },
  iva: {
    type: Number,
    "default": 0
  },
  website: {
    type: String,
    "default": ''
  },
  materials: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Material'
  }]
}, {
  timestamps: true
});

var _default = _mongoose["default"].model('Supplier', suplierSchema);

exports["default"] = _default;