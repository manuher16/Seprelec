"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _createPermission = _interopRequireDefault(require("../controller/permission/createPermission"));

var _getPermission = _interopRequireDefault(require("../controller/permission/getPermission"));

var _createRole = _interopRequireDefault(require("../controller/role/createRole"));

var _changeRole = _interopRequireDefault(require("../controller/role/changeRole"));

var _getAllUser = _interopRequireDefault(require("../controller/user/getAllUser"));

var _getAllRoles = _interopRequireDefault(require("../controller/role/getAllRoles"));

var _createEmployee = _interopRequireDefault(require("../controller/employee/createEmployee"));

var _searchUserEmail = _interopRequireDefault(require("../controller/user/searchUserEmail"));

var _getEmployees = _interopRequireDefault(require("../controller/employee/getEmployees"));

var _createCompany = _interopRequireDefault(require("../controller/company/createCompany"));

var _getCompanies = _interopRequireDefault(require("../controller/company/getCompanies"));

var _deleteCompany = _interopRequireDefault(require("../controller/company/deleteCompany"));

var _deleteEmployee = _interopRequireDefault(require("../controller/employee/deleteEmployee"));

var _createRoute = _interopRequireDefault(require("../controller/route/createRoute"));

var _getPorjects = _interopRequireDefault(require("../controller/project/getPorjects"));

var _createProject = _interopRequireDefault(require("../controller/project/createProject"));

var _deleteProject = _interopRequireDefault(require("../controller/project/deleteProject"));

var _getRoutes = _interopRequireDefault(require("../controller/route/getRoutes"));

var _deleteRoute = _interopRequireDefault(require("../controller/route/deleteRoute"));

var _getSupliers = _interopRequireDefault(require("../controller/supplier/getSupliers"));

var _createSupplier = _interopRequireDefault(require("../controller/supplier/createSupplier"));

var _createMaterial = _interopRequireDefault(require("../controller/material/createMaterial"));

var _deleteSupplier = _interopRequireDefault(require("../controller/supplier/deleteSupplier"));

var _createUnit = _interopRequireDefault(require("../controller/unit/createUnit"));

var _getServices = _interopRequireDefault(require("../controller/service/getServices"));

var _createService = _interopRequireDefault(require("../controller/service/createService"));

var _getMaterials = _interopRequireDefault(require("../controller/material/getMaterials"));

var _deleteService = _interopRequireDefault(require("../controller/service/deleteService"));

var _deleteRole = _interopRequireDefault(require("../controller/role/deleteRole"));

var _validateJWT = _interopRequireDefault(require("../middlewares/validateJWT"));

var _authRole = _interopRequireDefault(require("../middlewares/authRole"));

var _route = _interopRequireDefault(require("../models/route"));

var _getCollections = _interopRequireDefault(require("../controller/collection/getCollections"));

var router = _express["default"].Router(); //middlewares


//Routes Collections 
router.get('/collections', _validateJWT["default"], (0, _authRole["default"])(['superadmin']), _getCollections["default"]); //Routes Employees

router.get('/all-employees', _validateJWT["default"], (0, _authRole["default"])(['superadmin']), _getEmployees["default"]);
router.post('/create-employee', _validateJWT["default"], (0, _authRole["default"])(['superadmin']), _createEmployee["default"]);
router["delete"]('/employee/:id', _validateJWT["default"], (0, _authRole["default"])(['superadmin']), _deleteEmployee["default"]); //Routes Permision

router.post('/create-permission', _validateJWT["default"], (0, _authRole["default"])(['superadmin']), _createPermission["default"]);
router.get('/permission', _validateJWT["default"], (0, _authRole["default"])(['superadmin']), _getPermission["default"]); //Routes Role

router.post('/create-role', _validateJWT["default"], (0, _authRole["default"])(['superadmin']), _createRole["default"]);
router.put('/user/change-role', _validateJWT["default"], (0, _authRole["default"])(['superadmin']), _changeRole["default"]);
router.get("/all-role", _validateJWT["default"], (0, _authRole["default"])(['superadmin']), _getAllRoles["default"]), router["delete"]('/role/:id', _validateJWT["default"], (0, _authRole["default"])(['superadmin']), _deleteRole["default"]); //Routes User

router.get('/all-user', _validateJWT["default"], (0, _authRole["default"])(['superadmin', 'soporte']), _getAllUser["default"]);
router.get('/user/:email', _validateJWT["default"], (0, _authRole["default"])(['superadmin', 'soporte']), _searchUserEmail["default"]); //Routes Compamy

router.post('/create-company', _validateJWT["default"], (0, _authRole["default"])(['superadmin']), _createCompany["default"]);
router.get("/companies", _validateJWT["default"], (0, _authRole["default"])(['superadmin']), _getCompanies["default"]);
router["delete"]("/company/:id", _validateJWT["default"], (0, _authRole["default"])(['superadmin']), _deleteCompany["default"]); //Routes Route

router.post('/create-route', _validateJWT["default"], (0, _authRole["default"])(['superadmin']), _createRoute["default"]);
router.get('/routes', _validateJWT["default"], (0, _authRole["default"])(['superadmin']), _getRoutes["default"]);
router["delete"]('/route/:id', _validateJWT["default"], (0, _authRole["default"])(['superadmin']), _deleteRoute["default"]); //Routes Project

router.post('/create-project', _validateJWT["default"], (0, _authRole["default"])(['superadmin']), _createProject["default"]);
router.get('/projects', _validateJWT["default"], (0, _authRole["default"])(['superadmin']), _getPorjects["default"]);
router["delete"]('/project/:id', _validateJWT["default"], (0, _authRole["default"])(['superadmin']), _deleteProject["default"]); //Routes supplier

router.get('/suppliers', _validateJWT["default"], (0, _authRole["default"])(['superadmin']), _getSupliers["default"]);
router.post('/create-supplier', _validateJWT["default"], (0, _authRole["default"])(['superadmin']), _createSupplier["default"]);
router["delete"]('/supplier/:id', _validateJWT["default"], (0, _authRole["default"])(['superadmin']), _deleteSupplier["default"]); //Routes Materiall

router.get('/materials', _validateJWT["default"], (0, _authRole["default"])(['superadmin']), _getMaterials["default"]);
router.post('/:id/create-material', _validateJWT["default"], (0, _authRole["default"])(['superadmin']), _createMaterial["default"]); //Routes Unit 

router.post('/create-unit', _validateJWT["default"], (0, _authRole["default"])(['superadmin']), _createUnit["default"]); //Routes Service

router.get('/services', _validateJWT["default"], (0, _authRole["default"])(['superadmin']), _getServices["default"]);
router.post('/create-service', _validateJWT["default"], (0, _authRole["default"])(['superadmin']), _createService["default"]);
router["delete"]('/service/:id', _validateJWT["default"], (0, _authRole["default"])(['superadmin']), _deleteService["default"]);
var _default = router;
exports["default"] = _default;