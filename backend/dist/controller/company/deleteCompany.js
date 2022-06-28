"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _company = _interopRequireDefault(require("../../models/company"));

var deleteCompany = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var company;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _company["default"].findById(req.params.id);

          case 3:
            company = _context.sent;

            if (company) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              success: false,
              message: "Compania no encontrada"
            }));

          case 6:
            _context.next = 8;
            return company.remove();

          case 8:
            res.json({
              success: true,
              message: "Compania ".concat(company.name, " eliminada ")
            });
            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.status(500).json({
              message: "Error in the server"
            });

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function deleteCompany(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = deleteCompany;
exports["default"] = _default;