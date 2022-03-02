import Supplier from "../../models/supplier"
import Unit from "../../models/unit"
const getSuppliers = async (req, res) => {
    try {
        let suppliers = await Supplier.find().populate('materials')
        const units = await Unit.find()
        suppliers = suppliers.map(supplier => {
            const materials = supplier.materials.map(material => {
                const unit = units.find(unit => unit._id.toString() === material.unit.toString())
                return {
                    ...material._doc,
                    unit: unit._doc
                }
            })
            return {
                ...supplier._doc,
                materials
            }
        })
        res.json({
            success: true,
            suppliers
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export default getSuppliers