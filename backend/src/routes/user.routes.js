import express from 'express';
const router = express.Router();

//Controllers
import Login from "../controller/user/login"
import register from "../controller/user/register"

//Routes
router.post('/login-admin', Login)
router.get('/register', register)

export default router;