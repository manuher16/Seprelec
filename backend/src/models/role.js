import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    permissions: {
        type: Array,
        required: true,
        default: [],
    },
    code: {
        type: String,
        default: '',
        required: true,
    }
}, {
    timestamps: true,
})

export default mongoose.model('Role', roleSchema);