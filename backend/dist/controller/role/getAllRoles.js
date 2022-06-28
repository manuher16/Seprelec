"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _role = _interopRequireDefault(require("../../models/role"));

var getAllRoles = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var roles, headers, keys;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _role["default"].aggregate([{
              '$project': {
                'name': 1,
                'description': 1,
                'code': 1,
                'permissions': 1,
                'createdAt': {
                  '$dateToString': {
                    'format': '%d-%m-%Y %H:%M',
                    'date': '$createdAt',
                    'timezone': 'America/Tegucigalpa'
                  }
                },
                'updatedAt': {
                  '$dateToString': {
                    'format': '%d-%m-%Y %H:%M',
                    'date': '$updatedAt',
                    'timezone': 'America/Tegucigalpa'
                  }
                }
              }
            }]);

          case 3:
            roles = _context.sent;
            headers = [];
            keys = Object.keys(roles[0]);
            keys.forEach(function (key, index) {
              if (index > 0 && index === 1) {
                headers.push({
                  text: key,
                  align: 'start',
                  value: key
                });
              }

              if (index > 1) {
                headers.push({
                  text: key,
                  value: key
                });
              }
            });
            headers.push({
              text: 'Acciones',
              value: 'action'
            });
            res.status(200).json({
              success: true,
              roles: roles,
              headers: headers
            });
            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.status(500).json({
              ok: false,
              msg: 'Error inesperado'
            });

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function getAllRoles(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getAllRoles;
exports["default"] = _default;