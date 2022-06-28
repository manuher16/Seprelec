"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _route = _interopRequireDefault(require("../../models/route"));

var createRoute = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var TYPE, _req$body, path, origin, roles, route;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            TYPE = {
              SERVER: "SERVER",
              CLIENT: "CLIENT"
            };
            _req$body = req.body, path = _req$body.path, origin = _req$body.origin, roles = _req$body.roles;
            route = new _route["default"]({
              path: path,
              origin: origin,
              roles: roles,
              fullPath: "".concat(origin).concat(path),
              description: req.body.description ? req.body.description : "",
              type: req.body.type == "SERVER" ? TYPE.SERVER : TYPE.CLIENT
            });
            _context.next = 6;
            return route.save();

          case 6:
            res.status(200).json({
              message: "Ruta creada exitosamente",
              route: route
            });
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.status(500).json({
              message: _context.t0.message
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function createRoute(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = createRoute;
exports["default"] = _default;