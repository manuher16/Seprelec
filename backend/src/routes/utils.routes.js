import express from 'express';
import validateJWT from "../middlewares/validateJWT";
import authRoute from "../middlewares/authRoute";
const router = express.Router();

router.get('/validate-jwt', validateJWT, authRoute, (req, res) => {
    res.status(200).json({
        user: req.user,
        isAuthenticated: true,
        message: "JWT is valid"
    })
});

export default router;