"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var projectSchema = new _mongoose["default"].Schema({
  description: {
    type: String,
    required: true
  },
  payDay: {
    type: Date,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    "default": null
  },
  status: {
    type: String,
    "default": 'En espera'
  },
  idCompany: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: "company",
    "default": null
  },
  idQuote: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    "default": null,
    ref: "quote"
  },
  idInvoice: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    "default": null,
    ref: "invoice"
  },
  workforce: [{
    employee: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      required: true,
      ref: "employee"
    },
    price: {
      type: Number,
      required: true
    }
  }]
}, {
  timestamps: true
});

var _default = _mongoose["default"].model('project', projectSchema);

exports["default"] = _default;