"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _supplier = _interopRequireDefault(require("../../models/supplier"));

var _unit = _interopRequireDefault(require("../../models/unit"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var getSuppliers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var suppliers, units;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _supplier["default"].find().populate('materials');

          case 3:
            suppliers = _context.sent;
            _context.next = 6;
            return _unit["default"].find();

          case 6:
            units = _context.sent;
            suppliers = suppliers.map(function (supplier) {
              var materials = supplier.materials.map(function (material) {
                var unit = units.find(function (unit) {
                  return unit._id.toString() === material.unit.toString();
                });
                return _objectSpread(_objectSpread({}, material._doc), {}, {
                  unit: unit._doc
                });
              });
              return _objectSpread(_objectSpread({}, supplier._doc), {}, {
                materials: materials
              });
            });
            res.json({
              success: true,
              suppliers: suppliers
            });
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              success: false,
              message: _context.t0.message
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function getSuppliers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getSuppliers;
exports["default"] = _default;