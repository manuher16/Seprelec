import Project from "../../models/project";
const getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Proyecto no encontrado" });
        }
        res.json({ message: "Proyecto encontrado", project });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener el proyecto" });
    }
}