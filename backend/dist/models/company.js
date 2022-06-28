"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var companySchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  rtn: {
    type: Number,
    required: true,
    unique: true
  },
  logo: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  projects: {
    type: [{
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: 'Project'
    }],
    "default": []
  }
}, {
  timestamps: true
});

var _default = _mongoose["default"].model('Company', companySchema);

exports["default"] = _default;