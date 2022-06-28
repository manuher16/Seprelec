"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _permissions = _interopRequireDefault(require("../../models/permissions"));

var createPermissions = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, name, description, write, read, me, del, newPermission;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, name = _req$body.name, description = _req$body.description, write = _req$body.write, read = _req$body.read, me = _req$body.me, del = _req$body.del;
            newPermission = new _permissions["default"]({
              name: name.toLowerCase(),
              description: description,
              write: write,
              read: read,
              me: me,
              "delete": del
            });
            _context.next = 5;
            return newPermission.save();

          case 5:
            res.status(201).json({
              message: "Permission created",
              permission: newPermission
            });
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              message: _context.t0.message
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function createPermissions(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = createPermissions;
exports["default"] = _default;