import Supplier from "../../models/supplier";
const createSupplier = async (req, res) => {
    try {
        const { name, telephone, email, address, heading, website } = req.body;
        const supplier = new Supplier({
            name,
            telephone,
            email,
            address,
            heading,
            website
        });
        await supplier.save();
        res.status(200).json({
            message: "Proveedor creado con exito",
            supplier
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al crear el proveedor",
            error: error.message
        });
    }

}
export default createSupplier