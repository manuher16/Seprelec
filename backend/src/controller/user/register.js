import User from "../../models/user";
import bcrypt from "bcrypt";
const register = (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password, telephone, address } = req.body;
        User.findOne({ email }).then(user => {
            if (user) {
                return res.status(400).json({
                    message: "User already exists"
                });
            }
            const hashPassword = bcrypt.hashSync(password, 10);

            const newUser = new User({
                name,
                email,
                "password": hashPassword,
                telephone,
                address
            });
            newUser.save().then(user => {
                res.status(201).json({
                    message: "User created",
                    user
                });
            });
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

export default register;