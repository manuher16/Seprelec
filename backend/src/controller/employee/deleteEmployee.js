import Employee from "../../models/employee";
const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id).populate("idUser");
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Empleado no encontrado"
            });
        }
        await employee.remove();
        res.json({
            success: true,
            message: `Empleado ${employee.idUser.name} eliminado`
        });

    } catch (error) {
        console.log(error)


    }
};
export default deleteEmployee;