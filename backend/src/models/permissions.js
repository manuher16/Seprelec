import mongoose from 'mongoose';

const permissionShema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        default: ''
    },
    write: {
        type: Boolean,
        default: false,
    },
    read: {
        type: Boolean,
        default: false,
    },
    delete: {
        type: Boolean,
        default: false,
    },
    me: {
        type: Boolean,

        default: false,
    },
}, {
    timestamps: true,
});

export default mongoose.model('permission', permissionShema);