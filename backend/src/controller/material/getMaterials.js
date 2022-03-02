import material from "../../models/material";
const getMaterials = async (req, res) => {
    try {
        let materials = await material.find({}).populate('idSupplier').populate('unit');
        materials = materials.map(material => {
            return {
                _id: material._id,
                name: material.name,
                price: material.price,
                quantity: material.quantity,
                idSupplier: material.idSupplier,
                unit: material.unit,
                quantity2: 1
            }
        });

        res.status(200).json({
            success: true,
            materials: materials
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
export default getMaterials;