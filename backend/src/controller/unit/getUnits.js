import Unit from "../../models/unit";
const getUnits = async (req, res) => {
    try {
        const units = await Unit.find();
        res.status(200).json({
            message: "Unidades obtenidas con exito",
            units,
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al obtener las unidades",
            error: error.message
        });

    }
}
export default getUnits;