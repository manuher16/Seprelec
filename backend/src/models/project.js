import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
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
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    employees: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "employed"
    },
    services: {
        type: Array,
        required: true,
        default: [],
    },
    idQuote: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "quote"
    },
    idInvoice: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "invoice"
    },
}, {
    timestamps: true,

});

export default mongoose.model('project', projectSchema);





