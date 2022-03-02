import Project from "../../models/project"
import Invoice from "../../models/invoice"
import Quote from "../../models/quote"
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
        const invoice = await Invoice.findById(project.idInvoice)
        const quote = await Quote.findById(project.idQuote)
        if (quote) await quote.remove();
        if (invoice) await invoice.remove();
        await project.remove()
        res.status(200).json({
            message: "Proyecto Eliminado",
            project
        })
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el proyecto",
            error
        })
    }
}
export default deleteProject