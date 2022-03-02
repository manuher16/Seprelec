import express from 'express';
import createPermissions from '../controller/permission/createPermission';
import getPermission from '../controller/permission/getPermission';
import createRole from "../controller/role/createRole"
import changeRole from "../controller/role/changeRole"
import getAllUser from "../controller/user/getAllUser"
import getAllRole from "../controller/role/getAllRoles"
import createEmployee from '../controller/employee/createEmployee';
import searchUserEmail from '../controller/user/searchUserEmail';
import getEmployees from '../controller/employee/getEmployees';
import createCompany from "../controller/company/createCompany"
import getCompanies from "../controller/company/getCompanies"
import deleteCompany from "../controller/company/deleteCompany"
import deleteEmployee from '../controller/employee/deleteEmployee';
import createRoute from "../controller/route/createRoute"
import getProjects from '../controller/project/getPorjects';
import createProject from '../controller/project/createProject';
import deleteProject from '../controller/project/deleteProject';
import getRoutesClient from '../controller/route/getRoutes';
import deleteRoute from "../controller/route/deleteRoute"
import getSupliers from '../controller/supplier/getSupliers';
import createSupplier from '../controller/supplier/createSupplier';
import createMaterial from '../controller/material/createMaterial';
import deleteSupplier from '../controller/supplier/deleteSupplier';
import createUnit from '../controller/unit/createUnit';
import getServices from '../controller/service/getServices';
import createService from '../controller/service/createService';
import getMaterials from '../controller/material/getMaterials';
import deleteService from '../controller/service/deleteService';
import deleteRole from "../controller/role/deleteRole"


const router = express.Router();

//middlewares
import validateJWT from '../middlewares/validateJWT';
import authRole from "../middlewares/authRole";
import route from '../models/route';
import getCollections from '../controller/collection/getCollections';
//Routes Collections 
router.get('/collections', validateJWT, authRole(['superadmin']), getCollections)

//Routes Employees
router.get('/all-employees', validateJWT, authRole(['superadmin']), getEmployees);
router.post('/create-employee', validateJWT, authRole(['superadmin']), createEmployee);
router.delete('/employee/:id', validateJWT, authRole(['superadmin']), deleteEmployee);

//Routes Permision
router.post('/create-permission', validateJWT, authRole(['superadmin']), createPermissions)
router.get('/permission', validateJWT, authRole(['superadmin']), getPermission)

//Routes Role
router.post('/create-role', validateJWT, authRole(['superadmin']), createRole)
router.put('/user/change-role', validateJWT, authRole(['superadmin']), changeRole)
router.get("/all-role", validateJWT, authRole(['superadmin']), getAllRole),
    router.delete('/role/:id', validateJWT, authRole(['superadmin']), deleteRole)

//Routes User
router.get('/all-user', validateJWT, authRole(['superadmin', 'soporte']), getAllUser)
router.get('/user/:email', validateJWT, authRole(['superadmin', 'soporte']), searchUserEmail)

//Routes Compamy
router.post('/create-company', validateJWT, authRole(['superadmin']), createCompany)
router.get("/companies", validateJWT, authRole(['superadmin']), getCompanies)
router.delete("/company/:id", validateJWT, authRole(['superadmin']), deleteCompany)

//Routes Route
router.post('/create-route', validateJWT, authRole(['superadmin']), createRoute)
router.get('/routes', validateJWT, authRole(['superadmin']), getRoutesClient)
router.delete('/route/:id', validateJWT, authRole(['superadmin']), deleteRoute)

//Routes Project
router.post('/create-project', validateJWT, authRole(['superadmin']), createProject)
router.get('/projects', validateJWT, authRole(['superadmin']), getProjects)
router.delete('/project/:id', validateJWT, authRole(['superadmin']), deleteProject)

//Routes supplier
router.get('/suppliers', validateJWT, authRole(['superadmin']), getSupliers);
router.post('/create-supplier', validateJWT, authRole(['superadmin']), createSupplier);
router.delete('/supplier/:id', validateJWT, authRole(['superadmin']), deleteSupplier);

//Routes Materiall
router.get('/materials', validateJWT, authRole(['superadmin']), getMaterials);
router.post('/:id/create-material', validateJWT, authRole(['superadmin']), createMaterial);

//Routes Unit 
router.post('/create-unit', validateJWT, authRole(['superadmin']), createUnit);

//Routes Service
router.get('/services', validateJWT, authRole(['superadmin']), getServices);
router.post('/create-service', validateJWT, authRole(['superadmin']), createService);
router.delete('/service/:id', validateJWT, authRole(['superadmin']), deleteService);

export default router;