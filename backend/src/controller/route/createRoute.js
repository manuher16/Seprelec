import Route from "../../models/route"

const createRoute = async (req, res) => {
    try {
        const TYPE = {
            SERVER: "SERVER",
            CLIENT: "CLIENT"
        }
        const { path, origin, roles } = req.body;

        const route = new Route({
            path,
            origin,
            roles,
            fullPath: `${origin}${path}`,
            description: req.body.description ? req.body.description : "",
            type: req.body.type == "SERVER" ? TYPE.SERVER : TYPE.CLIENT
        });
        await route.save();
        res.status(200).json({
            message: "Ruta creada exitosamente",
            route
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        })

    }
}
export default createRoute