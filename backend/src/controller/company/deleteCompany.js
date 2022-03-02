import Company from "../../models/company"
const deleteCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id)
        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Compania no encontrada"
            })
        }
        await company.remove()
        res.json({
            success: true,
            message: `Compania ${company.name} eliminada `
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error in the server"
        })
    }
}
export default deleteCompany