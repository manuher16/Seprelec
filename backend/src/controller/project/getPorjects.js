import Project from "../../models/project"
const getProjects = async (req, res) => {
    try {
        const projects = await Project.aggregate([
            {
                '$lookup': {
                    'from': 'companies',
                    'localField': 'idCompany',
                    'foreignField': '_id',
                    'as': 'company'
                }
            }, {
                '$unwind': {
                    'path': '$company'
                }
            }
        ])
        res.status(200).json({
            message: "Proyectos Encontrados",
            projects
        })

    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los proyectos",
            error
        })
    }
}
export default getProjects