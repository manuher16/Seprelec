import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,

    },
    price: {
        type: Number,
        required: true,
    },
    materials: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Material',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        }
    }]
}, {
    timestamps: true,
})

export default mongoose.model('Service', serviceSchema);