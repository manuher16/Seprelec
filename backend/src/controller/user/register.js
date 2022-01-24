import User from "../../models/user";
import bcrypt from "bcrypt";
const register = (req, res) => {
    const { name, email, password, telephone, idEmployee } = req.body;
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
            hashPassword,
            telephone,
            idEmployee,
        });
        newUser.save().then(user => {
            res.status(201).json({
                message: "User created",
                user
            });
        });
    });
};

export default register;