import User from "../../models/user";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const login = (req, res) => {
    try {
        const { email, password } = req.body;
        User.findOne({ email }).then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
            bcrypt.compare(password, user.password).then(isMatch => {
                if (!isMatch) {
                    return res.status(400).json({
                        message: "Invalid credentials"
                    });
                }
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    idRole: user.idRole,
                };
                jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 86400 }, (err, token) => {
                    if (err) {
                        res.status(500).json({
                            message: "Error signing token"
                        });
                    } else {
                        res.status(200).json({
                            message: "Login successful",
                            token: token
                        });
                    }
                });
            });
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }

};



export default login;