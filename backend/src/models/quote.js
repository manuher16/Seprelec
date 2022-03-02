import mongoose from 'mongoose';
const quoteSchema = new mongoose.Schema({
    idProject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "project"
    },
    description: {
        type: String,
    },
    materials: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "material"
    }],
    services: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "service"
        }
    ],
    workforce: [{
        price: {
            type: Number,
        },
        idEmployee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "employee"
        }
    }]
}, {
    timestamps: true,

});
export default mongoose.model('Quote', quoteSchema);