"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var materialSchema = _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  idSupplier: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Supplier'
  },
  quantity: {
    type: Number,
    "default": 1
  },
  unit: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Unit',
    required: true
  },
  price: {
    type: Number,
    required: true
  }
}, {
  timestamp: true
});

var _default = _mongoose["default"].model('Material', materialSchema);

exports["default"] = _default;