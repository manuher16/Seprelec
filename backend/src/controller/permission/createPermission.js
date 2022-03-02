import Permissions from "../../models/permissions";
const createPermissions = async (req, res) => {
    try {
        const { name, description, write, read, me, del } = req.body;
        const newPermission = new Permissions({
            name: name.toLowerCase(),
            description,
            write,
            read,
            me,
            delete: del
        })
        await newPermission.save()
        res.status(201).json({
            message: "Permission created",
            permission: newPermission
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export default createPermissions;