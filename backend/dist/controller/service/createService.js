"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _service = _interopRequireDefault(require("../../models/service"));

var createService = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, name, description, price, materials, service;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, name = _req$body.name, description = _req$body.description, price = _req$body.price, materials = _req$body.materials;
            service = new _service["default"]({
              name: name,
              description: description,
              price: price,
              materials: materials
            });
            _context.next = 5;
            return service.save();

          case 5:
            res.status(200).json({
              success: true,
              message: 'Servicio creado correctamente',
              service: service
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

  return function createService(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = createService;
exports["default"] = _default;