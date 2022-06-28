"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _project = _interopRequireDefault(require("../../models/project"));

var _invoice = _interopRequireDefault(require("../../models/invoice"));

var _quote = _interopRequireDefault(require("../../models/quote"));

var deleteProject = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var project, invoice, quote;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _project["default"].findById(req.params.id);

          case 3:
            project = _context.sent;
            _context.next = 6;
            return _invoice["default"].findById(project.idInvoice);

          case 6:
            invoice = _context.sent;
            _context.next = 9;
            return _quote["default"].findById(project.idQuote);

          case 9:
            quote = _context.sent;

            if (!quote) {
              _context.next = 13;
              break;
            }

            _context.next = 13;
            return quote.remove();

          case 13:
            if (!invoice) {
              _context.next = 16;
              break;
            }

            _context.next = 16;
            return invoice.remove();

          case 16:
            _context.next = 18;
            return project.remove();

          case 18:
            res.status(200).json({
              message: "Proyecto Eliminado",
              project: project
            });
            _context.next = 24;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              message: "Error al eliminar el proyecto",
              error: _context.t0
            });

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 21]]);
  }));

  return function deleteProject(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = deleteProject;
exports["default"] = _default;