import Service from "../../models/service";
import Material from "../../models/material";
const getServices = async (req, res) => {
    try {
        let services = await Service.find({});
        let tempMaterials = [];
        let tempServices = [];
        for (let i = 0; i < services.length; i++) {
            let service = services[i];
            let materails = service.materials;
            for (let j = 0; j < materails.length; j++) {
                let material = await Material.findById(materails[j]._id);
                material.quantity = materails[j].quantity;
                tempMaterials.push(material);
            }
            tempServices.push({
                ...service.toJSON(),
                materials: tempMaterials
            });
            tempMaterials = [];


        }
        res.status(200).json({
            services: tempServices
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
export default getServices;