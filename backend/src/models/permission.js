import mongoose from 'mongoose';

const permissions = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    collection: {
        type: String,
        required: true,

    },
    write: {
        type: Boolean,
        required: true,
        default: false,
    },
    read: {
        type: Boolean,
        required: true,
        default: false,
    },
    delete: {
        type: Boolean,
        required: true,
        default: false,
    },
    me: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
});

export default mongoose.model('Permission', permissions);