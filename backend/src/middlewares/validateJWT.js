import jwt from 'jsonwebtoken';
const validateJWT = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        token = req.body.authorization;
    }
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    message: 'Invalid Token'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(401).json({
            message: 'No Token'
        });
    }
};

export default validateJWT;