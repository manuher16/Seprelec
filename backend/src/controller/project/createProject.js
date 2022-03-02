import Project from "../../models/project"

const createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body)
        await project.save()
        res.status(200).json({
            message: "Proyecto Creado exitosamente",
            project
        })

    } catch (error) {
        res.status(500).json({
            message: "Error al crear el proyecto",
            error
        })
    }
}
export default createProject;