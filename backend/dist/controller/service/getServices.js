"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _service = _interopRequireDefault(require("../../models/service"));

var _material = _interopRequireDefault(require("../../models/material"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var getServices = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var services, tempMaterials, tempServices, i, service, materails, j, material;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _service["default"].find({});

          case 3:
            services = _context.sent;
            tempMaterials = [];
            tempServices = [];
            i = 0;

          case 7:
            if (!(i < services.length)) {
              _context.next = 25;
              break;
            }

            service = services[i];
            materails = service.materials;
            j = 0;

          case 11:
            if (!(j < materails.length)) {
              _context.next = 20;
              break;
            }

            _context.next = 14;
            return _material["default"].findById(materails[j]._id);

          case 14:
            material = _context.sent;
            material.quantity = materails[j].quantity;
            tempMaterials.push(material);

          case 17:
            j++;
            _context.next = 11;
            break;

          case 20:
            tempServices.push(_objectSpread(_objectSpread({}, service.toJSON()), {}, {
              materials: tempMaterials
            }));
            tempMaterials = [];

          case 22:
            i++;
            _context.next = 7;
            break;

          case 25:
            res.status(200).json({
              services: tempServices
            });
            _context.next = 31;
            break;

          case 28:
            _context.prev = 28;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              success: false,
              error: _context.t0.message
            });

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 28]]);
  }));

  return function getServices(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getServices;
exports["default"] = _default;