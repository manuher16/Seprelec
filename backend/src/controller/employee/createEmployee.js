import Employee from "../../models/employee"
import User from "../../models/user"
import Role from "../../models/role"
import mongoose from "mongoose"
const createEmployee = async (req, res) => {
    try {
        const user = await User.findById(req.body.user)
        const role = await Role.findById(req.body.role)
        if (!user && !role) {
            return res.status(404).json({
                ok: false,
                msg: "User not found"
            })
        }
        await User.findByIdAndUpdate(req.body.user, {
            idRole: req.body.role
        })

        const employee = new Employee({
            idUser: req.body.user,
            idRole: req.body.role,
            identifier: req.body.identifier,
            occupation: req.body.occupation,
            titles: [],
            skills: req.body.skills
        })
        await user.save()
        await employee.save()
        res.status(200).json({
            success: true,
            msg: "Empleado creado"
        })


    } catch (error) {
        console.log(error)
        if (error.code === "11000") {
            return res.status(400).json({
                ok: false,
                code: error.code,
                msg: `ya existe ${error.keyPattern.idUser ? "el empleado" : "la identificacion"}`
            })
        }
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}
export default createEmployee;
