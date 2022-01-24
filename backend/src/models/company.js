import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    telephone: {
        type: String,
        required: true,

    }

}, {
    timestamps: true,
})

export default mongoose.model('Company', companySchema);