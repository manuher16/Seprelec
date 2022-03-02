import Company from "../../models/company"
const createCompany = async (req, res) => {
    try {
        const company = new Company({
            name: req.body.name,
            rtn: req.body.rtn,
            address: req.body.address,
            telephone: req.body.telephone,
            email: req.body.email,
            department: req.body.department,
            city: req.body.city,
            logo: req.body.logo ? req.body.logo : null,
            description: req.body.description ? req.body.description : null,
        })
        await company.save()
        res.status(200).json({
            success: true,
            message: "Empresa creada"
        })
    } catch (error) {
        if (error.code === "11000") {
            return res.status(400).json({
                success: false,
                code: error.code,
                msg: `ya existe `
            })
        }
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}
export default createCompany