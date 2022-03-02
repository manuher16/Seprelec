import mongoose from 'mongoose';
const materialSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    idSupplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
    },
    quantity: {
        type: Number,
        default: 1,
    },
    unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit',
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, {
    timestamp: true,
})
export default mongoose.model('Material', materialSchema);