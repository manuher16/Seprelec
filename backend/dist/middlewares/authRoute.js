"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _route = _interopRequireDefault(require("../models/route"));

var authRoute = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var to, route, i;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            to = req.headers.to;
            _context.next = 4;
            return _route["default"].findOne({
              path: to
            });

          case 4:
            route = _context.sent;

            if (route) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              message: "Ruta no encontrada"
            }));

          case 7:
            i = 0;

          case 8:
            if (!(i < route.roles.length)) {
              _context.next = 14;
              break;
            }

            if (!(route.roles[i].toString() == req.user.idRole)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", next());

          case 11:
            i++;
            _context.next = 8;
            break;

          case 14:
            return _context.abrupt("return", res.status(403).json({
              message: "No tienes permisos para acceder a esta ruta",
              isAuthenticated: false
            }));

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 17]]);
  }));

  return function authRoute(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = authRoute;
exports["default"] = _default;