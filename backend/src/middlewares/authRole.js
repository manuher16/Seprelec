import Role from "../models/role";

const authRole = (rolesAuth) => async (req, res, next) => {

    try {
        const roleUser = await Role.findById({ _id: req.user.idRole })

        if (!roleUser) {
            return res.status(404).json({
                message: "Role not found"
            });
        }
        if (rolesAuth.indexOf(roleUser.name) > -1) {
            req.user.role = roleUser
            next();
        } else {
            return res.status(403).json({
                message: "not authorized"
            });
        }
    } catch (error) {
        console.log("error authRole");
        res.status(500).json({
            message: "Role",
            data: error.message,
        });

    }

}
export default authRole;