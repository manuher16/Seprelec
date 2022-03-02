import Service from "../../models/service";
const deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service no encontrado"
            });
        }
        await service.remove();
        res.status(200).json({
            success: true,
            message: "Servicio eleminado"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "No se puedo eliminar el servicio"
        });
    }
}
export default deleteService;