import Permissions from '../../models/permissions';
const getPermission = async (req, res) => {
    try {
        const permissions = await Permissions.find({});
        res.status(200).json({
            message: "Permission fetched successfully",
            permissions
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export default getPermission;