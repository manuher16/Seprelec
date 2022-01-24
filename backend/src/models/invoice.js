import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    paid: {
        type: Boolean,
        required: true,
        default: false,
    },
    idUser: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user"
    },
    idProject: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "project"
    },
    idEmployee: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "employed"
    },
}, {
    timestamps: true,
});

export default mongoose.model('invoice', invoiceSchema);