import Route from "../models/route";
const authRoute = async (req, res, next) => {
    try {
        const { to } = req.headers;
        const route = await Route.findOne({ path: to });
        if (!route) {
            return res.status(404).json({
                message: "Ruta no encontrada"
            })
        }
        for (let i = 0; i < route.roles.length; i++) {

            if (route.roles[i].toString() == req.user.idRole) {
                return next();
            }
        }
        return res.status(403).json({
            message: "No tienes permisos para acceder a esta ruta",
            isAuthenticated: false

        })


    } catch (error) {

    }
}
export default authRoute;