import Employee from "../../models/employee"
import Role from "../../models/role"
const getEmployees = async (req, res) => {
    console.log("getEmployees")
    try {
        const employees = await Employee.aggregate([
            {
                '$lookup': {
                    'from': 'users',
                    'localField': 'idUser',
                    'foreignField': '_id',
                    'as': 'user'
                }
            }, {
                '$unwind': {
                    'path': '$user'
                }
            }, {
                '$lookup': {
                    'from': 'roles',
                    'localField': 'user.idRole',
                    'foreignField': '_id',
                    'as': 'role'
                }
            }, {
                '$unwind': {
                    'path': '$role'
                }
            }
        ]);
        res.status(200).json({
            success: true,
            employees
        })
    } catch (error) {

    }
}
export default getEmployees