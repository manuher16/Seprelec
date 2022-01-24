import mongoose from 'mongoose';

const clientShcema = new mongoose.Schema({
    idUser: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user"
    },
    company: {
        type: String,
        required: true,
    },


    projects: {
        type: Array,
        required: true,
        default: [],
    }
}, {
    timestamps: true,
})
export default mongoose.model('client', clientShcema);
