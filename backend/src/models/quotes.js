import mongoose from 'mongoose';
const quoteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    collection: {
    },
}, {
    timestamps: true,

});
export default mongoose.model('Quote', quoteSchema);