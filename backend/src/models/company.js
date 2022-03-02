import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rtn: {
        type: Number,
        required: true,

        unique: true,
    },
    logo: {
        type: String,

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
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,

    },
    projects: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
        }],
        default: []
    }

}, {
    timestamps: true,
})

export default mongoose.model('Company', companySchema);