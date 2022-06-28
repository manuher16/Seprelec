"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../../models/user"));

var _role = _interopRequireDefault(require("../../models/role"));

var changeRole = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var role, roleIsvalid, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            role = req.user.role;
            roleIsvalid = _role["default"].findOne({
              name: role
            });

            if (roleIsvalid) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.status(401).send({
              error: 'Role not found'
            }));

          case 5:
            _context.next = 7;
            return _user["default"].findById(req.user.id);

          case 7:
            user = _context.sent;
            user.role = req.body.role._id;
            _context.next = 11;
            return user.save();

          case 11:
            res.json({
              message: "Role changed",
              data: user
            });
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              message: "Role",
              data: _context.t0
            });

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 14]]);
  }));

  return function changeRole(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = changeRole;
exports["default"] = _default;