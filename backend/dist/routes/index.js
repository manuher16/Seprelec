"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _helmet = _interopRequireDefault(require("helmet"));

var _expressLogger = _interopRequireDefault(require("express-logger"));

var _public = _interopRequireDefault(require("./public.routes"));

var _user = _interopRequireDefault(require("./user.routes"));

var _utils = _interopRequireDefault(require("./utils.routes"));

var _admin = _interopRequireDefault(require("./admin.routes"));

//import routes 
var app = (0, _express["default"])();
app.use((0, _expressLogger["default"])({
  path: "/path/to/logfile.txt"
}));
app.use((0, _helmet["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _morgan["default"])('dev'));
app.use((0, _cors["default"])({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
})); //Routes

app.use('/api/public', _public["default"]);
app.use('/api/user', _user["default"]);
app.use('/api/utils', _utils["default"]);
app.use('/api/admin', _admin["default"]);
var _default = app;
exports["default"] = _default;