import Supplier from "../../models/supplier";
import Material from "../../models/material";
const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const supplier = await Supplier.findById(id);
        if (!supplier) {
            return res.status(404).json({
                message: "No se encontro el proveedor"
            });
        }
        supplier.materials.forEach(async (material) => {
            await Material.findByIdAndDelete(material);
        });

        await supplier.remove();
        res.status(200).json({
            message: "Proveedor eliminado con exito"
        });

    } catch (error) {

    }
}
export default deleteSupplier