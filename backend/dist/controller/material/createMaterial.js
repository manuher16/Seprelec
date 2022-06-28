"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _material = _interopRequireDefault(require("../../models/material"));

var _supplier = _interopRequireDefault(require("../../models/supplier"));

var _unit = _interopRequireDefault(require("../../models/unit"));

var createMaterial = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var supplier, tempUnit, _req$body, name, price, quantity, unit, material;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _supplier["default"].findById(req.params.id);

          case 3:
            supplier = _context.sent;
            _context.next = 6;
            return _unit["default"].findById(req.body.unit._id);

          case 6:
            tempUnit = _context.sent;

            if (supplier) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              message: "Proveedor no encontrado"
            }));

          case 9:
            if (tempUnit) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              message: "Unidad no encontrada"
            }));

          case 11:
            _req$body = req.body, name = _req$body.name, price = _req$body.price, quantity = _req$body.quantity, unit = _req$body.unit;
            material = new _material["default"]({
              name: name,
              quantity: quantity,
              unit: unit._id,
              price: price,
              idSupplier: supplier._id
            });
            _context.next = 15;
            return material.save();

          case 15:
            supplier.materials.push(material);
            _context.next = 18;
            return supplier.save();

          case 18:
            res.status(200).json({
              message: "Material creado con exito",
              material: material
            });
            _context.next = 23;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](0);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 21]]);
  }));

  return function createMaterial(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = createMaterial;
exports["default"] = _default;