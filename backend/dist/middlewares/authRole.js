"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _role = _interopRequireDefault(require("../models/role"));

var authRole = function authRole(rolesAuth) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      var roleUser;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _role["default"].findById({
                _id: req.user.idRole
              });

            case 3:
              roleUser = _context.sent;

              if (roleUser) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.status(404).json({
                message: "Role not found"
              }));

            case 6:
              if (!(rolesAuth.indexOf(roleUser.name) > -1)) {
                _context.next = 11;
                break;
              }

              req.user.role = roleUser;
              next();
              _context.next = 12;
              break;

            case 11:
              return _context.abrupt("return", res.status(403).json({
                message: "not authorized"
              }));

            case 12:
              _context.next = 18;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](0);
              console.log("error authRole");
              res.status(500).json({
                message: "Role",
                data: _context.t0.message
              });

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 14]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
};

var _default = authRole;
exports["default"] = _default;