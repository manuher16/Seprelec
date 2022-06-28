"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _employee = _interopRequireDefault(require("../../models/employee"));

var deleteEmployee = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var employee;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _employee["default"].findById(req.params.id).populate("idUser");

          case 3:
            employee = _context.sent;

            if (employee) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              success: false,
              message: "Empleado no encontrado"
            }));

          case 6:
            _context.next = 8;
            return employee.remove();

          case 8:
            res.json({
              success: true,
              message: "Empleado ".concat(employee.idUser.name, " eliminado")
            });
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function deleteEmployee(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = deleteEmployee;
exports["default"] = _default;