"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../../models/user"));

var getAllUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var users, keys, headers;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _user["default"].aggregate([{
              '$lookup': {
                'from': 'roles',
                'localField': 'idRole',
                'foreignField': '_id',
                'as': 'role'
              }
            }, {
              '$project': {
                'name': 1,
                'email': 1,
                'role': {
                  '$arrayElemAt': ['$role', 0]
                },
                'telephone': 1,
                'address': 1,
                'createdAt': {
                  '$dateToString': {
                    'format': '%d-%m-%Y %H:%m',
                    'date': '$createdAt',
                    'timezone': 'America/Tegucigalpa'
                  }
                },
                'updatedAt': {
                  '$dateToString': {
                    'format': '%d-%m-%Y %H:%m',
                    'date': '$updatedAt',
                    'timezone': 'America/Tegucigalpa'
                  }
                },
                'permissions': 1
              }
            }]);

          case 3:
            users = _context.sent;
            keys = Object.keys(users[0]);
            headers = [];
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
            return _context.abrupt("return", res.status(200).json({
              success: true,
              users: users,
              headers: headers
            }));

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).json({
              success: false,
              message: _context.t0.message
            }));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function getAllUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getAllUser;
exports["default"] = _default;