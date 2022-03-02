import Unit from "../../models/unit"
const createUnit = async (req, res) => {
    try {
        const { name, abbreviation } = req.body;
        const unit = new Unit({
            name,
            abbreviation,
        });
        await unit.save();
        res.status(200).json({
            message: "Unidad creada con exito",
            unit,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al crear la unidad",
            error: error.message
        });
    }

}
export default createUnit