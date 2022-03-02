import Company from "../../models/company"
const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find({})
        res.status(200).json({
            success: true,
            companies
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

export default getCompanies