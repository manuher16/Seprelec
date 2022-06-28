"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var invoiceSchema = new _mongoose["default"].Schema({
  paid: {
    type: Boolean,
    required: true,
    "default": false
  },
  idCompany: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "company"
  },
  idProject: {
    type: _mongoose["default"].Types.ObjectId,
    required: true,
    ref: "project"
  },
  idQuote: {
    type: _mongoose["default"].Types.ObjectId,
    ref: "quote"
  },
  numInvoice: {
    type: String,
    required: true,
    unique: true
  },
  state: {
    type: String,
    required: true,
    "default": "Pendiente",
    "enum": ["Pendiente", "Pagado", "Cancelado"]
  },
  idEmployee: [{
    type: _mongoose["default"].Types.ObjectId,
    ref: "employee"
  }]
}, {
  timestamps: true
});

var _default = _mongoose["default"].model('invoice', invoiceSchema);

exports["default"] = _default;