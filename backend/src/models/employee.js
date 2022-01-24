import mongoose from 'mongoose';

const employed = new mongoose.Schema({
    idUser: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user"
    },
    skill: {
        type: Array,
        required: true,
        default: []
    },
    identifier: {
        type: String,
        required: true,
        unique: true
    },
    occupation: {
        type: String,
        required: true,
    },
    titles: {
        type: Array,
        required: true,
        default: [],
    }
}, {
    timestamps: true,
})