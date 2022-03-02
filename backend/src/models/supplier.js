import mongoose from 'mongoose';
const suplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        default: ''
    },
    telephone: {
        type: String,
        default: '',
        required: true,
    },
    email: {
        type: String,
        default: '',
    },
    heading: {
        type: String,
        default: '',
    },
    iva: {
        type: Number,
        default: 0,
    },
    website: {
        type: String,
        default: '',
    },
    materials: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Material',
    }]
},
    {
        timestamps: true,
    })

export default mongoose.model('Supplier', suplierSchema);