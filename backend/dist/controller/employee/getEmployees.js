"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _employee = _interopRequireDefault(require("../../models/employee"));

var _role = _interopRequireDefault(require("../../models/role"));

var getEmployees = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var employees;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("getEmployees");
            _context.prev = 1;
            _context.next = 4;
            return _employee["default"].aggregate([{
              '$lookup': {
                'from': 'users',
                'localField': 'idUser',
                'foreignField': '_id',
                'as': 'user'
              }
            }, {
              '$unwind': {
                'path': '$user'
              }
            }, {
              '$lookup': {
                'from': 'roles',
                'localField': 'user.idRole',
                'foreignField': '_id',
                'as': 'role'
              }
            }, {
              '$unwind': {
                'path': '$role'
              }
            }]);

          case 4:
            employees = _context.sent;
            res.status(200).json({
              success: true,
              employees: employees
            });
            _context.next = 10;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
  }));

  return function getEmployees(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getEmployees;
exports["default"] = _default;