import mongoose from 'mongoose';
const unitSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    abbreviation: {
        type: String,
        unique: true,
        required: true,
    },
}, {
    timestamp: true,
})
export default mongoose.model('Unit', unitSchema);