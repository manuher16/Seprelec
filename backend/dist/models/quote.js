"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var quoteSchema = new _mongoose["default"].Schema({
  idProject: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "project"
  },
  description: {
    type: String
  },
  materials: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "material"
  }],
  services: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "service"
  }],
  workforce: [{
    price: {
      type: Number
    },
    idEmployee: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: "employee"
    }
  }]
}, {
  timestamps: true
});

var _default = _mongoose["default"].model('Quote', quoteSchema);

exports["default"] = _default;