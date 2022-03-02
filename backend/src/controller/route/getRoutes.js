import Route from "../../models/route";
const getRoutes = async (req, res) => {
    try {
        const routes = await Route.find().populate('roles');
        res.json({ message: "Rutas encontradas", routes });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener las rutas" });
    }
}
export default getRoutes;