import Collection from "../../models/collection";
const getCollections = async (req, res) => {
    try {
        const collections = await Collection.find();
        res.json({ message: "Colecciones encontradas", collections });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener las colecciones" });
    }
};
export default getCollections;