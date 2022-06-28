"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _role = _interopRequireDefault(require("./role"));

var roleDefault = null;
var UserSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  idRole: {
    type: _mongoose["default"].Types.ObjectId,
    ref: "Role"
  },
  permissions: {
    type: Array,
    required: true,
    "default": []
  },
  telephone: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    "default": ''
  }
}, {
  timestamps: true
});
UserSchema.pre('save', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(next) {
    var user, roleDefault;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = this;
            _context.next = 3;
            return _role["default"].findOne({
              name: 'user'
            });

          case 3:
            roleDefault = _context.sent;
            user.idRole = roleDefault._id;
            next();

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

var _default = _mongoose["default"].model('User', UserSchema);

exports["default"] = _default;