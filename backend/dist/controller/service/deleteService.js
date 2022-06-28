"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _service = _interopRequireDefault(require("../../models/service"));

var deleteService = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var service;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _service["default"].findById(req.params.id);

          case 3:
            service = _context.sent;

            if (service) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              success: false,
              message: "Service no encontrado"
            }));

          case 6:
            _context.next = 8;
            return service.remove();

          case 8:
            res.status(200).json({
              success: true,
              message: "Servicio eleminado"
            });
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              success: false,
              error: "No se puedo eliminar el servicio"
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function deleteService(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = deleteService;
exports["default"] = _default;