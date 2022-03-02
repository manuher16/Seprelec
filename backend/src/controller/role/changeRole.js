import User from "../../models/user";
import Role from "../../models/role"
const changeRole = async (req, res) => {
    try {
        const { role } = req.user
        const roleIsvalid = Role.findOne({ name: role })
        if (!roleIsvalid) {
            return res.status(401).send({ error: 'Role not found' });
        }

        const user = await User.findById(req.user.id);
        user.role = req.body.role._id;
        await user.save();
        res.json({
            message: "Role changed",
            data: user,
        });

    } catch (error) {
        res.status(500).json({
            message: "Role",
            data: error,
        });
    }
}
export default changeRole;
