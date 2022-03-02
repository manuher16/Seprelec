import Route from "../../models/route";
const deleteRoute = async (req, res) => {
    try {
        const { id } = req.params;
        const route = await Route.findByIdAndDelete(id);
        res.json({ message: "Ruta eliminada", route });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al eliminar la ruta" });
    }
}
export default deleteRoute;