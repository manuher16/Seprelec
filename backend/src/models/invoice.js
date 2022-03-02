import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
    paid: {
        type: Boolean,
        required: true,
        default: false,
    },
    idCompany: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company",
    },
    idProject: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "project"
    },
    idQuote: {
        type: mongoose.Types.ObjectId,
        ref: "quote"
    },
    numInvoice: {
        type: String,
        required: true,
        unique: true,
    },
    state: {
        type: String,
        required: true,
        default: "Pendiente",
        enum: ["Pendiente", "Pagado", "Cancelado"]
    },
    idEmployee: [{
        type: mongoose.Types.ObjectId,
        ref: "employee"
    }],
}, {
    timestamps: true,
});

export default mongoose.model('invoice', invoiceSchema);