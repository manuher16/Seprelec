"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _employee = _interopRequireDefault(require("../../models/employee"));

var _user = _interopRequireDefault(require("../../models/user"));

var _role = _interopRequireDefault(require("../../models/role"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var createEmployee = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var user, role, employee;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _user["default"].findById(req.body.user);

          case 3:
            user = _context.sent;
            _context.next = 6;
            return _role["default"].findById(req.body.role);

          case 6:
            role = _context.sent;

            if (!(!user && !role)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              ok: false,
              msg: "User not found"
            }));

          case 9:
            _context.next = 11;
            return _user["default"].findByIdAndUpdate(req.body.user, {
              idRole: req.body.role
            });

          case 11:
            employee = new _employee["default"]({
              idUser: req.body.user,
              idRole: req.body.role,
              identifier: req.body.identifier,
              occupation: req.body.occupation,
              titles: [],
              skills: req.body.skills
            });
            _context.next = 14;
            return user.save();

          case 14:
            _context.next = 16;
            return employee.save();

          case 16:
            res.status(200).json({
              success: true,
              msg: "Empleado creado"
            });
            _context.next = 25;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

            if (!(_context.t0.code === "11000")) {
              _context.next = 24;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              ok: false,
              code: _context.t0.code,
              msg: "ya existe ".concat(_context.t0.keyPattern.idUser ? "el empleado" : "la identificacion")
            }));

          case 24:
            return _context.abrupt("return", res.status(500).json({
              message: "Internal server error",
              error: _context.t0.message
            }));

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 19]]);
  }));

  return function createEmployee(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = createEmployee;
exports["default"] = _default;