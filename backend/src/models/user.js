import mongoose from 'mongoose';
import Role from "./role";
let roleDefault = null


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    idRole: {
        type: mongoose.Types.ObjectId,
        ref: "Role"
    },
    permissions: {
        type: Array,
        required: true,
        default: [],
    },
    telephone: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        default: '',

    },
}, {
    timestamps: true,
});
UserSchema.pre('save', async function (next) {
    const user = this
    const roleDefault = await Role.findOne({ name: 'user' });
    user.idRole = roleDefault._id
    next();
});
export default mongoose.model('User', UserSchema);