import Role from "../../models/role";
const createRole = (req, res) => {
    try {
        console.log(req.body);
        const { name, description, permissions, code } = req.body
        const newRole = new Role({
            name,
            description,
            permissions,
            code
        })
        newRole.save().then(role => {
            res.status(201).json({
                message: "Role created",
                role
            })
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                message: err.message
            })
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        });
    }
}
export default createRole;
