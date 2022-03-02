import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    payDay: {
        type: Date,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        default: null,
    },
    status: {
        type: String,
        default: 'En espera',
    },
    idCompany: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "company",
        default: null
    },

    idQuote: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: "quote"
    },
    idInvoice: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: "invoice"
    },
    workforce: [{
        employee: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "employee"
        },
        price: {
            type: Number,
            required: true,
        },
    }],
}, {
    timestamps: true,

});

export default mongoose.model('project', projectSchema);





