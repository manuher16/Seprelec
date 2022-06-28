"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _http = _interopRequireDefault(require("http"));

var _index = _interopRequireDefault(require("./routes/index.js"));

var _database = _interopRequireDefault(require("./config/database"));

_dotenv["default"].config();

var server = _http["default"].createServer(_index["default"]);

var PORT = process.env.PORT || 3000;
server.listen(PORT, function () {
  console.log("Server is running on port http://localhost:".concat(PORT));
});