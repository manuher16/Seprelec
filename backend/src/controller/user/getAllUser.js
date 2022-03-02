import User from "../../models/user"
const getAllUser = async (req, res) => {
    try {
        const users = await User.aggregate([
            {
                '$lookup': {
                    'from': 'roles',
                    'localField': 'idRole',
                    'foreignField': '_id',
                    'as': 'role'
                }
            }, {
                '$project': {
                    'name': 1,
                    'email': 1,
                    'role': {
                        '$arrayElemAt': [
                            '$role', 0
                        ]
                    },
                    'telephone': 1,
                    'address': 1,
                    'createdAt': {
                        '$dateToString': {
                            'format': '%d-%m-%Y %H:%m',
                            'date': '$createdAt',
                            'timezone': 'America/Tegucigalpa'
                        }
                    },
                    'updatedAt': {
                        '$dateToString': {
                            'format': '%d-%m-%Y %H:%m',
                            'date': '$updatedAt',
                            'timezone': 'America/Tegucigalpa'
                        }
                    },
                    'permissions': 1
                }
            }
        ])
        const keys = Object.keys(users[0])
        let headers = []
        keys.forEach((key, index) => {
            if (index > 0 && index === 1) {
                headers.push({
                    text: key,
                    align: 'start',
                    value: key
                })
            } if (index > 1) {
                headers.push({
                    text: key,
                    value: key
                })
            }

        })
        headers.push({
            text: 'Acciones',
            value: 'action'
        })
        return res.status(200).json({
            success: true,
            users,
            headers
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export default getAllUser
