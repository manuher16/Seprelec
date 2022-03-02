import Service from "../../models/service";
const createService = async (req, res) => {
    try {
        const { name, description, price, materials } = req.body;
        const service = new Service({
            name,
            description,
            price,
            materials
        });
        await service.save();
        res.status(200).json({
            success: true,
            message: 'Servicio creado correctamente',
            service: service
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
export default createService;