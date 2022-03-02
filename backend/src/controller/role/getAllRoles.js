import Role from "../../models/role";
const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.aggregate([
            {
                '$project': {
                    'name': 1,
                    'description': 1,
                    'code': 1,
                    'permissions': 1,
                    'createdAt': {
                        '$dateToString': {
                            'format': '%d-%m-%Y %H:%M',
                            'date': '$createdAt',
                            'timezone': 'America/Tegucigalpa'
                        }
                    },
                    'updatedAt': {
                        '$dateToString': {
                            'format': '%d-%m-%Y %H:%M',
                            'date': '$updatedAt',
                            'timezone': 'America/Tegucigalpa'
                        }
                    }
                }
            }
        ])
        let headers = []
        const keys = Object.keys(roles[0])
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

        res.status(200).json({
            success: true,
            roles,
            headers
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
};
export default getAllRoles;