import jwt from 'jsonwebtoken';
const validateJWT = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            token = req.body.authorization;
        }
        if (token.split(' ')[0] == 'Bearer') {
            token = req.headers.authorization.split(' ')[1];
        }

        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    res.status(401).json({
                        message: 'Invalid Token'
                    });
                } else {
                    req.user = decoded;
                    next();
                }
            });
        } else {
            res.status(401).json({
                message: 'No Token'
            });
        }
    } catch (error) {
        console.log("error token");
        res.status(500).json({
            message: "token error"
        });
    }
};

export default validateJWT;