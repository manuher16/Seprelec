"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _supplier = _interopRequireDefault(require("../../models/supplier"));

var createSupplier = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, name, telephone, email, address, heading, website, supplier;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, name = _req$body.name, telephone = _req$body.telephone, email = _req$body.email, address = _req$body.address, heading = _req$body.heading, website = _req$body.website;
            supplier = new _supplier["default"]({
              name: name,
              telephone: telephone,
              email: email,
              address: address,
              heading: heading,
              website: website
            });
            _context.next = 5;
            return supplier.save();

          case 5:
            res.status(200).json({
              message: "Proveedor creado con exito",
              supplier: supplier
            });
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.status(500).json({
              message: "Error al crear el proveedor",
              error: _context.t0.message
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function createSupplier(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = createSupplier;
exports["default"] = _default;