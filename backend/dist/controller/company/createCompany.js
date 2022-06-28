"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _company = _interopRequireDefault(require("../../models/company"));

var createCompany = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var company;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            company = new _company["default"]({
              name: req.body.name,
              rtn: req.body.rtn,
              address: req.body.address,
              telephone: req.body.telephone,
              email: req.body.email,
              department: req.body.department,
              city: req.body.city,
              logo: req.body.logo ? req.body.logo : null,
              description: req.body.description ? req.body.description : null
            });
            _context.next = 4;
            return company.save();

          case 4:
            res.status(200).json({
              success: true,
              message: "Empresa creada"
            });
            _context.next = 12;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);

            if (!(_context.t0.code === "11000")) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              success: false,
              code: _context.t0.code,
              msg: "ya existe "
            }));

          case 11:
            return _context.abrupt("return", res.status(500).json({
              message: "Internal server error",
              error: _context.t0.message
            }));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function createCompany(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = createCompany;
exports["default"] = _default;