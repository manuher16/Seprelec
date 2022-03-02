import Role from '../../models/role';
const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;

        const role = await Role.findByIdAndDelete(id);

        if (!role) {
            return res.status(404).json({
                message: "Role not found"
            });
        }
        res.status(200).json({
            message: "Role deleted",
            role
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        });


    }

}
export default deleteRole;