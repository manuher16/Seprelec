import mongoose from "mongoose";

const routeLinkSchema = new mongoose.Schema({

    path: {
        type: String,
        required: true,
    },
    origin: {
        type: String,
        required: true,
    },
    fullPath: {
        type: String,
        required: true,
        unique: true,
    },
    roles: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Role"
        }
    ],
    description: {
        type: String,

    },
    type: {
        type: String,
        required: true,
        enum: ["SERVER", "CLIENT"],
    }
}, {
    timestamps: true,
});

export default mongoose.model("route", routeLinkSchema);