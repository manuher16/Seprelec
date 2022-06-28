"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _collection = _interopRequireDefault(require("../models/collection"));

var _permissions = _interopRequireDefault(require("../models/permissions"));

_dotenv["default"].config();

var uri = "mongodb+srv://".concat(process.env.USERNAME_DB, ":").concat(process.env.PASSWORD_DB, "@cluster0.bdi5y.mongodb.net/").concat(process.env.NAME_DATABASE, "?retryWrites=true&w=majority");

_mongoose["default"].connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log("Connected to database ".concat(process.env.NAME_DATABASE));
})["catch"](function (err) {
  console.log(err);
});

var collections = Object.keys(_mongoose["default"].connections[0].collections);
collections.forEach(function (collection) {
  var tempCollection = new _collection["default"]({
    name: collection,
    description: ''
  });
  var tempPermission = new _permissions["default"]({
    name: collection,
    description: ''
  });
  tempPermission.save().then(function () {
    console.log("Permission ".concat(collection, " created"));
  })["catch"](function (err) {});
  tempCollection.save().then(function () {
    console.log("Collection ".concat(collection, " created"));
  })["catch"](function (err) {});
});