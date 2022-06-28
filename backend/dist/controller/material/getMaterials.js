"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _material = _interopRequireDefault(require("../../models/material"));

var getMaterials = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var materials;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _material["default"].find({}).populate('idSupplier').populate('unit');

          case 3:
            materials = _context.sent;
            materials = materials.map(function (material) {
              return {
                _id: material._id,
                name: material.name,
                price: material.price,
                quantity: material.quantity,
                idSupplier: material.idSupplier,
                unit: material.unit,
                quantity2: 1
              };
            });
            res.status(200).json({
              success: true,
              materials: materials
            });
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              success: false,
              error: _context.t0.message
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function getMaterials(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getMaterials;
exports["default"] = _default;