import Material from "../../models/material";
import Supplier from "../../models/supplier";
import Unit from "../../models/unit";
const createMaterial = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        const tempUnit = await Unit.findById(req.body.unit._id);
        if (!supplier) {
            return res.status(404).json({
                message: "Proveedor no encontrado",
            });
        }
        if (!tempUnit) {
            return res.status(404).json({
                message: "Unidad no encontrada",
            });
        }
        const { name, price, quantity, unit } = req.body;
        const material = new Material({
            name,
            quantity,
            unit: unit._id,
            price,
            idSupplier: supplier._id,
        });
        await material.save();
        supplier.materials.push(material);
        await supplier.save();
        res.status(200).json({
            message: "Material creado con exito",
            material,
        });
    } catch (error) {

    }
}
export default createMaterial