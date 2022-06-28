"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _project = _interopRequireDefault(require("../../models/project"));

var getProject = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var project;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _project["default"].findById(req.params.id);

          case 3:
            project = _context.sent;

            if (project) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              message: "Proyecto no encontrado"
            }));

          case 6:
            res.json({
              message: "Proyecto encontrado",
              project: project
            });
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.status(500).json({
              message: "Error al obtener el proyecto"
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function getProject(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();